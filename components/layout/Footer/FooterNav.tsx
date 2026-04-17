
import Link from 'next/link';
import { FooterColumn } from '@/lib/types/site';
import { DEFAULT_LANGUAGE, SUPPORTED_LOCALES } from '@/lib/languages';

const GRID_COLS_CLASS: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
};

function getGridClass(count: number): string {
    if (count <= 0) return '';
    const capped = Math.min(count, 3);
    return GRID_COLS_CLASS[capped] ?? GRID_COLS_CLASS[3];
}

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

    const gridClass = getGridClass(columns.length);

    return (
        <div className={`flex-[1.5] grid ${gridClass} gap-12 lg:gap-16 pt-4`}>
            {columns.map((col, colIdx) => {
                // Column with no title and no links — skip entirely
                if (!col?.title && (!col?.links || col.links.length === 0)) return null;

                const validLinks = (col.links ?? []).filter(link => link?.label);

                return (
                    <div key={colIdx} className="flex flex-col gap-8">
                        {col.title && (
                            <h4 className="text-[28px] font-bold tracking-tight leading-tight">
                                {col.title}
                            </h4>
                        )}

                        {validLinks.length > 0 && (
                            <ul className="flex flex-col gap-4">
                                {validLinks.map((link, linkIdx) => (
                                    <li key={linkIdx} className="text-[18px] opacity-80">
                                        {resolveHref(link, locale) ? (
                                            <Link
                                                href={resolveHref(link, locale) as string}
                                                className="hover:opacity-100 hover:text-white transition-all underline-offset-4 hover:underline"
                                            >
                                                {link.label}
                                            </Link>
                                        ) : (
                                            // No URL — render as plain text, not a dead anchor
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
    );
}