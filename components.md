# Component Specifications
## Portfolio Site — Visual Design Reference

> This file describes exactly how every component should look and feel.
> Read alongside design-system.md before building any component.
> The goal: a premium senior designer portfolio that feels designed,
> not templated. Every component should feel intentional.

---

## Design Principles

1. **Generous space.** Padding should always feel slightly more than necessary.
2. **Sharp typographic hierarchy.** The eye should never be confused about where to go next.
3. **Restraint with decoration.** If a visual element does not carry information it does not exist.
4. **Glass only on interactive surfaces.** If it cannot be clicked it does not get glass. Absolute rule.
5. **Warm not clinical.** Everything inherits warmth from the canvas system.

---

## Background Canvas System

### The effect
The page background is never a flat color. It uses a radial light bloom
that shifts position as the user scrolls — so the page feels lit from
within rather than printed on paper. This is the single biggest thing
that separates a designed site from an HTML page.

### Implementation
```css
body {
  background-color: #FAF8F5;
  background-image: radial-gradient(
    ellipse 90% 70% at 50% var(--bloom-y, 20%),
    #FFFFFF 0%,
    #FAF8F5 40%,
    #EDE9E3 100%
  );
  background-attachment: fixed;
  background-size: 100% 100%;
}
```

### Scroll behavior
Use a lightweight scroll listener that updates --bloom-y as the user scrolls.
At scroll position 0 the bloom is at 20% — light comes from above.
As user scrolls down the bloom moves with them — max 50%.
The movement is subtle — the bloom shifts maybe 30% across a full page scroll.

```javascript
window.addEventListener('scroll', () => {
  const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  const bloomY = 20 + (scrollPercent * 30);
  document.documentElement.style.setProperty('--bloom-y', bloomY + '%');
}, { passive: true });
```

### Edge vignette
A fixed pseudo-element that adds subtle depth at the viewport edges.
```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background: radial-gradient(
    ellipse 100% 100% at 50% 50%,
    transparent 50%,
    rgba(28, 25, 23, 0.04) 100%
  );
  pointer-events: none;
  z-index: 0;
}
```

### On case study pages
The bloom tints with the active phase color.
The base canvas shifts to the phase canvas value from design-system.md.
The bloom effect still applies on top of the phase tint.

### On the contact page
Background is flat #1C1917 — no bloom on the dark page.
The vignette inverts: a very subtle lighter center, darker edges.

---

## Navigation

### Visual design
```
Height:           64px
Position:         sticky top-0, z-index 50
Background:       rgba(245, 240, 228, 0.75)
Backdrop filter:  blur(20px) saturate(180%)
Border bottom:    0.5px solid rgba(28, 25, 23, 0.08)
Padding:          0 clamp(20px, 6vw, 80px)
Transition:       background 0.6s ease
```

### Logo
```
Element:          SVG from public/Shock_alone.svg
Width:            100px desktop, 80px mobile
Fill:             #1C1917 on light canvas
Fill dark:        #FAF8F5
No text name next to logo — wordmark only
```

### Nav links
```
Font:             Outfit 400, 13px
Color:            #7A746C default
Color hover:      #1C1917
Color active:     #1C1917
Letter spacing:   0.02em
Gap:              32px
Transition:       color 0.2s ease
Active indicator: 3px dot below active link, background #1C1917
```

### Contact CTA button
```
Background:       rgba(28, 25, 23, 0.75)
Color:            #FAF8F5
Font:             Outfit 500, 12px, letter-spacing 0.04em
Padding:          8px 20px
Border radius:    6px
Border:           0.5px solid rgba(255, 255, 255, 0.12)
Box shadow:       inset 0 0.5px 0 rgba(255, 255, 255, 0.1)
Backdrop filter:  blur(10px)
Hover:            background rgba(28, 25, 23, 0.9)
Active:           transform scale(0.98)
Transition:       all 0.2s ease
```

### Resume button
```
Background:       transparent
Color:            #1C1917
Font:             Outfit 400, 12px
Padding:          8px 16px
Border radius:    6px
Border:           0.5px solid rgba(28, 25, 23, 0.2)
Hover:            background rgba(28, 25, 23, 0.06)
Icon:             small download icon 14px before text
No glass
```

### Mobile
```
Below 768px:
Hamburger right side
Contact CTA always visible
Drawer slides from right, full height
Drawer background: rgba(250, 248, 245, 0.97) with blur
Links stacked, 48px touch targets
```

---

## Buttons

