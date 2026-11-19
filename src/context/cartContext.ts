import { createContext, use } from 'react'
import type { Product } from '../types'

export type CartLineItem = { product: Product; quantity: number }

export type CartContextValue = {
  lines: CartLineItem[]
  count: number
  subtotal: number
  isOpen: boolean
  add: (productId: string) => void
  setQuantity: (productId: string, quantity: number) => void
  remove: (productId: string) => void
  open: () => void
  close: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)

export function useCart() {
  const context = use(CartContext)
  if (!context) throw new Error('useCart precisa estar dentro de <CartProvider>')
  return context
}
