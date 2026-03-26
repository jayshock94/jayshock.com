import type { PageContext } from './types'

/** Map of case study slugs to their titles for system prompt context. */
const CASE_STUDY_TITLES: Record<string, string> = {
  'lending-engine-service': 'Unifying seven products into one lending engine',
  'mobile-lending-management': 'Better lending app. Same codebase.',
  'virtual-badge': 'Getting reps on doors weeks sooner',
}

/**
 * Pure function: maps a pathname to a PageContext object.
 * Used both client-side (for chips) and server-side (for system prompt).
 */
export function extractPageContext(pathname: string): PageContext {
  // Case study pages
  const caseStudyMatch = pathname.match(/^\/work\/([^/]+)$/)
  if (caseStudyMatch) {
    const slug = caseStudyMatch[1]
    return {
      path: pathname,
      pageType: 'case-study',
      caseStudySlug: slug,
      caseStudyTitle: CASE_STUDY_TITLES[slug] ?? slug,
    }
  }

  // Static pages
  if (pathname === '/work') return { path: pathname, pageType: 'work-index' }
  if (pathname === '/about') return { path: pathname, pageType: 'about' }
  if (pathname === '/experience') return { path: pathname, pageType: 'experience' }
  if (pathname === '/contact') return { path: pathname, pageType: 'contact' }

  // Default to homepage
  return { path: '/', pageType: 'home' }
}
