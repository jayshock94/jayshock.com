'use client'

import { useState } from 'react'
import Link  from 'next/link'
import Image from 'next/image'
import type { CaseStudy } from '@/data/types'
import { generateTokens } from '@/lib/colorAlgorithm'

interface WorkCardProps {
  caseStudy: CaseStudy
  /** Optional custom image component — replaces the default static image. */
  cardImageSlot?: React.ReactNode
}

/** Extract RGB channels from a hex string. */
function hexToRGB(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ]
}

export default function WorkCard({ caseStudy, cardImageSlot }: WorkCardProps) {
  const [hovered, setHovered] = useState(false)

  const { slug, title, cardImage, cardImpactLine, types, brandColorHex } = caseStudy
  const tokens = generateTokens(brandColorHex)
  const [r, g, b] = hexToRGB(tokens.heroZone)

  return (
    <Link href={`/work/${slug}`} className="block h-full" style={{ textDecoration: 'none' }}>
      <article
        className="flex flex-col h-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: '16px',
          overflow:     'hidden',
          border:       `1.5px solid ${hovered ? tokens.border : 'var(--color-border)'}`,
          background:   'var(--color-surface)',
          transform:    hovered ? 'translateY(-5px)' : 'translateY(0)',
          boxShadow:    hovered ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
          transition:   'transform 0.30s cubic-bezier(0.16,1,0.3,1), box-shadow 0.30s ease, border-color 0.25s ease',
        }}
      >

        {/* ── Image zone ──────────────────────────────────────────────────
            Brand color as the surface with glassmorphism depth:
            - Solid heroZone base
            - Lighter radial highlight from top center (glass reflection)
            - Darker vignette at edges for depth
            - Subtle top edge highlight */}
        <div
          style={{
            position:   'relative',
            height:     '280px',
            background: tokens.heroZone,
            overflow:   'hidden',
          }}
        >
          {/* Glass highlight — lighter wash from top center */}
          <div
            aria-hidden="true"
            style={{
              position:      'absolute',
              inset:         0,
              background:    'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 60%)',
              pointerEvents: 'none',
              zIndex:        0,
            }}
          />

          {/* Depth vignette — darker at edges */}
          <div
            aria-hidden="true"
            style={{
              position:      'absolute',
              inset:         0,
              background:    'radial-gradient(ellipse 70% 60% at 50% 40%, transparent 30%, rgba(0,0,0,0.18) 100%)',
              pointerEvents: 'none',
              zIndex:        0,
            }}
          />

          {/* Top edge highlight — glass reflection line */}
          <div
            aria-hidden="true"
            style={{
              position:      'absolute',
              top:           0,
              left:          0,
              right:         0,
              height:        '1px',
              background:    'rgba(255,255,255,0.20)',
              pointerEvents: 'none',
              zIndex:        3,
            }}
          />

          {/* Content */}
          <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 1 }}>
            {cardImageSlot ? (
              cardImageSlot
            ) : (
              <>
                <Image
                  src={cardImage}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                />

                {/* Bottom fade into brand color */}
                <div
                  aria-hidden="true"
                  style={{
                    position:      'absolute',
                    bottom:        0,
                    left:          0,
                    right:         0,
                    height:        '80px',
                    background:    `linear-gradient(to top, ${tokens.heroZone}, transparent)`,
                    pointerEvents: 'none',
                  }}
                />
              </>
            )}
          </div>
        </div>

        {/* ── Text zone ─────────────────────────────────────────────────── */}
        <div
          style={{
            padding:       '20px 22px 22px',
            display:       'flex',
            flexDirection: 'column',
            gap:           '10px',
            flex:          1,
          }}
        >
          <h3
            style={{
              color:         'var(--color-text-primary)',
              fontFamily:    'var(--font-outfit), system-ui, sans-serif',
              fontSize:      '18px',
              fontWeight:    600,
              lineHeight:    1.3,
              letterSpacing: '-0.01em',
            }}
          >
            {title}
          </h3>

          <p
            className="text-body-sm"
            style={{
              color:      'var(--color-text-secondary)',
              lineHeight: 1.55,
            }}
          >
            {cardImpactLine}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
            {types.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="text-ui-sm"
                style={{
                  color:        'var(--color-text-muted)',
                  border:       '1px solid var(--color-border)',
                  padding:      '3px 10px',
                  borderRadius: '4px',
                  whiteSpace:   'nowrap',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

      </article>
    </Link>
  )
}
