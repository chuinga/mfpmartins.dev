'use client'

import { useTranslations } from '@/lib/LocaleContext'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

export default function ContactPage(): React.ReactNode {
  const { t } = useTranslations()

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-12 text-center">
      <AnimatedSection>
        <h1 className="text-title2 text-3xl font-bold mb-6">{t('contact.heading')}</h1>
        <p className="text-description leading-relaxed mb-10">{t('contact.cta')}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:contact@mfpmartins.dev?subject=Mail%20from%20mfpmartins.dev"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-title2 text-white font-medium hover:bg-title1 transition-colors"
          >
            <MdEmail className="w-5 h-5" />
            {t('contact.email')}
          </a>
          <a
            href="https://www.linkedin.com/in/miguel-martins-a08a76a5/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-card-border text-foreground font-medium hover:border-title2 hover:text-title2 transition-colors"
            aria-label="LinkedIn profile"
          >
            <FaLinkedin className="w-5 h-5" />
            LinkedIn
          </a>
          <a
            href="https://github.com/chuinga"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-card-border text-foreground font-medium hover:border-title2 hover:text-title2 transition-colors"
            aria-label="GitHub profile"
          >
            <FaGithub className="w-5 h-5" />
            GitHub
          </a>
        </div>
      </AnimatedSection>
    </div>
  )
}
