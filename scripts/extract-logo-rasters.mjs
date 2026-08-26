// One-off: the ten TrustedBy marquee logos shipped as public/images/logo_*.svg,
// but none of them were vector — each was a Figma export of a raster logo, i.e.
// a <rect> filled by a <pattern> pointing at a base64 PNG, with zero <path>
// elements. Three things went wrong as a result:
//
//   * base64 costs 33% over the raw bytes it encodes;
//   * next/image has to be told `unoptimized` for an .svg, so the optimizer
//     never produced AVIF/WebP or resized anything;
//   * the marquee renders them 48px tall, while the embedded PNGs are ~150px.
//
// Together that was ~291KB of "logos" — over a third of the home page's total
// weight — for artwork that fits in a few KB. This script pulls the PNG back
// out of each wrapper and re-encodes it as WebP at its native size (already
// only ~2-3x the rendered height, so there is nothing to downscale), leaving
// next/image free to serve AVIF at whatever width the device asks for.
//
// Run: node scripts/extract-logo-rasters.mjs
import sharp from "sharp";
import { readFileSync, readdirSync, statSync } from "node:fs";
// fileURLToPath, not URL.pathname: the project path contains spaces, and
// pathname hands sharp a percent-encoded string it cannot open.
import { fileURLToPath } from "node:url";

const DIR = new URL("../public/images/", import.meta.url);

const files = readdirSync(DIR).filter((n) => /^logo_.*\.svg$/.test(n));
let before = 0;
let after = 0;

for (const name of files) {
  const svg = readFileSync(new URL(name, DIR), "utf8");
  const match = svg.match(
    /data:image\/(png|jpeg|jpg|webp);base64,([A-Za-z0-9+/=\s]+)/,
  );
  if (!match) {
    console.log(`skip ${name} — no embedded raster (real vector?)`);
    continue;
  }

  const raster = Buffer.from(match[2].replace(/\s/g, ""), "base64");
  const target = new URL(name.replace(/\.svg$/, ".webp"), DIR);
  const info = await sharp(raster)
    .webp({ quality: 82, effort: 6 })
    .toFile(fileURLToPath(target));

  const svgBytes = statSync(new URL(name, DIR)).size;
  before += svgBytes;
  after += info.size;
  console.log(
    `${name.padEnd(20)} ${String(svgBytes).padStart(6)} -> ${String(info.size).padStart(6)}  (${info.width}x${info.height})`,
  );
}

console.log("---");
console.log(
  `total ${before} -> ${after} bytes (${(100 - (after / before) * 100).toFixed(1)}% smaller)`,
);
