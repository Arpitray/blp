import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/lib/types/post'
import { formatDate } from '@/lib/utils/formatDate'
import { CategoryChip } from '@/components/shared/CategoryChip'

// Decoupled from Sanity, relies solely on our Post domain type
interface PostCardProps {
    post: Post
    lang: string
}

export const PostCard: React.FC<PostCardProps> = ({ post, lang }) => {
    // Resolve up to 3 category badges from structured data, with legacy string fallback.
    const structuredCategories = post.categories
        ?.map((category) => category.title?.trim())
        .filter((title): title is string => Boolean(title)) ?? []
    const fallbackCategories = structuredCategories.length === 0 && post.category
        ? post.category.split(',').map((title) => title.trim()).filter(Boolean)
        : []
    const categoryBadges = (structuredCategories.length > 0 ? structuredCategories : fallbackCategories).slice(0, 3)

    // Format author and date metadata
    const authorName = post.author?.name ? (post.author.credential ? `${post.author.name}, ${post.author.credential}` : post.author.name) : null
    const formattedDate = post.publishedAt ? formatDate(post.publishedAt, 'numerical') : null
    const authorAndDate = [authorName, formattedDate].filter(Boolean).join(', ')

    return (
        <div className="flex flex-col gap-4 w-full relative group">
            {/* Image Container */}
            <Link href={`/${lang}/blog/${post.slug || '#'}`} className="block w-full">
                <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden bg-[#e0efff] transition-transform duration-300 group-hover:scale-[1.02]">
                    {post.imageUrl ? (
                        <Image
                            src={post.imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="size-full flex items-center justify-center opacity-30">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <rect x="3" y="3" width="18" height="18" rx="4" stroke="#1160FF" strokeWidth="1.5" />
                            </svg>
                        </div>
                    )}
                </div>
            </Link>

            {/* Content Container (Matches Figma Exact Typography) */}
            <div className="flex flex-col gap-[5px] items-start relative w-full whitespace-normal">
                {categoryBadges.length > 0 && (
                    <div className="mb-[2px] flex max-w-full flex-wrap items-center gap-2 overflow-hidden">
                        {categoryBadges.map((categoryBadge) => (
                            <CategoryChip
                                key={categoryBadge}
                                title={categoryBadge}
                                lang={lang}
                            />
                        ))}
                    </div>
                )}

                <Link href={`/${lang}/blog/${post.slug || '#'}`} className="w-full block">
                    <h3
                        className="font-bold leading-[1.2] text-[24px] text-brand-primary hover:opacity-80 transition-opacity"
                        style={{ fontFamily: "'Anek Latin', sans-serif" }}
                    >
                        {post.title}
                    </h3>
                </Link>

                {authorAndDate && (
                    <p
                        className="font-medium leading-[1.44] text-[20px] text-brand-muted"
                        style={{ fontFamily: "'Anek Latin', sans-serif" }}
                    >
                        {authorAndDate}
                    </p>
                )}
            </div>
        </div>
    )
}
