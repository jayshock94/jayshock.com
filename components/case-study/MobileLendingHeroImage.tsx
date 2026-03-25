import Image from 'next/image'

/**
 * Hero image for the Mobile Lending Management case study.
 * Shows three white-label instances of the same app — Lendmark, Heights Finance, Sheffield —
 * demonstrating the "same codebase, different brands" story at a glance.
 */
export default function MobileLendingHeroImage() {
  const PHONE_RADIUS = '18px'

  const sidePhone: React.CSSProperties = {
    position:     'relative',
    width:        '108px',
    height:       '233px',
    borderRadius: PHONE_RADIUS,
    overflow:     'hidden',
    flexShrink:   0,
    alignSelf:    'center',
    boxShadow:    'var(--shadow-card)',
  }

  const centerPhone: React.CSSProperties = {
    position:     'relative',
    width:        '130px',
    height:       '281px',
    borderRadius: PHONE_RADIUS,
    overflow:     'hidden',
    flexShrink:   0,
    boxShadow:    'var(--shadow-card-hover)',
  }

  return (
    <div
      style={{
        width:           '100%',
        height:          '100%',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        gap:             'var(--space-component-md)',
        backgroundColor: 'var(--color-canvas)',
      }}
    >
      {/* Heights Finance — left */}
      <div style={sidePhone}>
        <Image
          src="/images/mobile/Heights.png"
          alt="Heights Finance — white-label instance"
          fill
          sizes="108px"
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
      </div>

      {/* Lendmark — center, featured */}
      <div style={centerPhone}>
        <Image
          src="/images/mobile/Lendmark.png"
          alt="Lendmark Financial Services — white-label instance"
          fill
          sizes="130px"
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
      </div>

      {/* Sheffield Financial — right */}
      <div style={sidePhone}>
        <Image
          src="/images/mobile/Sheffield.png"
          alt="Sheffield Financial — white-label instance"
          fill
          sizes="108px"
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
      </div>
    </div>
  )
}
