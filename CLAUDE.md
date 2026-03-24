# CLAUDE.md — Master Session Reference

> Read this file completely before writing any code, making any visual decision,
> or generating any token value. Every session starts here.

---

## What This Project Is

Two connected Next.js sites sharing one design system:

**Site 1 — Portfolio** (`yourname.com`)
Public facing. Case studies, resume, about, contact.
This is built first. Read only for visitors.

**Site 2 — Studio** (`studio.yourname.com`)
Built second. Acts as the CMS and business operating system for Site 1.
Handles client portal, invoicing, project management, blog, and lead capture.
When logged in as admin, controls all content on the portfolio site.

These two sites share the same design system, token system, and component library.
Never make a decision for one site that breaks consistency with the other.

---

## Always Read Before Any Code

Before writing a single line of code or making any visual decision, read these files in order:

1. `brand-guidelines.md` — the why behind every visual decision
2. `design-system.md` — all tokens, color algorithm, type scale, spacing
3. `data-model.md` — how content is structured (when it exists)
4. This file — current phase, rules, and what is in and out of scope

If any of these files conflict, ask for clarification before proceeding.
Never assume. Never guess. Never default to your training data for visual decisions.

---

## Stack

```
Framework       Next.js 14+ App Router
Language        TypeScript — strict mode always
Styling         Tailwind CSS + CSS custom properties for tokens
Fonts           Fraunces (Google Fonts) + Jost (Google Fonts)
Color space     oklch for all color algorithm calculations
State           React context for phase/theme state
Auth            NextAuth.js (when Studio is built)
Database        PostgreSQL + Prisma (when Studio is built)
Deployment      Vercel
```

---

## Absolute Rules — Never Break These

These rules apply to every file, every component, every session:

### Color rules
- Never hardcode any color value anywhere in the codebase
- Never use a hex, rgb, hsl, or oklch value directly in a component
- Always use CSS custom property tokens — `var(--color-canvas)`, `var(--phase-impact-bg)`, etc.
- Never assign a color to any token without first running it through the color algorithm
- Never use a color outside the generated token set
- Always reference `design-system.md` before making any color decision
- Always reference `brand-guidelines.md` before any visual decision

### Layout rules
- Never write inline styles on layout elements
- Desktop first — design for laptop screens (1024px–1440px) as the primary viewport
- Mobile must work — if the layout cannot adapt gracefully to mobile, flag it and propose an alternative before building
- Never use a spacing value that is not a named semantic token
- Never exceed `--space-layout-max` (1200px) for page content width
- Never exceed `--space-content-max` (720px) for body copy line length

### Component rules
- Glass treatment applies only to interactive elements — buttons, nav, modals, dropdowns
- Never apply glass to non-interactive content surfaces
- Nav bar receives glass because it contains interactive elements
- Every interactive element must meet WCAG AA contrast minimum (4.5:1 for text, 3:1 for large text)
- Aim for AAA (7:1) on all body text where achievable without breaking the token system

### Code rules
- TypeScript strict mode — no `any` types
- No magic numbers anywhere — every value must reference a token or a named constant
- Components must be mobile aware even when designed desktop first
- Every new component gets its own file
- Never put business logic inside a component — separate concerns always

---

## Color Algorithm — How It Works

The designer controls hue. The algorithm controls everything else.

### Step 1 — Input
Designer provides a color direction. Can be an exact hex (`#38A169`) or a description
(`warm green`). Claude Code converts to oklch.

### Step 2 — Hue extraction
Extract hue angle from oklch. Discard input lightness and chroma entirely.

