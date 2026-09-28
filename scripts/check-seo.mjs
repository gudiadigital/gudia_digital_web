/**
 * Derlenmiş sitenin (out/) arama motoru denetimi.
 *
 * Repoda test yok; bu betik SEO işlerinin kabul testi. Kaynak koda değil,
 * gerçekten yayınlanacak HTML'e bakıyor: canonical, hreflang, başlık,
 * açıklama, H1, JSON-LD (SSS'nin ve içerik haritasının sayfadakiyle
 * aynılığı dahil), sitemap tutarlılığı ve llms.txt. Örneğin /en/privacy/
 * açıklamasının "Law No." ile bitmesi gibi hatalar ancak çıktıda görünüyor.
 *
 * Kullanım: `npm run build` sonunda kendiliğinden çalışıyor; hata varsa
 * derleme (ve GitHub Actions'taki yayın) durur. Tek başına:
 * `npm run check:seo` (önce derleme gerekli).
 *   REQUIRE_LASTMOD=1  sitemap'teki her <url> için ISO-8601 <lastmod> ister.
 *   ROOT_STRICT=1      kök sayfa (out/index.html) kurallarını hataya çevirir;
 *                      kök sayfa değişikliği sahibinin onayını beklediği için
 *                      varsayılan olarak yalnızca uyarı veriyorlar.
 *
 * Yalnızca Node'un kendi modülleri kullanılıyor; bağımlılık yok.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";

const SITE_URL = "https://gudiadigital.com";
const OUT = resolve("out");
const ROOT_STRICT = process.env.ROOT_STRICT === "1";
const REQUIRE_LASTMOD = process.env.REQUIRE_LASTMOD === "1";

/** Dizine girmeyen ya da ayrı denetlenen çıktılar. */
const SKIP_DIRS = new Set(["404", "_not-found", "_next"]);

/** src/i18n/routes.ts'teki proje yolu parçası; betik TS okuyamadığı için burada da yazılı. */
const PROJECT_SEGMENT = { tr: "projeler", en: "projects" };

const TITLE_MAX = 70;
const TITLE_WARN = 65;
const DESC_MIN = 70;
const DESC_MAX = 165;
const DESC_WARN = 110;
// Elle yazılan açıklamaların hedefi 120–155; 155–165 arası kesilebilir ama
// hata değil, yalnızca her derlemede görünsün diye uyarı.
const DESC_WARN_MAX = 155;
const MIN_PROJECT_INLINKS = 3;
const LLMS_MAX_LINES = 60;
// Kısaltmayla biten açıklama cümle ortasında kesilmiş demektir ("Law No.",
// metaDescription'ın kısalttığı metinde "Law No.…"). Liste src/i18n/seo.ts'teki
// ABBREVIATIONS ile aynı.
const ABBR_END = /\b(No|Nr|Dr|vb|vs|St|Md)\.…?$/;
// Kısaltılan metinde üç noktadan önce noktalama kalmamalı ("Kısa.…").
const PUNCT_BEFORE_ELLIPSIS = /[.,;:]…$/;
const ISO_8601 =
  /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:\d{2}))?$/;

if (!existsSync(OUT)) {
  console.error("check-seo: out/ yok — önce `npm run build` çalışmalı");
  process.exit(1);
}

/** @type {Map<string, {rule: string, message: string}[]>} */
const failures = new Map();
/** @type {Map<string, {rule: string, message: string}[]>} */
const warnings = new Map();

function report(bucket, file, rule, message) {
  if (!bucket.has(file)) bucket.set(file, []);
  bucket.get(file).push({ rule, message });
}
const fail = (file, rule, message) => report(failures, file, rule, message);
const warn = (file, rule, message) => report(warnings, file, rule, message);

/* ---------- küçük HTML yardımcıları (tam ayrıştırıcı gerekmiyor) ---------- */

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

function decodeEntities(text) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code) => {
    if (code[0] === "#") {
      const n = code[1].toLowerCase() === "x"
        ? parseInt(code.slice(2), 16)
        : parseInt(code.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : match;
    }
    return ENTITIES[code.toLowerCase()] ?? match;
  });
}

/** `<link rel="x" href='y' async>` → { rel: "x", href: "y", async: "" }; adlar küçük harfe iner. */
function parseAttrs(tag) {
  const attrs = {};
  const body = tag.replace(/^<\/?[a-z0-9-]+/i, "").replace(/\/?>$/, "");
  const re = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  let match;
  while ((match = re.exec(body))) {
    const value = match[2] ?? match[3] ?? match[4] ?? "";
    attrs[match[1].toLowerCase()] = decodeEntities(value);
  }
  return attrs;
}

