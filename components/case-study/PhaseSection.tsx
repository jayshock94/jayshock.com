import Image from 'next/image'
import type { CaseStudyImage, ContentBlock, GlossaryTerm, PhaseContent, PhaseKey } from '@/data/types'
import ScrollReveal from '@/components/ui/ScrollReveal'
import GlossaryParagraph from './GlossaryParagraph'
import BarnabyTooltip from './BarnabyTooltip'
import PhoneFrame from './PhoneFrame'
import PaymentSuccessAnimation from './PaymentSuccessAnimation'

interface PhaseSectionProps {
  phase:   PhaseKey
  content: PhaseContent
  /** Phase number for the eyebrow (1-based). */
  phaseNumber?: number
  /** Custom media node injected after a specific content block. */
  mediaSlot?: React.ReactNode
  /** Which content block index to inject mediaSlot after. Default: last block. */
  mediaSlotAfterBlock?: number
  /** Glossary terms to highlight inline with Barnaby tooltips. */
  glossary?: GlossaryTerm[]
  /** Optional inline note shown after the first paragraph. Full text is a Barnaby tooltip. */
  headerNote?: {
    text: string
    barnabyTerm: string
    barnabyDefinition: string
  }
}

const PHASE_LABELS: Record<PhaseKey, string> = {
  impact:    'Impact',
  problem:   'Problem',
  discovery: 'Discovery',
  solution:  'Solution',
}

const PHASE_VARS: Record<PhaseKey, {
  bg:     string
  border: string
  label:  string
  text:   string
  glass:  string
}> = {
  impact: {
    bg:     'var(--phase-impact-glass)',
    border: 'var(--phase-impact-border)',
    label:  'var(--phase-impact-label)',
    text:   'var(--phase-impact-text)',
    glass:  'var(--phase-impact-glass)',
  },
  problem: {
    bg:     'var(--phase-problem-glass)',
    border: 'var(--phase-problem-border)',
    label:  'var(--phase-problem-label)',
    text:   'var(--phase-problem-text)',
    glass:  'var(--phase-problem-glass)',
  },
  discovery: {
    bg:     'var(--phase-discovery-glass)',
    border: 'var(--phase-discovery-border)',
    label:  'var(--phase-discovery-label)',
    text:   'var(--phase-discovery-text)',
    glass:  'var(--phase-discovery-glass)',
  },
  solution: {
    bg:     'var(--phase-solution-glass)',
    border: 'var(--phase-solution-border)',
    label:  'var(--phase-solution-label)',
    text:   'var(--phase-solution-text)',
    glass:  'var(--phase-solution-glass)',
  },
}

/** Render a caption with an optional Barnaby "note" tooltip at the end. */
function Caption({ text, note, accentColor }: { text: string; note?: string; accentColor: string }) {
  return (
    <figcaption className="mt-[var(--space-component-sm)] text-body-sm text-[var(--color-text-muted)] text-center">
      {text}
      {note && (
        <>
          {' '}
          <BarnabyTooltip
            term="Recreated"
            definition={note}
            accentColor={accentColor}
          />
        </>
      )}
    </figcaption>
  )
}

