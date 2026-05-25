import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CurveDivider } from '@/components/shared/CurveDivider'
import { PremiumMascot } from '@/components/shared/PremiumMascot'
import { buildLocaleAlternates, resolveLocale } from '@/lib/seo/metadata'
import { PlatformList } from '@/components/shared/PlatformList'
import { WebsiteFeaturesSection } from '@/components/shared/WebsiteFeaturesSection'
import { sanityClient } from '@/infrastructure/sanity/client'
import { PRODUCT_BY_SLUG_QUERY } from '@/infrastructure/sanity/queries'
import { MicrosoftScrollUI } from '@/components/shared/MicrosoftScrollUI'
import { MicrosoftWhySection } from '@/components/shared/MicrosoftWhySection'
import { MicrosoftBestBlockerSection } from '@/components/shared/MicrosoftBestBlockerSection'
import { MicrosoftBenefitsSection } from '@/components/shared/MicrosoftBenefitsSection'
import { MicrosoftFaqsSection } from '@/components/shared/MicrosoftFaqsSection'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params
    const locale = resolveLocale(lang)

    return {
        title: 'BlockP for Windows - Porn Blocker & Content Filter',
        description: 'Download BlockP for Windows. AI-powered porn blocking, accountability features, and streak tracking to help you stay focused.',
        alternates: {
            canonical: `/${locale}/products/microsoft`,
            languages: buildLocaleAlternates((supportedLocale) => `/${supportedLocale}/products/microsoft`),
        },
    }
}

