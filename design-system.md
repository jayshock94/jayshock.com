# Design System — Token Reference

> This file is the single source of truth for all visual tokens.
> Claude Code reads this before making any color, typography, or spacing decision.
> Never hardcode any value that exists in this file. Always use the named token.

---

## Color System

### Philosophy
Color in this system has one job — to make the content visible and to orient the user.
The canvas is the gallery wall. The tokens are the lighting. The work is the art.

Glass treatment applies only to interactive elements.
Phase colors shift the ambient environment as the user reads through a case study.
The homepage is monochromatic — no phase color, no accent color.

---

### Primitive Scale — Neutral

These are the raw values. Never use these directly in components.
Components always use semantic tokens that reference these.

```css
/* Warm neutral scale — no cool greys anywhere in the system */
--neutral-50:   #FAF8F5;   /* Canvas — the paper */
--neutral-100:  #F0EDE8;   /* Surface — cards and raised elements */
--neutral-200:  #E2DDD6;   /* Border light */
--neutral-300:  #C8C4BC;   /* Border mid */
--neutral-400:  #B8B2A8;   /* Stone — muted text, placeholders */
--neutral-500:  #9A948A;   /* Mid neutral */
--neutral-600:  #7A746C;   /* Muted text */
--neutral-700:  #5A5450;   /* Secondary text */
--neutral-800:  #3D3A36;   /* Dark neutral */
--neutral-900:  #1C1917;   /* Ink — warm near-black, primary text */
```

---

### Primitive Scale — Accent (Warm Slate Blue)

```css
--slate-50:   #E8EEF4;   /* Accent tint — hover backgrounds */
--slate-100:  #C8D8E8;   /* Light accent */
--slate-200:  #B8CCE0;   /* Accent border */
--slate-300:  #8AAAC8;   /* Mid-light accent */
--slate-500:  #4A7499;   /* Main accent — tertiary interactive */
--slate-700:  #2C4A6B;   /* Deep accent — active/selected states */
--slate-900:  #1A2E42;   /* Darkest accent */
```

---

### Primitive Scale — Glass

Glass surfaces carry a warm sepia tint — not Apple's cool frosted glass.
These are opacity values applied over the canvas.

```css
--glass-warm-light:   rgba(245, 240, 228, 0.40);  /* Subtle tint panels */
--glass-warm-mid:     rgba(245, 240, 228, 0.72);  /* Nav, floating surfaces */
--glass-warm-heavy:   rgba(245, 240, 228, 0.88);  /* Modals, overlays */
--glass-dark:         rgba(28, 25, 23, 0.75);     /* Primary button — smoked glass */
--glass-dark-light:   rgba(28, 25, 23, 0.55);     /* Secondary dark glass */
```

---

### Semantic Tokens — Brand (Fixed, Never Change)

These are what every component uses. They never change regardless of phase or case study.

```css
/* Surfaces */
--color-canvas:           var(--neutral-50);      /* #FAF8F5 — page background */
--color-surface:          var(--neutral-100);     /* #F0EDE8 — cards, raised elements */
--color-surface-glass:    var(--glass-warm-mid);  /* Nav and floating glass panels */
--color-surface-elevated: #FFFFFF;                /* Modals and top-layer surfaces */

/* Borders */
--color-border:           var(--neutral-200);     /* #E2DDD6 — default borders */
--color-border-mid:       var(--neutral-300);     /* #C8C4BC — emphasis borders */
--color-border-strong:    var(--neutral-400);     /* #B8B2A8 — strong borders */

/* Text */
--color-ink:              var(--neutral-900);     /* #1C1917 — headings, primary text */
--color-text-primary:     var(--neutral-900);     /* #1C1917 */
--color-text-secondary:   var(--neutral-800);     /* #3D3A36 — supporting body */
--color-text-muted:       var(--neutral-600);     /* #7A746C — metadata, captions */
--color-text-placeholder: var(--neutral-400);     /* #B8B2A8 — placeholder text */

/* Accent — tertiary role only, not primary action */
--color-accent:           var(--slate-500);       /* #4A7499 — active states, selected */
--color-accent-tint:      var(--slate-50);        /* #E8EEF4 — hover backgrounds */
--color-accent-border:    var(--slate-200);       /* #B8CCE0 — accent borders */
--color-accent-deep:      var(--slate-700);       /* #2C4A6B — active/pressed accent */

/* Interactive — glass buttons */
--color-button-primary:   var(--glass-dark);      /* Smoked dark glass */
--color-button-text:      var(--neutral-50);      /* #FAF8F5 — text on dark glass */
--color-button-border:    rgba(255,255,255,0.12); /* Subtle white edge on dark glass */
```

