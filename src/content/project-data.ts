export interface Project {
  slug: string
  title: string
  descriptionKey: string
  technologies: string[]
  siteUrl: string
  githubUrl: string
  screenshotPath?: string
  embedUrl?: string
}

export const projects: Project[] = [
  {
    slug: 'mfpmartins-dev',
    title: 'mfpmartins.dev',
    descriptionKey: 'mfpmartins_description',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Framer Motion'],
    siteUrl: 'https://mfpmartins.dev',
    githubUrl: 'https://github.com/chuinga/mfpmartins.dev',
    embedUrl: 'https://mfpmartins.dev',
  },
  {
    slug: 'setubal',
    title: 'Setúbal',
    descriptionKey: 'setubal_description',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    siteUrl: 'https://setubal.vercel.app/',
    githubUrl: 'https://github.com/chuinga/TrabalhoFinalWebFE',
    embedUrl: 'https://setubal.vercel.app/',
  },
  {
    slug: 'groovegrid',
    title: 'GrooveGrid',
    descriptionKey: 'groovegrid_description',
    technologies: ['Node.js', 'MongoDB', 'HTML5', 'CSS3', 'React'],
    siteUrl: 'https://groovegrid.netlify.app/',
    githubUrl: 'https://github.com/chuinga/GrooveGrid',
    embedUrl: 'https://groovegrid.netlify.app/',
  },
  {
    slug: 'pawsitivehomes',
    title: 'Pawsitive Homes',
    descriptionKey: 'pawsitivehomes_description',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Vite', 'React', 'CRUD'],
    siteUrl: 'https://pawsitivehomes.netlify.app/',
    githubUrl: 'https://github.com/Ksfraan/Pawsitive-Homes',
    embedUrl: 'https://pawsitivehomes.netlify.app/',
  },
  {
    slug: 'gravity',
    title: 'Gravity',
    descriptionKey: 'gravity_description',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    siteUrl: 'https://gravitygame.netlify.app/',
    githubUrl: 'https://github.com/chuinga/Project-Gravity-Game',
    embedUrl: 'https://gravitygame.netlify.app/',
  },
]
