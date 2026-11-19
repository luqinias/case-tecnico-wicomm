// Acesso ao localStorage tolerante a falhas (SSR, modo privado, cota cheia, JSON inválido).

export function readStorage<T>(key: string, isValid: (value: unknown) => value is T): T | null {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    return isValid(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function writeStorage(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Persistência é um bônus: a página segue funcionando sem ela.
  }
}
