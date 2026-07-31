// One-off: rasterize app/icon.svg to a 256x256 PNG and wrap it in a minimal
// single-image ICO container (modern .ico readers accept raw PNG data with
// an ICONDIR/ICONDIRENTRY header — no separate BMP encoding needed).
import sharp from "sharp";
import { writeFileSync, readFileSync } from "node:fs";

const svg = readFileSync(new URL("../app/icon.svg", import.meta.url));
const png = await sharp(svg).resize(256, 256).png().toBuffer();

const header = Buffer.alloc(6 + 16);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // image count
header.writeUInt8(0, 6); // width (0 = 256)
header.writeUInt8(0, 7); // height (0 = 256)
header.writeUInt8(0, 8); // color count
header.writeUInt8(0, 9); // reserved
header.writeUInt16LE(1, 10); // color planes
header.writeUInt16LE(32, 12); // bits per pixel
header.writeUInt32LE(png.length, 14); // size of PNG data
header.writeUInt32LE(22, 18); // offset to PNG data

writeFileSync(
  new URL("../app/favicon.ico", import.meta.url),
  Buffer.concat([header, png]),
);
console.log("wrote app/favicon.ico:", png.length, "bytes of PNG payload");
