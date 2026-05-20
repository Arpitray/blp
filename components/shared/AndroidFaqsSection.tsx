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

export function AndroidFaqsSection() {
    const faqs = [
        {
            q: "How to block porn sites in mobile?",
            a: "Block porn sites on your mobile with BlockP - the powerful porn blocker that instantly blocks millions of adult websites. DNS-filtering and parental control tools can also offer limited protection against porn sites."
        },
        {
            q: "How to block porn on android phone?",
            a: "Block porn and explicit content on your android phone with BlockP’s android app. It blocks all adult websites and uses AI-powered filters to block explicit content in real-time."
        },
        {
            q: "How to block porn sites permanently?",
            a: "To block porn sites permanently you need a combination of blocking with features to prevent bypass. BlockP gives you porn blocking and uninstall prevention features like password protection to block porn sites permanently."
        }
    ];

    return (
        <section className="w-full bg-[#F6FAFF] py-24 md:py-32 relative z-20">
            <div className="w-full max-w-site px-6 lg:px-16 mx-auto flex flex-col items-center">
                <h2 className="text-[32px] md:text-[48px] lg:text-[54px] font-black text-[#012955] text-center mb-16 md:mb-24 leading-[1.2]">
                    FAQs on BlockP: Free Porn Blocker<br />App for Android
                </h2>

                <div className="w-full space-y-6">
                    {faqs.map((faq, idx) => (
                        <FAQItem key={idx} question={faq.q} answer={faq.a} />
                    ))}
                </div>
            </div>
        </section>
    );
}
