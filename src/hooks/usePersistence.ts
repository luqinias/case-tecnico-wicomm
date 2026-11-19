import { useEffect, useRef } from 'react'
import { readStorage, writeStorage } from '../lib/storage'

/**
 * Sincroniza um estado com o localStorage. A leitura acontece após a montagem
 * (o HTML pré-renderizado e o primeiro render do cliente ficam iguais) e a
 * escrita só começa depois da restauração, para não sobrescrever o que foi salvo.
 */
export function usePersistence<T>(
  key: string,
  value: T,
  isValid: (value: unknown) => value is T,
  onRestore: (saved: T) => void,
) {
  const restored = useRef(false)

  useEffect(() => {
    if (restored.current) writeStorage(key, value)
  }, [key, value])

  useEffect(() => {
    const saved = readStorage(key, isValid)
    if (saved) onRestore(saved)
    restored.current = true
    // Executa uma única vez na montagem
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