export default async function MicrosoftProductPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params
    const locale = resolveLocale(lang)

    // Fetch data from Sanity, gracefully fallback to hardcoded if null
    const product = await sanityClient.fetch<any>(PRODUCT_BY_SLUG_QUERY, { slug: 'microsoft', lang: locale })

    const rawHeroTitle = product?.heroTitle || ""
    let heroTitle1 = "BlockP"
    let heroTitle2 = "for Windows."
    if (rawHeroTitle) {
        if (rawHeroTitle.includes('\n')) {
            const parts = rawHeroTitle.split('\n')
            heroTitle1 = parts[0]
            heroTitle2 = parts[1] || ""
        } else if (rawHeroTitle.toLowerCase().startsWith("blockp ")) {
            heroTitle1 = rawHeroTitle.substring(0, 6)
            heroTitle2 = rawHeroTitle.substring(6).trim()
        } else {
            const firstSpace = rawHeroTitle.indexOf(' ')
            if (firstSpace !== -1) {
                heroTitle1 = rawHeroTitle.substring(0, firstSpace)
                heroTitle2 = rawHeroTitle.substring(firstSpace + 1)
            } else {
                heroTitle1 = rawHeroTitle
                heroTitle2 = ""
            }
        }
    }
    const platformsBannerTitle = product?.platformsBannerTitle || "Stay protected on all platforms"
    
    const premiumTitle = product?.premiumSection?.title?.split('\n') || ["BlockP", "Premium."]
    const premiumSubtitle = product?.premiumSection?.subtitle || "Stronger protection, full control, and priority support, so nothing stands in your way."
    const premiumCtaText = product?.premiumSection?.ctaText || "Start your free trial!"
    const premiumCtaUrl = product?.premiumSection?.ctaUrl || `/${locale}/get-started`

    return (
        <div className="w-full flex flex-col items-center bg-[#F6FAFF] min-h-screen overflow-x-clip">
            {/* ── Hero Section ── */}
            <div
                className="w-full relative flex flex-col items-center justify-start min-h-[clamp(600px,140vh,950px)] overflow-hidden"
                style={{
                    background: "linear-gradient(to bottom, #1160FF 0%, #649DFF 48%, #87C1FF 100%)",
                }}
            >
                {/* Back / Breadcrumb Button */}
                <div className="absolute top-[120px] md:top-[145px] left-0 w-full flex justify-center z-50 pointer-events-none">
                    <div className="w-full max-w-site px-[12px] lg:px-[40px] flex justify-start pointer-events-auto">
                    <Link
                        href={`/${locale}`}
                        className="flex items-center text-white/80 hover:text-white transition-colors text-[18px] md:text-[22px] font-bold"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mr-3">
                            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Home / Products / Windows
                    </Link>
                    </div>
                </div>

                {/* Hero Content */}
                <div className="relative z-40 flex flex-col items-center pt-[140px] md:pt-[180px] px-[12px] lg:px-[40px] w-full max-w-site">
                    <h1
                        className="text-[58px] md:text-[76px] lg:text-[95px] font-bold text-white text-center leading-[1.05] mb-8 md:mb-10"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                        {heroTitle1}
                        {heroTitle2 && (
                            <>
                                <br />
                                {heroTitle2}
                            </>
                        )}
                    </h1>
                </div>

                {/* Main Graphic - Shifted Higher and LEFT */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center z-10 px-6 md:-translate-x-[calc(50%+80px)] lg:-translate-x-[calc(50%+160px)] mb-[-50px] md:mb-[-80px] lg:mb-[-100px]">
                    <div className="w-[580px] md:w-[640px] lg:w-[980px] h-auto">
                        <img
                            src={product?.heroImageUrl || "/product/windows/windows.svg"}
                            alt="BlockP for Windows"
                            className="w-full h-auto drop-shadow-2xl"
                        />
                    </div>
                </div>

                {/* White Wave Divider - Inverted (Dip) */}
                <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none">
                    <CurveDivider bottomColor="#F6FAFF" curveType="dip" className="h-[120px] md:h-[160px]" />
                </div>
            </div>

            {/* ── Features Section ── */}
            <div className="w-full flex-1 bg-[#F6FAFF] relative z-20">
                <WebsiteFeaturesSection data={product?.websiteFeatures} />
            </div>

            {/* ── Bottom Platform Banner ── */}
            <div className="relative w-full pt-[75px] pb-[200px] flex flex-col items-center z-10">
                <h2
                    className="text-[32px] md:text-[45px] lg:text-[50px] font-black text-[#012955] mb-12 text-center tracking-tight px-6 mt-10"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                >
                    {platformsBannerTitle}
                </h2>
                <PlatformList variant="banner" locale={locale} />
            </div>

            {/* ── Premium CTA Section ── */}
            <section
                className="relative w-full overflow-hidden z-20"
                style={{
                    background: "linear-gradient(180deg, #6292FF 0%, #3572FF 100%)",
                }}
            >
                <div className="w-full max-w-[1898px] px-6 lg:px-16 mx-auto flex flex-col md:flex-row items-center justify-between pt-24 pb-24 md:py-40 relative z-10" style={{ minHeight: "750px" }}>

                    {/* Left Side: Text */}
                    <div className="flex-1 md:max-w-[50%] w-full flex flex-col items-center text-center md:pr-6 lg:pr-10 md:translate-x-[70px]">
                        <h2
                            className="text-[72px] md:text-[100px] lg:text-[120px] font-black text-white leading-[1.0] mb-6 whitespace-pre-wrap"
                            style={{ fontVariationSettings: "'wdth' 100" }}
                        >
                            {premiumTitle.join('\n')}
                        </h2>
                        <p className="text-[24px] md:text-[32px] text-white/80 font-medium leading-[1.6] mb-12 max-w-xl">
                            {premiumSubtitle}
                        </p>
                        <Link href={premiumCtaUrl}>
                            <button
                                className="bg-white text-[#012955] font-semibold text-[24px] md:text-[32px] px-16 md:px-24 py-3 md:py-4 rounded-full shadow-[0px_10px_0px_#1A3B7A] md:shadow-[0px_12px_0px_#1A3B7A] hover:translate-y-1 hover:shadow-[0px_8px_0px_#1A3B7A] transition-all duration-200 whitespace-nowrap"
                            >
                                {premiumCtaText}
                            </button>
                        </Link>
                    </div>

                    {/* Right Side: Image */}
                    <div className="flex-1 w-full md:absolute md:right-0 md:bottom-0 md:w-1/2 flex justify-center md:justify-end mt-12 md:mt-0 md:-mr-6 lg:-mr-8 md:-translate-x-[160px] md:translate-y-[290px] lg:translate-y-[380px]">
                        <PremiumMascot className="w-full max-w-[460px] md:max-w-[660px] lg:max-w-[700px] aspect-square" />
                    </div>
                </div>
            </section>

            {/* ── Scroll Triggered UI Section ── */}
            <MicrosoftScrollUI data={product?.scrollSteps?.steps} />

            {/* ── Why do you need a porn blocker Section ── */}
            <MicrosoftWhySection data={product?.whySection} />

            {/* ── Why BlockP Is The Best Porn Blocker App Section ── */}
            <MicrosoftBestBlockerSection data={product?.bestBlockerSection} />

            {/* ── Benefits of using a porn blocker Section ── */}
            <MicrosoftBenefitsSection data={product?.benefitsSection} />

            {/* ── FAQs Section ── */}
            <MicrosoftFaqsSection data={product?.faqsSection} />
        </div>
    )
}

