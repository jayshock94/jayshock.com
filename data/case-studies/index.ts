import type { CaseStudy } from '@/data/types'
import aim                     from './aim'
import mobileLendingManagement from './mobile-lending-management'
import caliberSmart            from './caliber-smart'
import goldpointLes            from './goldpoint-les'

/** Featured three — homepage and top of /work page. */
export const caseStudies: CaseStudy[] = [
  aim,
  mobileLendingManagement,
  caliberSmart,
]

/** Additional case studies shown only on /work page. */
export const additionalCaseStudies: CaseStudy[] = [
  goldpointLes,
]

/** All case studies including coming soon — for /work page. */
export const allCaseStudies: CaseStudy[] = [
  ...caseStudies,
  ...additionalCaseStudies,
]

/** Lookup by slug across all case studies. Returns undefined if not found. */
export function getCaseStudy(slug: string): CaseStudy | undefined {
  return allCaseStudies.find(cs => cs.slug === slug)
}

/** All valid slugs — used for generateStaticParams. Excludes coming soon. */
export const caseStudySlugs = allCaseStudies
  .filter(cs => !cs.comingSoon)
  .map(cs => cs.slug)
