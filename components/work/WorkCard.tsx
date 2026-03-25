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
          borderRadius:          '16px',
          overflow:              'hidden',
          // Glass surface — brand-tinted semi-transparent background
          background:            `rgba(${r},${g},${b},0.08)`,
          backdropFilter:        'blur(48px) saturate(180%)',
          WebkitBackdropFilter:  'blur(48px) saturate(180%)',
          // Brand-tinted border like the nav's glass edge
          border:                `0.5px solid rgba(${r},${g},${b},${hovered ? 0.30 : 0.15})`,
          // Inset top highlight + elevation shadow — same recipe as nav
          boxShadow:             hovered
            ? `0 16px 48px rgba(${r},${g},${b},0.12), inset 0 1px 0 rgba(255,255,255,0.12)`
            : `0 2px 24px rgba(${r},${g},${b},0.06), inset 0 1px 0 rgba(255,255,255,0.08)`,
          transform:             hovered ? 'translateY(-5px)' : 'translateY(0)',
          transition:            'transform 0.30s cubic-bezier(0.16,1,0.3,1), box-shadow 0.30s ease, border-color 0.25s ease',
        }}
      >

        {/* ── Image zone ────────────────────────────────────────────────── */}
        <div
          style={{
            position:   'relative',
            height:     '280px',
            background: tokens.heroZone,
            overflow:   'hidden',
          }}
        >
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
            className="text-h3"
            style={{
              color:         'var(--color-text-primary)',
              letterSpacing: '-0.01em',
            }}
          >
            {title}
          </h3>

          <p
            className="text-body"
            style={{
              color:      'var(--color-text-secondary)',
              lineHeight: 1.6,
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
                  color:           'var(--color-text-muted)',
                  border:          `0.5px solid rgba(${r},${g},${b},0.15)`,
                  backgroundColor: `rgba(${r},${g},${b},0.06)`,
                  padding:         '4px 10px',
                  borderRadius:    '4px',
                  whiteSpace:      'nowrap',
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
