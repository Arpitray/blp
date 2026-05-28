import React from 'react'

const CARDS = [
    {
        content: (
            <>
                Chrome accounts for <u className="underline decoration-1 underline-offset-4">53%</u> of desktop porn browsing. As desktops are primarily used for work or study, easy access while browsing keeps the urges active and weakens self-control. BlockP protects deep focus by blocking triggering content on websites.
            </>
        ),
    },
    {
        content: (
            <>
                <u className="underline decoration-1 underline-offset-4">33%</u> of people admit to visiting adult websites on personal computers that they also use for work. BlockP prevents the blurring of boundaries between work and browser distractions.
            </>
        ),
    },
    {
        content: (
            <>
                <u className="underline decoration-1 underline-offset-4">60%</u> of people admit to watching porn at work. If you are struggling with porn addiction and it's affecting your work performance, BlockP Chrome extension will help you stay focused.
            </>
        ),
    },
    {
        content: (
            <>
                Most young people encounter porn when they are <u className="underline decoration-1 underline-offset-4">alone and at home</u>. BlockP's Chrome extension secures shared systems while browsing to prevent the trauma of accidental exposure.
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

export function ChromeWhySection({ data }: { data?: { sectionTitle?: string; cards?: { text?: string }[] } }) {
    const title = data?.sectionTitle || "Why do you Need Porn Blocker Chrome Extension?"
    const cardsToUse = data?.cards && data.cards.length > 0
        ? data.cards.map(c => ({ content: <>{renderFormattedText(c.text || '')}</> }))
        : CARDS

    return (
        <section className="w-full py-24 md:py-32 relative z-20">
            <div className="w-[92%] lg:w-[88%] max-w-[1400px] mx-auto mx-auto flex flex-col items-center">
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
