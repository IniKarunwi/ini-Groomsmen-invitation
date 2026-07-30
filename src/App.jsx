import { useCallback, useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Newspaper } from './components/Newspaper'
import { LoadingScreen } from './components/LoadingScreen'
import { OpeningLetter } from './components/OpeningLetter'
import { Dossier } from './components/Dossier'
import { MissionBriefing } from './components/MissionBriefing'
import { PersonalLetter } from './components/PersonalLetter'
import { BrotherhoodQuote } from './components/BrotherhoodQuote'
import { Certificate } from './components/Certificate'
import { SoundToggle } from './components/SoundToggle'
import { FileNotFound } from './components/FileNotFound'
import { findGroomsman } from './data/groomsmen'
import { usePersistentState } from './hooks/usePersistentState'

/** The narrative, in order. Each screen hands over to the next. */
const SCENES = [
  'newspaper',
  'loading',
  'opening',
  'dossier',
  'briefing',
  'personal',
  'brotherhood',
  'certificate',
]

function Experience({ groomsman }) {
  const [scene, setScene] = useState(SCENES[0])
  const [, setAccepted] = usePersistentState(
    `ini-brotherhood:accepted:${groomsman.slug || 'guest'}`,
    groomsman.accepted,
  )

  const go = useCallback((next) => setScene(next), [])

  const advance = useCallback(() => {
    setScene((current) => SCENES[Math.min(SCENES.indexOf(current) + 1, SCENES.length - 1)])
  }, [])

  const accept = useCallback(() => {
    setAccepted(true)
    advance()
  }, [advance, setAccepted])

  // Every screen begins at its own top — this is one continuous experience,
  // but each scene is its own page of it.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [scene])

  useEffect(() => {
    document.title =
      groomsman.slug
        ? `Men Wanted — ${groomsman.name} · The Brotherhood Gazette`
        : 'Men Wanted — The Brotherhood Gazette'
  }, [groomsman])

  const screens = {
    newspaper: <Newspaper key="newspaper" onAdvance={advance} />,
    loading: <LoadingScreen key="loading" onAdvance={advance} />,
    opening: <OpeningLetter key="opening" recipient={groomsman.name} onAccept={accept} />,
    dossier: <Dossier key="dossier" groomsman={groomsman} onAdvance={advance} />,
    briefing: <MissionBriefing key="briefing" groomsman={groomsman} onAdvance={advance} />,
    personal: <PersonalLetter key="personal" groomsman={groomsman} onAdvance={advance} />,
    brotherhood: <BrotherhoodQuote key="brotherhood" onAdvance={advance} />,
    certificate: (
      <Certificate key="certificate" groomsman={groomsman} onRestart={() => go(SCENES[0])} />
    ),
  }

  return (
    <>
      {/* mode="wait" keeps the transitions sequential: one page leaves, the next arrives */}
      <AnimatePresence mode="wait">{screens[scene]}</AnimatePresence>
      <SoundToggle />
    </>
  )
}

/** /jacob, /michael, /ayo — one file per man. */
function GroomsmanRoute() {
  const { slug } = useParams()
  const groomsman = useMemo(() => findGroomsman(slug), [slug])

  if (!groomsman) return <FileNotFound slug={slug} />

  return <Experience groomsman={groomsman} />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GroomsmanRoute />} />
        <Route path="/:slug" element={<GroomsmanRoute />} />
      </Routes>
    </BrowserRouter>
  )
}
