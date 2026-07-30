/**
 * One record per groomsman. The URL is the slug — /jacob, /davies, /michael —
 * and only that man's personal letter is ever rendered. Everything else in
 * the experience is identical for all of them.
 *
 * `letter` is an array of paragraphs so the personal letter can reveal
 * calmly, one paragraph at a time. The greeting ("Jacob,") and the sign-off
 * are rendered by the letter itself, so they are not repeated here.
 *
 * `photo` is the picture mounted in the frame beside his letter (and in his
 * dossier). Drop a file in public/ and point at it — '/photos/jacob.jpg'.
 * Left empty, the frame shows an empty plate rather than a gap.
 */

export const groomsmen = [
  {
    slug: 'jacob',
    name: 'Jacob',
    role: 'Best Man',
    accepted: false,
    photo: '',
    photoCaption: '',
    letter: [
      'It’s amazing how friendships grow in ways you never expect.',
      'I still remember one of our earliest conversations. You were asking why I served so hard in Passages, and I don’t think either of us imagined that years later we’d become the kind of friends we are today.',
      'You’ve walked with me through difficult seasons. I remember calling you after my breakup, and you didn’t just listen, you gave me wisdom that genuinely helped me navigate that season. Beyond those moments, we’ve shared countless memories together: movie nights, games, random conversations, laughter, and the kind of friendship that quietly becomes part of your life.',
      'I admire the man God has made you. You’re a husband, a man of wisdom, a faithful servant of God, and someone whose influence continues to reach people far beyond your immediate circle. But beyond everything you’ve accomplished, I’m grateful for who you’ve been to me.',
      'You have earned a place in my life that I don’t take lightly.',
      'As I thought about the men I wanted standing beside me on one of the most important days of my life, your name was never a question.',
      'It would be an incredible honour to have you by my side as I begin this new chapter with Princess.',
      'Thank you for accepting to stand with me.',
    ],
  },
  {
    slug: 'davies',
    name: 'Davies',
    role: 'Groomsman',
    accepted: false,
    photo: '',
    photoCaption: '',
    letter: [
      'I don’t think we’ve known each other long enough for people to keep calling us twins… yet somehow they still do.',
      'I still remember when you came back from Lagos carrying yourself like one deeply spiritual pastor. I honestly wondered, “Who exactly is this guy?” Little did I know that we’d end up becoming such close friends.',
      'Since then, we’ve shared more laughs than I can count. Our banter never ends, and somehow we always find something to tease each other about. But beyond the jokes, you’ve consistently shown yourself to be a dependable friend.',
      'One thing I’ll never forget is how we both walked through emotionally difficult seasons around the same time in 2024. We understood each other’s pain in ways few people could, and you’ve always been willing to check in, offer advice, encourage me, and simply be present.',
      'Watching the way you serve God has also challenged me. The excellence, consistency, and humility you bring to ministry remind me that God entrusts great gifts to faithful people.',
      'You’re one of those people.',
      'As I prepare to marry Princess, I can’t imagine this moment without you standing beside me.',
      'Thank you for accepting to stand with me.',
    ],
  },
  {
    slug: 'kelvin',
    name: 'Kelvin',
    role: 'Groomsman',
    accepted: false,
    photo: '',
    photoCaption: '',
    letter: [
      'My guy.',
      'It’s been a long journey, hasn’t it?',
      'Out of everyone standing beside me, you’re one of the friends who has known me the longest. From our days in Ibadan to all the random check-ins over the years, you’ve been a constant.',
      'You know my story. You know my highs, my failures, my relationships, and my dreams. There really isn’t much about my life that you’ve not seen.',
      'Scripture talks about a friend who sticks closer than a brother. You’ve lived that verse in my life more times than you probably realize.',
      'I’m still amazed that something as simple as conversations after service at New Covenant Church, Onireke, eventually became years of friendship through that group you created. Time has passed, but you’ve remained consistent.',
      'Watching you grow in your career, your marriage, and your walk with God has been inspiring. You’ve become the kind of man any friend would be proud to have in his corner.',
      'I also know that coming all the way to Abuja isn’t a small commitment. It costs time, money, and energy, and that makes your presence even more meaningful to me.',
      'Having you beside me on this day would mean more than I can properly put into words.',
      'Thank you for accepting to stand with me.',
    ],
  },
  {
    slug: 'ayo',
    name: 'Ayo',
    role: 'Groomsman',
    accepted: false,
    photo: '',
    photoCaption: '',
    letter: [
      'Bro…',
      'You probably don’t realize just how much you’ve shaped the direction of my life.',
      'I still remember you reaching out to me back in 2020, asking if I could help with project management. It seemed like a simple opportunity at the time, but looking back, that conversation completely changed my career.',
      'The work I do today, the opportunities I’ve had, and even the ability to provide for the family I’m about to build can all be traced back, in one way or another, to that moment.',
      'That’s something I’ll never forget.',
      'It’s been amazing watching both of us grow into co-founders, chasing visions that once only existed as ideas. I’ve always admired the way you think, the way you lead, and the clarity with which you pursue what God has placed before you.',
      'You’ve been more than a business connection. You’ve been someone I’ve looked to for wisdom, direction, and encouragement. Even recently, our conversations about potentially working together again reminded me how much I value your perspective.',
      'You’re genuinely my brother.',
      'When I pictured my wedding day, I knew I wanted the men who helped shape my life standing beside me.',
      'You are one of those men.',
      'It would mean the world to have you there.',
      'Thank you for accepting to stand with me.',
    ],
  },
  {
    slug: 'kola',
    name: 'Kola',
    role: 'Groomsman',
    accepted: false,
    photo: '',
    photoCaption: '',
    letter: [
      'It’s funny that I’m writing this just a day after you decided to pay for my after-party jacket.',
      'Honestly… that’s just who you are.',
      'God has blessed you with incredible gifts and opportunities, yet none of it has ever changed your heart. You’re generous without making a show of it. You show up without being asked. You give because that’s simply who you are.',
      'I’ve leaned on you during moments when I needed a friend, someone to gist with, watch movies with, laugh with, or simply work beside late into the night. Whenever I’ve needed somewhere to work or somewhere to breathe, you’ve always been one of the first people that came to mind.',
      'Not just because you live nearby.',
      'But because I know I’ll always be welcomed.',
      'You’re the kind of man every other man needs in his life. Dependable. Generous. Steady. Present.',
      'I’m incredibly grateful that you’re that man for me.',
      'As I prepare to marry Princess, I honestly can’t imagine celebrating this day without you standing beside me.',
      'It would be one of the greatest honours to have you as one of my groomsmen.',
      'Thank you for accepting to stand with me.',
    ],
  },
  {
    slug: 'gbenga',
    name: 'Gbenga',
    role: 'Groomsman',
    accepted: false,
    photo: '',
    photoCaption: '',
    letter: [
      'You’ve become one of those people I genuinely thank God for.',
      'Every time I hear you share your story, I’m reminded that God has been intentionally shaping your life for something significant. I have no doubt He’s taking you to places far greater than either of us can currently imagine.',
      'It’s been amazing watching our friendship grow from that very first conversation about operations and ministry at church. Looking back now, it almost feels like God intentionally brought our paths together.',
      'You’ve played such a practical role in this season of my life. You’ve pushed me in the gym to get wedding-ready, connected me with people who could help with my outfits, encouraged me, challenged me, and consistently spoken life over me.',
      'Sometimes when I hear the way you talk about me, I honestly wonder if we’re talking about the same person.',
      'That’s just who you are.',
      'You see people through eyes of encouragement.',
      'You’re the kind of brother every man hopes to have beside him.',
      'As I step into marriage, I’d love for you to continue being part of this journey.',
      'Let’s write this chapter together.',
      'Thank you for accepting to stand with me.',
    ],
  },
  {
    slug: 'michael',
    name: 'Michael',
    role: 'Groomsman',
    accepted: false,
    photo: '',
    photoCaption: '',
    letter: [
      'Pastor.',
      'Brother.',
      'Husband.',
      'Coworker.',
      'Fellow laborer in ministry.',
      'It’s amazing how many parts of life we’ve ended up sharing together.',
      'I still remember when Yinka encouraged me to reach out to you while I was looking for a church in Abuja. We started talking, eventually met in person, and almost immediately people began saying we looked alike.',
      'Apparently, even your own people noticed.',
      'I’ll gladly take that compliment.',
      'Over the years you’ve become far more than someone I attend church with. You’ve become a trusted friend, a brother, and one of the pastors God has used to shape my life.',
      'One of the greatest privileges I’ve had was standing with you on your wedding day.',
      'Now, by God’s grace, it’s my turn.',
      'As I prepare to marry Princess, there are few people whose prayers, wisdom, and presence mean as much to me as yours.',
      'I’d be deeply honoured if you stood beside me once again, this time as one of my groomsmen.',
      'Just as I celebrated one of the greatest days of your life, I hope you’ll help me celebrate mine.',
      'Thank you for accepting to stand with me.',
    ],
  },
]

/** Shown when the site is opened without a name in the URL. */
export const genericGroomsman = {
  slug: '',
  name: 'The Chosen',
  role: 'Groomsman',
  accepted: false,
  photo: '',
  photoCaption: '',
  letter: [
    'Whoever is reading this: you were not selected at random, and this page was not sent widely.',
    'Of all the men I know, only a handful were ever going to be asked to stand beside me on this day. You are reading this because you are one of them.',
    'I want men of conviction around me when I make the most serious promise of my life — men who will pray, protect the peace, and celebrate without restraint.',
    'As I prepare to marry Princess, I would be honoured to have you standing with me. September 26th.',
  ],
}

export function findGroomsman(slug) {
  if (!slug) return genericGroomsman
  const normalised = String(slug).toLowerCase()
  return groomsmen.find((man) => man.slug === normalised) || null
}
