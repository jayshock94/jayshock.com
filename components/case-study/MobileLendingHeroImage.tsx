'use client'

import Image from 'next/image'
import PaymentSuccessAnimation from './PaymentSuccessAnimation'

/** Front phone: 200ms delay + 600ms duration = 800ms. Plus 100ms settle buffer. */
const PAYMENT_DELAY = 900

export default function MobileLendingHeroImage() {
  return (
    <div
      style={{
        position:       'relative',
        display:        'flex',
        alignItems:     'flex-end',
        justifyContent: 'center',
        width:          '100%',
        height:         '100%',
        overflow:       'visible',
      }}
    >
      {/* Back phone — enters from left */}
      <div className="phone-enter-left">
        <div
          style={{
            position:     'relative',
            marginRight:  '-20px',
            marginBottom: '28px',
            transform:    'rotate(-4deg)',
            zIndex:       1,
            flexShrink:   0,
          }}
        >
          <PaymentSuccessAnimation delayStart={PAYMENT_DELAY} />
        </div>
      </div>

      {/* Front phone — enters from right */}
      <div className="phone-enter-right">
        <div
          style={{
            position:     'relative',
            width:        '155px',
            height:       '336px',
            borderRadius: '24px',
            overflow:     'hidden',
            flexShrink:   0,
            transform:    'rotate(2deg)',
            boxShadow:    '0 24px 64px rgba(0,0,0,0.40), 0 0 0 1px rgba(255,255,255,0.12)',
            zIndex:       2,
          }}
        >
          <Image
            src="/images/mobile/Lendmark account overview.png"
            alt="Loan dashboard — account overview"
            fill
            sizes="155px"
            style={{ objectFit: 'cover', objectPosition: 'center 2%' }}
          />
        </div>
      </div>
    </div>
  )
}
