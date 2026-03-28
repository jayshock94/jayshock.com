/** Tiny cat paw SVG — used as inline glossary indicator next to terms Barnaby can explain. */
export default function CatPaw({ size = 14, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {/* Main pad */}
      <ellipse cx="12" cy="16" rx="5" ry="4.5" />
      {/* Top left toe */}
      <circle cx="6.5" cy="9" r="2.5" />
      {/* Top right toe */}
      <circle cx="17.5" cy="9" r="2.5" />
      {/* Inner left toe */}
      <circle cx="9" cy="7" r="2" />
      {/* Inner right toe */}
      <circle cx="15" cy="7" r="2" />
    </svg>
  )
}
