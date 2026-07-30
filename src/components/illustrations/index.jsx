import { memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '../../lib/motion'

/* ------------------------------------------------------------------ */
/* Pictogram man — the silhouette used in the newspaper photograph     */
/* ------------------------------------------------------------------ */

function Figure({ fill = 'currentColor', pose = {} }) {
  const { leftArm = 0, rightArm = 0, tilt = 0, stance = 0 } = pose
  return (
    <g transform={`rotate(${tilt} 12 30)`} fill={fill}>
      <circle cx="12" cy="8" r="6" />
      <rect x="6" y="16" width="12" height="21" rx="1.5" />
      <g transform={`rotate(${leftArm} 4 18)`}>
        <rect x="1.6" y="17" width="4.2" height="17" rx="1.8" />
      </g>
      <g transform={`rotate(${rightArm} 20 18)`}>
        <rect x="18.2" y="17" width="4.2" height="17" rx="1.8" />
      </g>
      <g transform={`rotate(${-stance} 9 38)`}>
        <rect x="6.9" y="37" width="4.2" height="22" rx="1.6" />
      </g>
      <g transform={`rotate(${stance} 15 38)`}>
        <rect x="12.9" y="37" width="4.2" height="22" rx="1.6" />
      </g>
    </g>
  )
}

/** The row of assembled brothers in the newspaper's photograph. */
function BrotherhoodRowBase({ count = 7, className = '' }) {
  const reduced = useReducedMotion()
  const width = count * 34

  return (
    <svg
      viewBox={`0 0 ${width} 62`}
      className={className}
      role="img"
      aria-label={`Silhouettes of ${count} men standing shoulder to shoulder`}
    >
      {/* The static translate lives on a plain <g>: framer-motion writes its own
          transform attribute, which would otherwise wipe out the positioning. */}
      {Array.from({ length: count }, (_, i) => (
        <g key={i} transform={`translate(${i * 34 + 5} 1)`}>
          <motion.g
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12 * i, ease: EASE }}
          >
            <Figure fill="rgba(246,240,228,0.16)" />
          </motion.g>
        </g>
      ))}
    </svg>
  )
}

export const BrotherhoodRow = memo(BrotherhoodRowBase)

/* ------------------------------------------------------------------ */
/* Mission illustrations                                              */
/* ------------------------------------------------------------------ */

const GOLD = '#B08A2E'

function ShieldIllustration({ initial = 'I' }) {
  return (
    <svg viewBox="0 0 64 74" className="h-20 w-auto" role="img" aria-label="A shield bearing the groom's initial">
      <path
        d="M32 3 L59 13 V38 C59 54 46 66 32 71 C18 66 5 54 5 38 V13 Z"
        fill="rgba(176,138,46,0.08)"
        stroke={GOLD}
        strokeWidth="2.6"
      />
      <text
        x="32"
        y="46"
        textAnchor="middle"
        fill={GOLD}
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="30"
        fontWeight="600"
      >
        {initial}
      </text>
    </svg>
  )
}

function DanceIllustration() {
  const reduced = useReducedMotion()
  const dancers = [
    { x: 2, pose: { leftArm: -128, rightArm: 24, tilt: -8, stance: 12 } },
    { x: 36, pose: { leftArm: 34, rightArm: -142, tilt: 6, stance: 18 } },
    { x: 70, pose: { leftArm: -150, rightArm: -32, tilt: -4, stance: 9 } },
  ]

  return (
    <svg viewBox="0 0 96 64" className="h-20 w-auto" role="img" aria-label="Three figures dancing">
      {dancers.map((dancer, i) => (
        <g key={dancer.x} transform={`translate(${dancer.x} 2) scale(0.95)`}>
          <motion.g
            animate={reduced ? undefined : { y: [0, -2.5, 0], rotate: [0, i % 2 ? 2 : -2, 0] }}
            transition={{ duration: 2.6 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '12px 58px' }}
          >
            <Figure fill="rgba(20,17,15,0.34)" pose={dancer.pose} />
          </motion.g>
        </g>
      ))}
    </svg>
  )
}

function SuitIllustration() {
  return (
    <svg viewBox="0 0 72 82" className="h-20 w-auto" role="img" aria-label="A suit jacket">
      {/* jacket body */}
      <path
        d="M22 8 L36 16 L50 8 L64 16 V76 H44 L36 40 L28 76 H8 V16 Z"
        fill="rgba(20,17,15,0.07)"
        stroke="rgba(20,17,15,0.4)"
        strokeWidth="2"
      />
      {/* lapels */}
      <path d="M22 8 L36 16 L30 44 Z" fill="rgba(176,138,46,0.22)" stroke={GOLD} strokeWidth="1.8" />
      <path d="M50 8 L36 16 L42 44 Z" fill="rgba(176,138,46,0.22)" stroke={GOLD} strokeWidth="1.8" />
      {/* tie */}
      <path d="M36 17 L40 24 L37 44 L35 44 L32 24 Z" fill={GOLD} />
      {/* pocket squares */}
      <rect x="12" y="24" width="7" height="5" fill="rgba(176,138,46,0.6)" />
      <rect x="53" y="24" width="7" height="5" fill="rgba(176,138,46,0.6)" />
    </svg>
  )
}

function HouseIllustration() {
  return (
    <svg viewBox="0 0 84 74" className="h-20 w-auto" role="img" aria-label="A home under a cross">
      {/* cross above the roof */}
      <path d="M42 2 V14 M36 7 H48" stroke={GOLD} strokeWidth="2.4" strokeLinecap="square" />
      {/* roof */}
      <path
        d="M6 34 L42 12 L78 34 Z"
        fill="rgba(176,138,46,0.16)"
        stroke={GOLD}
        strokeWidth="2.4"
      />
      {/* walls */}
      <path
        d="M14 34 H70 V70 H14 Z"
        fill="rgba(176,138,46,0.07)"
        stroke={GOLD}
        strokeWidth="2.4"
      />
      {/* door */}
      <path d="M32 70 V48 H46 V70" fill="rgba(176,138,46,0.2)" stroke={GOLD} strokeWidth="2" />
      {/* window */}
      <rect x="54" y="44" width="10" height="10" fill="none" stroke={GOLD} strokeWidth="1.8" />
      <rect x="20" y="44" width="10" height="10" fill="none" stroke={GOLD} strokeWidth="1.8" />
    </svg>
  )
}

/** Mission illustrations, keyed by the `illustration` field in the data. */
export const illustrations = {
  shield: ShieldIllustration,
  dance: DanceIllustration,
  suit: SuitIllustration,
  house: HouseIllustration,
}
