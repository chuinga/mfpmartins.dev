'use client'

import Image from 'next/image'

export function AnimatedLogo(): React.ReactNode {
  return (
    <div className="w-12 h-12 relative group">
      <div className="absolute inset-0 rounded-full bg-title2/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <Image
        src="/images/logo.webp"
        alt="mfpmartins.dev logo"
        width={48}
        height={48}
        className="relative w-full h-full object-contain animate-logo-float transition-transform duration-300 group-hover:scale-110"
        priority
      />
    </div>
  )
}
