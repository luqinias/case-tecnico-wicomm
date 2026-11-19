import type { ReactNode } from 'react'
import { useCarousel } from '../../hooks/useCarousel'
import { CarouselArrow, CarouselDots } from './CarouselControls'

type CarouselProps<T> = {
  label: string
  items: T[]
  getKey: (item: T) => string
  renderItem: (item: T, index: number) => ReactNode
  /** Larguras responsivas de cada item (define quantos aparecem por vez). */
  itemClassName: string
  trackClassName?: string
  /**
   * overlay: setas sobre o trilho (prateleiras, banner)
   * inline: setas ao lado do trilho (Instagram)
   */
  variant?: 'overlay' | 'inline'
  /** Classes de posicionamento do grupo de setas no modo overlay. */
  arrowsClassName?: string
  dotsTone?: 'light' | 'dark'
  dotsClassName?: string
  showDots?: boolean
}

/** Carrossel acessível sobre CSS scroll-snap: swipe nativo, setas com loop e bolinhas. */
export function Carousel<T>({
  label,
  items,
  getKey,
  renderItem,
  itemClassName,
  trackClassName = '',
  variant = 'overlay',
  arrowsClassName = 'inset-x-0 top-1/2 -translate-y-1/2',
  dotsTone = 'dark',
  dotsClassName = 'mt-2.5 -mb-1.5',
  showDots = true,
}: CarouselProps<T>) {
  const { trackRef, pageCount, activeIndex, goTo, next, prev } = useCarousel<HTMLUListElement>(
    items.length,
  )

  const track = (
    <ul
      ref={trackRef}
      className={`no-scrollbar relative flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain ${trackClassName}`}
    >
      {items.map((item, index) => (
        <li
          key={getKey(item)}
          className={`shrink-0 snap-start ${itemClassName}`}
          aria-roledescription="slide"
          aria-label={`${index + 1} de ${items.length}`}
        >
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  )

  const arrows = (side: 'prev' | 'next', className = '') => (
    <CarouselArrow
      direction={side}
      onClick={side === 'prev' ? prev : next}
      label={side === 'prev' ? `Anterior: ${label}` : `Próximo: ${label}`}
      className={className}
    />
  )

  return (
    <section aria-roledescription="carrossel" aria-label={label} className="relative">
      {variant === 'inline' ? (
        <div className="flex items-center gap-3 md:gap-5">
          {arrows('prev', 'hidden sm:grid')}
          <div className="min-w-0 flex-1">{track}</div>
          {arrows('next', 'hidden sm:grid')}
        </div>
      ) : (
        <div className="relative">
          {track}
          {pageCount > 1 && (
            <div
              className={`pointer-events-none absolute flex justify-between [&>*]:pointer-events-auto ${arrowsClassName}`}
            >
              {arrows('prev')}
              {arrows('next')}
            </div>
          )}
        </div>
      )}
      {showDots && (
        <CarouselDots
          count={pageCount}
          active={activeIndex}
          onSelect={goTo}
          tone={dotsTone}
          className={dotsClassName}
        />
      )}
    </section>
  )
}
