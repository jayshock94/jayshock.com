import Image from 'next/image'

/**
 * Hero image for the Mobile Lending Management case study.
 *
 * Three screens, one journey: dashboard → payment review → confirmation.
 * Center phone (account overview) is the redesign's key moment — loan name,
 * balance, and actions visible without a single tap.
 */
export default function MobileLendingHeroImage() {
  return (
    <div
      style={{
        width:          '100%',
        height:         '100%',
        display:        'flex',
        alignItems:     'flex-end',
        justifyContent: 'center',
        gap:            'var(--space-component-md)',
        backgroundColor: 'var(--color-canvas)',
        padding:        '0 var(--space-component-lg)',
      }}
    >
      {/* Review payment — left */}
      <div
        style={{
          position:     'relative',
          width:        '118px',
          height:       '255px',
          borderRadius: '18px 18px 0 0',
          overflow:     'hidden',
          flexShrink:   0,
          boxShadow:    'var(--shadow-card)',
        }}
      >
        <Image
          src="/images/mobile/Account details-2.png"
          alt="Review payment screen"
          fill
          sizes="118px"
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
      </div>

      {/* Account overview — center, featured */}
      <div
        style={{
          position:     'relative',
          width:        '148px',
          height:       '330px',
          borderRadius: '18px 18px 0 0',
          overflow:     'hidden',
          flexShrink:   0,
          boxShadow:    'var(--shadow-card-hover)',
        }}
      >
        <Image
          src="/images/mobile/Lendmark account overview.png"
          alt="Loan dashboard — account overview"
          fill
          sizes="148px"
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
      </div>

      {/* Payment confirmation — right */}
      <div
        style={{
          position:     'relative',
          width:        '118px',
          height:       '255px',
          borderRadius: '18px 18px 0 0',
          overflow:     'hidden',
          flexShrink:   0,
          boxShadow:    'var(--shadow-card)',
        }}
      >
        <Image
          src="/images/mobile/Account details-5.png"
          alt="Payment submitted successfully"
          fill
          sizes="118px"
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
      </div>
    </div>
  )
}
