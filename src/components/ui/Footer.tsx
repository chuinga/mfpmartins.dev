'use client'

import { ThemeToggle } from './ThemeToggle'
import { LanguageSelector } from './LanguageSelector'
import { useTranslations } from '@/lib/LocaleContext'
import { type Locale } from '@/lib/i18n'

export function Footer(): React.ReactNode {
  const { setLocale } = useTranslations()

  return (
    <footer className="w-full border-t border-card-border py-6 mt-auto">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 sm:flex-row sm:justify-between sm:px-6">
        <LanguageSelector onLocaleChange={(l: Locale) => setLocale(l)} />
        <p className="text-sm text-description">
          &copy;{new Date().getFullYear()} mfpmartins.dev
        </p>
        <ThemeToggle />
      </div>
    </footer>
  )
}
