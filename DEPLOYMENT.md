# Deployment

The site is a static export (`output: 'export'`) hosted on S3 behind CloudFront. Infrastructure is managed with Terraform and deployed by GitHub Actions.

## Architecture

- **Hosting**: private S3 bucket (`mfpmartins-dev-website`), read by CloudFront through Origin Access Control.
- **CDN**: CloudFront distribution for `mfpmartins.dev` and `www.mfpmartins.dev`, TLS 1.2+, HTTP to HTTPS redirect.
- **Viewer-request function** (`infra/functions/viewer-request.js`): redirects `www` to the apex domain and maps extensionless paths such as `/about` to `/about.html`.
- **Response headers policy** (`infra/main.tf`): HSTS, CSP, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Content-Type-Options`. Update the CSP `frame-src` list when adding a project embed.
- **Errors**: S3 returns 403 for missing keys, so CloudFront maps 403 and 404 to `/404.html` with a real 404 status.
- **Certificate**: ACM certificate in `us-east-1` for `mfpmartins.dev` and `*.mfpmartins.dev`.
- **DNS**: managed at the domain registrar (Porkbun), not in Route 53.
- **Logs**: CloudFront access logs go to `mfpmartins-dev-logs`.
- **Terraform state**: S3 bucket `mfpmartins-terraform-state` with a DynamoDB lock table.

## Pipeline (`.github/workflows/deploy.yml`)

Runs on pull requests (checks only) and on pushes to `main`.

1. **Validate**: type-check, lint, build the static export.
2. **Preflight SAST**: `npm audit --omit=dev --audit-level=high` and a secret scan of tracked files. Both fail the pipeline.
3. **Detect infra changes**: Terraform only runs when files under `infra/` changed.
4. **Terraform Plan** then **Terraform Deploy**: the apply job uses the protected `production` GitHub environment and waits for manual approval.
5. **Deploy to S3**: syncs `out/` to the bucket and invalidates the CloudFront cache.

Pull requests never receive AWS credentials.

## AWS authentication

The pipeline uses GitHub OIDC and assumes the `mfpmartins-dev-github-deploy` role. There are no long-lived AWS keys in GitHub secrets. The role trusts only this repository's `main` branch and the `production` environment, and its permissions are limited to this site's resources.

The role is defined in `infra/bootstrap/github-oidc.tf`, which is applied manually. This keeps the pipeline from editing its own permissions.

## Branch protection

`main` is protected by a ruleset: no force pushes or deletion, pull requests required, and the `Validate` and `Preflight SAST` checks must pass.

## Common tasks

### Deploy a change

1. Create a branch, commit, and open a pull request.
2. Merge once the checks pass.
3. If `infra/` changed, approve the `production` deployment in the Actions run.

### Change the bootstrap resources (state bucket, locks table, OIDC role)

```bash
cd infra/bootstrap
terraform init
terraform plan
terraform apply
```

Bootstrap state is stored locally and is not committed. Back it up if you move machines.

### Roll back

Revert the offending commit through a pull request. The pipeline redeploys the previous content. The website bucket is not versioned, so a revert is the rollback path.

### Preview locally

```bash
npm run dev      # development server at http://localhost:3000
npm run build    # static export into out/
```

## Troubleshooting

- **Pipeline waits on "Terraform Deploy"**: it needs approval in the Actions run (production environment).
- **Page returns the 404 page**: check that the file exists in the bucket (`aws s3 ls s3://mfpmartins-dev-website/ --recursive`) and invalidate the cache.
- **Stale content**: the pipeline invalidates `/*` after every deploy, but browsers may cache for up to an hour.
- **`terraform plan` shows unexpected changes**: someone changed the distribution outside Terraform. Re-apply from the pipeline.
