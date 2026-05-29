// app/[lang]/premium/page.tsx — Premium Page with Sanity CMS + hardcoded fallbacks
// ⚡ SAFE: falls back to pageTranslations if no Sanity document exists yet.
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { getPageTranslations } from '@/lib/pageTranslations'
import { buildLocaleAlternates, resolveLocale } from '@/lib/seo/metadata'
import { PremiumMascot } from '@/components/shared/PremiumMascot'
import { sanityClient } from '@/infrastructure/sanity/client'
import { PREMIUM_PAGE_QUERY } from '@/infrastructure/sanity/queries'

// ─── Types ────────────────────────────────────────────────────────────────────
interface PremiumFeature { label: string; iconPath?: string; includedInFree?: boolean }
interface PremiumPageData {
    hero?: { titleLine1?: string; titleLine2?: string; ctaText?: string; ctaUrl?: string }
    subheading?: string
    pricing?: {
        freeLabel?: string
        annualLabel?: string
        annualPriceNote?: string
        monthlyLabel?: string
        monthlyPriceNote?: string
        pricingCtaText?: string
        pricingCtaUrl?: string
        features?: PremiumFeature[]
    }
    testimonial?: { quote?: string; authorName?: string; authorRole?: string; rating?: number }
    seo?: { metaTitle?: string; metaDescription?: string }
}

