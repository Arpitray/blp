const TERMS_RAW = `Terms and Condition
Last Updated: 20-02-2024
Welcome to BlockP! These Terms of Service ("Terms") govern your access to and use of the BlockP, as well as any content, features, or services provided by BlockP (collectively, the "Services").
1. Acceptance of Terms
By accessing or using the Services, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you may not access or use the Services.
2. Privacy Policy
Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and disclose information about you when you access or use the Services.
3. User Accounts
You agree to use the Services only for lawful purposes and in accordance with these Terms. You may not use the Services in any manner that could damage, disable, overburden, or impair the Services or interfere with any other party's use and enjoyment of the Services.
4. Use of the Services
You may need to create an account to access certain features of the Services. When creating an account, you agree to provide accurate, current, and complete information about yourself. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
5. Intellectual Property
All content, features, and functionality available through the Services are the property of BlockP or its licensors and are protected by copyright, trademark, and other intellectual property laws. You may not modify, reproduce, distribute, or create derivative works based on any content available through the Services without the express written consent of BlockP.
6. Third-Party Services
The Services may integrate with or provide links to third-party services or websites. BlockP is not responsible for the content or practices of any third-party services or websites, and your access to and use of such services or websites is at your own risk.
7. Modifications to the Services
BlockP reserves the right to modify or discontinue the Services at any time without notice. BlockP shall not be liable to you or any third party for any modification, suspension, or discontinuation of the Services.
8. Termination
BlockP may terminate or suspend your access to the Services at any time, with or without cause, and without prior notice. Upon termination or suspension, your right to access the Services will immediately cease, and you must cease all use of the Services.
9. Disclaimer of Warranties
THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. BLOCKP DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS OR IMPLIED, INCLUDING THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
10. Limitation of Liability
TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL BLOCKP OR ITS AFFILIATES, LICENSORS, OR SERVICE PROVIDERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOST PROFITS, LOSS OF DATA, OR LOSS OF USE, ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE USE OF OR INABILITY TO USE THE SERVICES.
11. Governing Law
These Terms shall be governed by and construed in accordance with the laws of Jurisdiction, without regard to its conflict of law principles.
12. Changes to These Terms
BlockP reserves the right to modify or update these Terms at any time, in its sole discretion. If we make material changes to these Terms, we will notify you by email or by posting a notice on the App. Your continued use of the Services after the effective date of any such changes constitutes your acceptance of the revised Terms.
13. Cancellation and Refund Policy
At BlockP, we are committed to helping you build a focused, distraction-free digital life. If you are not satisfied with your premium purchase, we are here to help. You may request a cancellation or refund within 7 days of your purchase. To initiate the process, please contact us at support@blockp.in with your registered email ID, payment details, and reason for the refund or cancellation. Refunds are processed to the original payment method within 5-7 business days after approval.
Please note:
Refunds are not applicable if substantial usage of the premium features is detected.
After 7 days, all purchases are considered final and non-refundable.
Subscriptions canceled after renewal will remain active until the end of the billing period and will not be refunded.
For any queries, reach out to us at support@blockp.in. We are here to support your journey.
14. Contact Us
If you have any questions about these Terms or the Services, please contact us at: contact@novafocus.in
By accessing or using the Services, you agree to these Terms. Thank you for using BlockP!`

type PolicyBlock = {
    kind: 'heading' | 'paragraph'
    text: string
}

function parsePolicy(raw: string): { title: string; lastUpdated: string; blocks: PolicyBlock[] } {
    const lines = raw
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)

    const [title = 'Terms and Conditions', updated = 'Last Updated', ...body] = lines

    const blocks: PolicyBlock[] = body.map((line) => {
        if (/^\d+\.\s+/.test(line)) {
            return { kind: 'heading', text: line }
        }

        return { kind: 'paragraph', text: line }
    })

    return { title, lastUpdated: updated, blocks }
}

export default function TermsAndConditionsPage() {
    const { title, lastUpdated, blocks } = parsePolicy(TERMS_RAW)

    return (
        <section className="w-full px-6 pb-24 pt-[140px] md:px-10 md:pb-28">
            <div className="mx-auto w-full max-w-[1200px] rounded-[28px] bg-[rgba(246,250,255,0.72)] p-6 shadow-[0px_4px_20px_0px_rgba(0,118,244,0.10)] md:p-10">
                <header className="mb-9 text-center md:mb-10">
                    <h1 className="text-[36px] font-black leading-[1.12] text-brand-primary md:text-[54px]">{title}</h1>
                    <p className="mt-4 text-[20px] font-extrabold text-brand-primary md:mt-5 md:text-[30px]">{lastUpdated}</p>
                </header>

                <article className="space-y-5 text-[18px] font-medium leading-[1.58] text-brand-primary md:space-y-6 md:text-[24px]">
                    {blocks.map((block, index) =>
                        block.kind === 'heading' ? (
                            <h2 key={`heading-${index}`} className="pt-2 text-[28px] font-black leading-[1.24] text-brand-primary md:pt-3 md:text-[38px]">
                                {block.text}
                            </h2>
                        ) : (
                            <p key={`paragraph-${index}`}>{block.text}</p>
                        )
                    )}
                </article>
            </div>
        </section>
    )
}
