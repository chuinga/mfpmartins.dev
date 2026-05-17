'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { NavLinks } from './NavLinks'
import { SocialIcons } from './SocialIcons'

export function MobileMenu(): React.ReactNode {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      function handleKeyDown(e: KeyboardEvent): void {
        if (e.key === 'Escape') setIsOpen(false)
      }
      document.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = ''
        document.removeEventListener('keydown', handleKeyDown)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const overlay =
    isOpen && mounted
      ? createPortal(
          <div
            className="fixed inset-0 top-16 flex flex-col items-center gap-8 py-12 px-6 overflow-y-auto"
            style={{ backgroundColor: 'var(--background)', zIndex: 9999 }}
          >
            <NavLinks onLinkClick={() => setIsOpen(false)} />
            <SocialIcons />
          </div>,
          document.body,
        )
      : null

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-10 h-10 flex items-center justify-center text-foreground hover:text-title2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-title2"
        style={{ zIndex: isOpen ? 10000 : undefined }}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="w-6 h-6"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="w-6 h-6"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>
      {overlay}
    </div>
  )
}
