import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/lib/types/post'
import { formatDate } from '@/lib/utils/formatDate'
import { Button } from '@/components/layout/ui/Button'
import { CategoryChip } from '@/components/shared/CategoryChip'

// Relies solely on the Post domain type — no ad-hoc extensions needed
interface FeaturedPostCardProps {
    post: Post
    lang: string
}

// Rendering the featured post card component
export const FeaturedPostCard: React.FC<FeaturedPostCardProps> = ({ post, lang }) => {
    // Resolve up to 3 category badges from structured data, with legacy string fallback.
    const structuredCategories = post.categories
        ?.map((category) => category.title?.trim())
        .filter((title): title is string => Boolean(title)) ?? []
    const fallbackCategories = structuredCategories.length === 0 && post.category
        ? post.category.split(',').map((title) => title.trim()).filter(Boolean)
        : []
    const categoryBadges = (structuredCategories.length > 0 ? structuredCategories : fallbackCategories).slice(0, 3)

    // Formatting author and date metadata
    const authorName = post.author?.name ? (post.author.credential ? `${post.author.name}, ${post.author.credential}` : post.author.name) : null
    const authorMeta = [authorName, post.publishedAt ? formatDate(post.publishedAt) : null].filter(Boolean).join(', ')

    return (
        <div className="w-full relative">
            <div className="w-full flex flex-col lg:flex-row items-stretch justify-between gap-10 lg:gap-[40px] pt-[15px]">

                {/* Left Side Content - Utilizing Modern CSS Flexbox Architecture */}
                {/* Flexbox auto-margins handle multi-line dynamic content to perfectly center it within available space. */}
                <div className="flex flex-col flex-1 min-w-0 max-w-[652px] py-4">
                    {/* my-auto elegantly calculates exact spacing on the fly, centering the block regardless of 1 or 3 line constraints. */}
                    <div className="flex flex-col gap-4 my-auto w-full">
                        {authorMeta && (
                            <p className="text-[18px] font-medium text-brand-muted leading-tight">
                                {authorMeta}
                            </p>
                        )}

                        {categoryBadges.length > 0 && (
                            <div className="mt-[2px] flex max-w-full flex-wrap items-center gap-2 overflow-hidden">
                                {categoryBadges.map((categoryBadge) => (
                                    <CategoryChip
                                        key={categoryBadge}
                                        title={categoryBadge}
                                        lang={lang}
                                    />
                                ))}
                            </div>
                        )}

                        <Link href={`/${lang}/blog/${post.slug}`} className="group">
                            {/* Line clamping adds a defensive CSS architectural layer, gracefully handling outlier titles that exceed 3 lines */}
                            <h2 className="text-[40px] sm:text-[56px] font-bold text-brand-primary leading-[1.05] group-hover:opacity-80 transition-opacity duration-150 overflow-hidden" style={{ fontVariationSettings: "'wdth' 100", display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                                {post.title}
                            </h2>
                        </Link>
                    </div>

                    {/* Button maintains anchor at the bottom effortlessly, taking up 0 relative vertical space from the centering calculation above */}
                    <div className="pt-8 lg:pt-5 shrink-0">
                        <Button href={`/${lang}/blog/${post.slug}`} variant="cta-large" className="inline-flex items-center justify-center">
                            Read More
                        </Button>
                    </div>
                </div>

                {/* Rendering right-side featured image - Mapped explicitly to Figma 514x447px container with 25px rounding */}
                <div className="relative shrink-0 w-full lg:w-[514px] h-[350px] lg:h-[447px] rounded-[25px] overflow-hidden bg-[#e0efff]">
                    {post.imageUrl ? (
                        <Image src={post.imageUrl} alt={post.title} fill priority loading="eager" className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 514px" />
                    ) : (
                        <div className="size-full flex items-center justify-center opacity-30">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <rect x="3" y="3" width="18" height="18" rx="4" stroke="#1160FF" strokeWidth="1.5" />
                            </svg>
                        </div>
                    )}
                </div>
            </div>

            {/* Rendering bottom dividing line */}
            <hr className="w-full h-px border-none bg-[#E5E5E5] mt-[50px]" />
        </div>
    )
}

