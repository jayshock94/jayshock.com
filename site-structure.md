# Site Structure & Page Specifications
## Portfolio Site — Phase 1

> This document defines every page, its purpose, its content sections,
> and the decisions behind each choice. Read alongside CLAUDE.md and
> design-system.md before building any page.

---

## Navigation

### Structure
```
[Logo/Name]    Work    About    Experience    [Contact →]
```

### Rules
- Four elements maximum — logo, three nav items, one CTA
- Work is first — it is the primary reason visitors come
- Contact is a CTA button with glass treatment, not a nav link
- Experience replaces Resume — broader, more accurate, more useful
- No dropdown menus in Phase 1
- Nav is sticky, glass surface, phase-aware after homepage
- On mobile: hamburger collapses Work, About, Experience. Contact stays visible.

### Why these four
- Work — the work is why they came. First, always.
- About — supporting context for the work. Humanizes the designer.
- Experience — serves recruiters who need a resume. Generates downloadable PDF.
- Contact — the goal of every page. CTA treatment signals this is an action.

### What is not in the nav
- No Skills page — skills live inside case studies, that is proof not claims
- No Blog — belongs on the consulting site in Phase 2
- No Services — belongs on the consulting site in Phase 2
- No separate Work Index — homepage grid serves this role with 3–4 case studies

---

## Pages

---

### / — Homepage

**Purpose**
The gallery lobby. Orients every visitor type in under 10 seconds.
Monochromatic — black and white only. No phase colors. No accent colors.
The color system activates only when you enter a case study.

**Visitor flow**
- Recruiter: reads hero, scans work cards, clicks Experience for resume
- Hiring manager: reads hero, clicks first case study card
- Design director: reads hero positioning, clicks case study, reads deeply
- Consulting prospect (Phase 2): reads hero, reads about teaser, contacts

**Sections in order**

```
01  Hero
02  Featured Work
03  About Teaser
04  Contact CTA
```

**Section 01 — Hero**
- Your name (display size, Fraunces)
- Positioning statement: "I design products that turn complex systems into clarity"
- One sentence description: what you do, for whom, at what level
- Two actions: View Work (primary glass button) + Download Resume (secondary)
- No photo of yourself — the work is the face of the site
- Background: #FAF8F5 canvas — no imagery, no pattern

**Section 02 — Featured Work**
- Section eyebrow label: "Selected Work" in --text-label style
- 3 case study cards maximum
- Each card contains:
  - Industry tag (eyebrow)
  - Project title (H3, Fraunces)
  - Your role — one line
  - One impact line — the outcome in plain language
  - "View case study" link
- Cards are monochromatic — no color thumbnails on homepage
- Order: strongest case study first, then by relevance to target roles
- No "View All Work" link until you have 5+ case studies

