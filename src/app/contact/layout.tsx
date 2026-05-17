import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Miguel Martins for professional inquiries, collaborations, or just to say hi.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
