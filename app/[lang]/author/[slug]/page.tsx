import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { blogService } from '@/lib/container'
import { urlFor } from '@/lib/sanity/image'
import { resolveLocale, buildLocaleAlternates } from '@/lib/seo/metadata'
import { getLocaleCopy } from '@/components/header/headerData'
import { PostCard } from '@/components/blog/PostCard'
import { BackButton } from '@/components/shared/BackButton'
import { BreadcrumbItem, Breadcrumbs } from '@/components/shared/Breadcrumbs'

export async function generateMetadata({
    params
}: {
    params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
    const { lang, slug } = await params
    const locale = resolveLocale(lang)
    let author = await blogService.getAuthorProfile(slug)

    if (!author) {
        author = {
            name: slug === 'editorial-team' ? 'Editorial Team' : slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            bio: 'Expert insights and research-backed reporting on standard web guidelines and wellness.'
        }
    }

    return {
        title: `${author.name} - Author | BlockP`,
        description: author.bio || `Articles written by ${author.name}`,
        alternates: {
            canonical: `/${locale}/author/${slug}`,
            languages: buildLocaleAlternates((supportedLocale) => `/${supportedLocale}/author/${slug}`),
        },
    }
}

export default async function AuthorProfilePage({
    params,
}: {
    params: Promise<{ lang: string; slug: string }>
}) {
    const { lang, slug } = await params
    const locale = resolveLocale(lang)
    const copy = getLocaleCopy(locale)

    let author = await blogService.getAuthorProfile(slug)

    if (!author) {
        author = {
            name: slug === 'editorial-team' ? 'Editorial Team' : slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            slug: slug,
            bio: 'Expert insights and research-backed reporting on standard web guidelines and wellness.',
            credential: '',
            image: null,
            linkedinUrl: ''
        }
    }

    const posts = await blogService.getAuthorArticles(slug, locale)

    const breadcrumbs: BreadcrumbItem[] = [
        { label: copy.home, href: `/${locale}` },
        { label: copy.blog, href: `/${locale}/blog` },
        { label: author.name, href: `/${locale}/author/${slug}` },
    ]

    return (
        <div className="w-full flex flex-col items-center bg-[#F6FAFF] min-h-screen">
            <div className="w-[94%] lg:w-[90%] max-w-[1500px] mx-auto pt-[160px] lg:pt-[180px]">
                <div className="mb-[40px] lg:mb-[60px] flex items-center gap-3">
                    <BackButton
                        ariaLabel="Go to previous page"
                        fallbackHref={`/${locale}/blog`}
                        className="inline-flex h-[24px] w-[24px] shrink-0 items-center justify-center"
                    >
                        <Image
                            src="/frame/arrow_back_blue.svg"
                            alt="Back"
                            width={24}
                            height={23}
                            className="h-[23px] w-[24px]"
                        />
                    </BackButton>
                    <Breadcrumbs items={breadcrumbs} />
                </div>
            </div>

            <main className="w-[94%] lg:w-[90%] max-w-[1500px] mx-auto mb-[100px] flex flex-col">
                
                {/* ── Author Bio Section ── */}
                <section className="w-full flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start relative">
                    <div className="shrink-0 relative z-10">
                        <div className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full overflow-hidden bg-[#F5E6E6] relative">
                            {author.image?.asset ? (
                                <Image
                                    src={urlFor(author.image).url()}
                                    alt={author.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-[#002954]">
                                    {author.name.charAt(0)}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col flex-1 relative z-10 w-full md:pt-4">
                        <h1 className="text-[32px] md:text-[40px] font-black text-[#002954] mb-4" style={{ fontVariationSettings: "'wdth' 100" }}>
                            {author.name}
                        </h1>
                        
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            {[1, 2, 3].map((i) => (
                                <Link 
                                    key={i} 
                                    href={author.linkedinUrl || '#'} 
                                    target={author.linkedinUrl ? "_blank" : "_self"} 
                                    rel={author.linkedinUrl ? "noopener noreferrer" : ""} 
                                    className="flex items-center justify-center w-[30px] h-[30px] rounded-[6px] bg-[#004C9D] text-white hover:opacity-80 transition-opacity"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                </Link>
                            ))}
                        </div>
                        
                        {(author.bio || author.credential) && (
                            <p className="text-[16px] md:text-[18px] font-medium leading-[1.6] text-[#002954] max-w-[900px]">
                                {author.credential && <span className="font-bold">{author.credential} </span>}
                                {author.bio}
                            </p>
                        )}
                    </div>
                </section>

                <div className="w-full h-px bg-[#E5E5E5] my-[50px] md:my-[70px]" />

                {/* ── Author's Posts Grid ── */}
                <section>
                    <div className="flex items-center justify-end mb-8">
                        <button className="flex items-center gap-2 text-[#002954] font-bold text-[16px] md:text-[18px] hover:opacity-80 transition-opacity">
                            All
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>

                    {posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
                            {posts.map((post) => (
                                <PostCard key={post.id} post={post} lang={locale} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-[#002954] text-xl font-medium opacity-60">No articles published yet.</p>
                        </div>
                    )}

                    {/* Static Pagination (Visual only, to match mockup) */}
                    <div className="flex items-center justify-center gap-3 mt-20">
                        <span className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#4176FF] text-white font-bold text-[16px] cursor-pointer shadow-sm">
                            1
                        </span>
                        <span className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-white border border-[#E5E5E5] text-[#002954] font-medium text-[16px] hover:bg-gray-50 cursor-pointer transition-colors shadow-sm">
                            2
                        </span>
                        <span className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-white border border-[#E5E5E5] text-[#002954] font-medium text-[16px] hover:bg-gray-50 cursor-pointer transition-colors shadow-sm">
                            3
                        </span>
                        <span className="flex items-center justify-center text-[#002954] font-medium text-[16px] px-2">
                            ...
                        </span>
                        <span className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-white border border-[#E5E5E5] text-[#002954] font-medium text-[16px] hover:bg-gray-50 cursor-pointer transition-colors shadow-sm">
                            20
                        </span>
                        <span className="flex items-center justify-center px-[24px] h-[40px] rounded-[24px] bg-white border border-[#E5E5E5] text-[#002954] font-medium text-[16px] hover:bg-gray-50 cursor-pointer transition-colors shadow-sm">
                            Next {'>'}
                        </span>
                    </div>
                </section>
            </main>
        </div>
    )
}