**Section 03 — About Teaser**
- 2–3 sentences maximum — a point of view, not a bio
- References your design philosophy (complexity into clarity, Tesler's Law thinking)
- Ends with a link: "More about how I work →"
- No photo, no bullet list of skills, no logos of companies

**Section 04 — Contact CTA**
- One line framing the invitation — open to both employment and consulting
- Single CTA button linking to /contact
- Keep it minimal — this is a closing note, not a sales pitch

---

### /work/[slug] — Case Study

**Purpose**
The core product of the portfolio. Each case study is a complete argument
that this designer understood a complex problem, navigated real constraints,
made decisions worth examining, and produced something that improved the
experience for the people using it.

**Phase color system**
Active on case study pages only.
Canvas and glass surfaces shift as user scrolls through phases.
Transition is ambient — feels like lighting changing, not a color swap.

**Page sections in order**

```
00  Case Study Header (above fold)
01  Impact (opens the case study)
02  Problem
03  Discovery
04  Solution
05  Next Case Study (footer navigation)
```

**Section 00 — Case Study Header**
Purpose: Recruiter reads this only. Must communicate everything in 5 seconds.
- Company name and/or industry
- Project title (H1, Fraunces)
- Your role — specific, one line ("Lead Product Designer, end to end")
- Year
- Type tags (Research · Systems · Enterprise · etc.)
- If password protected: lock icon + unlock prompt before content loads
- Background: processed brand color via --case-surface token
- Phase color system not yet active — this is still the lobby

**Section 01 — Impact**
Purpose: Opens the case study. Hiring manager reads this and decides if
the work is worth their time. Lead with the answer, earn the process.
- Phase background: --phase-impact-bg (#EAE6F5)
- Eyebrow: "Impact" in --text-ui-sm, --phase-impact-label color
- Outcome headline (H2): what changed in plain language
- 2–3 stat blocks:
  - Stat number or observation
  - Stat label
  - If estimated: small asterisk, methodology note below
- Context sentence: scale of the product and your involvement
- Honest footnote if metrics are estimated, not formally tracked

**Section 02 — Problem**
Purpose: Context and constraints. Shows strategic thinking.
Naming the tension between business goal and user reality is a senior signal.
- Phase background: --phase-problem-bg (#F5F0EB)
- Eyebrow: "Problem" in --phase-problem-label color
- Section title (H2): what was hard and why it mattered
- Business goal paragraph: what the organization needed
- User reality paragraph: what users actually experienced (different from business goal)
- Your role and scope: what you owned, what the team owned
- Constraints: time, technical, organizational, political

**Section 03 — Discovery**
Purpose: Research and insights. Senior peer reads this most carefully.
They want to see real research producing real insight — not research as a checkbox.
- Phase background: --phase-discovery-bg (#EAF0EE)
- Eyebrow: "Discovery" in --phase-discovery-label color
- Section title (H2): what you learned and how
- Research methods: brief list of what you did and why
- Key findings: 2–3 maximum, not an exhaustive list
- The pivot insight: the one thing that changed your direction
- Supporting artifacts (pick 1–2 max):
  - User quotes in a pull-quote component
  - Journey map or flow screenshot
  - Data visualization or analytics screenshot
  - Research synthesis note or affinity diagram

**Section 04 — Solution**
Purpose: Decisions and craft. Design director reads to here.
Decisions and tradeoffs at this level separate senior from mid.
- Phase background: --phase-solution-bg (#E8EEF4)
- Eyebrow: "Solution" in --phase-solution-label color
- Section title (H2): what you made and the decisions behind it
- Key decision 1: what you chose and what you rejected
- Key decision 2: a tradeoff you made and the reasoning
- Key decision 3: something you would do differently (shows maturity)
- Final screens or prototype (2–4 images max, captioned)
- Handoff note if relevant: how you worked with engineering

**Section 05 — Next Case Study**
Purpose: Never leave a reader with nowhere to go.
If they finished the case study they are engaged — make the next action easy.
- Background: --color-canvas (neutral, phase color released)
- Next case study card (same format as homepage work card)
- "Back to all work" text link
- Contact CTA: one line + button

---

### /about — About

**Purpose**
Serves two audiences simultaneously — hiring manager evaluating a candidate,
and potential consulting client evaluating a partner.
Both need to feel like they are reading about a person who gets it,
not a designer who assembled a brand identity document.

**Sections in order**

```
01  Who I Am
02  How I Think
03  How I Work
04  Experience Snapshot
05  Contact CTA
```

**Section 01 — Who I Am**
- Brief, warm, human — 2–3 paragraphs
- Your background, how you got here, what drives you
- Reference your design philosophy without naming it academically
- One photo — considered, not a headshot. Studio or workspace context preferred.

**Section 02 — How I Think**
- Your approach to design problems
- Reference to complexity into clarity, Tesler's Law if natural
- How you hold business constraints and user goals at the same time
- 3–4 short paragraphs or a quote-style callout

**Section 03 — How I Work**
- Your process — not a diagram, written as prose
- How you collaborate with engineering, product, stakeholders
- How you handle ambiguity and constraints
- What a project looks like when you're leading it

**Section 04 — Experience Snapshot**
- Brief timeline of roles — company, title, years
- Not a full resume — one line of impact per role
- Links to relevant case studies where available
- Link to full Experience page for the resume download

**Section 05 — Contact CTA**
- Framed for both employment and consulting
- Direct, warm, no pressure

---

### /experience — Experience

**Purpose**
Replaces the traditional resume page. A designed experience that showcases
skills, tools, and career history — with a CTA that generates and downloads
a PDF resume on demand. The PDF includes a QR code that drives traffic
back to the portfolio homepage.

This page serves recruiters primarily. Design it to be scannable in 30 seconds
and downloadable in one click.

**Download CTA placement**
- Top of page — visible without scrolling
- Bottom of page — catches anyone who read through
- Both trigger the same PDF generation endpoint

**PDF Resume — Generation Rules**
The PDF is generated fresh on every download. It is never cached.
The content is scraped from this page at download time.

PDF specifications:
- Single column layout — ATS compatible, no tables, no text boxes
- Fraunces for name and section headers
- Jost 400 for body text
- Warm neutral palette — matches portfolio brand
- Your name, role title, contact info, portfolio URL at top
- Experience section: role, company, dates, one impact line per role
- Skills section: grouped by category, not a tag cloud
- Tools section: brief list, secondary to skills
- QR code: bottom right of page, links to yourname.com (homepage)
- QR caption: "Full case studies at yourname.com"
- Page size: US Letter (8.5 × 11in) — print optimized
- No photos, no icons, no decorative elements — clean for ATS and print

**Page sections in order**

```
01  Header — name, role, download CTA
02  Skills by category
03  Tools
04  Experience timeline
05  Education and additional
06  Download CTA (repeated)
```

**Section 01 — Header**
- Your name (display, Fraunces)
- Current role/status: "Senior Product Designer · Available for remote roles"
- Contact: email, LinkedIn, portfolio URL
- Download Resume button (primary glass CTA, prominent)

**Section 02 — Skills by Category**
Not a tag cloud. Grouped by how you actually work.
Each group has a name and 4–6 skills in prose format.
- Research and Discovery: user interviews, contextual inquiry, survey design,
  usability testing, synthesis and insight generation
- Systems Thinking: information architecture, design systems, token architecture,
  component libraries, cross-product consistency
- Product Design: interaction design, wireframing, prototyping, visual design,
  responsive design
- Collaboration: stakeholder communication, design critiques, developer handoff,
  cross-functional facilitation

Each category links to the case study where it is most demonstrated.

**Section 03 — Tools**
Secondary to skills — tools are means, not the point.
Listed simply: Figma, FigJam, Maze, Hotjar, Miro, Notion, Jira,
Zeroheight, Loom, Principle (or whatever is accurate to your experience)

**Section 04 — Experience Timeline**
- Role title
- Company name (with NDA indicator if case study is protected)
- Dates
- One impact line — outcome not responsibility
- Link to case study if public

**Section 05 — Education and Additional**
- Degree and institution if relevant
- Certifications if current and respected (Nielsen Norman, etc.)
- Speaking or writing if it exists
- Keep this section short — education matters less than work at this stage

---

### /contact — Contact

**Purpose**
Minimal friction. Serves both hiring inquiries and consulting leads.
No long forms. No unnecessary fields. Get the message and follow up.

**Form fields**
- Name
- Email
- "What are you reaching out about?" — select:
  - Job opportunity
  - Consulting inquiry
  - Just saying hello
- Message — open text
- Submit button (primary glass CTA)

**After submission**
- Inline confirmation — no redirect
- "I'll get back to you within 48 hours" — sets expectation
- Email notification to you

**What is not on this page**
- No phone number — unnecessary friction
- No physical address — remote only
- No social media links — those live in the footer
- No FAQ — not enough complexity to warrant it

---

## Footer

Appears on all pages. Minimal.

```
[Your Name]    Work · About · Experience · Contact

© 2026    LinkedIn  ·  Dribbble  ·  Read.cv
```

- No large footer blocks
- No newsletter signup in Phase 1
- Social links to LinkedIn, Dribbble or Behance, Read.cv if you use it
- Copyright year auto-updates

---

## Password Protected Case Studies

Some case studies require a password before content loads.
The homepage card shows the project title and industry but no impact line.
A lock icon indicates the content is protected.
A simple password field unlocks the case study for that session.

**Lock page elements**
- Case study title and industry visible
- Lock icon
- Brief explanation: "This case study contains confidential work.
  Request access or enter the password below."
- Email request link + password field
- This is not a security system — it is a professional courtesy

---

## Responsive Behavior

**Desktop (1024px+)**
- Full nav visible
- Homepage: 3 work cards in a row
- Case study: single column content, max 720px, centered

**Tablet (768px–1024px)**
- Full nav visible
- Homepage: 2 work cards per row, third below
- Case study: single column, full width with page margin

**Mobile (375px–768px)**
- Hamburger nav — Contact CTA remains visible outside hamburger
- Homepage: single column work cards
- Case study: single column, full bleed sections
- Phase color shift still active on mobile
- All touch targets minimum 44px

---

## SEO and Performance Notes

- Page title format: "Project Name — [Your Name], Product Designer"
- Meta description per case study: outcome + industry + your role
- OG image per case study: project thumbnail for social sharing
- Fonts loaded via next/font — no layout shift
- Images: next/image with lazy loading and size optimization
- PDF generation: server-side, not client-side — no large JS bundles
- Target Lighthouse score: 95+ across all categories

---

*Last updated: pre-build planning phase · Portfolio site · Phase 1*
*Read alongside CLAUDE.md and design-system.md*
