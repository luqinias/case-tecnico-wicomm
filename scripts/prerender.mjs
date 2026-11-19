// Pré-renderiza a home no build: injeta o HTML do React em dist/index.html.
// O cliente hidrata esse HTML (main.tsx), então o banner principal aparece
// antes do JavaScript terminar de carregar (melhora FCP/LCP).
import { readFile, rm, writeFile } from 'node:fs/promises'

const { render } = await import(new URL('../dist-ssr/entry-server.js', import.meta.url))
const file = new URL('../dist/index.html', import.meta.url)
const template = await readFile(file, 'utf8')

await writeFile(file, template.replace('<div id="root"></div>', `<div id="root">${render()}</div>`))
await rm(new URL('../dist-ssr', import.meta.url), { recursive: true })
console.log('✓ dist/index.html pré-renderizado')
