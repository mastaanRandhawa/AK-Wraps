// Generates web-optimized WebP versions of selected real shop photos from
// src/assets into src/assets/optimized/. Originals (4-7MB JPGs) are left
// untouched; only the optimized copies are imported by the app.
//
// Usage (from frontend/): node scripts/optimize-photos.mjs
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const frontend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(frontend, "src", "assets");
const outDir = path.join(srcDir, "optimized");
mkdirSync(outDir, { recursive: true });

// source file -> output basename (semantic, category-based)
const map = {
  // Portfolio builds
  "IMG_5076.JPG": "wrap",        // color-change wrap
  "IMG_4972.JPG": "ppf",         // glossy black sports car
  "IMG_5680.JPG": "ceramic",     // deep-gloss black
  "IMG_4454.JPG": "chrome",      // blacked-out rear
  "IMG_4021.JPG": "interior",    // ambient interior
  "IMG_5664.JPG": "wheels",      // detailed wheel
  "IMG_5458.JPG": "corvette",    // white C8
  "IMG_5797.JPG": "gtr",         // white Lexus RC F

  // Service cards
  "IMG_5337.JPG": "svc-vinyl",       // black w/ blue accent wrap
  "IMG_4453.JPG": "svc-ppf",         // silver/grey 3/4 rear
  "IMG_5455.JPG": "svc-coloured",    // green convertible (colour)
  "IMG_5338.JPG": "svc-tint",        // black coupe rear
  "IMG_1774.JPG": "svc-ceramic",     // glossy white sedan
  "IMG_4955.JPG": "svc-widebody",    // aggressive black build
  "IMG_4457.JPG": "svc-paintmatch",  // headlight / panel detail

  // Page heroes (atmospheric, full-width)
  "IMG_4580.JPG": "hero-about",          // "AK WRAPS" branding shot
  "IMG_5684.JPG": "hero-services",       // black convertible
  "DSC03333_Original.jpeg": "hero-shop", // SUV in the shop (also menu/gallery bg)
  "IMG_3093.JPG": "hero-contact",        // dark sedan w/ lighting

  // Before & after pairs (gallery slider)
  "IMG_3255.JPG": "ba-ceramic-before",   // pre-correction / dull finish
  "IMG_3257.JPG": "ba-ceramic-after",    // post ceramic gloss
  "IMG_4032.JPG": "ba-wrap-before",      // factory colour
  "IMG_4034.JPG": "ba-wrap-after",       // wrapped finish
};

const WIDTH = 1600;
const QUALITY = 80;

for (const [file, name] of Object.entries(map)) {
  const out = path.join(outDir, `${name}.webp`);
  try {
    const info = await sharp(path.join(srcDir, file), {
      failOn: "none",
      limitInputPixels: false,
    })
      .rotate()
      .resize(WIDTH, WIDTH, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(out);
    console.log(
      `${file} -> optimized/${name}.webp  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`,
    );
  } catch (err) {
    console.error(`FAILED ${file}: ${err.message.split("\n")[0]}`);
  }
}

console.log("Photo optimization complete.");
