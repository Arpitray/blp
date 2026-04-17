'use client'

import { RouteErrorState } from '@/components/route-state/RouteState'

export default function BlogError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return <RouteErrorState variant="blog-list" title="Something went wrong" description="We could not load the blog listing right now." reset={reset} />
}