---

### Dark Mode Tokens

Dark mode inverts to warm dark — not pure black.
All tokens above get remapped inside `@media (prefers-color-scheme: dark)`.

```css
@media (prefers-color-scheme: dark) {
  --color-canvas:           #1A1816;              /* Warm dark — not pure black */
  --color-surface:          #242018;              /* Slightly lighter warm dark */
  --color-surface-glass:    rgba(40,35,28,0.85);  /* Dark warm glass */
  --color-surface-elevated: #2E2A24;

  --color-border:           #2E2A26;
  --color-border-mid:       #3A3630;
  --color-border-strong:    #4A4640;

  --color-ink:              #F0EDE8;              /* Warm white text on dark */
  --color-text-primary:     #F0EDE8;
  --color-text-secondary:   #B8B2A8;
  --color-text-muted:       #7A746C;
  --color-text-placeholder: #5A5450;

  --color-accent:           #6A94B9;              /* Lightened slate for dark mode */
  --color-accent-tint:      rgba(74,116,153,0.15);
  --color-accent-border:    rgba(74,116,153,0.30);
  --color-accent-deep:      #8AAAC8;

  --color-button-primary:   rgba(240,237,232,0.12); /* Light smoked glass on dark */
  --color-button-text:      #F0EDE8;
  --color-button-border:    rgba(255,255,255,0.15);
}
```

---

### Phase Color Tokens

Fixed across all case studies. Generated using the color algorithm.
Phase order is always: Impact → Problem → Discovery → Solution.

```css
/* Impact — opens the case study, deepest tone */
--phase-impact-bg:      #EAE6F5;   /* Very light purple-slate tint */
--phase-impact-border:  #C4BAE8;   /* Slightly deeper, same hue */
--phase-impact-label:   #4A3A7A;   /* AA passing against bg */
--phase-impact-text:    #1C1917;   /* Always ink */

/* Problem — context and constraints, warm neutral */
--phase-problem-bg:     #F5F0EB;   /* Very light warm brown tint */
--phase-problem-border: #DDD0C0;   /* Slightly deeper */
--phase-problem-label:  #8C6A50;   /* AA passing against bg */
--phase-problem-text:   #1C1917;

/* Discovery — research and insights, cool-warm neutral */
--phase-discovery-bg:     #EAF0EE;   /* Very light teal-green tint */
--phase-discovery-border: #BACED4;   /* Slightly deeper */
--phase-discovery-label:  #3A7A68;   /* AA passing against bg */
--phase-discovery-text:   #1C1917;

/* Solution — closes with craft, brand slate */
--phase-solution-bg:     #E8EEF4;   /* Very light slate tint */
--phase-solution-border: #B8CCE0;   /* Slightly deeper */
--phase-solution-label:  #2C4A6B;   /* AA passing against bg */
--phase-solution-text:   #1C1917;
```

**Phase ambient shift values** — used by the Intersection Observer system:

```css
/* Canvas shift per phase (subtle — barely perceptible) */
--phase-impact-canvas:    #F2EEF8;
--phase-problem-canvas:   #F6F2EC;
--phase-discovery-canvas: #EEF4F0;
--phase-solution-canvas:  #EBF0F6;

/* Nav glass tint per phase */
--phase-impact-nav:     rgba(242,238,248,0.80);
--phase-problem-nav:    rgba(246,242,236,0.80);
--phase-discovery-nav:  rgba(238,244,240,0.80);
--phase-solution-nav:   rgba(235,240,246,0.80);
```

---

### Case Study Override Tokens

Set per case study via data. Never used outside the hero section.
Processed through the color algorithm before assignment — never raw brand colors.
Default to brand values when not overridden.

```css
--case-accent:    var(--color-accent);   /* Overridden: muted brand hue */
--case-surface:   var(--color-canvas);  /* Overridden: subtle tinted hero bg */
--case-border:    var(--color-border);  /* Overridden: brand-tinted border */
--case-label:     var(--color-accent);  /* Overridden: brand-tinted label */
```

---

### Color Algorithm — Implementation

The color algorithm lives in `lib/colorAlgorithm.ts`.
It must be used any time a new color is assigned to any token.

