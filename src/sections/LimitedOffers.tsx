import { useCountdown, type TimeLeft } from '../hooks/useCountdown'

// Prazo da oferta relativo ao carregamento: começa em 02d 12h 25m 45s, como no layout.
const OFFER_ENDS_AT = Date.now() + ((2 * 24 + 12) * 3600 + 25 * 60 + 45) * 1000

const UNITS: { key: keyof TimeLeft; label: string }[] = [
  { key: 'days', label: 'dias' },
  { key: 'hours', label: 'horas' },
  { key: 'minutes', label: 'minutos' },
  { key: 'seconds', label: 'segundos' },
]

const pad = (value: number) => String(value).padStart(2, '0')

function Unit({ value, label, rolling }: { value: number; label: string; rolling?: boolean }) {
  const [tens, units] = pad(value)
  return (
    <div className="flex w-[45px] flex-col items-center">
      <span className="flex h-[45px] items-center overflow-hidden text-[29.7px] leading-[1.5] font-medium tabular-nums">
        {rolling ? (
          <>
            {tens}
            <span key={units} className="inline-block animate-roll">
              {units}
            </span>
          </>
        ) : (
          pad(value)
        )}
      </span>
      <span className="text-[7px] leading-[1.6] uppercase md:text-[6.2px]">{label}</span>
    </div>
  )
}

export function LimitedOffers() {
  const timeLeft = useCountdown(OFFER_ENDS_AT)
  const accessibleTime = `${timeLeft.days} dias, ${timeLeft.hours} horas e ${timeLeft.minutes} minutos`

  return (
    <section aria-labelledby="ofertas-titulo" className="bg-surface-offer text-ink-soft">
      <div className="container-page flex min-h-[87px] flex-col items-center justify-between gap-3 py-3 sm:flex-row sm:py-2.5">
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <h2
            id="ofertas-titulo"
            className="text-2xl leading-[26px] font-bold uppercase italic md:text-[32px]"
          >
            Ofertas limitadas
          </h2>
          <p className="text-sm leading-[15px] md:text-base">Produtos com preços imperdíveis</p>
        </div>

        <div className="flex items-start gap-2.5 sm:mr-[9px]">
          <p className="sr-only" aria-live="off">
            Termina em {accessibleTime}
          </p>
          {UNITS.map(({ key, label }, index) => (
            <div key={key} className="flex items-start gap-2.5" aria-hidden="true">
              {index > 0 && (
                <span className="pt-3 text-[19.8px] leading-[1.5] font-semibold">:</span>
              )}
              <Unit value={timeLeft[key]} label={label} rolling={key === 'seconds'} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
