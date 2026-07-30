import { useEffect, useRef, useState } from 'react'
import { play } from '../lib/audio'

/**
 * Reveals text one character at a time. Reduced-motion visitors get the
 * finished line immediately rather than a stuttering animation.
 */
export function useTypewriter(text, { speed = 46, startDelay = 500, enabled = true, sound = false } = {}) {
  const [typed, setTyped] = useState(enabled ? '' : text)
  const [done, setDone] = useState(!enabled)
  const soundRef = useRef(sound)
  soundRef.current = sound

  useEffect(() => {
    if (!enabled) {
      setTyped(text)
      setDone(true)
      return undefined
    }

    setTyped('')
    setDone(false)
    let index = 0
    let timer

    const step = () => {
      index += 1
      setTyped(text.slice(0, index))
      if (soundRef.current && index % 2 === 0) play('key')
      if (index >= text.length) {
        setDone(true)
        return
      }
      // Uneven cadence reads like a hand at a typewriter, not a machine.
      timer = window.setTimeout(step, speed + Math.random() * speed * 0.6)
    }

    timer = window.setTimeout(step, startDelay)
    return () => window.clearTimeout(timer)
  }, [text, speed, startDelay, enabled])

  return { typed, done }
}
