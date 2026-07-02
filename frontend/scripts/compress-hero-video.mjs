// Re-encodes the hero background video into web-optimized MP4 + WebM.
// Output is scaled to 1280px wide, audio stripped (the hero plays muted),
// and the moov atom is moved to the front (faststart) so playback can begin
// before the file fully downloads.
//
// Usage (from frontend/): node scripts/compress-hero-video.mjs
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegPath from "ffmpeg-static";

const run = promisify(execFile);
const frontend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const videoDir = path.join(frontend, "public", "videos");
const input = path.join(videoDir, "DarkenedAkwraps.mp4");

if (!existsSync(input)) {
  console.error(`Source video not found: ${input}`);
  process.exit(1);
}

const mb = (p) => (statSync(p).size / 1024 / 1024).toFixed(1);
console.log(`Source: ${path.basename(input)} (${mb(input)} MB)`);

const scale = "scale='min(1280,iw)':-2";

const jobs = [
  {
    label: "MP4 (H.264)",
    out: path.join(videoDir, "hero.mp4"),
    args: (o) => [
      "-i", input,
      "-an",
      "-vf", scale,
      "-c:v", "libx264",
      "-profile:v", "high",
      "-pix_fmt", "yuv420p",
      "-crf", "28",
      "-preset", "slow",
      "-movflags", "+faststart",
      "-y", o,
    ],
  },
  {
    label: "WebM (VP9)",
    out: path.join(videoDir, "hero.webm"),
    args: (o) => [
      "-i", input,
      "-an",
      "-vf", scale,
      "-c:v", "libvpx-vp9",
      "-crf", "34",
      "-b:v", "0",
      "-row-mt", "1",
      "-deadline", "good",
      "-y", o,
    ],
  },
];

for (const job of jobs) {
  console.log(`\nEncoding ${job.label} -> ${path.basename(job.out)} ...`);
  try {
    await run(ffmpegPath, job.args(job.out), { maxBuffer: 1024 * 1024 * 64 });
    console.log(`  done: ${mb(job.out)} MB`);
  } catch (err) {
    console.error(`  FAILED (${job.label}):`, err.stderr?.slice(-600) || err.message);
  }
}

console.log("\nHero video encoding complete.");
