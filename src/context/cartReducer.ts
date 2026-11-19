import type { CartItem } from '../types'

export type CartState = {
  items: CartItem[]
  isOpen: boolean
}

export type CartAction =
  | { type: 'add'; productId: string }
  | { type: 'setQuantity'; productId: string; quantity: number }
  | { type: 'remove'; productId: string }
  | { type: 'restore'; items: CartItem[] }
  | { type: 'clear' }
  | { type: 'open' }
  | { type: 'close' }

export const initialCartState: CartState = { items: [], isOpen: false }

/** Reducer puro do carrinho: quantidade mínima 1; quantidade ≤ 0 remove a linha. */
export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'add': {
      const exists = state.items.some((item) => item.productId === action.productId)
      const items = exists
        ? state.items.map((item) =>
            item.productId === action.productId ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...state.items, { productId: action.productId, quantity: 1 }]
      return { items, isOpen: true }
    }
    case 'setQuantity':
      if (action.quantity <= 0)
        return cartReducer(state, { type: 'remove', productId: action.productId })
      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === action.productId ? { ...item, quantity: action.quantity } : item,
        ),
      }
    case 'remove':
      return { ...state, items: state.items.filter((item) => item.productId !== action.productId) }
    case 'restore':
      return { ...state, items: action.items }
    case 'clear':
      return { ...state, items: [] }
    case 'open':
      return { ...state, isOpen: true }
    case 'close':
      return { ...state, isOpen: false }
  }
}

export function isCartItems(value: unknown): value is CartItem[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item?.productId === 'string' &&
        Number.isInteger(item?.quantity) &&
        item.quantity > 0,
    )
  )
}
