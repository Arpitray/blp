import React from 'react'
import Link from 'next/link'

const BENEFITS = [
    {
        title: "AI-Powered Porn Blocking",
        icon: "/product/android/benifits/network.svg",
        content: "BlockP's AI-powered filters can detect nude, semi-nude, and AI-generated adult content. It can detect and block hidden or disguised content in real-time to keep you safe across browsers and apps."
    },
    {
        title: "Personalized Blocking",
        icon: "/product/android/benifits/tune.svg",
        content: "BlockP lets you customize your digital space with options to block specific keywords and websites that are triggering for you. You are in full control of what you see."
    },
    {
        title: "Social Media Blocking",
        icon: "/product/android/benifits/favorite.svg",
        content: "BlockP gives you greater control by letting you block searches, stories, and reels on social media platforms for distraction-free browsing. Platforms like Instagram have semi-nude content and Reddit has NSFW content. BlockP's AI-powered filters can detect and block such unsafe content on social media apps."
    },
    {
        title: "Blocklist & Whitelist",
        icon: "/product/android/benifits/blocklist.svg",
        content: "BlockP's blocklist is not restricted to adult websites. You can add any website that is distracting for you to this infinite blocklist. At the same time, you can permit seamless access to essential websites with the whitelist."
    },
    {
        title: "Accountability Partner",
        icon: "/product/android/benifits/handshake.svg",
        content: "Support from a loved one can help you stay consistent even during difficult moments. BlockP lets you create a system of support and commitment by adding a trusted friend or a parent as an accountability partner."
    },
    {
        title: "Focus Mode",
        icon: "/product/android/benifits/focus.svg",
        content: "BlockP's focus mode lets you block distracting apps and notifications to boost productivity. It lets you schedule periods of focus for working or studying without distraction from your phone"
    },
    {
        title: "Bypass Prevention",
        icon: "/product/android/benifits/bypass.svg",
        content: "BlockP lets you secure your settings with a password and set up uninstall prevention. So, even during your weakest moments you can not disable the blocker to watch porn."
    },
    {
        title: "Community Support",
        icon: "/product/android/benifits/community.svg",
        content: (
            <>
                Connect with others who are on a similar journey to quit porn through the <Link href="#" className="underline decoration-1 underline-offset-2">Discord</Link> and <Link href="#" className="underline decoration-1 underline-offset-2">Reddit</Link> support community of BlockP. Sharing experiences and connecting with others will motivate you to stay consistent on your quitting porn journey.
            </>
        )
    },
]

export function AndroidBenefitsSection({ data }: { data?: { sectionTitle?: string; items?: { title?: string; iconPath?: string; description?: string }[] } }) {
    const title = data?.sectionTitle || "Benefits of using a porn blocker"
    const benefitsToUse = data?.items && data.items.length > 0
        ? data.items.map(b => {
            if (b.title === "Community Support") {
                return {
                    title: b.title,
                    icon: b.iconPath || "/product/android/benifits/community.svg",
                    content: (
                        <>
                            Connect with others who are on a similar journey to quit porn through the <Link href="#" className="underline decoration-1 underline-offset-2 hover:text-[#012955]/85 transition-colors">Discord</Link> and <Link href="#" className="underline decoration-1 underline-offset-2 hover:text-[#012955]/85 transition-colors">Reddit</Link> support community of BlockP. Sharing experiences and connecting with others will motivate you to stay consistent on your quitting porn journey.
                        </>
                    )
                }
            }
            return {
                title: b.title || '',
                icon: b.iconPath || "/product/android/benifits/network.svg",
                content: <>{b.description}</>
            }
        })
        : BENEFITS

    return (
        <section className="w-full bg-[#F6FAFF] py-24 md:py-32 relative z-20">
            <div className="w-full max-w-site px-[12px] lg:px-[40px] mx-auto flex flex-col items-center">
                <h2 className="text-[32px] md:text-[48px] lg:text-[54px] font-black text-[#012955] text-center mb-16 md:mb-24 leading-[1.2]">
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
