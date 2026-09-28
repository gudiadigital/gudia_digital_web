/**
 * Derlenmiş sitedeki (out/) her karakterin web fontlarında gerçekten
 * bulunduğunu denetler.
 *
 * public/fonts altındaki dosyalar alt kümelenmiş durumda (tools/subset-fonts.sh):
 * latin-ext dosyalarında yalnızca Ğ ğ İ Ş ş var. Metne bunların dışında bir
 * karakter girerse (₺, →, ‰ gibi) tarayıcı o harfi hata vermeden başka bir
 * fontla çizer; bu betik bunu derlemeden sonra yakalar.
 *
 * fonts.css'teki her @font-face için unicode-range ve dosyanın cmap tablosu
 * okunuyor. Bir karakter, aralığı onu kapsayan dosyaların hiçbirinde yoksa
 * hata. Google'ın latin aralığı dosyada olmayan karakterleri de kapsadığı
 * için (ör. U+2030 ‰) yalnızca aralığa bakmak yetmiyor.
 *
 * Kullanım: önce `npm run build`, sonra `node scripts/check-fonts.mjs`.
 * Yalnızca Node'un kendi modülleri kullanılıyor; bağımlılık yok.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { brotliDecompressSync } from "node:zlib";

const OUT = resolve("out");
const FONTS_CSS = resolve("src/app/fonts.css");
const PUBLIC = resolve("public");

if (!existsSync(OUT)) {
  console.error("check-fonts: out/ yok — önce `npm run build` çalışmalı");
  process.exit(1);
}

/* ---------- fonts.css: aile, dosya ve unicode-range ---------- */

/** "U+0000-00FF, U+0131" → [[0, 255], [305, 305]] */
function parseUnicodeRange(value) {
  return value.split(",").map((part) => {
    const [from, to] = part.trim().replace(/^U\+/i, "").split("-");
    if (from.includes("?")) {
      return [parseInt(from.replace(/\?/g, "0"), 16), parseInt(from.replace(/\?/g, "F"), 16)];
    }
    return [parseInt(from, 16), parseInt(to ?? from, 16)];
  });
}

const faces = [];
for (const [, body] of readFileSync(FONTS_CSS, "utf8").matchAll(/@font-face\s*{([^}]*)}/g)) {
  const family = body.match(/font-family:\s*["']?([^"';]+)["']?\s*;/)?.[1];
  const url = body.match(/url\(["']?(\/fonts\/[^"')]+\.woff2)["']?\)/)?.[1];
  // local("Arial") ile tanımlanan yedek aileler dosya içermiyor.
  if (!family || !url) continue;
  const range = body.match(/unicode-range:\s*([^;]+);/)?.[1] ?? "U+0-10FFFF";
  faces.push({ family, url, ranges: parseUnicodeRange(range) });
}

if (faces.length === 0) {
  console.error("check-fonts: fonts.css içinde woff2 dosyası olan @font-face bulunamadı");
  process.exit(1);
}

/* ---------- woff2 dosyasından cmap okuma ---------- */

function readBase128(buf, offset) {
  let value = 0;
  for (let i = 0; i < 5; i++) {
    const byte = buf[offset + i];
    value = value * 128 + (byte & 0x7f);
    if ((byte & 0x80) === 0) return [value, offset + i + 1];
  }
  throw new Error("geçersiz UIntBase128");
}

