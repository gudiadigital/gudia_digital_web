#!/bin/bash
# Kaydırmalı bölümün videosunu hazırlar.
#
# Kullanım: tools/prepare-video.sh <ham-video-dosyasi>
#
# Yaptıkları:
#  - sesi kaldırır (arka plan videosu sessiz olmalı)
#  - rengi marka paletine çeker (soğuk maviden mor-maviye)
#  - HER KAREYİ anahtar kare yapar; bu olmadan tarayıcı kaydırırken
#    ara karelere atlayamıyor ve video takılıyor
#  - 1152px genişliğe indirir (kartlarda gösterilen boyut için yeterli)
#  - poster görselini üretir
set -euo pipefail

SRC="${1:?kaynak video yolu gerekli}"
OUT_DIR="public/video"
[ -f "$SRC" ] || { echo "dosya yok: $SRC" >&2; exit 1; }

echo "kaynak : $SRC"
ffprobe -v error -show_entries format=duration -show_entries stream=width,height \
  -of default=noprint_wrappers=1 "$SRC" | sed 's/^/  /'

ffmpeg -hide_banner -loglevel error -y -i "$SRC" -an \
  -vf "colorbalance=rs=-0.04:gs=-0.03:bs=0.06:rm=0.03:gm=-0.02:bm=0.07:rh=0.05:bh=0.04,eq=saturation=1.12:contrast=1.05,fps=15,scale=1152:-2,format=yuv420p" \
  -c:v libx264 -preset slow -crf 34 -g 1 -keyint_min 1 -sc_threshold 0 -movflags +faststart \
  "$OUT_DIR/story.mp4"

ffmpeg -loglevel error -y -i "$OUT_DIR/story.mp4" -frames:v 1 -q:v 5 "$OUT_DIR/story-poster.jpg"

frames=$(ffprobe -v error -select_streams v:0 -count_frames -show_entries stream=nb_read_frames -of csv=p=0 "$OUT_DIR/story.mp4")
keys=$(ffprobe -v error -select_streams v:0 -show_entries frame=key_frame -of csv=p=0 "$OUT_DIR/story.mp4" | grep -c '^1')
echo "sonuç  : $(du -h "$OUT_DIR/story.mp4" | cut -f1), ${frames} kare, ${keys} anahtar kare"
[ "$frames" = "$keys" ] && echo "         hepsi anahtar kare — kaydırma akıcı olacak" || echo "         UYARI: anahtar kare eksik, kaydırma takılabilir"
