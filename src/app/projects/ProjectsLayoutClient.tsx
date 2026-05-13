'use client'

import { ProjectSidebar } from '@/components/projects/ProjectSidebar'

export function ProjectsLayoutClient({
  children,
}: {
  children: React.ReactNode
}): React.ReactNode {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        <ProjectSidebar />
        {children}
      </div>
    </div>
  )
}
