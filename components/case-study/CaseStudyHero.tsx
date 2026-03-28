import type { CaseStudy } from '@/data/types'
import type { ColorTokenSet } from '@/lib/colorAlgorithm'

interface CaseStudyHeroProps {
  caseStudy:      CaseStudy
  tokens:         ColorTokenSet
  heroImageSlot?: React.ReactNode
}

export default function CaseStudyHero({ caseStudy, tokens, heroImageSlot }: CaseStudyHeroProps) {
  const { title, role, year, industry, types } = caseStudy

  return (
    <section
      style={{
        background: tokens.heroZone,
        position: 'relative',
        overflow: 'visible',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
      }}
      aria-label="Case study overview"
    >
      <div
        className="max-w-layout mx-auto px-[var(--space-page-margin)] w-full"
        style={{
          paddingTop: 'clamp(100px, 14vw, 160px)',
          paddingBottom: heroImageSlot ? 'clamp(80px, 10vw, 120px)' : 'var(--space-section-md)',
        }}
      >
        {/* Eyebrow */}
        <p
          className="hero-fade-up text-label"
          style={{
            color: 'var(--hero-text-muted)',
            marginBottom: 'var(--space-stack-md)',
            animationDelay: '300ms',
          }}
        >
          {industry} · {year}
        </p>

        {/* Title */}
        <h1
          className="hero-fade-up"
          style={{
            fontFamily: 'var(--font-outfit), system-ui, sans-serif',
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: 'var(--hero-text-primary)',
            marginBottom: 'var(--space-stack-md)',
            maxWidth: '720px',
            animationDelay: '400ms',
          }}
        >
          {title}
        </h1>

        {/* Role as subtitle */}
        <p
          className="hero-fade-up text-intro"
          style={{
            color: 'var(--hero-text-secondary)',
            marginBottom: 'var(--space-stack-lg)',
            maxWidth: 'var(--space-content-max)',
            animationDelay: '550ms',
          }}
        >
          {role}
        </p>

        {/* Type tags */}
        {types.length > 0 && (
          <div
            className="hero-fade-up flex flex-wrap gap-[var(--space-component-xs)]"
            style={{ animationDelay: '650ms' }}
            aria-label="Project type tags"
          >
            {types.map(tag => (
              <span
                key={tag}
                className="text-ui-sm px-[12px] py-[5px] rounded-[4px]"
                style={{
                  color: 'var(--hero-text-secondary)',
                  border: '1px solid var(--hero-text-muted)',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Hero image slot */}
        {heroImageSlot && (
          <div
            className="hero-fade-up"
            style={{
              marginTop: 'var(--space-section-sm)',
              animationDelay: '750ms',
              display: 'flex',
              justifyContent: 'center',
              overflow: 'visible',
            }}
          >
            {heroImageSlot}
          </div>
        )}
      </div>
    </section>
  )
}
