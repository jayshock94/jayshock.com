'use client'

import { memo } from 'react'
import { RoundedBox } from '@react-three/drei'
import { useGlassFloat } from '../useGlassFloat'

/** Rounded cube — Contact section */
const GlassCube = memo(function GlassCube() {
  const meshRef = useGlassFloat()

  return (
    <mesh ref={meshRef} rotation={[0.3, 0.4, 0]}>
      <RoundedBox args={[1.3, 1.3, 1.3]} radius={0.15} smoothness={4}>
        <meshPhysicalMaterial
          transmission={0.9}
          roughness={0.05}
          ior={1.5}
          thickness={0.5}
          envMapIntensity={1.2}
          color="#c8d8e8"
          transparent
          opacity={0.95}
        />
      </RoundedBox>
    </mesh>
  )
})

export default GlassCube
