import type { CaseStudy } from '@/data/types'

/**
 * Virtual Badge System — Dish One
 *
 * Nobody asked for this project. Jay identified the problem,
 * pitched the solution, designed it, and helped build it.
 * Reps went from a 3-week wait to working on day one.
 */
const virtualBadge: CaseStudy = {
  slug:         'virtual-badge',
  title:        'Virtual Badge System',
  company:      'Dish One',
  industry:     'Field Sales',
  eyebrow:      'Field Sales · 2017–2019',
  role:         'UX Designer',
  year:         '2017–2019',
  types:        ['Mobile', 'Field Sales', 'Self-Initiated'],
  cardImpactLine:
    'Nobody asked me to solve this. Reps were losing 3 weeks before they could sell. I pitched it, designed it, built it.',
  cardImage: '',

  // Dish Network red
  brandColorHex: '#EC1C24',

  context:
    'Dish One is a door-to-door sales arm of Dish Network. Reps sell TV, internet, and smart home packages in the field. I was a UX designer on the internal tools team.',

  overview:
    'I identified a problem nobody had named. Reps couldn\'t work until a physical badge arrived, sometimes three weeks after hire. I pitched a virtual badge system, designed it, and helped build it. This was not assigned work. I found the gap and owned it end to end.',

  impact: {
    headline: 'Reps stopped waiting. They started selling.',
    paragraphs: [
      'Three weeks. That\'s how long new reps sat idle waiting for a physical badge. Not training, not ramping up. Just waiting on a piece of plastic.',
      'After launch, reps had credentials on their phone before their first shift. Community friction with law enforcement dropped. The company stopped losing selling days to a logistics problem nobody thought to fix.',
    ],
    stats: [
      { value: '3 wks',  label: 'Wait time eliminated',      estimated: false },
      { value: 'Day 1',  label: 'Reps selling immediately',  estimated: false },
      { value: 'Lower',  label: 'Field compliance issues',   estimated: true  },
    ],
    estimatedNote:
      'Compliance improvement based on reported incidents before and after launch. No formal tracking was in place.',
  },

  problem: {
    headline: 'Three weeks of nothing.',
    paragraphs: [
      'New reps at Dish One couldn\'t knock on a single door until they had a physical badge and their permits sorted. Badges took up to three weeks to arrive. Permits were worse.',
      'Without credentials, reps had nothing to show at the door. Nothing for law enforcement. Some got turned away. Some got reported. The company was bleeding selling days and burning community trust.',
      'Nobody had flagged this as a design problem. Everyone treated it like a logistics issue. Something you just dealt with.',
      'I saw it differently. I owned it from observation through pitch, design, and build.',
    ],
  },

  discovery: {
    headline: 'The answer was already in their pockets.',
    paragraphs: [
      'I talked to reps, field managers, and one local authority who had actually flagged a rep. The pattern was clear. People didn\'t doubt whether the rep worked for Dish One. They just had nothing to verify it with.',
      'Every rep already carried a smartphone. A digital credential that could be shown, verified at a glance, and issued instantly was possible without any new hardware.',
      'The permit piece came from the same conversations. Reps were managing permit paperwork in folders, in their cars, sometimes not at all. One expired permit could sideline a rep for days.',
      'Credentialing and permit access were the same problem. One app could solve both.',
    ],
    quote: {
      text:        'I had a guy call the cops on me my second week. I didn\'t even have my badge yet. I just had a polo shirt and a clipboard.',
      attribution: 'Sales rep, during field research',
    },
  },

  solution: {
    headline: 'Two problems. One focused tool.',
    paragraphs: [
      'The virtual badge showed the rep\'s photo, name, employee ID, and company verification in a format that felt official and was hard to fake. It also stored permit status by territory so reps could pull it up at the door.',
      'The bigger decision was what to leave out. I rejected a full onboarding app concept in favor of a tool that did two things well. Scope creep would have pushed the build out by months.',
      'The tradeoff was a lightweight auth approach. The team flagged it as imperfect from a security standpoint. We accepted it because the threat model was low and the urgency was high. I documented the tradeoff clearly.',
      'I\'d do the authentication differently now. At the time, it was the right call. Ship something that works over something theoretically better that might never ship.',
    ],
  },

  nextSlug: 'aim',
}

export default virtualBadge
