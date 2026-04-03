'use client'

import { memo } from 'react'
import { useGlassFloat } from '../useGlassFloat'

/** Octahedron (diamond/prism) — Work section */
const GlassPrism = memo(function GlassPrism() {
  const meshRef = useGlassFloat()

  return (
    <mesh ref={meshRef} scale={[0.9, 1.15, 0.9]}>
      <octahedronGeometry args={[1, 0]} />
      <meshPhysicalMaterial
        transmission={0.92}
        roughness={0.05}
        ior={1.5}
        thickness={0.6}
        envMapIntensity={1.2}
        color="#e8e0f0"
        transparent
        opacity={0.95}
      />
    </mesh>
  )
})

export default GlassPrism
