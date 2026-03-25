import type { CaseStudy } from '@/data/types'

/**
 * Mobile Lending Management — Caliber Smart
 *
 * PLACEHOLDER: Phase content below is structural scaffolding.
 * Replace with real copy before launch.
 */
const mobileLendingManagement: CaseStudy = {
  slug:         'mobile-lending-management',
  title:        'Better lending app. Same codebase.',
  company:      'Caliber Smart',
  industry:     'Fintech',
  eyebrow:      'Fintech · Mobile · White-label',
  role:         'Product Designer · End to end',
  year:         '2024–2025',
  types:        ['Mobile', 'White-label', 'Research', 'End to End'],
  cardImpactLine:
    'Borrowers stopped calling. The architecture was locked. The experience didn\'t have to be.',
  cardImage: '/images/work/mobile-lending.png',

  // Lendmark crimson — extracted from brand image, run through color algorithm
  brandColorHex: '#C01C2C',

  // Hero image — composite of key screens across device mockups
  heroImage: 'Hero: app overview — home screen, payment flow, and confirmation screen across device mockups',

  impact: {
    headline: 'Borrowers stopped calling. They just managed it themselves.',
    paragraphs: [
      'Borrowers were figuring things out on their own. That hadn\'t happened with the old system. Client teams reported fewer missed payments, less pressure on support lines, and borrowers coming back for second loans.',
      'GAC is a white-label loan management platform used by lenders across the US. Borrowers use it to make payments, set up autopay, manage documents, and track loans across powersports, auto, home, and personal lending.',
    ],
    stats: [
      { value: '5+',    label: 'Lenders on platform', estimated: false },
      { value: '~3 mo', label: 'Design to handoff',   estimated: false },
    ],
    images: [
      {
        src:     '',
        alt:     'Final app composite — finished screens across multiple lender white-label instances showing the design working at scale',
        caption: 'The same design system working across multiple lender brands.',
        aspect:  'landscape',
      },
    ],
    estimatedNote:
      'Outcomes reported qualitatively by client teams. Formal analytics weren\'t tracked at launch.',
  },

  problem: {
    headline: 'The product hadn\'t been updated in years. Clients were noticing.',
    paragraphs: [
      'The app hadn\'t been updated in years. Lenders were starting to look elsewhere. I led research and design end to end, working through product owners who had direct client contact with lender teams.',
      'Loans were listed by number with no label or context. A borrower with three loans had no idea which was the car and which was the house. Autopay was buried. The layout made it hard to digest what was going on or know what to do next.',
      'We couldn\'t rebuild from scratch. Engineering had too much on their plate to commit time and resources to sweeping changes.',
    ],
    // Images intentionally omitted — the before/after is rendered via EraserReveal
    // in app/work/[slug]/page.tsx using mediaSlot on this PhaseSection.
  },

  discovery: {
    headline: 'The flows were locked. The language wasn\'t.',
    paragraphs: [
      'I ran competitive analysis against top fintech and lending apps to map what borrowers already expected. Where account info lives, how payment flows are structured, what a confirmation screen needs to do. I built personas from PO field notes, client sessions, app store reviews, and borrower research. I shared what I found with client teams on calls to pressure-test features before any design started.',
      'Borrowers weren\'t confused because features were missing. The app had everything they needed. It just didn\'t help them find it. Loan numbers meant nothing. Navigation labels didn\'t match the tasks people were actually trying to do.',
      'You can\'t always fix the UX. Sometimes the architecture is locked. But you can almost always fix how it feels, and that gap is bigger than most people expect. If restructuring the flow wasn\'t on the table, I had to absorb complexity through language, hierarchy, and visual clarity instead.',
      'The payment confirmation screen looked like a throwaway. Borrowers had real anxiety about whether a payment went through, especially people managing multiple loans. That screen wasn\'t just a confirmation. It was the moment the whole interaction either resolved or left them with doubt. Recognizing that changed how I thought about every endpoint in the app.',
    ],
    images: [
      {
        src:            '',
        alt:            'Original payment confirmation screen — the throwaway moment that identified the need for deliberate endpoint design',
        caption:        'The original confirmation screen. Nothing communicated that the payment actually went through.',
        aspect:         'portrait',
        afterParagraph: 3,
      },
    ],
    quote: {
      text:        'I always had anxiety about whether the payment actually was submitted. That confetti screen, I know that sounds silly, but I like it a lot, because now I know I did it right.',
      attribution: '— Borrower, relayed through client team',
    },
  },

  solution: {
    headline: 'Mobile first. The architecture stayed. The experience didn\'t.',
    paragraphs: [
      'The home screen became a loan dashboard. Each loan shows its plain-language name, next due date, and amount owed, visible without a single tap. Before, borrowers had to navigate into a loan just to find out when they needed to pay.',
      'The feature people talked about most wasn\'t the payment flow. It was what happened after. A checkmark, confetti, done. Small. But it turned a moment of anxiety into a moment of confidence. The peak-end rule says people remember how an experience felt at its high point and at its close. We designed the close deliberately. That screen got more unsolicited feedback than anything else we built.',
      'I designed a contextual chatbot to help borrowers find buried features and answer common support questions. Engineering scoped it out. Too large for the current sprint. I took the problems it was solving and worked them back into navigation labels and clearer hierarchy. Not the same answer, but it covered the same ground.',
      'Engineering was a good partnership throughout. A handful of components came back for redesign, not for UX issues but for implementation scope. The existing codebase couldn\'t support certain builds without blowing past the sprint. Those went back lighter.',
    ],
    images: [
      {
        src:            '',
        alt:            'Redesigned loan dashboard — each loan showing its name, due date, and amount owed on the home screen without any navigation required',
        caption:        'Home screen loan dashboard. Everything a borrower needs without a single tap.',
        aspect:         'portrait',
        afterParagraph: 0,
      },
      {
        src:            '',
        alt:            'Payment confirmation screen — checkmark and confetti animation confirming the payment was submitted',
        caption:        'The confetti screen. The moment that got more unsolicited feedback than anything else we shipped.',
        aspect:         'portrait',
        afterParagraph: 1,
      },
    ],
  },

  nextSlug: 'virtual-badge',
}

export default mobileLendingManagement
