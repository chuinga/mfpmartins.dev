'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from '@/lib/LocaleContext'

interface NavLinksProps {
  onLinkClick?: () => void
}

const links = [
  { href: '/', key: 'nav.home' },
  { href: '/projects', key: 'nav.projects' },
  { href: '/about', key: 'nav.about' },
  { href: '/skills', key: 'nav.skills' },
  { href: '/contact', key: 'nav.contact' },
]

export function NavLinks({ onLinkClick }: NavLinksProps): React.ReactNode {
  const pathname = usePathname()
  const { t } = useTranslations()

  return (
    <nav aria-label="Main navigation">
      <ul className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
        {links.map(({ href, key }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <li key={href}>
              <Link
                href={href}
                onClick={onLinkClick}
                className={`text-sm font-medium transition-colors hover:text-title2 ${
                  isActive ? 'text-title2' : 'text-foreground'
                }`}
              >
                {t(key)}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
