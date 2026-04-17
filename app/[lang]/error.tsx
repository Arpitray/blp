'use client'

import { RouteErrorState } from '@/components/route-state/RouteState'

export default function LangError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return <RouteErrorState variant="locale" title="Unable to load this page" description="Try again to reload the current route." reset={reset} />
}