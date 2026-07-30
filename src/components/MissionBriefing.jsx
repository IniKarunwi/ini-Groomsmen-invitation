import { useCallback, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Layout } from './Layout'
import { Button } from './Button'
import { MissionCard } from './MissionCard'
import { briefing, missions } from '../data/invitation'
import { usePersistentState } from '../hooks/usePersistentState'
import { DUR, EASE } from '../lib/motion'

const PRAYER_MISSION = missions.find((mission) => mission.checklist)

/** Diagonal hazard tape, drifting almost imperceptibly. */
function HazardTape({ label }) {
  const reduced = useReducedMotion()

  return (
    <div className="relative flex items-center justify-between overflow-hidden">
      <motion.span
        aria-hidden="true"
        className="hazard-tape absolute inset-0"
        animate={reduced ? undefined : { backgroundPositionX: ['0px', '80px'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      />
      {[0, 1].map((i) => (
        <span
          key={i}
          className="relative z-10 my-[3px] bg-ink px-3 py-1.5 font-slab text-[0.55rem] font-bold uppercase tracking-[0.2em] text-gold"
        >
          {label}
        </span>
      ))}
    </div>
  )
}

/**
 * Screen 5 — the mission briefing.
 *
 * Five classified files, each opening independently. The prayer checklist is
 * remembered on this device, so a groomsman can tick points off over time.
 */
export function MissionBriefing({ groomsman, onAdvance }) {
  const storageKey = `ini-brotherhood:prayer:${groomsman.slug || 'guest'}`
  const [checked, setChecked] = usePersistentState(
    storageKey,
    PRAYER_MISSION.checklist.map(() => false),
  )
  const [openIds, setOpenIds] = useState([missions[0].id])

  const toggleMission = useCallback((id) => {
    setOpenIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }, [])

  const toggleCheck = useCallback(
    (index) => {
      setChecked((current) => {
        const next = [...current]
        next[index] = !next[index]
        return next
      })
    },
    [setChecked],
  )

  const completed = checked.filter(Boolean).length

  return (
    <Layout center={false} contentClassName="pb-16" dustCount={10}>
      {/* Briefing header */}
      <motion.header
        className="relative z-20 bg-ink-deep px-5 pb-5 pt-8 text-center sm:pt-10"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DUR.base, ease: EASE }}
      >
        <p className="kicker text-[0.5rem] text-gold/70 sm:text-[0.55rem]">{briefing.agency}</p>
        <h1 className="mt-2 font-display text-[1.75rem] font-bold uppercase tracking-[0.06em] text-paper sm:text-4xl">
          {briefing.title}
        </h1>
        <p className="mt-2 text-[0.62rem] uppercase tracking-[0.2em] text-gold/60">
          {briefing.subtitle}
        </p>
      </motion.header>

      <HazardTape label={briefing.tape} />

      <div className="mx-auto w-full max-w-reading px-4 sm:px-6">
        <motion.p
          className="mx-auto max-w-md py-8 text-center text-[0.88rem] leading-[1.85] text-paper/70"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.slow, delay: 0.3, ease: EASE }}
        >
          {briefing.intro}
        </motion.p>

        <div className="space-y-7">
          {missions.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              open={openIds.includes(mission.id)}
              onToggle={() => toggleMission(mission.id)}
              checked={mission.checklist ? checked : undefined}
              onCheck={mission.checklist ? toggleCheck : undefined}
            />
          ))}
        </div>

        {/* Prayer progress — quiet confirmation that the record is kept */}
        <p className="mt-8 text-center text-[0.6rem] uppercase tracking-[0.2em] text-paper/35">
          Prayer points logged: {completed} / {checked.length}
        </p>

        <div className="mt-10">
          <Button variant="outline" size="lg" full onClick={onAdvance}>
            {briefing.cta}
          </Button>
        </div>

        <p className="kicker mt-10 text-center text-[0.5rem] text-paper/30">{briefing.footer}</p>
      </div>
    </Layout>
  )
}
