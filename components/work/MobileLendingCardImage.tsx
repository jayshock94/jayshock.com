import Image from 'next/image'

export default function MobileLendingCardImage() {
  return (
    <>
      {/* Desktop — 24px from top, extends left, touches center edge */}
      <div
        className="hidden md:block"
        style={{
          position: 'absolute',
          top:    '24px',
          left:   '-25%',
          right:  0,
          bottom: '-40%',
        }}
      >
        <Image
          src="/images/gac case study card hero v2.png"
          alt="Mobile lending management app"
          fill
          sizes="100vw"
          quality={100}
          style={{ objectFit: 'contain', objectPosition: 'right top' }}
          priority
        />
      </div>

      {/* Mobile/tablet stacked — centered, 24px edges, touches top, clips bottom */}
      <div
        className="md:hidden"
        style={{
          position: 'absolute',
          top:    0,
          left:   '24px',
          right:  '24px',
          bottom: '-60%',
        }}
      >
        <Image
          src="/images/gac case study card hero v2.png"
          alt="Mobile lending management app"
          fill
          sizes="200vw"
          quality={100}
          style={{ objectFit: 'contain', objectPosition: 'center top' }}
          priority
        />
      </div>
    </>
  )
}
