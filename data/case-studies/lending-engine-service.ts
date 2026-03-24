import type { CaseStudy } from '@/data/types'

/**
 * Lending Engine Service — GoldPoint Systems (Confidential)
 * NDA protected — password required to view.
 *
 * PLACEHOLDER: Phase content below is structural scaffolding.
 * Replace with real copy before launch.
 */
const lendingEngineService: CaseStudy = {
  slug:         'lending-engine-service',
  title:        'Unifying seven products into one lending engine',
  company:      'GoldPoint Systems (Confidential)',
  industry:     'Fintech',
  eyebrow:      'Fintech · Enterprise SaaS',
  role:         'Product Designer · End to end',
  year:         '2021–2024',
  types:        ['Research', 'Systems', 'Enterprise', 'White-label'],
  cardImpactLine:
    'Delivered a white-label ready system that works across any brand. Same constraints. Better product.',
  isProtected:  true,

  // Financial slate blue — processed through color algorithm on the page
  brandColorHex: '#3A6B9E',

  impact: {
    headline: '[PLACEHOLDER] What changed for the people using it',
    paragraphs: [
      '[PLACEHOLDER] Replace this with the opening impact statement. Lead with the result in plain language. State what changed.',
      '[PLACEHOLDER] Context sentence: scale of the product and your involvement.',
    ],
    stats: [
      { value: '[X]',   label: '[Metric label]',   estimated: false },
      { value: '[X]%',  label: '[Metric label]',   estimated: true  },
      { value: '[X]',   label: '[Metric label]',   estimated: false },
    ],
    estimatedNote:
      '[PLACEHOLDER] If any stats above are estimated, describe the methodology here. Never fabricate a specific number.',
  },

  problem: {
    headline: '[PLACEHOLDER] What was hard and why it mattered',
    paragraphs: [
      '[PLACEHOLDER] Business goal: what the organization needed.',
      '[PLACEHOLDER] User reality: what people actually experienced — and why it was different from the business goal.',
      '[PLACEHOLDER] Your role and scope: what you owned, what the team owned.',
      '[PLACEHOLDER] Constraints: time, technical, organizational.',
    ],
  },

  discovery: {
    headline: '[PLACEHOLDER] What you learned and how',
    paragraphs: [
      '[PLACEHOLDER] Research methods: brief list of what you did and why.',
      '[PLACEHOLDER] Key finding 1.',
      '[PLACEHOLDER] Key finding 2.',
      '[PLACEHOLDER] The pivot insight — the one thing that changed your direction.',
    ],
    quote: {
      text:        '[PLACEHOLDER] A real quote from someone who used the product every day.',
      attribution: '[Role or context — no names]',
    },
  },

  solution: {
    headline: '[PLACEHOLDER] What you made and the decisions behind it',
    paragraphs: [
      '[PLACEHOLDER] Key decision 1: what you chose and what you rejected.',
      '[PLACEHOLDER] Key decision 2: a tradeoff you made and the reasoning.',
      '[PLACEHOLDER] Key decision 3: something you would do differently. This shows maturity.',
      '[PLACEHOLDER] Handoff note: how you worked with engineering to ship it.',
    ],
  },

  nextSlug: 'mobile-lending-management',
}

export default lendingEngineService
