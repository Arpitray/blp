'use client'

import Link from 'next/link'
import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { GlobeIcon, ArrowIcon } from './header/HeaderIcons'
import Dropdown from './header/Dropdown'
import { Button } from './layout/ui/Button'
import { getLanguageItems, getProductItems, getUiCopy } from './header/headerHelpers'

export default function Header() {
    const router = useRouter()
    const pathname = usePathname()
    const [langOpen, setLangOpen] = useState(false)
    const [productsOpen, setProductsOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    const langRef = useRef<HTMLDivElement>(null)
    const productsRef = useRef<HTMLLIElement>(null)

    const closeAll = useCallback(() => {
        setLangOpen(false)
        setProductsOpen(false)
    }, [])

    const segments = pathname?.split('/').filter(Boolean) ?? []
    const currentLocale = segments[0] || 'en'
    const currentLang = currentLocale.toUpperCase()
    const uiCopy = getUiCopy(currentLocale)

    // Smart Sticky Logic: Hide on scroll down, Show on scroll up
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            // Show if we're near the very top (less than 50px)
            if (currentScrollY < 50) {
                setIsVisible(true)
            }
            // Hide if scrolling down past 150px
            else if (currentScrollY > lastScrollY && currentScrollY > 150) {
                setIsVisible(false)
                closeAll() // Auto-close dropdowns when hiding
            }
            // Show if scrolling up
            else if (currentScrollY < lastScrollY) {
                setIsVisible(true)
            }

            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY, closeAll])

    // Cleanup and Outside Click logic
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && closeAll()
        const onMouseDown = (e: MouseEvent) => {
            const t = e.target as Node
            if (langRef.current && !langRef.current.contains(t)) setLangOpen(false)
            if (productsRef.current && !productsRef.current.contains(t)) setProductsOpen(false)
        }
        document.addEventListener('keydown', onKeyDown)
        document.addEventListener('mousedown', onMouseDown)
        return () => {
            document.removeEventListener('keydown', onKeyDown)
            document.removeEventListener('mousedown', onMouseDown)
        }
    }, [closeAll])

    const handleLangSelect = (code: string) => {
        // Extract the current path without the language prefix
        if (!pathname) return;
        const segments = pathname.split('/').filter(Boolean);
        const pathWithoutLang = '/' + segments.slice(1).join('/');

        setLangOpen(false);

        // Middleware syncs NEXT_LOCALE from the locale-prefixed path.
        const localeCode = code.toLowerCase();

        // Redirect to the same page but with the new language
        router.push(`/${localeCode}${pathWithoutLang === '/' ? '' : pathWithoutLang}`);
    }

    return (

        <div
            className={`w-full fixed top-0 z-[100] bg-transparent pt-[25px] pb-[10px] flex justify-center transition-all duration-500 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
                }`}
        >
            <div className="w-full max-w-[1600px] px-[12px] lg:px-[40px] flex justify-center">
                <header className="topbar-card bg-white flex items-center justify-between pl-[20px] lg:pl-[32px] pr-[8px] lg:pr-[12px] h-[68px] w-full">
                    <Link href={`/${currentLocale}`} className="shrink-0 font-extrabold text-[32px] text-brand-primary">
                        Block<span className="text-brand-accent">P</span>.
                    </Link>

                    <div className="flex items-center ml-auto gap-[80px]">
                        <div className="flex items-center gap-nav-gap">
                            <nav>
                                <ul className="flex items-center gap-nav-gap">
                                    <li ref={productsRef} className="relative h-[68px] flex items-center" onMouseEnter={() => setProductsOpen(true)} onMouseLeave={() => setProductsOpen(false)}>
                                        <Button type="button" variant="nav" className="inline-flex items-center gap-[5px]">
                                            {uiCopy.products} <ArrowIcon isOpen={productsOpen} />
                                        </Button>
                                        {productsOpen && <Dropdown items={getProductItems(currentLocale)} onItemClick={() => setProductsOpen(false)} className="min-w-[230px]" />}
                                    </li>
                                    <li className="h-[68px] flex items-center"><Button href={`/${currentLocale}/blog`} variant="nav">{uiCopy.blog}</Button></li>
                                    <li className="h-[68px] flex items-center"><Button href="/premium" variant="nav">{uiCopy.premium}</Button></li>
                                </ul>
                            </nav>

                            <div ref={langRef} className="relative h-[68px] flex items-center" onMouseEnter={() => setLangOpen(true)} onMouseLeave={() => setLangOpen(false)}>
                                <Button type="button" variant="nav" className="inline-flex items-center gap-[5px]">
                                    <GlobeIcon /> <span className="font-bold">{currentLang}</span> <ArrowIcon isOpen={langOpen} />
                                </Button>
                                {langOpen && <Dropdown items={getLanguageItems(handleLangSelect)} className="min-w-[310px]" isLanguage={true} />}
                            </div>
                        </div>
                        <Button href="/get-started" variant="cta">{uiCopy.getStarted}</Button>
                    </div>
                </header>
            </div>
        </div>
    )
}
