import { projects } from '@/content/project-data'
import { ProjectPageClient } from './ProjectPageClient'

export function generateStaticParams(): Array<{ slug: string }> {
  return projects.map((p) => ({ slug: p.slug }))
}

export default function ProjectPage() {
  return <ProjectPageClient />
}
