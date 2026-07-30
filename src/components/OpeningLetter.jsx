import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Layout } from './Layout'
import { Envelope } from './Envelope'
import { Letter, Reveal } from './Letter'
import { Button } from './Button'
import { Signature } from './Signature'
import { PhotoFrame } from './PhotoFrame'
import { openingLetter, wedding } from '../data/invitation'
import { DUR, EASE } from '../lib/motion'
import { play } from '../lib/audio'

/** Two short rules, the way an editorial page breaks a thought. */
function DoubleBreak() {
  return (
    <Reveal className="my-8 flex gap-6" aria-hidden="true">
      <span className="h-px w-1/3 bg-ink/25" />
      <span className="h-px w-1/3 bg-ink/25" />
    </Reveal>
  )
}

/**
 * Screen 3 — the opening letter.
 *
 * The envelope is waiting; the wax has to be broken before a word is readable.
 */
export function OpeningLetter({ recipient, onAccept }) {
  const reduced = useReducedMotion()
  const [opened, setOpened] = useState(false)
  const [wrongAnswer, setWrongAnswer] = useState(false)
  const letterRef = useRef(null)

  useEffect(() => {
    if (!opened || reduced) return
    const timer = window.setTimeout(() => {
      letterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 700)
    return () => window.clearTimeout(timer)
  }, [opened, reduced])

  const handleDecline = () => {
    play('key')
    setWrongAnswer(true)
    window.setTimeout(() => setWrongAnswer(false), 1500)
  }

  return (
    <Layout
      bar={{ left: 'Confidential', right: `File #${wedding.fileRef}` }}
      center={false}
      contentClassName="px-4 pb-16 pt-10 sm:px-6 sm:pt-14"
    >
      <div className="mx-auto w-full max-w-reading lg:max-w-[54rem]">
        <div className="mx-auto max-w-reading">
          <Envelope
            recipient={recipient}
            band={openingLetter.envelopeBand}
            onOpened={() => setOpened(true)}
          />
        </div>

        <AnimatePresence>
          {opened && (
            <motion.div
              ref={letterRef}
              className="mt-12 scroll-mt-16"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-start lg:gap-10">
                <div className="lg:order-1">
              <Letter>
                <Reveal className="mb-6 text-right text-[0.8rem] italic text-ink/55">
                  {openingLetter.date}
                </Reveal>

                <Reveal as="h1" className="font-display text-3xl font-bold text-ink sm:text-4xl">
                  {openingLetter.heading}
                </Reveal>

                <Reveal as="p" className="mt-6 text-[0.95rem] leading-[1.85] text-ink/90">
                  {openingLetter.intro}
                </Reveal>

                <Reveal className="my-7 border-l-[3px] border-gold bg-ink/[0.04] py-4 pl-5 pr-3">
                  <p className="font-display text-[1.15rem] font-semibold italic leading-snug text-ink sm:text-[1.3rem]">
                    “{openingLetter.quote}”
                  </p>
                </Reveal>

                {openingLetter.body.map((paragraph) => (
                  <Reveal
                    as="p"
                    key={paragraph}
                    className="mt-5 text-[0.95rem] leading-[1.85] text-ink/90"
                  >
                    {paragraph}
                  </Reveal>
                ))}

                <DoubleBreak />

                {openingLetter.bridge.map((paragraph) => (
                  <Reveal
                    as="p"
                    key={paragraph}
                    className="mt-4 text-[0.95rem] leading-[1.85] text-ink/90"
                  >
                    {paragraph}
                  </Reveal>
                ))}

                <ul className="mt-6 space-y-3 pl-4">
                  {openingLetter.pledges.map((pledge) => (
                    <Reveal as="li" key={pledge} className="font-display text-[1.15rem] font-bold text-ink">
                      {pledge}
                    </Reveal>
                  ))}
                </ul>

                <Reveal as="p" className="mt-6 text-[0.95rem] leading-[1.85] text-ink/90">
                  {openingLetter.closingBody}
                </Reveal>

                <Reveal aria-hidden="true" className="my-8 h-px w-full bg-ink/20" />

                <Reveal as="p" className="font-display text-[1.3rem] font-bold text-ink">
                  {openingLetter.question}
                </Reveal>

                <Reveal as="p" className="mt-8 text-[0.82rem] text-ink/55">
                  {openingLetter.signOff}
                </Reveal>

                <Reveal className="mt-1">
                  <Signature name={wedding.groom} />
                </Reveal>
              </Letter>
                </div>

                <aside className="mt-10 lg:order-2 lg:mt-2 lg:sticky lg:top-24">
                  <PhotoFrame
                    src={wedding.photo}
                    alt={wedding.photoAlt}
                    caption={wedding.photoCaption}
                    delay={0.5}
                    tilt={-2.2}
                  />
                </aside>
              </div>

              {/* ---------- The question ---------- */}
              <motion.div
                className="relative mt-8 lg:mx-auto lg:max-w-reading"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DUR.slow, delay: reduced ? 0.2 : 2.6, ease: EASE }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {wrongAnswer ? (
                    <motion.div
                      key="wrong"
                      className="flex min-h-[7.5rem] items-center justify-center border border-gold/30 bg-ink-soft px-6 text-center"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0, x: reduced ? 0 : [0, -6, 5, -3, 0] }}
                      exit={{ opacity: 0, y: -12 }}
                      /* Brisk on purpose: the joke only has 1.5s to land */
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <p className="font-display text-2xl font-semibold text-paper">
                        {openingLetter.wrongAnswer}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="choice"
                      className="space-y-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <Button variant="outline" size="lg" full onClick={onAccept}>
                        {openingLetter.accept}
                      </Button>
                      <Button variant="ghost" size="md" full onClick={handleDecline}>
                        {openingLetter.decline}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  )
}
