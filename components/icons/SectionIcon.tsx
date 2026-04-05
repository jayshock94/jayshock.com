'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import type { IconVariant } from './SectionIconCanvas'

const SectionIconCanvas = dynamic(() => import('./SectionIconCanvas'), {
  ssr: false,
  loading: () => null,
})

interface SectionIconProps {
  variant: IconVariant
  glowColor: string
  /** Raw hex color for Three.js point light override */
  glowColorHex?: string
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

/** Static placeholder shown instantly while Three.js loads */
function IconPlaceholder({ variant, glowColor }: { variant: IconVariant; glowColor: string }) {
  return (
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
          background: `radial-gradient(circle at 50% 70%, color-mix(in oklch, ${glowColor} 12%, transparent), rgba(255,255,255,0.02))`,
          border: '0.5px solid rgba(255,255,255,0.08)',
          transition: 'opacity 0.4s ease',
        }}
      />
    </div>
  )
}

export default function SectionIcon({ variant, glowColor, glowColorHex }: SectionIconProps) {
  const [webgl, setWebgl] = useState(true)
  const [inView, setInView] = useState(false)
  const [canvasReady, setCanvasReady] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setWebgl(hasWebGL())
  }, [])

  // Only mount the Three.js canvas when the icon scrolls into view
  useEffect(() => {
    const el = ref.current
    if (!el || !webgl) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px 0px' }, // start loading 200px before visible
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [webgl])

  return (
    <div
      className="flex justify-center"
      style={{ marginBottom: 'var(--space-stack-md)' }}
    >
      <div style={{ position: 'relative' }} ref={ref}>
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
              0 -1px 0 rgba(255, 255, 255, 0.02) inset
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

          {webgl && inView ? (
            <>
              {/* Show placeholder until canvas first paints */}
              {!canvasReady && (
                <div style={{ position: 'absolute', inset: 0 }}>
                  <IconPlaceholder variant={variant} glowColor={glowColor} />
                </div>
              )}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  opacity: canvasReady ? 1 : 0,
                  transition: 'opacity 0.5s ease',
                }}
              >
                <SectionIconCanvas
                  variant={variant}
                  glowColorHex={glowColorHex}
                  onCreated={() => setCanvasReady(true)}
                />
              </div>
            </>
          ) : (
            <IconPlaceholder variant={variant} glowColor={glowColor} />
          )}
        </div>
      </div>
    </div>
  )
}
