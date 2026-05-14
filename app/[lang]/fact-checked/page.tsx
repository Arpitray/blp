const FACT_CHECKED_RAW = `Fact checked
- At BlockP, we prioritize accuracy, psychological research, and evidence-based insights.
- Our content is carefully reviewed and backed by reputable sources, including peer-reviewed studies, mental health research, behavioral science findings, and trusted academic institutions. We aim to provide practical, science-supported guidance to help individuals struggling with porn addiction, compulsive behaviors, and self-control challenges.
- Whenever applicable, references and research sources are cited within the article to maintain transparency and credibility.
- If you notice any inaccuracies or have concerns about our content, we encourage you to reach out through the comment section or contact form. Your feedback helps us maintain high standards.
- Our goal is to empower you with reliable information so you can make informed decisions about your digital habits, mental wellbeing, and personal growth.
Disclaimer: The information provided on BlockP is for educational and informational purposes only. It is not intended to replace professional medical, psychological, or psychiatric advice. Always consult a qualified healthcare or mental health professional for personalized guidance.`

import { BackButton } from '@/components/shared/BackButton';
import { resolveLocale } from '@/lib/seo/metadata';

type FactBlock = {
    kind: 'paragraph' | 'list-item' | 'disclaimer'
    text: string
}

function parseFactContent(raw: string): { title: string; blocks: FactBlock[] } {
    const lines = raw
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)

    const [title = 'Fact checked', ...body] = lines

    const blocks: FactBlock[] = body.map((line) => {
        if (line.startsWith('- ')) {
            return { kind: 'list-item', text: line.slice(2) }
        }
        if (line.startsWith('Disclaimer:')) {
            return { kind: 'disclaimer', text: line }
        }
        return { kind: 'paragraph', text: line }
    })

    return { title, blocks }
}

export default async function FactCheckedPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale = resolveLocale(lang);
    const { title, blocks } = parseFactContent(FACT_CHECKED_RAW)

    return (
        <div className="w-full flex flex-col items-center bg-[#F6FAFF]">
            <div className="w-full max-w-site px-[12px] lg:px-[40px]">
                <section className="relative pt-[200px] pb-24 w-full flex flex-col items-center">
                    {/* Back Button */}
                    <BackButton 
                        className="absolute left-[12px] lg:left-[32px] top-[205px] text-[#002954] hover:opacity-70 transition-opacity"
                        fallbackHref="/"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </BackButton>

                    <div className="flex flex-col items-center w-full max-w-[1200px]">
                        <header className="mb-24 text-center">
                            <h1 className="text-[40px] md:text-[56px] font-black text-[#002954] leading-tight mb-8">
                                {title}
                            </h1>
                        </header>

                        <article className="w-full text-[18px] md:text-[22px] leading-[1.6] text-[#002954] font-medium space-y-10">
                            {blocks.map((block, index) => {
                                if (block.kind === 'list-item') {
                                    return (
                                        <div key={index} className="flex gap-4">
                                            <span className="flex-shrink-0 mt-[2px] text-[24px]">•</span>
                                            <p>{block.text}</p>
                                        </div>
                                    );
                                }

                                if (block.kind === 'disclaimer') {
                                    const parts = block.text.split(':');
                                    return (
                                        <p key={index} className="pt-8">
                                            <span className="font-bold">{parts[0]}:</span>{parts.slice(1).join(':')}
                                        </p>
                                    );
                                }

                                return <p key={index}>{block.text}</p>;
                            })}
                        </article>
                    </div>
                </section>
            </div>
        </div>
    );
}
