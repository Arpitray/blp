const PRIVACY_RAW = `Privacy Policy
Last Updated: 22-12-2025
NovaFocus Private Limited ("NovaFocus", "we", "our", or "us") operates the BlockP mobile application ("App"), a digital wellbeing and parental control application designed to help users block access to adult content, reduce distractions, and promote healthier device usage.
We are committed to protecting your privacy. This Privacy Policy explains what data we collect, how we use it, how we protect it, and your rights.
1. Scope of This Privacy Policy
This Privacy Policy applies to:
The BlockP iOS and Android mobile applications
Related websites and services operated by NovaFocus
By installing or using BlockP, you agree to the practices described in this policy.
2. Purpose of the App
BlockP is designed to:
Block access to adult, pornographic, and harmful content
Restrict distracting or inappropriate apps
Support parental control and digital wellbeing use cases
BlockP does not function as a surveillance, monitoring, or tracking application.
3. Data We Collect
We collect only the minimum data required to provide core app functionality.
3.1 Information You Provide
Email address or account identifier (if account creation is used)
App preferences and configuration settings
Parental control or restriction settings chosen by the user
3.2 Automatically Collected Information (Limited)
App usage metadata (e.g., whether a blocked app or website was accessed)
Device status related to restriction enforcement
MDM profile installation status (installed / active / removed)
3.3 Information We Do NOT Collect
We do not collect, access, or store:
Browsing history content
Keystrokes or typed data
Messages, emails, or call logs
Photos, videos, or files
Real-time screen content
Location data (GPS or precise location)
Contacts or address book data
Advertising identifiers
4. Use of Mobile Device Management (MDM)
On supported platforms, BlockP may use Mobile Device Management (MDM) configuration profiles strictly for parental control and content restriction purposes.
MDM functionality may include:
Web content filtering at the system level
App blocking and restriction enforcement
Preventing unauthorized removal of restrictions
MDM is used only with explicit user consent and can be removed by the user at any time through device settings.
5. How We Use Your Data
We use collected data solely to:
Provide and maintain app functionality
Enforce content and app restrictions
Improve app stability and performance
Provide customer support when requested
We do not use your data for advertising, marketing, or profiling.
6. Data Sharing & Third Parties
6.1 No Data Selling or Sharing
We do not sell, rent, share, or disclose user data to third parties for:
Advertising
Marketing
Analytics
Behavioral profiling
6.2 Service Providers
Limited data may be processed by trusted infrastructure providers (e.g., cloud hosting) only to operate the service securely. These providers are contractually bound to confidentiality and data protection obligations.
7. Data Security
We use industry-standard security practices to protect your data:
Encrypted communication (HTTPS / TLS)
Secure storage with access controls
Limited internal access on a need-to-know basis
Regular security reviews and updates
Despite our best efforts, no system can guarantee 100% security. However, we continuously work to protect your information.
8. Data Retention
We retain personal data only as long as necessary to provide the service or comply with legal obligations.
Users may request deletion of their data at any time by contacting us.
9. User Consent & Transparency
Before enabling any restriction or MDM-based functionality:
We clearly explain what permissions are required
We disclose what data is used and why
Users must explicitly consent before proceeding
No restrictions are applied silently or without user action.
10. Children's Privacy
BlockP may be used by parents or guardians to protect minors.
We do not knowingly collect personal data directly from children without parental involvement.
If you believe a child's data has been collected improperly, please contact us immediately.
11. Your Rights
Depending on your jurisdiction, you may have the right to:
Access your personal data
Correct inaccurate information
Request data deletion
Withdraw consent
You can exercise these rights by contacting us at the email below.
12. Compliance & Audits
BlockP complies with applicable data protection laws and may be audited by Apple or relevant authorities to verify:
Data usage practices
Privacy commitments
Continued need for MDM capabilities
13. Changes to This Privacy Policy
We may update this Privacy Policy from time to time.
Any changes will be posted on this page with an updated "Last Updated" date.
14. Contact Us
If you have any questions or concerns about this Privacy Policy or our data practices, contact us at:
NovaFocus Private Limited
Email: support@blockp.io
Website: https://blockp.io`

type PolicyBlock = {
    kind: 'heading' | 'paragraph'
    text: string
}

function parsePolicy(raw: string): { title: string; lastUpdated: string; blocks: PolicyBlock[] } {
    const lines = raw
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)

    const [title = 'Privacy Policy', updated = 'Last Updated', ...body] = lines

    const blocks: PolicyBlock[] = body.map((line) => {
        if (/^\d+(\.\d+)?\.\s+/.test(line)) {
            return { kind: 'heading', text: line }
        }

        return { kind: 'paragraph', text: line }
    })

    return { title, lastUpdated: updated, blocks }
}

export default function PrivacyPolicyPage() {
    const { title, lastUpdated, blocks } = parsePolicy(PRIVACY_RAW)

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
