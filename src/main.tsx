import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { App } from './App'
// Fontes self-hosted (apenas latin e pesos usados no Figma)
import '@fontsource/inter/latin-300.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/poppins/latin-300.css'
import '@fontsource/poppins/latin-400.css'
import '@fontsource/poppins/latin-500.css'
import '@fontsource/poppins/latin-600.css'
import '@fontsource/poppins/latin-700.css'
import '@fontsource/poppins/latin-700-italic.css'
import './index.css'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Em produção o HTML vem pré-renderizado (scripts/prerender.mjs) e é hidratado;
// no dev server a raiz chega vazia e o React renderiza do zero.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