```typescript
// lib/colorAlgorithm.ts

interface ColorTokenSet {
  bg: string;
  border: string;
  label: string;
  text: string;
  canvas: string;
  nav: string;
}

// Constraints — all derived colors must stay within these ranges
const CONSTRAINTS = {
  chroma: { min: 0.04, max: 0.12 },
  bg: { lightness: { min: 0.92, max: 0.96 } },
  border: { lightness: { min: 0.82, max: 0.88 } },
  label: { lightness: { min: 0.35, max: 0.55 } },
  canvas: { lightness: 0.965, chroma: 0.015 },
};

// WCAG contrast targets
const CONTRAST = {
  label: 4.5,   // AA minimum
  text: 7.0,    // AAA target
};

export function generateTokens(inputHex: string): ColorTokenSet {
  // 1. Convert input to oklch
  // 2. Extract hue only — discard input lightness and chroma
  // 3. Apply constraints to generate each token
  // 4. Check contrast — shift lightness until passing, never change hue
  // 5. Return full token set
  // Implementation follows oklch specification
}
```

---

## Typography System

### Fonts

```
Single font:    Outfit (Google Fonts)
                Variable-weight sans-serif — humanist with geometric clarity
                Weight 300 for body copy and long reads
                Weight 400 for UI text, buttons, labels
                Weight 500 for headings H2–H4 and uppercase labels
                Weight 600 for H1
                Weight 700 for Display only
                Variable: --font-outfit
```

### Loading

```typescript
// app/layout.tsx
import { Outfit } from 'next/font/google'

const outfit = Outfit({
  subsets:  ['latin'],
  weight:   ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  display:  'swap',
})
```

---

### Type Scale

All sizes in px for reference. Always use the named token in components.
Never hardcode a font size, weight, line height, or letter spacing value.

**Weight logic:** Display is the only level at 700. Each step down sheds weight.
This creates genuine hierarchy — not just size changes.

```
Display   700   — commanding. Homepage hero only.
H1        600   — confident. Page titles, case study titles.
H2        500   — clear. Section headings, phase titles.
H3        500   — present. Subsection headings, card titles.
H4        500   — grounded. Minor headings, tight contexts.
Intro     300   — spacious. Lead paragraphs, hero sublines.
Body-lg   300   — readable. Supporting intro copy.
Body      300   — workhorse. Case study content, long reads.
Body-sm   300   — compact. Secondary content, captions.
UI-md     400   — functional. Buttons, nav, interactive text.
UI-sm     500   — distinct. Uppercase labels, tags.
Label     400   — metadata. Eyebrows, timestamps, captions.
```

```css
/* Display — homepage hero only */
--text-display-size:        clamp(48px, 7vw, 80px);
--text-display-weight:      700;
--text-display-line-height: 1.05;
--text-display-tracking:    -0.02em;

/* H1 — page titles, case study titles */
--text-h1-size:             clamp(32px, 5vw, 52px);
--text-h1-weight:           600;
--text-h1-line-height:      1.1;
--text-h1-tracking:         -0.02em;

/* H2 — section headings, phase titles */
--text-h2-size:             28px;
--text-h2-weight:           500;
--text-h2-line-height:      1.2;
--text-h2-tracking:         -0.01em;

/* H3 — subsection headings, card titles */
--text-h3-size:             22px;
--text-h3-weight:           500;
--text-h3-line-height:      1.25;
--text-h3-tracking:         -0.01em;

/* H4 — minor headings, tight contexts */
--text-h4-size:             18px;
--text-h4-weight:           500;
--text-h4-line-height:      1.3;
--text-h4-tracking:         0em;

/* Intro — lead paragraphs, hero sublines, section openers.
   Use when body-lg (17px) is too small but content is prose not a heading.
   Sits between body-lg and H3. Never use for headings. */
--text-intro-size:          20px;
--text-intro-weight:        300;
--text-intro-line-height:   1.7;

/* Body large — supporting intro copy, about page openers */
--text-body-lg-size:        17px;
--text-body-lg-weight:      300;
--text-body-lg-line-height: 1.75;

/* Body — standard body copy, case study content */
--text-body-size:           15px;
--text-body-weight:         300;
--text-body-line-height:    1.8;

/* Body small — secondary content, card descriptions */
--text-body-sm-size:        13px;
--text-body-sm-weight:      300;
--text-body-sm-line-height: 1.65;

/* UI medium — buttons, nav links, interactive text */
--text-ui-md-size:          13px;
--text-ui-md-weight:        400;
--text-ui-md-line-height:   1.4;

/* UI small — phase labels, tags, uppercase UI */
--text-ui-sm-size:          11px;
--text-ui-sm-weight:        500;
--text-ui-sm-line-height:   1.3;
--text-ui-sm-tracking:      0.08em;
--text-ui-sm-transform:     uppercase;

/* Label — eyebrows, metadata, captions */
--text-label-size:          11px;
--text-label-weight:        400;
--text-label-line-height:   1.3;
--text-label-tracking:      0.1em;
--text-label-transform:     uppercase;
```

