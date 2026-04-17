import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export type Platform = {
    id: string
    name: string
    label: string
    icon: string
    href: string
}

export const PLATFORMS: Platform[] = [
    { id: 'android', name: 'Android', label: 'BlockP for Android', icon: '/android.svg', href: '/products/android' },
    { id: 'ios', name: 'iOS', label: 'BlockP for iOS', icon: '/apple.svg', href: '/products/ios' },
    { id: 'macos', name: 'macOS', label: 'BlockP for macOS', icon: '/macos.svg', href: '/products/macos' },
    { id: 'chrome', name: 'Chrome', label: 'BlockP for Chrome', icon: '/chrome.svg', href: '/products/chrome' },
    { id: 'windows', name: 'Windows', label: 'BlockP for Windows', icon: '/windows.svg', href: '/products/windows' },
]

interface PlatformListProps {
    variant: 'dropdown' | 'banner'
    locale?: string
}

export const PlatformList: React.FC<PlatformListProps> = ({ variant, locale = 'en' }) => {
    if (variant === 'dropdown') {
        return (
            <>
                {PLATFORMS.map((platform, i) => (
                    <div key={platform.id}>
                        <Link href={`/${locale}${platform.href}`} role="menuitem" className="flex items-center gap-[10px] min-h-[28px] w-full transition-opacity duration-150 hover:opacity-60">
                            <div className="relative shrink-0 size-[26px]">
                                {/* Using regular img for SVG icons */}
                                <img src={platform.icon} alt={`${platform.name} icon`} aria-hidden="true" className="size-full object-contain" />
                            </div>
                            <span className="nav-link shrink-0 whitespace-nowrap text-[16px] font-medium">{platform.label}</span>
                        </Link>
                        {i < PLATFORMS.length - 1 && (
                            <div className="mt-[10px]">
                                <img src="/d92ac4c08d968bb3fb3ebb875fb78790f58cdfa9.svg" alt="" aria-hidden="true" className="w-full" />
                            </div>
                        )}
                    </div>
                ))}
            </>
        )
    }

    // Banner variant
    return (
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 px-6 relative z-10">
            {PLATFORMS.map((platform) => (
                <Link 
                    key={platform.id} 
                    href={`/${locale}${platform.href}`}
                    className="flex flex-col items-center gap-3 opacity-90 hover:opacity-100 hover:-translate-y-1 transition-all duration-300"
                >
                    <img
                        src={platform.icon}
                        alt={platform.name}
                        // Applying CSS filter to turn SVGs into brand primary color (#002954)
                        className="w-[45px] h-[45px] md:w-[52px] md:h-[52px] object-contain filter invert-[.15] sepia-[.95] saturate-[3.5] hue-rotate-[205deg] brightness-[.4] contrast-[.9]"
                    />
                    <span className="text-[16px] md:text-[20px] font-bold text-[#002954] tracking-tight leading-none">{platform.name}</span>
                </Link>
            ))}
        </div>
    )
}
