'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

/**
 * AIM hero — clean screenshot with rounded corners, shadow, and bottom fade.
 */
export default function AimHeroImage() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 900)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '780px',
        margin: '0 auto',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s ease',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 10',
          borderRadius: '10px 10px 0 0',
          overflow: 'hidden',
          boxShadow: '0 8px 40px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(255,255,255,0.08)',
        }}
      >
        <Image
          src="/images/AIM/hero.png"
          alt="AIM customer dashboard — AI account summary with payment analytics and loan management"
          fill
          sizes="(max-width: 768px) 100vw, 780px"
          style={{ objectFit: 'cover', objectPosition: 'top center' }}
          priority
        />

        {/* Bottom fade into hero */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '30%',
            background: 'linear-gradient(to top, var(--case-hero-bg, #0D355C), transparent)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  )
}