// ─── SEO ─────────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params
    const locale = resolveLocale(lang)
    const hp = await sanityClient.fetch<PremiumPageData | null>(PREMIUM_PAGE_QUERY, { lang: locale })
    return {
        title: hp?.seo?.metaTitle ?? 'BlockP Premium — Upgrade for Advanced AI Porn Blocking',
        description: hp?.seo?.metaDescription ?? 'Upgrade to BlockP Premium for AI-powered blocking, multi-device support, ad-free experience, and advanced custom keyword controls.',
        alternates: {
            canonical: `/${locale}/premium`,
            languages: buildLocaleAlternates((supportedLocale) => `/${supportedLocale}/premium`),
        },
    }
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function PremiumPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params
    const locale = resolveLocale(lang)

    // 1️⃣ Try Sanity first
    const hp = await sanityClient.fetch<PremiumPageData | null>(PREMIUM_PAGE_QUERY, { lang: locale })

    // 2️⃣ Fall back to pageTranslations — page is NEVER blank
    const t = getPageTranslations(locale)

    // Derived values with fallbacks
    const heroTitle1 = hp?.hero?.titleLine1 ?? t.premiumHeroTitle[0]
    const heroTitle2 = hp?.hero?.titleLine2 ?? t.premiumHeroTitle[1]
    const heroCta = hp?.hero?.ctaText ?? t.premiumHeroCta
    const heroCtaUrl = hp?.hero?.ctaUrl ?? '/get-started'
    const subheading = hp?.subheading ?? t.premiumSubheading
    const freeLabel = hp?.pricing?.freeLabel ?? t.premiumFreeForever
    const annualLabel = hp?.pricing?.annualLabel ?? t.premiumAnnual
    const annualPriceNote = hp?.pricing?.annualPriceNote ?? '($10 /mo billed annually)'
    const monthlyLabel = hp?.pricing?.monthlyLabel ?? t.premiumMonthly
    const monthlyPriceNote = hp?.pricing?.monthlyPriceNote ?? '($10 /mo)'
    const pricingCta = hp?.pricing?.pricingCtaText ?? t.premiumCta
    const pricingCtaUrl = hp?.pricing?.pricingCtaUrl ?? '/get-started'
    const testimonialQuote = hp?.testimonial?.quote ?? 'The best blocker app. Light on battery usage compared to competitors, and powerful enough to not only block adult content but also block politics and other \'toxic\' stuff by adding my own custom keywords.'
    const testimonialName = hp?.testimonial?.authorName ?? 'Hendjati Pravito'
    const testimonialRole = hp?.testimonial?.authorRole ?? 'BlockP User'
    const testimonialRating = hp?.testimonial?.rating ?? 5

    // Features: use Sanity data if available, otherwise fall back to translations
    const sanityFeatures = hp?.pricing?.features
    const usesSanityFeatures = sanityFeatures && sanityFeatures.length > 0

    // Helper: render features for each card
    const renderFreeFeatures = () => {
        if (usesSanityFeatures) {
            return sanityFeatures!.map((f, i) => (
                <PricingFeature
                    key={i}
                    label={f.label}
                    status={f.includedInFree ? 'check' : 'dash'}
                    iconPath={f.iconPath}
                />
            ))
        }
        // Fallback: first feature is included free, rest are dash
        return t.premiumFeatures.map((label, i) => (
            <PricingFeature
                key={i}
                label={label}
                status={i === 0 ? 'check' : 'dash'}
                iconPath={FREE_ICON_PATHS[i]}
            />
        ))
    }

    const renderPremiumFeatures = (isCenter: boolean) => {
        if (usesSanityFeatures) {
            return sanityFeatures!.map((f, i) => (
                <PricingFeature
                    key={i}
                    label={f.label}
                    status="check"
                    isCenter={isCenter}
                    iconPath={f.iconPath}
                />
            ))
        }
        return t.premiumFeatures.map((label, i) => (
            <PricingFeature
                key={i}
                label={label}
                status="check"
                isCenter={isCenter}
                iconPath={FREE_ICON_PATHS[i]}
            />
        ))
    }

    return (
        <div className="w-full overflow-hidden bg-[#F6FBFE]">
            {/* ── HERO SECTION ── */}
            <section
                className="relative w-full overflow-hidden"
                style={{ background: 'linear-gradient(180deg, #6292FF 0%, #3572FF 100%)', minHeight: '520px' }}
            >
                <div className="w-[94%] lg:w-[90%] max-w-[1500px] mx-auto mx-auto flex flex-row items-center justify-between pt-36 pb-0 relative z-20" style={{ minHeight: '1000px' }}>
                    <div className="flex flex-col items-center text-center translate-y-[-40px] ml-[5%] lg:ml-[14%]">
                        <h1 className="text-[84px] md:text-[150px] font-black text-white leading-[1.0] mb-12">
                            <span className="block">{heroTitle1}</span>
                            <span className="block">{heroTitle2}</span>
                        </h1>
                        <Link href={heroCtaUrl}>
                            <button className="bg-white text-[#002954] font-semibold text-[24px] md:text-[32px] px-24 py-3 rounded-full shadow-[0px_12px_0px_#1A3B7A] hover:translate-y-1 hover:shadow-[0px_8px_0px_#1A3B7A] transition-all duration-200 whitespace-nowrap">
                                {heroCta}!
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Mascot */}
                <div
                    className="absolute pointer-events-none z-5 aspect-square w-[500px] md:w-[750px] lg:w-[700px]"
                    style={{ bottom: '-340px', right: '150px' }}
                >
                    <PremiumMascot className="w-full h-full" />
                </div>

                {/* Wave separator */}
                <div className="absolute bottom-[-2px] left-0 w-full leading-[0] z-10">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
                        <path d="M0 120 H1440 V80 Q720 -20 0 80 Z" fill="#F6FBFE" />
                    </svg>
                </div>
            </section>

            {/* ── DEVICES SECTION ── */}
            <section className="w-full pt-32 pb-24 flex flex-col items-center">
                <h2 className="text-[32px] md:text-[56px] font-bold text-[#012955] text-center max-w-4xl px-6 mb-24 leading-[1.2] whitespace-pre-line">
                    {subheading}
                </h2>

                <div className="flex flex-wrap justify-center gap-14 md:gap-32 lg:gap-44 px-6 mb-24">
                    {[
                        { src: '/premium/android.svg', label: 'Android' },
                        { src: '/premium/ios.svg', label: 'iOS' },
                        { src: '/premium/MacOS_logo.svg', label: 'macOS' },
                        { src: '/premium/chrome.svg', label: 'Chrome' },
                        { src: '/premium/windows.svg', label: 'Windows' },
                    ].map(({ src, label }) => (
                        <div key={label} className="flex flex-col items-center gap-5">
                            <div className="w-[60px] h-[60px] flex items-center justify-center">
                                <Image src={src} alt={label} width={60} height={60} className="object-contain" />
                            </div>
                            <span className="text-[18px] md:text-[20px] font-bold text-[#012955]">{label}</span>
                        </div>
                    ))}
                </div>

                <div className="w-3/4">
                    <div className="w-full h-[1.5px] bg-[#E8F2FF] font-semibold" />
                </div>
            </section>

            {/* ── PRICING SECTION ── */}
            <section className="w-full py-20 flex flex-col items-center overflow-hidden">
                <div className="w-full max-w-site mx-auto px-[12px] lg:px-[60px] xl:px-[100px] 2xl:px-[140px] flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-4 mt-12 mb-16">

                    {/* Free Forever */}
                    <div className="bg-white border-2 border-[#E1EAF6] rounded-[40px] w-full lg:w-[650px] p-8 flex flex-col h-auto lg:h-[640px] shadow-sm z-10 transition-transform">
                        <div className="text-center mb-6">
                            <h3 className="text-[48px] font-black text-[#153B62]">{freeLabel}</h3>
                        </div>
                        <div className="w-full h-[1px] bg-[#E1EAF6] mb-8" />
                        <div className="w-full flex flex-col justify-between flex-1 text-[#153B62] pb-4">
                            {renderFreeFeatures()}
                        </div>
                    </div>

                    {/* Annual */}
                    <div
                        className="rounded-[40px] w-full lg:w-[730px] p-8 flex flex-col shadow-2xl text-white z-20 h-auto lg:h-[740px] relative transition-transform"
                        style={{ backgroundColor: '#608DFF' }}
                    >
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <h3 className="text-[56px] font-black">{annualLabel}</h3>
                            <span className="text-[24px] font-bold opacity-90">{annualPriceNote}</span>
                        </div>
                        <div className="w-full h-[1px] bg-white/20 mb-8" />
                        <div className="w-full flex flex-col justify-between flex-1 text-white pb-4">
                            {renderPremiumFeatures(true)}
                        </div>
                    </div>

                    {/* Monthly */}
                    <div className="bg-[#EEF4FB] border-2 border-[#E1EAF6] rounded-[40px] w-full lg:w-[650px] p-8 flex flex-col h-auto lg:h-[640px] shadow-sm z-10 transition-transform">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <h3 className="text-[48px] font-black text-[#153B62]">{monthlyLabel}</h3>
                            <span className="text-[24px] font-bold text-[#153B62] opacity-80">{monthlyPriceNote}</span>
                        </div>
                        <div className="w-full h-[1px] bg-[#C9D9EC] mb-8" />
                        <div className="w-full flex flex-col justify-between flex-1 text-[#153B62] pb-4">
                            {renderPremiumFeatures(false)}
                        </div>
                    </div>
                </div>

                {/* CTA below cards */}
                <div className="mt-6 mb-8">
                    <Link href={pricingCtaUrl}>
                        <button className="bg-[#4779FB] text-white font-semibold text-[24px] md:text-[32px] px-32 py-3 rounded-full shadow-[0px_12px_0px_#2D59D1] hover:translate-y-1 hover:shadow-[0px_8px_0px_#2D59D1] transition-all duration-200 whitespace-nowrap">
                            {pricingCta}!
                        </button>
                    </Link>
                </div>
            </section>

            {/* ── TESTIMONIAL SECTION ── */}
            <section className="w-full py-28 flex flex-col items-center">
                <div className="w-3/4 mb-20">
                    <div className="w-full h-[1.5px] bg-[#E8F2FF]" />
                </div>

                <div className="w-[94%] lg:w-[90%] max-w-[1500px] mx-auto flex flex-col items-center text-center">
                    <div className="flex gap-2 mb-10 text-[#002954]">
                        {Array.from({ length: testimonialRating }).map((_, i) => (
                            <svg key={i} width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        ))}
                    </div>

                    <p className="text-[28px] md:text-[38px] lg:text-[42px] font-bold text-[#002954] leading-[1.3] mb-12">
                        &quot;{testimonialQuote}&quot;
                    </p>

                    <div className="flex flex-col items-center gap-1">
                        <span className="text-[24px] font-black text-[#002954]">{testimonialName}</span>
                        <span className="text-[16px] font-bold text-[#002954]/50">{testimonialRole}</span>
                    </div>

                    {/* Dots pagination */}
                    <div className="flex items-center gap-6 mt-16 text-[#002954]">
                        <button className="hover:opacity-60 transition-opacity">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                        </button>
                        <div className="flex gap-3">
                            <div className="w-3 h-3 rounded-full border-2 border-[#002954]/30" />
                            <div className="w-3 h-3 rounded-full border-2 border-[#002954]/30" />
                            <div className="w-3 h-3 rounded-full bg-[#012955]" />
                            <div className="w-3 h-3 rounded-full border-2 border-[#002954]/30" />
                            <div className="w-3 h-3 rounded-full border-2 border-[#002954]/30" />
                        </div>
                        <button className="hover:opacity-60 transition-opacity">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                        </button>
                    </div>
                </div>

                <div className="w-3/4 mt-20">
                    <div className="w-full h-[1.5px] bg-[#E8F2FF] font-bold" />
                </div>
            </section>
        </div>
    )
}

