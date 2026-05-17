'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { useLocale } from './useTranslations'
import { type Locale } from './i18n'

interface LocaleContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: string) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }): ReactNode {
  const { locale, setLocale, t } = useLocale()

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>{children}</LocaleContext.Provider>
  )
}

export function useTranslations(): LocaleContextValue {
  const ctx = useContext(LocaleContext)
  if (!ctx) {
    throw new Error('useTranslations must be used within a LocaleProvider')
  }
  return ctx
}
