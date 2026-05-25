'use client';

import React, { useState } from 'react';

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`w-full bg-white rounded-[25px] border-0 border-none transition-all duration-300 overflow-hidden shadow-[0_10px_16px_-6px_#c4defd] ${isOpen ? 'shadow-[0_14px_20px_-6px_#c4defd]' : ''}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-8 py-7 flex items-center justify-between text-left group border-none border-0 outline-none focus:outline-none focus:ring-0"
            >
                <span className="text-[20px] md:text-[26px] font-black text-[#012955]">{question}</span>
                <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M6 9L12 15L18 9" stroke="#012955" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </button>
            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-8 pb-8 text-[18px] md:text-[20px] font-medium text-[#012955] leading-relaxed pt-6 border-none border-0">
                    {answer}
                </div>
            </div>
        </div>
    );
}

export function ChromeFaqsSection({ data }: { data?: { sectionTitle?: string; faqs?: { question?: string; answer?: string }[] } }) {
    const title = data?.sectionTitle || "FAQs on BlockP: Porn Blocker\nChrome extension"
    const faqsToUse = data?.faqs && data.faqs.length > 0
        ? data.faqs.map(f => ({ q: f.question || '', a: f.answer || '' }))
        : [
            {
                q: "How to Block Porn on Chrome For Free?",
                a: "Install the BlockP Chrome extension. You can block porn for free."
            },
            {
                q: "Which is the best free porn blocker extension for teens or young adults?",
                a: "BlockP is the best free porn blocker if you are looking to protect young adults from exposure to porn and teach them healthy digital habits."
            },
            {
                q: "How to block porn sites permanently?",
                a: "You can install a porn blocker like BlockP to block porn sites permanently."
            },
            {
                q: "What does Porn Blocker chrome extension do?",
                a: "A porn blocker Chrome extension like BlockP blocks adult websites along with nude and semi-nude content."
            },
            {
                q: "Can BlockP extension help me quit porn addiction?",
                a: "Yes. BlockP helps you block porn and other sexual content that triggers relapse."
            },
            {
                q: "Does BlockP work in Incognito mode or private browsing?",
                a: "Yes. BlockP Chrome extension blocks porn in incognito mode or private browsing."
            },
            {
                q: "Does this extension block adult content on YouTube, Reddit, or Twitter?",
                a: "Yes. BlockP extension blocks content on YouTube like Shorts and other social media platforms like Reddit and Twitter."
            },
            {
                q: "Can this extension help during NoFap or digital detox journeys?",
                a: "Yes. BlockP helps you block your triggers, track your streak to stay motivated, and learn better digital habits."
            }
        ];

    return (
        <section className="w-full bg-[#F6FAFF] py-24 md:py-32 relative z-20">
            <div className="w-full max-w-site px-[12px] lg:px-[40px] mx-auto flex flex-col items-center">
                <h2 className="text-[32px] md:text-[48px] lg:text-[54px] font-black text-[#012955] text-center mb-16 md:mb-24 leading-[1.2] whitespace-pre-wrap">
                    {title}
                </h2>

                <div className="w-full space-y-6">
                    {faqsToUse.map((faq, idx) => (
                        <FAQItem key={idx} question={faq.q} answer={faq.a} />
                    ))}
                </div>
            </div>
        </section>
    );
}
