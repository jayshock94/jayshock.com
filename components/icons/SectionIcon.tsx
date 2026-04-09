import type { IconVariant } from './SectionIconCanvas'

interface SectionIconProps {
  variant: IconVariant
  glowColor: string
  glowColorHex?: string
}

/**
 * Section icon — SVG inside a subtle elevated container.
 * No glass, no Three.js. Thin border + faint color glow at the base.
 */
export default function SectionIcon({ variant, glowColor }: SectionIconProps) {
  return (
    <div
      className="flex justify-center"
      style={{ marginBottom: 'var(--space-stack-md)' }}
    >
      <div
        style={{
          position: 'relative',
          width: 'clamp(56px, 7vw, 64px)',
          height: 'clamp(56px, 7vw, 64px)',
          borderRadius: '14px',
          background: 'var(--color-surface)',
          border: '0.5px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Subtle color glow at the bottom edge */}
        <div
          style={{
            position: 'absolute',
            bottom: '-6px',
            left: '20%',
            right: '20%',
            height: '20px',
            background: `radial-gradient(ellipse at center, ${glowColor}, transparent 70%)`,
            opacity: 0.2,
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />

        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-text-muted)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{ position: 'relative', zIndex: 1 }}
        >
          {ICON_PATHS[variant]}
        </svg>
      </div>
    </div>
  )
}

const ICON_PATHS: Record<IconVariant, React.ReactNode> = {
  /* Briefcase — work / case studies */
  work: (
    <>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </>
  ),
  /* User — about */
  about: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </>
  ),
  /* Layers — skills / experience */
  skills: (
    <>
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="m2 17 10 5 10-5" />
      <path d="m2 12 10 5 10-5" />
    </>
  ),
  /* Mail — contact */
  contact: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </>
  ),
}
