'use client'

import { ThemeProvider } from 'next-themes'
import { type ReactNode } from 'react'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps): ReactNode {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem storageKey="theme">
      {children}
    </ThemeProvider>
  )
}
