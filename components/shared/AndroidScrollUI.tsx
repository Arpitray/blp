'use client'
import React, { useEffect, useRef, useState } from 'react'
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
        desc: `Set up BlockP's custom filters to match your needs. On BlockP's dashboard you will see 3 modes of porn blocking:

1. Off - No porn blocking
2. Normal - Blocks common adult content
3. Strict - Maximum protection from any porn, nudity, and potential triggers

With the custom options in the settings, you can fine-tune your protection by blocking apps, websites, keywords, and social media features based on your personal triggers.`,
        img: "/product/android/onboard/5.png"
    },
]

export function AndroidScrollUI({ data }: { data?: { title?: string; description?: string; imagePath?: string }[] }) {
    // Map Sanity data to STEPS format if available
    const stepsToUse = data && data.length > 0 
        ? data.map(d => ({
            title: d.title || '',
            desc: d.description || '',
            img: d.imagePath || "/product/android/onboard/1.png"
        }))
        : STEPS

    const [activeIndex, setActiveIndex] = useState(0);
    const trackersRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = Number(entry.target.getAttribute('data-index'));
                        setActiveIndex(idx);
                    }
                });
            },
            {
                rootMargin: "-50% 0px -50% 0px"
            }
        );

        trackersRef.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="w-full relative bg-[#F6FAFF]">
            {/* Desktop Layout: Split Columns */}
            <div 
                className="hidden md:flex flex-row w-full max-w-site px-[12px] lg:px-[40px] mx-auto relative gap-8 md:gap-16 lg:gap-20"
                style={{ height: `${stepsToUse.length * 100}vh` }}
            >
                
                {/* Invisible Trackers for Scroll Progress */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                    {stepsToUse.map((_, idx) => (
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
                        {stepsToUse.map((step, idx) => (
                            <div 
                                key={`text-${idx}`} 
                                className={`absolute inset-0 flex flex-col justify-center text-left md:pr-6 lg:pr-10 xl:pr-16 md:translate-x-12 md:translate-y-20 transition-all duration-700 ease-in-out ${
                                    idx === activeIndex ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-4'
                                }`}
                            >
                                <h2 className={`font-black text-[#012955] leading-[1.05] mb-6 whitespace-pre-line text-[36px] md:text-[52px] lg:text-[64px]`}>
                                    {step.title}
                                </h2>
                                {step.desc && (
                                    <p className="text-[18px] lg:text-[20px] text-[#012955]/80 font-bold max-w-[700px] leading-[1.5] whitespace-pre-line">
                                        {step.desc}
                                    </p>
                                )}
                                
                                {/* Progress Dots Indicator */}
                                <div className="flex items-center gap-2 mt-8">
                                    {stepsToUse.map((_, dotIdx) => (
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
                </div>

                {/* Right Side: Sticky Phones */}
                <div className="flex-[0.75] w-full relative z-20">
                    {stepsToUse.map((step, idx) => (
                        <div 
                            key={`img-${idx}`}
                            className="sticky top-0 h-screen w-full flex items-center justify-center bg-transparent pointer-events-none"
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
                            <h2 className={`font-black text-[#012955] leading-[1.05] mb-4 whitespace-pre-line ${idx === 0 ? 'text-[32px]' : 'text-[26px]'}`}>
                                {step.title}
                            </h2>
                            {step.desc && (
                                <p className="text-[16px] text-[#012955]/80 font-bold leading-[1.5] whitespace-pre-line">
                                    {step.desc}
                                </p>
                            )}
                            
                            {/* Progress Dots Indicator */}
                            <div className="flex items-center gap-2 mt-4">
                                {stepsToUse.map((_, dotIdx) => (
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
