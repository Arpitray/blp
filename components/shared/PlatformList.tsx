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
    { id: 'windows', name: 'Windows', label: 'BlockP for Windows', icon: '/windows.svg', href: '/products/microsoft' },
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
        <div className="flex flex-wrap items-center justify-center gap-18 md:gap-32 px-6 relative z-10">
            {PLATFORMS.map((platform) => (
                <Link 
                    key={platform.id} 
                    href={`/${locale}${platform.href}`}
                    className="flex flex-col items-center gap-4 transition-all duration-300"
                >
                    <div 
                        style={{
                            backgroundColor: '#012955',
                            maskImage: `url(${platform.icon})`,
                            WebkitMaskImage: `url(${platform.icon})`,
                            maskRepeat: 'no-repeat',
                            WebkitMaskRepeat: 'no-repeat',
                            maskPosition: 'center',
                            WebkitMaskPosition: 'center',
                            maskSize: 'contain',
                            WebkitMaskSize: 'contain'
                        }}
                        className="w-[55px] h-[55px] md:w-[68px] md:h-[68px]"
                        aria-label={platform.name}
                    />
                    <span className="text-[18px] md:text-[22px] font-bold text-[#012955] tracking-tight leading-none">{platform.name}</span>
                </Link>
            ))}
        </div>
    )
}