### Primary — Smoked Glass
```
Background:       rgba(28, 25, 23, 0.75)
Color:            #FAF8F5
Font:             Outfit 500, 13px
Padding:          10px 24px
Border radius:    6px
Border:           0.5px solid rgba(255, 255, 255, 0.12)
Box shadow:       inset 0 0.5px 0 rgba(255, 255, 255, 0.1)
Backdrop filter:  blur(12px)
Min height:       44px
Hover:            background rgba(28, 25, 23, 0.9)
Active:           transform scale(0.98)
Transition:       all 0.2s ease
```

### Secondary — Outlined
```
Background:       transparent
Color:            #1C1917
Font:             Outfit 400, 13px
Padding:          10px 24px
Border radius:    6px
Border:           0.5px solid #C8C4BC
Min height:       44px
Hover:            background rgba(28, 25, 23, 0.04)
                  border-color #3D3A36
Active:           transform scale(0.98)
No glass
```

### View Project pill — overlaid on card image
This is the glass pill button that sits at the bottom of work card images.
Keep this from the existing site — it works well.
```
Background:       rgba(245, 240, 228, 0.85)
Backdrop filter:  blur(10px)
Color:            #1C1917
Font:             Outfit 400, 13px
Padding:          10px 20px
Border radius:    40px
Border:           0.5px solid rgba(255, 255, 255, 0.6)
Box shadow:       inset 0 0.5px 0 rgba(255, 255, 255, 0.5)
Position:         absolute bottom 16px, centered horizontally
Icon:             small arrow icon 14px before text
Hover:            background rgba(245, 240, 228, 0.96)
Transition:       all 0.2s ease
```

### Ghost — text link
```
Background:       transparent
Color:            #7A746C
Font:             Outfit 400, 13px
Padding:          8px 0
Border:           none
Hover:            color #1C1917
Arrow shifts 3px right on hover
Transition:       all 0.2s ease
```

---

## Work Cards (Homepage)

### What to keep from your existing site
- Stats displayed inside the card with bold number and small label
- Mockup images floating at the bottom of the card
- White card surface
- Bold card titles
- The glass pill "View project" button over the image

### What to improve
- More generous padding
- Cleaner typographic hierarchy
- Better image area treatment
- More intentional hover state

### Card container
```
Background:       #FFFFFF
Border:           0.5px solid #E2DDD6
Border radius:    16px
Padding:          28px 28px 0 28px
Overflow:         hidden
Transition:       transform 0.25s ease, border-color 0.25s ease,
                  box-shadow 0.25s ease
Hover:            transform translateY(-4px)
                  border-color #C8C4BC
                  box-shadow 0 12px 40px rgba(28, 25, 23, 0.08)
```

### Card content area
```
Padding bottom:   20px

Eyebrow:
  Font:           Outfit 400, 10px, uppercase, letter-spacing 0.1em
  Color:          #B8B2A8
  Margin bottom:  10px

Title:
  Font:           Outfit 700, 22px
  Color:          #1C1917
  Line height:    1.2
  Letter spacing: -0.01em
  Margin bottom:  10px

Description:
  Font:           Outfit 300, 14px
  Color:          #7A746C
  Line height:    1.65
  Margin bottom:  20px

Stats row:
  Display:        flex, gap 24px
  Margin bottom:  20px

  Stat number:
    Font:         Outfit 700, 28px
    Color:        #1C1917
    Line height:  1
    Margin bottom: 3px

  Stat label:
    Font:         Outfit 300, 11px
    Color:        #B8B2A8
    Line height:  1.4
```

### Card image area
```
Position:         relative
Height:           220px
Margin:           0 -28px
Overflow:         visible

Background:       #F0EDE8
Border radius:    0 (bottom of card)

Mockup images:
  Position:       absolute bottom 0
  Object fit:     contain
  Float above edge: transform translateY(-8px)
  Let images breathe — no forced sizing

View project pill:
  Position:       absolute bottom 16px, left 50%, transform translateX(-50%)
  See pill button spec above
```

### Grid
```
Desktop:    3 columns, gap 20px
Tablet:     2 columns, gap 16px
Mobile:     1 column, gap 16px
Max width:  1200px centered
```

---

## Hero Section

### Container
```
Padding top:      clamp(80px, 12vw, 140px)
Padding bottom:   clamp(60px, 8vw, 100px)
Padding sides:    clamp(20px, 6vw, 80px)
Text align:       left
```

### Logo badge
```
Display:          inline-flex, align-items center
Background:       #1C1917
Padding:          10px 20px
Border radius:    40px
Margin bottom:    32px

Logo SVG inside:
  Width:          120px
  Fill:           #FAF8F5
```

### Headline
```
Font:             Outfit
Size:             clamp(48px, 7vw, 80px)
Line height:      1.05
Letter spacing:   -0.02em
Max width:        900px
Margin bottom:    20px

Mixed weight — key words bold, others light:
  Light words:    Outfit 300, color #9A948A
  Bold words:     Outfit 700, color #1C1917
  Pattern based on existing site:
    "I" light
    "design" bold
    "products that turn" light
    "complex systems" bold
    "into" light
    "clarity." bold
```

