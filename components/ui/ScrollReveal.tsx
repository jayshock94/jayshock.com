'use client'

import { useEffect, useRef } from 'react'

interface Props {
  children: React.ReactNode
  /** Milliseconds to wait after entering viewport before revealing */
  delay?: number
  className?: string
}

/**
 * Wraps children in a div that fades + slides up when it enters the viewport.
 * Uses data-reveal attribute toggled by IntersectionObserver so the hidden
 * state is present in SSR HTML (elements are invisible until JS reveals them).
 *
 * CSS for [data-reveal] lives in globals.css.
 * Respects prefers-reduced-motion — reveals immediately if set.
 */
export default function ScrollReveal({ children, delay = 0, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Honour user's motion preference — skip animation entirely
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.setAttribute('data-reveal', 'visible')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger is applied via delay — setTimeout keeps it off the critical path
          const t = setTimeout(() => el.setAttribute('data-reveal', 'visible'), delay)
          observer.disconnect()
          return () => clearTimeout(t)
        }
      },
      {
        threshold: 0.08,
        // Slight negative bottom margin so elements trigger a little before the
        // very bottom of the viewport — feels more natural than edge-of-screen pop
        rootMargin: '0px 0px -24px 0px',
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} data-reveal="hidden" className={className}>
      {children}
    </div>
  )
}
