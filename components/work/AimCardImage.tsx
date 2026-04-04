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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/work/AIM card.png"
        alt="AIM loan management platform"
        style={{
          position:      'absolute',
          inset:         0,
          width:         '100%',
          height:        '100%',
          objectFit:     'cover',
          objectPosition:'left top',
        }}
      />
    </div>
  )
}
