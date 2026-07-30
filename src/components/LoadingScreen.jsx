import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Layout } from './Layout'
import { Button } from './Button'
import { loading } from '../data/invitation'
import { useTypewriter } from '../hooks/useTypewriter'
import { cameraPush, DUR, EASE } from '../lib/motion'
import { play, unlockAudio } from '../lib/audio'

const BAR_HEIGHTS = [4, 9, 6, 13, 8, 5, 11, 7, 14, 6, 10, 5, 12, 8, 4, 9, 6, 11, 5, 8, 4]
const DOTS = 5

/** A quiet gold waveform: the room has an ambience even if the speakers are off. */
function AudioIndicator() {
  const reduced = useReducedMotion()

  return (
    <div aria-hidden="true" className="flex h-4 items-center justify-center gap-[3px]">
      {BAR_HEIGHTS.map((height, i) => (
        <motion.span
          key={i}
          className="w-[2px] rounded-full bg-gold/70"
          style={{ height }}
          animate={reduced ? undefined : { scaleY: [0.35, 1, 0.55, 0.9, 0.35] }}
          transition={{
            duration: 2.6 + (i % 5) * 0.35,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.06,
          }}
        />
      ))}
    </div>
  )
}

function ProgressDots({ active }) {
  return (
    <div aria-hidden="true" className="flex items-center justify-center gap-2.5">
      {Array.from({ length: DOTS }, (_, i) => (
        <motion.span
          key={i}
          className="rounded-full bg-gold"
          animate={{
            width: i === active ? 9 : 5,
            height: i === active ? 9 : 5,
            opacity: i === active ? 1 : i < active ? 0.75 : 0.3,
          }}
          transition={{ duration: 0.7, ease: EASE }}
        />
      ))}
    </div>
  )
}

/** A hairline of gold reaching in from the edge of the frame. */
function EdgeRule({ position }) {
  return (
    <motion.span
      aria-hidden="true"
      className={`absolute left-1/2 h-16 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold/60 to-transparent ${
        position === 'top' ? 'top-0' : 'bottom-0'
      }`}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: DUR.slow, ease: EASE, delay: 0.2 }}
      style={{ transformOrigin: position === 'top' ? 'top' : 'bottom' }}
    />
  )
}

/**
 * Screen 2 — the loading experience.
 *
 * The headline is already on screen when we arrive (the newspaper zoomed into
 * it). The brief is typed out beneath it, and tapping pushes the camera
 * forward into the dark, where an envelope is waiting.
 */
export function LoadingScreen({ onAdvance }) {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const [advancing, setAdvancing] = useState(false)

  const { typed, done } = useTypewriter(loading.line, {
    enabled: !reduced,
    startDelay: 700,
    speed: 42,
    sound: true,
  })

  useEffect(() => {
    if (reduced) {
      setActive(DOTS - 1)
      return undefined
    }
    const timer = window.setInterval(() => setActive((i) => (i + 1) % DOTS), 900)
    return () => window.clearInterval(timer)
  }, [reduced])

  const handleAdvance = () => {
    if (advancing) return
    unlockAudio()
    play('paper')
    setAdvancing(true)
    window.setTimeout(() => onAdvance(), reduced ? 300 : 900)
  }

  return (
    <Layout variants={cameraPush} dustCount={12} className="bg-ink-deep">
      <EdgeRule position="top" />
      <EdgeRule position="bottom" />

      {/* The push forward: the stage darkens and closes in as we leave. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-30 bg-ink-deep"
        initial={{ opacity: 0 }}
        animate={{ opacity: advancing && !reduced ? 0.72 : 0 }}
        transition={{ duration: 0.9, ease: EASE }}
      />

      <motion.div
        className="flex w-full max-w-2xl flex-col items-center px-6 py-20 text-center"
        animate={advancing && !reduced ? { scale: 1.12, filter: 'blur(3px)' } : { scale: 1 }}
        transition={{ duration: 1, ease: EASE }}
      >
        <motion.h1
          className="font-slab text-[clamp(3rem,14vw,7rem)] font-black uppercase leading-[0.86] tracking-[-0.01em] text-paper"
          style={{ textShadow: '0 0 60px rgba(246,240,228,0.14)' }}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: DUR.long, ease: EASE }}
        >
          {loading.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </motion.h1>

        {/* rule · dot · rule */}
        <motion.div
          className="mt-8 flex items-center gap-3"
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: DUR.base, delay: 0.5, ease: EASE }}
        >
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/70 sm:w-24" />
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/70 sm:w-24" />
        </motion.div>

        <p className="mt-10 min-h-[3.5rem] font-body text-[1.05rem] font-light leading-relaxed text-paper/85 sm:text-[1.25rem]">
          <span className="sr-only">{loading.line}</span>
          <span aria-hidden="true">{typed}</span>
          <motion.span
            aria-hidden="true"
            className="ml-[2px] inline-block h-[1.05em] w-[2px] translate-y-[0.16em] bg-paper/80"
            animate={reduced ? undefined : { opacity: [1, 1, 0, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
          />
        </p>

        <motion.p
          className="kicker mt-5 text-gold/85"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: done ? 1 : 0, y: done ? 0 : 10 }}
          transition={{ duration: DUR.quick, ease: EASE }}
        >
          {loading.reference}
        </motion.p>

        <div className="mt-16">
          <AudioIndicator />
        </div>

        <div className="mt-8">
          <ProgressDots active={active} />
        </div>

        <motion.div
          className="mt-14"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.slow, delay: reduced ? 0.2 : 2.2, ease: EASE }}
        >
          <Button variant="outline" size="lg" pulse onClick={handleAdvance}>
            {loading.cta}
          </Button>
        </motion.div>
      </motion.div>
    </Layout>
  )
}
