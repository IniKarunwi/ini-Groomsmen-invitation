import { forwardRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '../lib/motion'

const base =
  'relative inline-flex items-center justify-center gap-3 font-body uppercase tap-transparent select-none disabled:opacity-50 disabled:pointer-events-none'

const sizes = {
  sm: 'px-5 py-2.5 text-[0.62rem] tracking-[0.24em]',
  md: 'px-7 py-3.5 text-[0.7rem] tracking-[0.26em]',
  lg: 'px-8 py-4 text-[0.78rem] tracking-[0.3em]',
}

const variants = {
  /* The black bar across the newspaper: printed ink, not a web button. */
  press: 'bg-ink text-paper font-medium shadow-[0_2px_0_rgba(20,17,15,0.35)]',
  /* Thin gold rule around near-black — used for "tap to continue". */
  outline: 'border border-gold/70 bg-transparent text-paper/90 font-medium',
  /* Filled gold, for the strongest call in a dark scene. */
  gold: 'bg-gold text-ink font-semibold',
  /* Green, matching the ACCEPTED stamp ink. */
  green: 'border-2 border-stamp bg-stamp/15 text-[#5cc46a] font-semibold',
  /* Quiet decline. */
  ghost: 'border border-gold/25 bg-transparent text-paper/40 font-medium',
}

const glows = {
  press: '0 0 0 1px rgba(176,138,46,0.55), 0 12px 30px -14px rgba(0,0,0,0.9)',
  outline: '0 0 0 1px rgba(176,138,46,0.9), 0 0 30px -6px rgba(176,138,46,0.5)',
  gold: '0 0 34px -8px rgba(217,182,92,0.75)',
  green: '0 0 0 1px rgba(46,125,50,0.9), 0 0 34px -8px rgba(46,125,50,0.6)',
  ghost: '0 0 0 1px rgba(176,138,46,0.55)',
}

/**
 * One button for the whole experience. Hover lifts a faint gold glow; pressing
 * depresses the surface as though it were physically pushed into the page.
 */
export const Button = forwardRef(function Button(
  {
    children,
    variant = 'outline',
    size = 'md',
    full = false,
    href,
    className = '',
    pulse = false,
    ...rest
  },
  ref,
) {
  const reduced = useReducedMotion()
  const Component = href ? motion.a : motion.button

  const componentProps = href
    ? { href, target: '_blank', rel: 'noreferrer noopener' }
    : { type: 'button' }

  return (
    <Component
      ref={ref}
      {...componentProps}
      {...rest}
      className={`${base} ${sizes[size]} ${variants[variant]} ${full ? 'w-full' : ''} ${className}`}
      initial={false}
      whileHover={reduced ? undefined : { boxShadow: glows[variant], y: -1 }}
      whileFocus={reduced ? undefined : { boxShadow: glows[variant] }}
      whileTap={
        reduced
          ? undefined
          : {
              y: 1.5,
              scale: 0.988,
              boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.5)',
            }
      }
      animate={
        pulse && !reduced
          ? {
              boxShadow: [
                '0 0 0 1px rgba(176,138,46,0.35)',
                '0 0 26px -6px rgba(176,138,46,0.55)',
                '0 0 0 1px rgba(176,138,46,0.35)',
              ],
            }
          : undefined
      }
      transition={
        pulse && !reduced
          ? { duration: 3.4, repeat: Infinity, repeatDelay: 2.2, ease: 'easeInOut' }
          : { duration: 0.5, ease: EASE }
      }
    >
      {children}
    </Component>
  )
})
