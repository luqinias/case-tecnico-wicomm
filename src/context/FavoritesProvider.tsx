import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { usePersistence } from '../hooks/usePersistence'
import { FavoritesContext } from './favoritesContext'

const STORAGE_KEY = 'amakha:favorites'

const isIdList = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((id) => typeof id === 'string')

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<ReadonlySet<string>>(() => new Set())
  const idList = useMemo(() => [...ids], [ids])

  usePersistence(STORAGE_KEY, idList, isIdList, (saved) => setIds(new Set(saved)))

  const toggle = useCallback((productId: string) => {
    setIds((current) => {
      const next = new Set(current)
      if (!next.delete(productId)) next.add(productId)
      return next
    })
  }, [])

  const value = useMemo(
    () => ({ count: ids.size, has: (id: string) => ids.has(id), toggle }),
    [ids, toggle],
  )

  return <FavoritesContext value={value}>{children}</FavoritesContext>
}
