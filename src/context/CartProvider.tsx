import { useMemo, useReducer, type ReactNode } from 'react'
import { productsById } from '../data/products'
import { usePersistence } from '../hooks/usePersistence'
import { CartContext, type CartContextValue } from './cartContext'
import { cartReducer, initialCartState, isCartItems } from './cartReducer'

const STORAGE_KEY = 'amakha:cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState)

  // Itens salvos que não existem mais no catálogo são descartados na restauração.
  usePersistence(STORAGE_KEY, state.items, isCartItems, (items) =>
    dispatch({ type: 'restore', items: items.filter((item) => productsById.has(item.productId)) }),
  )

  const value = useMemo<CartContextValue>(() => {
    const lines = state.items.map((item) => ({
      product: productsById.get(item.productId)!,
      quantity: item.quantity,
    }))
    return {
      lines,
      count: lines.reduce((sum, line) => sum + line.quantity, 0),
      subtotal: lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0),
      isOpen: state.isOpen,
      add: (productId) => dispatch({ type: 'add', productId }),
      setQuantity: (productId, quantity) => dispatch({ type: 'setQuantity', productId, quantity }),
      remove: (productId) => dispatch({ type: 'remove', productId }),
      open: () => dispatch({ type: 'open' }),
      close: () => dispatch({ type: 'close' }),
    }
  }, [state])

  return <CartContext value={value}>{children}</CartContext>
}
