import { PostCard } from '@/components/blog/PostCard'
import { FeaturedPostCard } from '@/components/blog/FeaturedPostCard'
import CategoryDropdown from '@/components/blog/CategoryDropdown'
import BlogPaginationControls from '@/components/blog/BlogPaginationControls'
import { BreadcrumbItem, Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { BackButton } from '@/components/shared/BackButton'
import Image from 'next/image'
import { Post } from '@/lib/types/post'

interface BlogListingShellProps {
    lang: string
    currentPage: number
    currentCategory: string
    categories: string[]
    posts: Post[]
    featuredPost: Post | null
    totalPages: number
    latestStoriesLabel?: string
    breadcrumbs?: BreadcrumbItem[]
}

export function BlogListingShell({
    lang,
    currentPage,
    currentCategory,
    categories,
    posts,
    featuredPost,
    totalPages,
    latestStoriesLabel = 'Latest Stories',
    breadcrumbs = [],
}: BlogListingShellProps) {
    const showHero = currentPage === 1 && currentCategory === 'All' && featuredPost

    return (
        <>
            {breadcrumbs.length > 0 && (
                <div className="w-full px-[58px] pt-[120px] max-w-[1440px] mx-auto">
                    <div className="mb-[40px] flex items-center gap-3">
                        <BackButton
                            ariaLabel="Go to previous page"
                            fallbackHref={`/${lang}`}
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
            )}

            <main className={`w-full px-[58px] ${breadcrumbs.length > 0 ? (showHero ? 'pt-0' : 'pt-[60px]') : (showHero ? 'pt-[120px]' : 'pt-[180px]')} mb-[100px] max-w-[1440px] mx-auto`}>

                {showHero && featuredPost && (
                    <section className="mb-[50px]">
                        <FeaturedPostCard post={featuredPost} lang={lang} />
                    </section>
                )}

                <div className="flex items-center justify-between mb-12">
                    <h1 className="text-4xl font-bold text-brand-primary" style={{ fontVariationSettings: "'wdth' 100" }}>
                        {latestStoriesLabel}
                    </h1>
                    <CategoryDropdown categories={categories} currentCategory={currentCategory} />
                </div>

                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-8">
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} lang={lang} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-brand-muted text-xl">
                        No stories found in this category.
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="mt-16">
                        <BlogPaginationControls currentPage={currentPage} totalPages={totalPages} />
                    </div>
                )}
            </main>
        </>
    )
}