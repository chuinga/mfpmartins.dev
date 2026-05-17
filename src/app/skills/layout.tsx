import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'Technical skills and technologies — React, Next.js, TypeScript, Tailwind CSS, Three.js, and more.',
}

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  return children
}
