'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PremiumMascot } from '@/components/shared/PremiumMascot'

// ── Types ─────────────────────────────────────────────────────────────────────
export interface BlueLandingSlide {
    title: string
    subtext?: string
    imagePath: string
}

export interface BlueLandingFeatureCard {
    title: string
    description: string
    iconPath?: string
}

export interface BlueLandingBenefitCard {
    title: string
    description: string
    iconPath?: string
}

export interface BlueLandingSectionProps {
    // Section 1 — Our free porn blocker
    section1Heading?: string
    section1Paragraph1?: string
    section1Paragraph2?: string
    section1Paragraph3?: string
    section1CtaText?: string
    section1CtaUrl?: string

    // Section 2 — Why is BlockP the best
    section2Heading?: string
    featureCards?: BlueLandingFeatureCard[]

    // Section 3 — Scroll slides
    scrollSlides?: BlueLandingSlide[]

    // Section 4 — How does BlockP Work
    howItWorksHeading?: string
    howItWorksParagraph1?: string
    howItWorksParagraph2?: string
    howItWorksParagraph3?: string

    // Section 5 — Our adult content blocker can
    adultBlockerHeading?: string
    adultBlockerBullets?: string[]

    // Section 6 — Premium CTA
    premiumCtaHeading?: string
    premiumCtaSubtext?: string
    premiumCtaButtonText?: string
    premiumCtaButtonUrl?: string
}

// ── Fallback defaults (mirrors the original hardcoded content) ────────────────
const DEFAULT_SECTION1_HEADING = 'Our free\nporn blocker'
const DEFAULT_SECTION1_P1 = 'With BlockP you can now easily block access to several websites and applications. It encourages a healthier lifestyle by minimizing exposure to explicit content and enabling controlled online activity.'
const DEFAULT_SECTION1_P2 = 'Take advantage of all the unique features like Password Protection, Prevent Uninstall, Focus Mode, Whitelist, BlockP VPN, and many more.'
const DEFAULT_SECTION1_P3 = 'Moreover, BlockP is available as a browser extension for Chrome and as an app for both Android and iOS. Download BlockP now, to get rid of pornography, making it easier to resist cravings and practice healthier digital habits.'
const DEFAULT_SECTION1_CTA_TEXT = 'Get started'
const DEFAULT_SECTION1_CTA_URL = '/premium'

const DEFAULT_SECTION2_HEADING = 'Why is BlockP\nthe best adult\ncontent blocker?'
const DEFAULT_FEATURE_CARDS: BlueLandingFeatureCard[] = [
    { title: 'Uninstall prevention', description: "Prevents the app from being uninstalled. Can't delete it during urges, so you can't escape your commitment to quit porn.", iconPath: '/landing/blue/blocker/delete_forever.png' },
    { title: 'Multi-platform availability', description: 'Available as a Chrome extension and as an app for Android and iOS, ensuring protection across all your devices.', iconPath: '/landing/blue/blocker/devices.png' },
    { title: 'Accountability partner', description: 'Your chosen accountability partner gets the password to change BlockP settings. This keeps you from disabling the blocker during urges.', iconPath: '/landing/blue/blocker/handshake.png' },
    { title: 'Password protection', description: 'Password-protected, only authorized users can modify the settings.', iconPath: '/landing/blue/blocker/encrypted.png' },
    { title: 'Community support', description: 'Support groups and communities to help users stay motivated.', iconPath: '/landing/blue/blocker/diversity_2.png' },
    { title: 'Customizable filtering', description: "Offers filtering options, allowing users to block the exact websites, keywords, and content they don't want to see.", iconPath: '/landing/blue/blocker/tune.png' },
]

