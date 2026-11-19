import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Controla um trilho com CSS scroll-snap: calcula as posições possíveis
 * (bolinhas), a posição ativa e navega com loop nas setas.
 */
export function useCarousel<T extends HTMLElement>(initialPageCount = 1) {
  const trackRef = useRef<T>(null)
  // Estimativa inicial (nº de itens) evita que setas/bolinhas "surjam" após a hidratação
  const [pageCount, setPageCount] = useState(initialPageCount)
  const [activeIndex, setActiveIndex] = useState(0)

  // Posições de scroll alcançáveis: um ponto por item até o fim do trilho.
  const getStops = useCallback(() => {
    const track = trackRef.current
    if (!track) return [0]
    const max = track.scrollWidth - track.clientWidth
    const first = (track.children[0] as HTMLElement | undefined)?.offsetLeft ?? 0
    const stops: number[] = []
    for (const child of Array.from(track.children) as HTMLElement[]) {
      const left = Math.min(child.offsetLeft - first, max)
      if (stops.at(-1) === left) break
      stops.push(left)
      if (left >= max) break
    }
    return stops.length ? stops : [0]
  }, [])

  const sync = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const stops = getStops()
    const nearest = stops.reduce(
      (best, stop, index) =>
        Math.abs(stop - track.scrollLeft) < Math.abs(stops[best] - track.scrollLeft) ? index : best,
      0,
    )
    setPageCount(stops.length)
    setActiveIndex(nearest)
  }, [getStops])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(sync)
    }
    const observer = new ResizeObserver(onScroll)
    observer.observe(track)
    track.addEventListener('scroll', onScroll, { passive: true })
    sync()
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      track.removeEventListener('scroll', onScroll)
    }
  }, [sync])

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current
      if (!track) return
      const stops = getStops()
      const target = (index + stops.length) % stops.length
      const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
      track.scrollTo({ left: stops[target], behavior: reduceMotion ? 'auto' : 'smooth' })
      setActiveIndex(target)
    },
    [getStops],
  )

  return {
    trackRef,
    pageCount,
    activeIndex,
    goTo,
    next: () => goTo(activeIndex + 1),
    prev: () => goTo(activeIndex - 1),
  }
}
