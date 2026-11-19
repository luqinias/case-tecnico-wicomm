import { useCart } from '../../context/cartContext'
import { useFavorites } from '../../context/favoritesContext'
import { srcSet } from '../../lib/image'
import type { Product } from '../../types'
import { Icon } from '../ui/Icon'
import { Price } from '../ui/Price'

const TAG_STYLES = {
  coupon: { label: 'CUPOM COM 15%OFF', className: 'bg-ink' },
  consumerDay: { label: 'DIA DO CONSUMIDOR', className: 'bg-brand-dark' },
} as const

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart()
  const favorites = useFavorites()
  const isFavorite = favorites.has(product.id)

  return (
    <article className="group flex h-full flex-col gap-3 rounded-lg bg-white p-2 shadow-card">
      <div className="relative aspect-square">
        <img
          src={product.image.src}
          srcSet={srcSet(product.image)}
          sizes="(min-width: 1200px) 170px, (min-width: 1024px) 20vw, (min-width: 768px) 26vw, 40vw"
          width={product.image.width}
          height={product.image.height}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="absolute inset-[9.5%] size-[81%] object-contain"
        />

        {product.discountLabel && (
          <span className="absolute top-0 left-0 rounded bg-brand px-1.5 font-inter text-[13px] leading-[18px] font-medium tracking-[-0.12em] text-white">
            <span className="sr-only">Desconto de </span>
            {product.discountLabel}
          </span>
        )}

        <button
          type="button"
          onClick={() => favorites.toggle(product.id)}
          aria-pressed={isFavorite}
          aria-label={`Favoritar ${product.name}`}
          className="absolute top-px right-px grid size-6 cursor-pointer place-items-center rounded-full bg-white shadow-chip transition hover:scale-110"
        >
          <Icon name="heart" size={15} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>

        <button
          type="button"
          onClick={() => add(product.id)}
          aria-label={`Comprar ${product.name}`}
          className="reveal-on-hover absolute inset-x-0 bottom-0 h-[30px] cursor-pointer bg-ink text-sm font-semibold tracking-[-0.04em] text-white transition-colors hover:bg-ink-soft"
        >
          COMPRAR
        </button>
      </div>

      {/* Altura fixa no desktop: as tags do hover ocupam o espaço livre sem mudar o card */}
      <div className="flex flex-col gap-3 md:h-[162px]">
        <div className="flex flex-col gap-1">
          {product.tags && (
            <div className="expand-on-hover">
              <ul className="flex flex-wrap gap-1 overflow-hidden">
                {product.tags.map((tag) => (
                  <li
                    key={tag}
                    className={`rounded px-2 text-[13px] leading-[18px] tracking-[-0.04em] whitespace-nowrap text-white ${TAG_STYLES[tag].className}`}
                  >
                    {TAG_STYLES[tag].label}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {product.freeShipping && (
            <p className="text-sm leading-[1.3] font-medium text-brand">FRETE GRATIS</p>
          )}
        </div>

        <h3 className="line-clamp-2 min-h-[2.6em] text-sm leading-[1.3] font-medium">
          {product.name}
        </h3>

        <Price {...product} />
      </div>
    </article>
  )
}
