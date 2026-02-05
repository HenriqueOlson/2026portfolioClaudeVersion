import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

const svgContent = readFileSync(join(publicDir, 'favicon.svg'), 'utf8');
const svgBuffer = Buffer.from(svgContent);

// Generate different sizes
const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'favicon-192x192.png', size: 192 },
  { name: 'favicon-512x512.png', size: 512 },
];

async function generateFavicons() {
  for (const { name, size } of sizes) {
    try {
      await sharp(svgBuffer, { density: 300 })
        .resize(size, size)
        .png()
        .toFile(join(publicDir, name));
      console.log(`Generated ${name}`);
    } catch (err) {
      console.error(`Error generating ${name}:`, err.message);
    }
  }
  console.log('Favicon generation complete!');
}

generateFavicons();
