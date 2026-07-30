# Men Wanted — The Brotherhood Gazette

A cinematic, mobile-first groomsmen invitation. One continuous interactive
narrative, eight scenes, no page reloads: a printed newspaper folds inward into
a loading screen, a wax seal is broken, a recruitment notice is stamped
`ACCEPTED`, five classified missions are briefed, a personal letter is opened,
and a certificate of brotherhood is signed and sealed.

Built with **React + Vite**, **Tailwind CSS** and **Framer Motion**.

---

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the build locally
```

## Personal URLs

Every groomsman has his own path — the slug in the URL selects which letter is
rendered. Everything else in the experience is identical.

```
/jacob      /davies       /kelvin      /ayo
/kola       /gbenga       /michael     /          ← general invitation
```

An unrecognised slug lands on an in-character "that name is not on the list"
screen rather than a blank page.

Because these are client-side routes, the host has to serve `index.html` for
every path. Configuration for the two common hosts is already committed:
`public/_redirects` (Netlify) and `vercel.json` (Vercel). On Apache/nginx, add
the equivalent single-page-app fallback.

### Adding or editing a groomsman

Edit `src/data/groomsmen.js`. Each record is self-contained:

```js
{
  slug: 'jacob',            // becomes /jacob
  name: 'Jacob',            // appears on the envelope, letter and certificate
  role: 'Best Man',         // printed under the signature
  accepted: false,          // initial state; a real acceptance is stored locally
  photo: '/photos/jacob.jpg',   // the frame beside his letter, and his dossier photo
  photoCaption: 'Lagos, 2019',  // optional line under the frame
  letter: [                 // one string per paragraph; they reveal in sequence
    'There is no version of this day that makes sense without you…',
  ],
}
```

### Adding the pictures

Each letter has a photograph mounted beside it — taped down, a couple of degrees
off square, with a caption plate underneath. Until a picture is filed the frame
shows an empty plate reading "Photograph to follow", so the layout never shifts
when you add one.

1. Drop the image into `public/photos/` (portrait crops suit the 4:5 window best)
2. Point `photo` at it — `'/photos/jacob.jpg'` — and optionally set `photoCaption`
3. The photograph beside the **opening** letter is `wedding.photo` in
   `src/data/invitation.js`, with `photoAlt` and `photoCaption` alongside it

On a wide screen the frame sits beside the letter and stays with the reader as
they scroll; on a phone it is mounted below the last paragraph, enclosed with
the letter. Images are lazy-loaded and resolve out of a blur.

`role` is not decoration: it sets the status line on the dossier and the rank on
the certificate, so the best man's file reads `Official Best Man` while everyone
else's reads `Official Groomsman`.

Everything else — the newspaper copy, the missions, the certificate wording,
the date, the WhatsApp group link — lives in `src/data/invitation.js`.

---

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
    Newspaper.jsx     scene 1 — the front page and its centre fold
    LoadingScreen.jsx scene 2 — typewriter, waveform, tap to continue
    Envelope.jsx      the sealed envelope (scenes 3 and 6)
    Letter.jsx        paper that rises, unfolds and then reveals its ink
    PhotoFrame.jsx    the taped photograph mounted beside a letter
    OpeningLetter.jsx scene 3 — the invitation and the question
    Dossier.jsx       scene 4 — the ACCEPTED stamp coming down
    MissionCard.jsx   one classified file; folder-unfold accordion
    MissionBriefing.jsx scene 5 — five missions, prayer checklist
    PersonalLetter.jsx  scene 6 — the letter written for one man
    BrotherhoodQuote.jsx scene 7 — Proverbs 27:17, slow parallax
    Certificate.jsx   scene 8 — commission, seal, signature, WhatsApp
    Signature.jsx, SoundToggle.jsx, LazyImage.jsx, FileNotFound.jsx
    effects/          WaxSeal, RubberStamp, PaperGrain, DustParticles
    illustrations/    inline SVG: pictogram men, shield, dancers, suit, house
```

## The motion language

Every animation in the project comes from `src/lib/motion.js` so the whole
experience moves the same way:

- durations sit between **700ms and 1200ms** (`DUR.quick` … `DUR.long`)
- easing is always **easeInOut** (`EASE`) — no springs, no bounce, no overshoot
- movement is physical: paper folds, slides, unfolds and settles; the camera
  pushes forward; layers parallax. Fades are a last resort, never the effect

`prefers-reduced-motion` is honoured everywhere: drifting dust and looping
ambience are dropped, the newspaper fold and paper unfold become instant, and
every screen still reaches exactly the same readable state.

## Sound

There are no audio files. A handful of cues — paper, an envelope, wax cracking,
a rubber stamp, typewriter keys — are synthesised with the WebAudio API at low
gain in `src/lib/audio.js`. The audio context is created only on a real user
gesture, so autoplay policies are satisfied by construction and the page is
silent until the visitor taps. The control in the bottom-left corner mutes it.

## Progress that is remembered

The prayer checklist in Mission 01 and a groomsman's acceptance are stored in
`localStorage`, namespaced per slug (`ini-brotherhood:prayer:jacob`), so points
can be ticked off over weeks rather than in one sitting.

## Accessibility

- Every interactive element is a real `<button>` or `<a>`, reachable by keyboard
  with a gold focus ring
- The accordion uses `aria-expanded`/`aria-controls` with labelled regions
- The typewriter line is present in full for screen readers via `sr-only`; the
  animated copy is `aria-hidden`
- Decorative texture, dust, seals and stamps are all `aria-hidden`
- Illustrations that carry meaning have `role="img"` and a label

## Images

The illustrations are inline SVG, so there is nothing to download and nothing
to wait for. Any real photograph — for example a groomsman's file photo in the
dossier — goes through `components/LazyImage.jsx`, which defers loading and
resolves the image out of a blur rather than snapping it in.
