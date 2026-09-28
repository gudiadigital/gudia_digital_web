/**
 * Derleme betiklerinin (check-seo, lastmod, indexnow) ortak parçaları:
 * sitenin adresi, out/ ile adres arasındaki dönüşüm, sitemap <loc> okuma
 * ve GitHub Actions uyarısı.
 *
 * Adres public/CNAME'den okunuyor; GitHub Pages'in yayınladığı alan adı o
 * dosya. Betikler adresi ayrı ayrı yazdığında alan adı değişirse biri
 * eskisinde kalıp lastmod ya da check-seo yanlış siteye göre karar
 * veriyordu. TypeScript tarafındaki SITE_URL (src/i18n/site.ts) ayrı
 * duruyor; ikisi ayrışırsa check-seo'nun canonical kuralı her sayfada
 * hata veriyor.
 *
 * Yalnızca Node'un kendi modülleri kullanılıyor; bağımlılık yok.
 */
import { readFileSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";

const host = readFileSync(new URL("../public/CNAME", import.meta.url), "utf8").trim();
if (!/^[a-z0-9.-]+$/i.test(host)) {
  throw new Error(`public/CNAME geçerli bir alan adı değil: "${host}"`);
}

/** https://gudiadigital.com — sonunda / yok. */
export const SITE_URL = `https://${host}`;

export const OUT = resolve("out");

/** out/tr/hakkimizda/index.html → https://gudiadigital.com/tr/hakkimizda/ */
export function urlOf(file) {
  const dir = relative(OUT, file).split(sep).slice(0, -1).join("/");
  return `${SITE_URL}/${dir ? `${dir}/` : ""}`;
}

/**
 * Site içi adres → out/ altındaki sayfa dosyası; sorgu ve çapa atılıyor.
 * Site dışıysa null: https://gudiadigital.com/tr/kvkk/ → out/tr/kvkk/index.html
 */
export function fileOf(url) {
  if (!url.startsWith(`${SITE_URL}/`)) return null;
  const path = url.slice(SITE_URL.length).replace(/[?#].*$/, "");
  return join(OUT, ...path.split("/").filter(Boolean), "index.html");
}

const XML_ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };

/** XML kaçışlarını (&amp; &#38; …) çözer ve baştaki/sondaki boşluğu atar. */
export function decodeXml(text) {
  return text
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code) => {
      if (code[0] === "#") {
        const n = code[1].toLowerCase() === "x"
          ? parseInt(code.slice(2), 16)
          : parseInt(code.slice(1), 10);
        return Number.isFinite(n) ? String.fromCodePoint(n) : match;
      }
      return XML_ENTITIES[code.toLowerCase()] ?? match;
    })
    .trim();
}

/** Tek bir <url> gövdesindeki <loc>; yoksa null. */
export function locOf(entry) {
  const raw = entry.match(/<loc>([\s\S]*?)<\/loc>/)?.[1];
  return raw === undefined ? null : decodeXml(raw);
}

/** Sitemap'teki bütün <loc> adresleri, dosyadaki sırayla. */
export function locsOf(xml) {
  return [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/g)].map((match) => decodeXml(match[1]));
}

/**
 * GitHub Actions'ta ::warning:: satırı (çalıştırmanın özetinde görünüyor),
 * yerelde düz bir uyarı satırı.
 */
export function actionsWarning(tag, message) {
  if (process.env.GITHUB_ACTIONS === "true") console.log(`::warning::${tag}: ${message}`);
  else console.warn(`${tag}: UYARI ${message}`);
}
