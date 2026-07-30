import { useCallback, useEffect, useState } from 'react'

/**
 * State mirrored into localStorage so a groomsman's progress — the prayer
 * checklist, an acceptance — survives a reload. Namespaced per key.
 */
export function usePersistentState(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const stored = window.localStorage.getItem(key)
      return stored === null ? initialValue : JSON.parse(stored)
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* private browsing / quota — progress simply isn't remembered */
    }
  }, [key, value])

  const reset = useCallback(() => setValue(initialValue), [initialValue])

  return [value, setValue, reset]
}
