import { MetadataRoute } from 'next'
import { SUPPORTED_LOCALES, DEFAULT_LANGUAGE } from '@/lib/languages'
import { SITE_URL } from '@/lib/seo/metadata'

/**
 * Static page paths relative to the locale segment.
 * Add new pages here as the site grows.
 */
const STATIC_PAGES: string[] = [
    '',                          // homepage  /en
    '/premium',
    '/faqs',
    '/privacy-policy',
    '/terms-and-conditions',
    '/data-deletion',
    '/fact-checked',
    '/medical-professionals',
    '/addiction-test',
    '/blog',
    '/products/android',
    '/products/ios',
    '/products/chrome',
    '/products/macos',
    '/products/microsoft',
]

type SitemapEntry = MetadataRoute.Sitemap[number]

/**
 * Build the `alternates.languages` block for a single page path.
 * This tells Google every language version of the page.
 */
function buildAlternates(path: string): NonNullable<SitemapEntry['alternates']> {
    const languages: Record<string, string> = {}

    for (const locale of SUPPORTED_LOCALES) {
        languages[locale] = `${SITE_URL}/${locale}${path}`
    }

    // x-default → English fallback
    languages['x-default'] = `${SITE_URL}/${DEFAULT_LANGUAGE}${path}`

    return { languages }
}

export default function sitemap(): MetadataRoute.Sitemap {
    const entries: MetadataRoute.Sitemap = []

    for (const path of STATIC_PAGES) {
        for (const locale of SUPPORTED_LOCALES) {
            const url = `${SITE_URL}/${locale}${path}`

            entries.push({
                url,
                lastModified: new Date(),
                changeFrequency: path === '' ? 'weekly' : 'monthly',
                priority: path === '' ? 1.0 : 0.8,
                alternates: buildAlternates(path),
            })
        }
    }

    return entries
}
