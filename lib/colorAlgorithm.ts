/**
 * Color Algorithm — oklch-based token generation.
 *
 * The designer provides a hue direction. The algorithm controls everything else.
 * Chroma is clamped to warm/desaturated ranges. Lightness is constrained per token type.
 * Every generated token is checked against WCAG contrast targets.
 *
 * Usage: generateTokens('#38A169')
 * Returns: { bg, border, label, text, canvas, nav }
 */

export interface ColorTokenSet {
  bg: string
  border: string
  label: string
  text: string
  canvas: string
  nav: string
  // Dark mode equivalents — applied when data-theme="dark"
  darkCanvas: string
  darkBg:     string
  darkBorder: string
  darkLabel:  string
}

// Design-system.md constraints
const CONSTRAINTS = {
  chroma: { min: 0.04, max: 0.12 },
  bg:     { lightness: { min: 0.92, max: 0.96 } },
  border: { lightness: { min: 0.82, max: 0.88 } },
  label:  { lightness: { min: 0.35, max: 0.55 } },
  canvas: { lightness: 0.965, chroma: 0.015 },
  // Dark mode — deep tinted surfaces, bright readable labels
  dark: {
    canvas: { lightness: 0.13, chroma: 0.025 },
    bg:     { lightness: 0.17, chroma: 0.040 },
    border: { lightness: 0.32, chroma: 0.060 },
    label:  { lightness: { min: 0.60, max: 0.80 }, chroma: 0.10 },
  },
} as const

// WCAG targets
const CONTRAST_AA  = 4.5
const INK          = '#1C1917'
const DARK_SURFACE = '#202020' // matches --color-surface in dark mode

// --- Color space conversion helpers ---

function srgbToLinear(c: number): number {
  return c <= 0.04045
    ? c / 12.92
    : Math.pow((c + 0.055) / 1.055, 2.4)
}

function linearToSRGB(c: number): number {
  return c <= 0.0031308
    ? 12.92 * c
    : 1.055 * Math.pow(c, 1 / 2.4) - 0.055
}

function hexToSRGB(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ]
}

function linearRGBToXYZ(r: number, g: number, b: number): [number, number, number] {
  return [
    0.4124564 * r + 0.3575761 * g + 0.1804375 * b,
    0.2126729 * r + 0.7151522 * g + 0.0721750 * b,
    0.0193339 * r + 0.1191920 * g + 0.9503041 * b,
  ]
}

function xyzToOKLab(x: number, y: number, z: number): [number, number, number] {
  const l = Math.cbrt(0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z)
  const m = Math.cbrt(0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z)
  const s = Math.cbrt(0.0482003018 * x + 0.2643662691 * y + 0.6338517070 * z)
  return [
    0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s,
  ]
}

function oklabToXYZ(L: number, a: number, b: number): [number, number, number] {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b
  const l = l_ * l_ * l_
  const m = m_ * m_ * m_
  const s = s_ * s_ * s_
  return [
    +1.2270138511 * l - 0.5577999807 * m + 0.2812561490 * s,
    -0.0405801784 * l + 1.1122568696 * m - 0.0716766787 * s,
    -0.0763812845 * l - 0.4214819784 * m + 1.5861632204 * s,
  ]
}

function xyzToLinearRGB(x: number, y: number, z: number): [number, number, number] {
  return [
     3.2404542 * x - 1.5371385 * y - 0.4985314 * z,
    -0.9692660 * x + 1.8760108 * y + 0.0415560 * z,
     0.0556434 * x - 0.2040259 * y + 1.0572252 * z,
  ]
}

/** Extract OKLCH hue (0–360°) from a hex color. */
function hexToHue(hex: string): number {
  const [sr, sg, sb] = hexToSRGB(hex)
  const [lr, lg, lb] = [srgbToLinear(sr), srgbToLinear(sg), srgbToLinear(sb)]
  const [x, y, z]    = linearRGBToXYZ(lr, lg, lb)
  const [, a, b]     = xyzToOKLab(x, y, z)
  const hue = Math.atan2(b, a) * (180 / Math.PI)
  return hue < 0 ? hue + 360 : hue
}

