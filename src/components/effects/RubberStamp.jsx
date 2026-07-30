import { memo, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '../../lib/motion'
import { play } from '../../lib/audio'

const PUFFS = [
  { x: -58, y: 14, size: 26, delay: 0 },
  { x: 62, y: 8, size: 22, delay: 0.04 },
  { x: -26, y: 30, size: 18, delay: 0.08 },
  { x: 36, y: 32, size: 20, delay: 0.06 },
  { x: 4, y: -26, size: 16, delay: 0.1 },
]

/**
 * A physical rubber stamp coming down onto the page: it drops from above the
 * sheet, lands hard, throws a little dust, and the ink then bleeds out into
 * the paper fibres.
 *
 * `onImpact` fires at the moment of contact so the parent can shake the page.
 */
function RubberStampBase({
  label,
  color = '#2E7D32',
  rotate = -8,
  delay = 0.9,
  onImpact,
  className = '',
}) {
  const reduced = useReducedMotion()
  const [landed, setLanded] = useState(reduced)

  useEffect(() => {
    if (!reduced) return undefined
    const timer = window.setTimeout(() => onImpact?.(), delay * 1000)
    return () => window.clearTimeout(timer)
  }, [reduced, delay, onImpact])

  const handleImpact = () => {
    setLanded(true)
    play('stamp')
    onImpact?.()
  }

  return (
    <div className={`pointer-events-none relative select-none ${className}`}>
      <motion.div
        className="relative"
        style={{ transformOrigin: '50% 50%' }}
        initial={
          reduced
            ? { opacity: 1, scale: 1, rotate }
            : { opacity: 0, scale: 2.5, rotate: rotate - 14, y: -70 }
        }
        animate={
          reduced
            ? { opacity: 1, scale: 1, rotate }
            : {
                opacity: [0, 0.85, 1, 1],
                scale: [2.5, 1.06, 0.985, 1],
                rotate: [rotate - 14, rotate, rotate, rotate],
                y: [-70, 0, 0, 0],
              }
        }
        transition={
          reduced
            ? { duration: 0.6, delay, ease: EASE }
            : { duration: 0.62, delay, ease: [0.3, 0, 0.2, 1], times: [0, 0.62, 0.78, 1] }
        }
        onAnimationComplete={reduced ? undefined : handleImpact}
      >
        <motion.div
          className="ink-bleed border-[6px] px-6 py-2 sm:px-9 sm:py-3"
          style={{ borderColor: color, color }}
          initial={reduced ? false : { filter: 'blur(2.6px)', opacity: 0.72 }}
          animate={{ filter: 'blur(0.3px)', opacity: 1 }}
          transition={{ duration: 1.1, delay: delay + 0.5, ease: EASE }}
        >
          <span
            className="block font-slab text-[2rem] font-bold uppercase leading-none tracking-[0.14em] sm:text-[3rem]"
            style={{ textShadow: `0 0 1px ${color}` }}
          >
            {label}
          </span>
        </motion.div>

        {/* Uneven ink coverage: the stamp never lands perfectly flat. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 mix-blend-screen"
          style={{
            background:
              'radial-gradient(120% 60% at 22% 30%, rgba(246,240,228,0.5) 0%, transparent 45%), radial-gradient(90% 70% at 80% 78%, rgba(246,240,228,0.4) 0%, transparent 50%)',
          }}
        />
      </motion.div>

      {/* Dust thrown out from under the stamp on contact */}
      {landed && !reduced && (
        <div aria-hidden="true" className="absolute inset-0">
          {PUFFS.map((puff) => (
            <motion.span
              key={`${puff.x}-${puff.y}`}
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: puff.size,
                height: puff.size,
                background: 'radial-gradient(circle, rgba(120,102,72,0.4), transparent 70%)',
              }}
              initial={{ x: 0, y: 0, opacity: 0.55, scale: 0.4 }}
              animate={{ x: puff.x, y: puff.y, opacity: 0, scale: 1.9 }}
              transition={{ duration: 1.05, delay: puff.delay, ease: 'easeOut' }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export const RubberStamp = memo(RubberStampBase)
