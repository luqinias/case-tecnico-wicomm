import { Icon } from './Icon'

type ArrowProps = {
  direction: 'prev' | 'next'
  onClick: () => void
  label: string
  className?: string
}

/** Seta circular (35px, preto 70%) usada em todos os carrosséis do layout. */
export function CarouselArrow({ direction, onClick, label, className = '' }: ArrowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`grid size-[35px] shrink-0 cursor-pointer place-items-center rounded-full bg-overlay text-white transition hover:bg-ink ${className}`}
    >
      <Icon name="arrow" className={direction === 'next' ? 'rotate-180' : ''} />
    </button>
  )
}

type DotsProps = {
  count: number
  active: number
  onSelect: (index: number) => void
  tone?: 'light' | 'dark'
  className?: string
}

/** Indicadores de posição; cada bolinha (12px) fica numa área de toque de 24px (WCAG 2.5.8). */
export function CarouselDots({
  count,
  active,
  onSelect,
  tone = 'dark',
  className = '',
}: DotsProps) {
  if (count < 2) return null
  const inactive = tone === 'light' ? 'bg-white' : 'bg-line'
  return (
    <div className={`flex justify-center ${className}`}>
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onSelect(index)}
          aria-label={`Ir para a posição ${index + 1} de ${count}`}
          aria-current={index === active || undefined}
          className="group/dot grid size-6 cursor-pointer place-items-center"
        >
          <span
            className={`size-3 rounded-full transition-colors ${
              index === active ? 'bg-ink' : `${inactive} group-hover/dot:bg-ink-icon`
            }`}
          />
        </button>
      ))}
    </div>
  )
}
