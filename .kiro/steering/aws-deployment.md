# AWS Deployment

## Hosting Strategy

This site is deployed on AWS. Preferred approach:

1. **AWS Amplify Hosting** — simplest option for Next.js on AWS (supports SSR, ISR, and static)
2. **Alternative**: S3 + CloudFront for static export if SSR is not needed

## Infrastructure Considerations

- Use a custom domain (mfpmartins.dev) with Route 53 or external DNS
- Enable HTTPS via ACM (AWS Certificate Manager)
- Configure CloudFront caching headers appropriately for static assets
- Use environment variables for any secrets or API keys (never hardcode)

## Build & Deploy

- Build command: `npm run build`
- Output should be optimized for production (next build handles this)
- Consider CI/CD via GitHub Actions or Amplify's built-in pipeline

## Performance

- Target Lighthouse scores of 90+ across all categories
- Use next/image for automatic image optimization
- Leverage static generation where possible
- Minimize client-side JavaScript bundle size
