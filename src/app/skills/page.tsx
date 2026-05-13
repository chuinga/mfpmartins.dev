'use client'

import { useTranslations } from '@/lib/LocaleContext'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
  FaNpm,
  FaFigma,
  FaAws,
} from 'react-icons/fa'
import {
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiThreedotjs,
  SiVite,
} from 'react-icons/si'
import { MdAccessibility, MdDevices, MdSearch } from 'react-icons/md'
import { type ReactNode } from 'react'

interface Skill {
  name: string
  icon: ReactNode
}

interface SkillCategory {
  categoryKey: string
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    categoryKey: 'skills.frontend',
    skills: [
      { name: 'React', icon: <FaReact className="w-8 h-8" /> },
      { name: 'Next.js', icon: <SiNextdotjs className="w-8 h-8" /> },
      { name: 'TypeScript', icon: <SiTypescript className="w-8 h-8" /> },
      { name: 'JavaScript', icon: <SiJavascript className="w-8 h-8" /> },
      { name: 'HTML5', icon: <FaHtml5 className="w-8 h-8" /> },
      { name: 'CSS3', icon: <FaCss3Alt className="w-8 h-8" /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-8 h-8" /> },
      { name: 'Three.js', icon: <SiThreedotjs className="w-8 h-8" /> },
    ],
  },
  {
    categoryKey: 'skills.tools',
    skills: [
      { name: 'Git', icon: <FaGitAlt className="w-8 h-8" /> },
      { name: 'GitHub', icon: <FaGithub className="w-8 h-8" /> },
      { name: 'Vite', icon: <SiVite className="w-8 h-8" /> },
      { name: 'npm', icon: <FaNpm className="w-8 h-8" /> },
      { name: 'Figma', icon: <FaFigma className="w-8 h-8" /> },
    ],
  },
  {
    categoryKey: 'skills.other',
    skills: [
      { name: 'Responsive Design', icon: <MdDevices className="w-8 h-8" /> },
      { name: 'SEO', icon: <MdSearch className="w-8 h-8" /> },
      { name: 'Accessibility', icon: <MdAccessibility className="w-8 h-8" /> },
      { name: 'AWS', icon: <FaAws className="w-8 h-8" /> },
    ],
  },
]

export default function SkillsPage(): ReactNode {
  const { t } = useTranslations()

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <AnimatedSection>
        <h1 className="text-title2 text-3xl font-bold mb-10">{t('skills.heading')}</h1>
      </AnimatedSection>

      <div className="space-y-10">
        {skillCategories.map((category, idx) => (
          <AnimatedSection key={category.categoryKey} delay={idx * 0.1}>
            <h2 className="text-title1 text-xl font-semibold mb-4">
              {t(category.categoryKey)}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg border border-card-border bg-card-bg hover:border-title2/50 transition-colors"
                >
                  <span className="text-title2">{skill.icon}</span>
                  <span className="text-sm text-foreground text-center">{skill.name}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  )
}
