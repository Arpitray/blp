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

export function MacosFaqsSection({ data }: { data?: { sectionTitle?: string; faqs?: { question?: string; answer?: string }[] } }) {
    const title = data?.sectionTitle || "FAQs on BlockP: Porn Blocker for MacBook"
    const faqsToUse = data?.faqs && data.faqs.length > 0
        ? data.faqs.map(f => ({ q: f.question || '', a: f.answer || '' }))
        : [
            {
                q: "How do I block porn websites on my MacBook for free?",
                a: "You can block porn on Mac using built-in browser restrictions. If you want more reliable and real-time porn blocking, you can install BlockP porn blocker for MacBook. It uses AI-powered filters to block porn and also lets you add any website of your choice to the blacklist."
            },
            {
                q: "Can I block specific websites on Blockp for MacBook?",
                a: "Yes. You can add any specific website or keyword (unrelated to porn also) that you want to block to BlockP’s custom blocklist."
            },
            {
                q: "Can BlockP block adult websites instantly on MacBook?",
                a: "Yes. You can block adult websites instantly by activating the ‘Limit adult content’ on the BlockP dashboard."
            },
            {
                q: "Is BlockP safe to use on MacBook?",
                a: "BlockP is a device-based porn blocker, so your personal information and browsing data will not be shared with any external servers or third parties."
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
