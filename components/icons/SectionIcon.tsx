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
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            inset: '-30%',
            background: `radial-gradient(ellipse 70% 50% at 50% 80%, ${glowColor}, transparent 70%)`,
            opacity: 0.35,
            filter: 'blur(16px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
          aria-hidden="true"
        />

        {/* Container */}
        <div
          style={{
            position: 'relative',
            width: 'clamp(72px, 8vw, 96px)',
            height: 'clamp(72px, 8vw, 96px)',
            borderRadius: 'var(--radius-lg, 12px)',
            background: 'var(--color-surface)',
            border: '0.5px solid var(--color-border)',
            overflow: 'hidden',
            zIndex: 1,
          }}
        >
          {webgl ? (
            <SectionIconCanvas variant={variant} />
          ) : (
            /* CSS fallback */
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
                  background: `linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))`,
                  border: '0.5px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(14px)',
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