const DEFAULT_SCROLL_SLIDES: BlueLandingSlide[] = [
    { title: 'More BlockP\nfeatures\nFor a safer\nexperience', subtext: '', imagePath: '/landing/landing page mockups/landing page mockups/1.png' },
    { title: 'AI-powered\nblocking', subtext: "BlockP uses advanced AI to scan web pages and filter explicit content in real time.\n\nThe AI-powered blocking goes beyond keywords and blacklists. It analyzes the text, images, and video on the website and Apps to detect explicit content. \n\nBlockP's AI works in real-time to accurately block even newly created or disguised content to prevent accidental exposure to nudity and explicit content.", imagePath: '/landing/landing page mockups/landing page mockups/2.png' },
    { title: 'App\nblocking', subtext: 'BlockP can detect and block adult content within your Apps. It can monitor and restrict access to adult material across your browser, messaging apps, or video-sharing platforms.', imagePath: '/landing/landing page mockups/landing page mockups/3.png' },
    { title: 'Advanced\nblocking', subtext: "BlockP's advanced blocking features are designed to detect and prevent any efforts to bypass its restrictions.\n\nEven when you are using VPNs or incognito mode, BlockP hides inappropriate thumbnails, images, and video previews before they load. \n\nIt uses SafeSearch settings on popular search engines to filter explicit search results.", imagePath: '/landing/landing page mockups/landing page mockups/4.png' },
    { title: 'Social Media\nBlocking', subtext: "BlockP's robust controls help to restrict access to specific features on popular social media platforms such as Instagram, Facebook, YouTube, Reddit, and Telegram. \n\nSo, even if social media moderators fail to detect explicit content in comments or through hashtags, BlockP will protect you.\n\nIt also lets you disable the search functionality and block access to distracting content like Instagram reels or YouTube shorts.", imagePath: '/landing/landing page mockups/landing page mockups/5.png' },
]

const DEFAULT_HOW_IT_WORKS_HEADING = 'How does\nBlockP Work?'
const DEFAULT_HOW_IT_WORKS_P1 = 'BlockP is the most effective app to filter adult content from your device and offers effective porn protection.'
const DEFAULT_HOW_IT_WORKS_P2 = 'You can control exposure to adult content and online pornography with our filtering technology, website and app blocker tool.'
const DEFAULT_HOW_IT_WORKS_P3 = "BlockP utilizes advanced technology to analyze a website's content in real-time. Websites are constantly evolving, with new user-generated pages being added every day. This changing nature of the internet requires a porn filter that can analyze content and block porn."

const DEFAULT_ADULT_BLOCKER_HEADING = 'Our adult content blocker can:'
const DEFAULT_ADULT_BLOCKER_BULLETS = [
    'Keeps you away from porn or mature websites.',
    'Filter pornography in real-time with AI.',
    'Whitelist feature that gives you control over the control that can be accessed.',
    'Block distracting apps like Instagram, YouTube, Facebook, WhatsApp etc.',
    'Block custom websites not just restricted to adult content but also gambling, drugs, and any other site you want to stay away from.',
    'Block custom keywords like "porn", "sex", or anything triggering, BlockP lets you filter out specific keywords across browsers and apps, giving you full control to avoid tempting or harmful content.',
]

const DEFAULT_PREMIUM_CTA_HEADING = 'BlockP Premium.'
const DEFAULT_PREMIUM_CTA_SUBTEXT = 'Stronger protection, full control, and priority support, so nothing stands in your way.'
const DEFAULT_PREMIUM_CTA_BTN_TEXT = 'Start your free trial'
const DEFAULT_PREMIUM_CTA_BTN_URL = '/premium'

