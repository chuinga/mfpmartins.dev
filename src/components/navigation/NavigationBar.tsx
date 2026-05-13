'use client'

import Link from 'next/link'
import { NavLinks } from './NavLinks'
import { SocialIcons } from './SocialIcons'
import { MobileMenu } from './MobileMenu'
import { AnimatedLogo } from '@/components/three/AnimatedLogo'

export function NavigationBar(): React.ReactNode {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-card-border bg-nav-bg backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="Home">
          <AnimatedLogo />
        </Link>

        <div className="hidden md:block">
          <NavLinks />
        </div>

        <div className="hidden md:block">
          <SocialIcons />
        </div>

        <MobileMenu />
      </div>
    </header>
  )
}
