import React from 'react'

const CARDS = [
    {
        content: (
            <>
                Data from adult websites shows that <span className="underline decoration-1 underline-offset-2">87%</span> of porn watching happens on phones. BlockP adds a digital barrier to prevent this rampant access.
            </>
        ),
    },
    {
        content: (
            <>
                <span className="underline decoration-1 underline-offset-2">70%</span> of teens are exposed to explicit content online, often unintentionally. BlockP’s AI-powered filters act in real time to protect the children from accidental exposure to porn.
            </>
        ),
    },
    {
        content: (
            <>
                Over <span className="underline decoration-1 underline-offset-2">85%</span> of teens own an iPhone with TikTok and Instagram as their favorite apps. The algorithms on these platforms often push explicit content in searches and reels even in restricted mode. BlockP protects your children by restricting the social media apps.
            </>
        ),
    },
    {
        content: (
            <>
                A typical tween (8 to 12 years) spends around <span className="underline decoration-1 underline-offset-2">6 hours</span> per day on their phone and the smartphone use time goes up to <span className="underline decoration-1 underline-offset-2">8 hours</span> for teens. BlockP helps parents to regulate screen time and teach healthy digital behaviors.
            </>
        ),
    },
    {
        content: (
            <>
                Digital distractions can reduce productivity by <span className="underline decoration-1 underline-offset-2">40%</span> and it takes <span className="underline decoration-1 underline-offset-2">23 minutes</span> to refocus. BlockP helps to protect you from porn and other online distractions like social media, shopping apps etc. to protect your focus and boost productivity.
            </>
        ),
    },
    {
        content: (
            <>
                Research shows that problematic porn use is strongly linked to easy and convenient access of porn on <span className="underline decoration-1 underline-offset-2">mobile phones.</span> If you are trying to quit porn, BlockP prevents easy access to porn and blocks triggering content to protect you from relapse.
            </>
        ),
    },
]

function renderFormattedText(text: string) {
    if (!text) return "";
    const parts = text.split("**");
    return parts.map((part, index) => {
        if (index % 2 === 1) {
            return (
                <span key={index} className="underline decoration-1 underline-offset-2 text-[#012955]">
                    {part}
                </span>
            );
        }
        return part;
    });
}

export function IosWhySection({ data }: { data?: { sectionTitle?: string; cards?: { text?: string }[] } }) {
    const title = data?.sectionTitle || "Why do you need Porn Blocker for iPhone?"
    const cardsToUse = data?.cards && data.cards.length > 0
        ? data.cards.map(c => ({ content: <>{renderFormattedText(c.text || '')}</> }))
        : CARDS

    return (
        <section className="w-full bg-[#F6FAFF] py-24 md:py-32 relative z-20">
            <div className="w-full max-w-site px-[12px] lg:px-[40px] mx-auto flex flex-col items-center">
                <h2 className="text-[32px] md:text-[48px] lg:text-[54px] font-black text-[#012955] text-center mb-16 md:mb-24 leading-[1.2]">
                    {title}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full">
                    {cardsToUse.map((card, idx) => (
                        <div 
                            key={idx} 
                            className="bg-[#e3efff] rounded-[20px] md:rounded-[24px] p-8 md:p-10 shadow-[0_10px_16px_-6px_#c4defd] flex items-center"
                        >
                            <p className="text-[16px] md:text-[18px] lg:text-[20px] text-[#012955] font-medium leading-[1.6]">
                                {card.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
