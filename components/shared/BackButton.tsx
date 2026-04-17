'use client'

import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

interface BackButtonProps {
  children: ReactNode
  className?: string
  ariaLabel?: string
  fallbackHref?: string
}

export function BackButton({
  children,
  className,
  ariaLabel = 'Go back',
  fallbackHref,
}: BackButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (window.history.length > 1) {
      router.back()
      return
    }

    if (fallbackHref) {
      router.push(fallbackHref)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </button>
  )
}
