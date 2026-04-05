import type { CaseStudy } from '@/data/types'

/**
 * Caliber Smart — D2D Sales Platform
 *
 * Solo product designer. Rebuilt the entire sales app
 * for a door-to-door company shifting hard into solar.
 * Gamified dashboards, satellite roof estimation, and
 * every tool a rep needed to stop calling the office.
 */
const caliberSmart: CaseStudy = {
  slug:         'caliber-smart',
  title:        'One app. Every product. Every rep.',
  company:      'Caliber Smart',
  industry:     'Door-to-Door Sales',
  eyebrow:      'D2D Sales · 2019–2020',
  role:         'Product Designer',
  year:         '2019–2020',
  types:        ['D2D Sales', 'Gamification', 'Solar Tools', 'Full App Rebuild'],
  cardImpactLine:
    'Reps were spending more time calling rep services than knocking doors.',
  cardStat: { value: '400–600', label: 'Reps using platform daily' },
  cardRole:     'Solo Product Designer · Every screen, every flow',
  cardEyebrow:  'D2D sales platform',
  cardDescription: 'Solo Product Designer building the D2D app reps actually want. From processing sales, to reserving their spot on the Cancun trip.',
  cardImage: '',

  // Solar gold — processed through color algorithm on the page
  brandColorHex: '#D4A017',

  context:
    'Caliber Smart is a leader in door-to-door sales. They sell T-Mobile, Dish Network, internet, pest control, and solar. When I came in, solar was becoming the main product.',

  overview:
    'Solo product designer on a full app rebuild for a sales force of field reps. I worked with the VP team, finance, sales support, marketing, and reps themselves. Research through handoff, every screen, every flow.',

  heroImage:
    'Hero: Caliber Smart app dashboard with leaderboard, key metrics, and pay estimator',

  impact: {
    headline: 'Reps stopped calling the office. They just sold.',
    content: [
      { type: 'paragraph', text: 'After launch, most reps shifted to solar. The sales flow made it easier to close than any other product, and the money was better. That shift is what the company wanted. The app made it happen.' },
      { type: 'paragraph', text: 'Support lines went quiet. Payroll calls dropped. The incentives department stopped working after hours because reps could track their own progress instead of calling in to argue. Legal fees went down because reps actually got their permits. Management had time to focus on training and area strategy instead of putting out fires all day.' },
    ],
    stats: [
      { value: '~30%',    label: 'Reps shifted to solar after launch', estimated: true },
      { value: '400–600', label: 'Reps using the platform daily',     estimated: false },
      { value: 'Down',    label: 'Support calls, payroll disputes, legal fees', estimated: true },
    ],
    estimatedNote:
      'Support volume and legal fee reductions based on department reports. Formal analytics were not tracked at launch.',
    quote: {
      text:        'I used to spend my first hour every morning just figuring out where I stood. Now I open the app and I know exactly what I need to do today.',
      attribution: 'Sales rep, after launch',
    },
  },

  problem: {
    headline: 'Everything lived somewhere else.',
    content: [
      { type: 'paragraph', text: 'The app could make a sale. That was about it. Everything else a rep needed to do their job lived in a different tool, a different person, or a different platform.' },
      { type: 'paragraph', text: 'Leaderboard updates came through Vimeo links their leaders sent out each week. Incentive details were posted on the company\'s social media. Payroll questions meant calling in. Permits meant calling rep services. Area assignments were verbal, decided in morning meetings and forgotten by lunch.' },
      { type: 'paragraph', text: 'Every two weeks, payroll day turned the support lines into a warzone. Reps calling in angry about pay, most of the time over things they could have checked themselves. Wrong direct deposit info. Customers who charged back. Hours lost to problems that didn\'t need a human to solve.' },
      { type: 'paragraph', text: 'The company was shifting hard into solar. They needed better tools to recruit top reps from competitors. The app was the pitch, and the pitch was weak.' },
    ],
  },

  discovery: {
    headline: 'The leaderboard wasn\'t vanity. It was the engine.',
    content: [
      { type: 'paragraph', text: 'I worked closest with the sales support department. They dealt with every rep complaint, every permit request, every payroll question. Their pain was a mirror of the reps\' pain.' },
      { type: 'subheader', text: 'Who I talked to' },
      { type: 'list', items: [
        'Sent surveys to field reps across multiple offices',
        'Interviewed VPs, regional managers, and area managers',
        'Sat down with payroll and finance',
        'Talked to marketing about which incentives actually performed',
        'Met with the head of tech to understand their friction with sales reps',
        'Asked reps what other companies they\'d worked for did better',
      ] },
      { type: 'subheader', text: 'The leaderboard surprise' },
      { type: 'paragraph', text: 'I assumed the leaderboard was ego. It wasn\'t. Incentives were tied directly to position. Resort trips, snowboards, Segways. Reps checked the leaderboard more than anything else in the app. It wasn\'t a scoreboard. It was how they planned their week.' },
      { type: 'paragraph', text: 'That changed my whole approach. The dashboard couldn\'t just show stats. It had to show reps exactly what they needed to do next to climb.' },
    ],
    quote: {
      text:        'I check the leaderboard before I check my texts. If I\'m three sales out from the ski trip, that\'s all I\'m thinking about.',
      attribution: 'Sales rep, during field research',
    },
  },

  solution: {
    headline: 'Every tool a rep needed. Nothing they didn\'t.',
    content: [
      { type: 'subheader', text: 'The gamified dashboard' },
      { type: 'paragraph', text: 'The dashboard was the center of everything. Reps could switch between products and see key metrics tied to their goals. I used the goal gradient effect to gamify progress. Show a rep they\'re three sales away from an incentive and watch what happens. The estimated pay number updated in real time. As sales went up, so did the number.' },
      { type: 'paragraph', text: 'I didn\'t want a bad day to feel like a dead end. If estimated pay was zero, a second estimator showed what they\'d make if they hit the remaining indicators for the pay period. There was always a number worth chasing. Cancelations and chargebacks hit the pay estimate too, so reps could see exactly what went wrong instead of finding out two weeks later on a phone call with payroll.' },
      { type: 'subheader', text: 'Incentives and training' },
      { type: 'paragraph', text: 'The incentives page killed the social media scavenger hunt. Upcoming incentives, progress bars, criteria. All in one place. The training section held pitch documents, practice openers, and company videos. Easy to filter, easy to search.' },
      { type: 'subheader', text: 'Support tools and self-service' },
      { type: 'paragraph', text: 'Sales support got a messaging system. Permit requests, payroll questions, badge replacements. Reps could send a request, check the response, and move on. Settings let them update their own direct deposit, phone number, and address. No more calling in.' },
      { type: 'subheader', text: 'Solar tools' },
      { type: 'paragraph', text: 'I added a roof estimator that used Google Maps satellite imagery. Reps could look at a customer\'s roof on the spot and get panel count, savings projections, and the key numbers needed to close. When they booked a tech, the customer could see the tech\'s rating, photo, and availability. Trust before the tech even shows up.' },
      { type: 'subheader', text: 'Everything else' },
      { type: 'paragraph', text: 'The task board managed appointments, follow-ups, and route planning. Reps could challenge each other directly. The swag store let them spend earned points on gear. Every piece fed back into the loop.' },
      { type: 'subheader', text: 'What I\'d do differently' },
      { type: 'paragraph', text: 'I\'d focus more on the internal tools for the sales support team. That was a different project scope at the time. But knowing what I know now, I missed things I didn\'t even know to look for yet.' },
    ],
    // Images rendered as React components via mediaSlot in the case study page
  },

  glossary: [
    {
      term: 'goal gradient effect',
      definition: 'people work harder the closer they get to a goal. show a rep they\'re 3 sales from a ski trip and they\'ll knock 40 more doors. Jay used this to gamify the dashboard so reps always knew exactly what to do next.',
    },
    {
      term: 'D2D',
      definition: 'door-to-door. reps literally walk neighborhoods knocking on doors to sell products. it\'s exactly what it sounds like and it\'s harder than most people think.',
    },
    {
      term: 'chargeback',
      definition: 'when a customer cancels or disputes a sale after it\'s been counted. the rep loses the commission and it hits their metrics. a lot of reps didn\'t know about chargebacks until payday, which caused chaos.',
    },
    {
      term: 'key indicators',
      definition: 'the specific metrics that drive commission and incentive qualification. things like total sales, solar installs, customer retention rate. companies tie incentives to these because they\'re the behaviors that make the most money.',
    },
    {
      term: 'geofence',
      definition: 'a virtual boundary drawn on a map to define a rep\'s assigned territory. leaders use this to assign areas so reps aren\'t stepping on each other\'s turf.',
    },
    {
      term: 'gamification',
      definition: 'using game mechanics like points, leaderboards, and progress bars in a non-game context. Jay used it to make the dashboard feel like a game reps wanted to win, not a tool they had to use.',
    },
  ],

  explorations: [
    {
      title: 'Badge achievement system',
      description: 'I started building a full badge system where reps could earn and collect achievement badges. It looked great and felt fun. But when the research came back, reps didn\'t care about badges for the sake of badges. They cared about the leaderboard because it was tied to real incentives. Resort trips. Snowboards. Cash. I killed the badge page and redirected that energy into the goal gradient on the dashboard.',
    },
    {
      title: 'Separate leaderboard page',
      description: 'Early designs had the leaderboard as its own dedicated tab. But reps checked it constantly, multiple times a day. Burying it behind a tab added friction to the most important action in the app. I moved leaderboard position to the dashboard so it was the first thing they saw on launch.',
    },
    {
      title: 'Single-product dashboard',
      description: 'The first dashboard showed all metrics across all products at once. It was information overload. Reps selling solar didn\'t need to see their Dish numbers front and center. Product tabs let them focus on what mattered for their current shift while still being able to switch context when needed.',
    },
  ],

  learnings:
    'This was my first time as the only designer on a product this large. I learned how to manage scope when every department wants something, how to say no without burning a relationship, and how to let research kill my own ideas. The badge system was my favorite thing I designed on this project, and cutting it was the best decision I made.',

  nextSlug: 'aim',
}

export default caliberSmart
