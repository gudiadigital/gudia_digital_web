/**
 * Yayından sonra değişen adresleri IndexNow'a bildirir. IndexNow'a gelen
 * adresler Bing, Yandex, Naver, Seznam ve Yep ile paylaşılıyor; Google
 * katılmıyor (sitemap ping'i de emekli), ona ayrıca bir şey gönderilmiyor.
 *
 * GitHub Actions'ta deploy işinden sonra çalışıyor (.github/workflows/
 * deploy.yml, `indexnow` işi). O iş continue-on-error: burada ne ters
 * giderse gitsin site yayında kalıyor, yalnızca iş kırmızı görünüyor.
 *
 * Adres listesi:
 *  - URLS ortam değişkeni (build işinin çıktısı, JSON dizi); yoksa
 *    scripts/lastmod.mjs'in yazdığı .indexnow-urls.json;
 *  - RESUBMIT_ALL=1 ise canlı sitemap'teki bütün adresler (elle
 *    çalıştırılan yayında "resubmit_all" seçeneği).
 *
 * Anahtar: public/<anahtar>.txt, içinde yalnızca anahtarın kendisi.
 * IndexNow gereği herkese açık; tek kaynağı bu dosya.
 *
 * Kullanım:
 *   node scripts/indexnow.mjs            gönderir (deploy sonrası)
 *   node scripts/indexnow.mjs --dry-run  ağa hiç çıkmadan gönderilecek gövdeyi
 *                                        yazdırır; RESUBMIT_ALL=1 ile birlikte
 *                                        out/sitemap.xml okunur. Önce `npm run build`.
 *
 * Yalnızca Node'un kendi modülleri kullanılıyor; bağımlılık yok.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { SITE_URL, actionsWarning, locsOf } from "./site.mjs";

// SITE yalnızca elle deneme için (ör. başka bir önizleme adresi); yayında
// adres public/CNAME'den geliyor.
const SITE = (process.env.SITE ?? SITE_URL).replace(/\/+$/, "");
const HOST = new URL(SITE).host;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const DRY_RUN = process.argv.includes("--dry-run");
const RESUBMIT_ALL = process.env.RESUBMIT_ALL === "1" || process.env.RESUBMIT_ALL === "true";
const KEY_TRIES = 10;
const KEY_WAIT_MS = 30_000;
const TIMEOUT_MS = 15_000;

/** GitHub Actions'ta özet sayfasında görünen uyarı; yerelde düz satır. */
const warn = (message) => actionsWarning("IndexNow", message);

function stop(message) {
  warn(message);
  process.exit(1);
}

const sleep = (ms) => new Promise((done) => setTimeout(done, ms));

/** public/ kökünde, içeriği kendi adıyla aynı olan tek .txt dosyası. */
function findKey() {
  const dir = resolve("public");
  const keys = readdirSync(dir)
    .filter((name) => /^[A-Za-z0-9-]{8,128}\.txt$/.test(name))
    .filter((name) => readFileSync(join(dir, name), "utf8").trim() === name.slice(0, -4))
    .map((name) => name.slice(0, -4));
  if (keys.length !== 1) {
    stop(`public/ içinde tek bir anahtar dosyası olmalı, ${keys.length} bulundu`);
  }
  return keys[0];
}

async function get(url) {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { "cache-control": "no-cache" },
  });
  return { status: response.status, text: await response.text() };
}

async function urlList() {
  if (RESUBMIT_ALL) {
    if (DRY_RUN) {
      const file = resolve("out/sitemap.xml");
      if (!existsSync(file)) stop("out/sitemap.xml yok — önce `npm run build`");
      return locsOf(readFileSync(file, "utf8"));
    }
    const { status, text } = await get(`${SITE}/sitemap.xml`);
    if (status !== 200) stop(`${SITE}/sitemap.xml → HTTP ${status}`);
    return locsOf(text);
  }

  let raw = process.env.URLS;
  if (!raw?.trim()) {
    const file = resolve(".indexnow-urls.json");
    raw = existsSync(file) ? readFileSync(file, "utf8") : "[]";
  }
  let list;
  try {
    list = JSON.parse(raw);
  } catch (error) {
    stop(`adres listesi JSON değil: ${error.message}`);
  }
  if (!Array.isArray(list)) stop("adres listesi dizi değil");
  return list;
}

/** Anahtar dosyası canlı sitede gerçekten anahtarı döndürene kadar bekler (ilk yayında CDN gecikebiliyor). */
async function waitForKey(keyLocation, key) {
  for (let attempt = 1; attempt <= KEY_TRIES; attempt += 1) {
    try {
      const { status, text } = await get(keyLocation);
      if (status === 200 && text.trim() === key) {
        console.log(`indexnow: anahtar yayında (${attempt}. deneme)`);
        return;
      }
      console.log(`indexnow: anahtar henüz yayında değil (HTTP ${status}), ${attempt}/${KEY_TRIES}`);
    } catch (error) {
      console.log(`indexnow: anahtar okunamadı (${error.message}), ${attempt}/${KEY_TRIES}`);
    }
    if (attempt < KEY_TRIES) await sleep(KEY_WAIT_MS);
  }
  stop(`${keyLocation} ${KEY_TRIES} denemede anahtarı döndürmedi; gönderilmedi`);
}

const key = findKey();
const keyLocation = `${SITE}/${key}.txt`;

const all = await urlList();
// Başka alan adındaki adres bütün isteği 422 ile düşürür; ayıklanıyor.
const urls = [...new Set(all.filter((url) => typeof url === "string" && url.startsWith(`${SITE}/`)))];
if (urls.length !== all.length) warn(`${all.length - urls.length} adres ${SITE} dışında ya da tekrar, atlandı`);

if (urls.length === 0) {
  console.log("indexnow: değişen adres yok, gönderilecek bir şey yok");
  process.exit(0);
}

const payload = { host: HOST, key, keyLocation, urlList: urls };

if (DRY_RUN) {
  console.log(`indexnow: --dry-run, ${urls.length} adres gönderilecekti (POST ${ENDPOINT}):`);
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

await waitForKey(keyLocation, key);

let response;
try {
  response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
} catch (error) {
  stop(`istek gönderilemedi: ${error.message}`);
}

console.log(`IndexNow HTTP ${response.status} (${urls.length} adres)`);
for (const url of urls) console.log(`  ${url}`);

const MEANING = {
  400: "istek biçimi hatalı",
  403: "anahtar geçersiz ya da anahtar dosyası okunamadı",
  422: "adresler bu alan adına ait değil ya da anahtar eşleşmiyor",
  // Bu adresler kendiliğinden yeniden gönderilmiyor; gerekirse elle
  // çalıştırılan yayında resubmit_all seçilebilir.
  429: "çok fazla istek",
};
if (response.status !== 200 && response.status !== 202) {
  stop(`HTTP ${response.status}: ${MEANING[response.status] ?? "beklenmeyen yanıt"}`);
}
