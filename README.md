# Men Wanted — The Brotherhood Gazette

A cinematic, mobile-first groomsmen invitation. One continuous interactive
narrative, no page reloads: the words MEN WANTED type themselves out of the
dark, a wax seal is broken, a man finds his own name on the roster, reads the
letter written for him, accepts, and is stamped, briefed, and commissioned.

Built with **React + Vite**, **Tailwind CSS** and **Framer Motion**.

---

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the build locally
npm run og       # re-render the social card to public/og.jpg
npm run fonts    # re-download the self-hosted typefaces
```

## The journey

| | Screen | What happens |
|---|---|---|
| 1 | **Loading** | MEN WANTED, the brief typed beneath it, tap to continue |
| 2 | **Opening letter** | The sealed envelope, the invitation — and the roster of names |
| 3 | **Personal letter** | His envelope, his letter, his photograph, and his answer |
| 4 | **Dossier** | ACCEPTED comes down on the recruitment notice |
| 5 | **Mission briefing** | Five classified files, including the prayer checklist |
| 6 | **Brotherhood** | Iron sharpens iron |
| 7 | **Certificate** | Commissioned, sealed, signed, downloadable, and into the WhatsApp group |

Both envelopes break their own wax a second and a half after they settle —
pressing the seal simply does it sooner. The certificate carries a download
control that renders the sheet to a PNG at 2× (`Certificate-of-Brotherhood-Jacob.png`);
the renderer is only fetched when someone presses it, and because the fonts and
photographs are all served from this origin the canvas is never tainted.

The front page of the Gazette is **not** a screen — it is the card the link
unfurls into when it is shared. See *The share card* below.

### How a man reaches his own letter

The opening letter ends at a roster of all seven names, and pressing a name is
the only way forward. That press selects him, rewrites the URL to his slug, and
carries his name through the envelope, the letter, the dossier and the
certificate.

Deep links still work if you want to send someone straight in:

```
/jacob   /davies   /kelvin   /ayo
/kola    /gbenga   /michael  /        ← the general invitation
```

An unrecognised slug lands on an in-character "that name is not on the list"
screen rather than a blank page. Because these are client-side routes, the host
must serve `index.html` for every path; configuration for the two common hosts
is committed — `public/_redirects` (Netlify) and `vercel.json` (Vercel).

### Adding or editing a groomsman

Edit `src/data/groomsmen.js`. Each record is self-contained:

```js
{
  slug: 'jacob',            // becomes /jacob, and his place on the roster
  name: 'Jacob',            // envelope, letter, certificate
  role: 'Best Man',         // drives the dossier status and certificate rank
  accepted: false,          // initial state; a real acceptance is stored locally
  photo: '/photos/jacob.jpg',   // the frame beside his letter, and his dossier photo
  photoCaption: 'Lagos, 2019',  // optional line under the frame
  letter: [                 // one string per paragraph; they reveal in sequence
    'It’s amazing how friendships grow in ways you never expect.',
  ],
}
```

`role` is not decoration: the best man's file reads `Official Best Man` while
everyone else's reads `Official Groomsman`.

Everything else — the newspaper copy, the missions, the certificate wording,
the date, the WhatsApp group link — lives in `src/data/invitation.js`.

### Adding the pictures

Each personal letter has a photograph mounted beside it — taped down, a couple
of degrees off square, with a caption plate underneath. Until a picture is
filed the frame shows an empty plate reading "Photograph to follow", so the
layout never shifts when you add one.

1. Drop the image into `public/photos/` (portrait crops suit the 4:5 window)
2. Point `photo` at it — `'/photos/jacob.jpg'` — and optionally set `photoCaption`

The same picture is filed in his dossier on the ACCEPTED screen, so one field
covers both.

On a wide screen the frame sits beside the letter and stays with the reader as
they scroll; on a phone it is mounted below the last paragraph, enclosed with
the letter. Images are lazy-loaded and resolve out of a blur.

## The share card

When the link is posted to WhatsApp, iMessage or anywhere else, it unfurls into
the front page of The Brotherhood Gazette. That page lives at **`/og`** — open
it in a browser to see exactly what people will see — and `npm run og`
screenshots it to `public/og.jpg` at 1200×630.

**Set the domain before sharing.** `og:image` has to be an absolute URL, so
edit `VITE_SITE_URL` in `.env` to the real address and rebuild:

```
VITE_SITE_URL=https://your-domain.com
```

Re-run `npm run og` after changing anything on the front page.

## The motion language

Every animation comes from `src/lib/motion.js` so the whole experience moves the
same way:

- durations sit between **700ms and 1200ms** (`DUR.quick` … `DUR.long`)
- easing is always **easeInOut** (`EASE`) — no springs, no bounce, no overshoot
- movement is physical: paper slides, unfolds and settles; the camera pushes
  forward; layers parallax. Fades are a last resort, never the effect

`prefers-reduced-motion` is honoured everywhere: drifting dust and looping
ambience are dropped, the paper unfold becomes instant, and every screen still
reaches exactly the same readable state.

## Structure

```
src/
  data/
    groomsmen.js      one record per man; the personal letters
    invitation.js     all fixed copy: newspaper, missions, certificate, dates
  lib/
    motion.js         the shared motion language (durations, easing, variants)
    audio.js          synthesised paper/wax/stamp cues — no audio files
  hooks/
    usePersistentState.js   localStorage-backed state (prayer checklist, acceptance)
    useTypewriter.js        character-by-character reveal
  components/
    Layout.jsx        the dark stage, vignette, classified bar, scene choreography
    Button.jsx        one button, five variants, gold-glow hover, pressed depression
    LoadingScreen.jsx screen 1 — typewriter, waveform, tap to continue
    Envelope.jsx      the sealed envelope (screens 2 and 3)
    Letter.jsx        paper that rises, unfolds and then reveals its ink
    OpeningLetter.jsx screen 2 — the invitation and the roster
    NameRoster.jsx    the list of names; pressing one claims the file
    PersonalLetter.jsx screen 3 — his letter, his photograph, his answer
    PhotoFrame.jsx    the taped photograph mounted beside the letter
    Dossier.jsx       screen 4 — the ACCEPTED stamp coming down
    MissionCard.jsx   one classified file; folder-unfold accordion
    MissionBriefing.jsx screen 5 — five missions, prayer checklist
    BrotherhoodQuote.jsx screen 6 — Proverbs 27:17, slow parallax
    Certificate.jsx   screen 7 — commission, seal, signature, WhatsApp
    NewspaperSheet.jsx the Gazette front page (the share card, not a screen)
    SocialCard.jsx    frames the front page at 1200×630 for capture
    Signature.jsx, SoundToggle.jsx, LazyImage.jsx, FileNotFound.jsx
    effects/          WaxSeal, RubberStamp, PaperGrain, DustParticles
    illustrations/    inline SVG: pictogram men, shield, dancers, suit, house
