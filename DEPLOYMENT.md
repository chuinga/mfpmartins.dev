# AWS Amplify Deployment Guide

## Prerequisites

- AWS Account: `058264503354` (IAM user: Miguel)
- GitHub repository: https://github.com/chuinga/mfpmartins.dev
- Custom domain: mfpmartins.dev

## Setup Steps

### 1. Connect Repository to AWS Amplify

1. Go to AWS Amplify Console → "New app" → "Host web app"
2. Select "GitHub" as the source provider
3. Authorize AWS Amplify to access your GitHub account
4. Select the repository: `chuinga/mfpmartins.dev`
5. Select the branch: `main`

### 2. Configure Build Settings

Amplify should auto-detect the `amplify.yml` in the repo root. Verify it shows:

- Build command: `npm ci && npm run build`
- Output directory: `.next`
- Node.js version: 20+

If not auto-detected, the `amplify.yml` file in the repo root defines the build configuration.

### 3. Deploy

Click "Save and deploy". Amplify will:
- Clone the repo
- Install dependencies (`npm ci`)
- Build the Next.js app (`npm run build`)
- Deploy to CDN

### 4. Custom Domain Setup

1. In Amplify Console → "Domain management" → "Add domain"
2. Enter: `mfpmartins.dev`
3. Configure subdomains:
   - `mfpmartins.dev` → main branch
   - `www.mfpmartins.dev` → redirect to `mfpmartins.dev`
4. Amplify will provision an ACM certificate automatically
5. Update DNS records as instructed:
   - Add CNAME record for domain verification
   - Add CNAME/ALIAS record pointing to the Amplify CloudFront distribution

### 5. HTTPS & Redirects

Amplify automatically:
- Provisions TLS certificate via ACM
- Enables HTTPS
- Redirects HTTP → HTTPS
- Redirects www → apex domain (if configured)

### 6. CI/CD

Every push to `main` branch triggers automatic build and deploy.

## Environment Variables

Currently none required. If needed in the future, add them in:
Amplify Console → App settings → Environment variables

## Troubleshooting

- **Build fails**: Check Node.js version (needs 20+). Set in Amplify: App settings → Build settings → Build image settings → Node.js version
- **404 on routes**: Amplify handles Next.js routing automatically with the SSR adapter
- **Domain not resolving**: DNS propagation can take up to 48 hours
