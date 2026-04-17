'use client'

import { RouteErrorState } from '@/components/route-state/RouteState'

export default function BlogPostError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return <RouteErrorState variant="blog-post" title="Unable to load this article" description="The article data could not be loaded. Please try again." reset={reset} />
}