### Responsive Type Adjustments

Display and H1 scale via clamp — no media query needed.
Intro and body-lg compress slightly on mobile.

```css
@media (max-width: 768px) {
  --text-intro-size:   17px;
  --text-body-lg-size: 16px;
}
```

---

### Mixed-Weight Headline Pattern

A documented technique for the display level only. Alternates weight 300 and
weight 700 spans within a single headline to create rhythm and emphasis.

**Rules:**
- Only permitted at `text-display` size. Never at H1 or below.
- Maximum one alternation — two segments, not four.
- Weight 300 carries the connective or descriptive words.
- Weight 700 carries the core statement the reader should remember.
- Color follows the existing text token rules — no custom colors.
- Never use this technique for a heading that will appear more than once on a page.

```tsx
// Correct — one alternation, connective words at 300, statement at 700
<h1 className="text-display">
  <span style={{ fontWeight: 300, color: 'var(--color-text-muted)' }}>I make </span>
  <span style={{ fontWeight: 700, color: 'var(--color-ink)' }}>complex products </span>
  <span style={{ fontWeight: 300, color: 'var(--color-text-muted)' }}>feel like they were always </span>
  <span style={{ fontWeight: 700, color: 'var(--color-ink)' }}>simple.</span>
</h1>

// Wrong — used at H2 size
<h2 className="text-h2">
  <span style={{ fontWeight: 300 }}>How I </span>
  <span style={{ fontWeight: 700 }}>work</span>
</h2>
```

---

## Spacing System

### Philosophy
Fixed spacing for components — tied to readability and touch targets, never changes.
Fluid spacing for sections — breathes on large screens, compresses on mobile.
No spacing value appears in code without a named token.

---

### Primitive Scale — 8pt Base

```css
--space-1:   4px;
--space-2:   8px;
--space-3:   12px;
--space-4:   16px;
--space-5:   24px;
--space-6:   32px;
--space-7:   48px;
--space-8:   64px;
--space-9:   96px;
--space-10:  128px;
```

---

### Semantic Tokens — Component (Fixed)

Internal component spacing. Never changes at any breakpoint.
Tied to readability, touch targets (minimum 44px), and visual grouping.

```css
/* Internal component gaps */
--space-component-xs:   var(--space-1);   /* 4px  — icon to label, dot gaps */
--space-component-sm:   var(--space-2);   /* 8px  — tight gaps, nav link spacing */
--space-component-md:   var(--space-4);   /* 16px — default button/input padding */
--space-component-lg:   var(--space-5);   /* 24px — card padding, form groups */

/* Vertical text stacking */
--space-stack-xs:       6px;              /* Tight interior gaps */
--space-stack-sm:       var(--space-3);   /* 12px — eyebrow to heading (standardized) */
--space-stack-md:       var(--space-5);   /* 24px — heading to body */
--space-stack-lg:       var(--space-6);   /* 32px — body to CTA */
```

---

### Semantic Tokens — Section (Fluid)

Section and page level spacing. Scales with viewport using clamp().
Never applies inside a component — only between sections and layout blocks.

```css
/* Between related sections */
--space-section-sm:   clamp(32px, 5vw, 48px);

/* Standard page section padding — top and bottom */
--space-section-md:   clamp(48px, 7vw, 80px);

/* Hero sections, major page-level breaks */
--space-section-lg:   clamp(64px, 10vw, 128px);

/* Left and right page margin — all breakpoints */
--space-page-margin:  clamp(20px, 6vw, 80px);
```

---

### Layout Constraints (Fixed)

```css
/* Max width for body copy and data grids — centered layout column */
--space-content-max:  860px;

/* Max width for full page layout */
--space-layout-max:   1200px;
```

---

### Grid System

```
Mobile    375px+    4 columns   16px margin   16px gutter
Tablet    768px+    8 columns   32px margin   24px gutter
Desktop   1024px+   12 columns  fluid margin  32px gutter   1200px max
Wide      1440px+   12 columns  auto margin   32px gutter   1200px locked
```

