import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import { getBlockText, toHeadingId } from '@/lib/utils/heading'
import type { PortableTextComponents } from '@portabletext/react'
import { FaqBlock } from '@/components/blog/PortableTextComponents'

// Server-safe PortableText renderers (no hooks, no client-only components)
export const portableTextComponentsServer: PortableTextComponents = {
    types: {
        faqBlock: ({ value }: { value: any }) => <FaqBlock value={value} />,
        image: ({ value }: { value: any }) => {
            const imageUrl = urlFor(value).url();
            if (!imageUrl) return null;

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
        sectionDivider: () => (
            <div className="py-20 w-full" aria-hidden="true">
                <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent" />
            </div>
        ),
        break: () => (
            <div className="py-20 w-full" aria-hidden="true">
                <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent" />
            </div>
        ),
        hr: () => (
            <div className="py-20 w-full" aria-hidden="true">
                <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent" />
            </div>
        ),
    },

    block: {
        h2: ({ children, value }: { children?: React.ReactNode, value: any }) => {
            const id = toHeadingId(getBlockText(value?.children))
            return (
                <h2 id={id} className="mt-20 mb-8 text-[28px] md:text-[36px] font-black tracking-tight text-brand-primary scroll-mt-32 group">
                    <a href={`#${id}`} className="absolute -ml-8 opacity-0 group-hover:opacity-50 transition-opacity no-underline text-brand-accent">
                        #
                    </a>
                    {children}
                </h2>
            )
        },
        h3: ({ children, value }: { children?: React.ReactNode, value: any }) => {
            const id = toHeadingId(getBlockText(value?.children))
            return (
                <h3 id={id} className="mt-12 mb-6 text-[22px] md:text-[28px] font-extrabold text-brand-primary scroll-mt-32">
                    {children}
                </h3>
            )
        },
        h4: ({ children, value }: { children?: React.ReactNode, value: any }) => {
            const id = toHeadingId(getBlockText(value?.children))
            return (
                <h4 id={id} className="mt-10 mb-4 text-[18px] md:text-[22px] font-bold opacity-90 text-brand-primary scroll-mt-32">
                    {children}
                </h4>
            )
        },
        normal: ({ children }: { children?: React.ReactNode }) => (
            <p className="mb-8 text-[17px] md:text-[19px] leading-[1.8] font-medium text-brand-primary/90">
                {children}
            </p>
        ),
        blockquote: ({ children }: { children?: React.ReactNode }) => (
            <blockquote className="my-12 pl-8 pr-6 py-6 bg-brand-accent/[0.03] border-l-4 border-brand-accent rounded-r-2xl italic text-[20px] text-brand-primary/90 leading-relaxed shadow-sm">
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
        link: ({ children, value }: { children?: React.ReactNode, value?: { href?: string } }) => {
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
}

export default portableTextComponentsServer
