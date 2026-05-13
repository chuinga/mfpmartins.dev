'use client'

import Image from 'next/image'
import { type Project } from '@/content/project-data'
import { useTranslations } from '@/lib/LocaleContext'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'

interface ProjectDetailProps {
  project: Project
}

export function ProjectDetail({ project }: ProjectDetailProps): React.ReactNode {
  const { t } = useTranslations()

  return (
    <div className="flex-1">
      <h2 className="text-title1 text-2xl font-bold mb-4">{project.title}</h2>
      <p className="text-description leading-relaxed mb-6">
        {t(`projects.${project.descriptionKey}`)}
      </p>

      <div className="rounded-lg border border-card-border overflow-hidden mb-6 bg-card-bg">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-card-border bg-card-bg">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <Image
          src={project.screenshotPath}
          alt={`Screenshot of ${project.title}`}
          width={800}
          height={450}
          className="w-full h-auto"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-title2 mb-2">{t('projects.technologies')}</h3>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs rounded-full bg-title2/10 text-title2 border border-title2/20"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <a
          href={project.siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-title2 text-white text-sm font-medium hover:bg-title1 transition-colors"
        >
          <FaExternalLinkAlt className="w-3 h-3" />
          {t('projects.visitSite')}
        </a>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-card-border text-foreground text-sm font-medium hover:border-title2 hover:text-title2 transition-colors"
        >
          <FaGithub className="w-4 h-4" />
          {t('projects.github')}
        </a>
      </div>
    </div>
  )
}
