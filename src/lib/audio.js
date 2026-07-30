/**
 * Tiny synthesised sound design — no audio files to download, nothing to preload.
 *
 * Every cue is generated with the WebAudio API at low gain: paper movement,
 * an envelope opening, wax cracking, a rubber stamp, a typewriter key.
 * The context is only created on a user gesture, so browser autoplay policies
 * are respected by construction, and everything is silent until the visitor
 * has interacted with the page.
 */

let ctx = null
let master = null
let enabled = true

function context() {
  if (typeof window === 'undefined') return null
  const AudioCtx = window.AudioContext || window.webkitAudioContext
  if (!AudioCtx) return null
  if (!ctx) {
    ctx = new AudioCtx()
    master = ctx.createGain()
    master.gain.value = 0.22
    master.connect(ctx.destination)
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {})
  return ctx
}

/** Call from a real user gesture (a tap) to unlock audio. */
export function unlockAudio() {
  context()
}

export function setAudioEnabled(next) {
  enabled = next
  if (master) master.gain.value = next ? 0.22 : 0
}

export function isAudioEnabled() {
  return enabled
}

function noiseBuffer(ac, seconds) {
  const frames = Math.floor(ac.sampleRate * seconds)
  const buffer = ac.createBuffer(1, frames, ac.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < frames; i += 1) data[i] = Math.random() * 2 - 1
  return buffer
}

function noise(ac, { duration, type = 'bandpass', frequency, q = 0.8, gain = 0.3, attack = 0.01 }) {
  const src = ac.createBufferSource()
  src.buffer = noiseBuffer(ac, duration)
  const filter = ac.createBiquadFilter()
  filter.type = type
  filter.frequency.value = frequency
  filter.Q.value = q
  const amp = ac.createGain()
  const now = ac.currentTime
  amp.gain.setValueAtTime(0.0001, now)
  amp.gain.linearRampToValueAtTime(gain, now + attack)
  amp.gain.exponentialRampToValueAtTime(0.0001, now + duration)
  src.connect(filter).connect(amp).connect(master)
  src.start(now)
  src.stop(now + duration)
}

function tone(ac, { frequency, duration, gain = 0.2, type = 'sine', slideTo }) {
  const osc = ac.createOscillator()
  const amp = ac.createGain()
  const now = ac.currentTime
  osc.type = type
  osc.frequency.setValueAtTime(frequency, now)
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, now + duration)
  amp.gain.setValueAtTime(0.0001, now)
  amp.gain.linearRampToValueAtTime(gain, now + 0.008)
  amp.gain.exponentialRampToValueAtTime(0.0001, now + duration)
  osc.connect(amp).connect(master)
  osc.start(now)
  osc.stop(now + duration)
}

const cues = {
  paper: (ac) => noise(ac, { duration: 0.5, frequency: 2600, q: 0.5, gain: 0.16, attack: 0.12 }),
  fold: (ac) => noise(ac, { duration: 0.7, frequency: 1500, q: 0.4, gain: 0.2, attack: 0.2 }),
  envelope: (ac) => {
    noise(ac, { duration: 0.55, frequency: 3200, q: 0.6, gain: 0.18, attack: 0.15 })
    tone(ac, { frequency: 180, slideTo: 90, duration: 0.35, gain: 0.06 })
  },
  wax: (ac) => {
    noise(ac, { duration: 0.13, frequency: 5200, q: 1.4, gain: 0.34, attack: 0.002 })
    tone(ac, { frequency: 320, slideTo: 120, duration: 0.16, gain: 0.12, type: 'triangle' })
  },
  stamp: (ac) => {
    tone(ac, { frequency: 130, slideTo: 48, duration: 0.28, gain: 0.34, type: 'sine' })
    noise(ac, { duration: 0.2, frequency: 900, q: 0.7, gain: 0.26, attack: 0.002 })
  },
  key: (ac) => {
    noise(ac, { duration: 0.045, frequency: 4200, q: 2, gain: 0.12, attack: 0.001 })
  },
  chime: (ac) => {
    tone(ac, { frequency: 523.25, duration: 0.9, gain: 0.08, type: 'triangle' })
    tone(ac, { frequency: 784, duration: 1.1, gain: 0.05, type: 'triangle' })
  },
}

/** Play a named cue. Silent (and safe) if audio is unavailable or muted. */
export function play(name) {
  if (!enabled) return
  const cue = cues[name]
  if (!cue) return
  try {
    const ac = context()
    if (!ac || ac.state !== 'running') return
    cue(ac)
  } catch {
    /* audio is a garnish — never let it break the experience */
  }
}