function tags(html, name) {
  const re = new RegExp(`<${name}\\b[^>]*>`, "gi");
  return (html.match(re) ?? []).map(parseAttrs);
}

/** Karakter sayısı: Türkçe harfler tek karakter sayılsın diye kod noktası üzerinden. */
const length = (text) => [...text].length;

/** Script, style ve yorumlar çıkarılmış gövde; RSC verisindeki metin sayılmasın. */
function visibleBody(html) {
  const start = html.search(/<\/head>/i);
  return (start >= 0 ? html.slice(start) : html)
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[\s\S]*?<\/style>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");
}

/** Etiketleri atılmış, boşlukları tekleştirilmiş metin. */
function plainText(html) {
  return decodeEntities(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

function headOf(html) {
  const match = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i);
  return match ? match[1] : "";
}

function titleOf(head) {
  const match = head.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  return match ? decodeEntities(match[1]).trim() : null;
}

function metaContent(head, name) {
  return tags(head, "meta")
    .filter((meta) => meta.name?.toLowerCase() === name)
    .map((meta) => meta.content ?? "");
}

/** out/tr/hakkimizda/index.html → https://gudiadigital.com/tr/hakkimizda/ */
function urlOf(file) {
  const dir = relative(OUT, file).split(sep).slice(0, -1).join("/");
  return `${SITE_URL}/${dir ? `${dir}/` : ""}`;
}

/** Site içi adres → sayfa dosyası; site dışıysa null. */
function fileOf(url) {
  if (!url.startsWith(`${SITE_URL}/`)) return null;
  const path = url.slice(SITE_URL.length).replace(/[?#].*$/, "");
  return join(OUT, ...path.split("/").filter(Boolean), "index.html");
}

/** Sayfadaki bağlantıyı mutlak ve sonu / ile biten adrese çevirir. */
function normalizeHref(href, base) {
  try {
    const url = new URL(href, base);
    if (url.origin !== SITE_URL) return null;
    let path = url.pathname;
    if (!path.endsWith("/") && !/\.[a-z0-9]+$/i.test(path)) path += "/";
    return `${SITE_URL}${path}`;
  } catch {
    return null;
  }
}

/** Adresin dil kısmı: https://gudiadigital.com/tr/... → "tr". */
function localeOf(url) {
  return new URL(url).pathname.split("/")[1];
}

function walk(dir, found = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (dir === OUT && SKIP_DIRS.has(entry.name)) continue;
      walk(full, found);
    } else if (entry.name === "index.html" && dir !== OUT) {
      found.push(full);
    }
  }
  return found;
}

/* ---------- JSON-LD ---------- */

/** Değeri boş metin olan özellikleri yol ile birlikte toplar. */
function emptyStrings(value, path, found) {
  if (typeof value === "string") {
    if (value.trim() === "") found.push(path);
  } else if (Array.isArray(value)) {
    value.forEach((item, i) => emptyStrings(item, `${path}[${i}]`, found));
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      emptyStrings(item, path ? `${path}.${key}` : key, found);
    }
  }
  return found;
}

/**
 * Bütün nesneleri dolaşır: @id'si ve başka özelliği olanlar "düğüm",
 * yalnızca @id taşıyanlar başka bir düğüme "başvuru".
 */
function collectGraph(value, nodes, refs) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectGraph(item, nodes, refs));
  } else if (value && typeof value === "object") {
    const keys = Object.keys(value);
    if (typeof value["@id"] === "string") {
      if (keys.length === 1) refs.push(value["@id"]);
      else nodes.push(value);
    }
    for (const item of Object.values(value)) collectGraph(item, nodes, refs);
  }
}

/**
 * Görünen içerik haritası (başlığın üstündeki <nav><ol>) ile BreadcrumbList
 * aynı yolu söylemeli: aynı adlar aynı sırayla, bağlantılar da aynı
 * adreslere. Ana sayfa dışındaki her sayfada ikisi de olmalı.
 */
