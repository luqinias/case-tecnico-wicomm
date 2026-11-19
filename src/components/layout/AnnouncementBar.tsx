import { Icon } from '../ui/Icon'

// Fundo: círculos desfocados (#FEC3A7, blur 50) sobre #F3A07A, recriados com gradientes radiais.
const glow = [
  ['8%', '-130%'],
  ['24.5%', '230%'],
  ['50%', '-130%'],
  ['75.5%', '230%'],
  ['92%', '-130%'],
]
  .map(
    ([x, y]) => `radial-gradient(150px 100px at ${x} ${y}, var(--color-promo-light), transparent)`,
  )
  .join(', ')

export function AnnouncementBar() {
  return (
    <div className="bg-promo" style={{ backgroundImage: glow }}>
      <p className="container-page flex min-h-[47px] flex-wrap items-center justify-center gap-x-2 gap-y-1 py-2 text-center">
        <span className="text-base leading-[1.3] font-light sm:text-xl">
          SEMANA DO <strong className="font-bold">CONSUMIDOR</strong>
        </span>
        <Icon name="star" className="hidden sm:block" />
        <span className="flex h-6 items-center gap-2 rounded bg-ink px-3 text-[10px] leading-[1.3] font-bold text-white">
          <Icon name="truck-small" />
          FRETE GRÁTIS EM COMPRAS ACIMA DE 199,90 R$
        </span>
      </p>
    </div>
  )
}
