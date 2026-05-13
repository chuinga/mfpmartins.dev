'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from '@/lib/LocaleContext'

export default function NotFound(): React.ReactNode {
  const { t } = useTranslations()

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 text-center">
      <Image
        src="/images/blackHole.png"
        alt="Black hole illustration"
        width={200}
        height={200}
        className="mb-8 opacity-80"
      />
      <p className="text-description text-lg mb-4">
        {t('notFound.message')}{' '}
        <Link href="/" className="text-title2 hover:text-title1 underline transition-colors">
          {t('notFound.link')}
        </Link>
        .
      </p>
    </div>
  )
}
