'use client'

import { useEffect } from 'react'

/**
 * Observes all <section> elements with aria-label on the page
 * and emits 'section-visible' events when they enter the viewport.
 * Mount once in the layout or page — no wrapping needed.
 */

const SECTION_MAP: Record<string, string> = {
  'Introduction': 'hero',
  'Featured case studies': 'work',
  'About': 'about',
  'How I work': 'how-i-work',
  'My toolkit': 'toolkit',
  'Experience': 'experience',
  'Contact': 'contact',
}

export default function SectionTracker() {
  useEffect(() => {
    const sections = document.querySelectorAll('section[aria-label]')
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const label = entry.target.getAttribute('aria-label') ?? ''
            const section = SECTION_MAP[label]
            if (section) {
              window.dispatchEvent(
                new CustomEvent('section-visible', { detail: { section } })
              )
            }
          }
        }
      },
      { threshold: 0.3 }
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
