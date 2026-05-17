'use client'

import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

export function SocialIcons(): React.ReactNode {
  return (
    <div className="flex items-center gap-3">
      <a
        href="https://www.linkedin.com/in/miguel-martins-a08a76a5/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn profile"
        className="text-foreground hover:text-title2 transition-colors"
      >
        <FaLinkedin className="w-5 h-5" />
      </a>
      <a
        href="https://github.com/chuinga"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub profile"
        className="text-foreground hover:text-title2 transition-colors"
      >
        <FaGithub className="w-5 h-5" />
      </a>
      <a
        href="mailto:contact@mfpmartins.dev?subject=Mail%20from%20mfpmartins.dev"
        aria-label="Send email"
        className="text-foreground hover:text-title2 transition-colors"
      >
        <MdEmail className="w-5 h-5" />
      </a>
    </div>
  )
}
