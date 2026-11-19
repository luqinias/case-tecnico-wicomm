import { act, renderHook } from '@testing-library/react'
import { getTimeLeft, useCountdown } from '../useCountdown'

describe('getTimeLeft', () => {
  it('decompõe o tempo restante e nunca fica negativo', () => {
    const now = 0
    const target = ((2 * 24 + 12) * 3600 + 25 * 60 + 45) * 1000
    expect(getTimeLeft(target, now)).toEqual({ days: 2, hours: 12, minutes: 25, seconds: 45 })
    expect(getTimeLeft(0, 5000)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  })
})

describe('useCountdown', () => {
  beforeEach(() => vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval', 'Date'] }))
  afterEach(() => vi.useRealTimers())

  it('decrementa a cada segundo e para em zero', () => {
    const target = Date.now() + 2000
    const { result } = renderHook(() => useCountdown(target))
    expect(result.current.seconds).toBe(2)

    act(() => vi.advanceTimersByTime(1000))
    expect(result.current.seconds).toBe(1)

    act(() => vi.advanceTimersByTime(5000))
    expect(result.current).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  })
})
