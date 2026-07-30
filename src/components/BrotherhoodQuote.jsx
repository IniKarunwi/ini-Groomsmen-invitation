import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Layout } from './Layout'
import { Button } from './Button'
import { BrotherhoodRow } from './illustrations'
import { brotherhood } from '../data/invitation'
import { DUR, EASE } from '../lib/motion'

/**
 * Screen 7 — the brotherhood.
 *
 * Nothing here asks for anything. Warm light drifts behind a blurred rank of
 * men, the verse holds the centre of the frame, and the pace deliberately
 * slows so the moment can land.
 */
export function BrotherhoodQuote({ onAdvance }) {
  const reduced = useReducedMotion()
  const sceneRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start end', 'end start'],
  })

  // Layered parallax: the further back a layer sits, the less it travels.
  const farY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])
  const midY = useTransform(scrollYProgress, [0, 1], ['-9%', '9%'])
  const nearY = useTransform(scrollYProgress, [0, 1], ['-14%', '14%'])

  return (
    <Layout center={false} dust={false} contentClassName="relative">
      <div ref={sceneRef} className="relative flex min-h-[100svh] items-center overflow-hidden">
        {/* Warm lamplight, far behind everything */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[-15%] z-0"
          style={{ y: reduced ? 0 : farY }}
        >
          <motion.div
            className="absolute left-[12%] top-[16%] h-[60vh] w-[60vh] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(176,138,46,0.22), transparent 68%)',
              filter: 'blur(50px)',
            }}
            animate={reduced ? undefined : { opacity: [0.55, 0.85, 0.55], scale: [1, 1.08, 1] }}
            transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[8%] right-[6%] h-[55vh] w-[55vh] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(141,35,35,0.2), transparent 70%)',
              filter: 'blur(60px)',
            }}
            animate={reduced ? undefined : { opacity: [0.4, 0.7, 0.4], scale: [1.05, 1, 1.05] }}
            transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* The assembled brothers, held out of focus */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center"
          style={{ y: reduced ? 0 : midY, filter: 'blur(7px)', opacity: 0.5 }}
        >
          <BrotherhoodRow count={9} className="h-[42vh] w-[130%] max-w-none" />
        </motion.div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(20,17,15,0.55) 0%, rgba(20,17,15,0.2) 40%, rgba(11,9,8,0.92) 100%)',
          }}
        />

        {/* The verse */}
        <motion.div
          className="relative z-10 mx-auto w-full max-w-2xl px-6 py-24 text-center"
          style={{ y: reduced ? 0 : nearY }}
        >
          <motion.p
            className="kicker text-[0.5rem] text-gold/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DUR.slow, ease: EASE }}
          >
            {brotherhood.kicker}
          </motion.p>

          <blockquote className="mt-10">
            {brotherhood.quote.map((line, i) => (
              <motion.span
                key={line}
                className="block font-display text-[clamp(2rem,8vw,3.75rem)] font-semibold italic leading-[1.15] text-paper"
                style={{ textShadow: '0 8px 40px rgba(0,0,0,0.6)' }}
                initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: DUR.long, delay: 0.5 + i * 0.7, ease: EASE }}
              >
                {line}
              </motion.span>
            ))}
          </blockquote>

          <motion.div
            className="mx-auto mt-10 h-px w-24 bg-gold/60"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: DUR.slow, delay: 2.1, ease: EASE }}
          />

          <motion.p
            className="kicker mt-6 text-gold/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DUR.slow, delay: 2.4, ease: EASE }}
          >
            {brotherhood.reference}
          </motion.p>

          <motion.p
            className="mx-auto mt-12 max-w-md text-[0.92rem] leading-[1.95] text-paper/65"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.long, delay: 3.1, ease: EASE }}
          >
            {brotherhood.closing}
          </motion.p>

          <motion.div
            className="mt-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.long, delay: reduced ? 0.4 : 4.4, ease: EASE }}
          >
            <Button variant="outline" size="lg" onClick={onAdvance}>
              {brotherhood.cta}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  )
}
