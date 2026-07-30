import { memo, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * Tiny motes of dust drifting through the light. Transform/opacity only, so
 * the browser can keep this entirely on the compositor and never block a tap.
 */
function DustParticlesBase({ count = 18, tone = 'rgba(246, 240, 228, 0.5)', className = '' }) {
  const reduced = useReducedMotion()

  const motes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const seed = (i + 1) * 9301
        const rand = (n) => (((seed * n) % 233280) / 233280 + i * 0.137) % 1
        return {
          id: i,
          left: rand(3) * 100,
          top: rand(7) * 100,
          size: 1 + rand(11) * 2.4,
          drift: 14 + rand(13) * 26,
          sway: (rand(17) - 0.5) * 26,
          duration: 16 + rand(19) * 20,
          delay: rand(23) * -22,
          peak: 0.22 + rand(29) * 0.45,
        }
      }),
    [count],
  )

  if (reduced) return null

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {motes.map((mote) => (
        <motion.span
          key={mote.id}
          className="absolute rounded-full"
          style={{
            left: `${mote.left}%`,
            top: `${mote.top}%`,
            width: mote.size,
            height: mote.size,
            background: tone,
            filter: 'blur(0.4px)',
            willChange: 'transform, opacity',
          }}
          initial={{ opacity: 0 }}
          animate={{
            y: [0, -mote.drift, 0],
            x: [0, mote.sway, 0],
            opacity: [0, mote.peak, 0],
          }}
          transition={{
            duration: mote.duration,
            delay: mote.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export const DustParticles = memo(DustParticlesBase)
