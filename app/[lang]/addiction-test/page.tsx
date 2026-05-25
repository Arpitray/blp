import { Metadata } from 'next';
import { buildLocaleAlternates, resolveLocale } from '@/lib/seo/metadata';
import AddictionTestClient from './AddictionTestClient';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params
    const locale = resolveLocale(lang)
    return {
        title: 'Porn Addiction Test — BlockP',
        description: 'Take our free porn addiction test to better understand your relationship with adult content and get personalized guidance.',
        alternates: {
            canonical: `/${locale}/addiction-test`,
            languages: buildLocaleAlternates((supportedLocale) => `/${supportedLocale}/addiction-test`),
        },
    }
}

export default async function AddictionTestPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale = resolveLocale(lang);

    return <AddictionTestClient locale={locale} />;
}
