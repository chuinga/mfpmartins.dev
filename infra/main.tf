# AWS Amplify App
resource "aws_amplify_app" "portfolio" {
  name         = "mfpmartins-dev"
  repository   = var.github_repository
  access_token = var.github_access_token

  build_spec = <<-EOT
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
  EOT

  environment_variables = {
    AMPLIFY_MONOREPO_APP_ROOT = "."
    _CUSTOM_IMAGE             = "amplify:al2023"
  }

  platform = "WEB_COMPUTE"

  custom_rule {
    source = "/<*>"
    status = "404-200"
    target = "/index.html"
  }
}

# Branch configuration
resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.portfolio.id
  branch_name = var.github_branch

  framework = "Next.js - SSR"
  stage     = "PRODUCTION"

  environment_variables = {
    NEXT_PUBLIC_SITE_URL = "https://${var.domain_name}"
  }
}
