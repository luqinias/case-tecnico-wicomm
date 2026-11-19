/** Imagem com dimensões intrínsecas (evita layout shift). */
export type ImageAsset = {
  src: string
  width: number
  height: number
}

export type ProductTag = 'coupon' | 'consumerDay'

export type Product = {
  id: string
  name: string
  image: ImageAsset
  /** Valores em centavos */
  listPrice: number
  price: number
  installments: { count: number; value: number }
  discountLabel?: string
  freeShipping?: boolean
  tags?: ProductTag[]
}

export type CartItem = {
  productId: string
  quantity: number
}

export type Banner = {
  id: string
  image: ImageAsset
  alt: string
  href: string
}

export type NavLink = {
  label: string
  href: string
}

export type NavItem = NavLink & {
  icon?: 'people' | 'discount'
  highlight?: boolean
  children?: NavLink[]
}
