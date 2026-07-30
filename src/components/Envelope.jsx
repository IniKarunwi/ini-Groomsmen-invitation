import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { WaxSeal } from './effects/WaxSeal'
import { DUR, EASE } from '../lib/motion'
import { play, unlockAudio } from '../lib/audio'
import { wedding } from '../data/invitation'

const CRACK_TO_FLAP = 480
const FLAP_MS = 1000

/**
 * A sealed envelope. It rises into the frame on arrival; breaking the wax
 * depresses the seal, cracks it, and swings the flap open — at which point
 * `onOpened` lets the caller slide the letter out.
 */
export function Envelope({
  recipient,
  band,
  sealLabel = `Seal of ${wedding.groom}`,
  onOpened,
  className = '',
}) {
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState('sealed') // sealed → cracking → open

  const open = () => {
    if (phase !== 'sealed') return
    unlockAudio()
    play('wax')
    setPhase('cracking')

    window.setTimeout(() => {
      play('envelope')
      setPhase('open')
    }, reduced ? 120 : CRACK_TO_FLAP)

    window.setTimeout(() => onOpened?.(), reduced ? 300 : CRACK_TO_FLAP + FLAP_MS * 0.72)
  }

  const cracked = phase !== 'sealed'
  const flapOpen = phase === 'open'

  return (
    <motion.div
      className={`flex w-full flex-col items-center ${className}`}
      initial={{ y: 70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: DUR.slow, ease: EASE }}
    >
      <motion.button
        type="button"
        onClick={open}
        disabled={cracked}
        aria-label={cracked ? 'Envelope opened' : `Open the envelope addressed to ${recipient}`}
        className="group relative block w-full max-w-md tap-transparent [perspective:1200px] disabled:cursor-default"
        whileHover={reduced || cracked ? undefined : { y: -3 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {/* Flap */}
        <motion.div
          aria-hidden="true"
          className="relative z-20 mx-auto h-16 w-full origin-top preserve-3d sm:h-20"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            background: 'linear-gradient(180deg, #2b241d 0%, #1a1512 100%)',
            borderTop: '1px solid rgba(176,138,46,0.35)',
            transformOrigin: 'top center',
          }}
          animate={
            flapOpen
              ? { rotateX: reduced ? 0 : -172, opacity: reduced ? 0 : 1 }
              : { rotateX: 0, opacity: 1 }
          }
          transition={{ duration: FLAP_MS / 1000, ease: EASE }}
        />

        {/* Body */}
        <motion.div
          className="relative z-10 -mt-6 border border-gold/35 px-6 pb-7 pt-6 text-center sm:-mt-8 sm:pb-9"
          style={{
            background: 'linear-gradient(170deg, #241e18 0%, #17130f 60%, #1e1913 100%)',
            boxShadow:
              'inset 0 1px 0 rgba(176,138,46,0.18), 0 24px 50px -24px rgba(0,0,0,0.9)',
          }}
          animate={
            flapOpen && !reduced ? { y: 6, boxShadow: 'inset 0 1px 0 rgba(176,138,46,0.1)' } : {}
          }
          transition={{ duration: DUR.base, ease: EASE }}
        >
          <span className="kicker block text-[0.55rem] text-gold/70">{band}</span>
          <span className="mt-3 block font-display text-3xl font-semibold leading-tight text-paper sm:text-4xl">
            <span className="mr-2 font-body text-base font-normal tracking-[0.08em] text-paper/60 sm:text-lg">
              To:
            </span>
            {recipient}
          </span>

          {/* A hairline of light along the opening edge */}
          {!reduced && (
            <motion.span
              aria-hidden="true"
              className="absolute inset-x-6 top-0 h-px bg-gold/50"
              animate={{ opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </motion.div>
      </motion.button>

      <div className="mt-7">
        <WaxSeal
          size={96}
          initial={wedding.initial}
          label={sealLabel}
          interactive
          cracked={cracked}
          onCrack={open}
        />
      </div>

      {!cracked && (
        <motion.p
          className="kicker mt-4 text-[0.55rem] text-paper/35"
          animate={reduced ? undefined : { opacity: [0.35, 0.8, 0.35] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          Break the seal
        </motion.p>
      )}
    </motion.div>
  )
}
