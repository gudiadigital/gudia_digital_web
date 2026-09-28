/**
 * Site haritasına gerçek <lastmod> tarihleri yazar ve IndexNow'a
 * bildirilecek adresleri seçer.
 *
 * Neden içerik parmak izi: metnin tamamı tr.ts / en.ts'te duruyor, yani
 * git tarihine bakılsa tek bir cümle değişikliği bütün sayfaları
 * "değişti" gösterirdi; elle tutulan tarih de zamanla kayıyor. Bunun
 * yerine her sayfanın yayınlanacak metninden bir özet (sha256) çıkarılıp
 * bir önceki yayının özetiyle karşılaştırılıyor. Yalnızca gerçekten
 * değişen sayfanın tarihi güncelleniyor; değişmeyen eski tarihini koruyor.
 *
 * Özete giren: <title>, meta açıklama ve <main>'in metni (JSON-LD dahil,
 * diğer script'ler hariç). Header ve footer <main>'in dışında: footer'daki
 * yıl ya da ortak menü bütün sayfaları değişmiş göstermesin.
 *
 * Önceki yayının özetleri:
 *  - GitHub Actions'ta (CI=true) canlı sitedeki /lastmod.json okunuyor
 *    (LASTMOD_BASE ile başka bir adres verilebilir);
 *  - yerelde LASTMOD_BASE_FILE verilmişse o dosya;
 *  - okunamazsa uyarı verilip boş kabul ediliyor: bütün sayfalar bu
 *    derlemenin tarihini alıyor. Yayın bu yüzden durmuyor. Boş kabul edilen
 *    özet bir sonraki yayına aynen geçtiği için bu, geçmiş tarihlerin kalıcı
 *    olarak silinmesi demek; CI'da bu yüzden birkaç kez deneniyor ve uyarı
 *    Actions özetine düşüyor. Yalnızca 404 (ilk yayın, dosya henüz yok)
 *    sessizce boş sayılıyor.
 *
 * Çıktılar:
 *  - out/lastmod.json   { adres: { hash, lastmod } }; bir sonraki yayın bunu okuyor
 *  - out/sitemap.xml    her <loc>'un ardına <lastmod>
 *  - .indexnow-urls.json  değişen (ve sitemap'ten çıkan) adresler; deploy.yml
 *                        bunu IndexNow işine aktarıyor (depoya girmiyor)
 *
 * Yalnızca Node'un kendi modülleri kullanılıyor; bağımlılık yok.
 */
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { setTimeout as sleep } from "node:timers/promises";

const SITE_URL = "https://gudiadigital.com";
const OUT = resolve("out");
const SITEMAP = join(OUT, "sitemap.xml");
const MANIFEST = join(OUT, "lastmod.json");
const CHANGED = resolve(".indexnow-urls.json");
const FETCH_TIMEOUT_MS = 10_000;
const FETCH_ATTEMPTS = 3;
const FETCH_BACKOFF_MS = 2_000;
const ISO_8601 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;

const now = new Date().toISOString();

function fail(message) {
  console.error(`lastmod: ${message}`);
  process.exit(1);
}

if (!existsSync(SITEMAP)) fail("out/sitemap.xml yok — önce next build çalışmalı");

/* ---------- parmak izi ---------- */

/** Sitemap adresi → sayfa dosyası: https://gudiadigital.com/tr/kvkk/ → out/tr/kvkk/index.html */
function fileOf(url) {
  if (!url.startsWith(`${SITE_URL}/`)) fail(`site dışı adres: ${url}`);
  const path = url.slice(SITE_URL.length);
  return join(OUT, ...path.split("/").filter(Boolean), "index.html");
}

function metaDescription(html) {
  const tag = (html.match(/<meta\b[^>]*>/gi) ?? []).find((meta) =>
    /\bname\s*=\s*["']?description["']?(\s|\/|>)/i.test(meta),
  );
  return tag?.match(/\bcontent\s*=\s*"([^"]*)"/i)?.[1] ?? "";
}

/**
 * Sayfanın okunan içeriği. Etiketler ve nitelikler atılıyor: sınıf adı,
 * Next'in derleme kimliği ya da RSC verisi gibi her derlemede değişebilen
 * şeyler özete girmesin. JSON-LD script'inin içi metin olarak kalıyor;
 * yapılandırılmış veri değişirse sayfa da değişmiş sayılıyor.
 */
function fingerprint(file, html) {
  const title = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "";
  const main = html.match(/<main\b[^>]*>([\s\S]*)<\/main>/i)?.[1];
  if (main === undefined) fail(`<main> bulunamadı: ${file}`);

  const text = main
    .replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (_, attrs, body) =>
      /\btype\s*=\s*["']?application\/ld\+json/i.test(attrs) ? ` ${body} ` : " ",
    )
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return createHash("sha256")
    .update([title.trim(), metaDescription(html).trim(), text].join("\n"))
    .digest("hex");
}

/* ---------- önceki yayının özetleri ---------- */

/** Yalnızca biçimi doğru kayıtlar; bozuk kayıt "değişmiş" sayılsın diye atılıyor. */
function sanitize(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("nesne değil");
  }
  return Object.fromEntries(
    Object.entries(data).filter(
      ([, entry]) =>
        typeof entry?.hash === "string" &&
        typeof entry?.lastmod === "string" &&
        ISO_8601.test(entry.lastmod),
    ),
  );
}

