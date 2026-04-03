'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import GlassPrism from './shapes/GlassPrism'
import GlassSphere from './shapes/GlassSphere'
import GlassTorus from './shapes/GlassTorus'
import GlassCube from './shapes/GlassCube'

export type IconVariant = 'work' | 'about' | 'skills' | 'contact'

const SHAPES: Record<IconVariant, React.ComponentType> = {
  work: GlassPrism,
  about: GlassSphere,
  skills: GlassTorus,
  contact: GlassCube,
}

interface SectionIconCanvasProps {
  variant: IconVariant
}

export default function SectionIconCanvas({ variant }: SectionIconCanvasProps) {
  const Shape = SHAPES[variant]

  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
      camera={{ fov: 35, position: [0, 0, 5] }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 3, 5]} intensity={0.8} />
      <directionalLight position={[-2, -1, 3]} intensity={0.3} color="#8AAAC8" />
      <Suspense fallback={null}>
        <Environment preset="night" />
        <Shape />
      </Suspense>
    </Canvas>
  )
}
