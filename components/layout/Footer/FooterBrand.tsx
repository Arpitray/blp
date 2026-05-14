
import Image from 'next/image';
import Link from 'next/link';
import { FooterData } from '@/lib/types/site';

const PLATFORM_ICONS: Record<string, string> = {
    Facebook: '/Footer-SVG/facebook.svg',
    Instagram: '/Footer-SVG/instagram.svg',
    X: '/Footer-SVG/x.svg',
    YouTube: '/Footer-SVG/youtube.svg',
    Reddit: '/Footer-SVG/reddit.svg',
    Discord: '/Footer-SVG/discord.svg',
};

// Fallback icon when platform key is missing from PLATFORM_ICONS map
function GenericIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    );
}

function EmailIcon() {
    return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    );
}

interface FooterBrandProps {
    footerData: FooterData;
}

export default function FooterBrand({ footerData }: FooterBrandProps) {
    const { logoUrl, logoTitle, description, contactEmail, socialLinks } = footerData;

    // If there is genuinely nothing to show, render nothing
    const hasAnyContent = logoUrl || logoTitle || description || contactEmail || socialLinks?.length;
    if (!hasAnyContent) return null;

    const validSocials = (socialLinks ?? []).filter(s => s?.platform);

    return (
        <div className="max-w-[500px]">
            {/* Logo — text fallback if no image */}
            {(logoUrl || logoTitle) && (
                <Link href="/" className="flex items-center gap-4 mb-8">
                    {logoUrl && (
                        <div className="w-[84px] h-[84px] flex items-center justify-center flex-shrink-0">
                            <Image
                                src={logoUrl}
                                alt={logoTitle ?? 'Logo'}
                                width={84}
                                height={84}
                                className="object-contain w-full h-full"
                            />
                        </div>
                    )}
                    {logoTitle && (
                        <span className="text-[42px] font-extrabold tracking-tight leading-none">
                            {logoTitle}
                        </span>
                    )}
                </Link>
            )}

            {/* Description */}
            {description && (
                <p className="text-[18px] leading-[1.6] opacity-85 mb-10 max-w-[450px]">
                    {description}
                </p>
            )}

            {/* Contact Email */}
            {contactEmail && (
                <div className="flex items-center gap-4 mb-10 group w-fit cursor-pointer">
                    <div className="flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                        <EmailIcon />
                    </div>
                    <a
                        href={`mailto:${contactEmail}`}
                        className="text-[18px] font-medium border-b border-transparent group-hover:border-white/40 transition-all"
                    >
                        {contactEmail}
                    </a>
                </div>
            )}

            {/* Social Icons */}
            {validSocials.length > 0 && (
                <div className="flex flex-wrap gap-5">
                    {validSocials.map((social, i) => {
                        const iconPath = PLATFORM_ICONS[social.platform];
                        const Icon = iconPath ? (
                            <Image src={iconPath} alt={social.platform} width={34} height={34} />
                        ) : (
                            <GenericIcon />
                        );

                        return social.url ? (
                            <Link
                                key={i}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.platform}
                                className="flex items-center justify-center hover:scale-110 transition-all duration-200"
                            >
                                {Icon}
                            </Link>
                        ) : (
                            // No URL — render icon without anchor
                            <div
                                key={i}
                                aria-label={social.platform}
                                className="flex items-center justify-center opacity-50"
                            >
                                {Icon}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}