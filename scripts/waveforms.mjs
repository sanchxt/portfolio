// Reads each cached original and writes its real audio envelope to
// src/data/waveforms.json, which draws the A1 track on /videos.
// Run after scripts/encode-videos.sh: node scripts/waveforms.mjs [cache-dir]
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const CACHE = process.argv[2] ?? ".video-cache";
const SAMPLE_RATE = 4000;
const BARS_PER_SECOND = 2;

const EDITS = {
  "spiderman-song-edit": "spiderman-song-edit.mp4",
  travel: "travel-vertical.mp4",
  "anime-edit": "anime-edit.mp4",
  "song-edit": "song-edit.mp4",
  "sports-edit": "messi-vertical.mp4",
  "storytelling-edit": "katie-vertical.mp4",
  "time-motion-edit": "time.webm",
  "talking-reel-edit": "talking-2.webm",
};

const envelope = (file) => {
  const raw = execFileSync(
    "ffmpeg",
    ["-v", "error", "-i", join(CACHE, file), "-ac", "1", "-ar", String(SAMPLE_RATE), "-f", "s16le", "-"],
    { maxBuffer: 1024 * 1024 * 256 },
  );
  const samples = new Int16Array(raw.buffer, raw.byteOffset, raw.length >> 1);
  const size = SAMPLE_RATE / BARS_PER_SECOND;
  const bars = [];
  for (let start = 0; start < samples.length; start += size) {
    let sum = 0;
    const end = Math.min(start + size, samples.length);
    for (let i = start; i < end; i++) sum += samples[i] ** 2;
    bars.push(Math.sqrt(sum / (end - start)));
  }
  const peak = Math.max(...bars, 1);
  return bars.map((bar) => Math.round((bar / peak) * 100) / 100);
};

const output = Object.fromEntries(
  Object.entries(EDITS).map(([slug, file]) => [slug, envelope(file)]),
);
writeFileSync("src/data/waveforms.json", JSON.stringify(output));