function checkBreadcrumb(file, body, canonical, nodes) {
  const list = nodes.find((node) => [node["@type"]].flat().includes("BreadcrumbList"));
  const nav = body.match(/<nav\b[^>]*>\s*<ol\b[\s\S]*?<\/ol>\s*<\/nav>/i)?.[0];
  const isHome = /^https:\/\/[^/]+\/[a-z]{2}\/$/.test(canonical);
  if (isHome) {
    if (list || nav) fail(file, "breadcrumb", "ana sayfada içerik haritası olmamalı");
    return;
  }
  if (!list) return fail(file, "breadcrumb", "BreadcrumbList yok");
  if (!nav) return fail(file, "breadcrumb", "sayfada görünen içerik haritası yok");

  const items = [...nav.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)].map((match) => ({
    name: plainText(match[1]),
    href: parseAttrs(match[1].match(/<a\b[^>]*>/i)?.[0] ?? "<a>").href,
    current: /aria-current="page"/i.test(match[1]),
  }));
  const expected = [list.itemListElement ?? []].flat();
  const shown = items.map((item) => item.name).join(" › ");
  const listed = expected.map((item) => item.name).join(" › ");
  if (shown !== listed) {
    fail(file, "breadcrumb", `görünen "${shown}" ≠ BreadcrumbList "${listed}"`);
    return;
  }
  expected.forEach((element, index) => {
    const item = items[index];
    const last = index === expected.length - 1;
    if (last) {
      if (item.href) fail(file, "breadcrumb", `son eleman bağlantı olmamalı: ${item.name}`);
      if (!item.current) fail(file, "breadcrumb", `son elemanda aria-current="page" yok`);
    } else if (normalizeHref(item.href ?? "", canonical) !== element.item) {
      fail(file, "breadcrumb", `"${item.name}" bağlantısı ${item.href} ≠ ${element.item}`);
    }
  });
}

function checkJsonLd(file, html, body, canonical, lang) {
  const blocks = [];
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (parseAttrs(`<script ${match[1]}>`).type === "application/ld+json") {
      blocks.push(match[2]);
    }
  }
  if (blocks.length === 0) {
    fail(file, "jsonld", "application/ld+json bloğu yok");
    return;
  }
  // Sayfa başına tek grafik: ikinci bir blok (ör. layout'a eklenen JsonLd)
  // aynı @id'li düğümleri çoğaltır, arama motoru hangisini okuyacağını seçer.
  if (blocks.length > 1) {
    fail(file, "jsonld", `${blocks.length} ld+json bloğu var, 1 olmalı`);
  }

  const nodes = [];
  const refs = [];
  blocks.forEach((raw, index) => {
    const label = `JSON-LD #${index + 1}`;
    // Next'in JSON-LD rehberi: "<" kaçırılmazsa </script> ile sayfa kırılabilir.
    if (raw.includes("<")) fail(file, "jsonld", `${label}: kaçırılmamış "<" var (\\u003c olmalı)`);
    if (/\bundefined\b|\bNaN\b/.test(raw)) {
      fail(file, "jsonld", `${label}: "undefined" ya da "NaN" içeriyor`);
    }
    let data;
    try {
      data = JSON.parse(raw);
    } catch (error) {
      fail(file, "jsonld", `${label}: JSON.parse hatası — ${error.message}`);
      return;
    }
    for (const path of emptyStrings(data, "", [])) {
      fail(file, "jsonld", `${label}: boş değer (${path})`);
    }
    collectGraph(data, nodes, refs);
  });

  const webpageId = `${canonical}#webpage`;
  const webpage = nodes.find((node) => node["@id"] === webpageId);
  if (!webpage) {
    fail(file, "jsonld", `@id "${webpageId}" olan WebPage düğümü yok`);
  } else {
    if (webpage.url !== canonical) {
      fail(file, "jsonld", `WebPage url "${webpage.url}" ≠ canonical`);
    }
    if (webpage.inLanguage !== lang) {
      fail(file, "jsonld", `WebPage inLanguage "${webpage.inLanguage}" ≠ <html lang="${lang}">`);
    }
  }

  const ids = new Set(nodes.map((node) => node["@id"]));
  for (const ref of new Set(refs)) {
    if (!ids.has(ref)) fail(file, "jsonld", `@id başvurusu karşılıksız: ${ref}`);
  }

  checkBreadcrumb(file, body, canonical, nodes);

  // SSS: yapılandırılmış veri yalnızca sayfada görünen soru-cevabı
  // anlatabilir. Her soru sayfada bir başlık, her cevap da görünen metnin
  // içinde birebir olmalı; biri sözlükte değişip öteki kalırsa yakalanır.
  const faqPages = nodes.filter((node) => [node["@type"]].flat().includes("FAQPage"));
  if (faqPages.length === 0) return;
  const headings = [...body.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map(
    (match) => plainText(match[2]),
  );
  const text = plainText(body);
  for (const faq of faqPages) {
    const questions = [faq.mainEntity ?? []].flat();
    if (questions.length === 0) fail(file, "faq", "FAQPage'de soru yok");
    for (const question of questions) {
      const name = String(question?.name ?? "").replace(/\s+/g, " ").trim();
      const answer = String(question?.acceptedAnswer?.text ?? "").replace(/\s+/g, " ").trim();
      if (!headings.includes(name)) {
        fail(file, "faq", `soru sayfada başlık olarak yok: ${name}`);
      }
      if (!answer || !text.includes(answer)) {
        fail(file, "faq", `cevabı sayfada birebir yok: ${name}`);
      }
    }
  }
}

