# Applied manually (local state), like the rest of bootstrap.

# ---------------------------------------------------------------------------
# S3: block public access for every bucket in the account (SEC-009)
# ---------------------------------------------------------------------------
resource "aws_s3_account_public_access_block" "account" {
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
