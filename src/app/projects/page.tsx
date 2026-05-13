'use client'

import { projects } from '@/content/project-data'
import { ProjectDetail } from '@/components/projects/ProjectDetail'

export default function ProjectsPage(): React.ReactNode {
  return <ProjectDetail project={projects[0]} />
}
