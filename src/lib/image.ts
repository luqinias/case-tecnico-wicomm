import type { ImageAsset } from '../types'

/** Monta um ImageAsset apontando para public/images (1x) com variante @2x. */
export function img(path: string, width: number, height: number): ImageAsset {
  return { src: `/images/${path}.webp`, width, height }
}

/** srcset com as larguras 1x/2x geradas pelo optimize-images (usar junto de `sizes`). */
export function srcSet({ src, width }: ImageAsset) {
  return `${src} ${width}w, ${src.replace(/\.webp$/, '@2x.webp')} ${width * 2}w`
}
