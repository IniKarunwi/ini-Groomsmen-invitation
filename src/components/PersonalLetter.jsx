import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Layout } from './Layout'
import { Envelope } from './Envelope'
import { Letter, Reveal } from './Letter'
import { Button } from './Button'
import { Signature } from './Signature'
import { PhotoFrame } from './PhotoFrame'
import { personalLetter, wedding } from '../data/invitation'
import { DUR, EASE } from '../lib/motion'
import { play } from '../lib/audio'

/**
 * Screen 3 — the personal letter, and the emotional centre of the experience.
 *
 * The envelope already carries this man's name. Once it is open the letter
 * unfolds and reveals itself one paragraph at a time, slowly enough to read
 * without hurrying; the photograph is mounted beside it, and the signature is
 * the very last thing to arrive.
 *
 * The letter ends by asking, and the answer is given here — pressing "Yes"
 * is what sends the recruitment notice to be stamped.
 */
export function PersonalLetter({ groomsman, onAccept }) {
  const reduced = useReducedMotion()
  const [opened, setOpened] = useState(false)
  const [read, setRead] = useState(false)
  const [wrongAnswer, setWrongAnswer] = useState(false)
  const letterRef = useRef(null)

  useEffect(() => {
    if (!opened || reduced) return
    const timer = window.setTimeout(() => {
      letterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 700)
    return () => window.clearTimeout(timer)
  }, [opened, reduced])

  // The paper reveals paragraph by paragraph; the answer waits for the last one.
  // Longer letters use a slightly tighter cadence so the final paragraph is not
  // still arriving a quarter of a minute after the paper opened.
  const paragraphs = groomsman.letter
  const stagger = paragraphs.length > 9 ? 0.34 : 0.5
  const readingDelay = reduced ? 0.4 : 1.2 + paragraphs.length * stagger

  useEffect(() => {
    if (!opened) return undefined
    const timer = window.setTimeout(() => setRead(true), readingDelay * 1000)
    return () => window.clearTimeout(timer)
  }, [opened, readingDelay])

  const handleDecline = () => {
    play('key')
    setWrongAnswer(true)
    window.setTimeout(() => setWrongAnswer(false), 1500)
  }

  return (
    <Layout
      bar={{ left: 'Personal & Confidential', right: `For ${groomsman.name}` }}
      center={false}
      contentClassName="px-4 pb-16 pt-10 sm:px-6 sm:pt-14"
    >
      <div className="mx-auto w-full max-w-reading lg:max-w-[54rem]">
        {/* The generous gap leaves room for the flap to swing up and open */}
        <motion.p
          className="kicker mb-24 text-center text-[0.55rem] text-gold/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DUR.base, ease: EASE }}
        >
          {personalLetter.kicker}
        </motion.p>

        <div className="mx-auto max-w-reading">
          <Envelope
            recipient={groomsman.name}
            band={personalLetter.envelopeBand}
            onOpened={() => setOpened(true)}
          />
        </div>

        <AnimatePresence>
          {opened && (
            <motion.div ref={letterRef} className="mt-12 scroll-mt-16" exit={{ opacity: 0 }}>
              {/* On a wide screen the photograph sits beside the letter and
                  travels with the reader; on a phone it is enclosed with it,
                  mounted below the last paragraph. */}
              <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-start lg:gap-10">
                <div className="lg:order-1">
                  <Letter stagger={stagger}>
                    <Reveal className="mb-6 text-right text-[0.8rem] italic text-ink/55">
                      {wedding.monthYear}
                    </Reveal>

                    <Reveal as="h1" className="font-display text-3xl font-bold text-ink sm:text-4xl">
                      {groomsman.name},
                    </Reveal>

                    {paragraphs.map((paragraph, i) => (
                      <Reveal
                        as="p"
                        key={paragraph}
                        className={`text-[0.97rem] leading-[1.9] text-ink/90 ${
                          i === 0 ? 'mt-6' : 'mt-5'
                        }`}
                      >
                        {paragraph}
                      </Reveal>
                    ))}

                    <Reveal aria-hidden="true" className="my-9 h-px w-24 bg-ink/25" />

                    <Reveal as="p" className="text-[0.82rem] text-ink/55">
                      {personalLetter.signOff}
                    </Reveal>

                    <Reveal className="mt-1">
                      <Signature name={wedding.groom} size="lg" delay={0.5} />
                    </Reveal>

                    <Reveal
                      as="p"
                      className="mt-5 text-[0.68rem] uppercase tracking-[0.2em] text-ink/40"
                    >
                      {groomsman.role} · {wedding.operation}
                    </Reveal>
                  </Letter>
                </div>

                <aside className="mt-10 lg:order-2 lg:mt-2 lg:sticky lg:top-24">
                  <PhotoFrame
                    src={groomsman.photo}
                    alt={`${groomsman.name} and ${wedding.groom}`}
                    caption={groomsman.photoCaption}
                    delay={0.5}
                    tilt={2}
                  />
                </aside>
              </div>

              {/* ---------- The answer ---------- */}
              <motion.div
                className="relative mt-10 lg:mx-auto lg:max-w-reading"
                initial={{ opacity: 0, y: 26 }}
                animate={read ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
                transition={{ duration: DUR.slow, ease: EASE }}
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
                        {personalLetter.wrongAnswer}
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
                        {personalLetter.accept}
                      </Button>
                      <Button variant="ghost" size="md" full onClick={handleDecline}>
                        {personalLetter.decline}
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
