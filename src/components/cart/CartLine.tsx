import { useCart } from '../../context/cartContext'
import { formatBRL } from '../../lib/format'
import type { Product } from '../../types'

type CartLineProps = { product: Product; quantity: number }

const stepButton =
  'grid size-8 cursor-pointer place-items-center text-base transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40'

export function CartLine({ product, quantity }: CartLineProps) {
  const { setQuantity, remove } = useCart()

  return (
    <li className="flex gap-3 px-5 py-4">
      <img
        src={product.image.src}
        alt=""
        width={72}
        height={72}
        className="size-[72px] shrink-0 rounded border border-line object-contain p-1"
      />
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="text-[13px] leading-[1.3] font-medium">{product.name}</h3>
        <div className="flex items-center justify-between gap-2">
          <fieldset className="flex items-center rounded border border-line">
            <legend className="sr-only">Quantidade de {product.name}</legend>
            <button
              type="button"
              onClick={() => setQuantity(product.id, quantity - 1)}
              aria-label="Diminuir quantidade"
              className={stepButton}
            >
              −
            </button>
            <output aria-live="polite" className="w-8 text-center text-sm">
              {quantity}
            </output>
            <button
              type="button"
              onClick={() => setQuantity(product.id, quantity + 1)}
              aria-label="Aumentar quantidade"
              className={stepButton}
            >
              +
            </button>
          </fieldset>
          <strong className="text-sm">{formatBRL(product.price * quantity)}</strong>
        </div>
        <button
          type="button"
          onClick={() => remove(product.id)}
          aria-label={`Remover ${product.name}`}
          className="self-start cursor-pointer text-xs text-ink-muted underline hover:text-ink"
        >
          Remover
        </button>
      </div>
    </li>
  )
}
