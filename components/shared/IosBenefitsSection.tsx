import React from 'react'
import Link from 'next/link'

const BENEFITS = [
    {
        title: "Improve Mental Health",
        icon: "/product/android/benifits/network.svg",
        content: "Studies show that people who watch porn frequently are at a higher risk of emotional distress. BlockP keeps you safe from explicit content that causes feelings of guilt, shame, and anxiety."
    },
    {
        title: "Increase Productivity",
        icon: "/product/android/benifits/tune.svg",
        content: "Frequent digital interruptions reduce your productivity by 40% and it takes around 20 minutes to regain your focus after a distraction. BlockP helps to reduce exposure to not just porn but other distractions like social media to help you stay focused and productive."
    },
    {
        title: "Prevent Addiction",
        icon: "/product/android/benifits/favorite.svg",
        content: "Nearly 65% of all our daily actions are driven by habit. Easy access to porn reinforces habitual use which can turn addictive. BlockP helps to break the urge-action cycle and reduces cravings."
    },
    {
        title: "Prevent Trauma",
        icon: "/product/android/benifits/blocklist.svg",
        content: "Over 85% of teens use an iPhone and 71% of young adults are exposed to pornography online on social media and search results. BlockP keeps them safe from the trauma of accidental exposure to porn, nudity, and semi-nude content on their iPhones."
    },
    {
        title: "Improve Sleep Quality",
        icon: "/product/android/benifits/handshake.svg",
        content: "Watching stimulating content like porn on your iPhone before bedtime disrupts your sleep cycles. BlockP supports deeper and restful sleep by blocking late-night triggers that keep you awake."
    },
    {
        title: "Healthy Digital Habits",
        icon: "/product/android/benifits/focus.svg",
        content: "People spend more than 7 hours per day looking at screens, much of it in mindless scrolling and distractions. BlockP helps you learn intentional digital habits with its screen time management features."
    }
]

export function IosBenefitsSection({ data }: { data?: { sectionTitle?: string; items?: { title?: string; iconPath?: string; description?: string }[] } }) {
    const title = data?.sectionTitle || "Benefits of Using BlockP: Porn Blocker for iPhone"
    const benefitsToUse = data?.items && data.items.length > 0
        ? data.items.map(b => ({
            title: b.title || '',
            icon: b.iconPath || "/product/android/benifits/network.svg",
            content: <>{b.description}</>
        }))
        : BENEFITS

    return (
        <section className="w-full bg-[#F6FAFF] py-24 md:py-32 relative z-20">
            <div className="w-full max-w-site px-6 lg:px-16 mx-auto flex flex-col items-center">
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
