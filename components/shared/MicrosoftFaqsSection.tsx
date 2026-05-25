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

export function MicrosoftFaqsSection({ data }: { data?: { sectionTitle?: string; faqs?: { question?: string; answer?: string }[] } }) {
    const title = data?.sectionTitle || "FAQs on BlockP: Porn Blocker for Windows"
    const faqsToUse = data?.faqs && data.faqs.length > 0
        ? data.faqs.map(f => ({ q: f.question || '', a: f.answer || '' }))
        : [
            {
                q: "How to block porn sites on Windows",
                a: "You can block porn sites on your mobile by downloading the BlockP free porn blocker software for Windows from our website."
            },
            {
                q: "What is the best free porn blocker for Windows?",
                a: "BlockP is the best free porn blocker that supports porn blocking across browsers and apps."
            },
            {
                q: "Can BlockP block content in incognito mode?",
                a: "Yes. BlockP can block explicit content even if you are using incognito mode."
            },
            {
                q: "Is using a blocker a good step toward self-control?",
                a: "Yes. BlockP features like whitelisting and social media blocking are designed to support your self-control and focus when you are online."
            },
            {
                q: "How does blocking triggers improve focus and productivity?",
                a: "Triggers are mental distractions that make behaviors automatic. When the triggers are blocked, you can break the habit loop to make better decisions."
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
