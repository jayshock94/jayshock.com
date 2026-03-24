import type { CaseStudy } from '@/data/types'
import lendingEngineService   from './lending-engine-service'
import mobileLendingManagement from './mobile-lending-management'
import virtualBadge           from './virtual-badge'

/** Ordered list — strongest first, per site-content.md. */
export const caseStudies: CaseStudy[] = [
  lendingEngineService,
  mobileLendingManagement,
  virtualBadge,
]

/** Lookup by slug. Returns undefined if not found. */
export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find(cs => cs.slug === slug)
}

/** All valid slugs — used for generateStaticParams. */
export const caseStudySlugs = caseStudies.map(cs => cs.slug)
