'use client';

import { useState } from 'react';
import { use } from 'react';
import { BackButton } from '@/components/shared/BackButton';
import { getPageTranslations } from '@/lib/pageTranslations';
import { resolveLocale } from '@/lib/seo/metadata';

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`w-full bg-white border border-[#0076F4]/20 rounded-[25px] transition-all duration-300 overflow-hidden shadow-[0px_0px_20px_rgba(0,118,244,0.08)] ${isOpen ? 'shadow-[0px_0px_30px_rgba(0,118,244,0.12)]' : ''}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-8 py-7 flex items-center justify-between text-left group"
            >
                <span className="text-[20px] md:text-[26px] font-black text-[#012955]">{question}</span>
                <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M6 9L12 15L18 9" stroke="#012955" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </button>
            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-8 pb-8 text-[18px] md:text-[20px] font-medium text-[#012955] leading-relaxed border-t border-[#E8F2FF] pt-6">
                    {answer}
                </div>
            </div>
        </div>
    );
}

export default function FAQsPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = use(params);
    const locale = resolveLocale(lang);
    const t = getPageTranslations(locale);

    return (
        <div className="w-full flex flex-col items-center bg-[#F6FAFF]">
            <div className="w-full max-w-site px-[12px] lg:px-[40px]">
                <section className="relative pt-[200px] pb-32 w-full flex flex-col items-center">
                    <BackButton
                        className="absolute left-0 top-[205px] text-[#012955] hover:opacity-70 transition-opacity"
                        fallbackHref="/"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </BackButton>

                    <div className="flex flex-col items-center w-full">
                        <header className="mb-20 text-center">
                            <h1 className="text-[54px] md:text-[80px] font-black text-[#012955] leading-tight">
                                {t.faqsTitle}
                            </h1>
                        </header>

                        <div className="w-full space-y-6">
                            {t.faqItems.map((faq, idx) => (
                                <FAQItem key={idx} question={faq.q} answer={faq.a} />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
