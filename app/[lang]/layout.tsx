
import { Anek_Latin } from 'next/font/google'
import { Metadata } from 'next'
import '../globals.css'
import Header from '@/components/Header'
import Footer from '@/components/layout/Footer/page'
import { buildLocaleAlternates, resolveLocale, SITE_URL } from '@/lib/seo/metadata'

// Initialising custom Google font
const anekLatin = Anek_Latin({
    subsets: ['latin'],
    weight: ['400', '600', '700', '800'],
    variable: '--font-anek',
    display: 'swap',
})

// Setting locale-aware metadata for language routes
export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>
}): Promise<Metadata> {
    const { lang } = await params
    const locale = resolveLocale(lang)

    return {
        metadataBase: new URL(SITE_URL),
        title: 'BlockP — #1 Free AI Porn Blocker',
        description: 'BlockP is the #1 AI-Powered Porn Blocker — free, reliable, and intuitive software to keep your devices free from explicit content.',
        alternates: {
            canonical: `/${locale}`,
            languages: buildLocaleAlternates((supportedLocale) => `/${supportedLocale}`),
        },
    }
}

// Rendering the root HTML layout
export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ lang: string }>
}) {
    const { lang } = await params
    const locale = resolveLocale(lang)

    return (
        <html lang={locale} className={anekLatin.variable} style={{ scrollBehavior: 'smooth' }}>
            <body className={anekLatin.className} suppressHydrationWarning={true}>
                <Header />
                <main>{children}</main>
                <Footer locale={locale} />
            </body>
        </html>
    )
}

