import { DEFAULT_LANGUAGE, SUPPORTED_LOCALES } from '@/lib/languages'

/**
 * Production site URL — used to build absolute canonical/hreflang URLs.
 * Google recommends absolute URLs for hreflang entries.
 * Falls back to localhost during development.
 */
export const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://blockp.io'

/** Resolves the active locale, falling back to the default if unsupported. */
export function resolveLocale(lang: string): string {
    return SUPPORTED_LOCALES.includes(lang) ? lang : DEFAULT_LANGUAGE
}

/**
 * Builds the `alternates.languages` map for Next.js `generateMetadata`.
 *
 * Returns a record mapping every supported locale code → its page URL
 * plus the required `x-default` entry (pointing to the English version).
 *
 * Next.js converts this map into:
 *   <link rel="alternate" hreflang="en" href="..." />
 *   ...
 *   <link rel="alternate" hreflang="x-default" href="..." />
 *
 * @param pathForLocale - A function that receives a locale string and
 *                        returns the *relative* path for that locale,
 *                        e.g. (locale) => `/${locale}/products/android`
 */
export function buildLocaleAlternates(
    pathForLocale: (locale: string) => string
): Record<string, string> {
    const entries = SUPPORTED_LOCALES.map((locale) => [
        locale,
        pathForLocale(locale),
    ])

    // x-default signals Google's "catch-all" URL — we point it to English
    entries.push(['x-default', pathForLocale(DEFAULT_LANGUAGE)])

    return Object.fromEntries(entries) as Record<string, string>
}