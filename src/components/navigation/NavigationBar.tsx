'use client'

import Link from 'next/link'
import Image from 'next/image'
import { NavLinks } from './NavLinks'
import { SocialIcons } from './SocialIcons'
import { MobileMenu } from './MobileMenu'

export function NavigationBar(): React.ReactNode {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-card-border bg-nav-bg backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="Home">
          <Image
            src="/images/logo.webp"
            alt="mfpmartins.dev logo"
            width={50}
            height={50}
            className="hover:opacity-80 transition-opacity"
            priority
          />
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
