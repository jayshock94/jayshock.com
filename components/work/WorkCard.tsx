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

  const {
    slug, title, company, cardImage, brandColorHex,
    types, comingSoon, year, role, cardRole, cardStat, cardImpactLine,
  } = caseStudy
  const tokens = generateTokens(brandColorHex)

  const hasImage = !!(cardImageSlot || cardImage)
  const displayRole = cardRole ?? role

  const cardContent = (
    <article
      className="work-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:   'relative',
        borderRadius: 'var(--radius-lg)',
        overflow:   'hidden',
        background: tokens.heroZone,
        border:     `0.5px solid ${hovered && !comingSoon ? 'var(--work-card-border-hover)' : 'var(--work-card-border)'}`,
        boxShadow:  hovered && !comingSoon ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
        transform:  hovered && !comingSoon ? 'translateY(-2px)' : 'translateY(0)',
        cursor:     comingSoon ? 'default' : 'pointer',
        transition: 'transform var(--transition-smooth), box-shadow var(--transition-base), border-color var(--transition-base)',
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

      {/* ── Content column ── */}
      <div
        className={hasImage ? 'md:w-[52%]' : ''}
        style={{
          padding:        'clamp(24px, 4vw, 40px)',
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'center',
          position:       'relative',
          zIndex:         2,
          minHeight:      'clamp(280px, 30vw, 380px)',
        }}
      >
        {/* Company · Year eyebrow */}
        <p
          className="text-label"
          style={{
            color:        'var(--work-card-eyebrow)',
            margin:       0,
            marginBottom: 'var(--space-stack-sm)',
          }}
        >
          {company} · {year}
        </p>

        {/* Hero stat */}
        {cardStat && (
          <div style={{ marginBottom: 'var(--space-stack-sm)' }}>
            <p
              style={{
                fontFamily:  'var(--font-outfit), system-ui, sans-serif',
                fontSize:    'clamp(44px, 6vw, 72px)',
                fontWeight:  700,
                lineHeight:  1,
                letterSpacing: '-0.02em',
                color:       'var(--hero-text-primary)',
                margin:      0,
              }}
            >
              {cardStat.value}
            </p>
            <p
              className="text-body-sm"
              style={{
                color:     'var(--work-card-stat-sub)',
                margin:    0,
                marginTop: '6px',
              }}
            >
              {cardStat.label}
            </p>
          </div>
        )}

        {/* Problem hook */}
        {cardImpactLine && (
          <p
            className="text-body"
            style={{
              color:        'var(--work-card-hook)',
              fontStyle:    'italic',
              margin:       0,
              marginBottom: 'var(--space-stack-sm)',
              lineHeight:   1.5,
            }}
          >
            {cardImpactLine}
          </p>
        )}

        {/* Title */}
        <h3
          className="text-h3"
          style={{
            fontWeight:   600,
            color:        'var(--hero-text-primary)',
            margin:       0,
            marginBottom: 'var(--space-stack-xs)',
          }}
        >
          {title}
        </h3>

        {/* Role — specific ownership scope */}
        <p
          className="text-body-sm"
          style={{
            color:        'var(--work-card-role)',
            lineHeight:   1.5,
            margin:       0,
            marginBottom: 'var(--space-stack-sm)',
          }}
        >
          {displayRole}
        </p>

        {/* Tags */}
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
                border:       '0.5px solid var(--work-card-tag-border)',
                background:   'var(--work-card-tag-bg)',
                fontFamily:   'var(--font-outfit), system-ui, sans-serif',
                fontSize:     '11px',
                fontWeight:   400,
                color:        'var(--work-card-tag-text)',
                lineHeight:   1,
              }}
            >
              {type}
            </span>
          ))}
        </div>

        {/* CTA */}
        <span
          className="text-ui-md"
          style={{
            color:      'var(--hero-text-primary)',
            display:    'inline-flex',
            alignItems: 'center',
            gap:        hovered ? 'var(--space-component-sm)' : 'var(--space-component-xs)',
            marginTop:  'var(--space-component-lg)',
            transition: 'gap var(--transition-base)',
          }}
        >
          {comingSoon ? 'Coming soon' : 'View case study'}
          {!comingSoon && (
            <svg className="work-card-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
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
            position: 'relative',
            width:    '100%',
            height:   '220px',
            overflow: 'hidden',
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
