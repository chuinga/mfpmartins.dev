terraform {
  required_version = ">= 1.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket         = "mfpmartins-terraform-state"
    key            = "mfpmartins-dev/terraform.tfstate"
    region         = "eu-west-1"
    dynamodb_table = "mfpmartins-terraform-locks"
    encrypt        = true
  }
}

# CloudFront certificates must live in us-east-1
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "mfpmartins-dev"
      ManagedBy   = "terraform"
      Environment = "production"
      Owner       = "Miguel"
      CostCenter  = "personal"
      Repository  = "chuinga/mfpmartins.dev"
    }
  }
}
