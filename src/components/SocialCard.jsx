import { useEffect } from 'react'
import { NewspaperSheet } from './NewspaperSheet'

/**
 * The share card: the front page of the Gazette, framed at 1200×630 and held
 * perfectly still so it can be captured.
 *
 * Visit /og to see exactly what unfurls when the link is posted, and run
 * `npm run og` to render it to public/og.png.
 */
export function SocialCard() {
  useEffect(() => {
    document.title = 'Men Wanted — share card'
  }, [])

  return (
    <div className="flex min-h-[100svh] items-center justify-center bg-ink p-6">
      <div
        id="social-card"
        className="relative shrink-0 overflow-hidden shadow-sheet"
        style={{ width: 1200, height: 630 }}
      >
        {/* The sheet is printed at full width; the card shows the top of it. */}
        <div style={{ width: 1200 }}>
          <NewspaperSheet animateGrain={false} />
        </div>

        {/* The page falling away into shadow, so the crop reads as deliberate */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
          style={{
            background:
              'linear-gradient(180deg, rgba(20,17,15,0) 0%, rgba(20,17,15,0.55) 62%, rgba(20,17,15,0.92) 100%)',
          }}
        />
      </div>
    </div>
  )
}
