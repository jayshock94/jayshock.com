import Image from 'next/image'

/**
 * Hero image for the Mobile Lending Management case study.
 * Three screens from the core borrower journey — angled and layered
 * so the dashboard dominates while the flow reads left to right.
 */
export default function MobileLendingHeroImage() {
  return (
    <div
      style={{
        width:    '100%',
        height:   '100%',
        display:  'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        overflow: 'hidden',
        // Brand-tinted radial glow up from the bottom — depth without hardcoded color
        background: `
          radial-gradient(ellipse 80% 60% at 50% 110%, var(--case-bg) 0%, transparent 70%),
          var(--color-canvas)
        `,
      }}
    >
      {/* Review payment — left, angled in */}
      <div
        style={{
          position:  'relative',
          width:     '128px',
          height:    '260px',
          flexShrink: 0,
          borderRadius: '18px 18px 0 0',
          overflow:  'hidden',
          marginRight: '-18px',
          transform: 'perspective(700px) rotateY(18deg) translateY(12px)',
          transformOrigin: 'right center',
          boxShadow: '-8px 16px 48px rgba(0,0,0,0.18)',
          zIndex:    1,
        }}
      >
        <Image
          src="/images/mobile/Account details-2.png"
          alt="Review payment screen"
          fill
          sizes="128px"
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
      </div>

      {/* Account overview — center, dominant */}
      <div
        style={{
          position:     'relative',
          width:        '158px',
          height:       '340px',
          flexShrink:   0,
          borderRadius: '18px 18px 0 0',
          overflow:     'hidden',
          boxShadow:    '0 24px 80px rgba(0,0,0,0.22)',
          zIndex:       3,
        }}
      >
        <Image
          src="/images/mobile/Lendmark account overview.png"
          alt="Loan dashboard — account overview"
          fill
          sizes="158px"
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
      </div>

      {/* Payment confirmation — right, angled in */}
      <div
        style={{
          position:  'relative',
          width:     '128px',
          height:    '260px',
          flexShrink: 0,
          borderRadius: '18px 18px 0 0',
          overflow:  'hidden',
          marginLeft: '-18px',
          transform: 'perspective(700px) rotateY(-18deg) translateY(12px)',
          transformOrigin: 'left center',
          boxShadow: '8px 16px 48px rgba(0,0,0,0.18)',
          zIndex:    1,
        }}
      >
        <Image
          src="/images/mobile/Account details-5.png"
          alt="Payment submitted successfully"
          fill
          sizes="128px"
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
      </div>
    </div>
  )
}
