import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Layout } from './Layout'
import { Button } from './Button'
import { PaperGrain } from './effects/PaperGrain'
import { WaxSeal } from './effects/WaxSeal'
import { Signature } from './Signature'
import { certificate, wedding } from '../data/invitation'
import { DUR, EASE } from '../lib/motion'
import { play } from '../lib/audio'

/** A small filigree mark in each corner of the frame. */
function CornerFlourish({ position }) {
  const rotations = {
    tl: 'top-2 left-2',
    tr: 'top-2 right-2 rotate-90',
    br: 'bottom-2 right-2 rotate-180',
    bl: 'bottom-2 left-2 -rotate-90',
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 40"
      className={`absolute h-6 w-6 text-gold/70 ${rotations[position]}`}
    >
      <path d="M2 14 V2 H14" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8 20 Q8 8 20 8" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="6" cy="6" r="1.6" fill="currentColor" />
    </svg>
  )
}

/**
 * Screen 8 — recruitment complete.
 *
 * The certificate rises into frame, the wax is poured, the groom signs, and
 * the last door out of the experience is the group everyone else is already in.
 */
export function Certificate({ groomsman, onRestart }) {
  const reduced = useReducedMotion()
  const [joined, setJoined] = useState(false)

  const handleJoin = () => {
    play('chime')
    setJoined(true)
  }

  return (
    <Layout center={false} contentClassName="px-4 pb-20 pt-10 sm:px-6 sm:pt-14" dustCount={20}>
      <div className="mx-auto w-full max-w-lg">
        <motion.p
          className="kicker mb-8 text-center text-[0.55rem] text-gold/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DUR.base, ease: EASE }}
        >
          {certificate.kicker}
        </motion.p>

        {/* The certificate */}
        <motion.div
          className="paper-surface relative overflow-hidden shadow-sheet"
          initial={reduced ? { opacity: 0 } : { y: 110, opacity: 0, filter: 'blur(6px)' }}
          animate={reduced ? { opacity: 1 } : { y: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: DUR.long, ease: EASE }}
        >
          <PaperGrain opacity={0.07} />

          <div className="relative m-3 border-2 border-gold/60 p-1">
            <div className="relative border border-gold/40 px-5 py-9 text-center sm:px-9 sm:py-11">
              <CornerFlourish position="tl" />
              <CornerFlourish position="tr" />
              <CornerFlourish position="br" />
              <CornerFlourish position="bl" />

              <p className="kicker text-[0.5rem] text-ink/55">{certificate.agency}</p>

              <h1 className="mt-4 font-display text-[1.7rem] font-bold leading-tight text-ink sm:text-[2.1rem]">
                {certificate.title}
              </h1>

              <div className="mx-auto mt-5 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-ink/25" />
                <span className="h-1 w-1 rotate-45 bg-gold" />
                <span className="h-px w-10 bg-ink/25" />
              </div>

              <p className="mt-7 text-[0.7rem] uppercase tracking-[0.22em] text-ink/50">
                This certifies that
              </p>

              <motion.p
                className="mt-3 font-display text-[2.2rem] font-semibold italic leading-tight text-ink sm:text-[2.75rem]"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DUR.slow, delay: 0.7, ease: EASE }}
              >
                {groomsman.name}
              </motion.p>

              <p className="mt-4 text-[0.86rem] leading-relaxed text-ink/75">
                {certificate.citation}
              </p>

              <p className="mt-2 font-slab text-[1.05rem] font-bold uppercase tracking-[0.1em] text-ink sm:text-[1.2rem]">
                {certificate.rank(groomsman.role)}
              </p>

              <div className="mx-auto mt-8 grid max-w-xs grid-cols-2 gap-4 border-y border-ink/15 py-4">
                <div>
                  <p className="kicker text-[0.48rem] text-ink/45">{certificate.operationLabel}</p>
                  <p className="mt-1 font-slab text-[0.8rem] font-bold uppercase text-ink">
                    {wedding.operation}
                  </p>
                </div>
                <div>
                  <p className="kicker text-[0.48rem] text-ink/45">{certificate.dateLabel}</p>
                  <p className="mt-1 font-slab text-[0.8rem] font-bold uppercase text-ink">
                    {wedding.dateShort}
                  </p>
                </div>
              </div>

              <p className="mx-auto mt-6 max-w-sm text-[0.82rem] italic leading-relaxed text-ink/70">
                {certificate.clause}
              </p>

              {/* Wax, then the groom's hand */}
              <div className="mt-9 flex items-end justify-between gap-6">
                <motion.div
                  initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.7, y: -18 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: DUR.base, delay: 1.5, ease: EASE }}
                >
                  <WaxSeal
                    size={64}
                    initial={wedding.initial}
                    glow={false}
                    label="Sealed"
                    labelClassName="text-ink/40"
                  />
                </motion.div>

                <div className="text-right">
                  <Signature name={wedding.groom} delay={2.2} className="items-end" />
                  <motion.p
                    className="mt-2 text-[0.6rem] uppercase tracking-[0.2em] text-ink/45"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: DUR.base, delay: 2.9, ease: EASE }}
                  >
                    {certificate.signatureLabel}
                  </motion.p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Join */}
        <motion.div
          className="mt-9"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.slow, delay: reduced ? 0.3 : 3.3, ease: EASE }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {joined ? (
              <motion.div
                key="welcome"
                className="border border-gold/40 bg-ink-soft px-6 py-9 text-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DUR.long, ease: EASE }}
              >
                <motion.p
                  className="font-display text-[2rem] font-semibold italic text-paper sm:text-[2.4rem]"
                  initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: DUR.long, delay: 0.2, ease: EASE }}
                >
                  {certificate.welcome}
                </motion.p>
                <motion.p
                  className="mx-auto mt-4 max-w-xs text-[0.82rem] leading-relaxed text-paper/55"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: DUR.slow, delay: 1, ease: EASE }}
                >
                  {certificate.welcomeNote}
                </motion.p>

                <motion.div
                  className="mt-7"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: DUR.base, delay: 1.6, ease: EASE }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    href={wedding.whatsappUrl}
                    className="border-gold/40 text-paper/70"
                  >
                    Open the group again
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div key="join" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                <Button
                  variant="gold"
                  size="lg"
                  full
                  href={wedding.whatsappUrl}
                  onClick={handleJoin}
                  className="text-center leading-snug"
                >
                  {certificate.cta}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onRestart}
            className="kicker text-[0.5rem] text-paper/30 underline decoration-paper/20 underline-offset-4 transition-colors duration-500 hover:text-paper/60"
          >
            Read the file again from the beginning
          </button>
        </div>
      </div>
    </Layout>
  )
}