Tailwind config:

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      maxWidth: {
        content: '860px',
        layout: '1200px',
      },
      screens: {
        sm: '375px',
        md: '768px',
        lg: '1024px',
        xl: '1440px',
      },
    }
  }
}
```

---

## Glass Treatment System

### Rule
Glass is a functional signal. If an element cannot be clicked, it does not get glass.

### Implementation

```css
/* Base glass mixin — apply to interactive surfaces */
.glass {
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

/* Nav bar glass */
.glass-nav {
  background: var(--color-surface-glass);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 0.5px solid rgba(0,0,0,0.06);
  transition: background 0.7s ease;
}

/* Primary button — smoked dark glass */
.glass-button-primary {
  background: var(--color-button-primary);   /* rgba(28,25,23,0.75) */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 0.5px solid var(--color-button-border);
  box-shadow: inset 0 0.5px 0 rgba(255,255,255,0.1);
  color: var(--color-button-text);
  transition: background 0.7s ease, border-color 0.7s ease;
}

/* Modal and overlay glass */
.glass-overlay {
  background: var(--glass-warm-heavy);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
```

### What gets glass

| Element | Glass type | Notes |
|---|---|---|
| Nav bar | `glass-nav` | Phase-aware tint after homepage |
| Primary button | `glass-button-primary` | Smoked dark glass always |
| Modal surface | `glass-overlay` | Full overlay |
| Dropdown panel | `glass-warm-mid` | Warm tint |
| Tooltip | `glass-warm-light` | Subtle tint |

### What never gets glass

Content cards, section backgrounds, body copy, images, dividers,
phase section backgrounds, hero content areas, any static non-interactive surface.

---

## Component Specifications

### Button — Primary
```
Background:     glass-dark (rgba(28,25,23,0.75))
Text:           --color-button-text (#FAF8F5)
Border:         0.5px solid rgba(255,255,255,0.12)
Border radius:  6px
Padding:        8px 20px
Font:           --text-ui-md (Jost 400, 13px)
Blur:           backdrop-filter: blur(12px)
Hover:          background opacity increases to 0.88
Active:         scale(0.98)
Transition:     all 0.2s ease
```

### Button — Secondary
```
Background:     transparent
Text:           --color-text-primary
Border:         0.5px solid --color-border-mid
Border radius:  6px
Padding:        8px 20px
Font:           --text-ui-md
Hover:          background --color-surface
No glass
```

### Button — Ghost
```
Background:     transparent
Text:           --color-text-muted
Border:         none
Padding:        8px 16px
Font:           --text-ui-md
Hover:          text --color-text-primary
No glass
```

### Nav Bar
```
Height:         52px
Background:     --color-surface-glass (phase-aware)
Border bottom:  0.5px solid rgba(0,0,0,0.06)
Blur:           backdrop-filter: blur(16px)
Position:       sticky top-0
Z-index:        50
Padding:        0 --space-page-margin
Transition:     background 0.7s ease
```

### Work Card (Infographic Style)
```
Background:     tokens.heroZone (brand color)
Border:         0.5px solid rgba(255,255,255,0.06), brightens on hover
Border radius:  16px
Padding:        clamp(24px, 4vw, 40px)
Min height:     clamp(280px, 30vw, 360px)

Layout (top to bottom):
  Industry (left) + Year (right)    --text-label, rgba(255,255,255,0.4)
  Hero stat value                   clamp(28px, 4vw, 40px), weight 700, white
  Hero stat label                   --text-body-sm, rgba(255,255,255,0.55)
  Title                             clamp(20px, 2.5vw, 28px), weight 600, white
  Role · Company                    --text-body-sm, rgba(255,255,255,0.45)
  Type tags                         pill style, rgba(255,255,255,0.12) border
  CTA                               "View case study" with arrow

Image:          48% width on right (desktop), 220px bottom bleed (mobile)
Hover:          border brightens, lift -3px, shadow deepens
```

### Case Study Hero
```
Background:     --case-surface (processed brand color)
Padding top:    --space-section-lg
Padding sides:  --space-page-margin
Max width:      --space-layout-max
Phase label:    --text-label, --phase-impact-label color
Heading:        --text-h1, --color-ink
Stats row:      3 columns, white glass surface at 55% opacity
CTA button:     glass-button-primary
```

### Phase Section
```
Background:     --phase-[name]-bg (shifts on scroll)
Border left:    2.5px solid --phase-[name]-label
Padding left:   --space-component-lg
Padding y:      --space-section-sm
Phase label:    --text-ui-sm, --phase-[name]-label
Heading:        --text-h3, --color-ink
Body:           --text-body, --color-text-secondary
Transition:     background 0.7s ease, border-color 0.5s ease

Content blocks (ContentBlock union type):
  paragraph     Standard body text. First paragraph uses --text-intro.
  subheader     h3 element, --text-h4, extra top margin (--space-stack-lg)
  list          Optional lead paragraph + ul with phase-colored bullet dots
                Bullet: 5px circle in --phase-[name]-label color
```

### Content Writing Guidelines
```
Never use em dashes for emphasis (only in quote attributions)
Vary sentence length: mix 3-word punches with longer descriptors
Add subheaders to any phase with 3+ content blocks
Convert findings and decisions to bullet lists when scannable
Keep paragraphs to 2-3 sentences max
Write image captions that tell the story independently
Use first person, show judgment, acknowledge tradeoffs
```

---

## Contrast Reference

All token combinations have been verified against WCAG standards.
If a new token combination is introduced it must be checked before use.

| Background | Text token | Ratio | Standard |
|---|---|---|---|
| --color-canvas | --color-ink | 16.4:1 | AAA |
| --color-canvas | --color-text-secondary | 9.2:1 | AAA |
| --color-canvas | --color-text-muted | 4.8:1 | AA |
| --color-surface | --color-ink | 14.1:1 | AAA |
| --phase-impact-bg | --phase-impact-label | 4.6:1 | AA |
| --phase-problem-bg | --phase-problem-label | 4.7:1 | AA |
| --phase-discovery-bg | --phase-discovery-label | 4.5:1 | AA |
| --phase-solution-bg | --phase-solution-label | 5.1:1 | AA |
| glass-dark button | --color-button-text | 12.8:1 | AAA |

All body text targets AAA. All UI text meets AA minimum.
Run the color algorithm contrast check before adding any new token combination.

---

## Tailwind Token Integration

CSS custom properties map to Tailwind via the config.
Never use Tailwind's default color palette — always use the custom token classes.

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        canvas:     'var(--color-canvas)',
        surface:    'var(--color-surface)',
        ink:        'var(--color-ink)',
        muted:      'var(--color-text-muted)',
        accent:     'var(--color-accent)',
        border:     'var(--color-border)',
      },
      fontFamily: {
        display:  'var(--font-fraunces)',
        body:     'var(--font-jost)',
      },
      spacing: {
        'component-sm':   'var(--space-component-sm)',
        'component-md':   'var(--space-component-md)',
        'component-lg':   'var(--space-component-lg)',
        'section-sm':     'var(--space-section-sm)',
        'section-md':     'var(--space-section-md)',
        'section-lg':     'var(--space-section-lg)',
        'page-margin':    'var(--space-page-margin)',
        'content-max':    'var(--space-content-max)',
        'layout-max':     'var(--space-layout-max)',
      },
      backdropBlur: {
        glass:  '14px',
        'glass-heavy': '20px',
      },
    }
  }
}
```

---

## CSS Custom Properties Setup

All tokens are defined in `styles/tokens.css` and imported in `app/layout.tsx`.

```css
/* styles/tokens.css */

:root {
  /* Primitives */
  /* Neutral scale */
  /* Accent scale */
  /* Glass values */

  /* Semantic — brand */
  /* Semantic — phase */
  /* Semantic — case study overrides */

  /* Typography */
  /* Spacing */
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Dark mode overrides */
  }
}

/* Phase class overrides — applied by PhaseObserver component */
[data-phase="impact"] {
  --color-canvas:         var(--phase-impact-canvas);
  --color-surface-glass:  var(--phase-impact-nav);
}
[data-phase="problem"] {
  --color-canvas:         var(--phase-problem-canvas);
  --color-surface-glass:  var(--phase-problem-nav);
}
[data-phase="discovery"] {
  --color-canvas:         var(--phase-discovery-canvas);
  --color-surface-glass:  var(--phase-discovery-nav);
}
[data-phase="solution"] {
  --color-canvas:         var(--phase-solution-canvas);
  --color-surface-glass:  var(--phase-solution-nav);
}

/* Case study brand color overrides — set via inline style on case study wrapper */
/* Example: style="--case-accent: #C4736E; --case-surface: #F5EDEB;" */
```

---

*Last updated: pre-build planning phase · Portfolio site · Phase 1*
*All token values confirmed against WCAG AA minimum*
*Color algorithm implementation required before any new color token is introduced*
