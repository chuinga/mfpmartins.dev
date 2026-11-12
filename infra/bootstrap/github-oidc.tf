# IAM role assumed by GitHub Actions through OIDC (replaces long-lived access keys).
# Lives in bootstrap on purpose: the pipeline cannot modify its own permissions.
# Apply manually: terraform apply (uses local state)

data "aws_caller_identity" "current" {}

data "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"
}

locals {
  account_id      = data.aws_caller_identity.current.account_id
  github_repo     = "chuinga/mfpmartins.dev"
  distribution_id = "E38AFI4PCDXE6K"
  oac_id          = "E101JHHBAS9MZC"
  site_buckets = [
    "arn:aws:s3:::mfpmartins-dev-website",
    "arn:aws:s3:::mfpmartins-dev-logs",
  ]
}

data "aws_iam_policy_document" "github_trust" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [data.aws_iam_openid_connect_provider.github.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:sub"
      values = [
        "repo:${local.github_repo}:ref:refs/heads/main",
        # Jobs that use the protected `production` environment (manual approval) get this subject
        "repo:${local.github_repo}:environment:production",
      ]
    }
  }
}

resource "aws_iam_role" "github_deploy" {
  name                 = "mfpmartins-dev-github-deploy"
  description          = "GitHub Actions deploy role for ${local.github_repo} (main branch only)"
  assume_role_policy   = data.aws_iam_policy_document.github_trust.json
  max_session_duration = 3600
}

data "aws_iam_policy_document" "github_deploy" {
  # Site and log buckets managed by Terraform, plus content sync
  statement {
    sid       = "SiteBuckets"
    effect    = "Allow"
    actions   = ["s3:*"]
    resources = concat(local.site_buckets, [for b in local.site_buckets : "${b}/*"])
  }

  # Terraform remote state
  statement {
    sid       = "StateBucketList"
    effect    = "Allow"
    actions   = ["s3:ListBucket", "s3:GetBucketVersioning"]
    resources = [aws_s3_bucket.terraform_state.arn]
  }

  statement {
    sid       = "StateObject"
    effect    = "Allow"
    actions   = ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"]
    resources = ["${aws_s3_bucket.terraform_state.arn}/mfpmartins-dev/*"]
  }

  statement {
    sid       = "StateLock"
    effect    = "Allow"
    actions   = ["dynamodb:GetItem", "dynamodb:PutItem", "dynamodb:DeleteItem", "dynamodb:DescribeTable"]
    resources = [aws_dynamodb_table.terraform_locks.arn]
  }

  # CloudFront: read everywhere (list/describe needs "*"), write only on this distribution and OAC
  statement {
    sid       = "CloudFrontRead"
    effect    = "Allow"
    actions   = ["cloudfront:Get*", "cloudfront:List*"]
    resources = ["*"]
  }

  statement {
    sid    = "CloudFrontWrite"
    effect = "Allow"
    actions = [
      "cloudfront:UpdateDistribution",
      "cloudfront:CreateInvalidation",
      "cloudfront:TagResource",
      "cloudfront:UntagResource",
      "cloudfront:UpdateOriginAccessControl",
    ]
    resources = [
      "arn:aws:cloudfront::${local.account_id}:distribution/${local.distribution_id}",
      "arn:aws:cloudfront::${local.account_id}:origin-access-control/${local.oac_id}",
    ]
  }

  # CloudFront function and response headers policy managed by Terraform
  statement {
    sid    = "CloudFrontFunctionAndHeaders"
    effect = "Allow"
    actions = [
      "cloudfront:CreateFunction",
      "cloudfront:UpdateFunction",
      "cloudfront:PublishFunction",
      "cloudfront:DeleteFunction",
      "cloudfront:DescribeFunction",
      "cloudfront:TestFunction",
      "cloudfront:CreateResponseHeadersPolicy",
      "cloudfront:UpdateResponseHeadersPolicy",
      "cloudfront:DeleteResponseHeadersPolicy",
    ]
    resources = [
      "arn:aws:cloudfront::${local.account_id}:function/mfpmartins-dev-*",
      "arn:aws:cloudfront::${local.account_id}:response-headers-policy/*",
    ]
  }

  # CloudWatch dashboard managed by Terraform
  statement {
    sid       = "DashboardWrite"
    effect    = "Allow"
    actions   = ["cloudwatch:GetDashboard", "cloudwatch:PutDashboard", "cloudwatch:DeleteDashboards"]
    resources = ["arn:aws:cloudwatch::${local.account_id}:dashboard/mfpmartins-dev"]
  }

  statement {
    sid       = "DashboardList"
    effect    = "Allow"
    actions   = ["cloudwatch:ListDashboards"]
    resources = ["*"]
  }
}

resource "aws_iam_role_policy" "github_deploy" {
  name   = "deploy"
  role   = aws_iam_role.github_deploy.id
  policy = data.aws_iam_policy_document.github_deploy.json
}

output "github_deploy_role_arn" {
  value = aws_iam_role.github_deploy.arn
}
