import { motion } from 'framer-motion'
import { Layout } from './Layout'
import { Button } from './Button'
import { wedding } from '../data/invitation'
import { DUR, EASE } from '../lib/motion'

/**
 * An unrecognised name in the URL. Still in character, and never a dead end —
 * the general invitation is one tap away.
 */
export function FileNotFound({ slug }) {
  return (
    <Layout bar={{ left: 'Restricted', right: `File #${wedding.fileRef}` }}>
      <motion.div
        className="mx-auto max-w-md px-6 py-24 text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DUR.slow, ease: EASE }}
      >
        <p className="kicker text-[0.55rem] text-wax/80">No such file</p>

        <h1 className="mt-6 font-display text-3xl font-bold text-paper sm:text-4xl">
          That name is not on the list.
        </h1>

        <p className="mt-6 text-[0.9rem] leading-[1.9] text-paper/60">
          {slug ? (
            <>
              No dossier exists under <span className="text-gold/90">“{slug}”</span>. Check the link
              you were sent — every man has his own.
            </>
          ) : (
            <>Check the link you were sent — every man has his own.</>
          )}
        </p>

        <div className="mt-10">
          <Button variant="outline" size="lg" onClick={() => window.location.assign('/')}>
            Read the general notice
          </Button>
        </div>
      </motion.div>
    </Layout>
  )
}
