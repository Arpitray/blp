const TERMS_RAW = `Terms & Conditions
Last updated: 26 February, 2024
Welcome to BlockP! These Terms of Service ("Terms") govern your access to and use of the BlockP, as well as any content, features, or services provided by BlockP (collectively, the "Services").
1. Acceptance of terms: By accessing or using the Services, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you may not access or use the Services.
2. Privacy policy: Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and disclose information about you when you access or use the Services.
3. User accounts: You agree to use the Services only for lawful purposes and in accordance with these Terms. You may not use the Services in any manner that could damage, disable, overburden, or impair the Services or interfere with any other party's use and enjoyment of the Services.
4. Use of the Services: You may need to create an account to access certain features of the Services. When creating an account, you agree to provide accurate, current, and complete information about yourself. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
5. Intellectual property: All content, features, and functionality available through the Services are the property of BlockP or its licensors and are protected by copyright, trademark, and other intellectual property laws. You may not modify, reproduce, distribute, or create derivative works based on any content available through the Services without the express written consent of BlockP.
6. Third-party services: The Services may integrate with or provide links to third-party services or websites. BlockP is not responsible for the content or practices of any third-party services or websites, and your access to and use of such services or websites is at your own risk.
7. Modifications to the services: BlockP reserves the right to modify or discontinue the Services at any time without notice. BlockP shall not be liable to you or any third party for any modification, suspension, or discontinuation of the Services.
8. Termination: BlockP may terminate or suspend your access to the Services at any time, with or without cause, and without prior notice. Upon termination or suspension, your right to access the Services will immediately cease, and you must cease all use of the Services.
9. Disclaimer of warranties: THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. BLOCKP DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS OR IMPLIED, INCLUDING THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
10. Limitation of liability: TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL BLOCKP OR ITS AFFILIATES, LICENSORS, OR SERVICE PROVIDERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOST PROFITS, LOSS OF DATA, OR LOSS OF USE, ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE USE OF OR INABILITY TO USE THE SERVICES.
11. Governing law: These Terms shall be governed by and construed in accordance with the laws of Jurisdiction, without regard to its conflict of law principles.
12. Changes to these terms: BlockP reserves the right to modify or update these Terms at any time, in its sole discretion. If we make material changes to these Terms, we will notify you by email or by posting a notice on the App. Your continued use of the Services after the effective date of any such changes constitutes your acceptance of the revised Terms.
13. Cancellation and refund policy: At BlockP, we are committed to helping you build a focused, distraction-free digital life. If you are not satisfied with your premium purchase, we are here to help. You may request a cancellation or refund within 7 days of your purchase. To initiate the process, please contact us at support@blockp.in with your registered email ID, payment details, and reason for the refund or cancellation. Refunds are processed to the original payment method within 5-7 business days after approval. Please note:
a. Refunds are not applicable if substantial usage of the premium features is detected.
b. After 7 days, all purchases are considered final and non-refundable.
c. Subscriptions cancelled after renewal will remain active until the end of the billing period and won't be refunded.
For any queries, reach out to us at support@blockp.in. We're here to support your journey.
Contact us
If you have any questions about these Terms or the Services, please contact us at: contact@novafocus.in
By accessing or using the Services, you agree to these Terms. Thank you for using BlockP!`

import Link from 'next/link';
import { BackButton } from '@/components/shared/BackButton';
import { getPageTranslations } from '@/lib/pageTranslations';
import { resolveLocale } from '@/lib/seo/metadata';

type PolicyBlock = {
    kind: 'heading' | 'paragraph' | 'sub-point'
    text: string
}

function parsePolicy(raw: string): { title: string; lastUpdated: string; blocks: PolicyBlock[] } {
    const lines = raw
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)

    const [title = 'Terms & Conditions', updated = 'Last updated: 26 February, 2024', ...body] = lines

    const blocks: PolicyBlock[] = body.map((line) => {
        if (/^\d+\.\s+/.test(line) || line === 'Contact us') {
            return { kind: 'heading', text: line }
        }
        if (/^[a-c]\.\s+/.test(line)) {
            return { kind: 'sub-point', text: line }
        }
        return { kind: 'paragraph', text: line }
    })

    return { title, lastUpdated: updated, blocks }
}

export default async function TermsAndConditionsPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale = resolveLocale(lang);
    const t = getPageTranslations(locale);
    const { lastUpdated, blocks } = parsePolicy(TERMS_RAW)

    return (
        <div className="w-full flex flex-col items-center bg-[#F6FAFF]">
            <div className="w-full max-w-site px-[12px] lg:px-[40px]">
                <section className="relative pt-[160px] pb-24 w-full flex flex-col items-center">
                    {/* Back Button - Aligned with BlockP logo in header (pl-20/pl-32) */}
                    <BackButton 
                        className="absolute left-[12px] lg:left-[32px] top-[205px] text-[#002954] hover:opacity-70 transition-opacity"
                        fallbackHref="/"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </BackButton>

                    <div className="flex flex-col items-center w-full max-w-[1200px]">
                        <header className="mb-16 text-center">
                        <h1 className="text-[40px] md:text-[56px] font-black text-[#002954] leading-tight mb-8">
                            {t.termsTitle}
                        </h1>
                        <p className="text-[16px] md:text-[18px] font-bold text-[#002954] opacity-80">
                            {lastUpdated}
                        </p>
                    </header>

                    <article className="w-full text-[18px] md:text-[20px] leading-normal text-[#002954] font-medium space-y-6">
                        {blocks.map((block, index) => {
                            if (block.kind === 'heading') {
                                if (block.text === 'Contact us') {
                                    return (
                                        <h2 key={index} className="text-[28px] md:text-[32px] font-black text-[#002954] pt-4">
                                            {block.text}
                                        </h2>
                                    );
                                }
                                // Handle numbered sections: bold the "Number. Title:" part
                                const parts = block.text.split(':');
                                if (parts.length > 1) {
                                    return (
                                        <p key={index}>
                                            <span className="font-medium">{parts[0]}:</span>{parts.slice(1).join(':')}
                                        </p>
                                    );
                                }
                                return <p key={index} className="font-medium">{block.text}</p>;
                            }

                            if (block.kind === 'sub-point') {
                                const letter = block.text.slice(0, 2);
                                const content = block.text.slice(3);
                                return (
                                    <div key={index} className="flex gap-2 pl-5 -mt-4">
                                        <span>{letter}</span>
                                        <span>{content}</span>
                                    </div>
                                );
                            }

                            // Handle specific link for contact email
                            if (block.text.includes('contact@novafocus.in')) {
                                const parts = block.text.split('contact@novafocus.in');
                                return (
                                    <p key={index}>
                                        {parts[0]}
                                        <a href="mailto:contact@novafocus.in" className="font-bold hover:underline">contact@novafocus.in</a>
                                        {parts[1]}
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
