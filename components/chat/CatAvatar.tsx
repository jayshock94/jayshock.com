'use client'

interface CatAvatarProps {
  /** Size of the square body in px */
  size: number
  /** Whether Barnaby is thinking (triggers look-around animation) */
  isThinking?: boolean
}

/**
 * Barnaby's cat avatar — a rounded square with ears, oval eyes, nose, and whiskers.
 * Used in the FAB, chat header, loading state, and typing indicator.
 */
export default function CatAvatar({ size, isThinking = false }: CatAvatarProps) {
  const eyeClass = isThinking ? 'chat-eye--thinking' : 'chat-eye'

  // Scale all proportions to size
  const earW = Math.max(6, Math.round(size * 0.38))
  const earH = Math.max(5, Math.round(size * 0.32))
  const eyeW = Math.max(2, Math.round(size * 0.12))
  const eyeH = Math.max(3, Math.round(size * 0.18))
  const borderRadius = Math.round(size * 0.28)
  const noseSize = Math.max(2, Math.round(size * 0.08))
  const whiskerLen = Math.max(4, Math.round(size * 0.28))
  const whiskerThickness = size >= 28 ? 1 : 0.5

  return (
    <div
      style={{
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`,
        flexShrink: 0,
      }}
    >
      {/* Left ear */}
      <span
        style={{
          position: 'absolute',
          bottom: `${size - Math.round(size * 0.1)}px`,
          left: `${Math.round(size * 0.02)}px`,
          width: `${earW}px`,
          height: `${earH}px`,
          background: 'var(--color-button-primary)',
          clipPath: 'polygon(15% 100%, 50% 0%, 100% 100%)',
          transform: 'rotate(-8deg)',
        }}
      />
      {/* Right ear */}
      <span
        style={{
          position: 'absolute',
          bottom: `${size - Math.round(size * 0.1)}px`,
          right: `${Math.round(size * 0.02)}px`,
          width: `${earW}px`,
          height: `${earH}px`,
          background: 'var(--color-button-primary)',
          clipPath: 'polygon(0% 100%, 50% 0%, 85% 100%)',
          transform: 'rotate(8deg)',
        }}
      />

      {/* Face / body */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: `${borderRadius}px`,
          background: 'var(--color-button-primary)',
        }}
      >
        {/* Left eye */}
        <span
          className={eyeClass}
          style={{
            position: 'absolute',
            width: `${eyeW}px`,
            height: `${eyeH}px`,
            borderRadius: '50%',
            background: 'var(--color-button-text)',
            top: '38%',
            left: '28%',
          }}
        />
        {/* Right eye */}
        <span
          className={eyeClass}
          style={{
            position: 'absolute',
            width: `${eyeW}px`,
            height: `${eyeH}px`,
            borderRadius: '50%',
            background: 'var(--color-button-text)',
            top: '38%',
            right: '28%',
            animationDelay: isThinking ? '0s' : '0.1s',
          }}
        />

        {/* Nose — small inverted triangle */}
        <span
          style={{
            position: 'absolute',
            top: '58%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: `${noseSize}px solid transparent`,
            borderRight: `${noseSize}px solid transparent`,
            borderTop: `${noseSize}px solid var(--color-button-text)`,
            opacity: 0.7,
          }}
        />

        {/* Whiskers — left side */}
        <span
          style={{
            position: 'absolute',
            top: '62%',
            left: `${Math.round(size * 0.05)}px`,
            width: `${whiskerLen}px`,
            height: `${whiskerThickness}px`,
            background: 'var(--color-button-text)',
            opacity: 0.4,
            transform: 'rotate(-5deg)',
          }}
        />
        <span
          style={{
            position: 'absolute',
            top: '68%',
            left: `${Math.round(size * 0.03)}px`,
            width: `${whiskerLen}px`,
            height: `${whiskerThickness}px`,
            background: 'var(--color-button-text)',
            opacity: 0.4,
            transform: 'rotate(5deg)',
          }}
        />

        {/* Whiskers — right side */}
        <span
          style={{
            position: 'absolute',
            top: '62%',
            right: `${Math.round(size * 0.05)}px`,
            width: `${whiskerLen}px`,
            height: `${whiskerThickness}px`,
            background: 'var(--color-button-text)',
            opacity: 0.4,
            transform: 'rotate(5deg)',
          }}
        />
        <span
          style={{
            position: 'absolute',
            top: '68%',
            right: `${Math.round(size * 0.03)}px`,
            width: `${whiskerLen}px`,
            height: `${whiskerThickness}px`,
            background: 'var(--color-button-text)',
            opacity: 0.4,
            transform: 'rotate(-5deg)',
          }}
        />
      </div>
    </div>
  )
}
