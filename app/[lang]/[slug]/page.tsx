import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { buildLocaleAlternates, resolveLocale } from '@/lib/seo/metadata'

const SLUG_PRIVACY = 'privacy-policy'
const SLUG_TERMS = 'terms-and-conditions'
const REDIRECT_TO_TERMS = new Set(['faqs', 'premium', 'data-deletion'])
const SUPPORTED_SLUGS = [SLUG_PRIVACY, SLUG_TERMS, ...Array.from(REDIRECT_TO_TERMS)]

const PRIVACY_CONTENT = `Privacy Policy
Last Updated: 22-12-2025

NovaFocus Private Limited ("NovaFocus", "we", "our", or "us") operates the BlockP mobile application ("App"), a digital wellbeing and parental control application designed to help users block access to adult content, reduce distractions, and promote healthier device usage.

We are committed to protecting your privacy. This Privacy Policy explains what data we collect, how we use it, how we protect it, and your rights.

1. Scope of This Privacy Policy
This Privacy Policy applies to the BlockP iOS and Android mobile applications and related websites/services operated by NovaFocus.

2. Purpose of the App
BlockP is designed to block access to adult and harmful content, restrict distracting apps, and support parental control and digital wellbeing.

3. Data We Collect
We collect only the minimum data required for core app functionality.
- Information you provide: email/account identifier, app preferences, control settings.
- Limited automatic data: enforcement metadata, MDM profile status.
- We do NOT collect browsing content, keystrokes, messages, media, location, contacts, or ad identifiers.

4. Use of Mobile Device Management (MDM)
On supported platforms, BlockP may use MDM profiles strictly for restriction enforcement (with explicit user consent).

5. How We Use Your Data
We use data only to provide app functionality, enforce restrictions, improve stability, and provide support.

6. Data Sharing & Third Parties
We do not sell or share personal data for advertising or profiling.

7. Data Security
We use encryption, access controls, and security reviews to protect data.

8. Data Retention
Data is retained only as needed for service or legal requirements; deletion can be requested.

9. User Consent & Transparency
Permissions and restriction behavior are disclosed clearly before activation.

10. Children's Privacy
BlockP may be used by parents/guardians; we do not knowingly collect child data improperly.

11. Your Rights
You may request access, correction, deletion, or consent withdrawal depending on jurisdiction.

12. Compliance & Audits
BlockP may be audited for privacy and MDM compliance.

13. Changes to This Policy
We may update this policy periodically with a revised last-updated date.

14. Contact
Email: support@blockp.io
Website: https://blockp.io`

const TERMS_CONTENT = `Terms and Conditions
Last Updated: 20-02-2024

Welcome to BlockP. These Terms of Service ("Terms") govern your access to and use of the Services.

1. Acceptance of Terms
By accessing or using the Services, you agree to these Terms.

2. Privacy Policy
Please review our Privacy Policy for information about data handling.

3. User Accounts
You are responsible for account information, confidentiality, and activities under your account.

4. Use of Services
Use is permitted only for lawful purposes and in accordance with these Terms.

5. Intellectual Property
All service content/features are owned by BlockP or licensors and protected by law.

6. Third-Party Services
Third-party services/websites may be linked; use them at your own risk.

7. Service Modifications
BlockP may modify or discontinue the Services without notice.

8. Termination
Access may be suspended or terminated at any time, with or without cause.

9. Disclaimer of Warranties
Services are provided "AS IS" and "AS AVAILABLE" without warranties.

10. Limitation of Liability
To the fullest extent permitted by law, BlockP is not liable for indirect or consequential damages.

11. Governing Law
These Terms are governed by applicable jurisdiction law.

12. Changes to Terms
BlockP may update these Terms at any time; continued use constitutes acceptance.

13. Cancellation and Refund Policy
Refund/cancellation requests may be made within 7 days via support@blockp.in.
Approved refunds are returned to original method within 5-7 business days.
After 7 days, purchases are final and non-refundable.

14. Contact
Email: contact@novafocus.in

By using the Services, you agree to these Terms.`

type StaticPage = {
  slug: string
  title: string
  content: string
}

function getStaticPage(slug: string): StaticPage | null {
  if (slug === SLUG_PRIVACY) {
    return {
      slug,
      title: 'Privacy Policy',
      content: PRIVACY_CONTENT,
    }
  }

  if (slug === SLUG_TERMS) {
    return {
      slug,
      title: 'Terms and Conditions',
      content: TERMS_CONTENT,
    }
  }

  return null
}

