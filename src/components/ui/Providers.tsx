'use client'

import { ThemeProvider } from 'next-themes'
import { type ReactNode } from 'react'
import { LocaleProvider } from '@/lib/LocaleContext'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps): ReactNode {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem storageKey="theme">
      <LocaleProvider>{children}</LocaleProvider>
    </ThemeProvider>
  )
}
