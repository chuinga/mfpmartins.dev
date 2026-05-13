'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 800

function createCircleTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')!
  const center = 32
  const radius = 30

  const gradient = ctx.createRadialGradient(center, center, 0, center, center, radius)
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)')
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.arc(center, center, radius, 0, Math.PI * 2)
  ctx.fill()

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

export function ParticleField(): React.ReactNode {
  const pointsRef = useRef<THREE.Points>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  const circleTexture = useMemo(() => createCircleTexture(), [])

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
    // Planet-inspired colors
    const palette = [
      [0.76, 0.44, 0.2],   // Mars orange
      [0.85, 0.65, 0.35],  // Saturn gold
      [0.2, 0.4, 0.8],     // Neptune blue
      [0.55, 0.27, 0.07],  // Jupiter brown
      [0.4, 0.7, 0.4],     // Earth green
      [0.9, 0.85, 0.7],    // Venus cream
      [0.6, 0.3, 0.3],     // Mars red
      [0.3, 0.5, 0.9],     // Uranus blue
      [0.8, 0.75, 0.5],    // Titan sandy
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
        size={0.06}
        map={circleTexture}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
