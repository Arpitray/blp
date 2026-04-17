'use client'


import { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Dropdown from '../header/Dropdown'
import { DropdownItem } from '../header/headerData'
import { ArrowIcon } from '../header/HeaderIcons'

interface Props {
  categories: string[]
  currentCategory: string
}

export default function CategoryDropdown({ categories, currentCategory }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Closes dropdown when clicking outside
  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false)
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [])

  // Navigates to /blog with the selected category, resetting to page 1
  const handleSelect = (category: string) => {
    setIsOpen(false)
    const params = new URLSearchParams(searchParams.toString())
    params.delete('page')
    category === 'All' ? params.delete('category') : params.set('category', category)
    
    // Extract current lang from the beginning of the pathname
    const segments = window.location.pathname.split('/').filter(Boolean)
    const currentLang = segments[0] || 'en'
    
    router.push(`/${currentLang}/blog?${params.toString()}`, { scroll: false })
  }

  const items: DropdownItem[] = ['All', ...categories].map((cat) => ({
    label: cat,
    onClick: () => handleSelect(cat),
  }))

  const handleToggle = () => {
    const nextIsOpen = !isOpen
    setIsOpen(nextIsOpen)

    if (nextIsOpen && ref.current) {
      // Smooth scroll to element, accounting for the fixed header (approx 120-150px)
      const yOffset = -150
      const y = ref.current.getBoundingClientRect().top + window.scrollY + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div ref={ref} className="relative flex justify-end">
      <button
        type="button"
        onClick={handleToggle}
        className="inline-flex items-center gap-[5px] font-bold text-brand-primary text-[18px] hover:opacity-80 transition-opacity"
      >
        {currentCategory} <ArrowIcon isOpen={isOpen} />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 z-50 min-w-[200px]">
          <Dropdown items={items} className="!left-auto !right-0 !translate-x-0" />
        </div>
      )}
    </div>
  )
}
