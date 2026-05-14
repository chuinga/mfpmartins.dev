'use client'

import { useTranslations } from '@/lib/LocaleContext'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
  FaDocker,
  FaAws,
  FaNodeJs,
  FaPython,
  FaJava,
  FaLinux,
  FaJira,
  FaDatabase,
} from 'react-icons/fa'
import {
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiVite,
  SiMongodb,
  SiPostgresql,
  SiTerraform,
  SiExpress,
  SiCplusplus,
  SiKubernetes,
  SiDatadog,
} from 'react-icons/si'
import {
  MdAccessibility,
  MdDevices,
  MdCloud,
  MdSmartToy,
  MdTerminal,
  MdStorage,
  MdAutoAwesome,
  MdPsychology,
} from 'react-icons/md'
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
      { name: 'Vite', icon: <SiVite className="w-8 h-8" /> },
    ],
  },
  {
    categoryKey: 'skills.backend',
    skills: [
      { name: 'Node.js', icon: <FaNodeJs className="w-8 h-8" /> },
      { name: 'Express.js', icon: <SiExpress className="w-8 h-8" /> },
      { name: 'Python', icon: <FaPython className="w-8 h-8" /> },
      { name: 'Java', icon: <FaJava className="w-8 h-8" /> },
      { name: 'C#', icon: <MdCloud className="w-8 h-8" /> },
      { name: 'C++', icon: <SiCplusplus className="w-8 h-8" /> },
      { name: 'REST APIs', icon: <MdCloud className="w-8 h-8" /> },
    ],
  },
  {
    categoryKey: 'skills.databases',
    skills: [
      { name: 'PostgreSQL', icon: <SiPostgresql className="w-8 h-8" /> },
      { name: 'MongoDB', icon: <SiMongodb className="w-8 h-8" /> },
      { name: 'Oracle DB', icon: <FaDatabase className="w-8 h-8" /> },
      { name: 'SQL Server', icon: <FaDatabase className="w-8 h-8" /> },
      { name: 'DynamoDB', icon: <MdStorage className="w-8 h-8" /> },
    ],
  },
  {
    categoryKey: 'skills.cloud',
    skills: [
      { name: 'AWS', icon: <FaAws className="w-8 h-8" /> },
      { name: 'Docker', icon: <FaDocker className="w-8 h-8" /> },
      { name: 'Kubernetes', icon: <SiKubernetes className="w-8 h-8" /> },
      { name: 'Terraform', icon: <SiTerraform className="w-8 h-8" /> },
      { name: 'Datadog', icon: <SiDatadog className="w-8 h-8" /> },
      { name: 'CI/CD', icon: <MdDevices className="w-8 h-8" /> },
      { name: 'Linux', icon: <FaLinux className="w-8 h-8" /> },
      { name: 'Bash/Zsh', icon: <MdTerminal className="w-8 h-8" /> },
    ],
  },
  {
    categoryKey: 'skills.ai',
    skills: [
      { name: 'AWS Bedrock', icon: <MdPsychology className="w-8 h-8" /> },
      { name: 'MCP Servers', icon: <MdSmartToy className="w-8 h-8" /> },
      { name: 'AI Agents', icon: <MdAutoAwesome className="w-8 h-8" /> },
      { name: 'Kiro / Cursor', icon: <MdSmartToy className="w-8 h-8" /> },
      { name: 'Claude Code', icon: <MdPsychology className="w-8 h-8" /> },
    ],
  },
  {
    categoryKey: 'skills.tools',
    skills: [
      { name: 'Git', icon: <FaGitAlt className="w-8 h-8" /> },
      { name: 'GitHub', icon: <FaGithub className="w-8 h-8" /> },
      { name: 'Jira', icon: <FaJira className="w-8 h-8" /> },
      { name: 'Agile/Scrum', icon: <FaDatabase className="w-8 h-8" /> },
      { name: 'Accessibility', icon: <MdAccessibility className="w-8 h-8" /> },
      { name: 'Responsive Design', icon: <MdDevices className="w-8 h-8" /> },
    ],
  },
]

export default function SkillsPage(): ReactNode {
  const { t } = useTranslations()

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
      <AnimatedSection>
        <h1 className="text-title2 text-3xl font-bold mb-10">{t('skills.heading')}</h1>
      </AnimatedSection>

      <div className="space-y-10">
        {skillCategories.map((category, idx) => (
          <AnimatedSection key={category.categoryKey} delay={idx * 0.1}>
            <h2 className="text-title1 text-xl font-semibold mb-4">
              {t(category.categoryKey)}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
