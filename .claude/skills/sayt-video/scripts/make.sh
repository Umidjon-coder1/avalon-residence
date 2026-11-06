#!/usr/bin/env bash
# Kadrlar + fon musiqasi -> tayyor mp4.
# Ishlatish: make.sh <kadrlar_papkasi> <chiqish.mp4> [desktop|mobile] [musiqa.wav|mp3]
# Musiqa berilmasa, music.py bilan video uzunligida yaratiladi. Musiqa ovozi past: -23 LUFS.
set -euo pipefail
FRAMES=$1
OUT=$2
MODE=${3:-desktop}
MUSIC=${4:-}
FPS=${FPS:-30}
HERE=$(cd "$(dirname "$0")" && pwd)

N=$(ls "$FRAMES"/f*.jpg | wc -l)
DUR=$(python3 -c "print(round($N / $FPS + 0.2, 2))")
if [ -z "$MUSIC" ]; then
  MUSIC="$FRAMES/../music-$MODE.wav"
  python3 "$HERE/music.py" "$MUSIC" "$DUR"
fi

if [ "$MODE" = "mobile" ]; then VF="scale=1080:1920:flags=lanczos"; CRF=19; else VF="null"; CRF=18; fi
ffmpeg -y -v error -framerate "$FPS" -i "$FRAMES/f%05d.jpg" -i "$MUSIC" \
  -filter_complex "[0:v]$VF[v];[1:a]loudnorm=I=-23:TP=-2:LRA=8,afade=t=out:st=$(python3 -c "print(max(0, $DUR - 3))"):d=3[a]" \
  -map "[v]" -map "[a]" -c:v libx264 -preset slow -crf "$CRF" -pix_fmt yuv420p \
  -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart "$OUT"
echo "tayyor: $OUT ($DUR s)"
