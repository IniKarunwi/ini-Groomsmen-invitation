import { motion, useReducedMotion } from 'framer-motion'
import { LazyImage } from './LazyImage'
import { PaperGrain } from './effects/PaperGrain'
import { wedding } from '../data/invitation'
import { DUR, EASE } from '../lib/motion'

/** Two strips of paper tape holding the mount to the page. */
function Tape({ side }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute top-0 h-6 w-16 ${
        side === 'left' ? '-left-3 -rotate-[24deg]' : '-right-3 rotate-[24deg]'
      }`}
      style={{
        background:
          'linear-gradient(180deg, rgba(246,240,228,0.5) 0%, rgba(216,205,178,0.42) 100%)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.35)',
      }}
    />
  )
}

/** The empty window, waiting for a photograph to be filed. */
function PendingPlate() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-ink/[0.06] px-4 text-center">
      <svg viewBox="0 0 48 40" aria-hidden="true" className="h-9 w-9 text-ink/25">
        <rect x="1.5" y="7" width="45" height="31" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M15 7 L19 1.5 H29 L33 7" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="23" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="23" r="3.5" fill="currentColor" opacity="0.5" />
      </svg>
      <span className="kicker text-[0.5rem] text-ink/40">Photograph to follow</span>
    </div>
  )
}

/**
 * A photograph mounted beside a letter: taped down, hanging a degree or two off
 * square, with a caption ruled underneath. Until a picture is filed it shows an
 * empty plate rather than a gap, so the layout is the same either way.
 *
 * Straightens itself when you hover or focus it — the one moment of play in the
 * whole experience, and a slow one.
 */
export function PhotoFrame({
  src,
  alt,
  caption,
  position = '50% 45%',
  label = `File #${wedding.fileRef}`,
  tilt = -1.8,
  delay = 0,
  className = '',
}) {
  const reduced = useReducedMotion()

  return (
    <motion.figure
      className={`relative mx-auto w-full max-w-[15rem] sm:max-w-[16rem] ${className}`}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 42, rotate: tilt - 3 }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, rotate: tilt }}
      whileHover={reduced ? undefined : { rotate: 0, y: -5 }}
      whileFocus={reduced ? undefined : { rotate: 0, y: -5 }}
      transition={{ duration: DUR.slow, delay, ease: EASE }}
      tabIndex={-1}
    >
      <Tape side="left" />
      <Tape side="right" />

      <div className="paper-aged relative overflow-hidden px-3 pb-3 pt-5 shadow-sheet">
        <PaperGrain opacity={0.07} />

        {/* The window */}
        <div className="relative aspect-[4/5] w-full border border-ink/25 bg-paper-shadow">
          {src ? (
            <LazyImage
              src={src}
              alt={alt}
              wrapperClassName="absolute inset-0 h-full w-full"
              className="h-full w-full object-cover"
              style={{ objectPosition: position }}
            />
          ) : (
            <PendingPlate />
          )}

          {/* Photographic corners */}
          {['top-0 left-0', 'top-0 right-0 rotate-90', 'bottom-0 right-0 rotate-180', 'bottom-0 left-0 -rotate-90'].map(
            (position) => (
              <span
                key={position}
                aria-hidden="true"
                className={`absolute h-4 w-4 border-l border-t border-ink/30 ${position}`}
              />
            ),
          )}
        </div>

        {/* Caption plate */}
        <figcaption className="mt-3 border-t border-ink/15 pt-2 text-center">
          {caption ? (
            <span className="block font-display text-[0.82rem] italic leading-snug text-ink/70">
              {caption}
            </span>
          ) : (
            <span className="block h-[1.1rem]" aria-hidden="true" />
          )}
          <span className="kicker mt-1 block text-[0.45rem] text-ink/35">{label}</span>
        </figcaption>
      </div>
    </motion.figure>
  )
}
