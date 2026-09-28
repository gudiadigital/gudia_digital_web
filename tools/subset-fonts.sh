#!/bin/bash
# public/fonts altındaki web fontlarını küçültür. Neden ve nasıl kullanıldıkları
# için src/app/fonts.css'in başındaki açıklamaya bak.
#
# Kaynak, Google Fonts'un tam değişken woff2 dosyaları. Artık public/ altında
# durmuyorlar; depoya fbc5b6b ile girdiler, betik onları oradan okur.
# Başka bir klasördeki kaynakları kullanmak için: tools/subset-fonts.sh <klasör>
#
# Her dosya iki adımdan geçer:
#  1. pyftsubset — dosyada yalnızca fonts.css'teki unicode-range'in tarayıcıyı
#     o dosyaya yönlendirdiği karakterler kalır. latin dosyalarında bu Google'ın
#     aralığıyla aynı; aralık dışında kalıp hiç kullanılmayan birkaç birleşik
#     aksan ve onlara bağlı glifler düşüyor. latin-ext dosyalarında yalnızca
#     Türkçe'nin Latin-1 dışındaki harfleri kalıyor: Ğ ğ İ Ş ş (ı zaten latin
#     dosyasında). OpenType özelliklerinin hepsi (tnum, calt…) korunur; yalnızca
#     tarayıcının okumadığı glif adları atılır.
#  2. varLib.instancer — ağırlık ekseni fonts.css'te bildirilen aralığa
#     daraltılır (Inter 400–600, Space Grotesk 500–700). Aralığın içindeki her
#     ağırlık öncekiyle aynı çiziliyor; dışını tarayıcı zaten kullanmıyordu.
#
# Gerekenler: pip install fonttools brotli (depoya bağımlılık olarak girmez).
#
# Font ya da karakter listesi değişirse VERSION'ı artır (tarayıcı ve CDN eski
# dosyayı önbellekte tutmasın), fonts.css'teki adresleri ve unicode-range'i,
# layout.tsx'teki FONT_FILES'ı da güncelle. Ardından `npm run build` ve
# `node scripts/check-fonts.mjs` ile sitedeki her karakterin fontta olduğunu
# doğrula.
set -euo pipefail

VERSION="v2"
SOURCE_COMMIT="fbc5b6b"
# İkisi de fonts.css'teki unicode-range değerleriyle aynı olmalı.
LATIN="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"
TR_EXT="U+011E-011F,U+0130,U+015E-015F"

OUT="public/fonts"
[ -d "$OUT" ] || { echo "klasör yok: $OUT (depo kökünden çalıştır)" >&2; exit 1; }
command -v pyftsubset >/dev/null || { echo "pyftsubset bulunamadı: pip install fonttools brotli" >&2; exit 1; }
command -v fonttools >/dev/null || { echo "fonttools bulunamadı: pip install fonttools brotli" >&2; exit 1; }

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

src="${1:-}"
if [ -z "$src" ]; then
  src="$tmp/src"
  mkdir -p "$src"
  for f in inter-latin inter-latin-ext space-grotesk-latin space-grotesk-latin-ext; do
    git show "$SOURCE_COMMIT:public/fonts/$f.woff2" > "$src/$f.woff2"
  done
fi

# build <kaynak adı> <karakterler> <ağırlık aralığı>
build() {
  local name="$1" unicodes="$2" wght="$3"
  pyftsubset "$src/$name.woff2" \
    --unicodes="$unicodes" \
    --layout-features='*' \
    --name-IDs='*' \
    --notdef-outline \
    --flavor=woff2 \
    --output-file="$tmp/$name.woff2"
  fonttools varLib.instancer "$tmp/$name.woff2" "wght=$wght" \
    --no-recalc-timestamp -q \
    -o "$OUT/$name-$VERSION.woff2"
  printf "%-28s %7d B -> %6d B\n" "$name" \
    "$(wc -c < "$src/$name.woff2")" "$(wc -c < "$OUT/$name-$VERSION.woff2")"
}

build inter-latin "$LATIN" 400:600
build inter-latin-ext "$TR_EXT" 400:600
build space-grotesk-latin "$LATIN" 500:700
build space-grotesk-latin-ext "$TR_EXT" 500:700
