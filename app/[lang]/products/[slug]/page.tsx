import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { sanityClient } from '@/lib/sanity/client'
import { PRODUCT_BY_SLUG_QUERY, ALL_PRODUCT_SLUGS_QUERY } from '@/lib/sanity/queries'
import { CurveDivider } from '@/components/shared/CurveDivider'
import { buildLocaleAlternates, resolveLocale } from '@/lib/seo/metadata'
import { PremiumCta } from '@/components/shared/PremiumCta'
import { PlatformList } from '@/components/shared/PlatformList'

interface ProductFeature {
    title: string
    description: string
    layout: 'imageLeft' | 'imageRight'
    imageUrl?: string
}

interface ProductPageData {
    name: string
    slug: string
    heroTitle: string
    storeBadgeUrl?: string
    storeUrl?: string
    heroImageUrl?: string
    features?: ProductFeature[]
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
    const { lang, slug } = await params
    const locale = resolveLocale(lang)

    const product: ProductPageData | null = await sanityClient.fetch(PRODUCT_BY_SLUG_QUERY, { slug })
    if (!product) return { title: 'Product Not Found' }

    return {
        title: product.name,
        description: `Download BlockP for ${product.name}`,
        alternates: {
            canonical: `/${locale}/products/${slug}`,
            languages: buildLocaleAlternates((supportedLocale) => `/${supportedLocale}/products/${slug}`),
        },
    }
}

const HARDCODED_SLUGS = new Set(['android', 'ios', 'chrome', 'macos', 'microsoft', 'windows'])

export async function generateStaticParams() {
    const slugs: { slug: string }[] = await sanityClient.fetch(ALL_PRODUCT_SLUGS_QUERY)
    const { supportedLocales } = await import('@/lib/i18n')

    return supportedLocales.flatMap((lang) =>
        slugs
            .filter((s) => !HARDCODED_SLUGS.has(s.slug.toLowerCase()))
            .map((s) => ({
                lang,
                slug: s.slug
            }))
    )
}

export default async function ProductPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
    const { lang, slug } = await params
    const locale = resolveLocale(lang)

    // Fallback protection: if a hardcoded slug somehow reaches here, return 404 so it doesn't mask the real page
    if (HARDCODED_SLUGS.has(slug.toLowerCase())) {
        notFound()
    }

    const product: ProductPageData | null = await sanityClient.fetch(PRODUCT_BY_SLUG_QUERY, { slug })

    if (!product) {
        notFound()
    }

    return (
        <div className="w-full flex flex-col items-center bg-[#F6FAFF] min-h-screen">
            {/* ── Hero Section ── */}
            <div
                className="w-full relative flex flex-col items-center overflow-hidden min-h-[clamp(440px,50vh,600px)] md:min-h-[clamp(500px,64vh,800px)]"
                style={{
                    background: "linear-gradient(to bottom, #1160FF 0%, #649DFF 48%, #87C1FF 100%)",
                }}
            >
                <div className="relative z-10 flex flex-col items-center pt-[50px] md:pt-[80px] px-6 w-full max-w-5xl">
                    <h1
                        className="text-[40px] md:text-[64px] lg:text-[72px] font-bold text-white text-center leading-[1.1] mb-8 whitespace-pre-wrap"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                        {product.heroTitle}
                    </h1>

                    {product.storeBadgeUrl && (
                        <a
                            href={product.storeUrl || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-90 transition-opacity mb-10"
                        >
                            <img
                                src={product.storeBadgeUrl}
                                alt={`Download on ${product.name}`}
                                className="h-[60px] md:h-[70px] w-auto drop-shadow-md rounded-xl"
                            />
                        </a>
                    )}

                    {product.heroImageUrl && (
                        <div className="mt-4 md:mt-8 px-4 flex justify-center w-full relative -bottom-20 z-30">
                            <img
                                src={product.heroImageUrl}
                                alt={`${product.name} dashboard`}
                                className="w-full max-w-[800px] h-auto object-contain drop-shadow-2xl translate-y-12"
                            />
                        </div>
                    )}
                </div>

                {/* White Dome Overlay */}
                <div className="absolute bottom-0 left-0 w-full z-20">
                    <CurveDivider bottomColor="#F6FAFF" curveType="dome" />
                </div>
            </div>

            {/* ── Features Section ── */}
            <div className="w-full flex-1 flex flex-col items-center py-24 md:py-32 px-6 gap-24 md:gap-32 mt-[15vh]">
                {product.features?.map((feature, index) => {
                    const isImageLeft = feature.layout === 'imageLeft'
                    return (
                        <div
                            key={index}
                            className={`w-full max-w-[1200px] flex flex-col ${isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between gap-12 md:gap-24`}
                        >
                            {/* Image Side */}
                            <div className="flex-1 w-full flex justify-center">
                                {feature.imageUrl ? (
                                    <img
                                        src={feature.imageUrl}
                                        alt={feature.title}
                                        className="w-full max-w-[400px] md:max-w-[500px] h-auto drop-shadow-xl rounded-2xl"
                                    />
                                ) : (
                                    <div className="w-full max-w-[400px] aspect-square bg-[#e0efff] rounded-2xl flex items-center justify-center opacity-50">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                                            <rect x="3" y="3" width="18" height="18" rx="4" stroke="#1160FF" strokeWidth="1.5" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Text Side */}
                            <div className="flex-1 w-full flex flex-col text-left">
                                <h3
                                    className="text-[32px] md:text-[44px] font-bold text-[#002954] leading-[1.2] mb-6"
                                    style={{ fontVariationSettings: "'wdth' 100" }}
                                >
                                    {feature.title}
                                </h3>
                                <p className="text-[18px] md:text-[20px] text-[#002954]/80 font-medium leading-[1.5]">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* ── Bottom Platform Banner ── */}
            <div className="relative w-full pt-[75px] pb-[100px] flex flex-col items-center z-10">
                <h2 className="text-[32px] md:text-[45px] lg:text-[50px] font-black text-[#002954] mb-12 text-center tracking-tight px-6 mt-10" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Stay protected on all platforms
                </h2>
                <PlatformList variant="banner" locale={locale} />
            </div>
            {/*/ ── Premium CTA Section ── */}
            <PremiumCta buttonHref="/pricing" title={`Upgrade to BlockP Premium for ${product.name}`} subHeadline="Unlock advanced features, priority support, and enhanced protection across all your devices." />
        </div>
    )
}