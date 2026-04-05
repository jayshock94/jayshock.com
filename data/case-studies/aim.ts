import type { CaseStudy } from '@/data/types'

/**
 * AIM — Account & Information Management
 * GoldPoint Systems · Lending Engine suite
 *
 * Three-year initiative replacing a legacy lending workflow
 * with a unified power-user workspace.
 */
const aim: CaseStudy = {
  slug:         'aim',
  title:        'Account & Information Management',
  company:      'GoldPoint Systems',
  industry:     'Fintech',
  eyebrow:      'Fintech · Enterprise SaaS',
  role:         'Senior UX Designer',
  year:         '2022–2024',
  types:        ['Fintech', 'Enterprise SaaS', '3-Year Initiative', '12 Modules'],
  cardImpactLine:
    'The software was driving clients away',
  cardStat: { value: '$10M+', label: 'Annual contract secured' },
  cardRole:     'Senior UX Designer · Owned IA, navigation, and 5 of 12 modules',
  cardEyebrow:  'Loan management platform',
  cardDescription: 'Senior UX Designer unifying fragmented legacy tools into a platform lenders chose to renew.',
  cardImage:    '',

  // Deep navy — processed through color algorithm on the page
  brandColorHex: '#0D355C',

  context:
    'GoldPoint builds lending software for financial institutions across the US. Their legacy system was losing clients to competitors.',

  overview:
    'Senior UX designer on a three-year effort to replace the legacy workflow. I owned settings, navigation, queue tiles, comments, and integrations end to end. Worked alongside the Lead UX Designer, who used this project to mentor me into a lead role. We split modules between us and I led full pages from research through handoff. Direct access to lenders, tellers, and branch managers throughout.',

  heroImage:
    'Hero: AIM customer dashboard with loan list and quick actions',

  problem: {
    headline: 'Five tabs, a spreadsheet, and a sticky note.',
    content: [
      { type: 'paragraph', text: 'SIM started as a decision tree in the early 2000s. Two decades of features got bolted on without anyone rethinking the whole. Nobody set out to make it bad. It just grew that way.' },
      { type: 'subheader', text: 'The GAIN deadline' },
      { type: 'paragraph', text: 'Every year the GAIN conference set an immovable deadline. If prototypes weren\'t ready to show clients and secure funding, the work might not get built at all. That pressure shaped every decision we made.' },
    ],
  },

  discovery: {
    headline: 'It didn\'t need to replace everything. It needed to connect everything.',
    content: [
      { type: 'paragraph', text: 'I visited branches, sat with lenders, and watched every workaround they had built around the product\'s gaps. Sticky notes on monitors. Spreadsheets tracking what the system should have tracked. Browser tabs open to three different tools just to process one loan.' },
      { type: 'subheader', text: 'The workarounds told the real story' },
      { type: 'paragraph', text: 'Competitor systems were locked down, so we couldn\'t study them directly. But the workarounds told us more than any competitor demo would have. Lenders didn\'t need a better SIM. They needed a hub that connected the tools they already used.' },
      { type: 'paragraph', text: 'That reframe changed everything. AIM would not be a loan viewer. It would be a workspace built around how managers ran their teams, not just how individual lenders processed loans.' },
    ],
    images: [
      {
        src:            '/images/AIM/task-board new.png',
        alt:            'Task board with queue management for lending teams',
        caption:        'The task board. Born from watching what managers actually spent their time doing.',
        aspect:         'landscape',
        afterBlock: 3,
      },
    ],
    quote: {
      text:        'I used to come in an hour early just to figure out who was working on what. By the time I had the board sorted, half the morning was gone.',
      attribution: 'Branch manager, during field research',
    },
  },

  /* ── Process artifacts shown in discovery ── */
  // These are referenced in the page template's discovery mediaSlot

  solution: {
    headline: 'Twelve modules. One surface.',
    content: [
      { type: 'paragraph', text: 'Twelve modules. Every loan attached to a person, visible in one view. The loan detail screen puts people, payments, documents, and history on a single surface. No more hunting across systems.' },
      { type: 'subheader', text: 'The queue system' },
      { type: 'paragraph', text: 'This was the backbone of AIM. Auto-assign logic routes work by configurable rules. Managers set it once. The system handles distribution from there. A teller sees their drawer. A branch manager sees team workload. Same product, completely different jobs.' },
      { type: 'subheader', text: 'Settings: the hardest design problem' },
      { type: 'paragraph', text: 'Role-based access, security roles, global and dashboard-level configurations. All deeply customizable. One bad permission could lock an entire branch out of critical workflow. I designed the most dangerous settings to require the most deliberate actions.' },
      { type: 'subheader', text: 'The hub it was always meant to be' },
      { type: 'paragraph', text: 'Every module connected to Decision Engine, GTO, CAM, and Document Engine. The hub the research pointed to from day one.' },
    ],
    images: [
      {
        src:            '/images/AIM/loan details.png',
        alt:            'Loan detail view with payment form and customer sidebar',
        caption:        'Loan details. One surface instead of five tabs.',
        aspect:         'landscape',
        afterBlock: 0,
      },
      {
        src:            '/images/AIM/Other Transaction v2.png',
        alt:            'Loan details with other transactions view',
        caption:        'Other transactions. Everything attached to the loan in one place.',
        aspect:         'landscape',
        afterBlock: 0,
      },
      {
        src:            '/images/AIM/settings-other-transaction.png',
        alt:            'Role access settings modal with field-level view and edit toggles per security role',
        caption:        'The settings system. Customizable but designed to be hard to break.',
        aspect:         'landscape',
        afterBlock: 4,
      },
    ],
  },

  impact: {
    headline: 'Clients stopped leaving. Some came back.',
    content: [
      { type: 'paragraph', text: 'AIM saved clients who were actively signing with competitors. It brought back clients who had already left. One contract alone was worth ten million dollars a year. A client the VP team had never been able to close.' },
      { type: 'paragraph', text: 'But the number that mattered most was cognitive load. Every level of employee reported less stress, fewer errors, and faster handoffs. Productivity increased across the board.' },
    ],
    stats: [
      { value: '$10M+',  label: 'Annual contract secured',    estimated: false },
      { value: '~40%',   label: 'Faster cross-team handoffs', estimated: true  },
      { value: '5 to 1',  label: 'Systems consolidated',       estimated: false },
    ],
    estimatedNote:
      'Handoff improvement estimated from client team reports. Formal analytics were not tracked at launch.',
    images: [
      {
        src:            '/images/AIM/customer details real 2.png',
        alt:            'Customer dashboard — the hub that replaced five separate tools',
        caption:        'One surface replaced an entire workflow. That was the point.',
        aspect:         'landscape',
        afterBlock: 1,
      },
    ],
  },

  glossary: [
    {
      term: 'Twelve modules',
      definition: 'customer management, loan servicing, payment processing, document management, queue/task management, settings & configuration, reporting, collections/delinquency, accounting, security & roles, and decision engine integration. all in one surface.',
    },
    {
      term: 'SIM',
      definition: 'the legacy system AIM replaced. stood for "System Information Management." built in the early 2000s and held together with duct tape and institutional knowledge for two decades.',
    },
    {
      term: 'GAIN conference',
      definition: 'GoldPoint\'s annual client conference. this is where new features get demoed to lenders and credit unions. if your work isn\'t ready to show here, it might not get funded. the whole product roadmap orbits this event.',
    },
    {
      term: 'Decision Engine',
      definition: 'the system that automates loan approval decisions. runs the borrower\'s info through underwriting rules and spits out approve, deny, or review. AIM connects to it so lenders don\'t have to leave the workspace.',
    },
    {
      term: 'cognitive load',
      definition: 'how much your brain has to work to use something. the more you make someone think, the more likely they are to give up and call support instead.',
    },
    {
      term: 'drawer management',
      definition: 'a teller\'s personal queue of work. think of it like a physical desk drawer full of tasks. loans to process, payments to verify, documents to follow up on. each teller only sees their own.',
    },
    {
      term: 'auto-assign logic',
      definition: 'rules that automatically route work to the right person. instead of a manager manually handing out tasks every morning, the system distributes based on role, workload, branch, or whatever rules the manager sets up.',
    },
  ],

  explorations: [
    {
      title: 'Hamburger nav vs tab bar vs sidebar',
      description: 'Early prototypes tested three navigation patterns. Hamburger hid too much from power users who needed everything visible. Tab bar couldn\'t scale to twelve modules. We landed on a persistent sidebar with collapsible groups so lenders could see the full system at a glance.',
    },
{
      title: 'Bold summary banner vs inline stats',
      description: 'We tested a large hero banner showing key numbers at the top of the dashboard. It looked great in mockups but took up too much vertical space on the 1366x768 monitors most branches used. The final design moved stats into compact tiles so users could see their queue immediately.',
    },
    {
      title: 'AI Account Summary',
      description: 'I pushed hard for an AI-powered account summary that would synthesize loan history and customer context into a readable brief. When a loan landed on someone\'s desk with no context, they had to dig through multiple screens to piece the story together. The AI summary would solve that cold-start problem instantly. I designed the full feature and prototyped it, but the team decided not to build it. Still think it was the right idea at the wrong time.',
      image: {
        src:     '/images/AIM/ai summary 2.png',
        alt:     'AI Account Summary prototype — synthesized loan history and customer context in a readable brief',
        caption: 'The AI summary I designed and prototyped. Killed before launch.',
        aspect:  'landscape',
      },
    },
  ],

  learnings:
    'This project taught me how to design for the highest-stakes version of a user. One wrong setting could lock an entire branch out of their workflow. It forced me to think about progressive disclosure, confirmation patterns, and how to make dangerous actions feel deliberate. It also taught me how to work with a lead who gave me room to own full pages while I watched how he approached the ones he kept.',

  nextSlug: 'mobile-lending-management',
}

export default aim
