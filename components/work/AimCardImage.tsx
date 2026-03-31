import Image from 'next/image'

/**
 * Full-width screenshot for the AIM work card.
 * Image spans full width, pinned to top. Only the bottom overflows/crops.
 */
export default function AimCardImage() {
  return (
    <div
      style={{
        position: 'absolute',
        inset:    0,
        overflow: 'hidden',
      }}
    >
      <Image
        src="/images/AIM/hero.png"
        alt="AIM customer dashboard — AI summary and loan management"
        width={1280}
        height={832}
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      />
    </div>
  )
}
