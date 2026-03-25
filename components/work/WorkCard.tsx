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

  const { slug, title, cardImage, types, brandColorHex } = caseStudy
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
          border:       `1px solid ${hovered ? tokens.border : 'var(--color-border)'}`,
          background:   'var(--color-surface)',
          transform:    hovered ? 'translateY(-4px)' : 'translateY(0)',
          boxShadow:    hovered ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
          transition:   'transform 0.30s cubic-bezier(0.16,1,0.3,1), box-shadow 0.30s ease, border-color 0.25s ease',
        }}
      >

        {/* ── Image zone ──────────────────────────────────────────────────
            Large image area on a light brand-tinted surface.
            The tint mirrors the case study's brand at a whisper —
            enough to differentiate cards, not enough to fight the site palette. */}
        <div
          style={{
            position:   'relative',
            height:     '280px',
            background: tokens.bg,
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

          {/* Subtle bottom fade into the brand tint surface */}
          <div
            aria-hidden="true"
            style={{
              position:   'absolute',
              bottom:     0,
              left:       0,
              right:      0,
              height:     '80px',
              background: `linear-gradient(to top, ${tokens.bg}, transparent)`,
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* ── Text zone ───────────────────────────────────────────────────
            Clean, neutral. Title + type tags. That's it.
            Recruiters scanning get: what does it look like, what is it,
            what kind of work. */}
        <div
          style={{
            padding:    '20px 22px 22px',
            display:    'flex',
            flexDirection: 'column',
            gap:        '12px',
            flex:       1,
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

          {/* Type tags — pushed to bottom */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
            {types.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="text-ui-sm"
                style={{
                  color:           tokens.label,
                  border:          `1px solid ${tokens.border}`,
                  backgroundColor: tokens.bg,
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
