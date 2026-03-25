import Image from 'next/image'

/**
 * Two-phone composition for the mobile-lending WorkCard.
 * Account details (front) + Payment success (behind).
 * Phones align to top with breathing room — bottoms clip naturally.
 */
export default function MobileLendingCardImage() {
  return (
    <div
      style={{
        position:       'relative',
        display:        'flex',
        alignItems:     'flex-start',
        justifyContent: 'center',
        width:          '100%',
        height:         '100%',
        paddingTop:     '28px',
      }}
    >
      {/* Back phone — payment success */}
      <div
        style={{
          position:     'relative',
          width:        'clamp(90px, 30vw, 120px)',
          height:       'clamp(195px, 65vw, 260px)',
          borderRadius: '20px',
          overflow:     'hidden',
          flexShrink:   0,
          marginRight:  '-18px',
          marginTop:    '20px',
          transform:    'rotate(-4deg)',
          boxShadow:    '0 16px 48px rgba(0,0,0,0.30), 0 0 0 1px rgba(255,255,255,0.10)',
          zIndex:       1,
        }}
      >
        <Image
          src="/images/mobile/Account details-5.png"
          alt="Payment submitted successfully — $505.38 confirmed"
          fill
          sizes="120px"
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
      </div>

      {/* Front phone — account details */}
      <div
        style={{
          position:     'relative',
          width:        'clamp(105px, 35vw, 140px)',
          height:       'clamp(225px, 75vw, 300px)',
          borderRadius: '22px',
          overflow:     'hidden',
          flexShrink:   0,
          transform:    'rotate(2deg)',
          boxShadow:    '0 20px 56px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.12)',
          zIndex:       2,
        }}
      >
        <Image
          src="/images/mobile/Lendmark account overview.png"
          alt="Account details — loan dashboard with balance and payment options"
          fill
          sizes="140px"
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
      </div>
    </div>
  )
}