// ── Component ─────────────────────────────────────────────────────────────────
export const BlueLandingSection = ({
    section1Heading = DEFAULT_SECTION1_HEADING,
    section1Paragraph1 = DEFAULT_SECTION1_P1,
    section1Paragraph2 = DEFAULT_SECTION1_P2,
    section1Paragraph3 = DEFAULT_SECTION1_P3,
    section1CtaText = DEFAULT_SECTION1_CTA_TEXT,
    section1CtaUrl = DEFAULT_SECTION1_CTA_URL,
    section2Heading = DEFAULT_SECTION2_HEADING,
    featureCards = DEFAULT_FEATURE_CARDS,
    scrollSlides = DEFAULT_SCROLL_SLIDES,
    howItWorksHeading = DEFAULT_HOW_IT_WORKS_HEADING,
    howItWorksParagraph1 = DEFAULT_HOW_IT_WORKS_P1,
    howItWorksParagraph2 = DEFAULT_HOW_IT_WORKS_P2,
    howItWorksParagraph3 = DEFAULT_HOW_IT_WORKS_P3,
    adultBlockerHeading = DEFAULT_ADULT_BLOCKER_HEADING,
    adultBlockerBullets = DEFAULT_ADULT_BLOCKER_BULLETS,
    premiumCtaHeading = DEFAULT_PREMIUM_CTA_HEADING,
    premiumCtaSubtext = DEFAULT_PREMIUM_CTA_SUBTEXT,
    premiumCtaButtonText = DEFAULT_PREMIUM_CTA_BTN_TEXT,
    premiumCtaButtonUrl = DEFAULT_PREMIUM_CTA_BTN_URL,
}: BlueLandingSectionProps) => {
    const [activeScrollIdx, setActiveScrollIdx] = useState(0)

    const trackersRef = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = Number(entry.target.getAttribute('data-index'))
                        setActiveScrollIdx(idx)
                    }
                })
            },
            {
                rootMargin: "-50% 0px -50% 0px"
            }
        )

        trackersRef.current.forEach((ref) => {
            if (ref) observer.observe(ref)
        })

        return () => observer.disconnect()
    }, [])

    return (
        <div className="w-full bg-[#5693FE] text-white overflow-clip font-sans">
            {/* ── Section 1: Our free porn blocker ── */}
            <div className="w-full flex flex-col-reverse lg:flex-row items-center pt-20">
                {/* Text Side */}
                <div className="w-full lg:w-[65%] flex flex-col items-start gap-8 pl-6 md:pl-10 lg:pl-16 xl:pl-24 pr-6 lg:pr-10">
                    <h2 className="text-[36px] sm:text-[56px] md:text-[72px] lg:text-[96px] font-bold leading-[1.05] whitespace-pre-line" style={{ fontVariationSettings: "'wdth' 100" }}>
                        {section1Heading}
                    </h2>
                    <div className="flex flex-col gap-6 w-full max-w-[900px]">
                        <p className="text-[16px] md:text-[20px] leading-[1.6] font-normal opacity-90">{section1Paragraph1}</p>
                        <p className="text-[16px] md:text-[20px] leading-[1.6] font-normal opacity-90">{section1Paragraph2}</p>
                        <p className="text-[16px] md:text-[20px] leading-[1.6] font-normal opacity-90">{section1Paragraph3}</p>
                    </div>
                    <Link href={section1CtaUrl}>
                        <button className="mt-2 bg-white text-[#012955] font-semibold text-[20px] lg:text-[24px] px-8 sm:px-16 md:px-24 lg:px-32 py-2 lg:py-3 rounded-full shadow-[0px_8px_0px_#1A3B7A] lg:shadow-[0px_10px_0px_#1A3B7A] hover:translate-y-1 hover:shadow-[0px_6px_0px_#1A3B7A] transition-all duration-200 whitespace-nowrap">
                            {section1CtaText}
                        </button>
                    </Link>
                </div>

                {/* Image Side */}
                <div className="w-full lg:w-[35%] flex justify-end relative h-[250px] sm:h-[400px] md:h-[500px] lg:h-[700px] xl:h-[800px]">
                    <div className="relative w-full h-full">
                        <Image src="/landing/blue/maskot1.png" alt="Free porn blocker mascot" fill className="object-contain object-center lg:object-right" priority />
                    </div>
                </div>
            </div>

            {/* ── Section 2 Header: Why is BlockP the best ── */}
            <div className="w-full relative pt-32 overflow-visible">
                {/* Mascot */}
                <div className="absolute -left-[3px] sm:-left-[5px] md:-left-[7px] lg:-left-[8px] xl:-left-[10px] top-1/2 -translate-y-1/2 w-[200px] sm:w-[290px] md:w-[400px] lg:w-[520px] xl:w-[650px] aspect-square pointer-events-none z-10">
                    <Image src="/landing/blue/maskot2.png" alt="Why is BlockP the best mascot" fill className="object-contain object-left" />
                </div>
                {/* Title */}
                <div className="w-[94%] lg:w-[90%] max-w-[1500px] mx-auto flex justify-end relative z-20">
                    <h2 className="text-[32px] sm:text-[48px] md:text-[64px] lg:text-[80px] xl:text-[96px] font-bold leading-[1.05] text-left max-w-[95%] md:max-w-[70%] lg:max-w-[65%] whitespace-pre-line" style={{ fontVariationSettings: "'wdth' 100" }}>
                        {section2Heading}
                    </h2>
                </div>
            </div>

            {/* ── Feature Cards Grid ── */}
            <div className="w-[94%] lg:w-[90%] max-w-[1500px] mx-auto pt-12 pb-0 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[25px] w-full mt-6">
                    {featureCards.map((feature, i) => (
                        <div key={i} className="bg-white rounded-[25px] p-8 md:p-10 flex flex-col gap-4 shadow-[0_10px_20px_rgba(26,59,122,0.25)]">
                            <div className="flex items-center gap-4">
                                {feature.iconPath && (
                                    <Image
                                        src={feature.iconPath}
                                        alt={`${feature.title} icon`}
                                        width={32}
                                        height={32}
                                        className="w-8 h-8 object-contain shrink-0"
                                    />
                                )}
                                <h3 className="font-black text-[#012955] text-[22px] md:text-[26px] lg:text-[32px] leading-tight">{feature.title}</h3>
                            </div>
                            <p className="text-[#3B547C] text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed font-medium mt-1">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Section 3: Scroll Slides ── */}
            <div className="w-full relative mt-32 mb-10">
                {/* Desktop Layout */}
                <div
                    className="hidden md:flex flex-row w-full max-w-[1500px] px-[12px] lg:px-[40px] mx-auto relative gap-8 md:gap-16 lg:gap-20"
                    style={{ height: `${scrollSlides.length * 100}vh` }}
                >
                    {/* Invisible Trackers */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                        {scrollSlides.map((_, idx) => (
                            <div
                                key={`tracker-${idx}`}
                                className="absolute w-full h-screen"
                                style={{ top: `${idx * 100}vh` }}
                                data-index={idx}
                                ref={el => { trackersRef.current[idx] = el; }}
                            />
                        ))}
                    </div>

                    {/* Left: Sticky Text */}
                    <div className="flex-[1.25] w-full relative z-10">
                        <div className="sticky top-0 h-screen w-full flex flex-col justify-center">
                            {scrollSlides.map((slide, idx) => (
                                <div
                                    key={`text-${idx}`}
                                    className={`absolute inset-0 flex flex-col justify-center text-left md:pr-6 lg:pr-10 xl:pr-16 md:translate-x-12 md:translate-y-20 transition-all duration-700 ease-in-out ${
                                        idx === activeScrollIdx ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-4'
                                    }`}
                                >
                                    <h2 className="text-[36px] sm:text-[56px] md:text-[72px] lg:text-[96px] font-bold leading-[1.1] mb-6 whitespace-pre-line" style={{ fontVariationSettings: "'wdth' 100" }}>
                                        {slide.title}
                                    </h2>
                                    {slide.subtext && (
                                        <p className="text-[16px] md:text-[20px] lg:text-[24px] leading-[1.6] opacity-80 max-w-[720px] whitespace-pre-line mt-2">
                                            {slide.subtext}
                                        </p>
                                    )}
                                    {/* Progress Dots */}
                                    <div className="flex items-center gap-2 mt-8">
                                        {scrollSlides.map((_, dotIdx) => (
                                            <div
                                                key={dotIdx}
                                                className={`h-[8px] rounded-full transition-all duration-300 ${
                                                    idx === dotIdx ? 'w-10 bg-white' : 'w-[8px] bg-white/40'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Sticky Phone Images */}
                    <div className="flex-[0.75] w-full relative z-20">
                        {scrollSlides.map((slide, idx) => (
                            <div
                                key={`img-${idx}`}
                                className="sticky top-0 h-screen w-full flex items-center justify-center bg-transparent pointer-events-none"
                                style={{ zIndex: idx + 10 }}
                            >
                                <div className="relative w-full h-[60vh] md:h-[80vh] min-h-[400px]">
                                    <Image
                                        src={slide.imagePath}
                                        alt={`Feature screen ${idx + 1}`}
                                        fill
                                        className="object-contain"
                                        priority={idx < 2}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden flex flex-col w-full px-6 py-20 gap-32">
                    {scrollSlides.map((slide, idx) => (
                        <div key={`mob-${idx}`} className="flex flex-col items-center justify-center gap-8 w-full">
                            <div className="w-full flex flex-col justify-center text-left">
                                <h2 className="text-[28px] sm:text-[36px] font-black leading-[1.1] mb-4 whitespace-pre-line" style={{ fontVariationSettings: "'wdth' 100" }}>
                                    {slide.title}
                                </h2>
                                {slide.subtext && (
                                    <p className="text-[16px] sm:text-[18px] leading-[1.6] opacity-85 mt-2 whitespace-pre-line">
                                        {slide.subtext}
                                    </p>
                                )}
                                {/* Progress Dots */}
                                <div className="flex items-center gap-2 mt-4">
                                    {scrollSlides.map((_, dotIdx) => (
                                        <div
                                            key={dotIdx}
                                            className={`h-[8px] rounded-full transition-all duration-300 ${
                                                idx === dotIdx ? 'w-10 bg-white' : 'w-[8px] bg-white/40'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="relative w-full h-[60vh] min-h-[400px]">
                                <Image
                                    src={slide.imagePath}
                                    alt={`Feature screen ${idx + 1}`}
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                    priority={idx < 2}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Section 4: How does BlockP Work ── */}
            <div className="w-full relative pt-20 overflow-visible flex flex-row items-center">
                {/* Mascot */}
                <div className="absolute -left-[3px] sm:-left-[5px] md:-left-[7px] lg:-left-[8px] xl:-left-[10px] top-1/2 -translate-y-1/2 w-[200px] sm:w-[290px] md:w-[400px] lg:w-[520px] xl:w-[650px] aspect-square pointer-events-none z-10">
                    <Image src="/landing/blue/maskot2.png" alt="Why is BlockP the best mascot" fill className="object-contain object-left" />
                </div>
                <div className="w-full flex justify-end pr-6 md:pr-16 lg:pr-24 xl:pr-32 pl-[150px] sm:pl-[240px] md:pl-[340px] lg:pl-[460px] xl:pl-[580px]">
                    <div className="flex flex-col gap-6 w-full max-w-[90%] md:max-w-[70%] lg:max-w-[65%]">
                        <h2 className="text-[32px] sm:text-[48px] md:text-[64px] lg:text-[80px] xl:text-[96px] font-bold leading-[1.05] text-left whitespace-pre-line" style={{ fontVariationSettings: "'wdth' 100" }}>
                            {howItWorksHeading}
                        </h2>
                        <div className="flex flex-col gap-6 mt-4">
                            <p className="text-[16px] md:text-[20px] leading-[1.6] font-normal opacity-90">{howItWorksParagraph1}</p>
                            <p className="text-[16px] md:text-[20px] leading-[1.6] font-normal opacity-90">{howItWorksParagraph2}</p>
                            <p className="text-[16px] md:text-[20px] leading-[1.6] font-normal opacity-90">{howItWorksParagraph3}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Section 5: Our adult content blocker can ── */}
            <div className="w-[94%] lg:w-[90%] max-w-[1500px] mx-auto flex flex-col pt-12 pb-0 gap-32">
                <div className="flex flex-col items-center gap-10 py-20">
                    <h2 className="text-[28px] sm:text-[42px] md:text-[52px] lg:text-[64px] font-bold leading-[1.1] text-center" style={{ fontVariationSettings: "'wdth' 100" }}>
                        {adultBlockerHeading}
                    </h2>
                    <div className="max-w-[800px] w-full flex flex-col gap-4">
                        {adultBlockerBullets.map((text, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className="w-2.5 h-2.5 rounded-full bg-white mt-2.5 shrink-0"></div>
                                <p className="text-[16px] md:text-[20px] leading-[1.6] font-normal opacity-90">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Section 6: Premium CTA ── */}
            <section
                className="relative w-full overflow-hidden footer-gradient py-24"
                style={{ background: "linear-gradient(180deg, #5693FE 0%, #5182F5 100%)" }}
            >
                <div className="w-full max-w-[1898px] px-6 lg:px-16 mx-auto flex flex-col md:flex-row items-center justify-between pt-24 pb-24 md:py-40 relative z-10" style={{ minHeight: "750px" }}>
                    {/* Left: Text */}
                    <div className="flex-1 md:max-w-[50%] w-full flex flex-col items-center text-center md:pr-6 lg:pr-10 md:translate-x-[70px] z-20">
                        <h2
                            className="text-[48px] lg:text-[64px] font-black text-white leading-[1.0] mb-6 whitespace-nowrap"
                            style={{ fontVariationSettings: "'wdth' 100" }}
                        >
                            {premiumCtaHeading}
                        </h2>
                        <p className="text-[20px] lg:text-[32px] text-white font-medium leading-[1.3] mb-12 max-w-xl">
                            {premiumCtaSubtext}
                        </p>
                        <Link href={premiumCtaButtonUrl}>
                            <button className="bg-white text-[#012955] font-semibold text-[20px] lg:text-[24px] px-16 lg:px-24 py-3 lg:py-4 rounded-full shadow-[0px_8px_0px_#1A3B7A] lg:shadow-[0px_10px_0px_#1A3B7A] hover:translate-y-1 hover:shadow-[0px_6px_0px_#1A3B7A] transition-all duration-200 whitespace-nowrap">
                                {premiumCtaButtonText}
                            </button>
                        </Link>
                    </div>

                    {/* Right: Mascot */}
                    <div className="flex-1 w-full md:absolute md:right-0 md:bottom-0 md:w-1/2 flex justify-center md:justify-end mt-12 md:mt-0 md:-mr-6 lg:-mr-8 md:-translate-x-[160px] md:translate-y-[290px] lg:translate-y-[380px] z-10">
                        <PremiumMascot className="w-full max-w-[460px] md:max-w-[660px] lg:max-w-[700px] aspect-square" />
                    </div>
                </div>
            </section>
        </div>
    )
}
