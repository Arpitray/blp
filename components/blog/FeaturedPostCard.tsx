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
    isBlogHero?: boolean
}

// Rendering the featured post card component
export const FeaturedPostCard: React.FC<FeaturedPostCardProps> = ({ post, lang, isBlogHero = false }) => {
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
            <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-[80px] xl:gap-[120px] pt-0">

                {/* Left Side Content - Utilizing Modern CSS Flexbox Architecture */}
                <div className="flex flex-col flex-1 w-full lg:max-w-[600px] justify-center">
                    {authorMeta && (
                        <p className="text-[14px] md:text-[16px] font-semibold text-brand-muted mb-[16px]">
                            {authorMeta}
                        </p>
                    )}

                    <Link href={`/${lang}/blog/${post.slug}`} className="group mb-[16px]">
                        <h2 className="text-[40px] sm:text-[48px] lg:text-[56px] font-bold text-brand-primary leading-[1.15] group-hover:opacity-80 transition-opacity duration-150 overflow-hidden" style={{ fontVariationSettings: "'wdth' 100", display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                            {post.title}
                        </h2>
                    </Link>

                    {categoryBadges.length > 0 && (
                        <p className="text-[16px] font-medium text-brand-muted mb-[50px]">
                            {categoryBadges.join(', ')}
                        </p>
                    )}

                    <div className="shrink-0 flex">
                        <Button href={`/${lang}/blog/${post.slug}`} className="inline-flex items-center justify-center px-[56px] min-w-[240px] h-[56px] rounded-[56px] text-[18px] font-bold bg-[#0076F4] text-white hover:opacity-90 transition-opacity tracking-wide" style={{ boxShadow: '0 4px 0 0 #004C9D' }}>
                            Read More
                        </Button>
                    </div>
                </div>

            
                <div className={`relative w-full flex-1 max-w-[756px] h-[440px] lg:h-[520px] rounded-[20px] ml-auto bg-gradient-to-br from-[#9CC6FF] to-[#609FFF] p-6 lg:p-10`}>
                    {isBlogHero ? (
                        <div className="relative w-full h-full">
                            <Image 
                                src="/blog/image 41.svg" 
                                alt="Karate Pug" 
                                fill
                                priority 
                                className="z-10 object-contain -translate-y-4 lg:-translate-y-8"
                                sizes="(max-width: 1024px) 100vw, 756px"
                            />
                            <div className="absolute -bottom-[6px] lg:-bottom-[22px] right-[5%] lg:right-[8%] w-[440px] h-[120px] z-0 pointer-events-none">
                                <Image 
                                    src="/blog/Ellipse 60.svg" 
                                    alt="Shadow" 
                                    fill
                                    className="object-contain opacity-100"
                                    style={{ filter: 'brightness(0.5) blur(4px)' }}
                                />
                            </div>
                        </div>
                    ) : post.imageUrl ? (
                        <Image src={post.imageUrl} alt={post.title} fill priority loading="eager" className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 756px" />
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

