import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { productsById } from '../../../data/products'
import { renderWithProviders } from '../../../test/renderWithProviders'
import { ProductCard } from '../../product/ProductCard'
import { MiniCart } from '../MiniCart'

const athena = productsById.get('athena-100ml')!
const fortune = productsById.get('fortune-100ml')!

function setup() {
  const user = userEvent.setup()
  renderWithProviders(
    <>
      <ProductCard product={athena} />
      <ProductCard product={fortune} />
      <MiniCart />
    </>,
  )
  const buy = (name: string) => user.click(screen.getByRole('button', { name: `Comprar ${name}` }))
  return { user, buy }
}

beforeEach(() => localStorage.clear())

describe('MiniCart', () => {
  it('abre com o item ao clicar em COMPRAR e soma quantidades', async () => {
    const { buy } = setup()
    await buy(athena.name)

    const dialog = screen.getByRole('dialog', { name: /meu carrinho \(1\)/i })
    expect(within(dialog).getByRole('heading', { name: athena.name })).toBeInTheDocument()

    await buy(athena.name)
    expect(screen.getByRole('dialog', { name: /meu carrinho \(2\)/i })).toBeInTheDocument()
    expect(within(dialog).getAllByRole('listitem')).toHaveLength(1)
  })

  it('atualiza quantidade, subtotal e remove itens', async () => {
    const { user, buy } = setup()
    await buy(athena.name)
    await buy(fortune.name)

    const dialog = screen.getByRole('dialog')
    expect(within(dialog).getByText('R$ 510,00', { selector: 'strong' })).toBeInTheDocument()

    const athenaLine = within(dialog).getByRole('group', { name: `Quantidade de ${athena.name}` })
    await user.click(within(athenaLine).getByRole('button', { name: 'Aumentar quantidade' }))
    expect(within(athenaLine).getByText('2')).toBeInTheDocument()

    await user.click(within(dialog).getByRole('button', { name: `Remover ${fortune.name}` }))
    await user.click(within(athenaLine).getByRole('button', { name: 'Diminuir quantidade' }))
    await user.click(within(athenaLine).getByRole('button', { name: 'Diminuir quantidade' }))

    expect(within(dialog).getByText('Seu carrinho está vazio.')).toBeInTheDocument()
  })

  it('persiste os itens no localStorage', async () => {
    const { buy } = setup()
    await buy(athena.name)
    expect(JSON.parse(localStorage.getItem('amakha:cart')!)).toEqual([
      { productId: athena.id, quantity: 1 },
    ])
  })

  it('fecha pelo botão Fechar', async () => {
    const { user, buy } = setup()
    await buy(athena.name)
    await user.click(screen.getByRole('button', { name: 'Fechar' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
