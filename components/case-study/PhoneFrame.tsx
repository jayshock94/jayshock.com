import Image from 'next/image'

interface PhoneFrameProps {
  /** Path to the screenshot image. */
  src: string
  /** Alt text for the image. */
  alt: string
  /** Optional caption below the phone. */
  caption?: string
  /** Max width of the phone frame. Default 320. */
  maxWidth?: number
  /** If true, crop image to phone aspect ratio (roughly 2:1). Default false. */
  cropToPhone?: boolean
}

/**
 * Wraps a screenshot in a minimal phone frame with a status bar.
 * Used in case study sections to show mobile app designs.
 */
export default function PhoneFrame({
  src,
  alt,
  caption,
  maxWidth = 320,
  cropToPhone = false,
}: PhoneFrameProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-stack-sm)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: `${maxWidth}px`,
          borderRadius: '32px',
          overflow: 'hidden',
          border: '3px solid var(--color-border-mid)',
          background: '#000',
          position: 'relative',
        }}
      >
        {/* Status bar */}
        <div
          style={{
            height: '44px',
            background: '#f8f4f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
          }}
        >
          <span style={{ fontSize: '13px', fontWeight: 500, color: '#1c1917' }}>
            9:41
          </span>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {/* Signal bars */}
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <rect x="0" y="8" width="3" height="4" rx="0.5" fill="#1c1917" />
              <rect x="4" y="5" width="3" height="7" rx="0.5" fill="#1c1917" />
              <rect x="8" y="2" width="3" height="10" rx="0.5" fill="#1c1917" />
              <rect x="12" y="0" width="3" height="12" rx="0.5" fill="#1c1917" />
            </svg>
            {/* WiFi */}
            <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
              <path d="M7 10.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" fill="#1c1917" />
              <path d="M3.5 8.5C4.5 7.2 5.7 6.5 7 6.5s2.5.7 3.5 2" stroke="#1c1917" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              <path d="M1 5.5c1.7-2 3.6-3 6-3s4.3 1 6 3" stroke="#1c1917" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            </svg>
            {/* Battery */}
            <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
              <rect x="0.5" y="0.5" width="20" height="11" rx="2" stroke="#1c1917" strokeWidth="1" fill="none" />
              <rect x="2" y="2" width="16" height="7" rx="1" fill="#1c1917" />
              <rect x="21.5" y="3.5" width="2" height="5" rx="1" fill="#1c1917" />
            </svg>
          </div>
        </div>

        {/* Screenshot */}
        <div style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          ...(cropToPhone ? { maxHeight: `${maxWidth * 1.8}px` } : {}),
        }}>
          <Image
            src={src}
            alt={alt}
            width={maxWidth}
            height={maxWidth * 2}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
            }}
          />
        </div>

        {/* Home indicator */}
        <div
          style={{
            height: '28px',
            background: '#f8f4f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '120px',
              height: '4px',
              borderRadius: '2px',
              background: '#1c1917',
              opacity: 0.3,
            }}
          />
        </div>
      </div>

      {caption && (
        <p
          className="text-body-sm"
          style={{
            color: 'var(--color-text-muted)',
            textAlign: 'center',
            margin: 0,
            maxWidth: `${maxWidth + 40}px`,
          }}
        >
          {caption}
        </p>
      )}
    </div>
  )
}