### Subline
```
Font:             Outfit 300, 17px
Color:            #7A746C
Line height:      1.7
Max width:        480px
Margin bottom:    36px
```

### CTA row
```
Display:          flex, gap 12px, align-items center
Primary:          "View my work" — smoked glass
Secondary:        "Download resume" — outlined
```

---

## Case Study Hero

### Container
```
Background:       var(--case-surface)
Padding top:      clamp(80px, 10vw, 120px)
Padding bottom:   clamp(48px, 6vw, 80px)
Padding sides:    clamp(20px, 6vw, 80px)
```

### Metadata tags
```
Display:          flex, gap 8px, flex-wrap wrap
Margin bottom:    20px

Each tag:
  Font:           Outfit 400, 10px, uppercase, letter-spacing 0.08em
  Color:          var(--case-label)
  Background:     rgba(255, 255, 255, 0.35)
  Padding:        4px 12px
  Border radius:  20px
  Border:         0.5px solid rgba(255, 255, 255, 0.45)
```

### Title
```
Font:             Outfit 700, clamp(32px, 5vw, 52px)
Color:            #1C1917
Line height:      1.1
Letter spacing:   -0.02em
Max width:        720px
Margin bottom:    36px
```

### Stat blocks
```
Display:          grid, 3 columns, gap 14px
Max width:        680px

Each block:
  Background:     rgba(255, 255, 255, 0.55)
  Backdrop filter: blur(12px)
  Border:         0.5px solid rgba(255, 255, 255, 0.55)
  Border radius:  12px
  Padding:        20px 24px

Stat number:
  Font:           Outfit 700, 32px
  Color:          var(--case-label)
  Margin bottom:  4px

Stat label:
  Font:           Outfit 300, 12px
  Color:          #7A746C
  Line height:    1.4

Footnote:
  Font:           Outfit 300, 10px, italic
  Color:          #B8B2A8
  Margin top:     4px
```

---

## Phase Sections

### Container
```
Padding:          clamp(56px, 7vw, 88px) clamp(20px, 6vw, 80px)
Background:       var(--phase-[name]-bg)
Transition:       background 0.7s ease
Position:         relative
```

### Left accent bar
```
Position:         absolute left 0 top 0 bottom 0
Width:            3px
Background:       var(--phase-[name]-label)
Transition:       background 0.5s ease
Border radius:    0
```

### Phase label
```
Font:             Outfit 500, 10px, uppercase, letter-spacing 0.1em
Color:            var(--phase-[name]-label)
Margin bottom:    12px
```

### Heading
```
Font:             Outfit 700, 26px
Color:            #1C1917
Line height:      1.2
Letter spacing:   -0.01em
Margin bottom:    20px
Max width:        680px
```

### Body
```
Font:             Outfit 300, 15px
Color:            #3D3A36
Line height:      1.75
Max width:        640px
Margin bottom:    16px
```

### Pull quote
```
Border left:      3px solid var(--phase-[name]-label)
Padding left:     20px
Margin:           28px 0
Font:             Outfit 300 italic, 18px
Color:            #1C1917
Line height:      1.55
Max width:        560px
Border radius:    0
```

---

## About Page

### Layout
```
Two column desktop: text 55%, photo 40%, gap 80px
Single column mobile
Padding:          clamp(80px, 10vw, 120px) clamp(20px, 6vw, 80px)
```

### Photo
```
Border radius:    16px
Border:           0.5px solid #E2DDD6
Aspect ratio:     4/5
Object fit:       cover
```

### Philosophy callout
```
Background:       #F0EDE8
Border radius:    16px
Padding:          40px 48px
Margin:           48px 0

Text:
  Font:           Outfit 700, 22px
  Color:          #1C1917
  Line height:    1.35
  Letter spacing: -0.01em
```

---

## Experience Page

### Skills grid
```
Display:          grid, 2 columns desktop, 1 mobile
Gap:              16px

Card:
  Background:     #FFFFFF
  Border:         0.5px solid #E2DDD6
  Border radius:  12px
  Padding:        24px 28px
  Hover:          border-color #C8C4BC

Label:
  Font:           Outfit 500, 10px, uppercase, letter-spacing 0.1em
  Color:          #B8B2A8
  Margin bottom:  10px

Skills text:
  Font:           Outfit 300, 14px
  Color:          #3D3A36
  Line height:    1.7
```

