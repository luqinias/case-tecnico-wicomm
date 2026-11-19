import { img } from '../lib/image'
import type { ImageAsset } from '../types'

// O Figma traz um único banner; os slides 2 e 3 são composições em HTML
// com a mesma linguagem visual (painel rosa + chamada em branco).
export type HeroSlide =
  | { kind: 'image'; id: string; image: ImageAsset; alt: string; href: string }
  | {
      kind: 'composed'
      id: string
      image: ImageAsset
      imageAlt: string
      kicker: string
      title: string
      subtitle: string
      href: string
    }

export const heroSlides: HeroSlide[] = [
  {
    kind: 'image',
    id: 'chic-woman',
    image: img('hero/banner-chic-woman', 1280, 372),
    alt: 'Compre um perfume 100ml e ganhe um perfume de bolso. Saiba mais.',
    href: '#',
  },
  {
    kind: 'composed',
    id: 'semana-consumidor',
    image: img('products/athena', 170, 170),
    imageAlt: 'Perfume Athena 100ml Amakha Paris',
    kicker: 'Semana do consumidor',
    title: 'Até 20% OFF',
    subtitle: 'em perfumes selecionados',
    href: '#',
  },
  {
    kind: 'composed',
    id: 'frete-gratis',
    image: img('products/fortune', 170, 170),
    imageAlt: 'Perfume Fortune 100ml Amakha Paris',
    kicker: 'Aproveite',
    title: 'Frete grátis',
    subtitle: 'em compras acima de R$ 199,90',
    href: '#',
  },
]
