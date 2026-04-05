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

  const eyebrowStyle = {
    fontFamily:    'var(--font-outfit), system-ui, sans-serif',
    fontSize:      '12px',
    fontWeight:    500,
    lineHeight:    '16px',
    letterSpacing: '0.5px',
    color:         'var(--color-text-muted)',
    margin:        0,
  } as const

  const headlineStyle = {
    fontFamily:    'var(--font-outfit), system-ui, sans-serif',
    fontSize:      '22px',
    fontWeight:    500,
    lineHeight:    '28px',
    letterSpacing: '0px',
    color:         'var(--color-ink)',
    margin:        0,
  } as const

  const descriptionStyle = {
    fontFamily:    'var(--font-outfit), system-ui, sans-serif',
    fontSize:      '16px',
    fontWeight:    400,
    lineHeight:    '24px',
    letterSpacing: '0.5px',
    color:         'var(--color-text-secondary)',
    margin:        0,
  } as const

  const statValueStyle = {
    fontFamily:    'var(--font-outfit), system-ui, sans-serif',
    fontSize:      '32px',
    fontWeight:    500,
    lineHeight:    '40px',
    letterSpacing: '0px',
    color:         'var(--color-ink)',
    margin:        0,
  } as const

  const statLabelStyle = {
    fontFamily:    'var(--font-outfit), system-ui, sans-serif',
    fontSize:      '11px',
    fontWeight:    500,
    lineHeight:    '16px',
    letterSpacing: '0.5px',
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
        paddingTop:    '24px',
        paddingBottom: '24px',
        paddingLeft:   textFirst ? '24px' : '0',
        paddingRight:  textFirst ? '0'   : '24px',
        minWidth:      0,
      }}
    >
      {/* Header — eyebrow, headline, description */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={eyebrowStyle}>{displayEyebrow}</p>
        <p style={headlineStyle}>{cardImpactLine}</p>
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
            paddingTop:    '24px',
          }}
        >
          <p style={statValueStyle}>{cardStat.value}</p>
          <p style={statLabelStyle}>{cardStat.label}</p>
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
        borderRadius:         '16px',
        overflow:             'hidden',
        background:           `linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 50%, transparent 100%), rgba(255,255,255,0.04)`,
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
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
            <p style={eyebrowStyle}>{displayEyebrow}</p>
            <p
              style={{
                fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                fontSize:   '20px',
                fontWeight: 500,
                lineHeight: '26px',
                color:      'var(--color-ink)',
                margin:     0,
              }}
            >
              {cardImpactLine}
            </p>
            {cardDescription && (
              <p
                style={{
                  fontFamily:    'var(--font-outfit), system-ui, sans-serif',
                  fontSize:      '15px',
                  fontWeight:    400,
                  lineHeight:    '22px',
                  letterSpacing: '0.3px',
                  color:         'var(--color-text-secondary)',
                  margin:        0,
                }}
              >
                {cardDescription}
              </p>
            )}
          </div>

          {cardStat && (
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                  fontSize:   '28px',
                  fontWeight: 500,
                  lineHeight: '36px',
                  color:      'var(--color-ink)',
                  margin:     0,
                }}
              >
                {cardStat.value}
              </p>
              <p style={statLabelStyle}>{cardStat.label}</p>
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
