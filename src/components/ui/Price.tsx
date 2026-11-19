import { formatBRL, formatBRLShort } from '../../lib/format'
import type { Product } from '../../types'

type PriceProps = Pick<Product, 'listPrice' | 'price' | 'installments'>

/** Preço "de/por" com parcelamento, como no card do layout. */
export function Price({ listPrice, price, installments }: PriceProps) {
  return (
    <div className="flex flex-col gap-1">
      <p className="flex flex-wrap items-baseline gap-1">
        {listPrice > price && (
          <del className="text-[13px] leading-[1.3] font-light">
            <span className="sr-only">De </span>
            {formatBRLShort(listPrice)}
          </del>
        )}
        <strong className="text-sm leading-[1.3] font-bold">
          <span className="sr-only">Por </span>
          {formatBRLShort(price)}
        </strong>
      </p>
      <p className="text-sm leading-[1.3] font-light">
        {installments.count}x {formatBRL(installments.value)} sem juros
      </p>
    </div>
  )
}