/* ---------- sayfa denetimi ---------- */

const pages = walk(OUT).sort();
const pageUrls = new Map(pages.map((file) => [urlOf(file), file]));
const titles = new Map();
/** Hedef adres → aynı dildeki kaynak sayfalar (proje iç bağlantı sayımı için). */
const inlinks = new Map();

for (const file of pages) {
  const rel = relative(process.cwd(), file);
  const html = readFileSync(file, "utf8");
  const head = headOf(html);
  const body = visibleBody(html);
  const expected = urlOf(file);
  const lang = parseAttrs(html.match(/<html\b[^>]*>/i)?.[0] ?? "<html>").lang ?? "";

  // 1. Canonical: tek, mutlak, sonu / ve dosyanın kendi adresi
  const canonicals = tags(head, "link").filter((link) => link.rel === "canonical");
  if (canonicals.length !== 1) {
    fail(rel, "canonical", `${canonicals.length} adet canonical var, 1 olmalı`);
  }
  const canonical = canonicals[0]?.href ?? "";
  if (canonicals.length > 0) {
    if (!canonical.startsWith(`${SITE_URL}/`)) {
      fail(rel, "canonical", `mutlak ${SITE_URL}/ adresi değil: ${canonical}`);
    } else if (!canonical.endsWith("/")) {
      fail(rel, "canonical", `sonu / ile bitmiyor: ${canonical}`);
    } else if (canonical !== expected) {
      fail(rel, "canonical", `${canonical} ≠ dosya yolu ${expected}`);
    }
  }

  // 2. hreflang: tr, en, x-default mutlak adresle ve var olan sayfaya
  const alternates = tags(head, "link").filter(
    (link) => link.rel === "alternate" && link.hreflang,
  );
  for (const code of ["tr", "en", "x-default"]) {
    const alt = alternates.find((link) => link.hreflang.toLowerCase() === code);
    if (!alt) {
      fail(rel, "hreflang", `hreflang="${code}" yok`);
    } else if (!alt.href?.startsWith(`${SITE_URL}/`)) {
      fail(rel, "hreflang", `hreflang="${code}" mutlak değil: ${alt.href}`);
    } else if (!pageUrls.has(alt.href)) {
      fail(rel, "hreflang", `hreflang="${code}" olmayan sayfaya gidiyor: ${alt.href}`);
    } else if (code === lang && alt.href !== expected) {
      fail(rel, "hreflang", `kendi dilindeki hreflang sayfanın kendisi değil: ${alt.href}`);
    }
  }

  // 3. noindex yok
  const robots = [...metaContent(head, "robots"), ...metaContent(head, "googlebot")];
  if (robots.some((content) => /noindex/i.test(content))) {
    fail(rel, "robots", "meta robots noindex var");
  }

  // 4. Başlık
  const title = titleOf(head);
  if (!title) {
    fail(rel, "title", "<title> yok");
  } else {
    const n = length(title);
    if (n > TITLE_MAX) fail(rel, "title", `${n} karakter (en çok ${TITLE_MAX}): ${title}`);
    else if (n > TITLE_WARN) warn(rel, "title", `${n} karakter, ${TITLE_WARN} üstü kesilebilir: ${title}`);
    if (titles.has(title)) {
      fail(rel, "title", `aynı başlık ${titles.get(title)} sayfasında da var: ${title}`);
    } else {
      titles.set(title, rel);
    }
  }

  // 5. Açıklama
  const descriptions = metaContent(head, "description");
  if (descriptions.length !== 1) {
    fail(rel, "description", `${descriptions.length} adet meta description var, 1 olmalı`);
  }
  const description = (descriptions[0] ?? "").trim();
  if (descriptions.length > 0) {
    const n = length(description);
    if (n < DESC_MIN || n > DESC_MAX) {
      fail(rel, "description", `${n} karakter (${DESC_MIN}–${DESC_MAX} olmalı): ${description}`);
    } else if (n < DESC_WARN) {
      warn(rel, "description", `${n} karakter, ${DESC_WARN} altı kısa: ${description}`);
    } else if (n > DESC_WARN_MAX) {
      warn(rel, "description", `${n} karakter, ${DESC_WARN_MAX} üstü kesilebilir: ${description}`);
    }
    if (ABBR_END.test(description)) {
      fail(rel, "description", `kısaltmayla bitiyor, cümle ortasında kesilmiş: …${description.slice(-40)}`);
    }
    if (PUNCT_BEFORE_ELLIPSIS.test(description)) {
      fail(rel, "description", `üç noktadan önce noktalama var: …${description.slice(-40)}`);
    }
  }

  // 6. Tek H1
  const h1s = (body.match(/<h1\b/gi) ?? []).length;
  if (h1s !== 1) fail(rel, "h1", `${h1s} adet <h1> var, 1 olmalı`);

  // 7. JSON-LD
  checkJsonLd(rel, html, body, expected, lang);

  // 9. İç bağlantılar: yalnızca aynı dildeki sayfalardan gelenler. Dil
  // değiştirici (hrefLang taşıyan <a>), başka dildeki sayfaya giden
  // bağlantılar ve sayfanın kendisine verdiği bağlantı sayılmıyor.
  for (const anchor of tags(body, "a")) {
    if (!anchor.href || anchor.hreflang) continue;
    const target = normalizeHref(anchor.href, expected);
    if (!target || target === expected) continue;
    if (localeOf(target) !== localeOf(expected)) continue;
    if (!inlinks.has(target)) inlinks.set(target, new Set());
    inlinks.get(target).add(expected);
  }
}

