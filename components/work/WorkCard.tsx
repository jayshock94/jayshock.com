import Link from 'next/link'
import Image from 'next/image'
import type { CaseStudy } from '@/data/types'

interface WorkCardProps {
  caseStudy: CaseStudy
  cardImageSlot?: React.ReactNode
  imagePosition?: 'left' | 'right'
}

export default function WorkCard({
  caseStudy,
  cardImageSlot,
  imagePosition = 'right',
}: WorkCardProps) {
  const {
    slug, title, eyebrow, cardEyebrow, cardImpactLine,
    cardDescription, cardStat, cardImage, comingSoon,
  } = caseStudy

  const displayEyebrow = cardEyebrow ?? eyebrow
  const hasImage       = !!(cardImageSlot || cardImage)
  const textFirst      = imagePosition === 'right'

  const descriptionStyle = {
    fontSize:      'var(--text-body-md-size)',
    fontWeight:    'var(--text-body-md-weight)',
    lineHeight:    'var(--text-body-md-line-height)',
    letterSpacing: 'var(--text-body-md-tracking)',
    color:         'var(--color-text-secondary)',
    margin:        0,
  } as const

  // Text column — flat flex-column, stat anchors to bottom via margin-top: auto
  const textColumn = (
    <div
      style={{
        flex:          '1 0 0',
        display:       'flex',
        flexDirection: 'column',
        paddingTop:    'var(--space-component-lg)',
        paddingBottom: 'var(--space-component-lg)',
        paddingLeft:   textFirst ? 'var(--space-component-lg)' : '0',
        paddingRight:  textFirst ? '0'   : 'var(--space-component-lg)',
        minWidth:      0,
      }}
    >
      {/* Header — eyebrow, headline, description */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-component-sm)' }}>
        <p className="text-ui-sm text-[var(--color-text-muted)]" style={{ margin: 0 }}>{displayEyebrow}</p>
        <p className="text-h4 text-[var(--color-ink)]" style={{ margin: 0 }}>{cardImpactLine}</p>
        {cardDescription && (
          <p style={descriptionStyle}>{cardDescription}</p>
        )}
      </div>

      {/* Stat — pushed to bottom, guaranteed 24px gap above */}
      {cardStat && (
        <div
          style={{
            display:       'flex',
            flexDirection: 'column',
            alignItems:    textFirst ? 'flex-start' : 'flex-end',
            flexShrink:    0,
            marginTop:     'auto',
            paddingTop:    'var(--space-component-lg)',
          }}
        >
          <p className="text-h1 text-[var(--color-ink)]" style={{ fontWeight: 500, margin: 0 }}>{cardStat.value}</p>
          <p className="text-label text-[var(--color-text-secondary)]" style={{ fontWeight: 500, margin: 0 }}>{cardStat.label}</p>
        </div>
      )}
    </div>
  )

  // Image column
  const imageColumn = hasImage ? (
    <div
      style={{
        flex:     '1 0 0',
        position: 'relative',
        overflow: 'hidden',
        minWidth: 0,
      }}
    >
      {cardImageSlot ? (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          {cardImageSlot}
        </div>
      ) : cardImage ? (
        <Image
          src={cardImage}
          alt={title}
          fill
          sizes="50vw"
          style={{ objectFit: 'cover', objectPosition: 'top center' }}
        />
      ) : null}
    </div>
  ) : null

  const cardContent = (
    <article
      className={comingSoon ? '' : 'work-card work-card-glass'}
      style={{
        position:             'relative',
        borderRadius:         'var(--radius-lg)',
        overflow:             'hidden',
        background:           `linear-gradient(180deg, var(--glass-ultra-thin) 0%, var(--color-hover-subtle) 50%, transparent 100%), var(--color-hover-subtle)`,
        backdropFilter:       'blur(48px) saturate(180%)',
        WebkitBackdropFilter: 'blur(48px) saturate(180%)',
        cursor:               comingSoon ? 'default' : 'pointer',
      }}
    >
      {/* Desktop: side-by-side, grows with content, min 286px */}
      <div
        className="hidden md:flex"
        style={{
          minHeight:  '286px',
          alignItems: 'stretch',
          gap:        'clamp(40px, 5vw, 80px)',
        }}
      >
        {textFirst ? textColumn : imageColumn}
        {textFirst ? imageColumn : textColumn}
      </div>

      {/* Mobile: stacked */}
      <div className="flex flex-col md:hidden">
        <div style={{ padding: 'var(--space-component-lg)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-component-sm)', marginBottom: 'var(--space-component-lg)' }}>
            <p className="text-ui-sm text-[var(--color-text-muted)]" style={{ margin: 0 }}>{displayEyebrow}</p>
            <p className="text-intro text-[var(--color-ink)]" style={{ fontWeight: 500, margin: 0 }}>
              {cardImpactLine}
            </p>
            {cardDescription && (
              <p className="text-body text-[var(--color-text-secondary)]" style={{ margin: 0 }}>
                {cardDescription}
              </p>
            )}
          </div>

          {cardStat && (
            <div>
              <p className="text-h2 text-[var(--color-ink)]" style={{ fontWeight: 500, margin: 0 }}>
                {cardStat.value}
              </p>
              <p className="text-label text-[var(--color-text-secondary)]" style={{ fontWeight: 500, margin: 0 }}>{cardStat.label}</p>
            </div>
          )}

        </div>

        {hasImage && (
          <div style={{ position: 'relative', width: '100%', height: '220px', overflow: 'hidden' }}>
            {cardImageSlot ? (
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                {cardImageSlot}
              </div>
            ) : cardImage ? (
              <Image
                src={cardImage}
                alt={title}
                fill
                sizes="100vw"
                style={{ objectFit: 'cover', objectPosition: 'top center' }}
              />
            ) : null}
          </div>
        )}
      </div>
    </article>
  )

  if (comingSoon) {
    return <div>{cardContent}</div>
  }

  return (
    <Link href={`/work/${slug}`} className="block" style={{ textDecoration: 'none' }}>
      {cardContent}
    </Link>
  )
}
