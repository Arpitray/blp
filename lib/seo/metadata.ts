import { DEFAULT_LANGUAGE, SUPPORTED_LOCALES } from '@/lib/languages'

export function resolveLocale(lang: string): string {
    return SUPPORTED_LOCALES.includes(lang) ? lang : DEFAULT_LANGUAGE
}

export function buildLocaleAlternates(
    pathForLocale: (locale: string) => string
): Record<string, string> {
    return Object.fromEntries(
        SUPPORTED_LOCALES.map((locale) => [locale, pathForLocale(locale)])
    ) as Record<string, string>
}