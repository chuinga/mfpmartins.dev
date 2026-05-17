# Project Overview

This is **mfpmartins.dev**, a personal portfolio website built with Next.js and React, deployed on AWS.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Linting/Formatting**: ESLint + Prettier
- **Deployment**: AWS (likely Amplify or S3 + CloudFront)

## Project Structure

Follow the Next.js App Router conventions:

```
src/
  app/           → Pages and layouts (App Router)
  components/    → Reusable UI components
  lib/           → Utility functions and helpers
  content/       → Static content (project data, etc.)
public/          → Static assets (images, fonts, icons)
```

## Site Sections

- **Home/Hero** — Introduction and overview
- **Projects** — Portfolio of work with descriptions and links

More sections may be added over time (blog, about, contact, etc.). Keep the architecture flexible for expansion.

## Key Principles

- Use Server Components by default; only add "use client" when interactivity requires it
- Keep components small and focused on a single responsibility
- Use semantic HTML for accessibility
- Ensure responsive design (mobile-first approach)
- Optimize images with next/image
- Use next/font for font loading
