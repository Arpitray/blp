import React from 'react'
import Link from 'next/link'

const BENEFITS = [
    {
        title: "Instant Porn Blocking",
        icon: "/product/android/benifits/network.svg",
        content: "When you have an urge to watch adult content, BlockP protects you by instantly blocking millions of adult websites with a single click without any complicated set-up."
    },
    {
        title: "User-Friendly Interface",
        icon: "/product/android/benifits/focus.svg",
        content: "Modify settings based on your needs easily with a simple user-friendly design."
    },
    {
        title: "Unlimited Customization",
        icon: "/product/android/benifits/blocklist.svg",
        content: "Add unlimited keywords and websites to the blocklist to create a blocking system based on your need."
    },
    {
        title: "Flexible Blocking",
        icon: "/product/android/benifits/tune.svg",
        content: "Get complete control over your browsing - decide what websites you want to allow and for how long."
    },
    {
        title: "Password Protection",
        icon: "/product/android/benifits/bypass.svg",
        content: "Secure BlockP settings with a password to prevent bypass or unauthorized changes"
    },
    {
        title: "Community Support",
        icon: "/product/android/benifits/community.svg",
        content: (
            <>
                Join BlockP's support community on <Link href="#" className="underline decoration-1 underline-offset-2">Reddit</Link> and <Link href="#" className="underline decoration-1 underline-offset-2">Discord</Link> to connect with others who are trying to quit porn and reclaim their lives.
            </>
        )
    },
]

export function ChromeBenefitsSection({ data }: { data?: { sectionTitle?: string; items?: { title?: string; iconPath?: string; description?: string }[] } }) {
    const title = data?.sectionTitle || "Benefits of Using BlockP Porn\nBlocker Chrome Extension"
    const benefitsToUse = data?.items && data.items.length > 0
        ? data.items.map(b => ({
            title: b.title || '',
            icon: b.iconPath || "/product/android/benifits/network.svg",
            content: <>{b.description}</>
        }))
        : BENEFITS

    return (
        <section className="w-full bg-[#F6FAFF] py-24 md:py-32 relative z-20">
            <div className="w-full max-w-site px-[12px] lg:px-[40px] mx-auto flex flex-col items-center">
                <h2 className="text-[32px] md:text-[48px] lg:text-[54px] font-black text-[#012955] text-center mb-16 md:mb-24 leading-[1.2] whitespace-pre-wrap">
                    {title}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full">
                    {benefitsToUse.map((card, idx) => (
                        <div 
                            key={idx} 
                            className="bg-[#e3efff] rounded-[20px] md:rounded-[24px] p-8 md:p-10 shadow-[0_10px_16px_-6px_#c4defd] flex flex-col items-start"
                        >
                            <div className="flex items-center mb-5">
                                <div className="flex-shrink-0">
                                    <img 
                                        src={card.icon} 
                                        alt={card.title} 
                                        width={45}
                                        height={45}
                                        className="w-[45px] h-[45px] object-contain"
                                    />
                                </div>
                                <h3 className="text-[24px] md:text-[28px] font-black text-[#012955] ml-4 leading-tight">
                                    {card.title}
                                </h3>
                            </div>
                            <p className="text-[18px] md:text-[20px] text-[#012955] font-semibold leading-[1.6]">
                                {card.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
