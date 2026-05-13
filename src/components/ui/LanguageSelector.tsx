'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { type Locale, locales, defaultLocale } from '@/lib/i18n'

interface LanguageSelectorProps {
  onLocaleChange?: (locale: Locale) => void
}

const flagLabels: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  pt: 'Português',
}

export function LanguageSelector({ onLocaleChange }: LanguageSelectorProps): React.ReactNode {
  const [currentLocale, setCurrentLocale] = useState<Locale>(defaultLocale)

  useEffect(() => {
    const stored = localStorage.getItem('locale') as Locale | null
    if (stored && locales.includes(stored)) {
      setCurrentLocale(stored)
    }
  }, [])

  function handleChange(locale: Locale): void {
    setCurrentLocale(locale)
    localStorage.setItem('locale', locale)
    onLocaleChange?.(locale)
  }

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Language selector">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => handleChange(locale)}
          className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-all hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-title2 ${
            currentLocale === locale
              ? 'border-title2 scale-110'
              : 'border-transparent opacity-60 hover:opacity-100'
          }`}
          aria-label={`Switch language to ${flagLabels[locale]}`}
          aria-pressed={currentLocale === locale}
        >
          <Image
            src={`/images/flags/${locale}.png`}
            alt={flagLabels[locale]}
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </button>
      ))}
    </div>
  )
}
