# Implementation Tasks

## Task 1: Project Scaffolding and Configuration
- [x] Initialize Next.js project with TypeScript, Tailwind CSS, ESLint, and App Router
- [x] Install dependencies: next-themes, next-intl, framer-motion, @react-three/fiber, @react-three/drei, react-icons
- [x] Configure TypeScript strict mode in tsconfig.json
- [x] Configure Tailwind with CSS variable-based color tokens
- [x] Set up Prettier with printWidth: 100, single quotes, trailing commas
- [x] Set up ESLint with next/core-web-vitals config
- [x] Create globals.css with light/dark theme CSS variables (from legacy color scheme)
- [x] Create the folder structure: app/, components/, content/, lib/, messages/, public/

## Task 2: Theme System Setup
- [x] Install and configure next-themes in root layout with attribute="data-theme"
- [x] Define CSS variables in globals.css for light theme (:root) and dark theme ([data-theme='dark'])
- [x] Extend Tailwind config to reference CSS variables for colors
- [x] Create ThemeToggle client component with sun/moon icon toggle
- [x] Implement localStorage persistence and system preference fallback
- [x] Add smooth CSS transition (300ms) on theme-affected properties
- [x] Verify no flash of wrong theme on page load

## Task 3: Internationalization Setup
- [x] Install and configure next-intl for App Router
- [x] Create translation JSON files: messages/en.json, messages/es.json, messages/fr.json, messages/pt.json
- [x] Port all translation content from legacy locales (greeting, titles, descriptions, project descriptions, 404 message)
- [x] Add new translation keys for: About section, Skills section, Contact section, navigation labels
- [x] Create LanguageSelector client component with flag icons
- [x] Implement localStorage persistence for language preference
- [x] Set up English as default with English fallback for missing keys

## Task 4: Root Layout and Navigation
- [x] Create root layout.tsx with ThemeProvider and IntlProvider wrappers
- [x] Create NavigationBar client component with sticky positioning
- [x] Implement desktop nav: logo (left), nav links (center: Home, Projects, About, Skills, Contact), social icons (right)
- [x] Implement mobile nav: hamburger menu with full-screen overlay
- [x] Create SocialIcons component (LinkedIn, GitHub, Email with correct URLs)
- [x] Add active link highlighting based on current route
- [x] Add ARIA labels to all icon-only links and hamburger button
- [x] Ensure keyboard navigability and focus management for mobile menu

## Task 5: Three.js Animated Background
- [x] Create ThreeBackground client component with fixed-position full-viewport Canvas
- [x] Implement ParticleField component with ~800 animated particles using planet colors
- [x] Add mouse/cursor responsiveness (subtle parallax effect on particle positions)
- [x] Implement WebGL detection; render CSS gradient fallback if unsupported
- [x] Add visibility API integration to pause rendering when tab is inactive
- [x] Ensure particles use planet-inspired colors (round, soft-glow particles)
- [x] Test performance target: 30+ FPS on hardware-accelerated devices
- [x] Add touch device handling (continue animation without pointer interaction)

## Task 6: Home Page (Hero Section)
- [x] Create app/page.tsx as the home page
- [x] Implement HeroSection component with: greeting (p), name (h1), title (h2), description (p)
- [x] Wire up all text to next-intl translations
- [x] Add the vertical color bar accent (gradient left border, from legacy)
- [x] Add entrance animation with framer-motion (fade-in-up on load)
- [x] Ensure semantic HTML structure and responsive layout
- [x] Respect prefers-reduced-motion for animations

## Task 7: Projects Section with Sidebar
- [x] Create content/project-data.ts with all project metadata (slug, title, descriptionKey, technologies, siteUrl, githubUrl, screenshotPath)
- [x] Create app/projects/layout.tsx with sidebar + content area layout
- [x] Create ProjectSidebar component with project list and active highlighting
- [x] Create app/projects/page.tsx that redirects to or displays first project by default
- [x] Create app/projects/[slug]/page.tsx for individual project detail
- [x] Create ProjectDetail component with: title, description, browser-frame screenshot, Visit Site link, GitHub link, technology tags
- [x] Add project browser-frame screenshots to public/images/projects/
- [x] Implement responsive behavior: sidebar hidden on mobile, project list view instead
- [x] Wire all translatable text to next-intl

## Task 8: About Page
- [x] Create app/about/page.tsx
- [x] Implement AboutSection component with biography text (translated)
- [x] Include content about: full-stack developer role, location (near Lisbon), interests (programming, downhill biking, creating sounds), drive for learning
- [x] Add placeholder avatar image (public/images/avatar-placeholder.svg) using next/image
- [x] Add scroll-triggered entrance animation
- [x] Ensure responsive layout (image + text side by side on desktop, stacked on mobile)

