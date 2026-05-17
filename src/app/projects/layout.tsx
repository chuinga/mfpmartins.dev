import type { Metadata } from 'next'
import { ProjectsLayoutClient } from './ProjectsLayoutClient'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Portfolio of web development projects by Miguel Martins — games, music apps, and more.',
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <ProjectsLayoutClient>{children}</ProjectsLayoutClient>
}
