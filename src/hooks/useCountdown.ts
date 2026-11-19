import { useEffect, useState } from 'react'

export type TimeLeft = { days: number; hours: number; minutes: number; seconds: number }

export function getTimeLeft(target: number, now = Date.now()): TimeLeft {
  // ceil: o segundo corrente só "vira" quando termina, e o 1º render bate com o HTML pré-renderizado
  const total = Math.max(0, Math.ceil((target - now) / 1000))
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  }
}

/** Contagem regressiva até `target` (timestamp), atualizada a cada segundo e parando em zero. */
export function useCountdown(target: number) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target))

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeLeft(target))
    tick()
    const id = setInterval(() => {
      tick()
      if (Date.now() >= target) clearInterval(id)
    }, 1000)
    return () => clearInterval(id)
  }, [target])

  return timeLeft
}
