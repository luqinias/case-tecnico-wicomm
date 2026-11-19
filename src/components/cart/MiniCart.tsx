import { useState } from 'react'
import { useCart } from '../../context/cartContext'
import { formatBRL } from '../../lib/format'
import { Drawer } from '../ui/Drawer'
import { CartLine } from './CartLine'

const FREE_SHIPPING_FROM = 19990

/** Carrinho lateral: lista, quantidades, barra de frete grátis e subtotal. */
export function MiniCart() {
  const { lines, count, subtotal, isOpen, close } = useCart()
  const [checkoutMessage, setCheckoutMessage] = useState('')
  const missing = Math.max(0, FREE_SHIPPING_FROM - subtotal)

  const handleClose = () => {
    setCheckoutMessage('')
    close()
  }

  return (
    <Drawer
      open={isOpen}
      onClose={handleClose}
      title={`Meu carrinho (${count})`}
      footer={
        lines.length > 0 && (
          <div className="flex flex-col gap-3">
            <p className="flex justify-between text-base">
              <span>Subtotal</span>
              <strong>{formatBRL(subtotal)}</strong>
            </p>
            <button
              type="button"
              onClick={() => setCheckoutMessage('Checkout indisponível nesta demonstração.')}
              className="h-12 cursor-pointer rounded bg-brand text-base font-semibold transition hover:brightness-95"
            >
              FINALIZAR COMPRA
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="cursor-pointer text-sm underline hover:text-ink-soft"
            >
              Continuar comprando
            </button>
            <output className="block text-center text-xs text-ink-muted">{checkoutMessage}</output>
          </div>
        )
      }
    >
      {lines.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
          <p className="text-base">Seu carrinho está vazio.</p>
          <button
            type="button"
            onClick={handleClose}
            className="h-11 cursor-pointer rounded bg-brand px-6 text-sm font-semibold transition hover:brightness-95"
          >
            CONTINUAR COMPRANDO
          </button>
        </div>
      ) : (
        <>
          <div className="bg-surface px-5 py-3 text-xs" aria-live="polite">
            {missing > 0 ? (
              <>
                Faltam <strong>{formatBRL(missing)}</strong> para ganhar{' '}
                <strong>FRETE GRÁTIS</strong>
              </>
            ) : (
              <strong>Você ganhou FRETE GRÁTIS!</strong>
            )}
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line" aria-hidden="true">
              <div
                className="h-full bg-brand transition-[width] duration-300"
                style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_FROM) * 100)}%` }}
              />
            </div>
          </div>
          <ul className="divide-y divide-line">
            {lines.map((line) => (
              <CartLine key={line.product.id} {...line} />
            ))}
          </ul>
        </>
      )}
    </Drawer>
  )
}