### Timeline
```
Role title:       Outfit 700, 18px, #1C1917
Company/dates:    Outfit 400, 13px, #B8B2A8
Description:      Outfit 300, 14px, #3D3A36, lh 1.7, max-width 580px
Border bottom:    0.5px solid #E2DDD6 between roles
Padding:          28px 0 per role
```

### Certifications
```
Display:          flex, gap 8px, flex-wrap wrap

Each pill:
  Background:     #F0EDE8
  Border:         0.5px solid #E2DDD6
  Border radius:  20px
  Padding:        6px 14px
  Font:           Outfit 400, 12px
  Color:          #3D3A36
```

---

## Contact Page

### Canvas
```
Background:       #1C1917 flat — no bloom
Min height:       100vh
Padding:          clamp(80px, 10vw, 120px) clamp(20px, 6vw, 80px)
```

### Heading
```
Font:             Outfit 700, clamp(40px, 6vw, 64px)
Color:            #FAF8F5
Line height:      1.05
Letter spacing:   -0.02em
Margin bottom:    14px
```

### Subline
```
Font:             Outfit 300, 16px
Color:            rgba(250, 248, 245, 0.6)
Max width:        420px
Line height:      1.7
Margin bottom:    48px
```

### Form
```
Background:       rgba(255, 255, 255, 0.05)
Border:           0.5px solid rgba(255, 255, 255, 0.1)
Border radius:    16px
Padding:          36px 40px
Max width:        520px
Backdrop filter:  blur(10px)
```

### Inputs
```
Background:       rgba(255, 255, 255, 0.07)
Border:           0.5px solid rgba(255, 255, 255, 0.12)
Border radius:    8px
Padding:          12px 16px
Font:             Outfit 300, 14px
Color:            #FAF8F5
Placeholder:      rgba(250, 248, 245, 0.3)
Min height:       44px
Width:            100%
Margin bottom:    16px
Focus:            border-color rgba(255, 255, 255, 0.35), no outline
```

### Labels
```
Font:             Outfit 500, 10px, uppercase, letter-spacing 0.08em
Color:            rgba(250, 248, 245, 0.4)
Margin bottom:    6px
```

### Submit button
```
Background:       #FAF8F5
Color:            #1C1917
Font:             Outfit 500, 13px
Padding:          13px 28px
Border radius:    6px
Width:            100%
Min height:       44px
Hover:            background rgba(250, 248, 245, 0.9)
Transition:       all 0.2s ease
```

---

## Footer

### Layout
```
Border top:       0.5px solid #E2DDD6
Padding:          28px clamp(20px, 6vw, 80px)
Display:          flex, space-between, align-items center
Max width:        1200px centered

Left:   Logo SVG 80px wide, fill #1C1917
Center: Nav links — Outfit 400, 12px, #B8B2A8, gap 24px
Right:  Social links — Outfit 400, 12px, #B8B2A8, gap 16px

All links hover: color #1C1917, transition 0.2s ease

Copyright:
  Font:           Outfit 300, 11px
  Color:          #B8B2A8
  Text align:     center
  Margin top:     16px
```

---

## Typography Scale — Outfit Only

```
Display:    Outfit 700, clamp(48px, 7vw, 80px), lh 1.05, ls -0.02em
H1:         Outfit 700, clamp(32px, 5vw, 52px), lh 1.1, ls -0.02em
H2:         Outfit 700, 28px, lh 1.2, ls -0.01em
H3:         Outfit 700, 22px, lh 1.25, ls -0.01em
H4:         Outfit 600, 18px, lh 1.3
Body large: Outfit 300, 17px, lh 1.75
Body:       Outfit 300, 15px, lh 1.7
Body small: Outfit 300, 13px, lh 1.65
UI medium:  Outfit 400, 13px, lh 1.4
UI small:   Outfit 500, 11px, lh 1.3, ls 0.08em, uppercase
Label:      Outfit 400, 10px, ls 0.1em, uppercase
```

---

## Page Transitions

```
Page mount:     opacity 0 to 1, translateY 6px to 0, 0.35s ease
Hover states:   0.2s ease always
Phase shifts:   background 0.7s ease
Nav glass tint: 0.6s ease
Bloom scroll:   0.1s ease
```

---

## What Never Appears

- Drop shadows on content elements
- Gradient fills on section backgrounds other than the canvas bloom
- Decorative dividers between sections
- Bullet point lists in body copy
- Centered body text except contact page heading
- All caps headings — only labels use uppercase
- Emoji anywhere on the site
- Skill percentage bars or tag clouds
- Animated number counters
- Particle effects or noise textures on content areas
- Any color not passed through the color algorithm

---

*Last updated: build phase · Portfolio site · Phase 1*
*Read alongside design-system.md and brand-guidelines.pdf*
*Every specification here is a design decision not a suggestion*
