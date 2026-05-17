# Technical Design Document

## Introduction

This document defines the technical architecture for the mfpmartins.dev portfolio website rebuild. The site is a multi-page React SPA built with Next.js App Router, TypeScript, Tailwind CSS, and Three.js for 3D visual effects. It replaces a legacy React + Vite site while preserving the existing color scheme and multi-language support.

## Design Decisions

### Decision 1: Next.js App Router with Multi-Page SPA Architecture
- **Choice**: Use Next.js App Router with separate routes for each section (Home, Projects, About, Skills, Contact, 404)
- **Rationale**: App Router provides file-based routing, server components by default, built-in image optimization, and static generation — all aligned with performance targets. Multi-page structure allows each section to be independently loadable and SEO-friendly.

### Decision 2: Three.js via React Three Fiber
- **Choice**: Use `@react-three/fiber` and `@react-three/drei` instead of raw Three.js
- **Rationale**: React Three Fiber provides declarative Three.js integration within React's component model, making it easier to manage lifecycle, state, and performance (auto-pause on tab switch). Drei provides common helpers (particles, effects) out of the box.

### Decision 3: Internationalization with next-intl
- **Choice**: Use `next-intl` for multi-language support
- **Rationale**: next-intl is purpose-built for Next.js App Router, supports server components, provides type-safe message access, and handles locale persistence. It replaces the legacy i18next setup with a more idiomatic Next.js solution.

### Decision 4: Theme Management with next-themes
- **Choice**: Use `next-themes` for dark/light mode
- **Rationale**: Handles SSR flash prevention, localStorage persistence, system preference detection, and CSS variable toggling — all requirements from the spec. Works seamlessly with Tailwind's dark mode class strategy.

### Decision 5: Animation with Framer Motion
- **Choice**: Use `framer-motion` for page transitions, scroll animations, and UI state transitions
- **Rationale**: Provides declarative animation API, viewport-triggered animations, layout animations, and respects `prefers-reduced-motion`. Well-maintained and widely used in the Next.js ecosystem.

### Decision 6: Tailwind CSS with CSS Variables for Theming
- **Choice**: Define color tokens as CSS variables, reference them in Tailwind config
- **Rationale**: Allows theme switching by changing variable values on `[data-theme]` attribute, maintaining the legacy color scheme while leveraging Tailwind's utility-first approach.

