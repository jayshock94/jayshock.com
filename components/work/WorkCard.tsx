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
          borderRadius:  '20px',
          overflow:      'hidden',
          border:        `1px solid rgba(${r},${g},${b},${hovered ? 0.22 : 0.10})`,
          transform:     hovered ? 'translateY(-5px)' : 'translateY(0)',
          boxShadow:     hovered ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
          transition:    'transform 0.30s cubic-bezier(0.16,1,0.3,1), box-shadow 0.30s ease, border-color 0.25s ease',
        }}
      >

        {/* ── Zone 1: Hero color band ─────────────────────────────────────
            Mirrors the case study hero: same heroZone color, white title,
            white chips. When the user clicks, this color expands to fill
            the entire hero section — the visual bridge. */}
        <div
          style={{
            background:    heroZone,
            padding:       '22px 22px 20px',
            display:       'flex',
            flexDirection: 'column',
            minHeight:     '210px',
          }}
        >
          {/* Eyebrow + year */}
          <div
            style={{
              display:         'flex',
              justifyContent:  'space-between',
              alignItems:      'baseline',
              marginBottom:    '10px',
            }}
          >
            <p className="text-label" style={{ color: 'rgba(255,255,255,0.60)' }}>
              {eyebrow}
            </p>
            <p className="text-label" style={{ color: 'rgba(255,255,255,0.40)' }}>
              {year}
            </p>
          </div>

          {/* Title — white, prominent, grows to fill available space */}
          <h3
            style={{
              color:         '#ffffff',
              fontFamily:    'var(--font-outfit), system-ui, sans-serif',
              fontSize:      '20px',
              fontWeight:    700,
              lineHeight:    1.28,
              letterSpacing: '-0.01em',
              flex:          1,
              marginBottom:  '0',
            }}
          >
            {title}
          </h3>

          {/* Type chips — same style as case study hero chips */}
          {types.length > 0 && (
            <div
              style={{
                display:   'flex',
                flexWrap:  'wrap',
                gap:       '6px',
                marginTop: '16px',
              }}
            >
              {types.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="text-ui-sm"
                  style={{
                    color:           '#ffffff',
                    border:          '1.5px solid rgba(255,255,255,0.38)',
                    backgroundColor: 'rgba(255,255,255,0.12)',
                    padding:         '4px 10px',
                    borderRadius:    '4px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ── Zone 2: App preview + content ───────────────────────────────
            Canvas-colored surface. The cardImage fades in from the top
            via CSS mask, blending naturally into the canvas. Impact line
            and role/view-project below. */}
        <div
          className="flex flex-col flex-1"
          style={{ background: 'var(--color-canvas)' }}
        >
          {/* App screenshot — masked at top to dissolve into canvas */}
          <div
            style={{
              position:             'relative',
              height:               '170px',
              overflow:             'hidden',
              WebkitMaskImage:      'linear-gradient(to bottom, transparent 0%, black 32%)',
              maskImage:            'linear-gradient(to bottom, transparent 0%, black 32%)',
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

          {/* Impact line + meta */}
          <div style={{ padding: '0 22px 22px', marginTop: '-8px' }}>
            <p
              className="text-body-sm"
              style={{
                color:        'var(--color-text-muted)',
                lineHeight:   1.65,
                marginBottom: '16px',
              }}
            >
              {cardImpactLine}
            </p>

            <div
              style={{
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'space-between',
              }}
            >
              <span className="text-label" style={{ color: 'var(--color-text-muted)' }}>
                {role}
              </span>
              <span
                className="text-label"
                style={{
                  color:      hovered ? heroZone : 'var(--color-text-muted)',
                  transition: 'color 0.20s ease',
                }}
              >
                View project →
              </span>
            </div>
          </div>
        </div>

      </article>
    </Link>
  )
}
