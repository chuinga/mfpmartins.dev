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
