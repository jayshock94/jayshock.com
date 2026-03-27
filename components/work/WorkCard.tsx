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

  const { slug, title, company, cardImage, cardImpactLine, types, brandColorHex } = caseStudy
  const tokens = generateTokens(brandColorHex)
  const [r, g, b] = hexToRGB(tokens.heroZone)

  return (
    <Link href={`/work/${slug}`} className="block h-full" style={{ textDecoration: 'none' }}>
      <article
        className="work-card flex flex-col h-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius:          '16px',
          overflow:              'hidden',
          /* Glass shell — matches nav card */
          background:            'var(--color-nav-card-bg)',
          backdropFilter:        'blur(48px) saturate(180%)',
          WebkitBackdropFilter:  'blur(48px) saturate(180%)',
          /* Site glass border — brightens on hover */
          border:                `0.5px solid ${hovered ? 'rgba(255,255,255,0.25)' : 'var(--color-nav-card-border)'}`,
          /* Lift + glow on hover */
          boxShadow: hovered
            ? `0 12px 40px rgba(28,25,23,0.18), inset 0 1px 0 rgba(255,255,255,0.90)`
            : `0 2px 24px rgba(28,25,23,0.06), inset 0 1px 0 var(--glass-border-light)`,
          transform:             hovered ? 'translateY(-3px)' : 'translateY(0)',
          cursor:                'pointer',
          transition:            'transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s ease, border-color 0.2s ease',
        }}
      >

        {/* ── Hero preview — brand color inset, mirrors case study hero ── */}
        <div
          style={{
            position:       'relative',
            margin:         'var(--space-component-base, 12px) var(--space-component-base, 12px) 0',
            borderRadius:   '10px',
            overflow:       'hidden',
            background:     tokens.heroZone,
            height:         'clamp(200px, 55vw, 260px)',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
          }}
        >
          <div className="work-card-image" style={{
            position:       'relative',
            width:          '100%',
            height:         '100%',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
          }}>
            {cardImageSlot ? (
              cardImageSlot
            ) : cardImage ? (
              <div style={{
                position:     'relative',
                width:        '88%',
                height:       '85%',
                borderRadius: '6px',
                overflow:     'hidden',
                boxShadow:    '0 8px 32px rgba(0,0,0,0.15)',
              }}>
                <Image
                  src={cardImage}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                />
              </div>
            ) : (
              <span
                style={{
                  fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                  fontSize: '13px',
                  fontWeight: 300,
                  color: `rgba(${r}, ${g}, ${b}, 0.4)`,
                  letterSpacing: '0.02em',
                  textAlign: 'center',
                }}
              >
                Hero image goes here
              </span>
            )}
          </div>

          {/* Subtle vignette at bottom of hero zone */}
          <div
            aria-hidden="true"
            style={{
              position:      'absolute',
              bottom:        0,
              left:          0,
              right:         0,
              height:        '60px',
              background:    'linear-gradient(to top, rgba(0,0,0,0.12), transparent)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* ── Info zone — sits on glass ──────────────────────────────── */}
        <div
          style={{
            padding:       'var(--space-component-md) var(--space-component-lg) var(--space-component-lg)',
            display:       'flex',
            flexDirection: 'column',
            flex:          1,
          }}
        >
          {/* Eyebrow → heading: --space-stack-xs (6px) */}
          <span
            className="text-label"
            style={{
              color:        'var(--color-text-muted)',
              marginBottom: 'var(--space-stack-xs)',
            }}
          >
            {company}
          </span>

          {/* Heading → body: --space-stack-md (24px) */}
          <h3
            className="text-h3"
            style={{
              color:         'var(--color-text-primary)',
              letterSpacing: '-0.01em',
              marginBottom:  'var(--space-stack-md)',
            }}
          >
            {title}
          </h3>

          <p
            className="text-body-sm"
            style={{
              color:           'var(--color-text-secondary)',
              lineHeight:      1.6,
              display:         '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow:        'hidden',
            }}
          >
            {cardImpactLine}
          </p>

          {/* CTA — visual affordance, especially for mobile */}
          <span
            className="text-ui-md"
            style={{
              color:         'var(--color-text-muted)',
              display:       'inline-flex',
              alignItems:    'center',
              gap:           'var(--space-component-xs)',
              marginTop:     'auto',
              paddingTop:    'var(--space-component-md)',
              transition:    'color 0.2s ease, gap 0.2s ease',
              ...(hovered ? { color: 'var(--color-ink)', gap: 'var(--space-component-sm)' } : {}),
            }}
          >
            View project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M5.25 3.5L8.75 7L5.25 10.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

      </article>
    </Link>
  )
}
