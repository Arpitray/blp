
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

    // QR code first (leftmost, matching Figma)
    if (footerData.qrCode?.imageUrl) {
        badges.push({
            label: footerData.qrCode.text ?? 'Scan to download',
            imageUrl: footerData.qrCode.imageUrl,
            linkUrl: footerData.qrCode.linkUrl ?? null, // QR may not have a deep link
            isQR: true,
        });
    }

    // Remaining download badges
    for (const badge of footerData.downloadBadges ?? []) {
        if (!badge?.badgeUrl) continue; // skip items with no image
        badges.push({
            label: badge.label ?? '',
            imageUrl: badge.badgeUrl,
            linkUrl: badge.url ?? null,
            isQR: false,
        });
    }

    return badges;
}

interface FooterBadgesProps {
    footerData: FooterData;
}

export default function FooterBadges({ footerData }: FooterBadgesProps) {
    const badges = normaliseBadges(footerData);

    // Nothing to render — hide section entirely, including the border-top
    if (badges.length === 0) return null;

    return (
        <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex flex-wrap items-end gap-x-12 gap-y-10">
                {badges.map((badge, i) => {
                    const imageElement = badge.isQR ? (
                        // QR code: white padded card, fixed square size
                        <div className="bg-white p-3 rounded-2xl shadow-xl w-[120px] h-[120px] flex items-center justify-center flex-shrink-0">
                            <Image
                                src={badge.imageUrl}
                                alt={badge.label || 'QR Code'}
                                width={100}
                                height={100}
                                className="object-contain w-full h-full"
                            />
                        </div>
                    ) : (
                        // Store badge: fixed height, auto width
                        <Image
                            src={badge.imageUrl}
                            alt={badge.label || 'Download'}
                            width={180}
                            height={52}
                            className="h-[52px] w-auto object-contain"
                        />
                    );

                    return (
                        <div key={i} className="flex flex-col items-start gap-3 group">
                            {/* Label above image */}
                            {badge.label && (
                                <span className="text-[14px] font-semibold opacity-60 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {badge.label}
                                </span>
                            )}

                            {/* Wrap in Link only if linkUrl exists */}
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
                    );
                })}
            </div>
        </div>
    );
}