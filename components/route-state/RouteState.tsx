import React from 'react'

interface RouteLoadingStateProps {
    variant: 'locale' | 'blog-list' | 'blog-post'
}

interface RouteErrorStateProps {
    variant: 'locale' | 'blog-list' | 'blog-post'
    title: string
    description: string
    reset: () => void
}

function getLoadingClasses(variant: RouteLoadingStateProps['variant']): string {
    if (variant === 'blog-post') {
        return 'w-full flex flex-col items-center bg-[#F6FAFF] mb-[120px]'
    }

    return 'w-full px-[12px] lg:px-[40px] mb-[100px] max-w-site mx-auto'
}

function getLoadingInnerClasses(variant: RouteLoadingStateProps['variant']): string {
    if (variant === 'locale') {
        return 'animate-pulse space-y-6 pt-[120px]'
    }

    if (variant === 'blog-list') {
        return 'animate-pulse space-y-12 pt-[180px]'
    }

    return 'w-full max-w-site px-[12px] lg:px-[40px] pt-16 animate-pulse space-y-8'
}

function getErrorClasses(variant: RouteErrorStateProps['variant']): string {
    if (variant === 'blog-post') {
        return 'w-full flex flex-col items-center bg-[#F6FAFF] mb-[120px]'
    }

    return 'w-full px-[12px] lg:px-[40px] pt-[120px] mb-[100px] max-w-site mx-auto'
}

export function RouteLoadingState({ variant }: RouteLoadingStateProps) {
    if (variant === 'locale') {
        return (
            <main className={getLoadingClasses(variant)}>
                <div className={getLoadingInnerClasses(variant)}>
                    <div className="h-10 w-72 rounded bg-gray-200" />
                    <div className="h-6 w-1/2 rounded bg-gray-200" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                        <div className="h-80 rounded-[24px] bg-gray-200" />
                        <div className="h-80 rounded-[24px] bg-gray-200" />
                        <div className="h-80 rounded-[24px] bg-gray-200" />
                    </div>
                </div>
            </main>
        )
    }

    if (variant === 'blog-list') {
        return (
            <main className={getLoadingClasses(variant)}>
                <div className={getLoadingInnerClasses(variant)}>
                    <div className="h-10 w-80 rounded bg-gray-200" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-8">
                        <div className="h-[360px] rounded-[24px] bg-gray-200" />
                        <div className="h-[360px] rounded-[24px] bg-gray-200" />
                        <div className="h-[360px] rounded-[24px] bg-gray-200" />
                    </div>
                </div>
            </main>
        )
    }

    return (
        <div className={getLoadingClasses(variant)}>
            <div className={getLoadingInnerClasses(variant)}>
                <div className="h-[540px] rounded-[32px] bg-gray-200" />
                <div className="mx-auto h-12 w-2/3 rounded bg-gray-200" />
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-[60px]">
                    <div className="space-y-4">
                        <div className="h-6 w-full rounded bg-gray-200" />
                        <div className="h-6 w-5/6 rounded bg-gray-200" />
                        <div className="h-6 w-4/6 rounded bg-gray-200" />
                    </div>
                    <div className="h-[420px] rounded-[32px] bg-gray-200" />
                </div>
            </div>
        </div>
    )
}

export function RouteErrorState({ variant, title, description, reset }: RouteErrorStateProps) {
    if (variant === 'blog-post') {
        return (
            <div className={getErrorClasses(variant)}>
                <div className="w-full bg-gray-100 py-2 px-10 text-xs font-mono border-b border-gray-200 uppercase">
                    <span className="text-gray-500">Blog</span>
                </div>
                <div className="w-full max-w-[960px] px-6 py-24">
                    <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm">
                        <h2 className="text-3xl font-bold text-brand-primary">{title}</h2>
                        <p className="mt-4 text-brand-muted">{description}</p>
                        <button
                            type="button"
                            onClick={() => reset()}
                            className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-accent px-6 py-3 text-white"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <main className={getErrorClasses(variant)}>
            <div className="rounded-[24px] border border-gray-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-brand-primary">{title}</h2>
                <p className="mt-3 text-brand-muted">{description}</p>
                <button
                    type="button"
                    onClick={() => reset()}
                    className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-accent px-6 py-3 text-white"
                >
                    Try again
                </button>
            </div>
        </main>
    )
}