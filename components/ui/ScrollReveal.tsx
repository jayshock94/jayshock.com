'use client'

import { useEffect, useRef } from 'react'

interface Props {
  children: React.ReactNode
  /** Milliseconds to wait after entering viewport before revealing */
  delay?: number
  /** Milliseconds to wait before even starting to observe — use to hold
   *  reveals until a prior animation sequence (e.g. hero) is finished */
  holdUntil?: number
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
export default function ScrollReveal({ children, delay = 0, holdUntil = 0, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Honour user's motion preference — skip animation entirely
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.setAttribute('data-reveal', 'visible')
      return
    }

    let observer: IntersectionObserver | null = null
    let delayTimer: ReturnType<typeof setTimeout> | null = null

    const reveal = () => {
      delayTimer = setTimeout(() => el.setAttribute('data-reveal', 'visible'), delay)
    }

    const startObserving = () => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            observer?.disconnect()
            observer = null
            reveal()
          }
        },
        {
          threshold: 0.15,
          rootMargin: '0px 0px -80px 0px',
        }
      )
      observer.observe(el)
    }

    // Hold off observing until a prior animation sequence completes
    let holdTimer: ReturnType<typeof setTimeout> | null = null
    if (holdUntil > 0) {
      holdTimer = setTimeout(startObserving, holdUntil)
    } else {
      startObserving()
    }

    return () => {
      if (holdTimer) clearTimeout(holdTimer)
      if (delayTimer) clearTimeout(delayTimer)
      observer?.disconnect()
    }
  }, [delay, holdUntil])

  return (
    <div ref={ref} data-reveal="hidden" className={className}>
      {children}
    </div>
  )
}