scripts/
  fetch-fonts.py    downloads the typefaces into public/fonts/
  make-og.mjs       renders /og to public/og.jpg
```

## Typography

Cormorant Garamond, Inter, Roboto Slab and JetBrains Mono are **self-hosted**
in `public/fonts/` — the experience never waits on a third party, and the share
card renders in the real typefaces rather than fallback serifs. Only the latin
subset and the weights actually used are shipped (14 files, ~540 KB, fetched
only as the browser needs them). Run `npm run fonts` to re-download.

## Sound

There are no audio files. A handful of cues — paper, an envelope, wax cracking,
a rubber stamp, typewriter keys — are synthesised with the WebAudio API at low
gain in `src/lib/audio.js`. The audio context is created only on a real user
gesture, so autoplay policies are satisfied by construction and the page is
silent until the visitor taps. The control in the bottom-left corner mutes it.

## Progress that is remembered

The prayer checklist in Mission 01 and a man's acceptance are stored in
`localStorage`, namespaced per slug (`ini-brotherhood:prayer:jacob`), so points
can be ticked off over weeks rather than in one sitting.

## Accessibility

- Every interactive element is a real `<button>` or `<a>`, reachable by keyboard
  with a gold focus ring; the roster is a labelled `<nav>`
- The accordion uses `aria-expanded`/`aria-controls` with labelled regions
- The typewriter line is present in full for screen readers via `sr-only`; the
  animated copy is `aria-hidden`
- Decorative texture, dust, seals and stamps are all `aria-hidden`
- Illustrations that carry meaning have `role="img"` and a label