/** GitHub Actions'ta ::warning:: satırı olarak yazılıyor; çalıştırmanın özetinde görünsün. */
function warn(message) {
  const text = `lastmod: UYARI ${message}`;
  if (process.env.GITHUB_ACTIONS === "true") console.log(`::warning::${text}`);
  else console.warn(text);
}

/**
 * Canlı sitedeki özet. Geçici hata (zaman aşımı, 5xx, yarım yanıt) birkaç
 * kez yeniden deneniyor. 404 yeniden denenmiyor: ilk yayında dosya yok,
 * bu durumda null dönüyor.
 */
async function fetchManifest(base) {
  let lastError;
  for (let attempt = 1; attempt <= FETCH_ATTEMPTS; attempt++) {
    // Sorgu parametresi CDN'deki eski kopyayı atlatıyor (Pages max-age=600).
    const source = `${base}/lastmod.json?build=${Date.now()}`;
    try {
      const response = await fetch(source, {
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
        headers: { accept: "application/json" },
      });
      if (response.status === 404) return null;
      if (!response.ok) throw new Error(`${source} → HTTP ${response.status}`);
      return sanitize(await response.json());
    } catch (error) {
      lastError = error;
      if (attempt < FETCH_ATTEMPTS) {
        console.log(`lastmod: ${attempt}. deneme başarısız (${error.message}); yeniden deneniyor`);
        await sleep(FETCH_BACKOFF_MS * attempt);
      }
    }
  }
  throw lastError;
}

async function previousManifest() {
  try {
    if (process.env.CI === "true") {
      const base = (process.env.LASTMOD_BASE ?? SITE_URL).replace(/\/+$/, "");
      const manifest = await fetchManifest(base);
      if (manifest === null) {
        console.log(`lastmod: ${base}/lastmod.json yok (ilk yayın); bütün sayfalar bu derlemenin tarihini alıyor`);
        return {};
      }
      console.log(`lastmod: önceki yayın ${base}/lastmod.json (${Object.keys(manifest).length} kayıt)`);
      return manifest;
    }
    if (process.env.LASTMOD_BASE_FILE) {
      const file = resolve(process.env.LASTMOD_BASE_FILE);
      const manifest = sanitize(JSON.parse(readFileSync(file, "utf8")));
      console.log(`lastmod: önceki yayın ${file} (${Object.keys(manifest).length} kayıt)`);
      return manifest;
    }
    console.log("lastmod: önceki yayın verilmedi (yerel derleme); bütün sayfalar bu derlemenin tarihini alıyor");
    return {};
  } catch (error) {
    warn(`önceki yayın okunamadı (${error.message}); bütün sayfalar bu derlemenin tarihini alıyor`);
    return {};
  }
}

/* ---------- çalıştır ---------- */

const decode = (text) =>
  text.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim();

const xml = readFileSync(SITEMAP, "utf8");
const urls = [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/g)].map((match) => decode(match[1]));
if (urls.length === 0) fail("out/sitemap.xml'de <loc> yok");

const previous = await previousManifest();
const manifest = {};
const changed = [];

for (const url of [...new Set(urls)].sort()) {
  const file = fileOf(url);
  if (!existsSync(file)) fail(`sitemap'teki adresin dosyası yok: ${url}`);
  const hash = fingerprint(file, readFileSync(file, "utf8"));
  const before = previous[url];
  if (before?.hash === hash) {
    manifest[url] = { hash, lastmod: before.lastmod };
  } else {
    manifest[url] = { hash, lastmod: now };
    changed.push(url);
  }
}

// Önceki yayında olup artık sitemap'te olmayan adresler de bildiriliyor:
// IndexNow kaldırılan sayfaların da gönderilmesini istiyor.
const removed = Object.keys(previous)
  .filter((url) => url.startsWith(`${SITE_URL}/`) && !(url in manifest))
  .sort();

const sitemap = xml.replace(/<url>([\s\S]*?)<\/url>/g, (entry, body) => {
  const loc = body.match(/<loc>([\s\S]*?)<\/loc>/)?.[1];
  if (!loc) return entry;
  const clean = body.replace(/\s*<lastmod>[\s\S]*?<\/lastmod>/g, "");
  return `<url>${clean.replace(
    /<\/loc>/,
    `</loc>\n<lastmod>${manifest[decode(loc)].lastmod}</lastmod>`,
  )}</url>`;
});

writeFileSync(SITEMAP, sitemap);
writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
// Tek satır: deploy.yml bunu olduğu gibi $GITHUB_OUTPUT'a yazıyor.
writeFileSync(CHANGED, JSON.stringify([...changed, ...removed]));

console.log(`lastmod: ${changed.length} changed / ${urls.length} total`);
if (removed.length > 0) console.log(`lastmod: ${removed.length} adres sitemap'ten çıktı`);
// Karşılaştırılacak önceki yayın yoksa liste bütün sayfalar; yazdırmaya değmez.
if (Object.keys(previous).length > 0) {
  for (const url of [...changed, ...removed]) console.log(`  ${url}`);
}
