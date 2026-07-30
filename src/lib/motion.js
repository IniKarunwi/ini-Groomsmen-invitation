/**
 * Shared motion language.
 *
 * Rules that hold everywhere in this experience:
 *  - durations live between 700ms and 1200ms
 *  - easing is easeInOut (no springs, no bounce, no overshoot)
 *  - movement is physical: paper slides, folds, and settles — it rarely just fades
 */

export const EASE = [0.4, 0, 0.2, 1]

export const DUR = {
  quick: 0.7,
  base: 0.9,
  slow: 1.1,
  long: 1.2,
}

const t = (duration = DUR.base, delay = 0) => ({ duration, delay, ease: EASE })

/** A screen entering the narrative: lifts into place from below with depth. */
export const screenEnter = {
  initial: { opacity: 0, y: 48, scale: 0.985, filter: 'blur(6px)' },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: t(DUR.slow),
  },
  exit: {
    opacity: 0,
    y: -32,
    scale: 1.015,
    filter: 'blur(8px)',
    transition: t(DUR.quick),
  },
}

/** The camera pushing forward into the next scene. */
export const cameraPush = {
  initial: { opacity: 0, scale: 1.14, filter: 'blur(10px)' },
  animate: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: t(DUR.long) },
  exit: { opacity: 0, scale: 1.3, filter: 'blur(14px)', transition: t(DUR.base) },
}

/** Sequential paragraph reveal — paragraph by paragraph, never word by word. */
export const proseStagger = (stagger = 0.32, delayChildren = 0.2) => ({
  animate: {
    transition: { staggerChildren: stagger, delayChildren },
  },
})

export const proseLine = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: t(DUR.quick) },
}

/** Small ornament / icon lifting into view under its heading. */
export const iconLift = {
  initial: { opacity: 0, y: 22, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1, transition: t(DUR.quick, 0.15) },
}

/** Folder unfolding: height opens while contents slide down into the fold. */
export const folderUnfold = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: { height: t(DUR.quick), opacity: t(0.45) },
  },
  open: {
    height: 'auto',
    opacity: 1,
    transition: { height: t(DUR.base), opacity: t(DUR.quick, 0.1) },
  },
}
