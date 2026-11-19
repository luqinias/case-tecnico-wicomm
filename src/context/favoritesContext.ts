import { createContext, use } from 'react'

export type FavoritesContextValue = {
  count: number
  has: (productId: string) => boolean
  toggle: (productId: string) => void
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function useFavorites() {
  const context = use(FavoritesContext)
  if (!context) throw new Error('useFavorites precisa estar dentro de <FavoritesProvider>')
  return context
}
