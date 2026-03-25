'use client'

import { useState } from 'react'
import Link  from 'next/link'
import Image from 'next/image'
import type { CaseStudy } from '@/data/types'
import { generateTokens } from '@/lib/colorAlgorithm'

interface WorkCardProps {
  caseStudy: CaseStudy
}

export default function WorkCard({ caseStudy }: WorkCardProps) {
  const [hovered, setHovered] = useState(false)

  const { slug, title, cardImage, cardImpactLine, types, brandColorHex } = caseStudy
  const { heroZone } = generateTokens(brandColorHex)

  return (
    <Link href={`/work/${slug}`} className="block h-full" style={{ textDecoration: 'none' }}>
      <article
        className="flex flex-col h-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: '16px',
          overflow:     'hidden',
          border:       `1px solid var(--color-border)`,
          background:   'var(--color-surface)',
          transform:    hovered ? 'translateY(-4px)' : 'translateY(0)',
          boxShadow:    hovered ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
          transition:   'transform 0.30s cubic-bezier(0.16,1,0.3,1), box-shadow 0.30s ease',
        }}
      >

        {/* ── Image zone ──────────────────────────────────────────────────
            heroZone background — the exact color from the case study hero.
            Image sits on top. Bottom edge fades into the color so the
            screenshot feels placed, not clipped. */}
        <div
          style={{
            position:   'relative',
            height:     '260px',
            background: heroZone,
            overflow:   'hidden',
          }}
        >
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
              background:    `linear-gradient(to top, ${heroZone}, transparent)`,
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* ── Text zone ───────────────────────────────────────────────────
            Neutral surface. Title is the headline. Impact line is the hook —
            the one sentence that makes a recruiter want to read more.
            Tags ground the type of work. */}
        <div
          style={{
            padding:       '20px 22px 22px',
            display:       'flex',
            flexDirection: 'column',
            gap:           '10px',
            flex:          1,
          }}
        >
          {/* Title */}
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

          {/* Impact line — the hook */}
          <p
            className="text-body-sm"
            style={{
              color:      'var(--color-text-secondary)',
              lineHeight: 1.55,
            }}
          >
            {cardImpactLine}
          </p>

          {/* Type tags — anchored to bottom */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
            {types.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="text-ui-sm"
                style={{
                  color:           'var(--color-text-muted)',
                  border:          '1px solid var(--color-border)',
                  padding:         '3px 10px',
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
