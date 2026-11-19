import { img } from '../lib/image'
import type { Product } from '../types'

// O layout repete o mesmo card; variamos nome/preço pelas embalagens das imagens.
const perfume = (id: string, name: string, line: 'Feminino' | 'Masculino'): Product[] => {
  const image = img(`products/${id}`, 170, 170)
  return [
    {
      id: `${id}-100ml`,
      name: `Perfume ${line} ${name} 100ml Amakha Paris`,
      image,
      listPrice: 32000,
      price: 25500,
      installments: { count: 12, value: 1875 },
      discountLabel: '10%',
      freeShipping: true,
      tags: ['coupon', 'consumerDay'],
    },
    {
      id: `${id}-15ml`,
      name: `Perfume de Bolso ${name} 15ml Amakha Paris`,
      image,
      listPrice: 8990,
      price: 6990,
      installments: { count: 3, value: 2330 },
      discountLabel: '20%',
      freeShipping: true,
      tags: ['coupon', 'consumerDay'],
    },
  ]
}

export const products: Product[] = [
  ...perfume('athena', 'Athena', 'Feminino'),
  ...perfume('fortune', 'Fortune', 'Masculino'),
  ...perfume('rb', 'RB', 'Masculino'),
  ...perfume('db', 'DB', 'Feminino'),
  ...perfume('chic-woman', 'Chic Woman', 'Feminino'),
]

export const productsById = new Map(products.map((product) => [product.id, product]))

const pick = (...ids: string[]) => ids.map((id) => productsById.get(id)!)

/** Prateleiras da home, na ordem do layout. */
export const shelves = {
  favorites: {
    title: 'Os Preferidos da Amakha Paris',
    products: pick(
      'athena-100ml',
      'fortune-100ml',
      'rb-100ml',
      'db-100ml',
      'chic-woman-100ml',
      'athena-15ml',
      'fortune-15ml',
      'chic-woman-15ml',
    ),
  },
  emotions: {
    title: 'Perfumes que despertam emoções: Experimente a magia da Amakha Paris',
    products: pick(
      'athena-100ml',
      'fortune-100ml',
      'rb-100ml',
      'db-100ml',
      'chic-woman-100ml',
      'rb-15ml',
      'db-15ml',
      'athena-15ml',
    ),
  },
  routine: {
    title: 'Sua rotina de beleza e bem estar para brilhar todos os dias',
    products: pick(
      'athena-100ml',
      'fortune-100ml',
      'rb-100ml',
      'db-100ml',
      'chic-woman-100ml',
      'chic-woman-15ml',
      'db-15ml',
      'fortune-15ml',
    ),
  },
}
