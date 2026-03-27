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
          backgroundColor: '#161616',
          padding: '80px 100px',
        }}
      >
        {/* Hi there. */}
        <div
          style={{
            fontSize: 20,
            fontWeight: 300,
            color: '#737373',
            marginBottom: '8px',
          }}
        >
          Hi there.
        </div>

        {/* Headline — matching bold/light pattern */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0px',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: 72 }}>
            <span style={{ fontWeight: 300, color: '#737373' }}>I&apos;m </span>
            <span style={{ fontWeight: 700, color: '#F2F2F2' }}>
              Jay Shock,
            </span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: 72 }}>
            <span style={{ fontWeight: 300, color: '#737373' }}>
              a product{' '}
            </span>
            <span style={{ fontWeight: 700, color: '#F2F2F2' }}>
              designer{' '}
            </span>
            <span style={{ fontWeight: 300, color: '#737373' }}>turning</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: 72 }}>
            <span style={{ fontWeight: 300, color: '#737373' }}>
              complexity into{' '}
            </span>
            <span style={{ fontWeight: 700, color: '#F2F2F2' }}>
              simplicity.
            </span>
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 300,
            color: '#737373',
            marginTop: '28px',
            maxWidth: '600px',
            lineHeight: 1.6,
          }}
        >
          8 years experience. Currently based in Utah, designing financial
          systems in enterprise SaaS.
        </div>
      </div>
    ),
    { ...size }
  )
}
