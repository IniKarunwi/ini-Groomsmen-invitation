import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { PaperGrain } from './effects/PaperGrain'
import { DUR, EASE, proseLine, proseStagger } from '../lib/motion'
import { play } from '../lib/audio'

/**
 * One element of a letter revealing in sequence — a paragraph, a heading, a
 * signature. Reveals are driven by the parent <Letter>, so nothing inside
 * appears until the paper has finished unfolding.
 */
export function Reveal({ children, as = 'div', className = '', ...rest }) {
  const Component = motion[as] || motion.div
  return (
    <Component variants={proseLine} className={className} {...rest}>
      {children}
    </Component>
  )
}

/**
 * A sheet of paper sliding out of an envelope and unfolding flat.
 *
 * The physical sequence is: rise, flatten, settle — and only then does the ink
 * appear, paragraph by paragraph.
 */
export function Letter({
  children,
  onUnfolded,
  rule = true,
  stagger = 0.34,
  className = '',
  contentClassName = '',
}) {
  const reduced = useReducedMotion()
  const [unfolded, setUnfolded] = useState(false)

  const settle = () => {
    if (unfolded) return
    setUnfolded(true)
    play('paper')
    onUnfolded?.()
  }

  return (
    <div className={`w-full [perspective:1500px] ${className}`}>
      <motion.article
        className="paper-surface relative overflow-hidden shadow-sheet"
        style={{ transformOrigin: 'top center' }}
        initial={
          reduced
            ? { opacity: 0 }
            : { y: 96, rotateX: -76, scaleY: 0.86, opacity: 0, filter: 'blur(4px)' }
        }
        animate={
          reduced
            ? { opacity: 1 }
            : { y: 0, rotateX: 0, scaleY: 1, opacity: 1, filter: 'blur(0px)' }
        }
        transition={{ duration: reduced ? 0.6 : DUR.long, ease: EASE }}
        onAnimationComplete={settle}
      >
        <PaperGrain opacity={0.06} />

        {/* The crease the sheet was folded along */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-ink/[0.07]"
        />

        {rule && (
          <motion.span
            aria-hidden="true"
            className="absolute bottom-0 left-6 top-0 w-px bg-gold/60 sm:left-9"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: unfolded || reduced ? 1 : 0 }}
            transition={{ duration: DUR.base, ease: EASE }}
            style={{ transformOrigin: 'top' }}
          />
        )}

        <motion.div
          className={`relative ${rule ? 'pl-12 pr-6 sm:pl-16 sm:pr-10' : 'px-6 sm:px-10'} py-10 sm:py-14 ${contentClassName}`}
          variants={proseStagger(stagger, 0.15)}
          initial="initial"
          animate={unfolded || reduced ? 'animate' : 'initial'}
        >
          {children}
        </motion.div>
      </motion.article>
    </div>
  )
}
