'use client'

/**
 * PageAtmosphere
 *
 * Two fixed layers behind all content:
 *   1. Paper texture — V10.jpg tiled, soft-light blend
 *   2. Light bands — wide radial glows alternating left/right across
 *      a tall (500vh) canvas
 *
 * Both scroll at 30% of content speed via --atm-scroll, creating
 * a parallax effect — you see the background drift slowly while
 * content moves over it at full speed.
 */

import { useEffect } from 'react'

const PARALLAX_FACTOR = 0.3

export default function PageAtmosphere() {
  useEffect(() => {
    let rafId: number

    const update = () => {
      const offset = -(window.scrollY * PARALLAX_FACTOR)
      document.documentElement.style.setProperty('--atm-scroll', `${offset}px`)
    }

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div aria-hidden="true" className="atm-grain" />
      <div aria-hidden="true" className="atm-streaks" />
    </>
  )
}
