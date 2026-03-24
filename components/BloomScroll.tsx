'use client'

import { useEffect } from 'react'

export default function BloomScroll() {
  useEffect(() => {
    function update() {
      const max = document.body.scrollHeight - window.innerHeight
      const pct = max > 0 ? window.scrollY / max : 0
      const bloomY = 20 + pct * 30
      document.documentElement.style.setProperty('--bloom-y', bloomY + '%')
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return null
}
