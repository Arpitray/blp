// app/[lang]/page.tsx — Landing Page (SSR) with Sanity CMS + hardcoded fallbacks
// ⚡ SAFE: if no Sanity document exists yet, every section falls back to the
//    original hardcoded content. The page will NEVER be blank.
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CurveDivider } from '@/components/shared/CurveDivider'
import { TestimonialsSection } from '@/components/shared/TestimonialsSection'
import { buildLocaleAlternates, resolveLocale } from '@/lib/seo/metadata'
import { sanityClient } from '@/infrastructure/sanity/client'
import { HOMEPAGE_QUERY } from '@/infrastructure/sanity/queries'

// ─── Fallback data (original hardcoded content preserved here) ──────────────
const FALLBACK_STATS = [
    {
        iconUrl: '/landing/star_shine.svg',
        value: '4.4 Star',
        label: 'Average rating based on reviews',
    },
    {
        iconUrl: '/landing/download.svg',
        value: '1M+ Downloads',
        label: 'Across all platforms',
    },
    {
        iconUrl: '/landing/thumbs_up_double.svg',
        value: '20K+ Reviews',
        label: 'On google play store',
    },
]

const FALLBACK_TESTIMONIALS = [
    {
        quote: 'The best blocker app. Light on battery usage compared to competitors, and powerful enough to not only block adult content but also block politics and other \'toxic\' stuff by adding my own custom keywords.',
        authorName: 'Herdjati Pravito',
        authorRole: 'BlockP User',
        rating: 5,
    },
]

const FALLBACK_STOP_WATCHING_CARDS = [
    {
        title: 'Meditation',
        description: 'The art of meditation helps you to get away from your urges. You can listen to calming music or use a meditation app. BlockP also has a feature that reduces your urge when you feel like giving up. It also has a meditation mode which can help you concentrate and understand the main cause of your addiction.',
        imageUrl: '/landing/1.png',
    },
    {
        title: 'Physical activity',
        description: 'To tackle your addiction healthily, pick a sport you enjoy or hit the gym. This way you can stay physically fit and tackle your urges.',
        imageUrl: '/landing/2.png',
    },
    {
        title: 'Seek help from your close ones',
        description: 'Sometimes it is difficult to handle a problem alone and it is okay to seek help from your friends and family. Getting through it can be difficult, when you know you will get sudden urges that are hard to resist.',
        imageUrl: '/landing/3.png',
    },
    {
        title: 'Prioritize your values',
        description: 'Everyone has some values that they need to prioritize to live a moral and good life. By doing this, it will help to let go of things that aren\'t right for you. Start by understanding your values and aligning yourself with them. Gradually you will understand what is important to you and what is not.',
        imageUrl: '/landing/4.png',
    },
    {
        title: 'Consult a sexologist',
        description: 'They can help you understand the underlying cause of your addiction, it could be anything like relationship problems, emotional problems, family problems, etc.',
        imageUrl: '/landing/5.png',
    },
    {
        title: 'Install a porn blocker',
        description: 'Installing a porn blocker on your device would help control your sudden urges; BlockP is the best adult content blocker that will act as a barrier, driving you to act consciously.',
        imageUrl: '/landing/6.png',
    },
    {
        title: 'Join a support group',
        description: 'It can be difficult to face this alone, joining a support group of people going through the same thing will give you more confidence. Having a support network can offer new viewpoints and coping techniques, as well as a sense of understanding. To join this type of community we have BlockP Community. Join Now!',
        imageUrl: '/landing/7.png',
    },
    {
        title: 'Replace the habit',
        description: 'Redirect your energy into a healthy hobby or passion project that fills the gap – like reading, art, music, or learning a new skill. Creative pursuits fill your time, reduce boredom and uplift your mood.',
        imageUrl: '/landing/8.png',
    },
]

