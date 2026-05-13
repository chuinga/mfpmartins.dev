import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn more about Miguel Martins — a full-stack developer based near Lisbon, Portugal, passionate about programming, downhill biking, and creating new sounds.',
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
