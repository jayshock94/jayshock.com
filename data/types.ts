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

export interface PhaseContent {
  /** Section headline — under 10 words, plain language. */
  headline: string
  /** Body paragraphs — 2–4 sentences each, max 5. */
  paragraphs: string[]
  /** Impact phase only: stat blocks. */
  stats?: Stat[]
  /** Optional pull-quote for Discovery phase. */
  quote?: {
    text: string
    attribution?: string
  }
  /** Optional note for estimated metrics. */
  estimatedNote?: string
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
  /** Phase content — always in Impact → Problem → Discovery → Solution order. */
  impact:     PhaseContent
  problem:    PhaseContent
  discovery:  PhaseContent
  solution:   PhaseContent
  /** Slug of the next case study (for "Next" navigation at bottom of page). */
  nextSlug: string
}
