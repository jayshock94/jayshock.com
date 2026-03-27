import { ImageResponse } from 'next/og'

export const alt = 'Jay Shock — Product Designer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          backgroundColor: '#161616',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: '#F2F2F2',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            Jay Shock
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 300,
              color: '#A3A3A3',
              lineHeight: 1.5,
              maxWidth: '800px',
            }}
          >
            Product Designer — making complex products feel like they were
            always simple.
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            left: '80px',
            fontSize: 18,
            fontWeight: 300,
            color: '#737373',
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
          }}
        >
          jayshock.com
        </div>
      </div>
    ),
    { ...size }
  )
}
