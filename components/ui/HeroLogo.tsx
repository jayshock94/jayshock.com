/**
 * HeroLogo — Stacked personal brand badge.
 *
 * "JAY" sits above "SHOCK" as a small tracked label.
 * Light weight + reduced opacity keeps JAY subordinate.
 * SHOCK paths stay at their original coordinates, translated
 * downward by 28 SVG units to make room for the label above.
 *
 * ViewBox: 324.63 wide (SHOCK natural width) × 114 tall
 *   10 units top padding
 *   JAY baseline at y=22 (cap tops ~y=11)
 *   10 units gap to SHOCK top
 *   SHOCK paths translated to y=32 → bottom at y=105.7
 *   ~8 units bottom padding
 */

interface HeroLogoProps {
  className?: string
}

export default function HeroLogo({ className = '' }: HeroLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 324.63 114"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      aria-label="Jay Shock"
      role="img"
      fill="currentColor"
      className={className}
    >
      {/* JAY — readable label above SHOCK, smaller but fully visible */}
      <text
        x="162.3"
        y="22"
        fontSize="18"
        letterSpacing="6"
        textAnchor="middle"
        fill="currentColor"
        style={{
          fontFamily: 'var(--font-outfit), system-ui, sans-serif',
          fontWeight: 500,
        }}
      >
        JAY
      </text>

      {/* SHOCK — original paths, shifted down 32 units */}
      <g transform="translate(0, 32)">
        <path d="M181.85,5.62l-4.55,11.43c4.64,2.67,8.1,6.56,10.05,11.18.68,1.6,1.18,3.29,1.46,5.05.23,1.28.34,2.6.34,3.95,0,12.25-9.44,21.8-23.85,23.15l-10.05,11.58c2.14.28,4.3.41,6.44.41,20.26,0,42.05-11.72,42.05-35.14,0-15.31-9.55-26.09-21.89-31.61Z"/>
        <path d="M135.37,44.73c-.4-1.09-.71-2.21-.92-3.37-.27-1.34-.4-2.72-.4-4.13,0-13.07,10.29-23.36,25.95-24.05l10.09-11.12c-2.79-.49-5.61-.73-8.4-.73-20.44,0-42.23,11.42-42.23,35.71,0,16.25,10.66,27.05,24.06,32.06l4.34-11.37c-6.07-2.77-10.44-7.4-12.49-13Z"/>
        <path d="M26.74,30.62c-.28,0-.56-.07-.97-.07-3.6-.21-12.54-.77-12.54-3.95,0-1.8,2.36-4.78,12.33-4.78,6.37,0,13.3,1.66,20.5,5.19l4.22-8.79c-8.44-4.5-16.13-6.58-24.72-6.58C16.21,11.64,0,14.2,0,27.01c0,10.18,9.98,12.82,19.46,13.99,1.67.21,3.4.35,4.92.49,2.98.28,5.82.55,8.17,1.04,3.4.69,5.48,1.8,5.48,3.67,0,3.88-7.55,5.61-13.93,5.61-4.57,0-10.18-2.08-19.39-6.1L.28,55.13c9.63,4.99,15.51,6.93,24.79,6.93,10.05,0,26.39-2.98,26.39-15.86s-14.89-14.82-24.72-15.58Z"/>
        <polygon points="96.28 32.62 72.66 32.62 72.66 12.88 58.67 12.88 58.67 61.44 72.59 61.44 72.59 43.08 96.28 43.08 96.28 61.44 110.27 61.44 110.27 12.88 96.28 12.88 96.28 32.62"/>
        <path d="M240.06,51.95c-8.38,0-15.72-5.89-15.72-14.82s7.27-14.69,15.79-14.69,13.09,3.12,18.77,7.14l4.3-9.77c-5.75-4.16-12.26-7.83-23.41-7.83-14.06,0-28.95,9.56-28.95,25.01,0,16.55,16.2,25.07,29.15,25.07s19.88-4.85,24.31-8.45l.07-.49-5.26-8.45c-5.61,4.02-10.94,7.28-19.05,7.28Z"/>
        <path d="M301.78,32.35l22.23-19.47h-15.79c-7.21,6.1-14.48,12.4-21.68,18.57V12.88h-13.85l-.07,48.56h13.92v-15.93c2.08-1.67,4.02-3.4,6.03-5.13l15.79,21.06h16.27l-22.85-29.09Z"/>
        <polygon points="166.16 31.54 178.7 0 142.08 40.39 159.14 42.15 147.13 73.7 182.56 32.86 166.16 31.54"/>
      </g>
    </svg>
  )
}
