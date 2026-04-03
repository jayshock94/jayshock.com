'use client'

import { memo } from 'react'
import { useGlassBreathe } from '../useGlassFloat'

/**
 * Connected glass nodes — Skills section.
 * Three spheres connected by thin rods.
 * Reads as "connected capabilities" / "toolkit".
 */
const GlassNodes = memo(function GlassNodes() {
  const groupRef = useGlassBreathe()

  const nodeMaterial = {
    transmission: 0.85,
    roughness: 0.08,
    ior: 1.5,
    thickness: 0.5,
    envMapIntensity: 1.0,
    transparent: true,
    opacity: 0.9,
  } as const

  const rodMaterial = {
    transmission: 0.7,
    roughness: 0.15,
    ior: 1.3,
    thickness: 0.1,
    envMapIntensity: 0.6,
    transparent: true,
    opacity: 0.6,
  } as const

  // Triangle arrangement
  const positions: [number, number, number][] = [
    [0, 0.55, 0],      // top
    [-0.5, -0.35, 0],  // bottom-left
    [0.5, -0.35, 0],   // bottom-right
  ]

  return (
    <group ref={groupRef} scale={0.9}>
      {/* Nodes */}
      <mesh position={positions[0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshPhysicalMaterial {...nodeMaterial} color="#a0d8c8" />
      </mesh>
      <mesh position={positions[1]}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshPhysicalMaterial {...nodeMaterial} color="#80c4b4" />
      </mesh>
      <mesh position={positions[2]}>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshPhysicalMaterial {...nodeMaterial} color="#90d0c0" />
      </mesh>

      {/* Connecting rods */}
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
          <mesh
            key={`${a}-${b}`}
            position={[midX, midY, midZ]}
            rotation={[0, 0, -angle]}
          >
            <cylinderGeometry args={[0.03, 0.03, length * 0.6, 8]} />
            <meshPhysicalMaterial {...rodMaterial} color="#88c8b8" />
          </mesh>
        )
      })}
    </group>
  )
})

export default GlassNodes
