
import Link from 'next/link';
import { FooterColumn } from '@/lib/types/site';
import { DEFAULT_LANGUAGE, SUPPORTED_LOCALES } from '@/lib/languages';

interface FooterNavProps {
    columns: FooterColumn[] | undefined | null;
    locale?: string;
}

function isExternalHref(value: string): boolean {
    return /^https?:\/\//i.test(value) || /^mailto:/i.test(value) || /^tel:/i.test(value)
}

function resolveHref(link: { url?: string; internalPath?: string }, locale: string): string | null {
    const path = (link.internalPath || '').trim()
    const rawUrl = (link.url || '').trim()

    if (path) {
        const normalizedPath = path.startsWith('/') ? path : `/${path}`
        return `/${locale}${normalizedPath}`
    }

    if (!rawUrl) return null
    if (isExternalHref(rawUrl)) return rawUrl

    if (rawUrl.startsWith('/')) {
        const firstSegment = rawUrl.split('/').filter(Boolean)[0]
        if (firstSegment && SUPPORTED_LOCALES.includes(firstSegment)) return rawUrl
        return `/${locale}${rawUrl}`
    }

    return `/${locale}/${rawUrl}`
}

export default function FooterNav({ columns, locale = DEFAULT_LANGUAGE }: FooterNavProps) {
    if (!columns || columns.length === 0) return null;

    // Filter valid columns
    const validColumns = columns.filter(
        (col) => col?.title || (col?.links && col.links.length > 0)
    );

    if (validColumns.length === 0) return null;

    // Split for rendering: First column goes left, second and third go right (stacked)
    const leftColumn = validColumns[0];
    const rightColumns = validColumns.slice(1);

    return (
        <div className="flex-[1.5] grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-20 pt-4">
            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-8">
                {leftColumn.title && (
                    <h4 className="text-[32px] font-bold tracking-tight leading-tight">
                        {leftColumn.title}
                    </h4>
                )}

                {(leftColumn.links ?? []).filter(l => l?.label).length > 0 && (
                    <ul className="flex flex-col gap-5">
                        {(leftColumn.links ?? [])
                            .filter(l => l?.label)
                            .map((link, linkIdx) => (
                                <li key={linkIdx} className="text-[20px] opacity-80">
                                    {resolveHref(link, locale) ? (
                                        <Link
                                            href={resolveHref(link, locale) as string}
                                            className="hover:opacity-100 hover:text-white transition-all underline-offset-4 hover:underline"
                                        >
                                            {link.label}
                                        </Link>
                                    ) : (
                                        <span>{link.label}</span>
                                    )}
                                </li>
                            ))}
                    </ul>
                )}
            </div>

            {/* RIGHT COLUMNS (Stacked) */}
            {rightColumns.length > 0 && (
                <div className="flex flex-col gap-14 lg:gap-16">
                    {rightColumns.map((col, colIdx) => {
                        const validLinks = (col.links ?? []).filter(link => link?.label);
                        return (
                            <div key={colIdx} className="flex flex-col gap-8">
                                {col.title && (
                                    <h4 className="text-[32px] font-bold tracking-tight leading-tight">
                                        {col.title}
                                    </h4>
                                )}

                                {validLinks.length > 0 && (
                                    <ul className="flex flex-col gap-5">
                                        {validLinks.map((link, linkIdx) => (
                                            <li key={linkIdx} className="text-[20px] opacity-80">
                                                {resolveHref(link, locale) ? (
                                                    <Link
                                                        href={resolveHref(link, locale) as string}
                                                        className="hover:opacity-100 hover:text-white transition-all underline-offset-4 hover:underline"
                                                    >
                                                        {link.label}
                                                    </Link>
                                                ) : (
                                                    <span>{link.label}</span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}