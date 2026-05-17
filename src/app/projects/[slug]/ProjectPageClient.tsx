'use client'

import { useParams } from 'next/navigation'
import { projects } from '@/content/project-data'
import { ProjectDetail } from '@/components/projects/ProjectDetail'
import { notFound } from 'next/navigation'

export function ProjectPageClient(): React.ReactNode {
  const params = useParams()
  const slug = params.slug as string
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetail project={project} />
}
