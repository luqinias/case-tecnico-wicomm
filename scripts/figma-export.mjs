// Baixa os assets do layout direto da API do Figma.
// Uso: FIGMA_TOKEN=... node scripts/figma-export.mjs
// Raster → .figma-cache/raster/*.png (2x, depois otimizados por optimize-images.mjs)
// SVG    → .figma-cache/svg/*.svg (curados manualmente em src/components/ui/Icon.tsx e public/)
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

const token = process.env.FIGMA_TOKEN
if (!token) throw new Error('Defina FIGMA_TOKEN no ambiente.')

const manifest = JSON.parse(await readFile(new URL('./figma-assets.json', import.meta.url)))
const OUT = '.figma-cache'
const api = (path) =>
  fetch(`https://api.figma.com/v1${path}`, { headers: { 'X-Figma-Token': token } }).then((r) => {
    if (!r.ok) throw new Error(`${r.status} ${path}`)
    return r.json()
  })

async function exportGroup(entries, format, scale) {
  const ids = Object.values(entries).join(',')
  const { images } = await api(
    `/images/${manifest.fileKey}?ids=${encodeURIComponent(ids)}&format=${format}&scale=${scale}`,
  )
  for (const [name, id] of Object.entries(entries)) {
    const url = images[id]
    if (!url) {
      console.warn(`sem render: ${name}`)
      continue
    }
    const file = join(OUT, format === 'svg' ? 'svg' : 'raster', `${name}.${format}`)
    await mkdir(dirname(file), { recursive: true })
    await writeFile(file, Buffer.from(await (await fetch(url)).arrayBuffer()))
    console.log('✓', file)
  }
}

await exportGroup(manifest.raster, 'png', 2)
await exportGroup(manifest.svg, 'svg', 1)
