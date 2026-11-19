# Applied manually (local state), like the rest of bootstrap.

# ---------------------------------------------------------------------------
# GuardDuty (SEC-009). 30-day free trial, then billed by usage.
# ---------------------------------------------------------------------------
resource "aws_guardduty_detector" "main" {
  enable = true
}