### Decision 7: Static Site Generation with AWS Amplify
- **Choice**: Use Next.js static export where possible, deploy via AWS Amplify Hosting
- **Rationale**: All pages are content-driven with no dynamic server data. Amplify supports Next.js SSR/SSG, provides CI/CD from GitHub, custom domain + HTTPS via ACM, and CDN distribution.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Browser (Client)                       │
├─────────────────────────────────────────────────────────┤
│  Next.js App Router                                      │
│  ┌─────────────────────────────────────────────────┐    │
│  │  RootLayout (ThemeProvider + IntlProvider)       │    │
│  │  ├── Navigation (sticky header)                 │    │
│  │  ├── Three.js Canvas (background layer)         │    │
│  │  ├── Page Content (route-based)                 │    │
│  │  │   ├── / → HomePage (Hero)                    │    │
│  │  │   ├── /projects → ProjectsPage              │    │
│  │  │   ├── /projects/[slug] → ProjectDetail      │    │
│  │  │   ├── /about → AboutPage                    │    │
│  │  │   ├── /skills → SkillsPage                  │    │
│  │  │   ├── /contact → ContactPage                │    │
│  │  │   └── not-found → 404Page                   │    │
│  │  └── Footer (language selector + theme toggle)  │    │
│  └─────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────┤
│  AWS Amplify Hosting (CDN + HTTPS + CI/CD)              │
└─────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
RootLayout
├── ThemeProvider (next-themes)
│   ├── IntlProvider (next-intl)
│   │   ├── NavigationBar (Client Component)
│   │   │   ├── Logo
│   │   │   ├── NavLinks
│   │   │   ├── SocialIcons
│   │   │   └── MobileMenu (hamburger)
│   │   ├── ThreeBackground (Client Component)
│   │   │   └── ParticleField (R3F Canvas)
│   │   ├── PageContent (varies by route)
│   │   │   ├── HeroSection
│   │   │   ├── ProjectsLayout
│   │   │   │   ├── ProjectSidebar
│   │   │   │   └── ProjectDetail
│   │   │   ├── AboutSection
│   │   │   ├── SkillsSection
│   │   │   │   └── SkillCategory
│   │   │   │       └── SkillItem
│   │   │   └── ContactSection
│   │   └── Footer (Client Component)
│   │       ├── LanguageSelector
│   │       ├── Copyright
│   │       └── ThemeToggle
│   └── AriaLiveRegion
└── Analytics (optional)
```

## File Structure

```
src/
├── app/
│   ├── layout.tsx              → Root layout (providers, nav, footer, Three.js bg)
│   ├── page.tsx                → Home page (Hero section)
│   ├── not-found.tsx           → Custom 404 page
│   ├── projects/
│   │   ├── layout.tsx          → Projects layout (sidebar + content area)
│   │   ├── page.tsx            → Projects index (default project selected)
│   │   └── [slug]/
│   │       └── page.tsx        → Individual project detail
│   ├── about/
│   │   └── page.tsx            → About page
│   ├── skills/
│   │   └── page.tsx            → Skills page
│   └── contact/
│       └── page.tsx            → Contact page
├── components/
│   ├── navigation/
│   │   ├── NavigationBar.tsx
│   │   ├── NavLinks.tsx
│   │   ├── MobileMenu.tsx
│   │   └── SocialIcons.tsx
│   ├── three/
│   │   ├── ThreeBackground.tsx
│   │   └── ParticleField.tsx
│   ├── projects/
│   │   ├── ProjectSidebar.tsx
│   │   └── ProjectDetail.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   └── ContactSection.tsx
│   ├── ui/
│   │   ├── ThemeToggle.tsx
│   │   ├── LanguageSelector.tsx
│   │   ├── Footer.tsx
│   │   └── AnimatedSection.tsx
│   └── icons/
│       └── TechIcons.tsx
├── content/
│   └── project-data.ts         → Project metadata (titles, URLs, tech stacks)
├── lib/
│   ├── i18n.ts                 → next-intl configuration
│   └── utils.ts                → Shared utility functions
├── messages/
│   ├── en.json                 → English translations
│   ├── es.json                 → Spanish translations
│   ├── fr.json                 → French translations
│   └── pt.json                 → Portuguese translations
└── styles/
    └── globals.css             → Tailwind directives + CSS variables
public/
├── images/
│   ├── projects/               → Project screenshots
│   ├── avatar-placeholder.png  → Owner photo placeholder
│   └── flags/                  → Language flag icons
├── favicon.ico
├── robots.txt
└── sitemap.xml
```

## Color System (from Legacy)

### Light Theme (default)
| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#dbdbdb` | Page background |
| `--title1` | `#0400df` | Primary blue (headings, accents) |
| `--title2` | `#007ce2` | Light blue (name, highlights) |
| `--description` | `#464444` | Body text |
| `--gradient1` | `#360033` | Gradient start (purple-dark) |
| `--gradient2` | `#2B32B2` | Gradient middle (blue) |
| `--gradient3` | `#0B8793` | Gradient end (teal) |

### Dark Theme
| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#000000` | Page background |
| `--title1` | `#2F94BC` | Primary blue (headings, accents) |
| `--title2` | `#9ADAE5` | Light blue (name, highlights) |
| `--description` | `#c0c0c0` | Body text |
| `--gradient1` | `#5433FF` | Gradient start (purple) |
| `--gradient2` | `#20BDFF` | Gradient middle (cyan) |
| `--gradient3` | `#A5FECB` | Gradient end (mint) |

