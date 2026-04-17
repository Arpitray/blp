// app/page.tsx — Server Component (SSR)
import { blogService } from '@/lib/container'
import { BlogListingShell } from '@/components/blog/BlogListingShell'
import { Metadata } from 'next'
import { buildLocaleAlternates, resolveLocale } from '@/lib/seo/metadata'
import { getLocaleCopy } from '@/components/header/headerData'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLocale(lang)
  const copy = getLocaleCopy(locale)

  // Build hreflang alternates for regional SEO
  return {
    title: copy.blogPageTitle,
    description: copy.blogListMetaDescription,
    alternates: {
      canonical: `/${locale}/blog`,
      languages: buildLocaleAlternates((supportedLocale) => `/${supportedLocale}/blog`),
    },
  };
}

interface Props {
  searchParams: Promise<{ page?: string; category?: string }>
}

export default async function BlogListingPage({
  params,
  searchParams
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ page?: string; category?: string }>
}) {
  const { lang } = await params;
  const locale = resolveLocale(lang)
  const { page, category } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1)
  const currentCategory = category || 'All'
  const copy = getLocaleCopy(locale)

  const breadcrumbs = [
    { label: copy.home, href: `/${locale}` },
    { label: copy.blog, href: `/${locale}/blog` },
  ]

  // Fetch Hero + Grid concurrently. Grid now arrives pre-filtered from Sanity.
  const [featuredPost, { posts, totalPages }, categories] = await Promise.all([
    blogService.getFeaturedPost(lang),
    blogService.getPagedPosts(currentPage, currentCategory !== 'All' ? currentCategory : undefined, lang),
    blogService.getCategories(lang),
  ])

  // Hero is only shown on page 1 of the "All" view
  return (
    <BlogListingShell
      lang={locale}
      currentPage={currentPage}
      currentCategory={currentCategory}
      categories={categories}
      posts={posts}
      featuredPost={featuredPost}
      totalPages={totalPages}
      latestStoriesLabel={copy.latestStories}
      breadcrumbs={breadcrumbs}
    />
  )
}
