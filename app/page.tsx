import type { Metadata } from 'next'
import Link from 'next/link'
import Button        from '@/components/ui/Button'
import WorkCard      from '@/components/work/WorkCard'
import MobileLendingCardImage from '@/components/work/MobileLendingCardImage'
import ThemeToggle   from '@/components/ui/ThemeToggle'
import HowIWork      from '@/components/about/HowIWork'
import ScrollReveal  from '@/components/ui/ScrollReveal'
import { caseStudies } from '@/data/case-studies'

export const metadata: Metadata = {
  title:       'Jay Shock — Product Designer',
  description:
    'I make complex products feel like they were always simple. 8 plus years in fintech and enterprise SaaS.',
}


export default function HomePage() {
  const featured = caseStudies.slice(0, 3)

  return (
    <>
      {/* =========================================================
          Section 01 — Hero
          Black and white only. No phase color. No accent.
      ========================================================= */}
      <section
        style={{
          paddingTop:    'clamp(80px, 12vw, 140px)',
          paddingBottom: 'clamp(60px, 8vw, 100px)',
        }}
        aria-label="Introduction"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">

          {/* Intro line — tucked tight against headline */}
          <p
            className="hero-fade-up text-center md:text-left"
            style={{
              fontFamily: 'var(--font-outfit), system-ui, sans-serif',
              fontSize: '18px',
              fontWeight: 300,
              color: 'var(--color-text-muted)',
              marginBottom: '4px',
              animationDelay: '300ms',
            }}
          >
            Hi there.
          </p>

          {/* Headline — word-by-word reveal, bold words carry the message */}
          <h1
            className="text-display mb-[20px] text-center md:text-left"
            style={{ maxWidth: '900px' }}
          >
            <span style={{ fontWeight: 300, color: 'var(--color-text-muted)' }}>
              <span className="hero-word" style={{ animationDelay: '400ms'  }}>I&apos;m </span>
            </span>
            <span style={{ fontWeight: 700, color: 'var(--color-ink)' }}>
              <span className="hero-word hero-word--bold">Jay </span>
              <span className="hero-word hero-word--bold">Shock,</span>
            </span>
            <br />
            <span style={{ fontWeight: 300, color: 'var(--color-text-muted)' }}>
              <span className="hero-word" style={{ animationDelay: '500ms'  }}>a </span>
              <span className="hero-word" style={{ animationDelay: '560ms'  }}>product </span>
              <span className="hero-word" style={{ animationDelay: '620ms'  }}>designer </span>
            </span>
            <span style={{ fontWeight: 300, color: 'var(--color-text-muted)' }}>
              <span className="hero-word" style={{ animationDelay: '680ms'  }}>turning </span>
            </span>
            <span style={{ fontWeight: 700, color: 'var(--color-ink)' }}>
              <span className="hero-word hero-word--bold">complexity </span>
            </span>
            <span style={{ fontWeight: 300, color: 'var(--color-text-muted)' }}>
              <span className="hero-word" style={{ animationDelay: '740ms'  }}>into </span>
            </span>
            <span style={{ fontWeight: 700, color: 'var(--color-ink)' }}>
              <span className="hero-word hero-word--bold">simplicity.</span>
            </span>
          </h1>

          {/* Subline */}
          <p
            className="text-body-lg mb-[36px] text-center md:text-left hero-fade-up"
            style={{
              color:          'var(--color-text-muted)',
              maxWidth:       '520px',
              animationDelay: '900ms',
            }}
          >
            8 years experience. Currently based in Utah, designing financial systems
            in enterprise SaaS.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-[12px] items-center justify-center md:justify-start hero-fade-up"
            style={{ animationDelay: '1000ms' }}
          >
            <Button variant="glass" href="/api/resume" download>
              Download resume
            </Button>
            <Button variant="secondary" href="/about">
              More about me
            </Button>
          </div>

        </div>
      </section>

      {/* =========================================================
          Section 02 — Featured Work
      ========================================================= */}
      <section
        id="work"
        className="py-[var(--space-section-sm)]"
        aria-labelledby="work-heading"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">

          <p
            className="text-label text-[var(--color-text-muted)] mb-[var(--space-stack-md)] hero-fade-up"
            id="work-eyebrow"
            style={{ animationDelay: '1200ms' }}
          >
            Selected Work
          </p>

          <h2 id="work-heading" className="sr-only">
            Featured case studies
          </h2>

          <div
            className="
              grid grid-cols-1 gap-[16px] items-stretch
              md:grid-cols-2 md:gap-[20px]
              lg:grid-cols-3
            "
          >
            {featured.map((cs, i) => (
              <div
                key={cs.slug}
                className="h-full hero-fade-up"
                style={{ animationDelay: `${1350 + i * 150}ms` }}
              >
                <WorkCard
                  caseStudy={cs}
                  cardImageSlot={cs.slug === 'mobile-lending-management' ? <MobileLendingCardImage /> : undefined}
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================
          Section 03 — How I Work
      ========================================================= */}
      <section
        className="py-[var(--space-section-md)]"
        aria-label="How I work"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
          <ScrollReveal>
            <div className="border-t border-[var(--color-border)] pt-[var(--space-section-sm)]">
              <HowIWork />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================
          Section 04 — Contact CTA
      ========================================================= */}
      <section
        className="py-[var(--space-section-sm)]"
        aria-label="Contact"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
          <ScrollReveal>
            <div
              className="
                max-w-content
                border-t border-[var(--color-border)]
                pt-[var(--space-section-sm)]
              "
            >
              <p className="text-body-lg text-[var(--color-text-secondary)] mb-[var(--space-stack-lg)]">
                Whether you are looking for a senior product designer or a
                partner for a complex problem, I want to hear about it.
              </p>

              <Button variant="glass" href="/contact">
                Get in touch
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
