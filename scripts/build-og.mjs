import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const src = resolve(root, "scripts/og-source.svg");
const out = resolve(root, "public/og-image.png");

const svg = readFileSync(src);
await sharp(svg).resize(1200, 630).png({ quality: 90 }).toFile(out);
console.log(`Wrote ${out}`);
