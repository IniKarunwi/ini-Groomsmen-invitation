import { motion, useReducedMotion } from 'framer-motion'
import { DustParticles } from './effects/DustParticles'
import { screenEnter } from '../lib/motion'

/**
 * The strip along the top of every classified screen:
 *   CONFIDENTIAL      ●      File #INI-2026
 */
export function ClassifiedBar({ left, right, tone = 'gold' }) {
  const reduced = useReducedMotion()
  const color = tone === 'gold' ? 'text-gold/80' : 'text-paper/50'

  return (
    <div className="relative z-20 flex items-center justify-between border-b border-gold/15 bg-ink-deep/80 px-4 py-3 backdrop-blur-sm sm:px-8">
      <span className={`kicker ${color}`}>{left}</span>

      <motion.span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-wax"
        animate={reduced ? undefined : { opacity: [0.35, 1, 0.35] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />

      <span className="kicker text-paper/45">{right}</span>
    </div>
  )
}

/**
 * Shell for a single screen of the narrative. Holds the dark stage, the
 * vignette, drifting dust, and the cinematic enter/exit choreography so no
 * individual screen has to repeat any of it.
 */
export function Layout({
  children,
  bar,
  dust = true,
  dustCount = 16,
  className = '',
  contentClassName = '',
  center = true,
  variants = screenEnter,
}) {
  return (
    <motion.section
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`relative flex min-h-[100svh] flex-col bg-ink ${className}`}
    >
      <div aria-hidden="true" className="screen-vignette pointer-events-none fixed inset-0 z-0" />
      {dust && <DustParticles count={dustCount} className="fixed z-0" />}

      {bar && <ClassifiedBar {...bar} />}

      <div
        className={`relative z-10 flex flex-1 flex-col ${
          center ? 'items-center justify-center' : ''
        } ${contentClassName}`}
      >
        {children}
      </div>
    </motion.section>
  )
}
