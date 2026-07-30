import { useCallback, useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { LoadingScreen } from './components/LoadingScreen'
import { OpeningLetter } from './components/OpeningLetter'
import { PersonalLetter } from './components/PersonalLetter'
import { Dossier } from './components/Dossier'
import { MissionBriefing } from './components/MissionBriefing'
import { BrotherhoodQuote } from './components/BrotherhoodQuote'
import { Certificate } from './components/Certificate'
import { SoundToggle } from './components/SoundToggle'
import { FileNotFound } from './components/FileNotFound'
import { SocialCard } from './components/SocialCard'
import { findGroomsman, genericGroomsman } from './data/groomsmen'
import { usePersistentState } from './hooks/usePersistentState'

/**
 * The narrative, in order. Each screen hands over to the next.
 *
 * The newspaper front page is not part of this sequence — it is the card that
 * unfurls when the link is shared, and it lives at /og.
 */
const SCENES = [
  'loading', // Men Wanted — tap to continue
  'opening', // the invitation, and the roster of names
  'personal', // his own letter, and his answer
  'dossier', // accepted, and stamped
  'briefing', // the five missions
  'brotherhood', // iron sharpens iron
  'certificate', // commissioned
]

function Experience({ initialGroomsman }) {
  const navigate = useNavigate()
  const [scene, setScene] = useState(SCENES[0])
  const [groomsman, setGroomsman] = useState(initialGroomsman)
  const [, setAccepted] = usePersistentState(
    `ini-brotherhood:accepted:${groomsman.slug || 'guest'}`,
    groomsman.accepted,
  )

  const advance = useCallback(() => {
    setScene((current) => SCENES[Math.min(SCENES.indexOf(current) + 1, SCENES.length - 1)])
  }, [])

  /** A man presses his own name on the roster: from here the file is his. */
  const chooseName = useCallback(
    (man) => {
      setGroomsman(man)
      navigate(`/${man.slug}`, { replace: true })
      advance()
    },
    [advance, navigate],
  )

  const accept = useCallback(() => {
    setAccepted(true)
    advance()
  }, [advance, setAccepted])

  // Someone editing the address bar mid-experience should get that man's file.
  // Choosing from the roster sets the same slug it navigates to, so this never
  // fires for our own navigation — the scene is never interrupted.
  useEffect(() => {
    if (initialGroomsman.slug !== groomsman.slug) setGroomsman(initialGroomsman)
  }, [initialGroomsman, groomsman.slug])

  // Every screen begins at its own top — this is one continuous experience,
  // but each scene is its own page of it.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [scene])

  useEffect(() => {
    document.title = groomsman.slug
      ? `Men Wanted — ${groomsman.name} · The Brotherhood Gazette`
      : 'Men Wanted — The Brotherhood Gazette'
  }, [groomsman])

  const screens = {
    loading: <LoadingScreen key="loading" onAdvance={advance} />,
    opening: (
      <OpeningLetter
        key="opening"
        recipient={groomsman.slug ? groomsman.name : genericGroomsman.name}
        activeSlug={groomsman.slug}
        onSelect={chooseName}
      />
    ),
    personal: <PersonalLetter key="personal" groomsman={groomsman} onAccept={accept} />,
    dossier: <Dossier key="dossier" groomsman={groomsman} onAdvance={advance} />,
    briefing: <MissionBriefing key="briefing" groomsman={groomsman} onAdvance={advance} />,
    brotherhood: <BrotherhoodQuote key="brotherhood" onAdvance={advance} />,
    certificate: (
      <Certificate key="certificate" groomsman={groomsman} onRestart={() => setScene(SCENES[0])} />
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

/** /jacob, /davies, /michael — a deep link straight to one man's file. */
function GroomsmanRoute() {
  const { slug } = useParams()
  const groomsman = useMemo(() => findGroomsman(slug), [slug])

  if (!groomsman) return <FileNotFound slug={slug} />

  // Deliberately unkeyed: pressing a name on the roster rewrites the URL, and
  // remounting here would throw the visitor back to the first screen.
  return <Experience initialGroomsman={groomsman} />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GroomsmanRoute />} />
        {/* The front page, held still so it can be captured as the share card */}
        <Route path="/og" element={<SocialCard />} />
        <Route path="/:slug" element={<GroomsmanRoute />} />
      </Routes>
    </BrowserRouter>
  )
}
