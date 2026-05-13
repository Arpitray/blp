
import { siteService } from '@/lib/container';
import { FooterData } from '@/lib/types/site';
import { DEFAULT_LANGUAGE } from '@/lib/languages';
import FooterCTA from './FooterCTA';
import FooterWave from './FooterWave';
import FooterBrand from './FooterBrand';
import FooterNav from './FooterNav';
import FooterBadges from './FooterBadges';

// Safe data fetch — never throws to the render tree
async function getFooterDataSafe(): Promise<FooterData | null> {
    try {
        return await siteService.getFooterData();
    } catch (err) {
        console.error('[Footer] Failed to fetch footer data:', err);
        return null;
    }
}

interface FooterProps {
    locale?: string;
}

export default async function Footer({ locale = DEFAULT_LANGUAGE }: FooterProps) {
    const footerData = await getFooterDataSafe();

    // Nothing from CMS — render nothing, don't break the page
    if (!footerData) return null;

    const hasBrandContent =
        footerData.logoUrl ||
        footerData.logoTitle ||
        footerData.description ||
        footerData.contactEmail ||
        footerData.socialLinks?.length;

    const hasNavContent = footerData.columns && footerData.columns.length > 0;

    const hasBadgeContent =
        footerData.qrCode?.imageUrl ||
        footerData.downloadBadges?.some(b => b?.badgeUrl);

    return (
        <>
            {/* CTA section above footer — only if data exists */}
            {footerData.cta && <FooterCTA cta={footerData.cta} />}

            {/* Wave divider — purely presentational, always rendered */}
            <FooterWave topColor="#f6faff" />


            <footer
                className="footer-gradient relative pb-20 px-6 sm:px-10 lg:px-[40px] text-white z-[60] font-anek"
                style={{ minHeight: '724px', marginTop: '-180px' }}
            >
                <div className="max-w-[1722px] w-full mx-auto pt-[250px] flex flex-col h-full">
                    <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-24">
                        {/* ── LEFT SECTION: BRAND + BADGES ── */}
                        <div className="flex flex-col gap-16 lg:gap-20">
                            {hasBrandContent && <FooterBrand footerData={footerData} />}
                            {hasBadgeContent && <FooterBadges footerData={footerData} />}
                        </div>

                        {/* ── RIGHT SECTION: NAV ── */}
                        {hasNavContent && <FooterNav columns={footerData.columns} locale={locale} />}
                    </div>

                    {/* ── COPYRIGHT ── */}
                    <div className="mt-auto pt-16 text-[13px] opacity-40 font-medium text-center md:text-left">
                        <p>
                            © {new Date().getFullYear()}
                            {footerData.logoTitle ? ` ${footerData.logoTitle}.` : '.'} All rights reserved.
                        </p>
                    </div>

                </div>
            </footer >
        </>
    );
}