### Step 3 — Brand fit constraints
Rebuild the color using the extracted hue plus system-constrained values:
- Chroma: clamped to `0.04–0.12` (warm, desaturated — never vivid)
- Lightness for backgrounds: `0.92–0.96`
- Lightness for borders: `0.82–0.88`
- Lightness for labels/accents: `0.35–0.55`
- Lightness for text: always defaults to `--color-ink` (#1C1917) unless label passes AAA alone

### Step 4 — Contrast check
Check every derived token against WCAG targets:
- Background tokens: no contrast requirement (they are surfaces)
- Border tokens: 1.5:1 minimum against background
- Label tokens: 4.5:1 minimum against background (AA)
- Text tokens: 7:1 minimum against background (AAA) — shift lightness until passing, never change hue

### Step 5 — Token output
Return the full token set for that context:

```typescript
generateTokens('#38A169') // designer says "green for Solution"
// returns:
{
  bg:     '#F2F6F3',  // very light green tint
  border: '#C8DAD0',  // slightly deeper, same hue
  label:  '#2A5E3A',  // readable accent, same hue, AA passing
  text:   '#1C1917'   // always ink unless label covers AAA
}
```

The designer always gets their hue. The algorithm always delivers contrast and harmony.

---

## Design Token Reference

Full token values live in `design-system.md`.
This section lists the token categories Claude Code must know exist.

### Color tokens
```
--color-canvas          Page background — the paper
--color-surface         Cards and raised elements
--color-surface-glass   Nav and interactive glass surfaces
--color-border          Default borders and dividers
--color-ink             #1C1917 — warm near-black
--color-text-primary    Headings and primary body
--color-text-secondary  Supporting body copy
--color-text-muted      Metadata, labels, captions
--color-accent          Warm slate blue — tertiary role only
--color-accent-tint     Hover backgrounds on accent elements
```

### Phase tokens (fixed across all case studies)
```
--phase-impact-bg       --phase-impact-border
--phase-impact-label    --phase-impact-text
--phase-problem-bg      --phase-problem-border
--phase-problem-label   --phase-problem-text
--phase-discovery-bg    --phase-discovery-border
--phase-discovery-label --phase-discovery-text
--phase-solution-bg     --phase-solution-border
--phase-solution-label  --phase-solution-text
```

### Case study override tokens (set per case study via data)
```
--case-accent           Muted brand hue — hero header only
--case-surface          Subtle tinted hero surface
```
These default to `--color-canvas` and `--color-accent` when not overridden.
They are never used outside the case study hero section.

### Typography tokens
```
--text-display          Fraunces 400, 56px, lh 1.1, ls 0.02em
--text-h1               Fraunces 400, 36px, lh 1.2, ls 0.015em
--text-h2               Fraunces 400, 26px, lh 1.25, ls 0.01em
--text-h3               Fraunces 400, 20px, lh 1.3, ls 0.008em
--text-h4               Fraunces 400, 16px, lh 1.35, ls 0.006em
--text-body-lg          Jost 300, 18px, lh 1.75
--text-body             Jost 300, 15px, lh 1.7
--text-body-sm          Jost 300, 13px, lh 1.65
--text-ui-md            Jost 400, 13px, lh 1.4
--text-ui-sm            Jost 500, 11px, lh 1.3, ls 0.08em, uppercase
--text-label            Jost 400, 10px, ls 0.1em, uppercase
```

### Spacing tokens
```
Fixed component tokens:
--space-component-xs    4px
--space-component-sm    8px
--space-component-md    16px
--space-component-lg    24px
--space-stack-sm        12px
--space-stack-md        24px
--space-stack-lg        32px

Fluid section tokens (use clamp):
--space-section-sm      clamp(32px, 5vw, 48px)
--space-section-md      clamp(48px, 7vw, 80px)
--space-section-lg      clamp(64px, 10vw, 128px)
--space-page-margin     clamp(20px, 6vw, 80px)

Fixed layout tokens:
--space-content-max     720px
--space-layout-max      1200px
```

---

## Glass Treatment Rules

Glass is a functional signal — it means this element is interactive.
Never apply glass to non-interactive surfaces.

```
Nav bar             → glass (contains interactive elements)
Primary button      → smoked dark glass (rgba(28,25,23,0.75))
Secondary button    → outlined, no glass
Ghost button        → no background, no glass
Modals/drawers      → glass surface
Dropdowns           → glass surface
Tooltips            → glass surface
Content cards       → no glass (not interactive)
Section backgrounds → no glass (not interactive)
Body copy           → no glass (not interactive)
Images              → no glass (not interactive)
```

---

## Phase Color System

Case study pages dynamically shift ambient color as the user reads through phases.
Phases are always in this order with Impact first:

```
1. Impact     — opens the case study, deepest tone, commands attention
2. Problem    — context and constraints, warm neutral
3. Discovery  — research and insights, cool neutral
4. Solution   — closes with craft and decisions, brand slate
```

### How the shift works
When a phase section enters the viewport (Intersection Observer):
1. Canvas background shifts subtly to `--phase-[name]-bg`
2. Nav glass surface picks up a tint of the phase hue at low opacity
3. Phase label and left border accent shift to `--phase-[name]-label`
4. Primary button glass tint shifts to phase hue
5. All typography stays static — `--color-ink` never changes

The shift should feel like the room changed lighting — not like a color swap.
Reference M3 surface color behavior: the difference between phases should be
barely perceptible in isolation but immediately felt when transitioning.

### What never shifts
- All typography colors
- All border colors on non-phase elements
- Image treatments
- Section padding and spacing
- Component sizing

---

## Homepage Rules

The homepage is black and white only. No phase color system. No case study brand colors.

Think of it as the gallery lobby — neutral, calm, sets the tone before you walk into any room.

```
Background          #FAF8F5 (canvas — warm white, not pure white)
All text            #1C1917 (ink) and neutral scale only
Case study cards    Monochromatic — no color thumbnails
Navigation          Glass, but neutral — no phase tinting on homepage
Buttons             Smoked dark glass
Accent use          None — slate blue does not appear on homepage
```

---

## Case Study Brand Color Rules

Each case study can define a primary brand color.
This color appears only in the hero header section and the work index card thumbnail.
It never appears in the phase sections below the hero.

The brand color must always be processed through the color algorithm before use:
1. Extract hue from the brand color
2. Apply brand fit constraints
3. Output `--case-accent` and `--case-surface`
4. Never use the raw brand color directly

---

## Page Structure — Phase 1 Portfolio Site

```
/                   Homepage — work index, hero, about teaser, contact CTA
/work               Full work index (if separate from homepage)
/work/[slug]        Individual case study
/about              About page
/resume             Resume page — AI scraped and formatted for download
/contact            Contact page
```

### Case study page structure
```
1. Nav (glass, phase-aware after hero)
2. Hero — brand color processed, impact stats, CTA
3. Phase sections in order: Impact → Problem → Discovery → Solution
4. Next case study navigation
5. Footer
```

---

## Current Build Phase

**Phase 1 — Portfolio site only**

In scope:
- All pages listed under Page Structure above
- Design system token setup in Tailwind + CSS variables
- Phase color shift system with Intersection Observer
- Color algorithm utility function
- Fraunces + Jost font loading and token setup
- Responsive layout — desktop first, mobile must work
- Homepage black and white treatment
- Case study brand color processing

Out of scope (Phase 2):
- Studio site
- Authentication and user roles
- CMS and admin panel
- Client portal
- Invoicing and billing
- Blog
- Lead capture forms and packages
- Database and API routes beyond static data

---

## File Structure — Portfolio Site

```
/
├── CLAUDE.md
├── brand-guidelines.md
├── design-system.md
├── app/
│   ├── layout.tsx          Global layout, font loading, CSS variable injection
│   ├── page.tsx            Homepage
│   ├── work/
│   │   ├── page.tsx        Work index
│   │   └── [slug]/
│   │       └── page.tsx    Case study
│   ├── about/page.tsx
│   ├── resume/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── nav/
│   ├── case-study/
│   │   ├── CaseStudyHero.tsx
│   │   ├── PhaseSection.tsx
│   │   └── PhaseObserver.tsx
│   ├── work/
│   │   └── WorkCard.tsx
│   └── ui/
│       ├── Button.tsx
│       └── GlassSurface.tsx
├── lib/
│   └── colorAlgorithm.ts   oklch color processing utility
├── data/
│   └── case-studies/       Static JSON or MDX per case study
├── styles/
│   └── tokens.css          All CSS custom properties
└── public/
    └── assets/
```

---

## Open Questions — Flag Before Proceeding

If any of the following are encountered, stop and ask before building:

- A color decision not covered by the token system
- A component that doesn't clearly fit the glass rule
- A layout that works on desktop but breaks the mobile experience in a non-obvious way
- A case study brand color that resists the algorithm constraints
- Any feature that seems to belong to Phase 2
- Any spacing value that doesn't map to a named token
- Any type size that doesn't exist in the scale

When in doubt, ask. Never assume.

---

*Last updated: pre-build planning phase · Portfolio site · Phase 1*
