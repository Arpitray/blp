import { blogService } from "@/lib/container";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import { BackButton } from "@/components/shared/BackButton";
import TableOfContents from "@/components/blog/TableOfContents";
import { PostCard } from "@/components/blog/PostCard";
import { Metadata } from 'next';
import { buildLocaleAlternates, resolveLocale } from '@/lib/seo/metadata';
import { getLocaleCopy } from '@/components/header/headerData';
import portableTextComponentsServer from '@/components/blog/PortableTextRenderers.server';
import { CurveDivider } from '@/components/shared/CurveDivider';
import { TrustBadge } from '@/components/shared/TrustBadge';
import { CategoryChip } from '@/components/shared/CategoryChip';

const RELATED_POSTS_LIMIT = 3;

type HeroLayoutConfig = {
    heroHeightClass: string;
    heroImageSpacingClass: string;
    metaOverlapClass: string;
    metaTopPaddingClass: string;
    metaBottomPaddingClass: string;
};

type HeroLayoutTier = 'dense' | 'balanced' | 'sparse';

const HERO_LAYOUTS: Record<HeroLayoutTier, HeroLayoutConfig> = {
    dense: {
        heroHeightClass: 'min-h-[clamp(220px,32vh,400px)] md:min-h-[clamp(240px,34vh,440px)]',
        heroImageSpacingClass: 'pt-[56px] md:pt-[70px] pb-4',
        metaOverlapClass: '-mt-[122px] md:-mt-[138px]',
        metaTopPaddingClass: 'pt-[4px] md:pt-[6px]',
        metaBottomPaddingClass: 'pb-1',
    },
    balanced: {
        heroHeightClass: 'min-h-[clamp(270px,38vh,500px)] md:min-h-[clamp(300px,40vh,540px)]',
        heroImageSpacingClass: 'pt-[66px] md:pt-[82px] pb-6',
        metaOverlapClass: '-mt-[122px] md:-mt-[138px]',
        metaTopPaddingClass: 'pt-[4px] md:pt-[6px]',
        metaBottomPaddingClass: 'pb-2',
    },
    sparse: {
        // Sparse white content: extend blue zone so CTA lands lower and avoids large blank white space below.
        heroHeightClass: 'min-h-[clamp(440px,60vh,820px)] md:min-h-[clamp(500px,64vh,900px)]',
        heroImageSpacingClass: 'pt-[102px] md:pt-[122px] pb-10',
        metaOverlapClass: '-mt-[114px] md:-mt-[130px]',
        metaTopPaddingClass: 'pt-[6px] md:pt-[8px]',
        metaBottomPaddingClass: 'pb-3',
    },
};

function truncateBreadcrumbTitle(title: string): string {
    const cleanTitle = title.trim();
    if (!cleanTitle) return '';

    if (cleanTitle.length <= 30) {
        return cleanTitle;
    }

    return `${cleanTitle.slice(0, 25)}...`;
}

function getPostCategoryTitles(post: { categories?: { title?: string }[]; category?: string }): string[] {
    const structuredTitles = post.categories
        ?.map((category) => category.title?.trim())
        .filter((title): title is string => Boolean(title)) ?? [];

    if (structuredTitles.length > 0) {
        return structuredTitles;
    }

    if (!post.category) {
        return [];
    }

    return post.category
        .split(',')
        .map((title) => title.trim())
        .filter(Boolean);
}

function getDensityScore(title: string, categoryCount: number): number {
    // Score reflects how much vertical space the centered white metadata stack will likely consume.
    const titleScore = Math.ceil(title.length / 42);
    const categoryScore = categoryCount > 0 ? Math.ceil(categoryCount / 2) : 0;
    return titleScore + categoryScore;
}

function getLayoutTier(densityScore: number): HeroLayoutTier {
    if (densityScore >= 6) return 'dense';
    if (densityScore >= 4) return 'balanced';
    return 'sparse';
}

function getHeroLayoutConfig(title: string, categoryCount: number): HeroLayoutConfig {
    const densityScore = getDensityScore(title, categoryCount);
    const layoutTier = getLayoutTier(densityScore);
    return HERO_LAYOUTS[layoutTier];
}

