'use client'

import { useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ParticleField } from './ParticleField'

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

export function ThreeBackground(): React.ReactNode {
  const [supportsWebGL, setSupportsWebGL] = useState<boolean | null>(null)

  useEffect(() => {
    setSupportsWebGL(isWebGLAvailable())
  }, [])

  // Still loading check
  if (supportsWebGL === null) return null

  // Fallback gradient for non-WebGL devices
  if (!supportsWebGL) {
    return (
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, var(--gradient2) 0%, var(--background) 70%)',
          opacity: 0.3,
        }}
      />
    )
  }

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 1.5]}
        frameloop="always"
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      </Canvas>
    </div>
  )
}
