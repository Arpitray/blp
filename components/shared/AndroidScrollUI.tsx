'use client'
import React, { useRef, useState, useEffect } from 'react'
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
    const containerRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return
            const { top, height } = containerRef.current.getBoundingClientRect()
            const windowHeight = window.innerHeight
            
            // Calculate progress (0 to 1) based on scroll position inside the container
            const scrollableDistance = height - windowHeight
            let progress = -top / scrollableDistance
            progress = Math.max(0, Math.min(1, progress))

            // Calculate active step
            const index = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length))
            setActiveIndex(index)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll() // Init
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div ref={containerRef} className="w-full relative bg-[#F6FAFF]" style={{ height: '500vh' }}>
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pt-20">
                <div className="w-full max-w-site px-6 lg:px-16 mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 lg:gap-20 h-full">
                    
                    {/* Left Side: Text Content */}
                    <div className="flex-1 w-full flex flex-col justify-center h-full relative z-20 md:pl-6 lg:pl-10 xl:pl-16">
                        <div className="relative w-full flex flex-col justify-center h-[300px] md:h-[400px]">
                            {STEPS.map((step, idx) => (
                                <div 
                                    key={idx}
                                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-full transition-all duration-700 ease-out ${
                                        activeIndex === idx 
                                            ? 'opacity-100 translate-y-[-50%] blur-none' 
                                            : activeIndex > idx 
                                                ? 'opacity-0 translate-y-[-100%] blur-[4px] pointer-events-none'
                                                : 'opacity-0 translate-y-[0%] blur-[4px] pointer-events-none'
                                    }`}
                                >
                                    <h2 className={`font-black text-[#012955] leading-[1.05] mb-6 ${idx === 0 ? 'text-[56px] md:text-[76px] lg:text-[90px]' : 'text-[48px] md:text-[64px] lg:text-[76px]'}`}>
                                        {step.title}
                                    </h2>
                                    {step.desc && (
                                        <p className="text-[20px] md:text-[24px] lg:text-[28px] text-[#012955]/80 font-bold max-w-[550px] leading-[1.5]">
                                            {step.desc}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Pagination Progress */}
                        <div className="flex items-center gap-2 mt-2 z-10 relative">
                            {STEPS.map((_, idx) => (
                                <div 
                                    key={idx}
                                    className={`h-[8px] rounded-full transition-all duration-500 ease-out ${
                                        activeIndex === idx ? 'w-10 bg-[#012955]' : 'w-[8px] bg-[#D1DFED]'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Phone Image */}
                    <div className="flex-1 w-full flex justify-center items-center relative h-[60vh] md:h-[80vh] min-h-[400px] z-10 md:-ml-12 lg:-ml-24 xl:-ml-36 2xl:-ml-48">
                        {STEPS.map((step, idx) => (
                            <Image
                                key={idx}
                                src={step.img}
                                alt={`Step ${idx + 1}`}
                                fill
                                className={`object-contain transition-all duration-700 ease-out origin-center ${
                                    activeIndex === idx 
                                        ? 'opacity-100 scale-100 translate-y-0 blur-none' 
                                        : activeIndex > idx
                                            ? 'opacity-0 scale-[0.9] -translate-y-[40px] blur-[8px]'
                                            : 'opacity-0 scale-[1.1] translate-y-[40px] blur-[8px]'
                                }`}
                                priority={idx < 2}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}
