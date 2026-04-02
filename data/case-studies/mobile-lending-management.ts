import type { CaseStudy } from '@/data/types'

/**
 * Mobile Lending Management — Caliber Smart
 *
 * PLACEHOLDER: Phase content below is structural scaffolding.
 * Replace with real copy before launch.
 */
const mobileLendingManagement: CaseStudy = {
  slug:         'mobile-lending-management',
  title:        'From support calls to self-service',
  company:      'GoldPoint Systems',
  industry:     'Fintech',
  eyebrow:      'Fintech · 2024–2025',
  role:         'Lead Product Designer',
  year:         '2024–2025',
  types:        ['White-Label App', '9 App Audit', 'Payment Redesign', 'Usability Tested', 'Confetti Moment'],
  cardImpactLine:
    'It was easier to call support than use the app. Payments got missed, borrowers got frustrated, and the interface hadn\'t been updated in years.',
  cardStat: { value: '~40%', label: 'Fewer support calls' },
  cardImage: '/images/work/mobile-lending.png',

  // Lendmark crimson — extracted from brand image, run through color algorithm
  brandColorHex: '#C01C2C',

  context:
    'A white-label mobile app for lending agencies. The app hadn\'t been updated in years, and it showed.',

  overview:
    'Led the redesign of a white-label mobile lending app used by borrowers across multiple financial institutions. Two supporting designers helped with payment flow models, usability test sessions, and competitor research. I owned the full design direction, built every screen, and drove decisions from audit through handoff.',

  // Hero image — composite of key screens across device mockups
  heroImage: 'Hero: app overview — home screen, payment flow, and confirmation screen across device mockups',

  impact: {
    headline: 'Borrowers stopped calling. They just figured it out.',
    content: [
      { type: 'paragraph', text: 'The redesign sold the next version of it. Existing clients invested more. New lenders who had never used the product started purchasing. There\'s now a ticket on the roadmap to extend the platform to credit cards, something no client had considered possible before.' },
      { type: 'paragraph', text: 'This wasn\'t a broken product. It was a capable system that wasn\'t showing what it could do. Tessler\'s law says complexity can\'t be destroyed, only moved. The original app passed it to the user. My job was to absorb it into the design.' },
    ],
    stats: [
      { value: '~40%',    label: 'Fewer support calls',       estimated: true },
      { value: '~35%',    label: 'Fewer missed payments',    estimated: true },
      { value: 'New clients', label: 'Purchasing after seeing redesign', estimated: false },
    ],
    images: [],
    quote: {
      text:        'The mobile app is another highlight. Simple, user friendly, and secure. Managing my finances is a breeze.',
      attribution: '— Borrower feedback, relayed through client team',
    },
    estimatedNote:
      'Missed payment reduction estimated from qualitative reports by client teams. Formal analytics weren\'t tracked at launch.',
  },

  problem: {
    headline: 'Every feature was there. Nobody could find them.',
    content: [
      { type: 'paragraph', text: 'The app had everything borrowers needed. But the way it was organized made it easier to call support than figure it out on their own.' },
    ],
  },

  discovery: {
    headline: 'The features were all there. The hierarchy wasn\'t.',
    content: [
      { type: 'paragraph', text: 'I mapped what borrowers already expected by studying how the top lending apps handled it. Where account info lives. How dashboards are structured. What gets priority on the home screen.' },
      { type: 'subheader', text: 'The branch locator wasn\'t the problem' },
      { type: 'paragraph', text: 'Frustrated borrowers kept showing up at branches saying things were hard to find. Classic survivorship bias. Stakeholders heard that and assumed the branch locator needed fixing. But that\'s not why they were coming in. They were coming in because they couldn\'t figure out how to make a payment in the app. Fix the app, and the branch visits take care of themselves.' },
      { type: 'subheader', text: 'The gap was hierarchy, not capability' },
      { type: 'paragraph', text: 'Our app had almost every feature the top competitors offered. Borrowers don\'t live in lending apps. They spend 99% of their time elsewhere, so when they do open it, they want to handle their business and move on. The best apps made that obvious. Ours buried it.' },
    ],
  },

  solution: {
    headline: 'Same architecture. Completely different experience.',
    content: [
      { type: 'paragraph', text: 'The biggest decisions came down to hierarchy. We couldn\'t move features between pages, but we could reorder and rethink what got priority. Chunking, selective attention, and gestalt principles turned twenty pieces of information into what felt like five. We validated with usability testing, tracking which designs borrowers navigated fastest.' },
      { type: 'subheader', text: 'The account names fight' },
      { type: 'paragraph', text: 'One decision I refused to let go of was account names. Engineering said it wasn\'t feasible. I kept asking if there was another way. Eventually we landed on nicknames in settings and loan-type icons on the dashboard. Small change in scope, huge change in usability.' },
      { type: 'subheader', text: 'Making the same flow feel faster' },
      { type: 'paragraph', text: 'We couldn\'t change the payment flow. Same screens, same steps. So I focused on how it felt. I think about it like driving in Texas versus Utah. A flat hour feels like four. An hour through canyons and red rocks feels like forty minutes. We couldn\'t reduce the clicks, but progress indicators, chunked information, and visual variety changed the user\'s perception of the flow.' },
      { type: 'subheader', text: 'The confetti moment' },
      { type: 'paragraph', text: 'The peak-end rule shaped the ending. The old confirmation was a flat screen. The new one ends with confetti pulling your eyes to a checkmark and a clear "payment successful" headline. What used to cause anxiety became positive reinforcement.' },
    ],
    images: [
      {
        src:            '/images/mobile/old-payment-confirmation.png',
        alt:            'Original payment confirmation screen with no visual feedback',
        caption:        'The original confirmation screen. Nothing communicated that the payment actually went through.',
        aspect:         'portrait',
        afterBlock: 4,
      },
      {
        src:            '__confetti__',
        alt:            'Payment confirmation screen with checkmark and confetti animation',
        caption:        'The confetti screen. The moment that got more unsolicited feedback than anything else we shipped.',
        aspect:         'portrait',
        afterBlock: 6,
      },
    ],
    quote: {
      text:        'I always had anxiety about whether the payment actually was submitted. That confetti screen, I know that sounds silly, but I like it a lot, because now I know I did it right.',
      attribution: '— Borrower, relayed through client team',
    },
  },

  glossary: [
    {
      term: 'white-label',
      definition: 'one product that gets rebranded for different companies. like how multiple lenders all use the same app but each one slaps their own logo and colors on it.',
    },
    {
      term: 'survivorship bias',
      definition: 'judging a situation based only on the survivors. like in WWII, engineers armored where returning planes had bullet holes. but the planes that got hit in other spots never came back. the stakeholders were doing the same thing, focusing on the complaints they could see instead of the problem they couldn\'t.',
    },
    {
      term: 'peak-end rule',
      definition: 'people remember an experience based on how it felt at its most intense moment and at the very end. so if you nail the ending, the whole thing feels better. that\'s why the confetti screen matters so much.',
    },
    {
      term: 'Tessler\'s law',
      definition: 'complexity can\'t be destroyed, only moved. someone has to deal with it. either the user figures out your messy interface, or the designer absorbs that complexity into the design so the user doesn\'t have to.',
    },
    {
      term: 'gestalt principles',
      definition: 'how your brain groups things visually. stuff that\'s close together feels related. stuff that looks similar feels like it belongs together. Jay used this to make 20 pieces of info on a screen feel like 5.',
    },
    {
      term: 'selective attention',
      definition: 'your brain can only focus on so much at once. if everything on the screen is screaming for attention, nothing gets it. you have to decide what the user sees first.',
    },
    {
      term: 'cognitive load',
      definition: 'how much your brain has to work to use something. the more you make someone think, the more likely they are to give up and call support instead.',
    },
    {
      term: 'Miller\'s law',
      definition: 'people can hold about 7 things (give or take 2) in short term memory. the old app was throwing way more than that at borrowers on every screen.',
    },
    {
      term: 'goal gradient effect',
      definition: 'people speed up when they can see the finish line. progress bars, step indicators, visual momentum. it\'s why the payment flow felt shorter even though it had the same number of steps.',
    },
    {
      term: 'chunking',
      definition: 'breaking a wall of info into smaller groups so your brain can process it. instead of 20 random items, you get 4 groups of 5 related things. way easier to scan.',
    },
    {
      term: 'usability testing',
      definition: 'watching real people try to use your design to see where they get stuck. way more useful than guessing. Jay sent prototypes to a testing service where users recorded themselves completing tasks.',
    },
  ],

  explorations: [
    {
      title: 'Stacked cards vs flat list for account tiles',
      description: 'Early designs used stacked cards to show multiple accounts. It looked clean with two accounts but fell apart at four or five. Borrowers with multiple loans couldn\'t scan the list fast enough. Flat tiles with loan-type icons and nicknames tested better because they let users identify accounts at a glance without expanding anything.',
    },
    {
      title: 'Bold branded account detail header',
      description: 'One direction used a large, bold-colored header on the account detail page to match each lender\'s brand. It looked strong in isolation but competed with the payment CTA for attention. We pulled it back to a subtle brand accent so the primary action stayed dominant.',
    },
    {
      title: 'Redesigned payment flow from scratch',
      description: 'I prototyped a simplified three-step payment flow that cut two screens. Engineering couldn\'t support it without rebuilding the backend payment processor. So I kept the same screens and focused on perceived speed instead. Progress indicators, chunked fields, and the confetti ending made the same number of steps feel like fewer.',
    },
  ],

  learnings:
    'This project taught me the difference between what users say and what they actually need. Stakeholders were convinced the branch locator was the problem because that\'s what they heard complaints about. The real issue was upstream. It also taught me how much endings matter. The confetti screen was a small investment that changed how borrowers felt about the entire payment experience.',

  nextSlug: 'caliber-smart',
}

export default mobileLendingManagement