const FALLBACK_BENEFITS_CARDS = [
    {
        title: 'Mental Clarity',
        description: 'Quitting porn helps with clearing the brain fog induced by watching too much porn. You get more clarity in life and make better decisions. You regain focus and the ability to concentrate. Mental clarity helps in getting things done. Procrastination is no longer a hindrance to your success.',
        imageUrl: '/landing/1.png',
    },
    {
        title: 'Physical Fitness',
        description: 'Many people have reported that after they reduce the time spent on pornography, they start working out in their physical health, running and hit the weights with intention. You also feel the energy level increase in your body and motivated. You\'re put in the gym and get in better shape.',
        imageUrl: '/landing/2.png',
    },
    {
        title: 'Reduced Depression',
        description: 'Porn addiction is linked to depression and anxiety. Someone who watches porn regularly can build a tolerance towards pornography which ends up requiring extreme forms to stimulate them. Quitting porn may give you more time to do things you enjoy.',
        imageUrl: '/landing/3.png',
    },
    {
        title: 'Better sleep',
        description: 'Watching porn is a very arousing activity which causes feelings of emptiness, frustration and low self-esteem. Knowing what is right for you and with what purpose? Quitting will lead to focus on meaningful activities rather than ruining its means.',
        imageUrl: '/landing/4.png',
    },
    {
        title: 'Improved sense of purpose',
        description: 'Watching porn is a time consuming activity which leaves feelings of emptiness. Quitting porn leads to more focus on meaningful activities, hobbies and things in order.',
        imageUrl: '/landing/5.png',
    },
    {
        title: 'Improved Self Esteem',
        description: 'Continuous viewing of porn often leads to feelings of guilt and embarrassment. It makes a person feel like they are limited in some way. By quitting porn, some of the negative feelings go away completely and you regain confidence and self-esteem. Start feeling better about yourself.',
        imageUrl: '/landing/6.png',
    },
]

const FALLBACK_WHY_NEED_BLOCKER = {
    title: 'Why do you need a porn blocker?',
    paragraph1: '79% of accidental exposures to porn among kids take place on the internet at home! Most children do not go online looking for porn, but they stumble upon it when they click on malicious pop-ups, misleading articles, or unregulated ads.',
    paragraph2: 'BlockP provides instant porn protection by filtering the sites and apps to remove explicit content before it reaches your screen. Unlike standard filters, BlockP\'s AI-powered porn filters can detect pornography, nudity, and semi-nude content faster and more effectively. It provides you with greater protection against common bypass techniques and triggers. Custom blocking tools of BlockP let you curate a porn-free digital environment to keep your loved ones safe online.',
    imageUrl: '/landing/7.png',
}

const FALLBACK_TYPES_OF_BLOCKERS = [
    { title: 'Browser extensions', description: 'These are browser extensions directly embedded in web browsers like Chrome. They offer easy access and can block inappropriate content across various websites visited through the browser.', exampleText: 'For Example: Porn Blocker Chrome Extension' },
    { title: 'Device-Level Blockers', description: 'Program or setting installed directly on your computer, smartphone, or tablet. In addition to blocking access to inappropriate content, they also offer system-wide protection.', exampleText: 'For Example: Porn Blocker for Windows and Porn Blocker for MacBook' },
    { title: 'App-Based blockers', description: 'There are mobile applications for both Android and iOS devices that enhance online safety by providing robust filtering capabilities. For instance, an app like BlockP is available on both Android and iOS and can block specific websites, URLs, and apps, offering comprehensive features such as content filtering within browsers and restrictions on app access. They ensure users have a protected experience on their phones and tablets.', exampleText: 'For Example: Porn Blocker for Android and Porn Blocker for iOS' }
]

const FALLBACK_FAQ_ITEMS = [
    {
        question: 'Is BlockP free?',
        answer: 'Yes! BlockP offers a free tier with standard content blocking. Upgrade to Premium for AI-powered blocking, multi-device support, and advanced features.',
    },
    {
        question: 'What platforms does BlockP support?',
        answer: 'BlockP works on Android, iOS, macOS, Chrome, and Windows — covering virtually every device your family uses.',
    },
    {
        question: 'Can my child bypass BlockP?',
        answer: 'BlockP uses advanced tamper-protection technology that makes it extremely difficult to bypass. Premium users get additional uninstall protection.',
    },
    {
        question: 'How does the AI blocking work?',
        answer: 'Our AI analyzes images and text in real-time across all apps — not just browsers. It detects explicit content even on platforms like YouTube, Instagram, and Reddit.',
    },
    {
        question: 'Is my data private?',
        answer: 'Absolutely. BlockP never stores or transmits your browsing data. All filtering happens locally on your device. Read our privacy policy for details.',
    },
]

