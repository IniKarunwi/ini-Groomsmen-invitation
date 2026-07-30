import { memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { DUR, EASE } from '../../lib/motion'

const SPOKES = Array.from({ length: 24 }, (_, i) => i * 15)

/**
 * A disc of poured wax bearing the groom's initial.
 *
 * `interactive` turns it into a button: pressing it depresses the wax, cracks
 * it, and hands control back to the caller via `onCrack`.
 */
function WaxSealBase({
  size = 92,
  initial = 'I',
  label,
  interactive = false,
  cracked = false,
  onCrack,
  glow = true,
  className = '',
  labelClassName = 'text-paper/45',
}) {
  const reduced = useReducedMotion()
  const Wrapper = interactive ? motion.button : motion.div

  const interactiveProps = interactive
    ? {
        type: 'button',
        onClick: cracked ? undefined : onCrack,
        disabled: cracked,
        whileHover: reduced ? undefined : { scale: 1.03 },
        whileTap: reduced ? undefined : { scale: 0.93 },
        transition: { duration: 0.5, ease: EASE },
        'aria-label': 'Break the wax seal to open the letter',
        className: 'group relative block cursor-pointer tap-transparent disabled:cursor-default',
      }
    : { className: 'relative block' }

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <Wrapper {...interactiveProps} style={{ width: size, height: size }}>
        {/* Ambient bloom around the wax */}
        {glow && !reduced && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(141,35,35,0.55), transparent 68%)' }}
            animate={{ opacity: [0.35, 0.65, 0.35], scale: [1.25, 1.4, 1.25] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        <motion.span
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden rounded-full"
          style={{
            background:
              'radial-gradient(circle at 34% 28%, #b83a35 0%, #8D2323 46%, #611414 100%)',
            boxShadow:
              'inset 0 2px 5px rgba(255,255,255,0.28), inset 0 -4px 10px rgba(0,0,0,0.5), 0 8px 18px -6px rgba(0,0,0,0.75)',
          }}
          animate={cracked ? { scale: 0.96, opacity: 0.9 } : { scale: 1, opacity: 1 }}
          transition={{ duration: DUR.quick, ease: EASE }}
        >
          {/* Radiating impression left by the seal press */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full opacity-45">
            {SPOKES.map((angle) => (
              <line
                key={angle}
                x1="50"
                y1="50"
                x2="50"
                y2="4"
                stroke="rgba(255,225,215,0.5)"
                strokeWidth="1.6"
                transform={`rotate(${angle} 50 50)`}
              />
            ))}
            <circle cx="50" cy="50" r="47" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="3" />
          </svg>

          {/* Slow sheen — light moving across poured wax */}
          {!reduced && (
            <motion.span
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(115deg, transparent 34%, rgba(255,240,225,0.42) 50%, transparent 66%)',
              }}
              animate={{ x: ['-115%', '115%'] }}
              transition={{ duration: 5.5, repeat: Infinity, repeatDelay: 3.4, ease: 'easeInOut' }}
            />
          )}
        </motion.span>

        <span
          className="absolute inset-0 flex items-center justify-center font-display font-semibold text-paper"
          style={{ fontSize: size * 0.34, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
        >
          {initial}
        </span>

        {/* Fracture lines, drawn only once the wax is broken */}
        {cracked && (
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full"
            style={{ overflow: 'visible' }}
          >
            {[
              'M50 50 L50 2',
              'M50 50 L96 68',
              'M50 50 L18 92',
              'M50 50 L6 34',
            ].map((d, i) => (
              <motion.path
                key={d}
                d={d}
                stroke="rgba(20,17,15,0.65)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.42, delay: 0.05 * i, ease: EASE }}
              />
            ))}
          </svg>
        )}
      </Wrapper>

      {label && <span className={`kicker text-[0.55rem] ${labelClassName}`}>{label}</span>}
    </div>
  )
}

export const WaxSeal = memo(WaxSealBase)