/** WOFF2 tablolarını açıp cmap'in eşlediği kod noktalarını döndürür. */
function woff2Codepoints(file) {
  const buf = readFileSync(file);
  if (buf.toString("latin1", 0, 4) !== "wOF2") throw new Error("woff2 değil");
  const numTables = buf.readUInt16BE(12);
  const compressedSize = buf.readUInt32BE(20);
  let offset = 48;
  let cmapStart = -1;
  let cmapLength = 0;
  let position = 0;
  for (let i = 0; i < numTables; i++) {
    const flags = buf[offset++];
    const tagIndex = flags & 0x3f;
    let tag = null;
    if (tagIndex === 63) {
      tag = buf.toString("latin1", offset, offset + 4);
      offset += 4;
    }
    let length;
    [length, offset] = readBase128(buf, offset);
    // glyf (10) ve loca (11) için 0 "dönüştürülmüş", diğerleri için 0 "olduğu gibi".
    const version = flags >> 6;
    const transformed = tagIndex === 10 || tagIndex === 11 ? version !== 3 : version !== 0;
    if (transformed) [length, offset] = readBase128(buf, offset);
    if (tagIndex === 0 || tag === "cmap") {
      cmapStart = position;
      cmapLength = length;
    }
    position += length;
  }
  if (cmapStart < 0) throw new Error("cmap tablosu yok");
  const data = brotliDecompressSync(buf.subarray(offset, offset + compressedSize));
  const cmap = data.subarray(cmapStart, cmapStart + cmapLength);

  const codepoints = new Set();
  const numSubtables = cmap.readUInt16BE(2);
  for (let i = 0; i < numSubtables; i++) {
    const platform = cmap.readUInt16BE(4 + i * 8);
    const encoding = cmap.readUInt16BE(6 + i * 8);
    const unicode = platform === 0 || (platform === 3 && (encoding === 1 || encoding === 10));
    if (!unicode) continue;
    const sub = cmap.subarray(cmap.readUInt32BE(8 + i * 8));
    const format = sub.readUInt16BE(0);
    if (format === 4) {
      const segCount = sub.readUInt16BE(6) / 2;
      const ends = 14;
      const starts = ends + segCount * 2 + 2;
      const deltas = starts + segCount * 2;
      const rangeOffsets = deltas + segCount * 2;
      for (let s = 0; s < segCount; s++) {
        const end = sub.readUInt16BE(ends + s * 2);
        const start = sub.readUInt16BE(starts + s * 2);
        const delta = sub.readInt16BE(deltas + s * 2);
        const rangeOffset = sub.readUInt16BE(rangeOffsets + s * 2);
        for (let c = start; c <= end && c !== 0xffff; c++) {
          let glyph;
          if (rangeOffset === 0) {
            glyph = (c + delta) & 0xffff;
          } else {
            glyph = sub.readUInt16BE(rangeOffsets + s * 2 + rangeOffset + (c - start) * 2);
            if (glyph !== 0) glyph = (glyph + delta) & 0xffff;
          }
          if (glyph !== 0) codepoints.add(c);
        }
      }
    } else if (format === 12) {
      const groups = sub.readUInt32BE(12);
      for (let g = 0; g < groups; g++) {
        const start = sub.readUInt32BE(16 + g * 12);
        const end = sub.readUInt32BE(20 + g * 12);
        const firstGlyph = sub.readUInt32BE(24 + g * 12);
        for (let c = start; c <= end; c++) {
          if (firstGlyph + (c - start) !== 0) codepoints.add(c);
        }
      }
    }
  }
  return codepoints;
}

for (const face of faces) {
  const file = join(PUBLIC, face.url);
  if (!existsSync(file)) {
    console.error(`check-fonts: ${face.url} yok (fonts.css'te geçiyor)`);
    process.exit(1);
  }
  face.codepoints = woff2Codepoints(file);
}

/* ---------- out/ içindeki metin ---------- */

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    // HTML ve RSC yükü (.txt) sayfadaki bütün metni taşıyor; CSS'e de
    // content: ile metin girebilir. JS dosyaları dışarıda: React'in düzenli
    // ifadelerindeki Unicode aralıkları ekranda görünmüyor.
    else if (/\.(html|txt|css)$/.test(entry.name)) yield path;
  }
}

function decodeEscapes(text) {
  return text
    .replace(/\\u([0-9a-f]{4})/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)));
}

/** @type {Map<string, string>} karakter → ilk görüldüğü dosya */
const seen = new Map();
for (const file of walk(OUT)) {
  for (const char of decodeEscapes(readFileSync(file, "utf8"))) {
    if (seen.has(char)) continue;
    const where = relative(OUT, file);
    seen.set(char, where);
    // Etiketlerde text-transform: uppercase var ve lang="tr" altında i → İ oluyor.
    for (const upper of [char.toLocaleUpperCase("tr"), char.toLocaleUpperCase("en")]) {
      for (const u of upper) if (!seen.has(u)) seen.set(u, `${where} (büyük harf)`);
    }
  }
}

/* ---------- denetim ---------- */

// Kontrol karakterleri ve boşlukların görünen bir glifi yok.
const INVISIBLE = /[\p{C}\p{Z}]/u;
const inRanges = (ranges, cp) => ranges.some(([from, to]) => cp >= from && cp <= to);

const families = [...new Set(faces.map((f) => f.family))];
const missing = [];
for (const [char, where] of seen) {
  if (INVISIBLE.test(char)) continue;
  const cp = char.codePointAt(0);
  for (const family of families) {
    const covered = faces.some(
      (f) => f.family === family && inRanges(f.ranges, cp) && f.codepoints.has(cp),
    );
    if (!covered) missing.push({ family, cp, char, where });
  }
}

const hex = (cp) => `U+${cp.toString(16).toUpperCase().padStart(4, "0")}`;
const extra = [...seen.keys()]
  .filter((c) => c.codePointAt(0) > 0xff && !INVISIBLE.test(c))
  .sort()
  .join(" ");

if (missing.length > 0) {
  console.error("check-fonts: fontlarda olmayan karakterler:");
  for (const m of missing) {
    console.error(`  ${m.family}: ${hex(m.cp)} "${m.char}" — ${m.where}`);
  }
  console.error(
    "Karakter Google'ın latin-ext dosyasında varsa (₺ gibi) tools/subset-fonts.sh ve " +
      "fonts.css'teki latin-ext aralığına ekleyip fontları yeniden üret; yoksa (→ gibi) " +
      "metinde başka bir karakter kullan.",
  );
  process.exit(1);
}

console.log(
  `check-fonts: ${seen.size} farklı karakter, ${families.length} aile — hepsi fontlarda var. Latin-1 dışı: ${extra}`,
);
