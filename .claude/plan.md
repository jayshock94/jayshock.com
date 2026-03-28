# Plan: Tools & Skills Section on Homepage

## What we're building

A new **"My toolkit"** section on the homepage between "How I Work" (Section 04) and "Experience" (Section 05). It has 4 categories the user can switch between: **Tools**, **Skills**, **Education**, **Certs**.

### Same vibe as HowIWork, but different

- **Shared DNA**: pill-style toggle buttons with phase-like color coding, smooth transitions, same spacing/typography tokens
- **Different layout**: No compass ring. Instead, a horizontal row of 4 pill buttons at the top. Below that, a grid of items for the active category — items appear as small tags/chips or cards depending on content length
- **Different visual**: Each category gets its own color tint (reusing the 4 phase color sets), but the layout is a flat tag cloud / chip grid, not a ring + description

## Component: `components/about/Toolkit.tsx`

### Data structure
```ts
const CATEGORIES = [
  {
    id: 'tools',
    label: 'Tools',
    color: 'var(--phase-impact-label)',
    bg: 'rgba(180, 160, 224, 0.12)',
    border: 'rgba(180, 160, 224, 0.22)',
    items: ['Figma', 'Sketch', 'Framer', 'Miro', 'FigJam', 'Jira', 'Confluence', 'Linear', 'Notion', 'Hotjar', 'FullStory', 'Maze', 'Loom', 'Zeplin', 'Abstract']
  },
  {
    id: 'skills',
    label: 'Skills',
    color: 'var(--phase-problem-label)',
    bg: 'rgba(200, 170, 140, 0.12)',
    border: 'rgba(200, 170, 140, 0.22)',
    items: ['User Research', 'Interaction Design', 'Design Systems', 'Prototyping', 'Usability Testing', 'Wireframing', 'Information Architecture', 'Stakeholder Management', 'Cross-functional Leadership', 'Accessibility (WCAG)', 'Data-driven Design', 'Workshop Facilitation']
  },
  {
    id: 'education',
    label: 'Education',
    color: 'var(--phase-discovery-label)',
    bg: 'rgba(128, 196, 180, 0.12)',
    border: 'rgba(128, 196, 180, 0.22)',
    items: [
      { title: 'BFA, Graphic Design', subtitle: 'Utah Valley University' },
      { title: 'UX Design Certificate', subtitle: 'Google / Coursera' },
    ]
  },
  {
    id: 'certs',
    label: 'Certs',
    color: 'var(--phase-solution-label)',
    bg: 'rgba(140, 174, 214, 0.12)',
    border: 'rgba(140, 174, 214, 0.22)',
    items: [
      { title: 'Google UX Design Professional Certificate', subtitle: '2022' },
    ]
  },
]
```

> **NOTE**: These are placeholder items. Jay will swap the real content.

### Visual treatment

**Toggle pills** (horizontal row, not a ring):
- Active pill: glass background with category color tint + border, scaled 1.06x
- Inactive pill: `var(--color-surface)` background, neutral border, muted text
- Same pill styling as HowIWork but in a flex-wrap row

**Content area below pills**:
- For **Tools** and **Skills**: chips/tags in a flex-wrap grid. Each chip has:
  - Rounded pill shape
  - Active category's tinted background + border
  - Category-colored text
  - Smooth fade-in on category switch
- For **Education** and **Certs**: slightly larger cards (not chips) showing title + subtitle
  - Same tinted border/background as the category
  - Title in `text-h4`, subtitle in `text-body-sm`

**Grid stack trick** (same as HowIWork): all 4 content panels occupy the same grid cell with opacity toggle — prevents layout shift when switching.

### Accessibility
- `role="tablist"` on pill row, `role="tab"` on each pill
- `role="tabpanel"` on content area
- Arrow key navigation between pills
- `aria-selected`, `tabIndex` management

## Homepage placement

In `app/page.tsx`, add a new Section between "How I Work" and "Experience":

```
Section 04 — How I Work     (existing)
Section 05 — My Toolkit      (NEW)
Section 06 — Experience      (renumbered)
Section 07 — Contact CTA     (renumbered)
```

Same wrapper pattern:
```tsx
<section className="py-[var(--space-section-md)]" aria-label="My toolkit">
  <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
    <ScrollReveal>
      <div className="border-t border-[var(--color-border)] pt-[var(--space-section-sm)]">
        <Toolkit />
      </div>
    </ScrollReveal>
  </div>
</section>
```

## Files touched
1. **New**: `components/about/Toolkit.tsx` — the component
2. **Edit**: `app/page.tsx` — import and place between How I Work and Experience
