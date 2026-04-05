/**
 * Shared resume data — single source of truth.
 * Used by: /experience page, Toolkit component, and /api/resume PDF generator.
 * Update here and everything stays in sync.
 */

export const CONTACT = {
  name:      'Jay Shock',
  title:     'Product Designer',
  phone:     '435-851-9377',
  email:     'hello@jayshock.com',
  linkedin:  'linkedin.com/in/jay-shock-089605156',
  portfolio: 'jayshock.com',
  status:    'Currently employed. Open to the right senior role or consulting engagement. Remote first, open to hybrid.',
} as const

export const SUMMARY =
  '8 years in fintech and enterprise SaaS. I work end to end, from research to ship. I specialize in making complex products feel simple for the people who use them every day.'

export interface SkillCategory {
  category: string
  items: string
  caseStudy: { label: string; slug: string } | null
}

export const SKILLS: SkillCategory[] = [
  {
    category: 'Research and Discovery',
    items: 'User interviews, contextual inquiry, usability testing, survey design, synthesis and insight generation.',
    caseStudy: { label: 'Most demonstrated in AIM', slug: '/work/aim' },
  },
  {
    category: 'Systems Thinking',
    items: 'Design systems, token architecture, component libraries, information architecture, cross-product consistency.',
    caseStudy: { label: 'Most demonstrated in Caliber Smart', slug: '/work/caliber-smart' },
  },
  {
    category: 'Product Design',
    items: 'Interaction design, wireframing, prototyping, visual design, responsive design, white-label and dynamic theming.',
    caseStudy: { label: 'Most demonstrated in Mobile Lending', slug: '/work/mobile-lending-management' },
  },
  {
    category: 'Collaboration',
    items: 'Stakeholder communication, design critiques, developer handoff, cross-functional facilitation, pitching and presenting to leadership.',
    caseStudy: null,
  },
]

export const TOOLS = [
  'Figma', 'FigJam', 'Jira', 'Azure DevOps', 'Loom',
] as const

export const AI_TOOLS = [
  'Claude', 'ChatGPT', 'Microsoft Copilot', 'Cursor',
] as const

export interface TimelineEntry {
  role: string
  company: string
  period: string
  paragraphs: string[]
  slug: string | null
}

export const TIMELINE: TimelineEntry[] = [
  {
    role:     'Senior UX Designer',
    company:  'GoldPoint Systems',
    period:   '2021 to present',
    paragraphs: [
      'Helped grow the design team from a new department with 2 designers to 4 designers and an integral part of the company.',
      'Contributing to a design system that spans multiple products and serves clients across the financial industry, each with their own brand guidelines.',
      'Led new product work beyond legacy redesigns.',
      'Headed the lending management platform redesign from the ground up.',
    ],
    slug: '/work/aim',
  },
  {
    role:     'Product Designer',
    company:  'Caliber Smart',
    period:   '2019 to 2021',
    paragraphs: [
      'Built the company\'s first design system from scratch to handle multiple brands and products. Designed the full sales experience for a new solar division, including roof analysis tools, panel placement estimation, and tech assignment flow.',
      'Introduced a gamified metrics dashboard that tied rep performance to incentives and leaderboard visibility.',
    ],
    slug: '/work/caliber-smart',
  },
  {
    role:     'UX Designer',
    company:  'Dish One',
    period:   '2017 to 2019',
    paragraphs: [
      'Identified a gap nobody had named. Sales reps were losing weeks waiting on physical badges and struggling with permit management in the field.',
      'Pitched and built a virtual badge system with authentication and permit access. Reps were on doors weeks earlier. Community friction with law enforcement dropped.',
    ],
    slug: null,
  },
  {
    role:     'Marketing and Graphic Design',
    company:  'Various',
    period:   '2015 to 2017',
    paragraphs: [
      'Graphic design, video production, and incentive management on a marketing team. Foundation for the visual and storytelling instincts that carried into product work.',
    ],
    slug: null,
  },
]

export interface EducationEntry {
  label: string
  institution: string
}

export const EDUCATION: EducationEntry[] = [
  { label: 'Graphic Design Coursework', institution: 'Utah Valley University' },
]

/** Top certifications shown on resume PDF. */
export const CERTIFICATIONS_PRIMARY = [
  { title: 'UX Certification', institution: 'Nielsen Norman Group' },
  { title: 'Google UX Design Professional Certificate', institution: 'Google / Coursera' },
  { title: 'ADA Accessibility Training', institution: 'WebAIM' },
] as const

/** All certifications including LinkedIn courses (shown in Toolkit component). */
export const CERTIFICATIONS = [
  ...CERTIFICATIONS_PRIMARY,
  { title: 'Data Visualization: Best Practices', institution: 'LinkedIn' },
  { title: 'User Experience for Web Design', institution: 'LinkedIn' },
  { title: 'Sass Essential Training', institution: 'LinkedIn' },
  { title: 'Bootstrap 4 Essential Training', institution: 'LinkedIn' },
  { title: 'Responsive Layout', institution: 'LinkedIn' },
  { title: 'CSS Essential Training', institution: 'LinkedIn' },
  { title: 'HTML Essential Training', institution: 'LinkedIn' },
  { title: 'Web Programming Foundations', institution: 'LinkedIn' },
  { title: 'UX Foundations: Accessibility', institution: 'LinkedIn' },
  { title: 'Become a Front-End Web Developer', institution: 'LinkedIn' },
  { title: 'JavaScript Essential Training', institution: 'LinkedIn' },
] as const

export const TOOLKIT_TOOLS = [
  'Figma', 'Sketch', 'Miro', 'FigJam',
  'Jira', 'Loom', 'Mobbin', 'Lucid',
  'Azure', 'Adobe Creative Suite',
  'Claude', 'ChatGPT', 'Cursor',
] as const

export const TOOLKIT_SKILLS = [
  'User Research', 'Interaction Design', 'Design Systems',
  'Prototyping', 'Usability Testing', 'Wireframing',
  'Information Architecture', 'Stakeholder Management',
  'Cross-functional Leadership', 'Accessibility (WCAG)',
] as const
