'use client'
import React from 'react'
import Image from 'next/image'

const STEPS = [
    {
        title: <>How to Block<br />Porn on iOS<br />Using BlockP.</>,
        desc: "",
        img: "/product/ios/1.png"
    },
    {
        title: "Set Up Smart Porn Blocking for iPhone",
        desc: "BlockP gives parents its smart filtering to protect your iPhone from pornographic and harmful content. It's super simple and effective. Available as an app for iOS devices and MacBooks.",
        img: "/product/ios/2.png"
    },
    {
        title: "Customize Your Protection for You and Your Family",
        desc: "BlockP's custom blocking options let you block apps from internet search.\n1. Custom app blocking for quick adult content blocking.\n2. Keyword blocking for blocking of adult, porn based search.\n3. BlockP PIN for blocking adult content access and real-time safe search and block on all devices.",
        img: "/product/ios/3.png"
    },
    {
        title: "Protect Kids with Advanced Parental Controls",
        desc: "Use BlockP's PIN to block any website on iOS/iPad to keep secure and safe protection. Set up password protection and strict mode features to lock settings and apps.",
        img: "/product/ios/4.png"
    },
    {
        title: "Improve Focus and Mental Well-being",
        desc: "Improve focus and mental well-being with BlockP's productivity tools. Stop wasting your time on porn. Block app usage and set up sleep routine.",
        img: "/product/ios/5.png"
    },
    {
        title: "Stay safe with Real-Time Detection and Safe Search",
        desc: "Our real-time AI detection instantly blocks known adult sites. Browsing incognito and other... blocking any and every bad sites that contain illegal or adult media, text and gifs.",
        img: "/product/ios/6new.png"
    },
]

export function IosScrollUI({ data }: { data?: { title?: string; description?: string; imagePath?: string }[] }) {
    const stepsToUse = data && data.length > 0
        ? data.map(d => ({
            title: d.title || '',
            desc: d.description || '',
            img: d.imagePath || "/product/ios/1.png"
        }))
        : STEPS

    return (
        <div className="w-full relative bg-[#F6FAFF]">
            {/* Desktop Layout: Split Columns */}
            <div className="hidden md:flex flex-row w-full max-w-site px-6 lg:px-16 mx-auto relative gap-8 md:gap-16 lg:gap-20">

                <div className="flex-1 flex flex-col w-full">
                    {stepsToUse.map((step, idx) => (
                        <div key={`text-${idx}`} className="h-screen w-full flex flex-col justify-center text-left md:pr-6 lg:pr-10 xl:pr-16 md:translate-x-12 md:translate-y-20">
                            <h2 className={`font-black text-[#012955] leading-[1.05] mb-6 ${idx === 0 ? 'text-[62px] md:text-[84px] lg:text-[96px]' : 'text-[42px] md:text-[56px] lg:text-[64px]'}`}>
                                {step.title}
                            </h2>
                            {step.desc && (
                                <p className="text-[20px] md:text-[24px] lg:text-[26px] text-[#012955]/80 font-bold max-w-[580px] leading-[1.5] whitespace-pre-line">
                                    {step.desc}
                                </p>
                            )}

                            {/* Progress Dots Indicator */}
                            <div className="flex items-center gap-2 mt-8">
                                {stepsToUse.map((_, dotIdx) => (
                                    <div
                                        key={dotIdx}
                                        className={`h-[8px] rounded-full transition-all duration-300 ${idx === dotIdx ? 'w-10 bg-[#012955]' : 'w-[8px] bg-[#D1DFED]'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Side: Sticky Phones */}
                <div className="flex-1 w-full relative">
                    {stepsToUse.map((step, idx) => (
                        <div
                            key={`img-${idx}`}
                            className="sticky top-0 h-screen w-full flex items-center justify-center bg-transparent"
                            style={{ zIndex: idx + 10 }}
                        >
                            <div className="relative w-full h-[60vh] md:h-[80vh] min-h-[400px]">
                                <Image
                                    src={step.img}
                                    alt={`Step ${idx + 1}`}
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
                {stepsToUse.map((step, idx) => (
                    <div key={`mob-${idx}`} className="flex flex-col items-center justify-center gap-8 w-full">
                        <div className="w-full flex flex-col justify-center text-left">
                            <h2 className={`font-black text-[#012955] leading-[1.05] mb-4 ${idx === 0 ? 'text-[44px]' : 'text-[32px]'}`}>
                                {step.title}
                            </h2>
                            {step.desc && (
                                <p className="text-[18px] text-[#012955]/80 font-bold leading-[1.5] whitespace-pre-line">
                                    {step.desc}
                                </p>
                            )}

                            {/* Progress Dots Indicator */}
                            <div className="flex items-center gap-2 mt-4">
                                {stepsToUse.map((_, dotIdx) => (
                                    <div
                                        key={dotIdx}
                                        className={`h-[8px] rounded-full transition-all duration-300 ${idx === dotIdx ? 'w-10 bg-[#012955]' : 'w-[8px] bg-[#D1DFED]'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="relative w-full h-[60vh] min-h-[400px]">
                            <Image
                                src={step.img}
                                alt={`Step ${idx + 1}`}
                                fill
                                className="object-contain"
                                priority={idx < 2}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
