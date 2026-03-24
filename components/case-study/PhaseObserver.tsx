'use client'

import { useEffect, type ReactNode } from 'react'
import type { PhaseKey } from '@/data/types'

interface PhaseObserverProps {
  children: ReactNode
}

/**
 * PhaseObserver — Intersection Observer for phase color shift.
 *
 * Watches every element with [data-phase-section] and sets
 * data-phase on <html> when a section enters the viewport.
 * The CSS in tokens.css reacts to [data-phase] to shift
 * --color-canvas and --color-surface-glass.
 *
 * The shift should feel like the room changed lighting —
 * not a color swap. The 0.7s ease transitions on body and
 * .glass-nav handle the animation.
 *
 * Cleanup: removes data-phase on unmount (leaving a case study page).
 */
export default function PhaseObserver({ children }: PhaseObserverProps) {
  useEffect(() => {
    const root     = document.documentElement
    const sections = root.querySelectorAll<HTMLElement>('[data-phase-section]')

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const phase = entry.target.getAttribute('data-phase-section') as PhaseKey | null
            if (phase) {
              root.setAttribute('data-phase', phase)
            }
          }
        }
      },
      {
        // Fire when 30% of the section is in view, excluding ±20% of viewport edges
        threshold:  0.3,
        rootMargin: '-20% 0px -20% 0px',
      },
    )

    sections.forEach(section => observer.observe(section))

    return () => {
      sections.forEach(section => observer.unobserve(section))
      root.removeAttribute('data-phase')
    }
  }, [])

  return <>{children}</>
}
