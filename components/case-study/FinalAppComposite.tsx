import Image from 'next/image'
import ScrollReveal from '@/components/ui/ScrollReveal'

interface CompositeScreen {
  src: string
  alt: string
  label?: string
  /** If true, cover the status bar with an overlay */
  hideStatusBar?: boolean
}

const SCREENS: CompositeScreen[] = [
  {
    src: '/images/mobile/final-composite/Login.png',
    alt: 'White-label login screen',
    label: 'White-label login',
    hideStatusBar: true,
  },
  {
    src: '/images/mobile/final-composite/body.png',
    alt: 'Redesigned loan dashboard with named accounts',
    label: 'Loan dashboard',
    hideStatusBar: true,
  },
  {
    src: '/images/mobile/final-composite/Account details.png',
    alt: 'Account details with quick actions',
    label: 'Account details',
    hideStatusBar: true,
  },
  {
    src: '/images/mobile/final-composite/Location finder.png',
    alt: 'Branch locator with map',
    label: 'Branch locator',
    hideStatusBar: true,
  },
]

/**
 * A grid of final app screenshots for the impact section.
 * Shows the breadth of the redesign across key screens.
 */
export default function FinalAppComposite() {
  return (
    <ScrollReveal>
      <div
        style={{
          marginTop: 'var(--space-section-sm)',
          marginBottom: 'var(--space-stack-lg)',
        }}
      >
        <p
          className="text-label"
          style={{
            color: 'var(--color-text-muted)',
            marginBottom: 'var(--space-stack-md)',
          }}
        >
          The final product
        </p>

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-[var(--space-component-md)]"
        >
          {SCREENS.map((screen) => (
            <div key={screen.alt} className="flex flex-col items-center gap-[var(--space-component-sm)]">
              {/* Phone frame */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '200px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.08)',
                  background: '#ffffff',
                }}
              >
                {/* Status bar at top */}
                <div
                  style={{
                    background: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 16px 4px',
                  }}
                >
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#1a1a1a', fontFamily: 'system-ui' }}>
                    9:41
                  </span>
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <svg width="14" height="10" viewBox="0 0 17 12" fill="#1a1a1a">
                      <rect x="0" y="8" width="3" height="4" rx="0.5" />
                      <rect x="4.5" y="5" width="3" height="7" rx="0.5" />
                      <rect x="9" y="2" width="3" height="10" rx="0.5" />
                      <rect x="13.5" y="0" width="3" height="12" rx="0.5" />
                    </svg>
                    <svg width="14" height="10" viewBox="0 0 16 12" fill="none">
                      <circle cx="8" cy="11" r="1.2" fill="#1a1a1a" />
                      <path d="M4.8 7.8a4.5 4.5 0 0 1 6.4 0" stroke="#1a1a1a" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                    <svg width="20" height="10" viewBox="0 0 25 12" fill="none">
                      <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#1a1a1a" strokeOpacity="0.35" />
                      <rect x="2" y="2" width="17.5" height="8" rx="2" fill="#1a1a1a" />
                    </svg>
                  </div>
                </div>

                {/* Screenshot — full height, no crop */}
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  width={400}
                  height={800}
                  sizes="200px"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>

              {/* Label */}
              {screen.label && (
                <p
                  className="text-body-sm"
                  style={{
                    color: 'var(--color-text-muted)',
                    textAlign: 'center',
                    margin: 0,
                  }}
                >
                  {screen.label}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  )
}
