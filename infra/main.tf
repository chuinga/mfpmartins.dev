# AWS Amplify App
resource "aws_amplify_app" "portfolio" {
  name       = "mfpmartins-dev"
  repository = var.github_repository

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

  custom_rule {
    source = "https://www.${var.domain_name}"
    status = "301"
    target = "https://${var.domain_name}"
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

# Custom domain
resource "aws_amplify_domain_association" "domain" {
  app_id      = aws_amplify_app.portfolio.id
  domain_name = var.domain_name

  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = ""
  }

  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = "www"
  }
}
