const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const images = [
  { src: 'assets/hero-bg.png',                              maxWidth: 1920 },
  { src: 'assets/hero2.png',                                maxWidth: 1920 },
  { src: 'assets/Hombre limpiando.png',                     maxWidth: 1200 },
  { src: 'assets/ChatGPT Image 1 may 2026, 23_30_17.png',  maxWidth: 1200 },
  { src: 'assets/Paola.png',                                maxWidth: 1200 },
  { src: 'assets/orlando.jpg',                              maxWidth: 1200 },
  { src: 'assets/Kissimmee.jpg',                            maxWidth: 1200 },
  { src: 'assets/logo.png',                                 maxWidth: 600  },
  { src: 'assets/burbuja1.png',                             maxWidth: 200  },
];

(async () => {
  for (const { src, maxWidth } of images) {
    const input = path.join(__dirname, src);
    if (!fs.existsSync(input)) { console.log(`skip: ${src}`); continue; }
    const output = input.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    const info = await sharp(input)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(output);
    const origSize = (fs.statSync(input).size / 1024).toFixed(0);
    const newSize = (info.size / 1024).toFixed(0);
    console.log(`✓ ${path.basename(src)} → ${path.basename(output)} | ${origSize}KB → ${newSize}KB`);
  }
})();
