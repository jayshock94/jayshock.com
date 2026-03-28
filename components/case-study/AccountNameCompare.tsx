import ScrollReveal from '@/components/ui/ScrollReveal'
import PhoneFrame from './PhoneFrame'

/**
 * Before/after comparison showing account numbers vs human-readable names.
 * Uses the real legacy screenshot for "before" and the redesigned dashboard for "after".
 */
export default function AccountNameCompare() {
  return (
    <ScrollReveal>
      <div
        className="max-w-layout mx-auto"
        style={{ marginTop: 'var(--space-stack-lg)', marginBottom: 'var(--space-stack-lg)' }}
      >
        <p
          className="text-label"
          style={{
            color: 'var(--color-text-muted)',
            marginBottom: 'var(--space-stack-md)',
            paddingLeft: 'var(--space-page-margin)',
          }}
        >
          The account name problem
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--space-component-lg)]" style={{ justifyItems: 'center' }}>
          {/* Before */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-stack-sm)' }}>
            <p
              className="text-label"
              style={{ color: 'var(--color-text-muted)', margin: 0 }}
            >
              Before
            </p>
            <PhoneFrame
              src="/images/mobile/legacy-dashboard.png"
              alt="Legacy app showing loans listed by account number only"
              maxWidth={260}
            />
            <p className="text-body-sm" style={{ color: 'var(--color-text-placeholder)', margin: 0, textAlign: 'center' }}>
              Which one is the car?
            </p>
          </div>

          {/* After */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-stack-sm)' }}>
            <p
              className="text-label"
              style={{ color: 'var(--color-text-muted)', margin: 0 }}
            >
              After
            </p>
            <PhoneFrame
              src="/images/mobile/redesigned-dashboard.png"
              alt="Redesigned app showing loans with names, icons, and key details"
              maxWidth={260}
            />
            <p className="text-body-sm" style={{ color: 'var(--color-text-muted)', margin: 0, textAlign: 'center' }}>
              Nicknames + loan type icons.
            </p>
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}
