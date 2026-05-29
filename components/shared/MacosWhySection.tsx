import React from 'react'

const CARDS = [
    {
        content: (
            <>
                <span className="underline decoration-1 underline-offset-2">60%</span> of people admit to watching porn at work. If you are struggling with porn addiction and it's affecting your work performance, BlockP porn blocker for MacBook, will help eliminate the distraction of porn.
            </>
        ),
    },
    {
        content: (
            <>
                <span className="underline decoration-1 underline-offset-2">More than 50%</span> of remote workers admit to watching porn on the same device they use for work. BlockP reduces triggers and distractions to prevent impulsive browsing during work hours.
            </>
        ),
    },
    {
        content: (
            <>
                <span className="underline decoration-1 underline-offset-2">20%</span> of the desktop traffic on adult websites comes from macOS devices and mostly through browsers other than Safari. BlockP filters porn across all major browsers for complete protection from porn.
            </>
        ),
    },
    {
        content: (
            <>
                <span className="underline decoration-1 underline-offset-2">More than 65%</span> of our daily actions are habit-driven and happen on autopilot. BlockP adds a layer of friction that prevents automatic behavior triggered by digital cues.
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

export function MacosWhySection({ data }: { data?: { sectionTitle?: string; cards?: { text?: string }[] } }) {
    const title = data?.sectionTitle || "Why do you need a Porn Blocker for Mac?"
    const cardsToUse = data?.cards && data.cards.length > 0
        ? data.cards.map(c => ({ content: <>{renderFormattedText(c.text || '')}</> }))
        : CARDS

    return (
        <section className="w-full bg-[#F6FAFF] py-24 md:py-32 relative z-20">
            <div className="w-[94%] lg:w-[90%] max-w-[1500px] mx-auto mx-auto flex flex-col items-center">
                <h2 className="text-[32px] md:text-[48px] lg:text-[54px] font-black text-[#012955] text-center mb-16 md:mb-24 leading-[1.2]">
                    {title}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full">
                    {cardsToUse.map((card, idx) => (
                        <div 
                            key={idx} 
                            className="bg-[#e3efff] rounded-[20px] md:rounded-[24px] p-8 md:p-10 shadow-[0_10px_16px_-6px_#c4defd] flex flex-col justify-center"
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
