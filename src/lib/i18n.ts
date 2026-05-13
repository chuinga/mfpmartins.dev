export const locales = ['en', 'es', 'fr', 'pt'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export async function getMessages(locale: Locale): Promise<Record<string, unknown>> {
  try {
    return (await import(`@/messages/${locale}.json`)).default
  } catch {
    return (await import(`@/messages/en.json`)).default
  }
}