// 8. Sitemap: her <loc> bir dosyaya, her sayfa sitemap'e
const sitemapFile = join(OUT, "sitemap.xml");
const sitemapRel = relative(process.cwd(), sitemapFile);
if (!existsSync(sitemapFile)) {
  fail(sitemapRel, "sitemap", "sitemap.xml yok");
} else {
  const xml = readFileSync(sitemapFile, "utf8");
  const listed = new Set();
  for (const [, entry] of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = decodeEntities(entry.match(/<loc>([\s\S]*?)<\/loc>/)?.[1]?.trim() ?? "");
    if (!loc) {
      fail(sitemapRel, "sitemap", "<loc> olmayan <url> var");
      continue;
    }
    if (listed.has(loc)) fail(sitemapRel, "sitemap", `iki kez listelenmiş: ${loc}`);
    listed.add(loc);
    const target = fileOf(loc);
    if (!target || !existsSync(target)) {
      fail(sitemapRel, "sitemap", `dosyası olmayan adres: ${loc}`);
    } else if (!pageUrls.has(loc)) {
      fail(sitemapRel, "sitemap", `denetlenmeyen (dizin dışı) sayfa listelenmiş: ${loc}`);
    }
    const lastmod = entry.match(/<lastmod>([\s\S]*?)<\/lastmod>/)?.[1]?.trim();
    if (REQUIRE_LASTMOD && !(lastmod && ISO_8601.test(lastmod))) {
      fail(sitemapRel, "sitemap", `ISO-8601 <lastmod> yok: ${loc}`);
    }
  }
  for (const url of pageUrls.keys()) {
    if (!listed.has(url)) fail(sitemapRel, "sitemap", `sitemap'te yok: ${url}`);
  }
}

// 9. Proje sayfalarına yeterince iç bağlantı var mı (yalnızca uyarı)
for (const [url, file] of pageUrls) {
  const path = url.slice(SITE_URL.length);
  const [locale, segment, slug, extra] = path.split("/").filter(Boolean);
  if (!slug || extra || PROJECT_SEGMENT[locale] !== segment) continue;
  const count = inlinks.get(url)?.size ?? 0;
  if (count < MIN_PROJECT_INLINKS) {
    warn(
      relative(process.cwd(), file),
      "inlinks",
      `aynı dilde yalnızca ${count} sayfa bağlantı veriyor (en az ${MIN_PROJECT_INLINKS} önerilir)`,
    );
  }
}

