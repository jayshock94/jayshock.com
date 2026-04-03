'use client'

import { memo } from 'react'
import { useGlassFloat } from '../useGlassFloat'

/** Frosted sphere — About section */
const GlassSphere = memo(function GlassSphere() {
  const meshRef = useGlassFloat()

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhysicalMaterial
        transmission={0.88}
        roughness={0.12}
        ior={1.45}
        thickness={0.8}
        envMapIntensity={1.0}
        color="#e8ddd0"
        transparent
        opacity={0.95}
      />
    </mesh>
  )
})

export default GlassSphere
