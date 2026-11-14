const sharp = require('sharp');
const fs = require('node:fs/promises');

async function generate() {
  const source = 'public/images/best-carz-logo.png';
  for (const [size, path] of [[512, 'src/app/icon.png'], [180, 'src/app/apple-icon.png']]) {
    await sharp(source).resize(size, size, { fit: 'contain', background: '#ffffff' }).flatten({ background: '#ffffff' }).png().toFile(path);
  }
  const png = await sharp(source).resize(64, 64, { fit: 'contain', background: '#ffffff' }).flatten({ background: '#ffffff' }).ensureAlpha().png().toBuffer();
  const header = Buffer.alloc(22);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  header[6] = 64;
  header[7] = 64;
  header.writeUInt16LE(1, 10);
  header.writeUInt16LE(32, 12);
  header.writeUInt32LE(png.length, 14);
  header.writeUInt32LE(22, 18);
  await fs.writeFile('src/app/favicon.ico', Buffer.concat([header, png]));
}

generate().catch((error) => { console.error(error); process.exitCode = 1; });
