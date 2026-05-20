import Image from 'next/image';
import Link from 'next/link';
import { getPageTranslations } from '@/lib/pageTranslations';
import { resolveLocale } from '@/lib/seo/metadata';
import { PremiumMascot } from '@/components/shared/PremiumMascot';

export default async function PremiumPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale = resolveLocale(lang);
    const t = getPageTranslations(locale);
    return (
        <div className="w-full overflow-hidden bg-[#F6FBFE]">
            {/* ── HERO SECTION ── */}
            <section
                className="relative w-full overflow-hidden"
                style={{
                    background: "linear-gradient(180deg, #6292FF 0%, #3572FF 100%)",
                    minHeight: "520px",
                }}
            >
                <div className="w-full max-w-site px-6 lg:px-16 mx-auto flex flex-row items-center justify-between pt-36 pb-0 relative z-20" style={{ minHeight: "1000px" }}>
                    {/* Left: Text - Centered and pushed right to match reference */}
                    <div className="flex flex-col items-center text-center translate-y-[-40px] ml-[5%] lg:ml-[14%]">
                        <h1 className="text-[84px] md:text-[150px] font-black text-white leading-[1.0] mb-12">
                            <span className="block">{t.premiumHeroTitle[0]}</span>
                            <span className="block">{t.premiumHeroTitle[1]}</span>
                        </h1>
                        <Link href="/get-started">
                            <button
                                className="bg-white text-[#002954] font-semibold text-[24px] md:text-[32px] px-24 py-3 rounded-full shadow-[0px_12px_0px_#1A3B7A] hover:translate-y-1 hover:shadow-[0px_8px_0px_#1A3B7A] transition-all duration-200 whitespace-nowrap"
                            >
                                {t.premiumHeroCta}!
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Right: Mascot — Rive animation (websitepremium.riv / PremiumScreen) */}
                <div 
                    className="absolute pointer-events-none z-5 aspect-square w-[500px] md:w-[750px] lg:w-[700px]"
                    style={{
                        bottom: '-340px',
                        right: '150px',
                    }}
                >
                    <PremiumMascot className="w-full h-full" />
                </div>

                {/* Wave separator — #F6FBFE curves UP into the blue (arch/bowl shape) */}
                <div className="absolute bottom-[-2px] left-0 w-full leading-[0] z-10">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
                        <path d="M0 120 H1440 V80 Q720 -20 0 80 Z" fill="#F6FBFE"/>
                    </svg>
                </div>
            </section>

            {/* ── DEVICES SECTION ── */}
            <section className="w-full pt-32 pb-24 flex flex-col items-center">
                <h2 className="text-[32px] md:text-[56px] font-bold text-[#012955] text-center max-w-4xl px-6 mb-24 leading-[1.2] whitespace-pre-line">
                    {t.premiumSubheading}
                </h2>

                <div className="flex flex-wrap justify-center gap-14 md:gap-32 lg:gap-44 px-6 mb-24">
                    {/* Android */}
                    <div className="flex flex-col items-center gap-5">
                        <div className="w-[60px] h-[60px] flex items-center justify-center">
                            <Image src="/premium/android.svg" alt="Android" width={60} height={60} className="object-contain" />
                        </div>
                        <span className="text-[18px] md:text-[20px] font-bold text-[#012955]">Android</span>
                    </div>

                    {/* iOS */}
                    <div className="flex flex-col items-center gap-5">
                        <div className="w-[60px] h-[60px] flex items-center justify-center">
                            <Image src="/premium/ios.svg" alt="iOS" width={60} height={60} className="object-contain" />
                        </div>
                        <span className="text-[18px] md:text-[20px] font-bold text-[#012955]">iOS</span>
                    </div>

                    {/* macOS */}
                    <div className="flex flex-col items-center gap-5">
                        <div className="w-[60px] h-[60px] flex items-center justify-center">
                            <Image src="/premium/MacOS_logo.svg" alt="macOS" width={60} height={60} className="object-contain" />
                        </div>
                        <span className="text-[18px] md:text-[20px] font-bold text-[#012955]">macOS</span>
                    </div>

                    {/* Chrome */}
                    <div className="flex flex-col items-center gap-5">
                        <div className="w-[60px] h-[60px] flex items-center justify-center">
                            <Image src="/premium/chrome.svg" alt="Chrome" width={60} height={60} className="object-contain" />
                        </div>
                        <span className="text-[18px] md:text-[20px] font-bold text-[#012955]">Chrome</span>
                    </div>

                    {/* Windows */}
                    <div className="flex flex-col items-center gap-5">
                        <div className="w-[60px] h-[60px] flex items-center justify-center">
                            <Image src="/premium/windows.svg" alt="Windows" width={60} height={60} className="object-contain" />
                        </div>
                        <span className="text-[18px] md:text-[20px] font-bold text-[#012955]">Windows</span>
                    </div>
                </div>

                <div className="w-3/4">
                    <div className="w-full h-[1.5px] bg-[#E8F2FF] font-semibold" />
                </div>
            </section>

            {/* ── PRICING SECTION ── */}
            <section className="w-full py-20  flex flex-col items-center overflow-hidden">
                <div className="w-full max-w-none px-4 md:px-12 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-4 mt-12 mb-16">

                    {/* Left: Free Forever */}
                    <div className="bg-white border-2 border-[#E1EAF6] rounded-[40px] w-full lg:w-[650px] p-8 flex flex-col h-auto lg:h-[640px] shadow-sm z-10 transition-transform">
                        <div className="text-center mb-6">
                            <h3 className="text-[48px] font-black text-[#153B62]">{t.premiumFreeForever}</h3>
                        </div>
                        <div className="w-full h-[1px] bg-[#E1EAF6] mb-8" />
                        <div className="w-full flex flex-col justify-between flex-1 text-[#153B62] pb-4">
                            <PricingFeature label={t.premiumFeatures[0]} status="check" iconPath="/premium/pricing/free/no_adult_content.svg" />
                            <PricingFeature label={t.premiumFeatures[1]} status="dash" iconPath="/premium/pricing/free/network_intel_node.svg" />
                            <PricingFeature label={t.premiumFeatures[2]} status="dash" iconPath="/premium/pricing/free/ad_off.svg" />
                            <PricingFeature label={t.premiumFeatures[3]} status="dash" iconPath="/premium/pricing/free/favorite.svg" />
                            <PricingFeature label={t.premiumFeatures[4]} status="dash" iconPath="/premium/pricing/free/tune.svg" />
                            <PricingFeature label={t.premiumFeatures[5]} status="dash" iconPath="/premium/pricing/free/devices.svg" />
                        </div>
                    </div>

                    {/* Center: Annual */}
                    <div
                        className="rounded-[40px] w-full lg:w-[730px] p-8 flex flex-col shadow-2xl text-white z-20 h-auto lg:h-[740px] relative transition-transform"
                        style={{ backgroundColor: "#608DFF" }}
                    >
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <h3 className="text-[56px] font-black">{t.premiumAnnual}</h3>
                            <span className="text-[24px] font-bold opacity-90">($10 /mo billed annually)</span>
                        </div>
                        <div className="w-full h-[1px] bg-white/20 mb-8" />
                        <div className="w-full flex flex-col justify-between flex-1 text-white pb-4">
                            <PricingFeature label={t.premiumFeatures[0]} status="check" isCenter iconPath="/premium/pricing/free/no_adult_content.svg" />
                            <PricingFeature label={t.premiumFeatures[1]} status="check" isCenter iconPath="/premium/pricing/free/network_intel_node.svg" />
                            <PricingFeature label={t.premiumFeatures[2]} status="check" isCenter iconPath="/premium/pricing/free/ad_off.svg" />
                            <PricingFeature label={t.premiumFeatures[3]} status="check" isCenter iconPath="/premium/pricing/free/favorite.svg" />
                            <PricingFeature label={t.premiumFeatures[4]} status="check" isCenter iconPath="/premium/pricing/free/tune.svg" />
                            <PricingFeature label={t.premiumFeatures[5]} status="check" isCenter iconPath="/premium/pricing/free/devices.svg" />
                            <PricingFeature label={t.premiumFeatures[6]} status="check" isCenter iconPath="/premium/pricing/free/money_off.svg" />
                        </div>
                    </div>

                    {/* Right: Monthly */}
                    <div className="bg-[#EEF4FB] border-2 border-[#E1EAF6] rounded-[40px] w-full lg:w-[650px] p-8 flex flex-col h-auto lg:h-[640px] shadow-sm z-10 transition-transform">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <h3 className="text-[48px] font-black text-[#153B62]">{t.premiumMonthly}</h3>
                            <span className="text-[24px] font-bold text-[#153B62] opacity-80">($10 /mo )</span>
                        </div>
                        <div className="w-full h-[1px] bg-[#C9D9EC] mb-8" />
                        <div className="w-full flex flex-col justify-between flex-1 text-[#153B62] pb-4">
                            <PricingFeature label={t.premiumFeatures[0]} status="check" iconPath="/premium/pricing/free/no_adult_content.svg" />
                            <PricingFeature label={t.premiumFeatures[1]} status="check" iconPath="/premium/pricing/free/network_intel_node.svg" />
                            <PricingFeature label={t.premiumFeatures[2]} status="check" iconPath="/premium/pricing/free/ad_off.svg" />
                            <PricingFeature label={t.premiumFeatures[3]} status="check" iconPath="/premium/pricing/free/favorite.svg" />
                            <PricingFeature label={t.premiumFeatures[4]} status="check" iconPath="/premium/pricing/free/tune.svg" />
                            <PricingFeature label={t.premiumFeatures[5]} status="check" iconPath="/premium/pricing/free/devices.svg" />
                        </div>
                    </div>
                </div>

                {/* CTA Button below cards */}
                <div className="mt-6 mb-8">
                    <Link href="/get-started">
                        <button
                            className="bg-[#4779FB] text-white font-semibold text-[24px] md:text-[32px] px-32 py-3 rounded-full shadow-[0px_12px_0px_#2D59D1] hover:translate-y-1 hover:shadow-[0px_8px_0px_#2D59D1] transition-all duration-200 whitespace-nowrap"
                        >
                            {t.premiumCta}!
                        </button>
                    </Link>
                </div>
            </section>

            <section className="w-full py-28 flex flex-col items-center">
                <div className="w-3/4 mb-20">
                    <div className="w-full h-[1.5px] bg-[#E8F2FF]" />
                </div>
                
                <div className="w-full max-w-7xl px-6 flex flex-col items-center text-center">
                    {/* Stars */}
                    <div className="flex gap-2 mb-10 text-[#002954]">
                        {[1,2,3,4,5].map(i => (
                            <svg key={i} width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                        ))}
                    </div>

                    <p className="text-[28px] md:text-[38px] lg:text-[42px] font-bold text-[#002954] leading-[1.3] mb-12">
                        "The best blocker app. Light on battery usage compared to competitors,
                        and powerful enough to not only block adult content but also block
                        politics and other 'toxic' stuff by adding my own custom keywords."
                    </p>

                    <div className="flex flex-col items-center gap-1">
                        <span className="text-[24px] font-black text-[#002954]">Hendjati Pravito</span>
                        <span className="text-[16px] font-bold text-[#002954]/50">BlockP User</span>
                    </div>

                    {/* Dots pagination */}
                    <div className="flex items-center gap-6 mt-16 text-[#002954]">
                        <button className="hover:opacity-60 transition-opacity">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                        </button>
                        <div className="flex gap-3">
                            <div className="w-3 h-3 rounded-full border-2 border-[#002954]/30"></div>
                            <div className="w-3 h-3 rounded-full border-2 border-[#002954]/30"></div>
                            <div className="w-3 h-3 rounded-full bg-[#012955]"></div>
                            <div className="w-3 h-3 rounded-full border-2 border-[#002954]/30"></div>
                            <div className="w-3 h-3 rounded-full border-2 border-[#002954]/30"></div>
                        </div>
                        <button className="hover:opacity-60 transition-opacity">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                        </button>
                    </div>
                </div>

                <div className="w-3/4 mt-20">
                    <div className="w-full h-[1.5px] bg-[#E8F2FF] font-bold" />
                </div>
            </section>
        </div>
    );
}