## Data Models

### Project Interface
```typescript
interface Project {
  slug: string;
  title: string;
  descriptionKey: string;       // i18n translation key
  technologies: string[];
  siteUrl: string;
  githubUrl: string;
  screenshotPath: string;
}
```

### Skill Interface
```typescript
interface Skill {
  name: string;
  icon: string;                 // Icon identifier (e.g., from react-icons)
}

interface SkillCategory {
  category: string;             // "Frontend" | "Backend" | "Tools" | "Other"
  categoryKey: string;          // i18n key for category name
  skills: Skill[];
}
```

### Navigation Link Interface
```typescript
interface NavLink {
  labelKey: string;             // i18n translation key
  href: string;
  isExternal?: boolean;
}
```

## Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Framework | Next.js | ^14 | App Router, SSG, image optimization |
| Language | TypeScript | ^5 | Type safety |
| Styling | Tailwind CSS | ^3.4 | Utility-first CSS |
| 3D Graphics | @react-three/fiber | ^8 | Declarative Three.js |
| 3D Helpers | @react-three/drei | ^9 | Common 3D utilities |
| Theming | next-themes | ^0.3 | Dark/light mode |
| i18n | next-intl | ^3 | Multi-language |
| Animation | framer-motion | ^11 | Page/scroll animations |
| Icons | react-icons | ^5 | Tech skill icons |
| Linting | ESLint | ^8 | Code quality |
| Formatting | Prettier | ^3 | Code formatting |
| Deployment | AWS Amplify | - | Hosting + CI/CD |

## Key Technical Patterns

### Server vs Client Components
- **Server Components** (default): All page layouts, static content sections, project data rendering
- **Client Components** (marked with "use client"): NavigationBar (mobile menu state), ThreeBackground (WebGL), ThemeToggle (localStorage), LanguageSelector (state), AnimatedSection (intersection observer), Footer

### Three.js Background Strategy
- Render a full-viewport `<Canvas>` as a fixed background layer (`position: fixed; z-index: -1`)
- Use a particle field with ~1000 particles responding to mouse position via `useFrame` hook
- Detect WebGL support on mount; fall back to CSS gradient if unavailable
- Use `frameloop="demand"` or visibility API to pause when tab is inactive
- Particles use the gradient colors from the current theme

### Internationalization Strategy
- Store translations in `/src/messages/{locale}.json`
- Use next-intl's `useTranslations` hook in client components
- Persist locale choice in localStorage via a custom hook
- Default to English; fall back to English for missing keys

### Theme Strategy
- Use `next-themes` with `attribute="data-theme"` and `storageKey="theme"`
- Define CSS variables in `globals.css` under `:root` (light) and `[data-theme='dark']`
- Tailwind references these variables via `theme.extend.colors`
- Prevent flash with `next-themes`' script injection

### Animation Strategy
- Use `framer-motion`'s `motion` components with `whileInView` for scroll reveals
- Page transitions via `AnimatePresence` wrapping route content
- Respect `prefers-reduced-motion` by checking `useReducedMotion()` hook
- Theme transitions handled by CSS `transition` on color variables (300-500ms)

## Deployment Architecture

```
GitHub (main branch)
    │
    ▼ (webhook on push)
AWS Amplify
    ├── Build: npm run build (Next.js)
    ├── Deploy: CDN distribution
    ├── Domain: mfpmartins.dev + www.mfpmartins.dev
    ├── HTTPS: ACM certificate (auto-provisioned)
    └── Redirects: HTTP→HTTPS, www→apex
```

### Amplify Configuration (amplify.yml)
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

## Skills Data (Frontend-only focus)

| Category | Skills |
|----------|--------|
| Frontend | React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Three.js |
| Tools | Git, GitHub, VS Code, Vite, npm, Figma |
| Other | Responsive Design, SEO, Accessibility, AWS |
