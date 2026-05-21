'use client'
import React from 'react'
import Image from 'next/image'

const STEPS = [
    {
        title: <>How Does<br/>BlockP<br/>Android Porn<br/>Blocker Work?</>,
        desc: "",
        img: "/product/android/onboard/1.png"
    },
    {
        title: "Install BlockP",
        desc: "Download and install the BlockP porn blocker app for Android from the Play Store. Open the app to get started.",
        img: "/product/android/onboard/2.png"
    },
    {
        title: "Grant Permissions",
        desc: "Allow the accessibility permissions to BlockP to accurately block adult content inside apps and browsers.",
        img: "/product/android/onboard/3.png"
    },
    {
        title: "Turn on Blocking",
        desc: "Tap 'Start Protection' to block porn and distracting content instantly.",
        img: "/product/android/onboard/4.png"
    },
    {
        title: "Customize Your Filters",
        desc: "Set up BlockP's custom filters to match your needs. BlockP is equipped to act like a flexible, fully customized Porn Blocking app.",
        img: "/product/android/onboard/5.png"
    },
]

export function AndroidScrollUI() {
    return (
        <div className="w-full relative bg-[#F6FAFF]">
            {/* Desktop Layout: Split Columns */}
            <div className="hidden md:flex flex-row w-full max-w-site px-6 lg:px-16 mx-auto relative gap-8 md:gap-16 lg:gap-20">
                
                <div className="flex-1 flex flex-col w-full">
                    {STEPS.map((step, idx) => (
                        <div key={`text-${idx}`} className="h-screen w-full flex flex-col justify-center text-left md:pr-6 lg:pr-10 xl:pr-16 md:translate-x-12 md:translate-y-20">
                            <h2 className={`font-black text-[#012955] leading-[1.05] mb-6 ${idx === 0 ? 'text-[62px] md:text-[84px] lg:text-[96px]' : 'text-[52px] md:text-[70px] lg:text-[82px]'}`}>
                                {step.title}
                            </h2>
                            {step.desc && (
                                <p className="text-[22px] md:text-[26px] lg:text-[30px] text-[#012955]/80 font-bold max-w-[580px] leading-[1.5]">
                                    {step.desc}
                                </p>
                            )}
                            
                            {/* Progress Dots Indicator */}
                            <div className="flex items-center gap-2 mt-8">
                                {STEPS.map((_, dotIdx) => (
                                    <div 
                                        key={dotIdx}
                                        className={`h-[8px] rounded-full transition-all duration-300 ${
                                            idx === dotIdx ? 'w-10 bg-[#012955]' : 'w-[8px] bg-[#D1DFED]'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Side: Sticky Phones */}
                <div className="flex-1 w-full relative">
                    {STEPS.map((step, idx) => (
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
                {STEPS.map((step, idx) => (
                    <div key={`mob-${idx}`} className="flex flex-col items-center justify-center gap-8 w-full">
                        <div className="w-full flex flex-col justify-center text-left">
                            <h2 className={`font-black text-[#012955] leading-[1.05] mb-4 ${idx === 0 ? 'text-[44px]' : 'text-[36px]'}`}>
                                {step.title}
                            </h2>
                            {step.desc && (
                                <p className="text-[18px] text-[#012955]/80 font-bold leading-[1.5]">
                                    {step.desc}
                                </p>
                            )}
                            
                            {/* Progress Dots Indicator */}
                            <div className="flex items-center gap-2 mt-4">
                                {STEPS.map((_, dotIdx) => (
                                    <div 
                                        key={dotIdx}
                                        className={`h-[8px] rounded-full transition-all duration-300 ${
                                            idx === dotIdx ? 'w-10 bg-[#012955]' : 'w-[8px] bg-[#D1DFED]'
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
