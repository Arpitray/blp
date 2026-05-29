// app/[lang]/faqs/page.tsx
// Converted to a Server Component so it can fetch from Sanity.
// FAQAccordionItem (client) handles the open/close accordion state.
import { Metadata } from 'next'
import { BackButton } from '@/components/shared/BackButton'
import { FAQAccordionItem } from '@/components/shared/FAQAccordionItem'
import { getPageTranslations } from '@/lib/pageTranslations'
import { buildLocaleAlternates, resolveLocale } from '@/lib/seo/metadata'
import { sanityClient } from '@/infrastructure/sanity/client'
import { FAQS_PAGE_QUERY } from '@/infrastructure/sanity/queries'

// ─── Types ────────────────────────────────────────────────────────────────────
interface FaqItem { question: string; answer: string }
interface FaqsPageData {
    title?: string
    faqItems?: FaqItem[]
    seo?: { metaTitle?: string; metaDescription?: string }
}

// ─── SEO ──────────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params
    const locale = resolveLocale(lang)
    const data = await sanityClient.fetch<FaqsPageData | null>(FAQS_PAGE_QUERY, { lang: locale })
    return {
        title: data?.seo?.metaTitle ?? 'Frequently Asked Questions — BlockP',
        description: data?.seo?.metaDescription ?? 'Find answers to the most common questions about BlockP.',
        alternates: {
            canonical: `/${locale}/faqs`,
            languages: buildLocaleAlternates((supportedLocale) => `/${supportedLocale}/faqs`),
        },
    }
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function FAQsPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params
    const locale = resolveLocale(lang)

    // 1️⃣ Try Sanity first
    const data = await sanityClient.fetch<FaqsPageData | null>(FAQS_PAGE_QUERY, { lang: locale })

    // 2️⃣ Fall back to hardcoded translations if Sanity has no document yet
    const t = getPageTranslations(locale)
    const pageTitle = data?.title ?? t.faqsTitle
    const faqItems: FaqItem[] = data?.faqItems?.length
        ? data.faqItems
        : t.faqItems.map((f) => ({ question: f.q, answer: f.a }))

    return (
        <div className="w-full flex flex-col items-center bg-[#F6FAFF]">
            <div className="w-[94%] lg:w-[90%] max-w-[1500px] mx-auto">
                <section className="relative pt-[200px] pb-32 w-full flex flex-col items-center">
                    <BackButton
                        className="absolute left-0 top-[205px] text-[#012955] hover:opacity-70 transition-opacity"
                        fallbackHref="/"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </BackButton>

                    <div className="flex flex-col items-center w-full">
                        <header className="mb-20 text-center">
                            <h1 className="text-[54px] md:text-[80px] font-black text-[#012955] leading-tight">
                                {pageTitle}
                            </h1>
                        </header>

                        <div className="w-full space-y-6">
                            {faqItems.map((faq, idx) => (
                                <FAQAccordionItem key={idx} question={faq.question} answer={faq.answer} />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
