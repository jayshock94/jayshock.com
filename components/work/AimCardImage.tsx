import Image from 'next/image'

export default function AimCardImage() {
  return (
    <div
      style={{
        position: 'absolute',
        top:    '24px',
        left:   0,
        right:  '-15%',
        bottom: '-20%',
      }}
    >
      <Image
        src="/images/work/AIM card.png"
        alt="AIM loan management platform"
        fill
        sizes="(max-width: 768px) 100vw, 55vw"
        style={{ objectFit: 'cover', objectPosition: 'left top' }}
        priority
      />
    </div>
  )
}
