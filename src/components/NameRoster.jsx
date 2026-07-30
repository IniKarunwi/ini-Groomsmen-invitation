import { motion, useReducedMotion } from 'framer-motion'
import { groomsmen } from '../data/groomsmen'
import { wedding } from '../data/invitation'
import { DUR, EASE } from '../lib/motion'
import { play, unlockAudio } from '../lib/audio'

/**
 * The roster of men called up, presented as a classified index.
 *
 * This is the only way forward from the opening letter: a man finds his own
 * name on the list and presses it, and from that point the experience is his —
 * the URL, the envelope, and the letter all carry his name.
 */
export function NameRoster({ onSelect, activeSlug, className = '' }) {
  const reduced = useReducedMotion()

  const choose = (man) => {
    unlockAudio()
    play('paper')
    onSelect(man)
  }

  return (
    <motion.nav
      aria-label="Groomsmen"
      className={`border border-gold/35 bg-ink-soft/80 backdrop-blur-sm ${className}`}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 34 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DUR.slow, ease: EASE }}
    >
      <div className="border-b border-gold/25 bg-black/30 px-4 py-2.5 text-center">
        <span className="kicker text-[0.5rem] text-gold">Identify yourself</span>
      </div>

      <p className="px-4 pt-4 text-center text-[0.78rem] leading-relaxed text-paper/55">
        Find your name below. Press it to continue.
      </p>

      <ul className="px-2 py-3">
        {groomsmen.map((man, i) => {
          const active = man.slug === activeSlug
          return (
            <motion.li
              key={man.slug}
              initial={reduced ? false : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: DUR.quick, delay: 0.25 + i * 0.09, ease: EASE }}
            >
              <motion.button
                type="button"
                onClick={() => choose(man)}
                className={`group flex w-full items-center gap-3 border-b border-gold/10 px-2 py-3 text-left tap-transparent last:border-b-0 ${
                  active ? 'bg-gold/[0.07]' : ''
                }`}
                whileHover={reduced ? undefined : { backgroundColor: 'rgba(176,138,46,0.12)', x: 3 }}
                whileFocus={reduced ? undefined : { backgroundColor: 'rgba(176,138,46,0.12)', x: 3 }}
                whileTap={reduced ? undefined : { x: 1, backgroundColor: 'rgba(176,138,46,0.2)' }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <span className="font-mono text-[0.6rem] tabular-nums text-gold/50">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span className="min-w-0 flex-1 font-display text-xl font-semibold leading-none text-paper sm:text-2xl">
                  {man.name}
                </span>

                <motion.span
                  aria-hidden="true"
                  className="shrink-0 text-gold/45"
                  animate={reduced ? undefined : {}}
                >
                  <svg viewBox="0 0 16 16" className="h-3 w-3">
                    <path d="M5 2 L11 8 L5 14" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </motion.span>
              </motion.button>
            </motion.li>
          )
        })}
      </ul>

      <div className="border-t border-gold/20 px-4 py-2.5 text-center">
        <span className="kicker text-[0.45rem] text-paper/30">
          {groomsmen.length} names · File #{wedding.fileRef}
        </span>
      </div>
    </motion.nav>
  )
}
