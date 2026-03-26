import type { LoadingMessage } from './types'

const messages: LoadingMessage[] = [
  // Robot sounds (~15%)
  { id: 'r1', text: 'beep boop bop boop', category: 'robot_sounds' },
  { id: 'r2', text: 'bzzzt... whirrrr...', category: 'robot_sounds' },
  { id: 'r3', text: '*robot noises*', category: 'robot_sounds' },
  { id: 'r4', text: 'beep boop... processing...', category: 'robot_sounds' },
  { id: 'r5', text: 'brrrring up the files...', category: 'robot_sounds' },
  { id: 'r6', text: 'boop boop beep \u{1F916}', category: 'robot_sounds' },
  { id: 'r7', text: '*dial-up modem sounds*', category: 'robot_sounds' },

  // Fun facts (~35%)
  { id: 'f1', text: "While I get that... did you know Jay is in the top 0.5% of Spotify listeners for Carly Rae Jepsen? She must be really good.", category: 'fun_facts' },
  { id: 'f2', text: "One sec... fun fact: Jay knows how to saddle and ride a horse.", category: 'fun_facts' },
  { id: 'f3', text: "Pulling that up... did you know Jay can sing along to every Carly Rae Jepsen song?", category: 'fun_facts' },

  // UX principles (~25%)
  { id: 'u1', text: "While I get that... did you know one of Jay's favorite UX principles is Tesler's Law? It says complexity can't be removed, only moved \u2014 and the designer's job is to carry it so the user doesn't have to.", category: 'ux_principles' },
  { id: 'u2', text: "One sec... fun fact: Jay talks about Hick's Law a lot. More choices = longer decisions. He's a big fan of removing options that don't earn their place.", category: 'ux_principles' },
  { id: 'u3', text: "Pulling that up... did you know Jay thinks about the Aesthetic-Usability Effect on every project? People perceive attractive designs as easier to use, even when they're not.", category: 'ux_principles' },
  { id: 'u4', text: "Grabbing that... Jay's a firm believer in Jakob's Law \u2014 users spend most of their time on other sites, so your product should work like they already expect.", category: 'ux_principles' },
  { id: 'u5', text: "While I look that up... one of Jay's design principles is progressive disclosure. Show people only what they need right now. Everything else can wait.", category: 'ux_principles' },
  { id: 'u6', text: "Hang on... did you know Jay references the Peak-End Rule when designing flows? People judge an experience by its most intense moment and its ending \u2014 not the average.", category: 'ux_principles' },
  { id: 'u7', text: "One moment... Jay says the best design systems are boring. If your component library is exciting, something probably went wrong.", category: 'ux_principles' },
  { id: 'u8', text: "Getting that for you... Jay likes to say that whitespace isn't empty \u2014 it's the thing that gives everything else room to breathe.", category: 'ux_principles' },
  { id: 'u9', text: "Just a sec... one of Jay's rules: if you need a label to explain an icon, just use the label.", category: 'ux_principles' },

  // Fake-outs (~25%)
  { id: 'j1', text: "Did you know Jay survived an avalanche?! ...Okay I made that up. But he did break his arm snowboarding once.", category: 'fake_outs' },
  { id: 'j2', text: "While I look that up... Jay used to be able to do a standing backflip. He says he still can, but I've never seen him do it.", category: 'fake_outs' },
  { id: 'j3', text: "One sec... Jay says he's a great cook. I can't taste food, so I'll take his word for it.", category: 'fake_outs' },
]

/** Category weights for random selection. */
const CATEGORY_WEIGHTS: Record<LoadingMessage['category'], number> = {
  robot_sounds: 0.15,
  fun_facts: 0.35,
  ux_principles: 0.25,
  fake_outs: 0.25,
}

const categories = Object.keys(CATEGORY_WEIGHTS) as LoadingMessage['category'][]

/**
 * Pick a loading message that hasn't been shown yet this session.
 * Respects category weights. Resets pool when all messages are exhausted.
 */
export function pickLoadingMessage(usedIds: string[]): LoadingMessage {
  const available = messages.filter(m => !usedIds.includes(m.id))

  // If all exhausted, reset and pick from full pool
  const pool = available.length > 0 ? available : messages

  // Weighted category selection
  const roll = Math.random()
  let cumulative = 0
  let targetCategory: LoadingMessage['category'] = 'robot_sounds'

  for (const cat of categories) {
    cumulative += CATEGORY_WEIGHTS[cat]
    if (roll <= cumulative) {
      targetCategory = cat
      break
    }
  }

  // Filter pool by selected category
  let candidates = pool.filter(m => m.category === targetCategory)

  // If no candidates in this category, fall back to any available
  if (candidates.length === 0) {
    candidates = pool
  }

  // Pick random from candidates
  const index = Math.floor(Math.random() * candidates.length)
  return candidates[index]
}

/** All loading messages for reference. */
export { messages as allLoadingMessages }
