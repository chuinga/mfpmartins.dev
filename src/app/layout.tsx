import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Providers } from '@/components/ui/Providers'
import { NavigationBar } from '@/components/navigation/NavigationBar'
import { Footer } from '@/components/ui/Footer'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Miguel Martins | Full-Stack Developer',
    template: '%s | Miguel Martins',
  },
  description:
    'Full-stack developer based near Lisbon, Portugal. Passionate about programming, creating for the web, and attention to detail.',
  openGraph: {
    title: 'Miguel Martins | Full-Stack Developer',
    description:
      'Full-stack developer based near Lisbon, Portugal. Passionate about programming, creating for the web, and attention to detail.',
    url: 'https://mfpmartins.dev',
    siteName: 'mfpmartins.dev',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <Providers>
          <NavigationBar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
