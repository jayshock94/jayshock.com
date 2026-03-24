'use client'

import { useState } from 'react'
import Link  from 'next/link'
import Image from 'next/image'
import type { CaseStudy } from '@/data/types'

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

function deriveTokens(hex: string) {
  const [r, g, b] = hexToRGB(hex)

  return {
    // Very faint flat tint across the whole card — barely a whisper of the brand hue
    flatTint:    `linear-gradient(rgba(${r},${g},${b},0.02), rgba(${r},${g},${b},0.02))`,
    // Radial glow from the bottom — brand color bleeds up from image area
    radialGlow:  `radial-gradient(ellipse 110% 55% at 50% 100%, rgba(${r},${g},${b},0.11) 0%, transparent 70%)`,
    border:      `rgba(${r}, ${g}, ${b}, 0.14)`,
    borderHover: `rgba(${r}, ${g}, ${b}, 0.26)`,
  }
}

export default function WorkCard({ caseStudy }: WorkCardProps) {
  const [hovered, setHovered] = useState(false)

  const { slug, eyebrow, title, cardImpactLine, brandColorHex, year, cardImage } = caseStudy
  const tokens = deriveTokens(brandColorHex)

  return (
    <article
      className="flex flex-col h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor:      'var(--color-surface)',
        backgroundImage:      `${tokens.radialGlow}, ${tokens.flatTint}`,
        backdropFilter:       'blur(20px) saturate(140%)',
        WebkitBackdropFilter: 'blur(20px) saturate(140%)',
        border:               `0.5px solid ${hovered ? tokens.borderHover : tokens.border}`,
        borderRadius:         '16px',
        overflow:             'hidden',
        transform:            hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow:            hovered ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
        transition:           'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
      }}
    >
      {/* Content */}
      <div className="p-[28px] pb-[24px]">

        <div className="flex items-center justify-between mb-[14px]">
          <p className="text-label text-[var(--color-text-muted)]">{eyebrow}</p>
          <p className="text-label text-[var(--color-text-muted)] opacity-60">{year}</p>
        </div>

        <h3
          className="text-[var(--color-ink)] mb-[10px]"
          style={{
            fontFamily:    'var(--font-outfit), system-ui, sans-serif',
            fontSize:      '20px',
            fontWeight:    700,
            lineHeight:    1.25,
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </h3>

        <p
          className="text-[var(--color-text-muted)]"
          style={{
            fontFamily: 'var(--font-outfit), system-ui, sans-serif',
            fontSize:   '13px',
            fontWeight: 300,
            lineHeight: 1.65,
          }}
        >
          {cardImpactLine}
        </p>
      </div>

      {/* Image well — CSS mask fades top edge to transparent so card bg shows through */}
      <div
        className="relative mt-auto"
        style={{
          height:                '220px',
          overflow:              'hidden',
          WebkitMaskImage:       'linear-gradient(to bottom, transparent 0%, black 28%)',
          maskImage:             'linear-gradient(to bottom, transparent 0%, black 28%)',
        }}
      >
        <Image
          src={cardImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
        />

        {/* Bottom scrim */}
        <div
          style={{
            position:      'absolute',
            inset:         0,
            background:    'linear-gradient(to top, var(--color-scrim-heavy) 0%, var(--color-scrim-mid) 30%, var(--color-scrim-soft) 55%, transparent 75%)',
            pointerEvents: 'none',
          }}
        />

        <Link
          href={`/work/${slug}`}
          className="glass-pill absolute left-1/2 -translate-x-1/2 bottom-[16px] whitespace-nowrap"
          style={{
            color:          'rgba(255, 255, 255, 0.92)',
            fontFamily:     'var(--font-outfit), system-ui, sans-serif',
            fontSize:       '13px',
            fontWeight:     400,
            padding:        '10px 24px',
            borderRadius:   '40px',
            textDecoration: 'none',
            display:        'block',
          }}
        >
          View project
        </Link>
      </div>
    </article>
  )
}
