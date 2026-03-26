import type { LoadingMessage } from './types'

/** Short cat-themed phrases that rotate during loading. */
const catPhrases: LoadingMessage[] = [
  { id: 'c1', text: '*purring*', category: 'cat_sounds' },
  { id: 'c2', text: '*stretching*', category: 'cat_sounds' },
  { id: 'c3', text: '*loafing*', category: 'cat_sounds' },
  { id: 'c4', text: '*making biscuits*', category: 'cat_sounds' },
  { id: 'c5', text: "*scratching Jay's chair*", category: 'cat_sounds' },
  { id: 'c6', text: '*knocking things off the desk*', category: 'cat_sounds' },
  { id: 'c7', text: '*ignoring you on purpose*', category: 'cat_sounds' },
  { id: 'c8', text: '*staring at a wall*', category: 'cat_sounds' },
  { id: 'c9', text: '*judging you silently*', category: 'cat_sounds' },
  { id: 'c10', text: "*sitting on Jay's keyboard*", category: 'cat_sounds' },
  { id: 'c11', text: '*chasing a cursor*', category: 'cat_sounds' },
  { id: 'c12', text: '*napping in a sunbeam*', category: 'cat_sounds' },
  { id: 'c13', text: '*pretending not to care*', category: 'cat_sounds' },
  { id: 'c14', text: '*grooming aggressively*', category: 'cat_sounds' },
  { id: 'c15', text: '*slow blinking*', category: 'cat_sounds' },
]

/** Dry humor Jay facts for persistent "psst" tags above responses. */
const funFacts: LoadingMessage[] = [
  { id: 'f1', text: "Jay's top 0.5% on Spotify for Carly Rae Jepsen. People are starting to worry.", category: 'fun_facts' },
  { id: 'f2', text: 'Jay can walk on his hands. He also knows how to sew and crochet.', category: 'fun_facts' },
  { id: 'f3', text: 'Jay can guess the plot twist within the first five minutes. People hate watching movies with him.', category: 'fun_facts' },
  { id: 'f4', text: 'Jay has a 3D printer and designs his own stuff to print. Making things is his whole deal.', category: 'fun_facts' },
  { id: 'f5', text: 'Jay broke his arm snowboarding once. He tells it better.', category: 'fun_facts' },
  { id: 'f6', text: 'Jay knows every Carly Rae Jepsen song by heart. Every. One.', category: 'fun_facts' },
  { id: 'f7', text: "Jay's favorite camping drink is mint tea. Just thought you should know.", category: 'fun_facts' },
  { id: 'f8', text: 'Jay spots continuity errors in movies. Shirt changes color between cuts? He sees it.', category: 'fun_facts' },
  { id: 'f9', text: "Jay's really into disc golf. Like, really into it.", category: 'fun_facts' },
  { id: 'f10', text: 'Jay claims he can still do a standing backflip. No witnesses.', category: 'fun_facts' },
  { id: 'f11', text: "Jay says he's beaten every video game he's ever played. I haven't fact-checked this.", category: 'fun_facts' },
  { id: 'f12', text: "Jay has strong opinions about border-radius. Don't ask.", category: 'fun_facts' },
  { id: 'f13', text: 'Jay will debate icon-vs-label placement for an unreasonable amount of time.', category: 'fun_facts' },
  { id: 'f14', text: "Jay has never met a dropdown he didn't want to replace.", category: 'fun_facts' },
  { id: 'f15', text: "Jay once crocheted a... actually, I'll let him tell that story.", category: 'fun_facts' },
]

/** All messages combined (for legacy pickLoadingMessage compatibility). */
const messages: LoadingMessage[] = [...catPhrases, ...funFacts]

/**
 * Pick a random cat phrase, avoiding recently shown ones.
 * Resets pool when all are exhausted.
 */
export function pickCatPhrase(excludeIds: string[]): LoadingMessage {
  const available = catPhrases.filter(m => !excludeIds.includes(m.id))
  const pool = available.length > 0 ? available : catPhrases
  return pool[Math.floor(Math.random() * pool.length)]
}

/**
 * Pick a fun fact only (no cat sounds) for persistent tags above responses.
 */
export function pickFactMessage(usedIds: string[]): LoadingMessage {
  const available = funFacts.filter(m => !usedIds.includes(m.id))
  const pool = available.length > 0 ? available : funFacts
  return pool[Math.floor(Math.random() * pool.length)]
}

/**
 * Pick any loading message (legacy — used if needed).
 */
export function pickLoadingMessage(usedIds: string[]): LoadingMessage {
  const available = messages.filter(m => !usedIds.includes(m.id))
  const pool = available.length > 0 ? available : messages
  return pool[Math.floor(Math.random() * pool.length)]
}

export { messages as allLoadingMessages }
