const PRIVACY_RAW = `BlockP Privacy Policy
Last updated: 17 February, 2024
This privacy policy ("Policy") explains how BlockP ("we," "us," "our") collects, uses, shares, and protects personal information collected through use of our Chrome extension.
1. No direct collection of browsing history: BlockP does not directly collect or store your browsing history. Your web visits and pages viewed are not recorded.
2. Blocked website data: In order to fulfill its intended function, BlockP requires a list of websites, domains, and keywords you have chosen to block. This data is stored locally on your device.
3. Technical information: We may collect non-personally identifiable technical data for the purpose of improving BlockP. This might include browser version, operating system, and screen resolution.
4. Usage data: To improve our understanding of BlockP's features, we may collect anonymized usage data, such as the number of active blocks configured and general feature interaction.
Information we collect
- How we use information providing the BlockP service: We use the information collected primarily to enable the website, content, and keyword blocking functionality within the BlockP extension.
- Extension improvement: We may use technical and usage data to enhance features, detect malfunctions, and optimize the performance of BlockP.
- Support: Technical information may help us troubleshoot issues you encounter with the BlockP extension.
How we share information
- No data sharing: BlockP does not sell or share personal information with third parties for commercial purposes.
- Legal compliance: We may disclose information where required to do so by law, subpoenas, or in situations where failure to disclose could lead to harm to yourself or others.
- Security measures: Your blacklist data is stored locally on your device. You may modify or remove this information at any time through the BlockP settings.
- Information management: We take measures to secure your blocked website list, however, no data transmission over the internet can be guaranteed to be entirely secure. While we make an effort to protect your information, you use BlockP at your own risk.
- Children's privacy: BlockP may be used to protect children under the age of 13. However, we do not knowingly collect personal information directly from children in that age group.
- Contact us: This policy may change over time. Please refer to the "Last Updated" date for the most recent changes. Major changes will be prominently announced within the BlockP extension or via email if an address has been provided.
- Policy updates: If you have questions or concerns about this privacy policy, please contact us at: contact@focustechs.in`

import { BackButton } from '@/components/shared/BackButton';
import { getPageTranslations } from '@/lib/pageTranslations';
import { resolveLocale } from '@/lib/seo/metadata';

type PolicyBlock = {
    kind: 'heading' | 'paragraph' | 'sub-heading'
    text: string
}

function parsePolicy(raw: string): { title: string; lastUpdated: string; blocks: PolicyBlock[] } {
    const lines = raw
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)

    const [title = 'BlockP Privacy Policy', updated = 'Last updated: 17 February, 2024', ...body] = lines

    const blocks: PolicyBlock[] = body.map((line) => {
        if (line === 'Information we collect' || line === 'How we share information') {
            return { kind: 'sub-heading', text: line }
        }
        if (/^\d+\.\s+/.test(line) || line.startsWith('- ')) {
            return { kind: 'heading', text: line }
        }
        return { kind: 'paragraph', text: line }
    })

    return { title, lastUpdated: updated, blocks }
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale = resolveLocale(lang);
    const t = getPageTranslations(locale);
    const { title, lastUpdated, blocks } = parsePolicy(PRIVACY_RAW)

    return (
        <div className="w-full flex flex-col items-center bg-[#F6FAFF]">
            <div className="w-full max-w-site px-[12px] lg:px-[40px]">
                <section className="relative pt-[160px] pb-24 w-full flex flex-col items-center">
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
                        <header className="mb-16 text-center">
                            <h1 className="text-[40px] md:text-[56px] font-black text-[#002954] leading-tight mb-8">
                                {title}
                            </h1>
                            <p className="text-[16px] md:text-[18px] font-bold text-[#002954] opacity-80">
                                {lastUpdated}
                            </p>
                        </header>

                        <article className="w-full text-[16px] md:text-[18px] leading-normal text-[#002954] font-medium space-y-6">
                            {blocks.map((block, index) => {
                                if (block.kind === 'sub-heading') {
                                    return (
                                        <h2 key={index} className="text-[28px] md:text-[32px] font-black text-[#002954] pt-4">
                                            {block.text}
                                        </h2>
                                    );
                                }

                                if (block.kind === 'heading') {
                                    // Remove bullet dash if it exists for rendering
                                    const cleanText = block.text.startsWith('- ') ? block.text.slice(2) : block.text;
                                    
                                    // Handle colon bolding
                                    const parts = cleanText.split(':');
                                    if (parts.length > 1) {
                                        return (
                                            <div key={index} className="flex gap-3">
                                                {block.text.startsWith('- ') && <span className="flex-shrink-0 mt-[2px]">•</span>}
                                                <p>
                                                    <span className="font-medium">{parts[0]}:</span>{parts.slice(1).join(':')}
                                                </p>
                                            </div>
                                        );
                                    }
                                    return (
                                        <div key={index} className="flex gap-3">
                                            {block.text.startsWith('- ') && <span className="flex-shrink-0 mt-[2px]">•</span>}
                                            <p className="font-medium">{cleanText}</p>
                                        </div>
                                    );
                                }

                                // Handle specific link for contact email
                                if (block.text.includes('contact@focustechs.in')) {
                                    const parts = block.text.split('contact@focustechs.in');
                                    return (
                                        <p key={index}>
                                            {parts[0]}
                                            <a href="mailto:contact@focustechs.in" className="font-bold hover:underline">contact@focustechs.in</a>
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