const FALLBACK_LOGOS = [
    { name: 'Google', logoUrl: '/landing/google.svg', localLogoPath: '/landing/google.svg' },
    { name: 'Meta', logoUrl: '/landing/meta.svg', localLogoPath: '/landing/meta.svg' },
    { name: 'Microsoft', logoUrl: '/landing/microsoft.svg', localLogoPath: '/landing/microsoft.svg' }
]

const FALLBACK_PLATFORMS = [
    { name: 'Android', iconUrl: '/premium/android.svg', localIconPath: '/premium/android.svg' },
    { name: 'iOS', iconUrl: '/premium/ios.svg', localIconPath: '/premium/ios.svg' },
    { name: 'macOS', iconUrl: '/premium/MacOS_logo.svg', localIconPath: '/premium/MacOS_logo.svg' },
    { name: 'Chrome', iconUrl: '/premium/chrome.svg', localIconPath: '/premium/chrome.svg' },
    { name: 'Windows', iconUrl: '/premium/windows.svg', localIconPath: '/premium/windows.svg' }
]

// ─── Types ───────────────────────────────────────────────────────────────────
interface HomepageData {
    hero?: { title?: string; subtitle?: string; ctaText?: string; ctaUrl?: string; heroImageUrl?: string; mascotImageUrl?: string }
    asSeenOn?: { sectionTitle?: string; logos?: { name: string; logoUrl?: string; localLogoPath?: string }[] }
    platforms?: { sectionTitle?: string; platformList?: { name: string; iconUrl?: string; localIconPath?: string; linkUrl?: string }[] }
    stats?: { sectionTitle?: string; statItems?: { iconUrl?: string; value: string; label: string }[] }
    testimonials?: { sectionTitle?: string; testimonialItems?: { quote: string; authorName: string; authorRole?: string; rating?: number }[] }
    stopWatching?: { sectionTitle?: string; cards?: { title: string; description: string; imageUrl?: string }[] }
    benefitsQuittingPorn?: { sectionTitle?: string; cards?: { title: string; description: string; imageUrl?: string }[] }
    whyNeedPornBlocker?: { title?: string; paragraph1?: string; paragraph2?: string; imageUrl?: string }
    typesOfPornBlockers?: { sectionTitle?: string; cards?: { title: string; description: string; exampleText?: string }[] }
    faq?: { sectionTitle?: string; faqItems?: { question: string; answer: string }[] }
    seo?: { metaTitle?: string; metaDescription?: string }
}

