import { Metadata } from 'next';
import { buildLocaleAlternates, resolveLocale } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params
    const locale = resolveLocale(lang)
    return {
        title: 'Medical Professionals — BlockP',
        description: 'Resources and information for medical professionals about BlockP and digital wellbeing tools.',
        alternates: {
            canonical: `/${locale}/medical-professionals`,
            languages: buildLocaleAlternates((supportedLocale) => `/${supportedLocale}/medical-professionals`),
        },
    }
}

export default function MedicalProfessionalsPage() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <h1>Medical Professionals</h1>
        </div>
    );
}
