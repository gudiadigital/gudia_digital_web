#!/bin/bash
# public/projeler altındaki görselleri WebP'ye çevirir.
#
# İki boyut üretilir:
#  - ss-N.webp       tam boy, proje detayındaki şeritte kullanılır
#  - ss-N-card.webp  420px, proje kartındaki üçlü şeritte kullanılır
#    (kart görseli ~150px genişlikte çıkıyor; 2x ekranda 300px yetiyor)
#
# Kart kapak görselleri (projeler/*.jpg) tek boyutta çevrilir.
# JPEG kaynaklar silinir; yeniden üretmek gerekirse git geçmişinde duruyor.
set -euo pipefail

DIR="public/projeler"
[ -d "$DIR" ] || { echo "klasör yok: $DIR" >&2; exit 1; }

command -v cwebp >/dev/null || { echo "cwebp bulunamadı" >&2; exit 1; }

once=$(du -sk "$DIR" | cut -f1)

# --- ekran görüntüleri ---
find "$DIR" -mindepth 2 -name "ss-*.jpg" | while read -r f; do
  base="${f%.jpg}"
  cwebp -quiet -q 80 -m 6 "$f" -o "$base.webp"
  cwebp -quiet -q 76 -m 6 -resize 420 0 "$f" -o "$base-card.webp"
  rm "$f"
done

# --- kart kapakları ve ikonlar ---
find "$DIR" -maxdepth 1 -name "*.jpg" | while read -r f; do
  cwebp -quiet -q 82 -m 6 "$f" -o "${f%.jpg}.webp"
  rm "$f"
done

sonra=$(du -sk "$DIR" | cut -f1)
printf "%s KB -> %s KB (%%%d küçüldü)\n" "$once" "$sonra" \
  "$(( (once - sonra) * 100 / once ))"
