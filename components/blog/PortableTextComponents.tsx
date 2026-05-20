'use client'

import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import { getBlockText, toHeadingId } from '@/lib/utils/heading'
import { useEffect, useRef, useState } from 'react'
import type { PortableTextComponents } from '@portabletext/react'

function useHeadingReveal() {
    const ref = useRef<HTMLHeadingElement>(null)
    const [state, setState] = useState<'skeleton' | 'visible'>('skeleton')

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // small delay so skeleton is briefly visible before reveal
                    const timer = setTimeout(() => setState('visible'), 80)
                    observer.disconnect()
                    return () => clearTimeout(timer)
                }
            },
            { threshold: 0.15 }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return { ref, state }
}

function HeadingSkeleton({ width = '70%' }: { width?: string }) {
    return (
        <span
            className="block rounded-md animate-pulse"
            style={{
                width,
                height: '1em',
                background: 'linear-gradient(90deg, rgba(0,41,84,0.08) 25%, rgba(0,41,84,0.15) 50%, rgba(0,41,84,0.08) 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.4s infinite',
            }}
        />
    )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
    const [open, setOpen] = useState(false)
    const answerRef = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState(0)

    useEffect(() => {
        if (answerRef.current) {
            setHeight(answerRef.current.scrollHeight)
        }
    }, [answer])

    return (
        <div className={`w-full bg-white rounded-[25px] border-0 border-none transition-all duration-300 overflow-hidden shadow-[0_10px_16px_-6px_#c4defd] ${open ? 'shadow-[0_14px_20px_-6px_#c4defd]' : ''}`}>
            {/* Pill Header */}
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group border-none border-0 outline-none focus:outline-none focus:ring-0"
                aria-expanded={open}
            >
                <span
                    className="text-[17px] md:text-[18px] font-bold text-brand-primary leading-snug"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                >
                    {question}
                </span>

                {/* +/× pill icon */}
                <span
                    className="shrink-0 w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                        background: open ? '#1160FF' : 'rgba(17,96,255,0.08)',
                    }}
                    aria-hidden
                >
                    <span
                        className="block transition-transform duration-300 text-[18px] leading-none font-bold"
                        style={{
                            color: open ? '#fff' : '#1160FF',
                            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
                        }}
                    >
                        +
                    </span>
                </span>
            </button>

            {/* Answer — smooth height + fade */}
            <div
                style={{
                    maxHeight: open ? `${height}px` : '0px',
                    opacity: open ? 1 : 0,
                    transition: 'max-height 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.28s ease',
                    overflow: 'hidden',
                }}
            >
                <div ref={answerRef} className="px-6 pb-6 pt-1">
                    <p
                        className="text-[16px] md:text-[17px] font-medium text-brand-primary leading-[1.7] opacity-80"
                    >
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    )
}

export function FaqBlock({ value }: { value: { items?: { question: string; answer: string }[] } }) {
    if (!value?.items?.length) return null

    return (
        <div className="my-10 flex flex-col gap-3">
            {value.items.map((item, i) => (
                <FaqItem key={i} question={item.question} answer={item.answer} />
            ))}
        </div>
    )
}

function SectionDivider() {
    return (
        <div className="py-20" aria-hidden>
            <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent" />
        </div>
    )
}

