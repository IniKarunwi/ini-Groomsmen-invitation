import { memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * Print grain sitting on top of a paper surface. The texture creeps by a few
 * pixels over half a minute, which reads as a sheet breathing under a lamp
 * rather than as an animation.
 */
function PaperGrainBase({ opacity = 0.07, animate = true, className = '' }) {
  const reduced = useReducedMotion()
  const shouldMove = animate && !reduced

  return (
    <motion.div
      aria-hidden="true"
      className={`grain-overlay pointer-events-none absolute inset-[-8%] mix-blend-multiply ${className}`}
      style={{ opacity, willChange: shouldMove ? 'transform' : undefined }}
      animate={shouldMove ? { x: [0, 6, -4, 0], y: [0, -5, 4, 0] } : undefined}
      transition={shouldMove ? { duration: 34, repeat: Infinity, ease: 'easeInOut' } : undefined}
    />
  )
}

export const PaperGrain = memo(PaperGrainBase)
