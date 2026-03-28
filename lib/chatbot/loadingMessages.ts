import type { LoadingMessage } from './types'

/** Short cat-themed phrases that rotate during loading. */
const catPhrases: LoadingMessage[] = [
  { id: 'c1', text: '*purring*', category: 'cat_sounds' },
  { id: 'c2', text: '*stretching*', category: 'cat_sounds' },
  { id: 'c3', text: '*loafing*', category: 'cat_sounds' },
  { id: 'c4', text: '*making biscuits*', category: 'cat_sounds' },
  { id: 'c5', text: "*scratching Jay's chair*", category: 'cat_sounds' },
  { id: 'c6', text: '*knocking things off the desk*', category: 'cat_sounds' },
  { id: 'c7', text: '*chasing a laser pointer*', category: 'cat_sounds' },
  { id: 'c8', text: '*watching cat TV*', category: 'cat_sounds' },
  { id: 'c9', text: '*chirping at a bird outside*', category: 'cat_sounds' },
  { id: 'c10', text: "*sitting on Jay's keyboard*", category: 'cat_sounds' },
  { id: 'c11', text: '*chasing a cursor*', category: 'cat_sounds' },
  { id: 'c12', text: '*napping in a sunbeam*', category: 'cat_sounds' },
  { id: 'c13', text: '*pretending not to care*', category: 'cat_sounds' },
  { id: 'c14', text: '*grooming aggressively*', category: 'cat_sounds' },
  { id: 'c15', text: '*slow blinking*', category: 'cat_sounds' },
  { id: 'c16', text: '*sitting in a box*', category: 'cat_sounds' },
]

/** Dry humor Jay facts for persistent "psst" tags above responses. */
const funFacts: LoadingMessage[] = [
  // Carly Rae Jepsen (spread these out, they're the funniest)
  { id: 'f1', text: "Jay's top 0.5% on Spotify for Carly Rae Jepsen. I wish I was joking.", category: 'fun_facts' },
  { id: 'f6', text: 'Jay knows every Carly Rae Jepsen song by heart. Every. Single. One.', category: 'fun_facts' },
  { id: 'f30', text: 'Jay could talk about Carly Rae Jepsen for an hour without getting bored. He has tested this.', category: 'fun_facts' },
  { id: 'f31', text: 'Jay collects Carly Rae Jepsen stuff. I am choosing not to elaborate.', category: 'fun_facts' },
  { id: 'f32', text: "If you ask Jay his favorite musician he will say Carly Rae Jepsen with zero hesitation and zero shame.", category: 'fun_facts' },

  // Pets
  { id: 'f16', text: "I'm named after Jay's real cat. Barnaby is a Russian Blue from a shelter in Texas. Handsome guy.", category: 'fun_facts' },
  { id: 'f17', text: "Jay's other cat Earnest has the biggest, most beautiful eyes. Don't tell him I said that.", category: 'fun_facts' },
  { id: 'f18', text: "Jay once bottle fed two-day-old kittens whose mother died. They're grown and healthy now.", category: 'fun_facts' },
  { id: 'f33', text: "The real Barnaby always looks like he's judging you. That part is accurate.", category: 'fun_facts' },

  // Food
  { id: 'f19', text: "Jay's comfort food is double stuffed Oreos with milk. Without milk he doesn't even want them.", category: 'fun_facts' },
  { id: 'f20', text: "Jay has a weird fear of pure salt or butter. Don't ask him to explain it.", category: 'fun_facts' },
  { id: 'f7', text: "Jay's go-to convenience store run is a White Monster and Maverick bonfire food.", category: 'fun_facts' },

  // Movies and TV
  { id: 'f3', text: 'Jay can guess the plot twist within the first five minutes. People hate watching movies with him.', category: 'fun_facts' },
  { id: 'f8', text: "Jay watches movies wrong. He's analyzing the color grading while everyone else is following the plot.", category: 'fun_facts' },
  { id: 'f21', text: "Jay's favorite movie is Manchester by the Sea. He knows that's a bold choice.", category: 'fun_facts' },
  { id: 'f34', text: "Jay watches Smarter Every Day and Stuff Made Here. His brain never stops wanting to figure things out.", category: 'fun_facts' },

  // Video games
  { id: 'f22', text: "Jay has a hard time finishing video games. He'll be obsessed for days and then just... stop.", category: 'fun_facts' },
  { id: 'f35', text: "Ghost of Tsushima and Spider-Man are Jay's favorite games. Whether he finished them is another question.", category: 'fun_facts' },

  // Outdoors
  { id: 'f23', text: "Jay's favorite spot is Robbers Roost in Utah. You have to rappel in with a backpacking pack.", category: 'fun_facts' },
  { id: 'f24', text: "Jay once got stuck in Horseshoe Bend and had to be rescued by a boat. He'll tell the story better.", category: 'fun_facts' },
  { id: 'f25', text: "Jay can rappel down a rope facing forward. Apparently that's a thing.", category: 'fun_facts' },
  { id: 'f9', text: "Jay collects disc golf discs. And lapel pins. And cool rocks from hikes.", category: 'fun_facts' },

  // Making stuff
  { id: 'f2', text: 'Jay can walk on his hands. He also knows how to sew and crochet.', category: 'fun_facts' },
  { id: 'f4', text: 'Jay has a 3D printer and designs his own stuff to print. Making things is his whole deal.', category: 'fun_facts' },
  { id: 'f15', text: "Jay once crocheted a... actually, I'll let him tell that story.", category: 'fun_facts' },

  // The clean plate thing
  { id: 'f26', text: "At Thanksgiving, Jay competes to have the cleanest plate. Nobody else knows they're playing.", category: 'fun_facts' },
  { id: 'f27', text: "Jay's secret to a clean plate at dinner is the bread roll. He has rules about this.", category: 'fun_facts' },

  // Random personality
  { id: 'f28', text: "Jay is usually early to meetings because he overcompensates for ADHD. Sometimes the ADHD wins though.", category: 'fun_facts' },
  { id: 'f29', text: "Jay's favorite season is fall. Just thought you should know.", category: 'fun_facts' },
  { id: 'f36', text: "Jay loves soccer but is not very good at it. His words, not mine.", category: 'fun_facts' },

  // Design opinions
  { id: 'f12', text: "Jay has strong opinions about border-radius. Don't ask.", category: 'fun_facts' },
  { id: 'f13', text: 'Jay will debate icon-vs-label placement for an unreasonable amount of time.', category: 'fun_facts' },
  { id: 'f14', text: "Jay has never met a dropdown he didn't want to replace.", category: 'fun_facts' },
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
