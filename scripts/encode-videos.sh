#!/usr/bin/env bash
# Builds the web assets for /videos from the original edits on the CDN.
#   public/videos/posters/<slug>.webp   poster frame, committed
#   public/videos/previews/<slug>.mp4   short silent loop, committed
#   video-upload/videos-web/<slug>.mp4  full edit, upload to R2 as videos-edits/videos-web/<slug>.mp4
#
# Usage: scripts/encode-videos.sh [cache-dir]
# Keep the list in sync with src/data/videos.ts.
set -euo pipefail

CDN="https://cdn.sanchxt.com/videos-edits"
CACHE="${1:-.video-cache}"
mkdir -p "$CACHE" public/videos/posters public/videos/previews video-upload/videos-web

# slug|source file|poster and preview start in seconds
EDITS=(
  "spiderman-song-edit|spiderman-song-edit.mp4|20"
  "travel|travel-vertical.mp4|6"
  "anime-edit|anime-edit.mp4|8"
  "song-edit|song-edit.mp4|12"
  "sports-edit|messi-vertical.mp4|18"
  "storytelling-edit|katie-vertical.mp4|20"
  "time-motion-edit|time.webm|10"
  "talking-reel-edit|talking-2.webm|20"
)

for edit in "${EDITS[@]}"; do
  IFS="|" read -r slug file start <<< "$edit"
  src="$CACHE/$file"
  [ -s "$src" ] || curl -sSfL --retry 3 -o "$src" "$CDN/$file"

  ffmpeg -hide_banner -loglevel error -y -ss "$start" -i "$src" -frames:v 1 \
    -vf "scale=720:-2" -c:v libwebp -quality 78 "public/videos/posters/$slug.webp" </dev/null

  ffmpeg -hide_banner -loglevel error -y -ss "$start" -t 4 -i "$src" -an \
    -vf "scale=360:-2,fps=24" -c:v libx264 -preset slow -crf 29 -pix_fmt yuv420p \
    -movflags +faststart "public/videos/previews/$slug.mp4" </dev/null

  ffmpeg -hide_banner -loglevel error -y -i "$src" \
    -vf "scale='min(1080,iw)':-2" -c:v libx264 -preset slow -crf 23 \
    -maxrate 5M -bufsize 10M -profile:v high -pix_fmt yuv420p \
    -c:a aac -b:a 160k -movflags +faststart "video-upload/videos-web/$slug.mp4" </dev/null

  echo "done $slug: $(du -h "video-upload/videos-web/$slug.mp4" | cut -f1) full, $(du -h "public/videos/previews/$slug.mp4" | cut -f1) preview"
done
