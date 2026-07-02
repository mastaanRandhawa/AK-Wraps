// Builds a single contact-sheet montage of all real photos in src/assets
// so they can be reviewed at a glance.
// Usage (from frontend/): node scripts/contact-sheet.mjs
import { readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const frontend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assetsDir = path.join(frontend, "src", "assets");
const out = path.join(frontend, "scripts", "contact-sheet.png");

const files = readdirSync(assetsDir)
  .filter((f) => /\.(jpe?g)$/i.test(f))
  .sort();

const cols = 5;
const cellW = 260;
const cellH = 195;
const pad = 6;
const labelH = 18;
const rows = Math.ceil(files.length / cols);
const W = cols * (cellW + pad) + pad;
const H = rows * (cellH + labelH + pad) + pad;

const composites = [];
for (let i = 0; i < files.length; i++) {
  const col = i % cols;
  const row = Math.floor(i / cols);
  const x = pad + col * (cellW + pad);
  const y = pad + row * (cellH + labelH + pad);

  let ok = true;
  try {
    const thumb = await sharp(path.join(assetsDir, files[i]), {
      failOn: "none",
      limitInputPixels: false,
    })
      .rotate()
      .resize(cellW, cellH, { fit: "cover" })
      .toBuffer();
    composites.push({ input: thumb, left: x, top: y });
  } catch (err) {
    ok = false;
    console.warn(`  skip ${files[i]}: ${err.message.split("\n")[0]}`);
  }

  const label = `${i}: ${files[i]}${ok ? "" : " (UNREADABLE)"}`;
  const svg = Buffer.from(
    `<svg width="${cellW}" height="${labelH}"><rect width="100%" height="100%" fill="black"/><text x="2" y="13" font-family="monospace" font-size="11" fill="white">${label}</text></svg>`,
  );
  composites.push({ input: svg, left: x, top: y + cellH });
}

await sharp({
  create: { width: W, height: H, channels: 3, background: "#111" },
})
  .composite(composites)
  .png()
  .toFile(out);

console.log(`Contact sheet: ${out} (${files.length} photos)`);