## Task 9: Skills Page
- [x] Create app/skills/page.tsx
- [x] Implement SkillsSection component with categorized skill grid
- [x] Define skill categories: Frontend (React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Three.js), Tools (Git, GitHub, VS Code, Vite, npm, Figma), Other (Responsive Design, SEO, Accessibility, AWS)
- [x] Use react-icons for technology icons
- [x] Add category headings with translated labels
- [x] Add scroll-triggered staggered entrance animation for skill items
- [x] Ensure responsive grid layout (adapts columns based on viewport)

## Task 10: Contact Page
- [x] Create app/contact/page.tsx
- [x] Implement ContactSection component with call-to-action text (translated)
- [x] Add mailto link for contact@mfpmartins.dev
- [x] Add LinkedIn and GitHub profile links (open in new tab)
- [x] Add entrance animation
- [x] Ensure all links have proper ARIA labels and open in new tabs with rel="noopener noreferrer"

## Task 11: Footer Component
- [x] Create Footer client component
- [x] Include LanguageSelector (flag icons with active state)
- [x] Include ThemeToggle
- [x] Include dynamic copyright text (©{year} mfpmartins.dev)
- [x] Use semantic <footer> element
- [x] Ensure footer appears on all pages via root layout
- [x] Add ARIA live region for announcing theme/language changes to screen readers

## Task 12: Custom 404 Page
- [x] Create app/not-found.tsx
- [x] Add black-hole themed visual (use legacy blackHole.png or create CSS animation)
- [x] Add translated "page not found" message
- [x] Add link back to home page (translated label)
- [x] Ensure accessible alt text on visual element

## Task 13: Page Transitions and Scroll Animations
- [x] Create AnimatedSection wrapper component using framer-motion whileInView
- [x] Implement fade-in-up animation (opacity 0→1, translateY 20px→0, 400-600ms)
- [x] Trigger animation when 20% of section enters viewport
- [ ] Add AnimatePresence to root layout for page transition animations
- [ ] Implement page enter animation (fade, 200-400ms)
- [x] Check and respect useReducedMotion() — disable all animations if true
- [x] Apply AnimatedSection to all content sections across pages

## Task 14: Responsive Design Polish
- [ ] Verify mobile layout (320px+): stacked content, hamburger nav, hidden sidebar
- [ ] Verify tablet layout (768px+): sidebar visible, horizontal nav
- [ ] Verify desktop layout (1024px+): full layout with comfortable spacing
- [ ] Ensure minimum 16px body text and 44x44px touch targets
- [ ] Ensure images scale within containers without overflow
- [ ] Test all breakpoints for navigation, projects, about, skills, contact pages

## Task 15: SEO and Performance Optimization
- [ ] Add metadata to root layout (title, description, Open Graph tags)
- [ ] Add page-specific metadata to each route (title, description)
- [ ] Create public/robots.txt allowing crawling
- [ ] Create public/sitemap.xml listing all public pages
- [ ] Verify all images use next/image with proper alt text
- [ ] Ensure static generation is used for all pages (no dynamic server data)
- [ ] Run Lighthouse audit and address any issues below 90 score

## Task 16: Accessibility Audit
- [ ] Verify all images have descriptive alt text (decorative images use alt="")
- [ ] Verify all interactive elements are keyboard-reachable with visible focus indicators
- [ ] Verify color contrast ratios (4.5:1 normal text, 3:1 large text) in both themes
- [ ] Verify ARIA labels on: social icons, theme toggle, hamburger menu, language selector
- [ ] Add ARIA live region for theme/language change announcements
- [ ] Test keyboard navigation flow through entire site
- [ ] Verify focus trap in mobile menu overlay

## Task 17: AWS Amplify Deployment Setup
- [ ] Create amplify.yml build configuration file
- [ ] Configure build command (npm ci + npm run build)
- [ ] Document Amplify setup steps (connect GitHub repo, set branch, configure domain)
- [ ] Document custom domain setup (mfpmartins.dev + www redirect)
- [ ] Document ACM certificate provisioning steps
- [ ] Add environment variable documentation (if any needed in future)
- [ ] Verify build output is compatible with Amplify hosting

## Task 18: Final Integration and Testing
- [ ] Verify all pages render correctly in both themes
- [ ] Verify all translations work across all 4 languages on all pages
- [ ] Verify Three.js background renders and responds to mouse
- [ ] Verify WebGL fallback works when WebGL is disabled
- [ ] Verify all external links open correctly (LinkedIn, GitHub, email)
- [ ] Verify 404 page displays for invalid routes
- [ ] Verify responsive behavior across mobile/tablet/desktop
- [ ] Verify animations respect prefers-reduced-motion
- [ ] Run final Lighthouse audit (Performance 90+, Accessibility 90+)
- [ ] Commit and push to GitHub repository
