'use client'

import { useState } from 'react'
import Link  from 'next/link'
import Image from 'next/image'
import type { CaseStudy } from '@/data/types'
import { generateTokens } from '@/lib/colorAlgorithm'

interface WorkCardProps {
  caseStudy: CaseStudy
  cardImageSlot?: React.ReactNode
}

export default function WorkCard({ caseStudy, cardImageSlot }: WorkCardProps) {
  const [hovered, setHovered] = useState(false)

  const { slug, title, company, cardImage, cardImpactLine, brandColorHex, types, comingSoon } = caseStudy
  const tokens = generateTokens(brandColorHex)

  const hasImage = !!(cardImageSlot || cardImage)

  const cardContent = (
      <article
        className="work-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position:              'relative',
          borderRadius:          '16px',
          overflow:              'hidden',
          background:            tokens.heroZone,
          border:                `0.5px solid ${hovered && !comingSoon ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)'}`,
          boxShadow: hovered && !comingSoon
            ? '0 12px 48px rgba(0,0,0,0.3)'
            : '0 4px 24px rgba(0,0,0,0.15)',
          transform:             hovered && !comingSoon ? 'translateY(-3px)' : 'translateY(0)',
          cursor:                comingSoon ? 'default' : 'pointer',
          transition:            'transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s ease, border-color 0.2s ease',
        }}
      >
        {/* ── Desktop: image layer on right side ── */}
        {hasImage && (
          <div
            className="hidden md:block"
            style={{
              position: 'absolute',
              top:      0,
              right:    0,
              bottom:   0,
              width:    '48%',
            }}
          >
            {cardImageSlot ? (
              cardImageSlot
            ) : cardImage ? (
              <Image
                src={cardImage}
                alt={title}
                fill
                sizes="50vw"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
              />
            ) : null}
          </div>
        )}

        {/* ── Content: text + mobile image + CTA ── */}
        <div
          className={hasImage ? 'md:w-[52%]' : ''}
          style={{
            padding:        'clamp(24px, 4vw, 40px)',
            display:        'flex',
            flexDirection:  'column',
            justifyContent: 'center',
            position:       'relative',
            zIndex:         2,
            minHeight:      'clamp(280px, 30vw, 360px)',
          }}
        >
          <span
            className="text-label"
            style={{
              color:        'rgba(255,255,255,0.5)',
              marginBottom: 'var(--space-stack-sm)',
            }}
          >
            {company}
          </span>

          <h3
            style={{
              fontFamily:    'var(--font-outfit), system-ui, sans-serif',
              fontSize:      'clamp(22px, 3vw, 32px)',
              fontWeight:    600,
              lineHeight:    1.15,
              letterSpacing: '-0.01em',
              color:         '#fff',
              marginBottom:  'var(--space-stack-sm)',
            }}
          >
            {title}
          </h3>

          <p
            className="text-body-sm"
            style={{
              color:        'rgba(255,255,255,0.6)',
              lineHeight:   1.65,
              marginBottom: 'var(--space-stack-sm)',
            }}
          >
            {cardImpactLine}
          </p>

          <div
            style={{
              display:  'flex',
              flexWrap: 'wrap',
              gap:      '6px',
            }}
          >
            {types.slice(0, 4).map((type) => (
              <span
                key={type}
                style={{
                  padding:      '4px 12px',
                  borderRadius: '999px',
                  border:       '0.5px solid rgba(255,255,255,0.12)',
                  background:   'rgba(255,255,255,0.04)',
                  fontFamily:   'var(--font-outfit), system-ui, sans-serif',
                  fontSize:     '11px',
                  fontWeight:   400,
                  color:        'rgba(255,255,255,0.45)',
                  lineHeight:   1,
                }}
              >
                {type}
              </span>
            ))}
          </div>

          <span
            className="text-ui-md"
            style={{
              color:      '#fff',
              display:    'inline-flex',
              alignItems: 'center',
              gap:        'var(--space-component-xs)',
              marginTop:  'var(--space-component-lg)',
              transition: 'gap 0.2s ease',
              ...(hovered ? { gap: 'var(--space-component-sm)' } : {}),
            }}
          >
            {comingSoon ? 'Coming soon' : 'View case study'}
            {!comingSoon && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M5.25 3.5L8.75 7L5.25 10.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
        </div>

        {/* ── Mobile image — bleeds from bottom edge ── */}
        {hasImage && (
          <div
            className="md:hidden"
            style={{
              position:  'relative',
              width:     '100%',
              height:    '220px',
              overflow:  'hidden',
            }}
          >
            {cardImageSlot ? (
              cardImageSlot
            ) : cardImage ? (
              <Image
                src={cardImage}
                alt={title}
                fill
                sizes="100vw"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
              />
            ) : null}
          </div>
        )}
      </article>
  )

  if (comingSoon) {
    return <div className="block" style={{ textDecoration: 'none' }}>{cardContent}</div>
  }

  return (
    <Link href={`/work/${slug}`} className="block" style={{ textDecoration: 'none' }}>
      {cardContent}
    </Link>
  )
}
