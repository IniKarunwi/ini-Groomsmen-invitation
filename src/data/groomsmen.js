/**
 * One record per groomsman. The URL is the slug — /jacob, /michael, /ayo —
 * and only that man's personal letter is ever rendered. Everything else in
 * the experience is identical for all of them.
 *
 * `letter` is an array of paragraphs so the personal letter can reveal
 * calmly, one paragraph at a time.
 */

export const groomsmen = [
  {
    slug: 'jacob',
    name: 'Jacob',
    role: 'Best Man',
    accepted: false,
    letter: [
      'There is no version of this day that makes sense without you standing at my shoulder.',
      'You have seen me at my most uncertain and never once treated it as weakness. You told me the truth when agreement would have been easier, and you stayed long after the conversation stopped being comfortable.',
      'So when I thought about who should stand closest to me — who should hold the ring, and hold the line — the answer never required any thought.',
      'Thank you for years of loyalty I did not have to ask for. On September 26th, I would be honoured to have you beside me as my best man.',
    ],
  },
  {
    slug: 'michael',
    name: 'Michael',
    role: 'Groomsman',
    accepted: false,
    letter: [
      'Some friendships are loud. Ours has been steady — and steady is rarer.',
      'You show up. Quietly, without announcement, in the seasons where showing up costs something. I have never had to wonder where you stood.',
      'A man does not get many days that divide his life into before and after. This is one of them, and I want the men who shaped the before to be standing in the after.',
      'Come stand with me on September 26th. It would mean a great deal.',
    ],
  },
  {
    slug: 'kelvin',
    name: 'Kelvin',
    role: 'Groomsman',
    accepted: false,
    letter: [
      'You have a way of making heavy things bearable without ever making them small.',
      'Half the courage I found this year came from conversations you probably do not remember having. You prayed for me before I knew to ask, and you laughed with me when laughing was the only sensible option.',
      'I am walking into the most significant commitment of my life, and I want men of substance around me when I do.',
      'That is why I am asking you. September 26th — stand with me.',
    ],
  },
  {
    slug: 'ayo',
    name: 'Ayo',
    role: 'Groomsman',
    accepted: false,
    letter: [
      'Brotherhood with you has always felt like the easiest thing in the world, and I have never once taken it for granted.',
      'You carry joy into rooms. You also carry conviction, which is the harder of the two, and you have never traded one for the other.',
      'On the day I make my vows, I want to look to my side and see men who understand exactly what those vows cost and exactly why they are worth it.',
      'Be one of them. September 26th.',
    ],
  },
  {
    slug: 'david',
    name: 'David',
    role: 'Groomsman',
    accepted: false,
    letter: [
      'The man who walks up that aisle is not the man I would have been without your friendship.',
      'You have challenged me, sharpened me, and refused to let me settle for a smaller version of myself. Iron on iron, exactly as it was written.',
      'There is a short list of men I would trust with the details of my life. You have been on it for a long time.',
      'So I am asking formally: stand beside me on September 26th.',
    ],
  },
  {
    slug: 'samuel',
    name: 'Samuel',
    role: 'Groomsman',
    accepted: false,
    letter: [
      'Faithfulness is an unglamorous virtue, and you have more of it than anyone I know.',
      'You have been consistent across years, distances, and seasons where consistency was inconvenient. That is the kind of man I want in the room when I make a lifelong promise.',
      'This invitation is not about a suit or a seating chart. It is my way of telling you that your place in my life is settled and permanent.',
      'September 26th. Come stand with me.',
    ],
  },
  {
    slug: 'tobi',
    name: 'Tobi',
    role: 'Groomsman',
    accepted: false,
    letter: [
      'You have been in my corner long enough to know the parts of this story nobody else does.',
      'You have celebrated wins that were not yours and carried losses that were not either. That is not friendship; that is brotherhood.',
      'As I begin this new chapter, I want the men who held the last one steady to be standing right there in the frame.',
      'Say yes. September 26th.',
    ],
  },
]

/** Shown when the site is opened without a name in the URL. */
export const genericGroomsman = {
  slug: '',
  name: 'The Chosen',
  role: 'Groomsman',
  accepted: false,
  letter: [
    'Whoever is reading this: you were not selected at random, and this page was not sent widely.',
    'Of all the men I know, only a handful were ever going to be asked to stand beside me on this day. You are reading this because you are one of them.',
    'I want men of conviction around me when I make the most serious promise of my life — men who will pray, protect the peace, and celebrate without restraint.',
    'September 26th. Stand with me.',
  ],
}

export function findGroomsman(slug) {
  if (!slug) return genericGroomsman
  const normalised = String(slug).toLowerCase()
  return groomsmen.find((man) => man.slug === normalised) || null
}
