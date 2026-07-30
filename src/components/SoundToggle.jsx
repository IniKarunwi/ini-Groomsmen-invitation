import { useState } from 'react'
import { motion } from 'framer-motion'
import { EASE } from '../lib/motion'
import { isAudioEnabled, setAudioEnabled, unlockAudio } from '../lib/audio'

/**
 * Sound is a garnish here — a few paper and wax cues, never music, and never
 * before the visitor has touched the page. This lets them switch it off.
 */
export function SoundToggle() {
  const [on, setOn] = useState(isAudioEnabled)

  const toggle = () => {
    const next = !on
    setOn(next)
    setAudioEnabled(next)
    if (next) unlockAudio()
  }

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? 'Mute sound' : 'Unmute sound'}
      className="fixed bottom-4 left-4 z-50 flex h-9 w-9 items-center justify-center border border-gold/25 bg-ink/70 text-gold/60 backdrop-blur-sm tap-transparent"
      whileHover={{ borderColor: 'rgba(176,138,46,0.7)', color: 'rgba(217,182,92,1)' }}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        {on ? (
          <>
            <path d="M15.6 9.2a4 4 0 0 1 0 5.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M18 6.8a7.4 7.4 0 0 1 0 10.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </>
        ) : (
          <path d="M16 9.5l5 5m0-5l-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        )}
      </svg>
    </motion.button>
  )
}
