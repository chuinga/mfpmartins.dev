'use client'

import { useTranslations } from '@/lib/LocaleContext'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export default function AboutPage(): React.ReactNode {
  const { t } = useTranslations()

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <AnimatedSection>
        <h1 className="text-title2 text-3xl font-bold mb-8">{t('about.heading')}</h1>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-48 h-48 shrink-0 rounded-full overflow-hidden border-2 border-title2/30 bg-card-bg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/Profile.jpg"
              alt="Miguel Martins"
              width={192}
              height={192}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="text-title1 font-medium mb-1">{t('about.role')}</p>
            <p className="text-description text-sm mb-4">{t('about.location')}</p>
            <p className="text-description leading-relaxed">{t('about.bio')}</p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}
