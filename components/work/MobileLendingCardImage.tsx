import Image from 'next/image'

/**
 * Static two-phone composition for the mobile-lending WorkCard.
 * Mirrors the hero layout (payment screen + loan dashboard)
 * but at card scale and without animation.
 */
export default function MobileLendingCardImage() {
  return (
    <div
      style={{
        position:       'relative',
        display:        'flex',
        alignItems:     'flex-end',
        justifyContent: 'center',
        width:          '100%',
        height:         '100%',
        paddingTop:     '32px',
        paddingBottom:  '16px',
      }}
    >
      {/* Secondary phone — payment confirmation, slightly behind */}
      <div
        style={{
          position:     'relative',
          width:        '120px',
          height:       '260px',
          borderRadius: '20px',
          overflow:     'hidden',
          flexShrink:   0,
          marginRight:  '-16px',
          marginBottom: '12px',
          transform:    'rotate(-4deg)',
          boxShadow:    '0 16px 48px rgba(0,0,0,0.30), 0 0 0 1px rgba(255,255,255,0.10)',
          zIndex:       1,
        }}
      >
        <Image
          src="/images/mobile/Lendmark.png"
          alt="Payment confirmation screen"
          fill
          sizes="120px"
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
      </div>

      {/* Main phone — loan dashboard, dominant, front */}
      <div
        style={{
          position:     'relative',
          width:        '130px',
          height:       '280px',
          borderRadius: '20px',
          overflow:     'hidden',
          flexShrink:   0,
          transform:    'rotate(2deg)',
          boxShadow:    '0 20px 56px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.12)',
          zIndex:       2,
        }}
      >
        <Image
          src="/images/mobile/Lendmark account overview.png"
          alt="Loan dashboard — account overview"
          fill
          sizes="130px"
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
      </div>
    </div>
  )
}
