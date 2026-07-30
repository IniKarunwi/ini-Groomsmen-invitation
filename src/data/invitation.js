/**
 * All fixed copy for the experience, kept out of the components so the
 * wording can be edited without touching a single animation.
 */

export const wedding = {
  groom: 'Ini',
  initial: 'I',
  dateLong: 'Saturday, September 26, 2026',
  dateShort: 'September 26, 2026',
  monthYear: 'September 2026',
  fileRef: 'INI-2026',
  operation: 'Operation Altar',
  agency: 'Brotherhood Intelligence Agency',
  whatsappUrl: 'https://chat.whatsapp.com/CDKiHgb6fTeCpPQK41L5dK?s=cl&p=i&ilr=0',
  // The photograph mounted beside the opening letter. Drop a file in public/
  // and point at it — e.g. '/photos/ini-and-princess.jpg'. Left empty, the
  // frame shows an empty plate instead of a gap.
  photo: '',
  photoAlt: 'Ini and Princess',
  photoCaption: '',
}

export const newspaper = {
  masthead: 'The Brotherhood Gazette',
  established: 'EST. 2026',
  volume: 'VOL. I, NO. 1',
  price: 'One Penny',
  kicker: 'Special Announcement — Urgent',
  headline: ['MEN', 'WANTED'],
  deck: 'Looking for the men who will stand beside a groom on one of the most important days of his life.',
  requirements:
    'Candidates must be men of proven character, unwavering loyalty, and exceptional brotherhood. Prior experience in standing firm during trials and celebrations is preferred, though not mandatory.',
  contents: [
    { label: 'Mission briefing', page: 'p.3' },
    { label: 'Suit intelligence', page: 'p.4' },
    { label: 'Prayer orders', page: 'p.5' },
    { label: 'Brotherhood', page: 'p.7' },
    { label: 'Final certificate', page: 'p.9' },
  ],
  duties:
    'To honour the groom. To protect the joy of the occasion. To pray without ceasing. To dance as though salary depends on it.',
  editor:
    'In all our years of publication, no call has gone out quite like this one. A man is about to take the most important step of his life. He needs his men.',
  photoCaption:
    'ABOVE: The Brotherhood assembled at a prior engagement. Names withheld for operational security.',
  cta: 'Applications Now Open',
  footer: 'The Brotherhood Gazette · Vol. I · Printed & distributed on behalf of the groom',
}

export const loading = {
  headline: ['MEN', 'WANTED'],
  line: 'Looking for men who stick closer than brothers.',
  reference: 'Proverbs 18:24',
  cta: 'Tap to continue',
}

export const openingLetter = {
  envelopeBand: 'Personal & Confidential',
  recipientLabel: 'To:',
  date: wedding.monthYear,
  heading: 'Welcome.',
  intro:
    'Every man eventually reaches a moment in life when he looks around and asks one question:',
  quote: 'Who are the men I want standing beside me?',
  body: [
    'Scripture says there is a friend who sticks closer than a brother.',
    'When David fled from Saul, faithful men stood beside him through uncertainty, battles, and victory.',
  ],
  bridge: [
    'This invitation is more than asking you to attend my wedding.',
    'It is my way of saying:',
  ],
  pledges: ['I trust you.', 'I respect you.', 'I thank God for your place in my life.'],
  closingBody:
    'Of all the men I know, you are among the few I want standing beside me as I begin this new chapter.',
  question: 'So I have one question…',
  signOff: 'With honour,',
  accept: "Yes, I'd be honoured",
  decline: 'No',
  wrongAnswer: '😂 Wrong answer.',
}

export const dossier = {
  agency: wedding.agency,
  tab: 'Status Report',
  stampLabel: 'Accepted',
  title: 'Official Recruitment Notice',
  panelTitle: 'Official Dossier',
  ref: `REF: ${wedding.fileRef}`,
  // The status carries the man's own rank — "Official Best Man" for the one
  // holding the ring, "Official Groomsman" for everyone else.
  rows: (role = 'Groomsman') => [
    { label: 'Status', value: `Official ${role}` },
    { label: 'Mission', value: 'Stand beside the Groom' },
    { label: 'Mission date', value: wedding.dateShort },
  ],
  ticker: 'OPERATION ALTAR << ALPHA << CONFIRMED >>',
  cta: 'View Mission Briefing',
  authorised: `Authorised by ${wedding.groom}`,
}

export const briefing = {
  agency: wedding.agency,
  title: 'Mission Briefing',
  subtitle: `${wedding.operation} — ${wedding.dateShort}`,
  tape: 'Top Secret',
  intro:
    'The following operations are classified. Each groomsman is expected to carry out their assignment with excellence, honour, and dedication.',
  footer: `${wedding.operation} — Classified`,
  cta: 'Continue',
}

export const missions = [
  {
    id: 'pray',
    number: '01',
    priority: 'Priority: Alpha',
    title: 'Pray',
    illustration: null,
    intro:
      'Your first and most vital assignment is prayer. Cover the groom and this marriage in intercession.',
    checklistLabel: 'Prayer points:',
    checklist: [
      'For our marriage',
      'For provision',
      'For our families',
      'For unity',
      'For our honeymoon',
      'For our apartment',
      'For our careers',
      'For our future children',
    ],
  },
  {
    id: 'peace',
    number: '02',
    priority: 'Priority: High',
    title: 'Protect Our Peace',
    illustration: 'shield',
    intro: 'Your assignment is simple.',
    emphasis: 'Protect the joy of the bride and groom.',
    body: ['Handle distractions before they reach us.'],
  },
  {
    id: 'dance',
    number: '03',
    priority: 'Mandatory',
    title: 'Dance Like Your Salary Depends On It',
    illustration: 'dance',
    notes: [
      'Note: Standing around looking important is strictly prohibited.',
      'If you do not know how to dance, kindly register for classes immediately.',
    ],
  },
  {
    id: 'suit',
    number: '04',
    priority: 'Intel Pending',
    title: 'Suit Up',
    illustration: 'suit',
    notes: ['Suit colour is still classified. Stand by for further intelligence.'],
  },
  {
    id: 'home',
    number: '05',
    priority: 'Priority: Alpha',
    title: 'Pray Over Our Home',
    illustration: 'house',
    steps: ['Before the wedding.', 'During the wedding.', 'After the wedding.'],
    body: ['Gather together and pray over our marriage and our home.'],
  },
]

export const brotherhood = {
  kicker: 'File Note — Brotherhood',
  quote: ['Iron sharpens iron.', 'One man sharpens another.'],
  reference: 'Proverbs 27:17',
  closing:
    'This is what I am asking you into. Not a role for one afternoon — a brotherhood for the years after it.',
  cta: 'Continue',
}

export const certificate = {
  kicker: 'Recruitment Complete',
  agency: wedding.agency,
  title: 'Certificate of Brotherhood',
  citation: 'has been formally commissioned as an',
  rank: (role = 'Groomsman') => `Official ${role}`,
  operationLabel: 'Operation',
  dateLabel: 'Date of Commission',
  clause:
    'Sworn to pray without ceasing, to protect the peace, to suit up with distinction, and to dance as though salary depends upon it.',
  signatureLabel: 'The Groom',
  cta: 'Join the Brotherhood on WhatsApp',
  welcome: 'Welcome, brother.',
  welcomeNote: 'The group is expecting you. Further intelligence will follow.',
}
