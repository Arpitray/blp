import React from 'react'

const BENEFITS = [
    {
        title: "Protect Your Children",
        content: "BlockP protects your children from adult websites, explicit content, nudity, misleading ads and links that expose them to inappropriate content. It protects the mental health of your children."
    },
    {
        title: "Learn Healthy Digital Habits",
        content: "BlockP is designed to not just block porn but give you complete control over what you view on your device. You can regulate your screen time and social media use with BlockP for learning intentional digital consumption."
    },
    {
        title: "Break Porn Addiction",
        content: "BlockP is your greatest ally in quitting porn. It blocks your triggers to prevent relapse. Accountability, community support, and porn-blocking features of BlockP help you stay porn-free in the long term."
    },
    {
        title: "Improve Productivity",
        content: "BlockP helps to remove distractions like porn, social media, shopping, and gambling sites. Intentional and focused use boosts your productivity at work and studies."
    },
]

export function MicrosoftBenefitsSection({ data }: { data?: { sectionTitle?: string; items?: { title?: string; iconPath?: string; description?: string }[] } }) {
    const title = data?.sectionTitle || "Benefits of Using BlockP Porn Blocker for Windows"
    const benefitsToUse = data?.items && data.items.length > 0
        ? data.items.map(b => ({
            title: b.title || '',
            icon: b.iconPath ? (
                <img 
                    src={b.iconPath} 
                    alt={b.title || ''} 
                    className="w-[45px] h-[45px] object-contain"
                />
            ) : null,
            content: <>{b.description}</>
        }))
        : BENEFITS.map((b, idx) => ({
            title: b.title,
            icon: (
                idx === 0 ? (
                    // Protect Your Children (Baby icon)
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#012955" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[45px] h-[45px]">
                        <path d="M9 12h.01" />
                        <path d="M15 12h.01" />
                        <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
                        <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 5 6.3" />
                        <path d="M12 2v2" />
                        <path d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                    </svg>
                ) : idx === 1 ? (
                    // Learn Healthy Digital Habits (Meditation yoga icon)
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#012955" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[45px] h-[45px]">
                        <circle cx="12" cy="5" r="2" />
                        <path d="M12 7v6" />
                        <path d="M5 15c1.5-3 3-4 7-4s5.5 1 7 4" />
                        <path d="M3 18c2-1 4-1.5 9-1.5s7 .5 9 1.5" />
                        <path d="M6 18c-1.5.5-2 1.5-.5 2s6 .5 6.5.5 5 0 6.5-.5-1-1.5-.5-2" />
                    </svg>
                ) : idx === 2 ? (
                    // Break Porn Addiction (CigaretteOff icon)
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#012955" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[45px] h-[45px]">
                        <line x1="2" y1="2" x2="22" y2="22" />
                        <path d="M12 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h13" />
                        <path d="M18 12h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2" />
                        <path d="M22 8c0-1-.5-2-1-2.5" />
                        <path d="M18 8c0-1-.5-2-1-2.5" />
                    </svg>
                ) : (
                    // Improve Productivity (TrendingUp icon)
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#012955" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[45px] h-[45px]">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                        <polyline points="17 6 23 6 23 12" />
                    </svg>
                )
            ),
            content: <>{b.content}</>
        }))

    return (
        <section className="w-full bg-[#F6FAFF] py-24 md:py-32 relative z-20">
            <div className="w-[94%] lg:w-[90%] max-w-[1500px] mx-auto mx-auto flex flex-col items-center">
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
                                <div className="flex-shrink-0 w-[45px] h-[45px] flex items-center justify-center">
                                    {card.icon}
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
