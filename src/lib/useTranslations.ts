'use client'

import { useState, useEffect, useCallback } from 'react'
import { type Locale, defaultLocale, locales } from './i18n'

type Messages = Record<string, string | Record<string, string>>

let cachedMessages: Record<Locale, Messages | null> = {
  en: null,
  es: null,
  fr: null,
  pt: null,
}

async function loadMessages(locale: Locale): Promise<Messages> {
  if (cachedMessages[locale]) return cachedMessages[locale]!
  const mod = await import(`@/messages/${locale}.json`)
  cachedMessages[locale] = mod.default
  return mod.default
}

export function useLocale(): {
  locale: Locale
  setLocale: (l: Locale) => void
  messages: Messages | null
  t: (key: string) => string
} {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)
  const [messages, setMessages] = useState<Messages | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('locale') as Locale | null
    const initial = stored && locales.includes(stored) ? stored : defaultLocale
    setLocaleState(initial)
    loadMessages(initial).then(setMessages)
  }, [])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
    loadMessages(newLocale).then(setMessages)
  }, [])

  const t = useCallback(
    (key: string): string => {
      if (!messages) return key
      const parts = key.split('.')
      let value: unknown = messages
      for (const part of parts) {
        if (value && typeof value === 'object' && part in value) {
          value = (value as Record<string, unknown>)[part]
        } else {
          return key
        }
      }
      return typeof value === 'string' ? value : key
    },
    [messages],
  )

  return { locale, setLocale, messages, t }
}
