import Image from 'next/image'
import PaymentSuccessAnimation from './PaymentSuccessAnimation'

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
        paddingBottom:  '0',
        overflow:       'visible',
      }}
    >
      {/* Secondary phone — animated payment flow */}
      <div
        style={{
          position:     'relative',
          marginRight:  '-24px',
          marginBottom: '40px',
          transform:    'rotate(-4deg)',
          zIndex:       1,
          flexShrink:   0,
        }}
      >
        <PaymentSuccessAnimation />
      </div>

      {/* Main phone — loan dashboard, dominant, front */}
      <div
        style={{
          position:     'relative',
          width:        '170px',
          height:       '368px',
          borderRadius: '28px',
          overflow:     'hidden',
          flexShrink:   0,
          transform:    'rotate(2deg)',
          boxShadow:    '0 32px 80px rgba(0,0,0,0.40), 0 0 0 1px rgba(255,255,255,0.12)',
          zIndex:       2,
        }}
      >
        <Image
          src="/images/mobile/Lendmark account overview.png"
          alt="Loan dashboard — account overview"
          fill
          sizes="170px"
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
      </div>
    </div>
  )
}