function formatPublishedDate(value: string): string {
    return new Date(value).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

type RelatedPost = Awaited<ReturnType<typeof blogService.getPagedPosts>>['posts'][number];

function getPublishedTime(post: RelatedPost): number {
    return new Date(post.publishedAt).getTime();
}

function pickLatestPost(posts: RelatedPost[]): RelatedPost | null {
    if (posts.length === 0) return null;
    return [...posts].sort((a, b) => getPublishedTime(b) - getPublishedTime(a))[0] ?? null;
}

function getNextUniquePost(posts: RelatedPost[], usedSlugs: Set<string>): RelatedPost | null {
    const nextPost = posts.find((candidatePost) => !usedSlugs.has(candidatePost.slug));
    return nextPost ?? null;
}

function pushUniquePost(target: RelatedPost[], post: RelatedPost | null, usedSlugs: Set<string>): void {
    if (!post || usedSlugs.has(post.slug)) {
        return;
    }
    target.push(post);
    usedSlugs.add(post.slug);
}

function sortPostsByLatest(posts: RelatedPost[]): RelatedPost[] {
    return [...posts].sort((a, b) => getPublishedTime(b) - getPublishedTime(a));
}

function dedupeCategoryTitles(categoryTitles: string[]): string[] {
    return Array.from(new Set(categoryTitles.map((title) => title.trim()).filter(Boolean)));
}

// ── Metadata & SEO (Optimization) ──────────────────────────────────

export async function generateMetadata({
    params
}: {
    params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
    const { slug, lang } = await params;
    const locale = resolveLocale(lang)
    const post = await blogService.getPostBySlug(slug, locale);

    if (!post) return { title: 'Post Not Found' };

    return {
        title: post.title,
        description: post.metaDescription || post.description,
        keywords: post.keywords?.join(', '),
        alternates: {
            canonical: `/${locale}/blog/${slug}`,
            languages: buildLocaleAlternates((supportedLocale) => `/${supportedLocale}/blog/${slug}`),
        },
        openGraph: {
            title: post.title,
            description: post.description,
            images: post.imageUrl ? [{ url: post.imageUrl }] : [],
        },
    };
}

// ── Static Params (Optimization - ISR) ──────────────────────────────

export async function generateStaticParams() {
    const slugs = await blogService.getAllSlugs();
    const { supportedLocales } = await import('@/lib/i18n');

    // Create paths for every combination of post and language
    return supportedLocales.flatMap((lang) =>
        slugs.map((s) => ({
            lang,
            slug: s.slug
        }))
    );
}

export default async function BlogDetailPage({
    params,
}: {
    params: Promise<{ lang: string; slug: string }>;
}) {
    const { slug, lang } = await params;
    const locale = resolveLocale(lang)
    const post = await blogService.getPostBySlug(slug, locale);

    if (!post) {
        notFound();
    }

    // Ensure we get the main image URL from the CMS asset
    const heroImageUrl = post.imageUrl;
    const postCategoryTitles = getPostCategoryTitles(post);
    const {
        heroHeightClass,
        heroImageSpacingClass,
        metaOverlapClass,
        metaTopPaddingClass,
        metaBottomPaddingClass,
    } = getHeroLayoutConfig(post.title, postCategoryTitles.length);

    const normalizedCategoryTitles = dedupeCategoryTitles(postCategoryTitles).slice(0, 3);
    const categoryResults = await Promise.all(
        normalizedCategoryTitles.map(async (categoryTitle) => {
            const data = await blogService.getPagedPosts(1, categoryTitle, locale);
            const posts = sortPostsByLatest(data.posts.filter((candidatePost) => candidatePost.slug !== slug));
            return { categoryTitle, posts };
        })
    );

    const postsByCategory = new Map(categoryResults.map((result) => [result.categoryTitle, result.posts]));
    const relatedPosts: RelatedPost[] = [];
    const usedSlugs = new Set<string>();

    if (normalizedCategoryTitles.length >= 3) {
        // One unique post from each category.
        normalizedCategoryTitles.slice(0, RELATED_POSTS_LIMIT).forEach((categoryTitle) => {
            const categoryPosts = postsByCategory.get(categoryTitle) ?? [];
            pushUniquePost(relatedPosts, getNextUniquePost(categoryPosts, usedSlugs), usedSlugs);
        });
    } else if (normalizedCategoryTitles.length === 2) {
        // For 2 categories: first is latest overall, second is latest from the other category, then latest remaining.
        const [categoryA, categoryB] = normalizedCategoryTitles;
        const postsA = postsByCategory.get(categoryA) ?? [];
        const postsB = postsByCategory.get(categoryB) ?? [];

        const topA = getNextUniquePost(postsA, usedSlugs);
        const topB = getNextUniquePost(postsB, usedSlugs);

        const firstPost = pickLatestPost([topA, topB].filter((post): post is RelatedPost => Boolean(post)));
        pushUniquePost(relatedPosts, firstPost, usedSlugs);

        const firstFromA = Boolean(firstPost && postsA.some((post) => post.slug === firstPost.slug));
        const otherCategoryPosts = firstFromA ? postsB : postsA;
        const sameCategoryPosts = firstFromA ? postsA : postsB;

        pushUniquePost(relatedPosts, getNextUniquePost(otherCategoryPosts, usedSlugs), usedSlugs);

        const latestRemaining = pickLatestPost([
            ...sortPostsByLatest(sameCategoryPosts.filter((post) => !usedSlugs.has(post.slug))),
            ...sortPostsByLatest(otherCategoryPosts.filter((post) => !usedSlugs.has(post.slug))),
        ]);
        pushUniquePost(relatedPosts, latestRemaining, usedSlugs);
    } else if (normalizedCategoryTitles.length === 1) {
        // Single category: normal latest posts from that category.
        const [onlyCategory] = normalizedCategoryTitles;
        const posts = postsByCategory.get(onlyCategory) ?? [];
        posts.slice(0, RELATED_POSTS_LIMIT).forEach((candidatePost) => {
            pushUniquePost(relatedPosts, candidatePost, usedSlugs);
        });
    }

    // Fill gaps from selected categories first, then from latest locale posts.
    if (relatedPosts.length < RELATED_POSTS_LIMIT) {
        const pooledCategoryPosts = sortPostsByLatest(categoryResults.flatMap((result) => result.posts));
        pooledCategoryPosts.forEach((candidatePost) => {
            if (relatedPosts.length >= RELATED_POSTS_LIMIT) return;
            pushUniquePost(relatedPosts, candidatePost, usedSlugs);
        });
    }

    if (relatedPosts.length < RELATED_POSTS_LIMIT) {
        const fallbackData = await blogService.getPagedPosts(1, undefined, locale);
        const fallbackPosts = sortPostsByLatest(fallbackData.posts.filter((candidatePost) => candidatePost.slug !== slug));
        fallbackPosts.forEach((candidatePost) => {
            if (relatedPosts.length >= RELATED_POSTS_LIMIT) return;
            pushUniquePost(relatedPosts, candidatePost, usedSlugs);
        });
    }
    const shortTitle = truncateBreadcrumbTitle(post.title)
    const labels = getLocaleCopy(locale)

    return (
        <>
            <div className="w-full flex flex-col items-center bg-[#F6FAFF] mb-[120px]">

                {/* ── Hero Section ── */}
                <div
                    className={`w-full relative flex flex-col items-center overflow-hidden ${heroHeightClass}`}
                    style={{
                        background: "linear-gradient(to bottom, #1160FF 0%, #649DFF 48%, #87C1FF 100%)",
                    }}
                >
                    {/* Main Centered Mascot */}
                    <div className={`relative z-10 flex justify-center items-center ${heroImageSpacingClass} px-6`}>
                        <Image
                            src="/blog/image 41.svg"
                            alt="Mascot"
                            width={1600}
                            height={960}
                            className="object-contain object-bottom max-h-[960px] w-auto drop-shadow-2xl -translate-y-16"
                            priority
                        />
                    </div>

                    {/* White Dome Overlay - Reusable global CurveDivider component */}
                    <div className="absolute bottom-0 left-0 w-full z-20">
                        <CurveDivider bottomColor="#F6FAFF" curveType="dome" />
                    </div>
                </div>

                {/* ── Title / Meta Section ── */}
                <div
                    className={`w-full max-w-[1000px] px-6 ${metaOverlapClass} ${metaTopPaddingClass} ${metaBottomPaddingClass} relative z-40 flex flex-col items-center text-center`}
                >
                    <div className="w-full flex flex-col items-center gap-3 md:gap-4">
                        <div className="flex items-center justify-center gap-3 max-w-full">
                            {}

                            <nav className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[16px] md:text-[18px] text-[#595959]" aria-label="Breadcrumb">
                                <Link href={`/${locale}`} className="font-medium leading-none hover:text-[#3F3F3F]">
                                    {labels.home}
                                </Link>
                                <span className="leading-none" aria-hidden="true">/</span>
                                <Link href={`/${locale}/blog`} className="font-medium leading-none hover:text-[#3F3F3F]">
                                    {labels.blog}
                                </Link>
                                <span className="leading-none" aria-hidden="true">/</span>
                                <span className="font-medium leading-none truncate max-w-[380px]">{shortTitle}</span>
                            </nav>
                        </div>

                        {/* Category tags - Pill Logic */}
                        {postCategoryTitles.length > 0 && (
                            <div className="mt-[3px] flex flex-wrap justify-center gap-2">
                                {postCategoryTitles.map((categoryTitle) => (
                                    <CategoryChip
                                        key={categoryTitle}
                                        title={categoryTitle}
                                        lang={locale}
                                        isExpanded={true}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Title */}
                        <h1
                            className="text-[32px] md:text-[56px] lg:text-[60px] font-black text-[#002954] leading-[1.15] max-w-4xl"
                            style={{ fontVariationSettings: "'wdth' 100" }}
                        >
                            {post.title}
                        </h1>

                        {/* Author & Fact Check */}
                        <div className="flex flex-col items-center gap-3">
                            <div className="text-[#002954] font-bold text-[16px] md:text-[18px]">
                                Dr. {post.author?.name || "Editorial Team"}, {formatPublishedDate(post.publishedAt)}
                            </div>

                            <div className="flex items-center gap-2 text-[#002954] font-bold text-[16px]">
                                <TrustBadge type="fact-checked" locale={locale} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Main Body ── */}
                <article className="w-full px-[24px] lg:px-[40px] max-w-[1722px] mt-24 flex flex-col lg:flex-row lg:justify-between gap-[60px] lg:gap-[80px]">
                    <div className="flex-[1.5] w-full max-w-[900px]">
                        <section className="text-[#002954] w-full">
                            <PortableText value={post.body} components={portableTextComponentsServer} />
                        </section>

                        {/* ── Author Section ── */}
                        <div className="mt-24 pt-16 relative">
                            {/* Blur Gradient Line Divider */}
                            <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent" aria-hidden="true" />

                            <div className="max-w-[760px]">
                                <div className="flex flex-col gap-10">
                                    <TrustBadge type="medical-reviewed" locale={locale} />

                                    <h4 className="text-[24px] font-extrabold text-[#002954] mb-8" style={{ fontVariationSettings: "'wdth' 100" }}>
                                        Written By:
                                    </h4>
                                </div>
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] shrink-0 overflow-hidden rounded-[50px] bg-brand-muted/10 relative">
                                        {post.author?.image?.asset ? (
                                            <Image
                                                src={urlFor(post.author.image).url()}
                                                alt={post.author.name ?? 'Author image'}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-brand-muted">
                                                {post.author?.name?.charAt(0) || "B"}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h5 className="text-[22px] md:text-[28px] font-black text-[#002954]" style={{ fontVariationSettings: "'wdth' 100" }}>
                                            {post.author?.name || "Editorial Team"}
                                        </h5>
                                        {post.author?.credential && (
                                            <p className="text-[14px] md:text-[16px] font-bold text-brand-muted uppercase">
                                                {post.author.credential}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <p className="text-[16px] md:text-[18px] font-medium leading-[1.6] text-brand-primary opacity-80">
                                    {post.author?.bio || "Expert insights and research-backed reporting on standard web guidelines and wellness."}
                                </p>
                            </div>
                        </div>
                    </div>

                    {post.headings && post.headings.length > 0 && (
                        <aside className="w-full lg:w-[300px] shrink-0">
                            <div className="sticky top-[120px]">
                                <TableOfContents headings={post.headings} />
                            </div>
                        </aside>
                    )}
                </article>

                {/* ── Related Posts ── */}
                {relatedPosts.length > 0 && (
                    <div className="w-full max-w-[1722px] px-[24px] lg:px-[40px] mt-32 mb-12 flex flex-col items-center">
                        <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent mb-20" aria-hidden="true" />

                        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-8">
                            {relatedPosts.map((rp) => (
                                <PostCard key={rp.id} post={rp} lang={locale} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
