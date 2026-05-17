# mfpmartins.dev

Personal portfolio website for Miguel Martins — Full-Stack Developer.

## Live Site

**Production:** https://main.d2dwwqpvbzqcdg.amplifyapp.com  
**Custom domain (pending):** https://mfpmartins.dev

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **3D Graphics:** Three.js via React Three Fiber
- **Animations:** Framer Motion
- **Theming:** next-themes (dark/light)
- **i18n:** Custom client-side (EN/ES/FR/PT)
- **Deployment:** AWS Amplify
- **IaC:** Terraform
- **CI/CD:** GitHub Actions

## Features

- Animated 3D particle background (planet colors, mouse-responsive)
- Spinning animated logo
- Dark/light theme with system preference detection
- Multi-language support (English, Spanish, French, Portuguese)
- Responsive design (mobile-first)
- Project showcases with live iframe previews
- Skills grid with categorized tech icons
- SEO metadata + OpenGraph tags
- Accessible (ARIA labels, keyboard navigation, focus indicators)

## Development

```bash
npm install --legacy-peer-deps
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full AWS setup instructions.

**CI/CD Pipeline:** Pushes to `main` trigger:
1. Validate (TypeScript + ESLint + build)
2. Preflight SAST (npm audit + secrets scan)
3. Terraform Plan
4. Terraform Deploy (Amplify infrastructure)

## Infrastructure

Managed via Terraform in `/infra`:
- AWS Amplify App + branch + auto-build
- S3 backend for Terraform state
- DynamoDB table for state locking

## Project Structure

```
src/
├── app/           → Pages (App Router)
├── components/    → UI components
├── content/       → Project data
├── lib/           → Utilities and i18n
├── messages/      → Translation files (EN/ES/FR/PT)
public/            → Static assets
infra/             → Terraform IaC
.github/workflows/ → CI/CD pipeline
```
