import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface TrustBadgeProps {
    type: 'fact-checked' | 'medical-reviewed';
    locale: string;
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({ type, locale }) => {
    if (type === 'fact-checked') {
        return (
            <a
                href={`/${locale}/fact-checked`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-[21.76px] bg-gradient-to-b from-[#f6faff] to-[#f6faff] shadow-[0px_3.482px_3.482px_0px_rgba(0,118,244,0.25)] hover:opacity-90 transition-opacity"
            >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="11" stroke="#002954" strokeWidth="2" />
                    <path d="M7 12.5l3.5 3.5 6-7" stroke="#002954" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="uppercase tracking-tighter">Fact checked</span>
            </a>
        );
    }

    return (
        <a
            href={`/${locale}/medical-professionals`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-[58px] py-4 rounded-[25px] bg-gradient-to-b from-[#f6faff] to-[#f6faff] shadow-[0px_3.482px_3.482px_0px_rgba(0,118,244,0.25)] hover:opacity-90 transition-opacity w-fit max-w-[422px]"
        >
            <Image
                src="/stethoscope.svg"
                alt="Stethoscope"
                width={28}
                height={28}
            />
            <span className="font-bold text-[24px] text-[#002954] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                Reviewed by medical professionals
            </span>
        </a>
    );
};