// ─── Fallback icon paths for pageTranslations features ───────────────────────
const FREE_ICON_PATHS = [
    '/premium/pricing/free/no_adult_content.svg',
    '/premium/pricing/free/network_intel_node.svg',
    '/premium/pricing/free/ad_off.svg',
    '/premium/pricing/free/favorite.svg',
    '/premium/pricing/free/tune.svg',
    '/premium/pricing/free/devices.svg',
    '/premium/pricing/free/money_off.svg',
]

// ─── PricingFeature component ─────────────────────────────────────────────────
function PricingFeature({ label, status, isCenter, iconPath }: { label: string; status: 'check' | 'dash'; isCenter?: boolean; iconPath?: string }) {
    const color = isCenter ? 'white' : '#153B62'
    const lower = label.toLowerCase()

    let Icon = null
    if (lower.includes('standard') || lower.includes('estándar') || lower.includes('मानक')) {
        Icon = (<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M7 15l2.5-3L7 9m2.5 3L12 9m-2.5 3l2.5 3" /><path d="M12 15l2.5-3L12 9m2.5 3l2.5-3m-2.5 3l2.5 3" /></svg>)
    } else if (lower.includes('ai') || lower.includes('ia')) {
        Icon = (<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M19.07 4.93l-1.41 1.41" /><circle cx="12" cy="12" r="4" /></svg>)
    } else if (lower.includes('ad') || lower.includes('anuncio') || lower.includes('publicité') || lower.includes('विज्ञापन')) {
        Icon = (<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="3" x2="21" y2="21" /></svg>)
    } else if (lower.includes('social') || lower.includes('réseaux')) {
        Icon = (<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>)
    } else if (lower.includes('redirect') || lower.includes('redireccion') || lower.includes('redirection') || lower.includes('रीडायरेक्ट')) {
        Icon = (<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" /></svg>)
    } else if (lower.includes('device') || lower.includes('dispositivo') || lower.includes('appareil') || lower.includes('डिवाइस')) {
        Icon = (<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>)
    } else {
        Icon = (<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 3l-6 6" /><path d="M21 8l-2-2" /><path d="M3 21l8-8" /><path d="M8 21l2-2" /></svg>)
    }

    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                    {iconPath ? (
                        <Image src={iconPath} alt={label} width={40} height={40} className={`object-contain ${isCenter ? 'brightness-0 invert' : ''}`} />
                    ) : Icon}
                </div>
                <span className="text-[26px] font-semibold">{label}</span>
            </div>
            <div className="flex-shrink-0">
                {status === 'check' ? (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                ) : (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /></svg>
                )}
            </div>
        </div>
    )
}
