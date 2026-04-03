'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import type { IconVariant } from './SectionIconCanvas'

const SectionIconCanvas = dynamic(() => import('./SectionIconCanvas'), {
  ssr: false,
  loading: () => null,
})

interface SectionIconProps {
  variant: IconVariant
  glowColor: string
}

function hasWebGL(): boolean {
  if (typeof document === 'undefined') return false
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export default function SectionIcon({ variant, glowColor }: SectionIconProps) {
  const [webgl, setWebgl] = useState(true)

  useEffect(() => {
    setWebgl(hasWebGL())
  }, [])

  return (
    <div
      className="flex justify-center"
      style={{ marginBottom: 'var(--space-stack-md)' }}
    >
      <div style={{ position: 'relative' }}>
        {/* Dark container — glow stays inside */}
        <div
          style={{
            position: 'relative',
            width: 'clamp(80px, 9vw, 104px)',
            height: 'clamp(80px, 9vw, 104px)',
            borderRadius: '18px',
            background: `
              radial-gradient(ellipse 100% 50% at 50% 100%, color-mix(in oklch, ${glowColor} 15%, #0c0c0c), transparent 65%),
              linear-gradient(180deg, #101010, #0a0a0a)
            `,
            border: '0.5px solid rgba(255, 255, 255, 0.06)',
            boxShadow: `
              0 1px 0 rgba(255, 255, 255, 0.04) inset,
              0 -1px 0 rgba(255, 255, 255, 0.02) inset,
              0 4px 24px rgba(0, 0, 0, 0.4)
            `,
            overflow: 'hidden',
            zIndex: 1,
          }}
        >
          {/* Warm bottom edge highlight */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: '15%',
              right: '15%',
              height: '2px',
              background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)`,
              opacity: 0.4,
              borderRadius: '1px',
            }}
            aria-hidden="true"
          />

          {webgl ? (
            <SectionIconCanvas variant={variant} />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '40%',
                  height: '40%',
                  borderRadius: variant === 'about' || variant === 'skills' ? '50%' : '20%',
                  background: `linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))`,
                  border: '0.5px solid rgba(255,255,255,0.08)',
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
