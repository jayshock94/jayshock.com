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

export default function WorkCard({ caseStudy, cardImageSlot }: WorkCardProps) {
  const [hovered, setHovered] = useState(false)

  const { slug, title, cardImage, cardImpactLine, types, brandColorHex } = caseStudy
  const tokens = generateTokens(brandColorHex)

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
            heroZone background — the exact color from the case study hero.
            Either a custom composition (cardImageSlot) or a static image. */}
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

              {/* Bottom fade into heroZone color */}
              <div
                aria-hidden="true"
                style={{
                  position:      'absolute',
                  bottom:        0,
                  left:          0,
                  right:         0,
                  height:        '60px',
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
