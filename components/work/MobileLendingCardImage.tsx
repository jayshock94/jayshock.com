import Image from 'next/image'
import PaymentSuccessAnimation from '@/components/case-study/PaymentSuccessAnimation'

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
          marginRight:  '-18px',
          marginTop:    '20px',
          transform:    'rotate(-4deg)',
          zIndex:       1,
          flexShrink:   0,
        }}
      >
        <PaymentSuccessAnimation static />
      </div>

      {/* Front phone — account details */}
      <div
        style={{
          position:     'relative',
          width:        '140px',
          height:       '300px',
          borderRadius: '22px',
          overflow:     'hidden',
          flexShrink:   0,
          transform:    'rotate(2deg)',
          boxShadow:    '0 20px 56px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.12)',
          zIndex:       2,
        }}
      >
        <Image
          src="/images/mobile/Account details.png"
          alt="Account details — loan dashboard with balance and payment options"
          fill
          sizes="140px"
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
      </div>
    </div>
  )
}
