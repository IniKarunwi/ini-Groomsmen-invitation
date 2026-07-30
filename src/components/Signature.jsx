import { motion, useReducedMotion } from 'framer-motion'
import { DUR, EASE } from '../lib/motion'

/**
 * The groom's hand: an italic signature with the stroke of ink ruled beneath
 * it, drawn left to right the way a pen actually moves.
 */
export function Signature({ name, delay = 0, tone = 'ink', size = 'md', className = '' }) {
  const reduced = useReducedMotion()

  const sizes = {
    md: 'text-4xl sm:text-[2.6rem]',
    lg: 'text-5xl sm:text-6xl',
  }

  const colours = {
    ink: { text: 'text-ink', rule: 'bg-ink/70' },
    paper: { text: 'text-paper', rule: 'bg-paper/70' },
    gold: { text: 'text-gold-light', rule: 'bg-gold/70' },
  }

  return (
    <span className={`inline-flex flex-col items-start ${className}`}>
      <motion.span
        className={`font-display italic ${sizes[size]} ${colours[tone].text}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DUR.slow, delay, ease: EASE }}
      >
        {name}
      </motion.span>
      <motion.span
        aria-hidden="true"
        className={`mt-1 h-[2px] w-16 ${colours[tone].rule}`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: reduced ? 0.4 : DUR.base, delay: delay + 0.35, ease: EASE }}
        style={{ transformOrigin: 'left' }}
      />
    </span>
  )
}
