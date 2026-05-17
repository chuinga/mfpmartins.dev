variable "aws_region" {
  description = "AWS region for infrastructure"
  type        = string
  default     = "eu-west-1"
}

variable "domain_name" {
  description = "Custom domain for the website"
  type        = string
  default     = "mfpmartins.dev"
}

variable "github_repository" {
  description = "GitHub repository URL"
  type        = string
  default     = "https://github.com/chuinga/mfpmartins.dev"
}

variable "github_access_token" {
  description = "GitHub personal access token for Amplify to access the repository"
  type        = string
  sensitive   = true
}

variable "github_branch" {
  description = "Branch to deploy from"
  type        = string
  default     = "main"
}