// ─── SEO ─────────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params
    const locale = resolveLocale(lang)
    const hp = await sanityClient.fetch<HomepageData | null>(HOMEPAGE_QUERY, { lang: locale })

    return {
        title: hp?.seo?.metaTitle ?? 'BlockP: #1 Free AI porn blocker to increase your productivity',
        description: hp?.seo?.metaDescription ??
            'Whether you want to block porn on your device or your child\'s, or even overcome a porn addiction online, BlockP is the #1 AI-Powered Porn Blocker, which is a free, reliable, and intuitive software program to steer clear of pornographic content on the Internet.',
        alternates: {
            canonical: `/${locale}`,
            languages: buildLocaleAlternates((supportedLocale) => `/${supportedLocale}`),
        },
    }
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function LandingPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params
    const locale = resolveLocale(lang)

    // 1️⃣ Fetch from Sanity
    const hp = await sanityClient.fetch<HomepageData | null>(HOMEPAGE_QUERY, { lang: locale })

    // 2️⃣ Derive data with fallbacks — page is NEVER blank
    const heroImage = hp?.hero?.heroImageUrl
    const mascotSrc = hp?.hero?.mascotImageUrl ?? '/landing/maskot.svg'
    const asSeenOnLogos = hp?.asSeenOn?.logos?.length ? hp.asSeenOn.logos : FALLBACK_LOGOS
    const platformList = hp?.platforms?.platformList?.length ? hp.platforms.platformList : FALLBACK_PLATFORMS
    const stats = hp?.stats?.statItems?.length ? hp.stats.statItems : FALLBACK_STATS
    const testimonials = hp?.testimonials?.testimonialItems?.length ? hp.testimonials.testimonialItems : FALLBACK_TESTIMONIALS
    const stopWatchingCards = hp?.stopWatching?.cards?.length ? hp.stopWatching.cards : FALLBACK_STOP_WATCHING_CARDS
    const benefitsCards = hp?.benefitsQuittingPorn?.cards?.length ? hp.benefitsQuittingPorn.cards : FALLBACK_BENEFITS_CARDS
    const whyNeedBlocker = hp?.whyNeedPornBlocker ?? FALLBACK_WHY_NEED_BLOCKER
    const typesOfBlockers = hp?.typesOfPornBlockers?.cards?.length ? hp.typesOfPornBlockers.cards : FALLBACK_TYPES_OF_BLOCKERS
    const faqItems = hp?.faq?.faqItems?.length ? hp.faq.faqItems : FALLBACK_FAQ_ITEMS

    return (
        <div className="w-full flex flex-col items-center bg-white min-h-screen overflow-x-hidden">
            {/* ══════════════════════════════════════════════════════
                HERO SECTION
            ══════════════════════════════════════════════════════ */}
            <section
                className="w-full relative flex flex-col items-center justify-start overflow-hidden bg-gradient-to-b from-[#1160FF] via-[#649DFF] to-[#87C1FF] min-h-[1300px] xl:min-h-[1700px]"
            >
                {/* Hero Content */}
                <div className="relative z-40 flex flex-col items-center pt-[220px] px-[12px] lg:px-[40px] w-full max-w-site">
                    <h1
                        className="text-[64px] font-extrabold text-white text-center leading-[1.2] mb-6 max-w-[995px]"
                        style={{ fontVariationSettings: "'wdth' 100", textShadow: '0px 4px 4px rgba(0, 118, 244, 0.25)' }}
                    >
                        {hp?.hero?.title ?? 'BlockP: #1 Free AI porn blocker \nto increase your productivity'}
                    </h1>

                    <p
                        className="text-[24px] font-medium text-white text-center leading-[1.2] mb-24 max-w-[947px]"
                        style={{ fontVariationSettings: "'wdth' 100", textShadow: '0px 4px 4px rgba(0, 118, 244, 0.25)' }}
                    >
                        {hp?.hero?.subtitle ?? "Whether you want to block porn on your device or your child's, or even overcome a porn addiction online, BlockP is the #1 AI-Powered Porn Blocker, which is a free, reliable, and intuitive software program to steer clear of pornographic content on the Internet."}
                    </p>

                    <Link href={`/${locale}${hp?.hero?.ctaUrl ?? '/premium'}`}>
                        <div className="relative">
                            <div className="absolute top-[9px] left-0 w-full h-full bg-[#004c9d] rounded-full" />
                            <button
                                className="relative bg-white text-[#002954] font-semibold text-[30px] px-[130px] py-[18px] rounded-full hover:translate-y-1 transition-all duration-200 whitespace-nowrap"
                                style={{ fontVariationSettings: "'wdth' 100" }}
                            >
                                {hp?.hero?.ctaText ?? 'Download Now'}
                            </button>
                        </div>
                    </Link>
                </div>

                {/* Hero Image */}
                {heroImage && (
                    <div className="absolute right-0 bottom-0 z-30 pointer-events-none hidden lg:block">
                        <img
                            src={heroImage}
                            alt="BlockP Hero"
                            className="w-[780px] max-w-[50vw] xl:max-w-[780px] h-auto object-cover object-bottom"
                        />
                    </div>
                )}

                {/* Mascot */}
                <div className="absolute bottom-[40px] md:bottom-[20px] left-1/2 -translate-x-1/2 z-10 pointer-events-none w-[90%] md:w-auto">
                    <img
                        src={mascotSrc}
                        alt="BlockP Mascot"
                        className="w-full md:w-[740px] max-w-full h-auto"
                    />
                </div>

                {/* Background Ellipse */}
                <div
                    className="absolute left-[-63px] top-[1194px] w-[1566px] h-[17400px] pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 70%)' }}
                />

                {/* White Curve Divider */}
                <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none">
                    <CurveDivider bottomColor="#ffffff" curveType="dome" className="h-[300px] md:h-[400px]" />
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                AS SEEN ON
            ══════════════════════════════════════════════════════ */}
            <section className="w-full pb-[70px] pt-0 flex flex-col items-center bg-white relative z-20">
                <div className="w-full max-w-site px-[12px] lg:px-[40px] flex flex-col gap-[70px] items-center -mt-[120px] md:-mt-[160px] relative z-30">
                    <h2
                        className="text-[48px] font-bold text-[#002954] text-center leading-[1.2]"
                        style={{ fontVariationSettings: "'wdth' 100", textShadow: '0px 0px 4px rgba(255, 255, 255, 0.35)' }}
                    >
                        {hp?.asSeenOn?.sectionTitle ?? 'As seen on'}
                    </h2>
                    <div className="flex flex-wrap items-center justify-center gap-[40px] md:gap-[70px]">
                        {asSeenOnLogos.map((logo, i) => (
                            <img key={i} src={logo.logoUrl ?? logo.localLogoPath ?? ''} alt={logo.name} className="h-[30px] md:h-[40px] lg:h-[55px] w-auto object-contain" />
                        ))}
                    </div>
                    <div className="w-full max-w-site h-[1px] bg-gray-200" />
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                STAY PROTECTED ON ALL PLATFORMS
            ══════════════════════════════════════════════════════ */}
            <section className="w-full pb-20 pt-0 flex flex-col items-center bg-white relative z-20">
                <div className="w-full max-w-site px-[12px] lg:px-[40px] flex flex-col items-center">
                    <h2
                        className="text-[48px] font-bold text-[#002954] text-center leading-[1.2] mb-24"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                        {hp?.platforms?.sectionTitle ?? 'Stay protected on all platforms'}
                    </h2>

                    <div className="flex flex-wrap justify-center gap-14 md:gap-32 lg:gap-40 px-6 mb-16">
                        {platformList.map((platform, i) => (
                            <div key={i} className="flex flex-col items-center gap-4">
                                <img src={platform.iconUrl ?? platform.localIconPath ?? ''} alt={platform.name} className="w-[75px] h-[75px] object-contain" />
                                <span className="text-[20px] font-bold text-[#002954]">{platform.name}</span>
                            </div>
                        ))}
                    </div>
                    <div className="w-full max-w-site h-[1px] bg-gray-200" />
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                STATS SECTION
            ══════════════════════════════════════════════════════ */}
            <section className="w-full py-[70px] flex flex-col items-center bg-white relative z-20">
                <div className="w-full max-w-site px-[12px] lg:px-[40px] flex flex-col gap-[70px] items-center">
                    <h2
                        className="text-[48px] font-bold text-[#002954] text-center leading-[1.2] max-w-[810px]"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                        {hp?.stats?.sectionTitle ?? 'Join the millions of users who trust us'}
                    </h2>
                    <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-[25px] w-full">
                        {stats.map((stat, i) => (
                            <div key={i} className="flex flex-col gap-[10px] items-center w-full max-w-[326px]">
                                <img src={stat.iconUrl} alt={stat.value} className="w-[135px] h-[135px] object-contain" />
                                <p
                                    className="text-[32px] font-bold text-[#002954] text-center leading-[1.44]"
                                    style={{ fontVariationSettings: "'wdth' 100", textShadow: '0px 0px 4px rgba(255, 255, 255, 0.35)' }}
                                >
                                    {stat.value}
                                </p>
                                <p
                                    className="text-[20px] font-medium text-[#002954] text-center"
                                    style={{ fontVariationSettings: "'wdth' 100" }}
                                >
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                TESTIMONIAL SECTION
            ══════════════════════════════════════════════════════ */}
            <TestimonialsSection
                sectionTitle={hp?.testimonials?.sectionTitle}
                testimonials={testimonials}
            />

            {/* ══════════════════════════════════════════════════════
                HOW CAN YOU STOP WATCHING PORN
            ══════════════════════════════════════════════════════ */}
            <section className="w-full py-[70px] flex flex-col items-center bg-gradient-to-b from-white to-[#F6FAFF] relative z-20">
                <div className="w-full max-w-site px-[12px] lg:px-[40px] flex flex-col gap-[70px] items-center">
                    <h2
                        className="text-[48px] font-bold text-[#002954] text-center leading-[1.2]"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                        {hp?.stopWatching?.sectionTitle ?? 'How can you stop watching porn?'}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[25px] w-full">
                        {stopWatchingCards.map((card, i) => (
                            <StopWatchingCard
                                key={i}
                                image={card.imageUrl ?? ''}
                                title={card.title}
                                description={card.description}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                BENEFITS YOU'LL ENJOY AFTER QUITTING PORN
            ══════════════════════════════════════════════════════ */}
            <section className="w-full py-[70px] flex flex-col items-center bg-[#F6FAFF] relative z-20">
                <div className="w-full max-w-site px-[12px] lg:px-[40px] flex flex-col gap-[70px] items-center">
                    <h2
                        className="text-[48px] font-bold text-[#002954] text-center leading-[1.2]"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                        {hp?.benefitsQuittingPorn?.sectionTitle ?? 'Benefits you\'ll enjoy after quitting porn'}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[25px] w-full">
                        {benefitsCards.map((card, i) => (
                            <StopWatchingCard
                                key={i}
                                image={card.imageUrl ?? ''}
                                title={card.title}
                                description={card.description}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                WHY DO YOU NEED A PORN BLOCKER
            ══════════════════════════════════════════════════════ */}
            <section className="w-full py-[70px] flex flex-col items-center bg-[#F6FAFF] relative z-20">
                <div className="w-full max-w-site px-[12px] lg:px-[40px]">
                    <div className="bg-white rounded-[25px] overflow-hidden shadow-[0px_4px_4px_0px_rgba(0,118,244,0.25)] flex flex-col lg:flex-row w-full">
                        <div className="w-full lg:w-[45%] min-h-[300px] lg:min-h-[500px] relative">
                            <img 
                                src={whyNeedBlocker.imageUrl ?? '/landing/7.png'} 
                                alt={whyNeedBlocker.title} 
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                        <div className="w-full lg:w-[55%] p-[40px] lg:p-[80px] xl:pl-[100px] flex flex-col justify-center">
                            <h2 
                                className="text-[40px] lg:text-[56px] font-extrabold text-[#002954] leading-[1.15] mb-8 max-w-[550px]"
                                style={{ fontVariationSettings: "'wdth' 100" }}
                            >
                                {whyNeedBlocker.title}
                            </h2>
                            <div className="flex flex-col gap-6 max-w-[750px]">
                                <p 
                                    className="text-[18px] lg:text-[22px] font-medium text-[#002954] leading-[1.4]"
                                    style={{ fontVariationSettings: "'wdth' 100" }}
                                >
                                    {whyNeedBlocker.paragraph1}
                                </p>
                                <p 
                                    className="text-[18px] lg:text-[22px] font-medium text-[#002954] leading-[1.4]"
                                    style={{ fontVariationSettings: "'wdth' 100" }}
                                >
                                    {whyNeedBlocker.paragraph2}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                TYPES OF PORN BLOCKERS
            ══════════════════════════════════════════════════════ */}
            <section className="w-full py-[70px] flex flex-col items-center bg-[#F6FAFF] relative z-20">
                <div className="w-full max-w-site px-[12px] lg:px-[40px] flex flex-col items-center gap-[60px]">
                    <h2
                        className="text-[40px] lg:text-[48px] font-bold text-[#002954] text-center leading-[1.2] max-w-[700px]"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                        {hp?.typesOfPornBlockers?.sectionTitle ?? 'Types of porn blockers to block adult content'}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[25px] w-full">
                        {typesOfBlockers.map((card, i) => {
                            const isLastAndOdd = i === typesOfBlockers.length - 1 && typesOfBlockers.length % 2 !== 0;
                            return (
                                <div 
                                    key={i} 
                                    className={`bg-white rounded-[25px] p-[40px] flex flex-col gap-6 shadow-[0px_4px_4px_0px_rgba(0,118,244,0.1)] ${isLastAndOdd ? 'md:col-span-2' : ''}`}
                                >
                                    <div className="flex items-center gap-4 mb-2">
                                        <img src="/landing/devices.svg" alt="Device icon" className="w-7 h-7 shrink-0" />
                                        <h3 className="text-[28px] font-bold text-[#002954] m-0" style={{ fontVariationSettings: "'wdth' 100" }}>
                                            {card.title}
                                        </h3>
                                    </div>
                                    <p className="text-[18px] font-medium text-[#002954] leading-relaxed mb-auto" style={{ fontVariationSettings: "'wdth' 100" }}>
                                        {card.description}
                                    </p>
                                    <p className="text-[16px] text-[#002954] leading-relaxed mt-4">
                                        {card.exampleText}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                FAQ SECTION
            ══════════════════════════════════════════════════════ */}
            <section className="w-full py-16 md:py-24 flex flex-col items-center bg-[#F6FAFF] relative z-20">
                <div className="w-full max-w-site px-[12px] lg:px-[40px]">
                    <h2
                        className="text-[36px] md:text-[52px] lg:text-[64px] font-bold text-[#012955] text-center leading-[1.1] mb-16"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                        {hp?.faq?.sectionTitle ?? 'Have More Questions?'}
                    </h2>

                    <div className="max-w-3xl mx-auto flex flex-col gap-4">
                        {faqItems.map((item, i) => (
                            <FaqItem key={i} question={item.question} answer={item.answer} />
                        ))}
                    </div>
                </div>
            </section>


        </div>
    )
}

/* ─────────────────────────────────────────────────────────────────
   SUB-COMPONENTS (co-located)
   ───────────────────────────────────────────────────────────────── */

function StopWatchingCard({ image, title, description }: { image: string; title: string; description: string }) {
    return (
        <div className="bg-gradient-to-b from-[#F6FAFF] to-[#F6FAFF] rounded-[25px] overflow-hidden shadow-[0px_4px_4px_0px_rgba(0,118,244,0.25)] min-h-[500px] h-full flex flex-col">
            <div className="relative h-[264px] shrink-0 overflow-hidden">
                <div className="absolute inset-0 backdrop-blur-[50px]">
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                </div>
            </div>
            <div className="flex flex-col gap-[15px] p-[25px] flex-1">
                <h3 className="text-[32px] font-bold text-[#002954] leading-[1.44]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {title}
                </h3>
                <p className="text-[20px] font-medium text-[#002954]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {description}
                </p>
            </div>
        </div>
    )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
    return (
        <details className="group bg-white rounded-[20px] shadow-card overflow-hidden">
            <summary className="flex items-center justify-between cursor-pointer px-8 py-6 text-[18px] md:text-[22px] font-bold text-[#012955] hover:bg-[#F0F6FF] transition-colors duration-200 list-none">
                <span>{question}</span>
                <svg className="w-6 h-6 text-brand-accent shrink-0 ml-4 transition-transform duration-300 group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </summary>
            <div className="px-8 pb-6 text-[16px] md:text-[18px] text-[#012955]/70 font-medium leading-[1.7]">
                {answer}
            </div>
        </details>
    )
}
