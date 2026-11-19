import { renderToString } from 'react-dom/server'
import { App } from './App'

/** Usado só no build (scripts/prerender.mjs) para gerar o HTML estático da home. */
export function render() {
  return renderToString(<App />)
}
