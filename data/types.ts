/**
 * Data types for case studies and site content.
 * These are the shapes that drive all case study pages.
 */

export type PhaseKey = 'impact' | 'problem' | 'discovery' | 'solution'

export interface Stat {
  value: string
  label: string
  /** If true, a footnote asterisk is shown and estimatedNote is displayed below. */
  estimated?: boolean
}

export interface CaseStudyImage {
  /** Descriptive alt text — also shown as placeholder label before real images exist. */
  alt: string
  /** Path relative to /public. Empty string while placeholder. */
  src: string
  /** Optional caption rendered below the image. */
  caption?: string
  /**
   * Aspect ratio hint for the placeholder box.
   * 'portrait'  → 9/18  (phone screenshots)
   * 'landscape' → 16/9  (wide composites)
   */
  aspect?: 'portrait' | 'landscape'
  /**
   * Insert this image after paragraph N (0-indexed).
   * If omitted, image renders after all paragraphs.
   */
  afterParagraph?: number
}

export interface PhaseContent {
  /** Section headline — under 10 words, plain language. */
  headline: string
  /** Body paragraphs — 2–4 sentences each, max 5. */
  paragraphs: string[]
  /** Impact phase only: stat blocks. */
  stats?: Stat[]
  /** Optional images — can be placed after specific paragraphs via afterParagraph. */
  images?: CaseStudyImage[]
  /** Optional pull-quote for Discovery phase. */
  quote?: {
    text: string
    attribution?: string
  }
  /** Optional note for estimated metrics. */
  estimatedNote?: string
}

export interface GlossaryTerm {
  /** The exact term as it appears in the text (case-insensitive match). */
  term: string
  /** Barnaby-voice definition shown in the tooltip. */
  definition: string
}

export interface CaseStudy {
  slug: string
  /** Card title, shown on homepage and work index. */
  title: string
  /** Company or client name (used on about page snapshot). */
  company: string
  /** Industry tag — shown as eyebrow on cards and hero. */
  industry: string
  /** Eyebrow string used on the card (e.g. "Fintech · Enterprise SaaS"). */
  eyebrow: string
  /** Designer's role on the project. */
  role: string
  /** Year or range (e.g. "2021–2024"). */
  year: string
  /** Tags shown in the hero header. */
  types: string[]
  /** One-line impact summary shown on homepage/work index cards. */
  cardImpactLine: string
  /** Image shown in the work card. Path relative to /public. */
  cardImage: string
  /**
   * Brand color hex — processed through generateTokens() before use.
   * Never used directly; only used as algorithm input.
   */
  brandColorHex: string
  /**
   * Brief project context — what the product is and why it needed work.
   * Shown in the overview section as the "Project" column.
   */
  context?: string
  /**
   * Role description — what the designer owned on this project.
   * Shown in the overview section as the "My role" column.
   */
  overview?: string
  /**
   * Optional hero image shown below the impact stats in the case study header.
   * Path relative to /public. Omit until real image exists.
   */
  heroImage?: string
  /** Phase content — always in Impact → Problem → Discovery → Solution order. */
  impact:     PhaseContent
  problem:    PhaseContent
  discovery:  PhaseContent
  solution:   PhaseContent
  /** Glossary terms Barnaby can explain inline via tooltip. */
  glossary?: GlossaryTerm[]
  /**
   * Directions explored but not shipped. Shown after solution phase.
   * Each item: what was tried, why it was killed.
   */
  explorations?: {
    title: string
    description: string
    /** Optional image to show alongside the exploration. */
    image?: CaseStudyImage
  }[]
  /**
   * What the designer learned from this project. 2–3 sentences.
   * Shown at the end of the impact phase.
   */
  learnings?: string
  /** If true, card shows as coming soon and doesn't link to a case study page. */
  comingSoon?: boolean
  /** Slug of the next case study (for "Next" navigation at bottom of page). */
  nextSlug: string
}
