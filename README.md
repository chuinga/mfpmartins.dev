# mfpmartins.dev

Personal portfolio website for Miguel Martins — Full-Stack Developer.

## Live Site

**Production:** https://mfpmartins.dev  
**CloudFront:** https://d3jxiihenswfnk.cloudfront.net

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **3D Graphics:** Three.js via React Three Fiber
- **Animations:** Framer Motion
- **Theming:** next-themes (dark/light)
- **i18n:** Custom client-side (EN/ES/FR/PT)
- **Deployment:** AWS (S3 + CloudFront)
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
4. Terraform Deploy (S3 + CloudFront infrastructure)
5. Deploy to S3 + CloudFront cache invalidation

## Infrastructure

Managed via Terraform in `/infra`:
- S3 bucket for static site files
- CloudFront CDN with HTTPS (ACM certificate)
- S3 bucket for access logs (telemetry)
- S3 backend + DynamoDB for Terraform state

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