/** Render images with breakout layouts based on count and aspect. */
function renderImages(images: CaseStudyImage[], vars: typeof PHASE_VARS.impact) {
  if (images.length === 0) return null

  const isSingleLandscape = images.length === 1 && images[0].aspect === 'landscape'
  const isSinglePortrait = images.length === 1 && images[0].aspect === 'portrait'

  if (isSingleLandscape) {
    // Break out to full layout width
    return (
      <ScrollReveal>
        <div
          className="max-w-layout"
          style={{ marginTop: 'var(--space-stack-lg)', marginBottom: 'var(--space-stack-md)' }}
        >
          <figure className="m-0">
            {images[0].src ? (
              <div
                className="relative w-full rounded-[var(--radius-md)] overflow-hidden border border-[var(--color-border)]"
                style={{ aspectRatio: '16/9' }}
              >
                <Image
                  src={images[0].src}
                  alt={images[0].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 1200px"
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                />
              </div>
            ) : (
              <div
                className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] flex items-center justify-center p-[var(--space-component-md)]"
                style={{ background: 'var(--color-surface)', aspectRatio: '16/9' }}
              >
                <p className="text-body-sm text-[var(--color-text-muted)] text-center opacity-60">
                  {images[0].alt}
                </p>
              </div>
            )}
            {images[0].caption && (
              <Caption text={images[0].caption} note={images[0].captionNote} accentColor={vars.label} />
            )}
          </figure>
        </div>
      </ScrollReveal>
    )
  }

  if (isSinglePortrait) {
    const isConfetti = images[0].src === '__confetti__'
    // Phase-tinted background well with phone frame or confetti animation
    return (
      <ScrollReveal>
        <div
          className="max-w-content"
          style={{ marginTop: 'var(--space-stack-lg)', marginBottom: 'var(--space-stack-md)' }}
        >
          <figure className="m-0">
            <div
              className="rounded-[12px] p-[var(--space-component-lg)] flex justify-center"
              style={{ background: vars.glass }}
            >
              {isConfetti ? (
                <PaymentSuccessAnimation delayStart={800} displayWidth={280} />
              ) : images[0].src ? (
                <PhoneFrame
                  src={images[0].src}
                  alt={images[0].alt}
                  maxWidth={280}
                />
              ) : (
                <div
                  className="w-full max-w-[280px] rounded-[var(--radius-md)] border border-[var(--color-border)] flex items-center justify-center p-[var(--space-component-md)]"
                  style={{ background: 'var(--color-surface)', aspectRatio: '9/18' }}
                >
                  <p className="text-body-sm text-[var(--color-text-muted)] text-center opacity-60">
                    {images[0].alt}
                  </p>
                </div>
              )}
            </div>
            {images[0].caption && (
              <Caption text={images[0].caption} note={images[0].captionNote} accentColor={vars.label} />
            )}
          </figure>
        </div>
      </ScrollReveal>
    )
  }

  // Multiple images: side by side at layout width
  return (
    <ScrollReveal>
      <div
        className="max-w-layout grid grid-cols-1 md:grid-cols-2 gap-[var(--space-component-md)]"
        style={{
          marginTop: 'var(--space-stack-lg)',
          marginBottom: 'var(--space-stack-md)',
        }}
      >
        {images.map((img, j) => (
          <figure key={j} className="m-0">
            {img.src && img.aspect === 'portrait' ? (
              <div className="flex justify-center">
                <PhoneFrame
                  src={img.src}
                  alt={img.alt}
                  caption={img.caption}
                  maxWidth={240}
                />
              </div>
            ) : img.src ? (
              <>
                <div
                  className="relative w-full rounded-[var(--radius-md)] overflow-hidden border border-[var(--color-border)]"
                  style={{ aspectRatio: img.aspect === 'portrait' ? '9/18' : '16/9' }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                  />
                </div>
                {img.caption && (
                  <Caption text={img.caption} note={img.captionNote} accentColor={vars.label} />
                )}
              </>
            ) : (
              <>
                <div
                  className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] flex items-center justify-center p-[var(--space-component-md)]"
                  style={{
                    background: 'var(--color-surface)',
                    aspectRatio: img.aspect === 'portrait' ? '9/18' : '16/9',
                  }}
                >
                  <p className="text-body-sm text-[var(--color-text-muted)] text-center opacity-60">
                    {img.alt}
                  </p>
                </div>
                {img.caption && (
                  <Caption text={img.caption} note={img.captionNote} accentColor={vars.label} />
                )}
              </>
            )}
          </figure>
        ))}
      </div>
    </ScrollReveal>
  )
}