function PricingFeature({ label, status, isCenter, iconPath }: { label: string; status: 'check' | 'dash'; isCenter?: boolean; iconPath?: string }) {
    // Map feature label to specific icon roughly representing the image.
    // In actual use, strict mapping requires knowing the English label,
    // but we can use simple pattern matching to be robust against translations.
    let Icon = null;
    const lower = label.toLowerCase();
    const color = isCenter ? "white" : "#153B62";
    
    if (lower.includes('standard') || lower.includes('estándar') || lower.includes('मानक')) {
        // XXX icon (Standard blocking)
        Icon = (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M7 15l2.5-3L7 9m2.5 3L12 9m-2.5 3l2.5 3" />
                <path d="M12 15l2.5-3L12 9m2.5 3l2.5-3m-2.5 3l2.5 3" />
            </svg>
        );
    } else if (lower.includes('ai') || lower.includes('ia')) {
        // AI Brain/Circuit icon
        Icon = (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M19.07 4.93l-1.41 1.41"/>
                <circle cx="12" cy="12" r="4"/>
            </svg>
        );
    } else if (lower.includes('ad') || lower.includes('anuncio') || lower.includes('publicité') || lower.includes('विज्ञापन')) {
        // No Ads (square with slash)
        Icon = (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="3" x2="21" y2="21" />
            </svg>
        );
    } else if (lower.includes('social') || lower.includes('réseaux')) {
        // Heart
        Icon = (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
        );
    } else if (lower.includes('redirect') || lower.includes('redireccion') || lower.includes('redirection') || lower.includes('रीडायरेक्ट')) {
        // Sliders
        Icon = (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="21" x2="4" y2="14" />
                <line x1="4" y1="10" x2="4" y2="3" />
                <line x1="12" y1="21" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12" y2="3" />
                <line x1="20" y1="21" x2="20" y2="16" />
                <line x1="20" y1="12" x2="20" y2="3" />
                <line x1="1" y1="14" x2="7" y2="14" />
                <line x1="9" y1="8" x2="15" y2="8" />
                <line x1="17" y1="16" x2="23" y2="16" />
            </svg>
        );
    } else if (lower.includes('device') || lower.includes('dispositivo') || lower.includes('appareil') || lower.includes('डिवाइस')) {
        // Monitor + phone
        Icon = (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
        );
    } else {
        // Default / Magic wand for free trial
        Icon = (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 3l-6 6" />
                <path d="M21 8l-2-2" />
                <path d="M3 21l8-8" />
                <path d="M8 21l2-2" />
            </svg>
        );
    }

    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                    {iconPath ? (
                        <Image 
                            src={iconPath} 
                            alt={label} 
                            width={40} 
                            height={40} 
                            className={`object-contain ${isCenter ? 'brightness-0 invert' : ''}`} 
                        />
                    ) : (
                        Icon
                    )}
                </div>
                <span className={`text-[26px] font-semibold`}>
                    {label}
                </span>
            </div>
            <div className="flex-shrink-0">
                {status === 'check' ? (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                ) : (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                )}
            </div>
        </div>
    );
}
