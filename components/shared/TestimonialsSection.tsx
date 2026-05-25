'use client'

import { useState } from 'react'

interface TestimonialItem {
    quote: string
    authorName: string
    authorRole?: string
    rating?: number
}

interface TestimonialsSectionProps {
    sectionTitle?: string
    testimonials: TestimonialItem[]
}

export function TestimonialsSection({ sectionTitle, testimonials }: TestimonialsSectionProps) {
    const [activeIndex, setActiveIndex] = useState(0)

    if (!testimonials || testimonials.length === 0) return null

    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
    }

    const handleNext = () => {
        setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    }

    return (
        <section className="w-full py-[96px] flex flex-col items-center bg-white relative z-20 overflow-hidden">
            <div className="w-full max-w-[1640px] h-[1px] bg-gray-200" />

            <div className="w-full max-w-[1121px] px-6 mt-[96px] mb-[96px] flex flex-col items-center">
                <div className="flex flex-col gap-[80px] items-center w-full">
                    <h2
                        className="text-[48px] font-bold text-[#002954] text-center leading-[1.2]"
                        style={{ fontVariationSettings: "'wdth' 100", textShadow: '0px 0px 4px rgba(255, 255, 255, 0.35)' }}
                    >
                        {sectionTitle ?? 'What our users say about us'}
                    </h2>

                    {/* Carousel Viewport Container */}
                    <div className="relative w-full max-w-[1027px] overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                        >
                            {testimonials.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="w-full flex-shrink-0 flex flex-col gap-[60px] items-center px-4 md:px-12"
                                >
                                    {/* Stars */}
                                    <div className="flex gap-[8px] items-center">
                                        {Array.from({ length: item.rating ?? 5 }).map((_, i) => (
                                            <svg
                                                key={i}
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="#002954"
                                                stroke="#002954"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-[50px] h-[50px] md:w-[66px] md:h-[66px]"
                                            >
                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                            </svg>
                                        ))}
                                    </div>

                                    {/* Quote */}
                                    <p
                                        className="text-[24px] md:text-[32px] font-bold text-[#002954] text-center leading-[1.44] min-h-[140px] flex items-center justify-center"
                                        style={{ fontVariationSettings: "'wdth' 100", textShadow: '0px 0px 4px rgba(255, 255, 255, 0.35)' }}
                                    >
                                        &quot;{item.quote}&quot;
                                    </p>

                                    {/* Author & Pagination spacing */}
                                    <div className="flex flex-col items-center gap-[1px]">
                                        <p
                                            className="text-[24px] md:text-[32px] font-bold text-[#002954] text-center leading-[1.44]"
                                            style={{ fontVariationSettings: "'wdth' 100", textShadow: '0px 0px 4px rgba(255, 255, 255, 0.35)' }}
                                        >
                                            {item.authorName}
                                        </p>
                                        <p
                                            className="text-[16px] md:text-[20px] font-medium text-[#595959] text-center"
                                            style={{ fontVariationSettings: "'wdth' 100" }}
                                        >
                                            {item.authorRole ?? 'BlockP User'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pagination / Navigation controls */}
                    <div className="flex items-center gap-8 text-[#002954] mt-4">
                        <button
                            onClick={handlePrev}
                            className="hover:opacity-60 transition-opacity p-2 hover:bg-gray-100 rounded-full focus:outline-none"
                            aria-label="Previous testimonial"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>

                        <div className="flex gap-4">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveIndex(i)}
                                    className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                                        i === activeIndex ? 'bg-[#002954] scale-110' : 'border-2 border-[#002954]/30 hover:border-[#002954]/60'
                                    }`}
                                    aria-label={`Go to testimonial ${i + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={handleNext}
                            className="hover:opacity-60 transition-opacity p-2 hover:bg-gray-100 rounded-full focus:outline-none"
                            aria-label="Next testimonial"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-[1640px] h-[1px] bg-gray-200" />
        </section>
    )
}
