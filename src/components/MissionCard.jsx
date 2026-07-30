import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { PaperGrain } from './effects/PaperGrain'
import { illustrations } from './illustrations'
import { DUR, EASE, folderUnfold, iconLift } from '../lib/motion'
import { play } from '../lib/audio'

/** The stamped priority label that interrupts the rule at the top of a file. */
function PriorityLabel({ children }) {
  return (
    <div className="flex items-center gap-0" aria-hidden="true">
      <span className="h-[3px] w-4 bg-ink" />
      <span className="border-[1.5px] border-ink bg-paper px-2.5 py-1 font-slab text-[0.56rem] font-bold uppercase tracking-[0.14em] text-ink">
        {children}
      </span>
      <span className="h-[3px] flex-1 bg-ink" />
    </div>
  )
}

/** A hand-ticked checkbox: the mark lands with a small rotation, like ink. */
function PrayerCheckbox({ label, checked, onToggle }) {
  const reduced = useReducedMotion()

  return (
    <li>
      <label className="group flex cursor-pointer items-center gap-3 py-1.5 tap-transparent">
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          className="peer sr-only"
        />
        <span className="relative flex h-[18px] w-[18px] shrink-0 items-center justify-center border-[1.5px] border-ink/55 bg-paper/60 transition-colors duration-500 peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold">
          <AnimatePresence initial={false}>
            {checked && (
              <motion.svg
                viewBox="0 0 20 20"
                className="h-3.5 w-3.5"
                initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.9, rotate: -18 }}
                animate={{ opacity: 1, scale: 1, rotate: -7 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <path
                  d="M2.5 11 L7.5 16 L17.5 3"
                  fill="none"
                  stroke="#8D2323"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </span>
        <span
          className={`text-[0.88rem] leading-snug transition-colors duration-500 ${
            checked ? 'text-ink/45 line-through decoration-ink/30' : 'text-ink/85'
          }`}
        >
          {label}
        </span>
      </label>
    </li>
  )
}

/**
 * One classified mission. The header is the handle; opening it unfolds the
 * folder — the panel opens downward and the illustration lifts into place.
 */
export function MissionCard({ mission, open, onToggle, checked = [], onCheck }) {
  const reduced = useReducedMotion()
  const Illustration = mission.illustration ? illustrations[mission.illustration] : null
  const panelId = `mission-panel-${mission.id}`
  const headingId = `mission-heading-${mission.id}`

  const handleToggle = () => {
    play('paper')
    onToggle()
  }

  return (
    <motion.article
      className="paper-surface relative overflow-hidden shadow-sheet"
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: DUR.slow, ease: EASE }}
    >
      <PaperGrain opacity={0.05} />
      <PriorityLabel>{mission.priority}</PriorityLabel>

      <h3 id={headingId} className="relative">
        <button
          type="button"
          onClick={handleToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-start justify-between gap-4 px-5 pb-5 pt-4 text-left tap-transparent sm:px-7"
        >
          <span className="min-w-0">
            <span className="block text-[0.6rem] uppercase tracking-[0.22em] text-ink/50">
              Mission {mission.number}
            </span>
            <span className="mt-1.5 block font-slab text-[1.15rem] font-bold uppercase leading-[1.15] text-ink sm:text-[1.4rem]">
              {mission.title}
            </span>
          </span>

          {/* Fold indicator */}
          <motion.span
            aria-hidden="true"
            className="mt-2 shrink-0 text-ink/45"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: DUR.quick, ease: EASE }}
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5">
              <path d="M2 5 L8 11 L14 5" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={headingId}
            variants={folderUnfold}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            className="overflow-hidden"
          >
            <motion.div
              className="border-t border-ink/15 px-5 pb-7 pt-5 sm:px-7"
              initial={reduced ? false : { y: -14 }}
              animate={{ y: 0 }}
              transition={{ duration: DUR.base, ease: EASE }}
            >
              {mission.intro && (
                <p className="text-[0.9rem] leading-[1.8] text-ink/85">{mission.intro}</p>
              )}

              {Illustration && (
                <motion.div
                  className="my-6 flex justify-center"
                  variants={iconLift}
                  initial="initial"
                  animate="animate"
                >
                  <Illustration />
                </motion.div>
              )}

              {mission.emphasis && (
                <p className="mt-4 font-slab text-[0.95rem] font-bold leading-snug text-ink">
                  {mission.emphasis}
                </p>
              )}

              {mission.checklist && (
                <div className="mt-6">
                  <p className="mb-2 text-[0.6rem] uppercase tracking-[0.22em] text-ink/50">
                    {mission.checklistLabel}
                  </p>
                  <ul className="border-t border-ink/12">
                    {mission.checklist.map((item, i) => (
                      <PrayerCheckbox
                        key={item}
                        label={item}
                        checked={Boolean(checked[i])}
                        onToggle={() => onCheck?.(i)}
                      />
                    ))}
                  </ul>
                </div>
              )}

              {mission.steps && (
                <ol className="mt-2 space-y-3">
                  {mission.steps.map((step, i) => (
                    <motion.li
                      key={step}
                      className="flex items-center gap-3 text-[0.9rem] text-ink/85"
                      initial={reduced ? false : { opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: DUR.quick, delay: 0.2 + i * 0.14, ease: EASE }}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-[0.68rem] font-semibold text-paper">
                        {i + 1}
                      </span>
                      {step}
                    </motion.li>
                  ))}
                </ol>
              )}

              {mission.steps && mission.body && (
                <span
                  aria-hidden="true"
                  className="my-5 block border-t border-dashed border-ink/25"
                />
              )}

              {mission.body?.map((line) => (
                <p key={line} className="mt-3 text-[0.9rem] leading-[1.8] text-ink/85">
                  {line}
                </p>
              ))}

              {mission.notes && (
                <div className="mt-2 space-y-2 border border-ink/12 bg-ink/[0.05] px-4 py-3">
                  {mission.notes.map((note) => (
                    <p key={note} className="text-[0.82rem] italic leading-relaxed text-ink/70">
                      {note}
                    </p>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}
