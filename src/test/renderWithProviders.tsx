import { render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { CartProvider } from '../context/CartProvider'
import { FavoritesProvider } from '../context/FavoritesProvider'

export function renderWithProviders(ui: ReactElement) {
  return render(
    <CartProvider>
      <FavoritesProvider>{ui}</FavoritesProvider>
    </CartProvider>,
  )
}