// 10. llms.txt: Markdown H1 ile başlıyor, kısa kalıyor ve site içi her
// bağlantısı (çapası dahil) var olan bir sayfaya gidiyor.
const llmsFile = join(OUT, "llms.txt");
const llmsRel = relative(process.cwd(), llmsFile);
if (!existsSync(llmsFile)) {
  fail(llmsRel, "llms", "llms.txt yok");
} else {
  const text = readFileSync(llmsFile, "utf8");
  const lines = text.trimEnd().split("\n");
  if (!lines[0].startsWith("# ")) fail(llmsRel, "llms", "ilk satır Markdown H1 (# …) değil");
  if (lines.length > LLMS_MAX_LINES) {
    fail(llmsRel, "llms", `${lines.length} satır (en çok ${LLMS_MAX_LINES})`);
  }
  for (const [, url] of text.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)) {
    if (!url.startsWith(`${SITE_URL}/`)) continue;
    const [page, anchor] = url.split("#");
    if (!pageUrls.has(page)) {
      fail(llmsRel, "llms", `olmayan sayfaya bağlantı: ${url}`);
    } else if (anchor && !readFileSync(pageUrls.get(page), "utf8").includes(`id="${anchor}"`)) {
      fail(llmsRel, "llms", `sayfada olmayan çapa: ${url}`);
    }
  }
}

/* ---------- kök sayfa (out/index.html) ---------- */

const rootFile = join(OUT, "index.html");
const rootRel = relative(process.cwd(), rootFile);
const rootIssue = (message) =>
  (ROOT_STRICT ? fail : warn)(rootRel, "root", message);

if (!existsSync(rootFile)) {
  rootIssue("out/index.html yok");
} else {
  const html = readFileSync(rootFile, "utf8");
  const head = headOf(html);
  if (/noindex/i.test(html)) rootIssue("noindex içeriyor");
  if (html.includes("location.replace")) rootIssue("JS yönlendirmesi (location.replace) içeriyor");

  const canonical = tags(head, "link").find((link) => link.rel === "canonical")?.href;
  if (canonical !== `${SITE_URL}/tr/`) {
    rootIssue(`canonical ${SITE_URL}/tr/ olmalı, şu an: ${canonical ?? "yok"}`);
  }

  const refresh = tags(head, "meta").find(
    (meta) => meta["http-equiv"]?.toLowerCase() === "refresh",
  );
  const refreshUrl = refresh?.content?.match(/url\s*=\s*(\S+)/i)?.[1];
  if (refreshUrl !== "/tr/" && refreshUrl !== `${SITE_URL}/tr/`) {
    rootIssue(`meta refresh /tr/ adresine gitmeli, şu an: ${refreshUrl ?? "yok"}`);
  }

  const trHome = join(OUT, "tr", "index.html");
  const trTitle = existsSync(trHome) ? titleOf(headOf(readFileSync(trHome, "utf8"))) : null;
  const rootTitle = titleOf(head);
  if (rootTitle !== trTitle) {
    rootIssue(`<title> /tr/ ile aynı olmalı: "${rootTitle}" ≠ "${trTitle}"`);
  }

  if (!metaContent(head, "description").some((content) => content.trim())) {
    rootIssue("meta description boş ya da yok");
  }
}

/* ---------- rapor ---------- */

function print(heading, bucket) {
  if (bucket.size === 0) return;
  console.log(`\n${heading}`);
  for (const [file, items] of [...bucket].sort(([a], [b]) => a.localeCompare(b))) {
    console.log(`  ${file}`);
    for (const { rule, message } of items) console.log(`    [${rule}] ${message}`);
  }
}

function countByRule(bucket) {
  const counts = {};
  for (const items of bucket.values()) {
    for (const { rule } of items) counts[rule] = (counts[rule] ?? 0) + 1;
  }
  const total = Object.values(counts).reduce((sum, n) => sum + n, 0);
  const detail = Object.entries(counts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([rule, n]) => `${rule} ${n}`)
    .join(", ");
  return { total, text: detail ? `${total} (${detail})` : "0" };
}

console.log(`check-seo: ${pages.length} sayfa denetlendi${ROOT_STRICT ? " (ROOT_STRICT)" : ""}`);
print("HATALAR", failures);
print("UYARILAR", warnings);

const failed = countByRule(failures);
const warned = countByRule(warnings);
console.log(`\nÖzet: ${failed.text} hata, ${warned.text} uyarı`);

if (failed.total > 0) process.exit(1);
