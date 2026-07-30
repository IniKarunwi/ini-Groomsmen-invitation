import { useCallback, useState } from 'react'
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion'
import { Layout } from './Layout'
import { Button } from './Button'
import { PaperGrain } from './effects/PaperGrain'
import { RubberStamp } from './effects/RubberStamp'
import { WaxSeal } from './effects/WaxSeal'
import { LazyImage } from './LazyImage'
import { dossier, wedding } from '../data/invitation'
import { DUR, EASE } from '../lib/motion'

/**
 * Screen 4 — recruitment accepted.
 *
 * The notice slides up, and the ACCEPTED stamp comes down onto it: the page
 * jolts, dust lifts, and the ink bleeds into the paper.
 */
export function Dossier({ groomsman, onAdvance }) {
  const reduced = useReducedMotion()
  const paper = useAnimationControls()
  const [stamped, setStamped] = useState(false)

  const handleImpact = useCallback(() => {
    setStamped(true)
    if (reduced) return
    paper.start({
      x: [0, -7, 6, -3, 1, 0],
      y: [0, 4, -2, 1, 0],
      rotate: [0, -0.5, 0.4, -0.2, 0],
      transition: { duration: 0.5, ease: 'easeOut' },
    })
  }, [paper, reduced])

  return (
    <Layout
      bar={{ left: 'Dossier', right: `File #${wedding.fileRef}` }}
      center={false}
      contentClassName="px-4 pb-16 pt-8 sm:px-6 sm:pt-12"
    >
      <div className="mx-auto w-full max-w-reading">
        {/* File tab */}
        <motion.div
          className="ml-1 inline-block border border-b-0 border-ink/20 bg-paper-shadow px-5 py-2"
          initial={{ y: 26, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: DUR.base, ease: EASE }}
        >
          <span className="font-slab text-[0.68rem] font-bold uppercase tracking-[0.16em] text-ink">
            {dossier.tab}
          </span>
        </motion.div>

        {/* The notice */}
        <motion.div
          className="relative"
          initial={{ y: 70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: DUR.slow, ease: EASE }}
        >
          <motion.div animate={paper}>
            <div className="paper-aged relative overflow-hidden px-5 py-8 shadow-paper sm:px-9 sm:py-10">
              <PaperGrain opacity={0.08} />

              {/* Stamp */}
              <div className="relative flex justify-center pb-6">
                <RubberStamp label={dossier.stampLabel} rotate={-8} delay={1.15} onImpact={handleImpact} />
              </div>

              <p className="kicker text-center text-[0.58rem] text-ink/65 sm:text-[0.64rem]">
                {dossier.agency}
              </p>

              <div className="mt-4 h-px w-full bg-ink/20" />

              <h1 className="mt-5 text-center font-display text-[1.6rem] font-bold leading-tight text-ink sm:text-3xl">
                {dossier.title}
              </h1>

              {/* Inner dossier panel */}
              <motion.div
                className="mt-6 border-2 border-gold/80"
                style={{ background: 'linear-gradient(165deg, #221d18 0%, #14110f 100%)' }}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DUR.base, delay: 0.55, ease: EASE }}
              >
                <div className="flex items-center justify-between gap-3 border-b border-gold/40 bg-black/30 px-4 py-2.5">
                  <span className="kicker text-[0.55rem] text-gold">{dossier.panelTitle}</span>
                  <span className="kicker text-[0.55rem] text-paper/45">{dossier.ref}</span>
                </div>

                <div className="flex gap-5 px-4 py-5 sm:px-5">
                  <div className="shrink-0">
                    {groomsman.photo ? (
                      <LazyImage
                        src={groomsman.photo}
                        alt={`${groomsman.name}, official file photograph`}
                        wrapperClassName="h-20 w-20 border border-gold/50 sm:h-24 sm:w-24"
                        className="h-full w-full object-cover grayscale"
                      />
                    ) : (
                      <div className="flex h-20 w-20 items-center justify-center border border-gold/40 bg-gold/[0.06] sm:h-24 sm:w-24">
                        <span className="font-display text-3xl text-gold/50">?</span>
                      </div>
                    )}
                  </div>

                  <dl className="min-w-0 flex-1 space-y-3">
                    {dossier.rows(groomsman.role).map((row, i) => (
                      <motion.div
                        key={row.label}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: DUR.quick, delay: 0.8 + i * 0.15, ease: EASE }}
                      >
                        <dt className="kicker text-[0.55rem] text-gold">{row.label}</dt>
                        <dd className="mt-0.5 font-display text-lg font-semibold leading-snug text-paper sm:text-xl">
                          {row.value}
                        </dd>
                      </motion.div>
                    ))}
                  </dl>
                </div>

                <div className="border-t border-gold/25 px-4 py-2.5">
                  <p className="font-mono text-[0.6rem] uppercase leading-relaxed tracking-[0.14em] text-paper/35">
                    {dossier.ticker}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Advance */}
        <motion.div
          className="mt-7"
          initial={{ opacity: 0, y: 30 }}
          animate={stamped ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: DUR.slow, delay: reduced ? 0 : 0.35, ease: EASE }}
        >
          <Button variant="green" size="lg" full onClick={onAdvance}>
            {dossier.cta}
          </Button>
        </motion.div>

        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: stamped ? 1 : 0 }}
          transition={{ duration: DUR.slow, delay: 0.6, ease: EASE }}
        >
          <WaxSeal size={72} initial={wedding.initial} label={dossier.authorised} />
        </motion.div>
      </div>
    </Layout>
  )
}
