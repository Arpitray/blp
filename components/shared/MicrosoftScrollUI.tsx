'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const STEPS = [
    {
        title: <>How Does<br/>BlockP Porn<br/>Blocker for<br/>Windows Work?</>,
        desc: "",
        img: "/product/windows/1.png"
    },
    {
        title: "Just One Click to Block Porn Instantly",
        desc: "Download and install the BlockP porn blocker app for Windows from the Play Store. Open the App to get started.",
        img: "/product/windows/2.png"
    },
    {
        title: "Block the Websites and Keywords That Tempt You",
        desc: "Allow Accessibility permissions to BlockP to activate full porn protection across apps and browsers.",
        img: "/product/windows/3.png"
    },
    {
        title: "Use Custom Blocking Features to Stay Strong",
        desc: "You can block social media, gambling and other distractions on your computer with BlockP.",
        img: "/product/windows/4.png"
    },
    {
        title: "Stop Yourself from Disabling It",
        desc: "Sometimes, when urges are strong, we try to turn the blocker off. That's why this porn blocker for Windows features powerful settings, including Add accountability partner, Prevent Uninstall, Block Incognito Mode, long sentence password, and Block Guest Mode.",
        img: "/product/windows/5.png"
    },
]

export function MicrosoftScrollUI({ data }: { data?: { title?: string; description?: string; imagePath?: string }[] }) {
    // Map Sanity data to STEPS format if available
    const stepsToUse = data && data.length > 0 
        ? data.map(d => ({
            title: d.title || '',
            desc: d.description || '',
            img: d.imagePath || "/product/windows/1.png"
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
        <div className="w-full relative bg-[#F6FAFF] overflow-x-clip">
            <style dangerouslySetInnerHTML={{__html: `
                .scroll-ui-text-col {
                    padding-left: 32px;
                }
                @media (min-width: 1024px) {
                    .scroll-ui-text-col {
                        padding-left: 72px;
                    }
                }
                @media (min-width: 1600px) {
                    .scroll-ui-text-col {
                        padding-left: calc((100vw - 1600px) / 2 + 72px);
                    }
                }
            `}} />
            {/* Desktop Layout: Split Columns */}
            <div 
                className="hidden md:grid grid-cols-[1.25fr_0.75fr] w-full relative"
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

                <div className="w-full max-w-[850px] justify-self-start flex flex-col pr-8 md:pr-12 relative z-10 scroll-ui-text-col">
                    <div className="sticky top-0 h-screen w-full flex flex-col justify-center">
                        {stepsToUse.map((step, idx) => (
                            <div 
                                key={`text-${idx}`} 
                                className={`absolute inset-0 flex flex-col justify-center text-left md:translate-y-20 transition-all duration-700 ease-in-out ${
                                    idx === activeIndex ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-4'
                                }`}
                            >
                                <h2 className={`font-black text-[#012955] leading-[1.05] mb-6 whitespace-pre-line ${idx === 0 ? 'text-[62px] md:text-[84px] lg:text-[96px]' : 'text-[52px] md:text-[70px] lg:text-[82px]'}`}>
                                    {step.title}
                                </h2>
                                {step.desc && (
                                    <p className="text-[22px] md:text-[26px] lg:text-[30px] text-[#012955]/80 font-bold max-w-[760px] leading-[1.5] whitespace-pre-line">
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

                {/* Right Side: Sticky Laptops */}
                <div className="w-full relative z-20">
                    {stepsToUse.map((step, idx) => (
                        <div 
                            key={`img-${idx}`}
                            className="sticky top-0 h-screen w-full flex items-center justify-end bg-transparent pointer-events-none"
                            style={{ zIndex: idx + 10 }}
                        >
                            <div className="absolute right-0 w-[140%] h-[60vh] md:h-[80vh] min-h-[400px]">
                                <Image
                                    src={step.img}
                                    alt={`Step ${idx + 1}`}
                                    fill
                                    className="object-contain object-right"
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
                            <h2 className={`font-black text-[#012955] leading-[1.05] mb-4 whitespace-pre-line ${idx === 0 ? 'text-[44px]' : 'text-[36px]'}`}>
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
