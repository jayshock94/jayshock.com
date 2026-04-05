import Image from 'next/image'

export default function MobileLendingCardImage() {
  return (
    <div
      style={{
        position: 'absolute',
        top:    '24px',
        left:   '-20%',
        right:  0,
        bottom: '-30%',
      }}
    >
      <Image
        src="/images/gac case study card hero v2.png"
        alt="Mobile lending management app"
        fill
        unoptimized
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{ objectFit: 'contain', objectPosition: 'right top' }}
      />
    </div>
  )
}
