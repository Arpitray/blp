import React from 'react';
import Link from 'next/link';

interface CategoryChipProps {
    title: string;
    lang: string;
    isExpanded?: boolean;
}

export const CategoryChip: React.FC<CategoryChipProps> = ({ title, lang, isExpanded = false }) => {
    const baseClasses = "font-bold uppercase tracking-tight block hover:opacity-90 transition-opacity rounded-full bg-brand-accent/[0.08] text-[#002954]";

    const expandedClasses = isExpanded
        ? "text-[14px] md:text-[16px] px-4 py-1"
        : "max-w-[150px] truncate px-3 py-[5px] text-[12px] md:text-[13px]";

    return (
        <Link
            href={`/${lang}/blog?category=${encodeURIComponent(title)}`}
            className={`${baseClasses} ${expandedClasses}`}
            style={{ fontVariationSettings: "'wdth' 100" }}
            title={!isExpanded ? title : undefined}
        >
            {title}
        </Link>
    );
};
