import { cartReducer, initialCartState, isCartItems, type CartState } from '../cartReducer'

const withItems = (...items: CartState['items']): CartState => ({ items, isOpen: false })

describe('cartReducer', () => {
  it('adiciona um produto novo e abre o mini cart', () => {
    const state = cartReducer(initialCartState, { type: 'add', productId: 'a' })
    expect(state).toEqual({ items: [{ productId: 'a', quantity: 1 }], isOpen: true })
  })

  it('soma a quantidade em vez de duplicar a linha', () => {
    const state = cartReducer(withItems({ productId: 'a', quantity: 1 }), {
      type: 'add',
      productId: 'a',
    })
    expect(state.items).toEqual([{ productId: 'a', quantity: 2 }])
  })

  it('atualiza a quantidade e remove quando chega a zero', () => {
    const start = withItems({ productId: 'a', quantity: 2 }, { productId: 'b', quantity: 1 })
    expect(
      cartReducer(start, { type: 'setQuantity', productId: 'a', quantity: 5 }).items[0],
    ).toEqual({
      productId: 'a',
      quantity: 5,
    })
    expect(cartReducer(start, { type: 'setQuantity', productId: 'a', quantity: 0 }).items).toEqual([
      { productId: 'b', quantity: 1 },
    ])
  })

  it('restaura os itens salvos sem abrir o mini cart', () => {
    const items = [{ productId: 'a', quantity: 3 }]
    expect(cartReducer(initialCartState, { type: 'restore', items })).toEqual({
      items,
      isOpen: false,
    })
  })

  it('remove, limpa e controla a abertura', () => {
    const start = withItems({ productId: 'a', quantity: 1 })
    expect(cartReducer(start, { type: 'remove', productId: 'a' }).items).toEqual([])
    expect(cartReducer(start, { type: 'clear' }).items).toEqual([])
    expect(cartReducer(start, { type: 'open' }).isOpen).toBe(true)
    expect(cartReducer({ ...start, isOpen: true }, { type: 'close' }).isOpen).toBe(false)
  })
})

describe('isCartItems', () => {
  it('valida o formato persistido', () => {
    expect(isCartItems([{ productId: 'a', quantity: 2 }])).toBe(true)
    expect(isCartItems([{ productId: 'a', quantity: 0 }])).toBe(false)
    expect(isCartItems({ productId: 'a' })).toBe(false)
    expect(isCartItems(null)).toBe(false)
  })
})
