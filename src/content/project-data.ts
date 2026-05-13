export interface Project {
  slug: string
  title: string
  descriptionKey: string
  technologies: string[]
  siteUrl: string
  githubUrl: string
  screenshotPath: string
}

export const projects: Project[] = [
  {
    slug: 'gravity',
    title: 'Gravity',
    descriptionKey: 'gravity_description',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    siteUrl: 'https://gravitygame.netlify.app/',
    githubUrl: 'https://github.com/chuinga/Project-Gravity-Game',
    screenshotPath: '/images/projects/browserGravity.png',
  },
  {
    slug: 'pawsitivehomes',
    title: 'Pawsitive Homes',
    descriptionKey: 'pawsitivehomes_description',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Vite', 'React', 'CRUD'],
    siteUrl: 'https://pawsitivehomes.netlify.app/',
    githubUrl: 'https://github.com/Ksfraan/Pawsitive-Homes',
    screenshotPath: '/images/projects/browserPawsitiveHomes.png',
  },
  {
    slug: 'groovegrid',
    title: 'GrooveGrid',
    descriptionKey: 'groovegrid_description',
    technologies: ['Node.js', 'MongoDB', 'HTML5', 'CSS3', 'React'],
    siteUrl: 'https://groovegrid.netlify.app/',
    githubUrl: 'https://github.com/chuinga/GrooveGrid',
    screenshotPath: '/images/projects/browserGroovegrid.png',
  },
  {
    slug: 'setubal',
    title: 'Setúbal',
    descriptionKey: 'setubal_description',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    siteUrl: 'https://setubal.vercel.app/',
    githubUrl: 'https://github.com/chuinga/TrabalhoFinalWebFE',
    screenshotPath: '/images/projects/browserSetubal.png',
  },
]
