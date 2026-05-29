'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/layout/ui/Button'
import { PremiumMascot } from '@/components/shared/PremiumMascot'

export const BlueLandingSection = () => {
    const [activeScrollIdx, setActiveScrollIdx] = useState(0)
    const scrollSlides = [
        {
            title: "More BlockP\nfeatures\nFor a safer\nexperience",
            subtext: "",
            image: "/landing/blue/scroll1.png",
        },
        {
            title: "AI-powered\nblocking",
            subtext: "BlockP uses advanced AI to scan web pages and filter explicit content in real-time.\n\nWe block custom lists to prevent keywords and sub-sites. It analyzes the text, images, and videos on the website and has an option to block custom URL.\n\nBlockP's AI, constantly filters content before the user body is finished displaying content to prevent accidental exposure to explicit adult content.",
            image: "/landing/blue/scroll2.png",
        },
        {
            title: "App\nblocking",
            subtext: "BlockP can detect and block when you open forbidden apps. Prevents the user to access any adult content on browser, messaging apps, or video sharing platforms.",
            image: "/landing/blue/scroll3.png",
        },
        {
            title: "Advanced\nblocking",
            subtext: "BlockP can block illegal bypasses, avoiding custom search engines and proxy sites to bypass the restrictions.\n\nPrevent other browsers/APPs to skip the checks. BlockP keeps safe list (bookmarks, images, etc.) from unauthorized users view.\n\nIt also highlights online access to details and filters explicit search results.",
            image: "/landing/blue/scroll4.png",
        },
        {
            title: "Social Media\nBlocking",
            subtext: "Social Media controls help to restrict access to specific features and popular social media platforms like Instagram, Facebook, YouTube, TikTok, and Telegram.\n\nNo more harmful modern distractions with our deep block for harmful content. Focus on what matters, BlockP will protect you.\n\nBlockP keeps tracks of basic functionality, redirects bypass to showing content for instagram reels or TikTok shorts.",
            image: "/landing/blue/scroll5.png",
        },
    ]

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
            {/* Section 1: Our free porn blocker - Breaks out of main container for full width */}
            <div className="w-full flex flex-col-reverse lg:flex-row items-center pt-20">
                {/* Text Side - Shifted to the left with smaller padding, taking up 65% width */}
                <div className="w-full lg:w-[65%] flex flex-col items-start gap-8 pl-6 md:pl-10 lg:pl-16 xl:pl-24 pr-6 lg:pr-10">
                    <h2 className="text-[36px] sm:text-[56px] md:text-[72px] lg:text-[96px] font-bold leading-[1.05]" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Our free<br/>porn blocker
                    </h2>
                    <div className="flex flex-col gap-6 w-full max-w-[900px]">
                        <p className="text-[16px] md:text-[20px] leading-[1.6] font-normal opacity-90">
                            With BlockP you can now easily block access to several websites and applications. It encourages a healthier lifestyle by minimizing exposure to explicit content and enabling controlled online activity.
                        </p>
                        <p className="text-[16px] md:text-[20px] leading-[1.6] font-normal opacity-90">
                            Take advantage of all the unique features like Password Protection, Prevent Uninstall, Focus Mode, Whitelist, BlockP VPN, and many more.
                        </p>
                        <p className="text-[16px] md:text-[20px] leading-[1.6] font-normal opacity-90">
                            Moreover, BlockP is available as a browser extension for Chrome and as an app for both Android and iOS. Download BlockP now, to get rid of pornography, making it easier to resist cravings and practice healthier digital habits.
                        </p>
                    </div>
                    <button className="mt-2 bg-white text-[#012955] font-semibold text-[20px] lg:text-[24px] px-8 sm:px-16 md:px-24 lg:px-32 py-2 lg:py-3 rounded-full shadow-[0px_8px_0px_#1A3B7A] lg:shadow-[0px_10px_0px_#1A3B7A] hover:translate-y-1 hover:shadow-[0px_6px_0px_#1A3B7A] transition-all duration-200 whitespace-nowrap">
                        Get started
                    </button>
                </div>
                
                {/* Image Side - Bleeds to the right, takes up 35% width */}
                <div className="w-full lg:w-[35%] flex justify-end relative h-[250px] sm:h-[400px] md:h-[500px] lg:h-[700px] xl:h-[800px]">
                    <div className="relative w-full h-full">
                        <Image src="/landing/blue/maskot1.png" alt="Free porn blocker mascot" fill className="object-contain object-center lg:object-right" priority />
                    </div>
                </div>
            </div>
            {/* Section 2 Header Row - Breaks out of container to stay full-width and anchor mascot to screen edge */}
            <div className="w-full relative pt-32 overflow-visible">
                {/* Mascot - hangs off the left edge of the screen */}
                <div className="absolute -left-[3px] sm:-left-[5px] md:-left-[7px] lg:-left-[8px] xl:-left-[10px] top-1/2 -translate-y-1/2 w-[200px] sm:w-[290px] md:w-[400px] lg:w-[520px] xl:w-[650px] aspect-square pointer-events-none z-10">
                    <Image 
                        src="/landing/blue/maskot2.png" 
                        alt="Why is BlockP the best mascot" 
                        fill 
                        className="object-contain object-left"
                    />
                </div>
                {/* Title - Pushed to the extreme right, left-aligned inside its block, with safety padding */}
                <div className="w-full flex justify-end pr-6 lg:pr-10">
                    <h2 className="text-[32px] sm:text-[48px] md:text-[64px] lg:text-[80px] xl:text-[96px] font-bold leading-[1.05] text-left max-w-[90%] md:max-w-[70%] lg:max-w-[65%]" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Why is BlockP<br/>the best adult<br/>content blocker?
                    </h2>
                </div>
            </div>

            {/* Cards Grid Row - stretching full width to match container width like in the design */}
            <div className="w-full max-w-site px-[12px] lg:px-[40px] mx-auto pt-12 pb-0 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-6">
                    {[
                        { 
                            title: 'Uninstall prevention', 
                            desc: 'Prevents the app from being uninstalled. Can\'t delete it during urges, so you can\'t escape your commitment to quit porn.', 
                            icon: <svg className="w-8 h-8 text-[#012955] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        },
                        { 
                            title: 'Multi-platform availability', 
                            desc: 'Available as a Chrome extension and as an app for Android and iOS, ensuring protection across all your devices.', 
                            icon: <svg className="w-8 h-8 text-[#012955] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        },
                        { 
                            title: 'Accountability partner', 
                            desc: 'Your chosen accountability partner gets the password to change BlockP settings. This keeps you from disabling the blocker during urges.', 
                            icon: <svg className="w-8 h-8 text-[#012955] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        },
                        { 
                            title: 'Password protection', 
                            desc: 'Password-protected, only authorized users can modify the settings.', 
                            icon: <svg className="w-8 h-8 text-[#012955] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        },
                        { 
                            title: 'Community support', 
                            desc: 'Support groups and communities to help users stay motivated.', 
                            icon: <svg className="w-8 h-8 text-[#012955] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        },
                        { 
                            title: 'Customizable filtering', 
                            desc: 'Offers filtering options, allowing users to block the exact websites, keywords, and content they don\'t want to see.', 
                            icon: <svg className="w-8 h-8 text-[#012955] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                        },
                    ].map((feature, i) => (
                        <div key={i} className="bg-white rounded-[25px] p-8 md:p-10 flex flex-col gap-4 shadow-[0_10px_20px_rgba(26,59,122,0.25)]">
                            <div className="flex items-center gap-4">
                                {feature.icon}
                                <h3 className="font-black text-[#012955] text-[22px] md:text-[26px] lg:text-[32px] leading-tight">{feature.title}</h3>
                            </div>
                            <p className="text-[#3B547C] text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed font-medium mt-1">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="w-full relative mt-32 mb-10">
                {/* Desktop Layout: Split Columns */}
                <div 
                    className="hidden md:flex flex-row w-full max-w-[1500px] px-[12px] lg:px-[40px] mx-auto relative gap-8 md:gap-16 lg:gap-20"
                    style={{ height: `${scrollSlides.length * 100}vh` }}
                >
                    
                    {/* Invisible Trackers for Scroll Progress */}
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
                                    
                                    {/* Progress Dots Indicator */}
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

                    {/* Right Side: Sticky Phones */}
                    <div className="flex-[0.75] w-full relative z-20">
                        {scrollSlides.map((slide, idx) => (
                            <div 
                                key={`img-${idx}`}
                                className="sticky top-0 h-screen w-full flex items-center justify-center bg-transparent pointer-events-none"
                                style={{ zIndex: idx + 10 }}
                            >
                                <div className="relative w-full h-[60vh] md:h-[80vh] min-h-[400px]">
                                    <Image
                                        src={slide.image}
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

                {/* Mobile Layout: Standard Stack */}
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
                                
                                {/* Progress Dots Indicator */}
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
                                    src={slide.image}
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

            {/* Section 4 Header & Content Row - Breaks out of container to stay full-width and anchor mascot to screen edge */}
            <div className="w-full relative pt-20 overflow-visible flex flex-row items-center">
                {/* Mascot - hangs off the left edge of the screen */}
                <div className="absolute -left-[3px] sm:-left-[5px] md:-left-[7px] lg:-left-[8px] xl:-left-[10px] top-1/2 -translate-y-1/2 w-[200px] sm:w-[290px] md:w-[400px] lg:w-[520px] xl:w-[650px] aspect-square pointer-events-none z-10">
                    <Image 
                        src="/landing/blue/maskot2.png" 
                        alt="Why is BlockP the best mascot" 
                        fill 
                        className="object-contain object-left"
                    />
                </div>
                {/* Title and Paragraphs grouped in a single container for 100% perfect start line alignment */}
                <div className="w-full flex justify-end pr-6 md:pr-16 lg:pr-24 xl:pr-32 pl-[150px] sm:pl-[240px] md:pl-[340px] lg:pl-[460px] xl:pl-[580px]">
                    <div className="flex flex-col gap-6 w-full max-w-[90%] md:max-w-[70%] lg:max-w-[65%]">
                        <h2 className="text-[32px] sm:text-[48px] md:text-[64px] lg:text-[80px] xl:text-[96px] font-bold leading-[1.05] text-left" style={{ fontVariationSettings: "'wdth' 100" }}>
                            How does<br/>BlockP Work?
                        </h2>
                        <div className="flex flex-col gap-6 mt-4">
                            <p className="text-[16px] md:text-[20px] leading-[1.6] font-normal opacity-90">
                                BlockP is the most effective app to filter adult content from your device and offers effective porn protection.
                            </p>
                            <p className="text-[16px] md:text-[20px] leading-[1.6] font-normal opacity-90">
                                You can control exposure to adult content and online pornography with our filtering technology, website and app blocker tool.
                            </p>
                            <p className="text-[16px] md:text-[20px] leading-[1.6] font-normal opacity-90">
                                BlockP utilizes advanced technology to analyze a website's content in real-time. Websites are constantly evolving, with new user-generated pages being added every day. This changing nature of the internet requires a porn filter that can analyze content and block porn.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Centered container opens for Section 5 and subsequent content */}
            <div className="w-[94%] lg:w-[90%] max-w-[1500px] mx-auto flex flex-col pt-12 pb-0 gap-32">

                {/* Section 5: Our adult content blocker can: */}
                <div className="flex flex-col items-center gap-10 py-20">
                    <h2 className="text-[28px] sm:text-[42px] md:text-[52px] lg:text-[64px] font-bold leading-[1.1] text-center" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Our adult content blocker can:
                    </h2>
                    <div className="max-w-[800px] w-full flex flex-col gap-4">
                        {[
                            'Keep porn away from your device and modules.',
                            'Filter pornography in real-time with AI.',
                            'AI-based feature that gives you a block pop up and the safe (HTTPs) removed content.',
                            'Block distracting apps like Instagram, YouTube, Facebook, WhatsApp, etc.',
                            'Easily create blocklists of your restricted access content like sub-grouping, shops, and any other site you want to stay away from.',
                            'With custom keywords like "porn", "xxx", or tracking triggers, BlockP lets you filter out specific keywords across browsers and apps, giving you full control to establish better family controls.'
                        ].map((text, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className="w-2.5 h-2.5 rounded-full bg-white mt-2.5 shrink-0"></div>
                                <p className="text-[16px] md:text-[20px] leading-[1.6] font-normal opacity-90">
                                    {text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Section 6: Premium CTA */}
            <section
                className="relative w-full overflow-hidden footer-gradient py-24"
                style={{
                    background: "linear-gradient(180deg, #5693FE 0%, #5182F5 100%)"
                }}
            >
                <div className="w-full max-w-[1898px] px-6 lg:px-16 mx-auto flex flex-col md:flex-row items-center justify-between pt-24 pb-24 md:py-40 relative z-10" style={{ minHeight: "750px" }}>

                    {/* Left Side: Text */}
                    <div className="flex-1 md:max-w-[50%] w-full flex flex-col items-center text-center md:pr-6 lg:pr-10 md:translate-x-[70px] z-20">
                        <h2
                            className="text-[48px] lg:text-[64px] font-black text-white leading-[1.0] mb-6 whitespace-nowrap"
                            style={{ fontVariationSettings: "'wdth' 100" }}
                        >
                            BlockP Premium.
                        </h2>
                        <p className="text-[20px] lg:text-[32px] text-white font-medium leading-[1.3] mb-12 max-w-xl">
                            Stronger protection, full control, and priority support, so nothing stands in your way.
                        </p>
                        <Link href="/premium">
                            <button
                                className="bg-white text-[#012955] font-semibold text-[20px] lg:text-[24px] px-16 lg:px-24 py-3 lg:py-4 rounded-full shadow-[0px_8px_0px_#1A3B7A] lg:shadow-[0px_10px_0px_#1A3B7A] hover:translate-y-1 hover:shadow-[0px_6px_0px_#1A3B7A] transition-all duration-200 whitespace-nowrap"
                            >
                                Start your free trial
                            </button>
                        </Link>
                    </div>

                    {/* Right Side: Image */}
                    <div className="flex-1 w-full md:absolute md:right-0 md:bottom-0 md:w-1/2 flex justify-center md:justify-end mt-12 md:mt-0 md:-mr-6 lg:-mr-8 md:-translate-x-[160px] md:translate-y-[290px] lg:translate-y-[380px] z-10">
                        <PremiumMascot className="w-full max-w-[460px] md:max-w-[660px] lg:max-w-[700px] aspect-square" />
                    </div>
                </div>
            </section>
        </div>
    )
}
