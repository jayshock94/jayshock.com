'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import GlassPrism from './shapes/GlassPrism'
import GlassSphere from './shapes/GlassSphere'
import GlassTorus from './shapes/GlassTorus'
import GlassCube from './shapes/GlassCube'

export type IconVariant = 'work' | 'about' | 'skills' | 'contact'

const SHAPES: Record<IconVariant, React.ComponentType<{ tintColor?: string }>> = {
  work: GlassPrism,
  about: GlassSphere,
  skills: GlassTorus,
  contact: GlassCube,
}

/** Warm glow colors per variant — used for the bottom point light */
const GLOW_COLORS: Record<IconVariant, string> = {
  work:    '#c8a0e0',
  about:   '#d4a870',
  skills:  '#70c0a8',
  contact: '#80a8d4',
}

interface SectionIconCanvasProps {
  variant: IconVariant
  /** Override the default glow color for dynamic theming */
  glowColorHex?: string
}

export default function SectionIconCanvas({ variant, glowColorHex }: SectionIconCanvasProps) {
  const Shape = SHAPES[variant]
  const lightColor = glowColorHex || GLOW_COLORS[variant]

  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
      camera={{ fov: 35, position: [0, 0.2, 5] }}
      style={{ width: '100%', height: '100%' }}
    >
      {/* Very low ambient — keeps it dark and moody */}
      <ambientLight intensity={0.15} />

      {/* Key light from below — warm, dramatic, Resend-style bottom glow */}
      <pointLight
        position={[0, -2.5, 1.5]}
        intensity={2.5}
        color={lightColor}
        distance={8}
        decay={2}
      />

      {/* Subtle fill from top-right — cool, barely visible */}
      <directionalLight position={[2, 2, 3]} intensity={0.2} color="#a0a8b8" />

      {/* Rim light from behind — catches glass edges */}
      <directionalLight position={[-1, 1, -2]} intensity={0.15} color="#ffffff" />

      <Suspense fallback={null}>
        <Environment preset="night" />
        <Shape tintColor={lightColor} />
      </Suspense>
    </Canvas>
  )
}
