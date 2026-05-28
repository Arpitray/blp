'use client';

import { useState } from 'react';
import { BackButton } from '@/components/shared/BackButton';
import { getPageTranslations } from '@/lib/pageTranslations';

interface AddictionTestClientProps {
    locale: string;
}

export default function AddictionTestClient({ locale }: AddictionTestClientProps) {
    const t = getPageTranslations(locale);
    const [answers, setAnswers] = useState<Record<number, string>>({});

    const handleAnswer = (idx: number, value: string) => {
        setAnswers(prev => ({ ...prev, [idx]: value }));
    };

    return (
        <div className="w-full flex flex-col items-center bg-[#F6FAFF]">
            <div className="w-[92%] lg:w-[88%] max-w-[1400px] mx-auto">
                <section className="relative pt-[200px] pb-24 w-full flex flex-col items-center">
                    <BackButton
                        className="absolute left-[12px] lg:left-[32px] top-[205px] text-[#002954] hover:opacity-70 transition-opacity"
                        fallbackHref="/"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </BackButton>

                    <div className="flex flex-col items-center w-full max-w-[1200px]">
                        <header className="mb-16 w-full">
                            <h1 className="text-[40px] md:text-[64px] font-black text-[#012955] leading-tight mb-8 text-center">
                                {t.addictionTestTitle}
                            </h1>
                            <p className="text-[18px] md:text-[22px] font-medium text-[#012955] leading-relaxed text-left">
                                {t.addictionTestIntro}
                            </p>
                        </header>

                        <div className="w-full text-[#012955] space-y-8">
                            <div className="space-y-6">
                                <h2 className="text-[28px] md:text-[34px] font-black">{t.addictionTestBeforeTitle}</h2>
                                <p className="font-medium text-[18px] md:text-[20px]">{t.addictionTestBeforeIntro}</p>
                                <p className="font-medium text-[18px] md:text-[20px]">{t.addictionTestBeforeNote}</p>
                                <ul className="list-disc pl-6 space-y-4 font-medium text-[17px] md:text-[19px]">
                                    {t.addictionTestBeforePoints.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="space-y-12 pt-12">
                                {t.addictionTestQuestions.map((question, idx) => (
                                    <div key={idx} className="space-y-6">
                                        <h3 className="text-[20px] md:text-[24px] font-bold leading-tight">{question}</h3>
                                        <div className="flex flex-col gap-5">
                                            {['Yes', 'No'].map((opt) => (
                                                <label key={opt} className="flex items-center gap-4 cursor-pointer group">
                                                    <input
                                                        type="radio"
                                                        name={`q-${idx}`}
                                                        className="hidden"
                                                        onChange={() => handleAnswer(idx, opt.toLowerCase())}
                                                        checked={answers[idx] === opt.toLowerCase()}
                                                    />
                                                    <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${answers[idx] === opt.toLowerCase() ? 'border-[#012955] bg-[#012955]/5' : 'border-[#012955]/20 group-hover:border-[#012955]/40'}`}>
                                                        {answers[idx] === opt.toLowerCase() && <div className="w-3.5 h-3.5 rounded-full bg-[#012955]" />}
                                                    </div>
                                                    <span className="font-bold text-[18px] md:text-[20px]">{opt}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
