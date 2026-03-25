import Image from 'next/image'

/**
 * Hero image for the Mobile Lending Management case study.
 *
 * Dark background with brand color glow behind the main screen.
 * Three phones at perspective angles — main screen dominant, two supporting.
 * Reads left to right: payment review → loan dashboard → confirmation.
 */
export default function MobileLendingHeroImage() {
  return (
    <div
      style={{
        width:           '100%',
        height:          '100%',
        position:        'relative',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        backgroundColor: 'var(--color-ink)',
        overflow:        'hidden',
      }}
    >
      {/* Brand color halo behind the main phone */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          inset:      0,
          background: 'radial-gradient(ellipse 55% 75% at 50% 58%, var(--case-label) 0%, transparent 65%)',
          opacity:    0.22,
          pointerEvents: 'none',
        }}
      />

      {/* Phones */}
      <div
        style={{
          position:       'relative',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          gap:            0,
          zIndex:         1,
        }}
      >
        {/* Review payment — left, angled back */}
        <div
          style={{
            position:     'relative',
            width:        '120px',
            height:       '258px',
            borderRadius: '18px',
            overflow:     'hidden',
            flexShrink:   0,
            marginRight:  '-20px',
            transform:    'perspective(800px) rotateY(28deg) translateY(18px) scale(0.92)',
            transformOrigin: 'right center',
            boxShadow:    '-4px 24px 60px rgba(0,0,0,0.6)',
            zIndex:       1,
          }}
        >
          <Image
            src="/images/mobile/Account details-2.png"
            alt="Review payment screen"
            fill
            sizes="120px"
            style={{ objectFit: 'cover', objectPosition: 'top' }}
          />
          {/* Edge fade so it blends into the dark bg */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to left, rgba(28,25,23,0.35) 0%, transparent 40%)',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Loan dashboard — center, dominant */}
        <div
          style={{
            position:     'relative',
            width:        '158px',
            height:       '342px',
            borderRadius: '22px',
            overflow:     'hidden',
            flexShrink:   0,
            transform:    'perspective(800px) rotateY(-4deg)',
            boxShadow:    '0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.07)',
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

        {/* Payment confirmation — right, angled back */}
        <div
          style={{
            position:     'relative',
            width:        '120px',
            height:       '258px',
            borderRadius: '18px',
            overflow:     'hidden',
            flexShrink:   0,
            marginLeft:   '-20px',
            transform:    'perspective(800px) rotateY(-28deg) translateY(18px) scale(0.92)',
            transformOrigin: 'left center',
            boxShadow:    '4px 24px 60px rgba(0,0,0,0.6)',
            zIndex:       1,
          }}
        >
          <Image
            src="/images/mobile/Account details-5.png"
            alt="Payment submitted successfully"
            fill
            sizes="120px"
            style={{ objectFit: 'cover', objectPosition: 'top' }}
          />
          {/* Edge fade */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, rgba(28,25,23,0.35) 0%, transparent 40%)',
            pointerEvents: 'none',
          }} />
        </div>
      </div>

      {/* Bottom vignette */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          bottom:     0,
          left:       0,
          right:      0,
          height:     '30%',
          background: 'linear-gradient(to top, var(--color-ink) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
