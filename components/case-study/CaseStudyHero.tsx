import type { CaseStudy } from '@/data/types'
import type { ColorTokenSet } from '@/lib/colorAlgorithm'
import HeroTypeTags from './HeroTypeTags'

interface CaseStudyHeroProps {
  caseStudy:      CaseStudy
  tokens:         ColorTokenSet
  heroImageSlot?: React.ReactNode
  /** Map of type tag text to Barnaby question for interactive tags. */
  tagMessages?: Record<string, string>
}

export default function CaseStudyHero({ caseStudy, tokens, heroImageSlot, tagMessages }: CaseStudyHeroProps) {
  const { title, role, types } = caseStudy

  return (
    <section
      style={{
        background: tokens.heroZone,
        ['--case-hero-bg' as string]: tokens.heroZone,
        position: 'relative',
        overflow: 'visible',
      } as React.CSSProperties}
      aria-label="Case study overview"
    >
      <div
        className="max-w-layout mx-auto px-[var(--space-page-margin)] w-full"
        style={{
          paddingTop: 'clamp(80px, 12vw, 140px)',
          paddingBottom: heroImageSlot ? '0' : 'var(--space-section-xl)',
        }}
      >
        {/* Title — display size, matching homepage section headings */}
        <h1
          className="hero-fade-up text-display text-center mx-auto"
          style={{
            color: 'var(--hero-text-primary)',
            marginBottom: 'var(--space-stack-md)',
            maxWidth: 'var(--space-content-max)',
            animationDelay: '300ms',
          }}
        >
          {title}
        </h1>

        {/* Role as subtitle */}
        <p
          className="hero-fade-up text-intro text-center mx-auto"
          style={{
            color: 'var(--hero-text-secondary)',
            marginBottom: 'var(--space-stack-lg)',
            maxWidth: 'var(--space-content-max)',
            animationDelay: '450ms',
          }}
        >
          {role}
        </p>

        {/* Type tags — fully rounded = interactive */}
        {types.length > 0 && (
          <HeroTypeTags tags={types} barnabyMessages={tagMessages} />
        )}

        {/* Hero image slot — flush to bottom of hero */}
        {heroImageSlot && (
          <div
            className="hero-fade-up"
            style={{
              marginTop: 'var(--space-subsection)',
              marginBottom: '0',
              animationDelay: '650ms',
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
