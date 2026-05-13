'use client'

import { useTranslations } from '@/lib/LocaleContext'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export default function Home(): React.ReactNode {
  const { t } = useTranslations()

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 sm:px-6 py-12">
      <AnimatedSection className="max-w-2xl w-full relative pl-6">
        <div
          className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
          style={{
            background: `linear-gradient(to bottom, var(--gradient1), var(--gradient2), var(--gradient3))`,
          }}
        />
        <p className="text-title1 text-lg">{t('hero.greeting')}</p>
        <h1 className="text-title2 text-4xl sm:text-5xl font-bold mt-2">{t('hero.name')}</h1>
        <h2 className="text-description text-xl sm:text-2xl mt-4">{t('hero.title')}</h2>
        <p className="text-description mt-4 leading-relaxed">{t('hero.description')}</p>
      </AnimatedSection>
    </div>
  )
}
