output "amplify_app_id" {
  description = "Amplify App ID"
  value       = aws_amplify_app.portfolio.id
}

output "amplify_default_domain" {
  description = "Amplify default domain"
  value       = aws_amplify_app.portfolio.default_domain
}

output "amplify_app_url" {
  description = "Production URL"
  value       = "https://${var.domain_name}"
}
