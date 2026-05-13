'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { projects } from '@/content/project-data'
import { useTranslations } from '@/lib/LocaleContext'

export function ProjectSidebar(): React.ReactNode {
  const pathname = usePathname()
  const { t } = useTranslations()

  return (
    <aside className="w-full md:w-56 shrink-0">
      <h2 className="text-title2 text-xl font-bold mb-4">{t('projects.heading')}</h2>
      <ul className="flex flex-row md:flex-col gap-2 flex-wrap">
        {projects.map((project) => {
          const isActive = pathname === `/projects/${project.slug}`
          return (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive
                    ? 'bg-title2/10 text-title2 font-medium'
                    : 'text-foreground hover:text-title2 hover:bg-card-bg'
                }`}
              >
                {project.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
