'use client'

import { useState } from 'react'
import Link  from 'next/link'
import Image from 'next/image'
import type { CaseStudy } from '@/data/types'
import { generateTokens } from '@/lib/colorAlgorithm'

interface WorkCardProps {
  caseStudy: CaseStudy
}

function hexToRGB(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ]
}

export default function WorkCard({ caseStudy }: WorkCardProps) {
  const [hovered, setHovered] = useState(false)

  const { slug, eyebrow, title, cardImpactLine, brandColorHex, year, cardImage, types, role } = caseStudy
  const { heroZone } = generateTokens(brandColorHex)
  const [r, g, b] = hexToRGB(heroZone)

  return (
    <Link href={`/work/${slug}`} className="block h-full" style={{ textDecoration: 'none' }}>
      <article
        className="flex flex-col h-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: '20px',
          overflow:     'hidden',
          border:       `1px solid rgba(${r},${g},${b},${hovered ? 0.22 : 0.10})`,
          transform:    hovered ? 'translateY(-5px)' : 'translateY(0)',
          boxShadow:    hovered ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
          transition:   'transform 0.30s cubic-bezier(0.16,1,0.3,1), box-shadow 0.30s ease, border-color 0.25s ease',
        }}
      >

        {/* ── Zone 1: App screenshot (top) ──────────────────────────────────
            Image fills the top of the card. The bottom edge is masked out
            so it dissolves into the heroZone color below — no hard seam. */}
        <div
          style={{
            position:        'relative',
            height:          '210px',
            overflow:        'hidden',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 38%)',
            maskImage:       'linear-gradient(to top, transparent 0%, black 38%)',
          }}
        >
          <Image
            src={cardImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
          />
        </div>

        {/* ── Zone 2: Hero color band (bottom) ─────────────────────────────
            Same heroZone color as the case study hero. White text, same
            chips. The image above dissolves into this color. When the user
            clicks, this color expands to fill the hero section. */}
        <div
          className="flex flex-col flex-1"
          style={{
            background:    heroZone,
            padding:       '18px 22px 22px',
          }}
        >
          {/* Eyebrow + year */}
          <div
            style={{
              display:        'flex',
              justifyContent: 'space-between',
              alignItems:     'baseline',
              marginBottom:   '8px',
            }}
          >
            <p className="text-label" style={{ color: 'rgba(255,255,255,0.60)' }}>
              {eyebrow}
            </p>
            <p className="text-label" style={{ color: 'rgba(255,255,255,0.40)' }}>
              {year}
            </p>
          </div>

          {/* Title */}
          <h3
            style={{
              color:         '#ffffff',
              fontFamily:    'var(--font-outfit), system-ui, sans-serif',
              fontSize:      '19px',
              fontWeight:    700,
              lineHeight:    1.28,
              letterSpacing: '-0.01em',
              marginBottom:  '10px',
            }}
          >
            {title}
          </h3>

          {/* Impact line */}
          <p
            className="text-body-sm"
            style={{
              color:        'rgba(255,255,255,0.70)',
              lineHeight:   1.60,
              flex:         1,
              marginBottom: '14px',
            }}
          >
            {cardImpactLine}
          </p>

          {/* Bottom row: chips left, view project right */}
          <div
            style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'space-between',
              gap:            '8px',
            }}
          >
            {/* Type chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {types.slice(0, 2).map(tag => (
                <span
                  key={tag}
                  className="text-ui-sm"
                  style={{
                    color:           '#ffffff',
                    border:          '1.5px solid rgba(255,255,255,0.35)',
                    backgroundColor: 'rgba(255,255,255,0.10)',
                    padding:         '3px 9px',
                    borderRadius:    '4px',
                    whiteSpace:      'nowrap',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* View project */}
            <span
              className="text-label"
              style={{
                color:      'rgba(255,255,255,0.70)',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'color 0.20s ease',
                opacity:    hovered ? 1 : 0.70,
              }}
            >
              View project →
            </span>
          </div>
        </div>

      </article>
    </Link>
  )
}
