import type { Metadata } from 'next'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionIcon from '@/components/icons/SectionIcon'
import ToolsToggle from '@/components/experience/ToolsToggle'
import { SKILLS, TIMELINE, EDUCATION, CERTIFICATIONS_PRIMARY, CONTACT, SUMMARY } from '@/data/resume'

export const metadata: Metadata = {
  title:       'Experience — Jay Shock, Product Designer',
  description:
    'Skills, tools, and career history. 8 plus years designing complex products in fintech and enterprise SaaS.',
}

export default function ExperiencePage() {
  return (
    <div className="pt-[var(--space-section-xl)] pb-[var(--space-section-xl)]">


      {/* =========================================================
          Header — Display heading + summary + CTAs
      ========================================================= */}
      <section
        className="pb-[var(--space-section-xl)]"
        aria-label="Experience overview"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
          <ScrollReveal>
            <div className="text-center">
              <SectionIcon variant="skills" glowColor="var(--phase-discovery-label)" />
              <h1 className="text-display text-[var(--color-ink)]" style={{ marginTop: '-14px' }}>
                Experience
              </h1>
              <div className="grid grid-cols-2 gap-[8px] mx-auto" style={{ maxWidth: '320px', marginTop: 'var(--space-stack-md)' }}>
                <Button variant="glass" href="/api/resume" className="w-full">
                  Download resume
                </Button>
                <Button variant="secondary" href="/contact" className="w-full">
                  Get in touch
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* =========================================================
          Section 02 — Experience Timeline
      ========================================================= */}
      <section
        className="pb-[var(--space-section-xl)]"
        aria-label="Experience timeline"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
          <div className="mx-auto" style={{ maxWidth: 'var(--space-content-max)' }}>
            <ScrollReveal>
              <h2 className="text-h1 text-[var(--color-ink)] mb-[var(--space-stack-lg)]">
                Where I have been.
              </h2>
            </ScrollReveal>

            {TIMELINE.map((job, i) => (
              <div
                key={job.company}
                className={i > 0 ? 'border-t border-[var(--color-border)]' : ''}
                style={{
                  paddingTop: i > 0 ? 'var(--space-section-sm)' : '0',
                  paddingBottom: 'var(--space-section-sm)',
                }}
              >
                <ScrollReveal>
                  <h3 className="text-h2 text-[var(--color-ink)] mb-[var(--space-stack-sm)]">
                    {job.role}
                  </h3>
                  <p className="text-h4 text-[var(--color-text-muted)] mb-[var(--space-stack-md)]">
                    {job.company} &middot; {job.period}
                  </p>
                </ScrollReveal>
                <ScrollReveal>
                  <ul className="flex flex-col gap-[var(--space-stack-sm)] list-disc" style={{ paddingLeft: 'var(--space-component-lg)' }}>
                    {job.paragraphs.map((p, j) => (
                      <li
                        key={j}
                        className="text-body-lg text-[var(--color-text-secondary)]"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>
                {job.slug && (
                  <ScrollReveal>
                    <div style={{ marginTop: 'var(--space-stack-md)' }}>
                      <Button variant="secondary" href={job.slug}>
                        View case study
                      </Button>
                    </div>
                  </ScrollReveal>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* =========================================================
          Section 03 — Skills
      ========================================================= */}
      <section
        className="pb-[var(--space-section-xl)]"
        aria-label="Skills"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
          <div className="border-t border-[var(--color-border)] pt-[var(--space-section-sm)]">
            <div className="mx-auto" style={{ maxWidth: 'var(--space-content-max)' }}>
              <ScrollReveal>
                <h2 className="text-h1 text-[var(--color-ink)] mb-[var(--space-stack-md)]">
                  What I bring.
                </h2>
              </ScrollReveal>

              <div className="flex flex-col gap-[var(--space-stack-md)]">
                {SKILLS.map((skill) => (
                  <ScrollReveal key={skill.category}>
                    <div>
                      <h3 className="text-h4 text-[var(--color-ink)] mb-[var(--space-stack-xs)]">
                        {skill.category}
                      </h3>
                      <p className="text-body-lg text-[var(--color-text-secondary)]">
                        {skill.items}
                      </p>
                      {skill.caseStudy && (
                        <Link
                          href={skill.caseStudy.slug}
                          className="text-ui-md text-[var(--color-text-muted)] hover:text-[var(--color-ink)] transition-colors duration-200 block"
                          style={{ marginTop: 'var(--space-stack-xs)' }}
                        >
                          {skill.caseStudy.label} &rarr;
                        </Link>
                      )}
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================
          Section 04 — Tools
      ========================================================= */}
      <section
        className="pb-[var(--space-section-xl)]"
        aria-label="Tools"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
          <div className="border-t border-[var(--color-border)] pt-[var(--space-section-sm)]">
            <div className="mx-auto" style={{ maxWidth: 'var(--space-content-max)' }}>
              <ScrollReveal>
                <h2 className="text-h1 text-[var(--color-ink)] mb-[var(--space-stack-md)]">
                  What I use.
                </h2>
              </ScrollReveal>

              <ScrollReveal>
                <ToolsToggle />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================
          Section 05 — Education and Certifications
      ========================================================= */}
      <section
        className="pb-[var(--space-section-xl)]"
        aria-label="Education and certifications"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
          <div className="border-t border-[var(--color-border)] pt-[var(--space-section-sm)]">
            <div className="mx-auto" style={{ maxWidth: 'var(--space-content-max)' }}>
              <ScrollReveal>
                <h2 className="text-h1 text-[var(--color-ink)] mb-[var(--space-stack-md)]">
                  Education and certifications.
                </h2>
              </ScrollReveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--space-component-sm)]">
                {[
                  ...EDUCATION.map((ed) => ({ title: ed.label, subtitle: ed.institution })),
                  ...CERTIFICATIONS_PRIMARY.map((cert) => ({ title: cert.title, subtitle: cert.institution })),
                ].map((item) => (
                  <ScrollReveal key={item.title}>
                    <div
                      style={{
                        padding: 'var(--space-component-lg)',
                        borderRadius: '12px',
                        border: '0.5px solid var(--color-border)',
                        background: 'var(--color-surface)',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                          fontSize: '15px',
                          fontWeight: 500,
                          color: 'var(--color-text-primary)',
                          marginBottom: '4px',
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                          fontSize: '13px',
                          fontWeight: 300,
                          color: 'var(--color-text-muted)',
                        }}
                      >
                        {item.subtitle}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================
          Section 06 — Contact CTA
      ========================================================= */}
      <section
        className="pb-[var(--space-section-xl)]"
        aria-label="Contact"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
          <div className="border-t border-[var(--color-border)] pt-[var(--space-section-sm)]">
            <div className="mx-auto" style={{ maxWidth: 'var(--space-content-max)' }}>
              <ScrollReveal>
                <h2 className="text-h1 text-[var(--color-ink)] mb-[var(--space-stack-sm)]">
                  Want the full picture?
                </h2>
                <p className="text-body-lg text-[var(--color-text-secondary)] mb-[var(--space-stack-md)]">
                  Download the resume or reach out directly.
                </p>
                <div className="grid grid-cols-2 gap-[8px]" style={{ maxWidth: '320px' }}>
                  <Button variant="glass" href="/api/resume" className="w-full">
                    Download resume
                  </Button>
                  <Button variant="secondary" href="/contact" className="w-full">
                    Get in touch
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
