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
  role:         'Product Designer',
  year:         '2024–2025',
  types:        ['Mobile', 'Research', 'End to End'],
  cardImpactLine:
    'It was easier to call support than use the app. Payments got missed, borrowers got frustrated, and the interface hadn\'t been updated in years.',
  cardImage: '/images/work/mobile-lending.png',

  // Lendmark crimson — extracted from brand image, run through color algorithm
  brandColorHex: '#C01C2C',

  context:
    'A white-label mobile app for lending agencies. Borrowers use it to manage loans, make payments, set up autopay, and handle documents. Each lender rebrands it as their own. The catch: our clients are the lenders, but the people using it every day are their borrowers. The app hadn\'t been meaningfully updated in years, and it showed.',

  overview:
    'I led UX and product design for this project, working across engineering, stakeholders, and product owners to define scope and constraints. We couldn\'t rebuild the architecture, so I had to get creative with UI to deliver the best experience within what was possible. I ran the discovery research, mapped industry standards, built user mental models, and identified where our lenders differed from banks and credit card companies. From there I compiled findings, presented to stakeholders, defined what could and couldn\'t ship, then moved through wireframes, mocks, prototypes, and testing. Two other designers supported research and took on specific sections of the app. I led the design direction end to end and stayed close to engineering through handoff to make sure builds matched intent.',

  // Hero image — composite of key screens across device mockups
  heroImage: 'Hero: app overview — home screen, payment flow, and confirmation screen across device mockups',

  impact: {
    headline: 'Borrowers stopped calling. They just figured it out.',
    paragraphs: [
      'Client teams reported a noticeable drop in support calls and branch visits for basic tasks. Borrowers were managing loans, making payments, and setting up autopay on their own. Missed payments dropped by an estimated 35% across active lenders in the first quarter after launch. The things that used to drive people to pick up the phone were now handled in a few taps.',
      'The redesign didn\'t just improve the existing product. It sold the next version of it. Clients who were already on the platform invested more to fund future enhancements. New lenders who had never used the product saw it and started purchasing. We\'re currently onboarding them while making micro adjustments for their specific needs. There\'s now a ticket on the roadmap to extend the platform to credit cards, something no client had considered possible before.',
    ],
    stats: [
      { value: '3',       label: 'Lenders live on platform', estimated: false },
      { value: '~35%',    label: 'Fewer missed payments',    estimated: true },
      { value: 'New clients', label: 'Purchasing after seeing redesign', estimated: false },
    ],
    images: [
      {
        src:     '',
        alt:     'Final app composite — finished screens across multiple lender white-label instances showing the design working at scale',
        caption: 'The same design system working across multiple lender brands.',
        aspect:  'landscape',
      },
    ],
    quote: {
      text:        'The mobile app is another highlight. Simple, user friendly, and secure. Managing my finances is a breeze.',
      attribution: '— Borrower feedback, relayed through client team',
    },
    estimatedNote:
      'Missed payment reduction estimated from qualitative reports by client teams. Formal analytics weren\'t tracked at launch.',
  },

  problem: {
    headline: 'Every feature was there. Nobody could find them.',
    paragraphs: [
      'Loans were listed by number with no name or context. A borrower with three loans had no way to tell which was the car and which was the house. Autopay was buried behind screens that didn\'t match how people think about paying bills. Navigation labels were technical instead of task-based, so borrowers had to learn the system rather than the system meeting them where they were. The things people came to do, pay, check balances, see due dates, weren\'t prioritized.',
      'A full rebuild wasn\'t on the table. Engineering had too many sprint commitments already locked in, and the architecture was shared across multiple lenders. Every change had to work for all of them. Launch deadlines were real. Whatever we shipped had to work within the existing foundation.',
    ],
    // Images intentionally omitted — the before/after is rendered via EraserReveal
    // in app/work/[slug]/page.tsx using mediaSlot on this PhaseSection.
  },

  discovery: {
    headline: 'The features were all there. The hierarchy wasn\'t.',
    paragraphs: [
      'I analyzed nine competing apps across major lenders, banks, and credit unions to map what borrowers already expected. Where account info lives, how dashboards are structured, what information sits at the top. I worked closely with product owners who were on-site with clients, and we built templates to help them gather the right feedback. We pulled from app store reviews of similar products, client support complaints, and video calls with lender teams to pressure-test early thinking before any design work started.',
      'Stakeholders were hearing from lender clients that borrowers kept calling in or showing up at branches. The assumption was that the branch locator needed to be easier to find so customers could at least get there without frustration. But that was treating the symptom. Borrowers weren\'t struggling to find a branch. They were going to branches because basic tasks in the app were too hard to do on their own. Fix the app, and the branch visits take care of themselves.',
      'A lot of the apps I was researching were clearly reskinned versions of the same white-label software. What surprised me was that our app already had every feature the top competitors offered. The gap wasn\'t capability. It was hierarchy. The people who built these systems knew every feature by heart. But borrowers don\'t live in lending apps. They spend 99% of their time in other apps, and their brain has no desire to memorize a complex system. They want to see what they owe, when it\'s due, whether they\'re behind, and whether they can set up autopay so they never have to think about it again. The best apps made that obvious. Ours buried it.',
      'We couldn\'t change the payment flow. Same number of screens, same steps. So I focused on how it felt instead of how it worked. I think about it like driving in Texas versus driving in Utah. A one-hour drive across flat Texas feels like four hours because nothing changes. The same hour through a Utah canyon, past a river, through red rocks and grassy fields, feels like forty minutes. The scenery changes often enough that your perception of time compresses. I applied that here. We couldn\'t reduce the clicks, but we could use UI to change the user\'s perception of the flow. Progress indicators, chunked information, visual variety between steps.',
      'The peak-end rule says people judge an experience by how it felt at its highest point and at its close. The old payment confirmation was a flat screen that left borrowers wondering if it actually worked. The new one ends with a confetti burst pulling your eyes to a checkmark and a clear "payment successful" headline. What used to cause anxiety and drive phone calls became a moment of positive reinforcement. You did it. You don\'t need to worry about that payment anymore.',
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
    headline: 'Same architecture. Completely different experience.',
    paragraphs: [
      'The biggest decisions came down to hierarchy. We couldn\'t move features between pages, but we could reorder, restructure, and rethink what got priority. The dashboard needed to surface what borrowers actually came to do without hiding the depth of information our clients required. Chunking, selective attention, and gestalt principles did the heavy lifting. Twenty pieces of information on a screen needed to feel like five or less. We validated our theories with usability testing through UserTesting, where participants completed goals while we recorded their sessions. We tracked which designs they navigated fastest and captured impressions at key steps to confirm our priorities matched how borrowers actually thought.',
      'One decision I refused to let go of was account names. The old app listed loans by number. Three loans meant three meaningless strings of digits. Engineering said changing that wasn\'t feasible because of how the architecture stored account data. I kept going back, talking to different engineers, asking if there was any path forward. Not pushing back on their expertise, just asking if there was another way. Eventually we landed on a solution: a setting where borrowers could nickname their accounts, and icons on the dashboard cards based on loan type. If a user didn\'t set a nickname, they\'d still see a car icon or a house icon instead of just a number. Small change in scope, huge change in usability.',
      'We wanted a better help experience. The existing support options were limited: send a message that got emailed somewhere and wait, or call in, or drive to a branch. We designed a contextual chatbot, but engineering couldn\'t commit within the timeline. So we prioritized: if we fixed the core usability problems that were driving people to call and visit branches in the first place, the need for better support would shrink on its own. The payment flow and account identification mattered more. The new promotional banner also took priority because our clients\' business goals are just as important as the UX goals. Knowing when to make that tradeoff is part of the job.',
      'What I\'m most proud of is that the research held up. There were a lot of voices early on saying if we can\'t rebuild this from scratch, why bother. But what I found wasn\'t a broken product. It was a capable system that just wasn\'t showing what it could do. The original team built something with real depth. Every feature a borrower needed was in there. What was missing was the bridge between that complexity and the person using it. Tessler\'s law says complexity can\'t be destroyed, only moved. The original app passed it straight to the user. My job was to absorb it into the design so the system felt as capable as it actually was, without asking borrowers to figure that out on their own.',
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