export default function PhaseSection({
  phase,
  content: phaseContent,
  phaseNumber,
  mediaSlot,
  mediaSlotAfterBlock,
  glossary,
  headerNote,
}: PhaseSectionProps) {
  const vars   = PHASE_VARS[phase]
  const label  = PHASE_LABELS[phase]
  const { headline, content, stats, images, quote, estimatedNote } = phaseContent

  // Group images by which content block they follow
  const imagesByBlock = (images ?? []).reduce<Record<number, CaseStudyImage[]>>(
    (acc, img) => {
      const key = img.afterBlock ?? content.length - 1
      acc[key] = [...(acc[key] ?? []), img]
      return acc
    },
    {},
  )

  const phaseNum = phaseNumber ? String(phaseNumber).padStart(2, '0') : undefined

  // Track paragraph count to apply text-intro only to the first paragraph block
  let paragraphCount = 0

  return (
    <section
      id={phase}
      data-phase-section={phase}
      className="py-[var(--space-section-lg)] transition-colors duration-700"
      style={{
        backgroundColor: vars.bg,
        backgroundImage: `radial-gradient(ellipse 80% 50% at 50% 20%, ${vars.glass}, transparent 70%)`,
      }}
      aria-labelledby={`phase-heading-${phase}`}
    >
      <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">

        {/* Phase eyebrow with number */}
        <ScrollReveal>
          <div className="flex items-center justify-center gap-[var(--space-component-sm)] mb-[var(--space-stack-sm)]">
            {phaseNum && (
              <span
                className="text-label"
                style={{ color: 'var(--color-text-placeholder)' }}
              >
                {phaseNum}
              </span>
            )}
            <span className="text-label" style={{ color: vars.label }}>
              {label}
            </span>
          </div>
        </ScrollReveal>

        {/* Section headline */}
        <ScrollReveal>
          <h2
            id={`phase-heading-${phase}`}
            className="text-h2 text-[var(--color-ink)] max-w-content mx-auto text-center mb-[var(--space-stack-lg)]"
          >
            {headline}
          </h2>
        </ScrollReveal>

        {/* Stats (Impact phase) */}
        {stats && stats.length > 0 && (
          <div
            className="max-w-data grid grid-cols-2 md:grid-cols-3 gap-[var(--space-component-md)] mb-[var(--space-section-md)]"
            role="list"
            aria-label="Impact metrics"
          >
            {stats.map((stat, i) => (
              <ScrollReveal key={i}>
                <div
                  className={`bg-[var(--color-stat-box-bg)] border border-[var(--color-border)] rounded-[var(--radius-md)] p-[var(--space-component-lg)]${
                    stats.length === 3 && i === 2 ? ' col-span-2 md:col-span-1' : ''
                  }`}
                  role="listitem"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <p
                    className="text-stat-lg"
                    style={{
                      color: 'var(--color-ink)',
                      marginBottom: 'var(--space-stack-xs)',
                    }}
                  >
                    {stat.value}
                    {stat.estimated && (
                      <sup
                        className="text-label text-[var(--color-text-muted)] ml-[2px]"
                        aria-label="estimated"
                      >
                        *
                      </sup>
                    )}
                  </p>
                  <p className="text-body-sm text-[var(--color-text-muted)]">
                    {stat.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Content blocks with interleaved images and mediaSlot */}
        <div className="flex flex-col gap-[var(--space-stack-md)]">
          {content.map((block, i) => {
            const isFirstParagraph = block.type === 'paragraph' && paragraphCount === 0
            if (block.type === 'paragraph') paragraphCount++

            return (
              <div key={`block-${i}`}>
                {/* ── Paragraph block ── */}
                {block.type === 'paragraph' && (
                  <ScrollReveal>
                    {glossary && glossary.length > 0 ? (
                      <GlossaryParagraph
                        text={block.text}
                        glossary={glossary}
                        accentColor={vars.label}
                        className={isFirstParagraph ? 'text-intro' : 'text-body'}
                        style={{
                          color: isFirstParagraph ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                          maxWidth: 'var(--space-content-max)',
                          margin: '0 auto',
                        }}
                      />
                    ) : (
                      <p
                        className={isFirstParagraph ? 'text-intro' : 'text-body'}
                        style={{
                          color: isFirstParagraph ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                          maxWidth: 'var(--space-content-max)',
                          margin: '0 auto',
                        }}
                      >
                        {block.text}
                      </p>
                    )}
                  </ScrollReveal>
                )}

                {/* Inline note after first paragraph */}
                {headerNote && isFirstParagraph && (
                  <ScrollReveal>
                    <p
                      className="text-body-sm"
                      style={{
                        color: 'var(--color-text-muted)',
                        maxWidth: 'var(--space-content-max)',
                        margin: 'var(--space-stack-sm) auto 0',
                      }}
                    >
                      <BarnabyTooltip
                        term={headerNote.barnabyTerm}
                        definition={headerNote.barnabyDefinition}
                        accentColor={vars.label}
                      />
                    </p>
                  </ScrollReveal>
                )}

                {/* ── Subheader block ── */}
                {block.type === 'subheader' && (
                  <ScrollReveal>
                    <h3
                      className="text-h4 text-[var(--color-ink)] max-w-content mx-auto"
                      style={{
                        marginTop: i > 0 ? 'var(--space-stack-lg)' : undefined,
                      }}
                    >
                      {block.text}
                    </h3>
                  </ScrollReveal>
                )}

                {/* ── List block ── */}
                {block.type === 'list' && (
                  <ScrollReveal>
                    <div style={{ maxWidth: 'var(--space-content-max)', margin: '0 auto' }}>
                      {block.lead && (
                        <p
                          className="text-body"
                          style={{
                            color: 'var(--color-text-secondary)',
                            marginBottom: 'var(--space-stack-sm)',
                          }}
                        >
                          {block.lead}
                        </p>
                      )}
                      <ul
                        className="flex flex-col gap-[var(--space-stack-xs)]"
                        style={{ paddingLeft: 'var(--space-component-md)' }}
                      >
                        {block.items.map((item, j) => (
                          <li
                            key={j}
                            className="text-body phase-list-item"
                            style={{ color: 'var(--color-text-secondary)' }}
                          >
                            <span
                              className="phase-list-bullet"
                              style={{ backgroundColor: vars.label }}
                              aria-hidden="true"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>
                )}

                {/* mediaSlot insertion */}
                {mediaSlot && (mediaSlotAfterBlock ?? content.length - 1) === i && (
                  <ScrollReveal>
                    <div style={{ marginTop: 'var(--space-section-sm)' }}>
                      {mediaSlot}
                    </div>
                  </ScrollReveal>
                )}

                {/* Images after this content block */}
                {imagesByBlock[i] && renderImages(imagesByBlock[i], vars)}
              </div>
            )
          })}
        </div>

        {/* Pull quote — breaks out of content column */}
        {quote && (
          <ScrollReveal>
            <blockquote
              className="max-w-layout mx-auto text-center"
              style={{
                marginTop: 'var(--space-section-md)',
                marginBottom: 'var(--space-stack-lg)',
                paddingTop: 'var(--space-stack-lg)',
                paddingBottom: 'var(--space-stack-lg)',
                borderTop: '0.5px solid var(--color-border)',
                borderBottom: '0.5px solid var(--color-border)',
              }}
            >
              <p
                className="text-h2 italic max-w-content mx-auto"
                style={{
                  color: 'var(--color-ink)',
                  marginBottom: quote.attribution ? 'var(--space-stack-sm)' : undefined,
                }}
              >
                &ldquo;{quote.text}&rdquo;
              </p>
              {quote.attribution && (
                <cite
                  className="text-body-sm not-italic"
                  style={{ color: vars.label }}
                >
                  – {quote.attribution}
                </cite>
              )}
            </blockquote>
          </ScrollReveal>
        )}

        {/* Estimated metrics footnote */}
        {estimatedNote && (
          <p className="mt-[var(--space-stack-lg)] text-body-sm text-[var(--color-text-muted)] max-w-content mx-auto text-center">
            <sup aria-hidden="true">*</sup> {estimatedNote}
          </p>
        )}
      </div>
    </section>
  )
}
