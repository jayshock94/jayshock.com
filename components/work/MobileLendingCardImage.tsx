import Image from 'next/image'

export default function MobileLendingCardImage() {
  return (
    <div
      style={{
        position: 'absolute',
        top:    '24px',
        left:   '-4%',
        right:  0,
        bottom: '-40%',
      }}
    >
      <Image
        src="/images/work/gac case study cover image v1 2.png"
        alt="Mobile lending management app"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{ objectFit: 'cover', objectPosition: 'left top' }}
      />
    </div>
  )
}
