import type { CaseStudy } from '@/data/types'

/**
 * Virtual Badge System — Dish One
 *
 * PLACEHOLDER: Phase content below is structural scaffolding.
 * Replace with real copy before launch.
 */
const virtualBadge: CaseStudy = {
  slug:         'virtual-badge',
  title:        'Getting reps on doors weeks sooner',
  company:      'GoldPoint Systems',
  industry:     'Field Sales',
  eyebrow:      'Field Sales · Internal Tools',
  role:         'UX Designer · Pitched and led',
  year:         '2017–2019',
  types:        ['Research', 'Internal Tools', 'Mobile', 'Initiative'],
  cardImpactLine:
    'Identified the problem, pitched the solution, built it. Reps went from waiting 3 weeks to selling immediately.',
  cardImage: '/images/work/virtual-badge.png',

  // Lending Engine navy — extracted from brand image, run through color algorithm
  brandColorHex: '#1B4B8C',

  impact: {
    headline: 'Reps stopped waiting. They started selling.',
    paragraphs: [
      'Sales reps were losing three weeks between hire and first door. The blocker was not training or motivation — it was paperwork.',
      'After launch, reps had everything they needed to work on day one. Community friction with law enforcement dropped.',
    ],
    stats: [
      { value: '3 wks', label: 'Waiting time eliminated', estimated: false },
      { value: 'Day 1', label: 'Reps on doors',           estimated: false },
      { value: 'Lower', label: 'Field compliance issues', estimated: true  },
    ],
    estimatedNote:
      'Field compliance reduction is based on reported incidents before and after launch. No formal tracking was in place.',
  },

  problem: {
    headline: 'Nobody had named the problem yet',
    paragraphs: [
      'Sales reps at Dish One could not work in the field until they had a physical badge and their permits in order. Physical badges took up to three weeks to arrive.',
      'In the meantime, reps had no credentialing they could show at the door or to local authorities. Some got turned away. Some got reported. The company was losing selling days and community trust at the same time.',
      'No one had formally flagged this as a solvable problem. It was treated as a logistics issue, not a design problem.',
      'I owned the identification — from initial observation through pitch, design, and build.',
    ],
  },

  discovery: {
    headline: 'The problem was credentialing. The solution was in their pockets.',
    paragraphs: [
      'I talked to reps, field managers, and one local authority who had flagged a rep. The pattern was consistent: the problem was not that people doubted whether the rep worked for Dish One. The problem was that there was nothing to show.',
      'Every rep already had a smartphone. A digital credential that could be shown, verified at a glance, and immediately issued was technically possible with no hardware change.',
      'The permit management piece came out of the same research. Reps were managing permit paperwork in folders, in their cars, sometimes not at all. One permit issue could sideline a rep for days.',
      'The insight that changed everything: credentialing and permit access were the same problem. One app could solve both.',
    ],
    quote: {
      text:        '[PLACEHOLDER] Real quote from a rep about the waiting experience.',
      attribution: 'Sales rep, Dish One',
    },
  },

  solution: {
    headline: 'A virtual badge with permit access, built on what they already had',
    paragraphs: [
      'The virtual badge displayed the rep\'s photo, name, employee ID, and company verification in a format that felt official and was hard to fake. It also stored permit status by territory so reps could pull it up at the door.',
      'The bigger decision was what to leave out. I rejected a full onboarding app concept in favor of a focused tool that did two things well. Scope creep would have delayed the build by months.',
      'The tradeoff was a lightweight auth approach that the team flagged as imperfect from a security standpoint. We accepted it because the threat model was low and the urgency was high. I documented the tradeoff clearly.',
      'I would do the authentication differently now. At the time it was the right call to ship something that worked over something theoretically better that might not have shipped at all.',
    ],
  },

  nextSlug: 'lending-engine-service',
}

export default virtualBadge