export const portableTextComponents: PortableTextComponents = {

    block: {
        h2: ({ children, value }) => {
            const id = toHeadingId(getBlockText(value.children as any))
            return (
                <h2 id={id} className="mt-20 mb-8 text-[28px] md:text-[36px] font-black tracking-tight text-brand-primary scroll-mt-24 group">
                    <a href={`#${id}`} className="absolute -ml-8 opacity-0 group-hover:opacity-50 transition-opacity no-underline text-brand-accent">
                        #
                    </a>
                    {children}
                </h2>
            )
        },
        h3: ({ children, value }) => {
            const id = toHeadingId(getBlockText(value.children as any))
            return (
                <h3 id={id} className="mt-12 mb-6 text-[22px] md:text-[28px] font-extrabold text-brand-primary scroll-mt-24">
                    {children}
                </h3>
            )
        },
        h4: ({ children, value }) => {
            const id = toHeadingId(getBlockText(value.children as any))
            return (
                <h4 id={id} className="mt-10 mb-4 text-[18px] md:text-[22px] font-bold opacity-90 text-brand-primary scroll-mt-24">
                    {children}
                </h4>
            )
        },
        normal: ({ children }) => (
            <p className="mb-8 text-[17px] md:text-[19px] leading-[1.8] font-medium text-brand-primary/90">
                {children}
            </p>
        ),
        blockquote: ({ children }) => (
            <blockquote className="my-12 pl-8 pr-6 py-6 bg-brand-accent/[0.03] border-l-4 border-brand-accent rounded-r-2xl italic text-[20px] text-brand-primary/90 leading-relaxed">
                &quot;{children}&quot;
            </blockquote>
        ),
    },

    list: {
        bullet: ({ children }) => (
            <ul className="my-8 space-y-4 pl-6 ml-4 list-disc text-brand-primary">{children}</ul>
        ),
        number: ({ children }) => (
            <ol className="my-8 space-y-4 pl-6 ml-4 list-decimal text-brand-primary">{children}</ol>
        ),
    },

    listItem: {
        bullet: ({ children }) => (
            <li className="text-[18px] pl-2 leading-relaxed">
                <span className="block [&>ul]:mt-4 [&>ul]:space-y-3 [&>ul]:pl-6 [&>ul>li]:text-[17px] [&>ol]:mt-4 [&>ol]:space-y-3 [&>ol]:pl-6 [&>ol>li]:text-[17px]">
                    {children}
                </span>
            </li>
        ),
        number: ({ children }) => (
            <li className="text-[18px] pl-2 leading-relaxed">
                <span className="block [&>ul]:mt-4 [&>ul]:space-y-3 [&>ul]:pl-6 [&>ul>li]:text-[17px] [&>ol]:mt-4 [&>ol]:space-y-3 [&>ol]:pl-6 [&>ol>li]:text-[17px]">
                    {children}
                </span>
            </li>
        ),
    },

    marks: {
        link: ({ children, value }) => {
            const href = value?.href ?? '#'
            return (
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="premium-link"
                >
                    {children}
                </a>
            )
        },
    },

    // ── Custom Block Types ────────────────────────────────────────────
    types: {
        image: ({ value }: { value: any }) => {
            const imageUrl = urlFor(value).url()
            if (!imageUrl) return null

            return (
                <figure className="my-10">
                    <Image
                        src={imageUrl}
                        alt={value.alt || 'Blog image'}
                        width={800}
                        height={450}
                        className="rounded-[18px] w-full object-cover shadow-[0_8px_32px_rgba(0,41,84,0.10)]"
                        loading="lazy"
                    />
                    {value.alt && (
                        <figcaption className="text-[13px] text-center text-brand-muted mt-3 font-medium opacity-70">
                            {value.alt}
                        </figcaption>
                    )}
                </figure>
            )
        },

        // FAQ block — requires faqBlock schema type in Sanity
        faqBlock: ({ value }: { value: any }) => <FaqBlock value={value} />,

        // Section divider — manual HR block type
        sectionDivider: () => <SectionDivider />,
    },
}

function AnimatedH2({
    id,
    children,
}: {
    id: string
    children?: React.ReactNode
}) {
    const { ref, state } = useHeadingReveal()

    return (
        <h2
            ref={ref}
            id={id}
            className="text-[26px] md:text-[32px] font-black text-brand-primary mt-14 mb-2 leading-[1.25] scroll-mt-[120px]"
            style={{
                fontVariationSettings: "'wdth' 100",
                opacity: state === 'visible' ? 1 : 0,
                transform: state === 'visible' ? 'translateY(0px)' : 'translateY(20px)',
                transition: 'opacity 0.48s ease, transform 0.48s cubic-bezier(0.22,1,0.36,1)',
            }}
        >
            {state === 'skeleton' ? <HeadingSkeleton width="65%" /> : children}
        </h2>
    )
}

function AnimatedH3({
    id,
    children,
}: {
    id: string
    children?: React.ReactNode
}) {
    const { ref, state } = useHeadingReveal()

    return (
        <h3
            ref={ref}
            id={id}
            className="text-[21px] md:text-[26px] font-bold text-brand-primary mt-10 mb-2 leading-[1.3] scroll-mt-[120px]"
            style={{
                fontVariationSettings: "'wdth' 100",
                opacity: state === 'visible' ? 1 : 0,
                transform: state === 'visible' ? 'translateY(0px)' : 'translateY(20px)',
                transition: 'opacity 0.42s ease, transform 0.42s cubic-bezier(0.22,1,0.36,1)',
            }}
        >
            {state === 'skeleton' ? <HeadingSkeleton width="50%" /> : children}
        </h3>
    )
}