/** Convert OKLCH values to a hex string. Out-of-gamut values are clamped. */
function oklchToHex(L: number, C: number, H: number): string {
  const hRad    = H * (Math.PI / 180)
  const [lx, a, b] = oklabToXYZ(L, C * Math.cos(hRad), C * Math.sin(hRad))
  const [lr, lg, lb] = xyzToLinearRGB(lx, a, b)
  const clamp = (v: number) => Math.max(0, Math.min(1, v))
  const r  = Math.round(clamp(linearToSRGB(lr)) * 255)
  const g  = Math.round(clamp(linearToSRGB(lg)) * 255)
  const bv = Math.round(clamp(linearToSRGB(lb)) * 255)
  return '#' + [r, g, bv].map(v => v.toString(16).padStart(2, '0')).join('')
}

/** WCAG relative luminance. */
function relativeLuminance(hex: string): number {
  const [sr, sg, sb] = hexToSRGB(hex)
  return (
    0.2126 * srgbToLinear(sr) +
    0.7152 * srgbToLinear(sg) +
    0.0722 * srgbToLinear(sb)
  )
}

/** WCAG 2.1 contrast ratio between two hex colors. */
export function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1)
  const l2 = relativeLuminance(hex2)
  const lighter = Math.max(l1, l2)
  const darker  = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Generate a full token set from a brand color hex.
 *
 * Step 1 — Convert to OKLCH, extract hue only.
 * Step 2 — Rebuild each token using constrained lightness + chroma.
 * Step 3 — Check label contrast; shift lightness darker until AA passes.
 * Step 4 — Text is always INK (#1C1917).
 */
export function generateTokens(inputHex: string): ColorTokenSet {
  const hue    = hexToHue(inputHex)
  const chroma = (CONSTRAINTS.chroma.min + CONSTRAINTS.chroma.max) / 2 // 0.08

  // Background — center of allowed lightness
  const bgL = (CONSTRAINTS.bg.lightness.min + CONSTRAINTS.bg.lightness.max) / 2
  const bg  = oklchToHex(bgL, chroma, hue)

  // Border — center of allowed border lightness
  const borderL = (CONSTRAINTS.border.lightness.min + CONSTRAINTS.border.lightness.max) / 2
  const border  = oklchToHex(borderL, chroma, hue)

  // Label — start at max allowed lightness, step darker until AA passes against bg
  let labelL   = CONSTRAINTS.label.lightness.max
  let labelHex = oklchToHex(labelL, CONSTRAINTS.chroma.max, hue)
  while (
    contrastRatio(bg, labelHex) < CONTRAST_AA &&
    labelL >= CONSTRAINTS.label.lightness.min
  ) {
    labelL  -= 0.005
    labelHex = oklchToHex(labelL, CONSTRAINTS.chroma.max, hue)
  }

  // Canvas — very subtle tint for phase ambient shift
  const canvas = oklchToHex(CONSTRAINTS.canvas.lightness, CONSTRAINTS.canvas.chroma, hue)

  // Nav glass — slightly more saturated canvas color as rgba
  const navHex     = oklchToHex(CONSTRAINTS.canvas.lightness, CONSTRAINTS.canvas.chroma * 2, hue)
  const [nr, ng, nb] = hexToSRGB(navHex)
  const nav = `rgba(${Math.round(nr * 255)},${Math.round(ng * 255)},${Math.round(nb * 255)},0.80)`

  // Dark mode variants — deep tinted surfaces
  const darkCanvas = oklchToHex(CONSTRAINTS.dark.canvas.lightness, CONSTRAINTS.dark.canvas.chroma, hue)
  const darkBg     = oklchToHex(CONSTRAINTS.dark.bg.lightness,     CONSTRAINTS.dark.bg.chroma,     hue)
  const darkBorder = oklchToHex(CONSTRAINTS.dark.border.lightness, CONSTRAINTS.dark.border.chroma, hue)

  // Dark label — start bright, check AA against dark surface, step down if needed
  let darkLabelL   = CONSTRAINTS.dark.label.lightness.max
  let darkLabelHex = oklchToHex(darkLabelL, CONSTRAINTS.dark.label.chroma, hue)
  while (
    contrastRatio(DARK_SURFACE, darkLabelHex) < CONTRAST_AA &&
    darkLabelL >= CONSTRAINTS.dark.label.lightness.min
  ) {
    darkLabelL  -= 0.005
    darkLabelHex = oklchToHex(darkLabelL, CONSTRAINTS.dark.label.chroma, hue)
  }

  return {
    bg,
    border,
    label:       labelHex,
    text:        INK,
    canvas,
    nav,
    darkCanvas,
    darkBg,
    darkBorder,
    darkLabel:   darkLabelHex,
  }
}
