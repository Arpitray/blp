
import Image from 'next/image';
import Link from 'next/link';
import { FooterData } from '@/lib/types/site';

interface NormalisedBadge {
    label: string;
    imageUrl: string;
    linkUrl: string | null;
    isQR: boolean;
}

function normaliseBadges(footerData: FooterData): NormalisedBadge[] {
    const badges: NormalisedBadge[] = [];

    // Hardcoding as requested by the user
    badges.push({
        label: footerData.qrCode?.text ?? 'Scan to download',
        imageUrl: '/blog/BlockP QR code 3.svg',
        linkUrl: null,
        isQR: true,
    });

    badges.push({
        label: 'BlockP for Mac OS',
        imageUrl: '/download mac.svg',
        linkUrl: 'https://apps.apple.com',
        isQR: false,
    });

    badges.push({
        label: 'BlockP for Chrome',
        imageUrl: '/blog/chrome web.svg', // using chrome since typical 3rd is chrome store
        linkUrl: 'https://chrome.google.com/webstore',
        isQR: false,
    });

    return badges;
}

interface FooterBadgesProps {
    footerData: FooterData;
}

export default function FooterBadges({ footerData }: FooterBadgesProps) {
    const badges = normaliseBadges(footerData);

    // Nothing to render — hide section entirely
    if (badges.length === 0) return null;

    return (
        <div>
            <div className="flex flex-wrap items-end gap-x-12 gap-y-10">
                {badges.map((badge, i) => {
                    const imageElement = badge.isQR ? (
                        // QR code: white padded card, fixed square size
                        <div className="bg-white p-3 rounded-2xl shadow-xl w-[140px] h-[140px] flex items-center justify-center flex-shrink-0">
                            <Image
                                src={badge.imageUrl}
                                alt={badge.label || 'QR Code'}
                                width={120}
                                height={120}
                                className="object-contain w-full h-full"
                            />
                        </div>
                    ) : (
                        // Store badge: fixed height, auto width
                        <Image
                            src={badge.imageUrl}
                            alt={badge.label || 'Download'}
                            width={200}
                            height={56}
                            className="h-[56px] w-auto object-contain"
                        />
                    );

                    return (
                        <div key={i} className="flex flex-col items-start justify-end gap-4 group">
                            {/* Wrap in Link only if linkUrl exists */}
                            <div className="h-[140px] flex items-end justify-start">
                                {badge.linkUrl ? (
                                    <Link
                                        href={badge.linkUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:scale-105 transition-transform duration-200 block"
                                    >
                                        {imageElement}
                                    </Link>
                                ) : (
                                    <div>{imageElement}</div>
                                )}
                            </div>

                            {/* Label below image */}
                            {badge.label && (
                                <span className="text-[18px] opacity-80 group-hover:opacity-100 transition-opacity whitespace-nowrap text-left">
                                    {badge.label}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}