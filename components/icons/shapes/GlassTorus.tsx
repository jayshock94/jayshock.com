'use client'

import { memo } from 'react'
import { useGlassBreathe } from '../useGlassFloat'

/**
 * Connected glass nodes — Skills section.
 * Accepts tintColor to match active toolkit tab.
 */
const GlassNodes = memo(function GlassNodes({ tintColor }: { tintColor?: string }) {
  const groupRef = useGlassBreathe()
  const c = tintColor || '#70c0a8'

  const nodeMaterial = {
    transmission: 0.8,
    roughness: 0.03,
    ior: 1.5,
    thickness: 0.6,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    envMapIntensity: 1.5,
    transparent: true,
    opacity: 0.9,
  } as const

  const rodMaterial = {
    transmission: 0.6,
    roughness: 0.05,
    ior: 1.3,
    thickness: 0.15,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    envMapIntensity: 1.0,
    transparent: true,
    opacity: 0.65,
  } as const

  const positions: [number, number, number][] = [
    [0, 0.55, 0],
    [-0.5, -0.35, 0],
    [0.5, -0.35, 0],
  ]

  return (
    <group ref={groupRef} scale={0.9}>
      <mesh position={positions[0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshPhysicalMaterial {...nodeMaterial} color={c} />
      </mesh>
      <mesh position={positions[1]}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshPhysicalMaterial {...nodeMaterial} color={c} />
      </mesh>
      <mesh position={positions[2]}>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshPhysicalMaterial {...nodeMaterial} color={c} />
      </mesh>

      {[[0, 1], [1, 2], [0, 2]].map(([a, b]) => {
        const from = positions[a]
        const to = positions[b]
        const midX = (from[0] + to[0]) / 2
        const midY = (from[1] + to[1]) / 2
        const midZ = (from[2] + to[2]) / 2
        const dx = to[0] - from[0]
        const dy = to[1] - from[1]
        const length = Math.sqrt(dx * dx + dy * dy)
        const angle = Math.atan2(dx, dy)

        return (
          <mesh key={`${a}-${b}`} position={[midX, midY, midZ]} rotation={[0, 0, -angle]}>
            <cylinderGeometry args={[0.035, 0.035, length * 0.55, 8]} />
            <meshPhysicalMaterial {...rodMaterial} color={c} />
          </mesh>
        )
      })}
    </group>
  )
})

export default GlassNodes
