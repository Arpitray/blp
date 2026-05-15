import { BackButton } from '@/components/shared/BackButton';
import { getPageTranslations } from '@/lib/pageTranslations';
import { resolveLocale } from '@/lib/seo/metadata';

// The static content blocks (English only - translated title/date come from translations)
const DATA_DELETION_BODY = [
    { kind: 'heading' as const, text: 'Introduction' },
    { kind: 'paragraph' as const, text: 'At BlockP, we prioritize your privacy and data security. We understand that you might want to delete your account and associated data from our Android app. Rest assured, the process is straightforward and designed to ensure the safety of your information.' },
    { kind: 'heading' as const, text: 'Step 1: Initiate account deletion request' },
    { kind: 'list-item' as const, text: '1. Open the BlockP app on your Android device.' },
    { kind: 'list-item' as const, text: '2. Navigate to the "Settings" or "Account" section of the app.' },
    { kind: 'heading' as const, text: 'Step 2: Send account deletion request email' },
    { kind: 'list-item' as const, text: '1. In the "Account" section, locate the "Delete My Account" option.' },
    { kind: 'list-item' as const, text: '2. Tap on the option to initiate the deletion process.' },
    { kind: 'list-item' as const, text: '3. An email draft will open up in your default email application.' },
    { kind: 'list-item' as const, text: '4. The recipient email address will already be populated: blockingsites123@gmail.com.' },
    { kind: 'list-item' as const, text: '5. Feel free to add any additional information or context to the email if you wish.' },
    { kind: 'heading' as const, text: 'Step 3: Confirm your request' },
    { kind: 'list-item' as const, text: '1. Double-check that you have accurately described your intention to delete your account and all associated data.' },
    { kind: 'list-item' as const, text: '2. Send the email to blockingsites123@gmail.com.' },
    { kind: 'heading' as const, text: 'Step 4: Processing your request' },
    { kind: 'list-item' as const, text: '1. Our technical team will review your account deletion request.' },
    { kind: 'list-item' as const, text: '2. For security purposes, we may reach out to you via email to verify your identity.' },
    { kind: 'list-item' as const, text: '3. Once your request is verified, our team will proceed with the data deletion process.' },
    { kind: 'heading' as const, text: 'Step 5: Deletion completion' },
    { kind: 'list-item' as const, text: '1. Your account and associated data will be permanently deleted from our Firebase database within 4-5 business days from the confirmation of your request.' },
    { kind: 'list-item' as const, text: '2. We will notify you via email once the process is completed.' },
    { kind: 'heading' as const, text: 'Conclusion' },
    { kind: 'paragraph' as const, text: 'At BlockP, we are committed to maintaining the security and privacy of your data. Our user-friendly process for deleting your account ensures that your information is handled with the utmost care. If you have any questions or need assistance throughout the account deletion process, please feel free to reach out to our support team at blockingsites123@gmail.com.' },
    { kind: 'paragraph' as const, text: 'Please note that while we strive to complete the process within 4-5 business days, unforeseen circumstances may occasionally cause slight delays. We appreciate your understanding and thank you for choosing BlockP for your content management needs.' },
];

export default async function DataDeletionPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale = resolveLocale(lang);
    const t = getPageTranslations(locale);

    return (
        <div className="w-full flex flex-col items-center bg-[#F6FAFF]">
            <div className="w-full max-w-site px-[12px] lg:px-[40px]">
                <section className="relative pt-[160px] pb-24 w-full flex flex-col items-center">
                    <BackButton
                        className="absolute left-[12px] lg:left-[32px] top-[205px] text-[#002954] hover:opacity-70 transition-opacity"
                        fallbackHref="/"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </BackButton>

                    <div className="flex flex-col items-center w-full max-w-[1200px]">
                        <header className="mb-16 text-center">
                            <h1 className="text-[40px] md:text-[64px] font-black text-[#012955] leading-tight mb-8 max-w-4xl">
                                {t.dataDeletionTitle}
                            </h1>
                        </header>

                        <article className="w-full text-[16px] md:text-[18px] leading-normal text-[#012955] font-medium space-y-4">
                            {DATA_DELETION_BODY.map((block, index) => {
                                if (block.kind === 'heading') {
                                    return (
                                        <h2 key={index} className="text-[28px] md:text-[32px] font-black text-[#012955] pt-6 pb-2">
                                            {block.text}
                                        </h2>
                                    );
                                }

                                if (block.kind === 'list-item') {
                                    const dotIndex = block.text.indexOf('.');
                                    const number = block.text.slice(0, dotIndex + 1);
                                    const content = block.text.slice(dotIndex + 1);
                                    return (
                                        <div key={index} className="flex gap-4 pl-4 md:pl-8">
                                            <span className="font-medium">{number}</span>
                                            <span>{content}</span>
                                        </div>
                                    );
                                }

                                if (block.text.includes('blockingsites123@gmail.com')) {
                                    const parts = block.text.split('blockingsites123@gmail.com');
                                    return (
                                        <p key={index}>
                                            {parts.map((part, i) => (
                                                <span key={i}>
                                                    {part}
                                                    {i < parts.length - 1 && (
                                                        <a href="mailto:blockingsites123@gmail.com" className="font-bold hover:underline text-brand-accent">
                                                            blockingsites123@gmail.com
                                                        </a>
                                                    )}
                                                </span>
                                            ))}
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
