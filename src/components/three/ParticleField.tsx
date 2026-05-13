'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 800

export function ParticleField(): React.ReactNode {
  const pointsRef = useRef<THREE.Points>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    const vel = new Float32Array(PARTICLE_COUNT * 3)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      pos[i3] = (Math.random() - 0.5) * 20
      pos[i3 + 1] = (Math.random() - 0.5) * 20
      pos[i3 + 2] = (Math.random() - 0.5) * 10

      vel[i3] = (Math.random() - 0.5) * 0.002
      vel[i3 + 1] = (Math.random() - 0.5) * 0.002
      vel[i3 + 2] = (Math.random() - 0.5) * 0.001
    }

    return [pos, vel]
  }, [])

  const colors = useMemo(() => {
    const cols = new Float32Array(PARTICLE_COUNT * 3)
    const palette = [
      [0.21, 0.2, 1.0],    // gradient1-ish blue
      [0.17, 0.2, 0.7],    // gradient2-ish
      [0.04, 0.53, 0.58],  // gradient3-ish teal
      [0.18, 0.58, 0.74],  // title1 blue
      [0.6, 0.85, 0.9],    // title2 light blue
    ]

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      const color = palette[Math.floor(Math.random() * palette.length)]
      cols[i3] = color[0]
      cols[i3 + 1] = color[1]
      cols[i3 + 2] = color[2]
    }

    return cols
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return

    const geometry = pointsRef.current.geometry
    const posAttr = geometry.attributes.position as THREE.BufferAttribute
    const posArray = posAttr.array as Float32Array

    // Get mouse position in normalized coordinates
    const pointer = state.pointer
    mouseRef.current.x = pointer.x * viewport.width * 0.5
    mouseRef.current.y = pointer.y * viewport.height * 0.5

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3

      // Apply velocity
      posArray[i3] += velocities[i3]
      posArray[i3 + 1] += velocities[i3 + 1]
      posArray[i3 + 2] += velocities[i3 + 2]

      // Subtle mouse influence
      const dx = mouseRef.current.x - posArray[i3]
      const dy = mouseRef.current.y - posArray[i3 + 1]
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 3) {
        posArray[i3] -= dx * 0.0005
        posArray[i3 + 1] -= dy * 0.0005
      }

      // Wrap around boundaries
      if (posArray[i3] > 10) posArray[i3] = -10
      if (posArray[i3] < -10) posArray[i3] = 10
      if (posArray[i3 + 1] > 10) posArray[i3 + 1] = -10
      if (posArray[i3 + 1] < -10) posArray[i3 + 1] = 10
      if (posArray[i3 + 2] > 5) posArray[i3 + 2] = -5
      if (posArray[i3 + 2] < -5) posArray[i3 + 2] = 5
    }

    posAttr.needsUpdate = true

    // Slow rotation
    pointsRef.current.rotation.y += 0.0003
    pointsRef.current.rotation.x += 0.0001
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
