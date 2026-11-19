// Converte os PNGs 2x exportados do Figma em WebP (1x e 2x) para public/images.
// Uso: node scripts/optimize-images.mjs
import { mkdir, readdir } from 'node:fs/promises'
import { dirname, join, relative } from 'node:path'
import sharp from 'sharp'

const SRC = '.figma-cache/raster'
const OUT = 'public/images'

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(path)
    else if (entry.name.endsWith('.png')) yield path
  }
}

for await (const file of walk(SRC)) {
  const base = join(OUT, relative(SRC, file)).replace(/\.png$/, '')
  await mkdir(dirname(base), { recursive: true })
  const { width } = await sharp(file).metadata()

  await sharp(file).webp({ quality: 78, effort: 6 }).toFile(`${base}@2x.webp`)
  await sharp(file)
    .resize({ width: Math.round(width / 2) })
    .webp({ quality: 80, effort: 6 })
    .toFile(`${base}.webp`)
  console.log('✓', base)
}
