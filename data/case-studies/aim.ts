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
  role:         'Co-Lead UX Product Designer',
  year:         '2022–2024',
  types:        ['Fintech', 'Enterprise', '$10M Impact'],
  cardImpactLine:
    'Unified 5 legacy tools into one lending workspace. Landed a $10M contract.',
  cardImage:    '',

  // Deep navy — processed through color algorithm on the page
  brandColorHex: '#0D355C',

  context:
    'GoldPoint builds lending software for financial institutions across the US. Their legacy system was losing clients to competitors.',

  overview:
    'Co-lead product designer on a three-year effort to replace the legacy workflow. I owned end-to-end design across dashboards, settings, queue logic, and integrations. Worked under the Lead UX Designer\'s direction with direct access to lenders, tellers, and branch managers.',

  heroImage:
    'Hero: AIM customer dashboard with AI summary, loan list, and quick actions',

  problem: {
    headline: 'Five tabs, a spreadsheet, and a sticky note.',
    paragraphs: [
      'SIM started as a decision tree in the early 2000s. Two decades of features bolted on without rethinking the whole. Nobody set out to make it bad. It just grew that way.',
      'Every year the GAIN conference set an immovable deadline. If prototypes weren\'t ready to show clients and secure funding, the work might not get built at all.',
    ],
  },

  discovery: {
    headline: 'It didn\'t need to replace everything. It needed to connect everything.',
    paragraphs: [
      'I visited branches, sat with lenders, and studied every workaround they built around the product\'s gaps.',
      'Competitor systems were locked down. But the workarounds told the real story. Lenders didn\'t need a better SIM. They needed a hub that connected the tools they already used.',
      'That reframe changed everything. AIM would not be a loan viewer. It would be a workspace built around how managers ran their teams, not just how individual lenders processed loans.',
    ],
    images: [
      {
        src:            '/images/AIM/task-board new.png',
        alt:            'Task board with queue management for lending teams',
        caption:        'The task board. Born from watching what managers actually spent their time doing.',
        aspect:         'landscape',
        afterParagraph: 2,
      },
    ],
    quote: {
      text:        'I used to come in an hour early just to figure out who was working on what. By the time I had the board sorted, half the morning was gone.',
      attribution: 'Branch manager, during field research',
    },
  },

  solution: {
    headline: 'Twelve modules. One surface.',
    paragraphs: [
      'Twelve modules. Every loan attached to a person, visible in one view. The loan detail screen puts people, payments, documents, and history on a single surface. No more hunting across systems.',
      'The queue system was the backbone. Auto-assign logic routes work by configurable rules. Managers set it once. The system handles distribution. A teller sees drawer management. A branch manager sees team workload. Same product, different jobs.',
      'Settings was the hardest design problem. Role-based access, security roles, global and dashboard-level configurations. All deeply customizable. One bad permission could lock a team out of critical workflow. I made the most dangerous settings require the most deliberate actions.',
      'Later we added an AI Account Summary. Loan history and customer context synthesized into a readable brief. When a loan landed on someone\'s desk with no context, they had everything they needed. Every module connected to Decision Engine, GTO, CAM, and Document Engine. The hub the research pointed to from day one.',
    ],
    images: [
      {
        src:            '/images/AIM/loan details.png',
        alt:            'Loan detail view with payment form and customer sidebar',
        caption:        'Loan details. One surface instead of five tabs.',
        aspect:         'landscape',
        afterParagraph: 0,
      },
      {
        src:            '/images/AIM/Other Transaction v2.png',
        alt:            'Loan details with other transactions view',
        caption:        'Other transactions. Everything attached to the loan in one place.',
        aspect:         'landscape',
        afterParagraph: 0,
      },
      {
        src:            '/images/AIM/Other Transaction.png',
        alt:            'Role access settings modal with field-level view and edit toggles per security role',
        caption:        'The settings system. Customizable but designed to be hard to break.',
        aspect:         'landscape',
        afterParagraph: 2,
      },
      {
        src:            '/images/AIM/ai summary.png',
        alt:            'AI Account Summary with synthesized loan history and customer context',
        caption:        'AI summary. Context for every handoff, without the digging.',
        aspect:         'landscape',
        afterParagraph: 3,
      },
    ],
  },

  impact: {
    headline: 'Clients stopped leaving. Some came back.',
    paragraphs: [
      'AIM saved clients who were actively signing with competitors. It brought back clients who had already left. One contract alone was worth ten million dollars a year. A client the VP team had never been able to close.',
      'But the number that mattered most was cognitive load. Every level of employee reported less stress, fewer errors, and faster handoffs. Productivity increased across the board.',
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
        src:            '/images/AIM/customer-dashboard-ai-summary.png',
        alt:            'Customer dashboard with AI summary, the hub that replaced five separate tools',
        caption:        'Queues, tasks, loan details, AI context. All connected. No more hunting across five systems.',
        aspect:         'landscape',
        afterParagraph: 1,
      },
    ],
  },

  glossary: [
    {
      term: 'Twelve modules',
      definition: 'customer management, loan servicing, payment processing, document management, queue/task management, settings & configuration, reporting, collections/delinquency, accounting, security & roles, AI account summary, and decision engine integration. all in one surface.',
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
      definition: 'a teller\'s personal queue of work. think of it like a physical desk drawer full of tasks — loans to process, payments to verify, documents to follow up on. each teller only sees their own.',
    },
    {
      term: 'auto-assign logic',
      definition: 'rules that automatically route work to the right person. instead of a manager manually handing out tasks every morning, the system distributes based on role, workload, branch, or whatever rules the manager sets up.',
    },
  ],

  nextSlug: 'mobile-lending-management',
}

export default aim
