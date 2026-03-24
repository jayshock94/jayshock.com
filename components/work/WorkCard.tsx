import Link from 'next/link'
import type { CaseStudy } from '@/data/types'

interface WorkCardProps {
  caseStudy: CaseStudy
  /** Homepage forces monochromatic. Work index also uses mono. */
  monochromatic?: boolean
}

// Lock icon for protected case studies
function LockIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className="inline-block mb-[1px]"
    >
      <rect
        x="2" y="5.5" width="8" height="5.5"
        rx="1"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M4 5.5V3.5a2 2 0 1 1 4 0v2"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Arrow icon for the case study link
function ArrowRight() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 6h7M6.5 3l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function WorkCard({
  caseStudy,
  monochromatic = true,
}: WorkCardProps) {
  const { slug, eyebrow, title, role, cardImpactLine, isProtected } = caseStudy

  return (
    <article
      className="
        group
        bg-[var(--color-surface)]
        border border-[var(--color-border)]
        rounded-[10px]
        p-[var(--space-component-lg)]
        flex flex-col gap-[var(--space-stack-sm)]
        transition-all duration-200
        hover:border-[var(--color-border-mid)]
        hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)]
      "
    >
      {/* Eyebrow + lock */}
      <div className="flex items-center gap-[var(--space-component-xs)]">
        <span className="text-label text-[var(--color-text-muted)]">
          {eyebrow}
        </span>
        {isProtected && (
          <span
            className="text-label text-[var(--color-text-muted)] flex items-center gap-[var(--space-component-xs)]"
            aria-label="Password protected"
          >
            <LockIcon />
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-h3 text-[var(--color-ink)] mt-[var(--space-stack-xs)]">
        {title}
      </h3>

      {/* Role */}
      <p className="text-body-sm text-[var(--color-text-muted)]">
        {role}
      </p>

      {/* Impact line — hidden on protected cards */}
      {!isProtected && (
        <p className="text-body text-[var(--color-text-secondary)] mt-[var(--space-stack-xs)]">
          {cardImpactLine}
        </p>
      )}

      {isProtected && (
        <p className="text-body-sm text-[var(--color-text-muted)] mt-[var(--space-stack-xs)] italic">
          This case study contains confidential work. Request access or enter
          the password.
        </p>
      )}

      {/* CTA */}
      <div className="mt-auto pt-[var(--space-stack-md)]">
        <Link
          href={`/work/${slug}`}
          className="
            inline-flex items-center gap-[var(--space-component-xs)]
            text-ui-md text-[var(--color-accent)]
            hover:text-[var(--color-accent-deep)]
            transition-colors duration-200
            group/link
          "
        >
          {isProtected ? 'View case study' : 'View case study'}
          <span className="transition-transform duration-200 group-hover/link:translate-x-[2px]">
            <ArrowRight />
          </span>
        </Link>
      </div>
    </article>
  )
}
