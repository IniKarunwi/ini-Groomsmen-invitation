import { PaperGrain } from './effects/PaperGrain'
import { DustParticles } from './effects/DustParticles'
import { WaxSeal } from './effects/WaxSeal'
import { BrotherhoodRow } from './illustrations'
import { newspaper, wedding } from '../data/invitation'

/**
 * The front page of The Brotherhood Gazette.
 *
 * This is not a screen in the experience — it is the printed artefact the link
 * unfurls into when it is shared. <SocialCard> frames it for capture, and
 * scripts/make-og.mjs turns it into public/og.png.
 */

function ColumnHeading({ children }) {
  return <h2 className="column-heading mb-2 border-b border-ink/70 pb-1 text-ink">{children}</h2>
}

/** The five register bars printed at the top of the sheet. */
function RegisterBars() {
  return (
    <span aria-hidden="true" className="flex items-end gap-[3px]">
      {[9, 12, 8, 12, 9].map((height, i) => (
        <span key={i} className="w-[3px] bg-ink/80" style={{ height }} />
      ))}
    </span>
  )
}

export function NewspaperSheet({ animateGrain = true }) {
  return (
    <div className="relative paper-aged newsprint-lines px-5 pb-14 pt-4 sm:px-10 sm:pb-16 sm:pt-6 lg:px-14">
      <PaperGrain opacity={0.09} animate={animateGrain} />

      <div className="relative mx-auto max-w-broadsheet">
        {/* ---------- Masthead ---------- */}
        <header>
          <div className="flex items-center justify-between text-[0.6rem] font-medium uppercase tracking-[0.2em] text-ink/85">
            <span>{newspaper.established}</span>
            <RegisterBars />
            <span>{newspaper.volume}</span>
          </div>

          <div className="rule-double mt-2" />

          <h1 className="py-3 text-center font-body text-[0.9rem] font-bold uppercase leading-none tracking-[0.34em] text-ink sm:text-[1.35rem] sm:tracking-[0.42em]">
            {newspaper.masthead}
          </h1>

          <div className="rule-double" />

          <div className="flex items-center justify-between py-2 text-[0.62rem] text-ink/80 sm:text-[0.72rem]">
            <span>{wedding.dateLong}</span>
            <span>{newspaper.price}</span>
          </div>

          <div className="rule-thin" />
        </header>

        <p className="kicker py-5 text-center text-[0.58rem] text-ink/70 sm:py-7 sm:text-[0.68rem]">
          {newspaper.kicker}
        </p>

        {/* ---------- Three columns ---------- */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.7fr)_minmax(0,1fr)] lg:gap-0">
          {/* Left column */}
          <div className="border-t border-ink/25 pt-5 lg:border-t-0 lg:border-r lg:border-ink/25 lg:pr-7 lg:pt-0">
            <section>
              <ColumnHeading>Requirements</ColumnHeading>
              <p className="text-[0.84rem] leading-[1.75] text-ink/90">{newspaper.requirements}</p>
            </section>

            <section className="mt-7">
              <ColumnHeading>Inside this issue</ColumnHeading>
              <ul className="space-y-2">
                {newspaper.contents.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-baseline gap-2 text-[0.82rem] text-ink/90"
                  >
                    <span className="whitespace-nowrap">{item.label}</span>
                    <span aria-hidden="true" className="leader-dots flex-1 translate-y-[-0.2em]" />
                    <span className="whitespace-nowrap tabular-nums">{item.page}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Centre column */}
          <div className="lg:px-8">
            <h2 className="headline-press text-center font-slab text-[clamp(3.4rem,15vw,8.5rem)] font-black uppercase leading-[0.84] tracking-[-0.02em] text-ink">
              {newspaper.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>

            <div className="rule-heavy mt-5" />

            <p className="mx-auto mt-5 max-w-xl text-balance text-center font-slab text-[0.98rem] font-bold leading-snug text-ink sm:text-[1.12rem]">
              {newspaper.deck}
            </p>

            {/* Photograph */}
            <figure className="mt-7">
              <div
                className="relative flex h-[190px] items-end justify-center overflow-hidden px-4 pb-8 sm:h-[250px]"
                style={{
                  background: 'linear-gradient(165deg, #2a2521 0%, #1a1613 55%, #221d19 100%)',
                  boxShadow: 'inset 0 0 60px rgba(0,0,0,0.65)',
                }}
              >
                <DustParticles count={10} tone="rgba(246,240,228,0.28)" />
                <BrotherhoodRow count={7} className="h-[60%] w-full max-w-2xl opacity-90" />
                <span
                  aria-hidden="true"
                  className="absolute bottom-6 left-1/2 h-px w-[78%] -translate-x-1/2 bg-paper/12"
                />
              </div>
              <figcaption className="mt-2 text-center text-[0.66rem] leading-relaxed text-ink/65">
                {newspaper.photoCaption}
              </figcaption>
            </figure>

            {/* A printed call, not a control: this page is an artefact */}
            <div className="mt-6 bg-ink px-8 py-4 text-center shadow-[0_2px_0_rgba(20,17,15,0.35)]">
              <span className="font-body text-[0.78rem] font-medium uppercase tracking-[0.3em] text-paper">
                {newspaper.cta}
              </span>
            </div>
          </div>

          {/* Right column */}
          <div className="border-t border-ink/25 pt-5 lg:border-t-0 lg:border-l lg:border-ink/25 lg:pl-7 lg:pt-0">
            <section>
              <ColumnHeading>Duties</ColumnHeading>
              <p className="text-[0.84rem] leading-[1.75] text-ink/90">{newspaper.duties}</p>
            </section>

            <div className="my-7 flex justify-center">
              <WaxSeal
                size={78}
                initial={wedding.initial}
                label={`Seal of ${wedding.groom}`}
                glow={false}
                labelClassName="text-ink/45"
              />
            </div>

            <section>
              <ColumnHeading>From the editor</ColumnHeading>
              <p className="text-[0.84rem] leading-[1.75] text-ink/90">{newspaper.editor}</p>
            </section>
          </div>
        </div>

        {/* ---------- Footer ---------- */}
        <footer className="relative mt-12">
          <div className="rule-double" />
          <div className="flex items-end justify-between gap-4 pt-3">
            <p className="max-w-md text-[0.58rem] uppercase leading-relaxed tracking-[0.18em] text-ink/55">
              {newspaper.footer}
            </p>
            <span
              aria-hidden="true"
              className="shrink-0 -rotate-[7deg] border-2 border-wax/60 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-wax/70 sm:px-4 sm:text-[0.68rem]"
            >
              Confidential
            </span>
          </div>
        </footer>
      </div>
    </div>
  )
}
