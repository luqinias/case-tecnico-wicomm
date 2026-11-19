import { img } from '../lib/image'
import type { Banner } from '../types'

export const launchBanners = {
  featured: {
    id: 'mel-capilar',
    image: img('launches/mel-capilar', 556, 681),
    alt: 'Linha Mel Capilar: brilho radiante e nutrição poderosa. Kit completo com 25% OFF. Aproveite.',
    href: '#',
  },
  side: [
    {
      id: 'magic-repair',
      image: img('launches/magic-repair', 597, 333),
      alt: 'Linha Magic Repair: hidratação de alto impacto. Aproveite.',
      href: '#',
    },
    {
      id: 'magic-curly',
      image: img('launches/magic-curly', 597, 333),
      alt: 'Linha Magic Curly: ideal para fios cacheados, ondulados e crespos. Aproveite.',
      href: '#',
    },
  ],
} satisfies { featured: Banner; side: Banner[] }

export const categoryBanners: Banner[] = [
  {
    id: 'home-spa',
    image: img('categories/home-spa', 280, 416),
    alt: 'Crie o seu próprio Home Spa',
    href: '#',
  },
  {
    id: 'sabonetes-cremes',
    image: img('categories/sabonetes-cremes', 280, 416),
    alt: 'Sabonetes, cremes e esfoliantes para sua rotina de cuidados. Compre.',
    href: '#',
  },
  {
    id: 'cremes-hidratantes',
    image: img('categories/cremes-hidratantes', 280, 416),
    alt: 'Cremes hidratantes com fragrâncias Amakha Paris. Compre.',
    href: '#',
  },
  {
    id: 'suplementos',
    image: img('categories/suplementos', 280, 416),
    alt: 'Suplementos e vitaminas para o seu dia a dia. Compre.',
    href: '#',
  },
]

export const consultantBanners: Banner[] = [
  {
    id: 'independencia-financeira',
    image: img('consultant/independencia-financeira', 575, 333),
    alt: 'Na Amakha Paris você conquista a sua independência financeira com baixo investimento',
    href: '#',
  },
  {
    id: 'seja-consultor',
    image: img('consultant/seja-consultor', 572, 331),
    alt: 'Seja um consultor Amakha Paris',
    href: '#',
  },
]