export async function generateStaticParams() {
  const { supportedLocales } = await import('@/lib/i18n')

  return supportedLocales.flatMap((lang) =>
    SUPPORTED_SLUGS.map((slug) => ({
      lang,
      slug,
    }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  const locale = resolveLocale(lang)

  const page = getStaticPage(slug)
  const title = page?.title || 'Legal'

  return {
    title: `${title} - BlockP`,
    description: `${title} page on BlockP.`,
    alternates: {
      canonical: `/${locale}/${slug}`,
      languages: buildLocaleAlternates((supportedLocale) => `/${supportedLocale}/${slug}`),
    },
  }
}

export default async function StaticLegalPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  const locale = resolveLocale(lang)

  if (REDIRECT_TO_TERMS.has(slug)) {
    redirect(`/${locale}/${SLUG_TERMS}`)
  }

  const page = getStaticPage(slug)

  if (!page) {
    notFound()
  }

  const paragraphs = page.content
    .split('\n\n')
    .map((segment) => segment.trim())
    .filter(Boolean)

  return (
    <div className="mx-auto w-full max-w-[1100px] px-6 pb-24 pt-[140px] md:px-10">
      <h1 className="mb-8 text-[36px] font-black leading-[1.15] text-brand-primary md:text-[52px]">
        {page.title}
      </h1>

      <article className="space-y-5 text-[#002954]">
        {paragraphs.map((paragraph, index) => (
          <p key={`${page.slug}-${index}`} className="text-[18px] font-medium leading-[1.6]">
            {paragraph}
          </p>
        ))}
      </article>
    </div>
  )
}
import { siteService } from '@/lib/container'
import { Metadata } from 'next'
import { buildLocaleAlternates, resolveLocale } from '@/lib/seo/metadata'

function normalizeInternalSlug(value?: string): string | null {
  if (!value) return null
  const trimmed = value.trim()
  if (!trimmed) return null

  const withoutLeadingSlash = trimmed.replace(/^\/+/, '')
  const firstSegment = withoutLeadingSlash.split('/').filter(Boolean)[0]
  return firstSegment || null
}

function titleFromSlug(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

type FooterManagedPage = {
  slug: string
  label: string
}

async function getManagedPages(): Promise<FooterManagedPage[]> {
  const footerData = await siteService.getFooterData()
  const managedPages: FooterManagedPage[] = []
  const seen = new Set<string>()

  for (const column of footerData?.columns ?? []) {
    for (const link of column?.links ?? []) {
      const slug = normalizeInternalSlug(link.internalPath)
      if (!slug || seen.has(slug)) continue

      seen.add(slug)
      managedPages.push({
        slug,
        label: link.label || titleFromSlug(slug),
      })
    }
  }

  return managedPages
}

export async function generateStaticParams() {
  const pages = await getManagedPages()
  const { supportedLocales } = await import('@/lib/i18n')

  return supportedLocales.flatMap((lang) =>
    pages.map((page) => ({
      lang,
      slug: page.slug,
    }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  const locale = resolveLocale(lang)
  const pages = await getManagedPages()
  const page = pages.find((entry) => entry.slug === slug)
  const pageTitle = page?.label || titleFromSlug(slug)

  return {
    title: `${pageTitle} - BlockP`,
    description: `${pageTitle} page on BlockP.`,
    alternates: {
      canonical: `/${locale}/${slug}`,
      languages: buildLocaleAlternates((supportedLocale) => `/${supportedLocale}/${slug}`),
    },
  }
}

export default async function ManagedSlugPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { slug } = await params
  const pages = await getManagedPages()
  const page = pages.find((entry) => entry.slug === slug)
  const pageTitle = page?.label || titleFromSlug(slug)

  return (
    <div className="mx-auto w-full max-w-[1100px] px-6 pb-24 pt-[140px] md:px-10">
      <h1 className="mb-6 text-[36px] font-black leading-[1.15] text-brand-primary md:text-[52px]">
        {pageTitle}
      </h1>
      <p className="text-[18px] font-medium leading-[1.6] text-brand-primary opacity-85">
        This page is currently managed through the footer links in Sanity.
      </p>
    </div>
  )
}
