'use client'


interface Props {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

// Builds the visible page number sequence with ellipsis gaps
function buildPageRange(current: number, total: number): (number | '...')[] {
  const pages: (number | '...')[] = []
  const add = (n: number | '...') => pages[pages.length - 1] !== n && pages.push(n)

  add(1)
  if (current > 3) add('...')
  if (current > 2) add(current - 1)
  if (current !== 1 && current !== total) add(current)
  if (current < total - 1) add(current + 1)
  if (current < total - 2) add('...')
  add(total)

  return pages
}

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null

  const pages = buildPageRange(currentPage, totalPages)

  // Token: Base circle (40x40)
  const base = 'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 font-["Anek_Latin"]'

  // Specific styles for active and inactive states
  const activeStyle = `${base} bg-[#0076F5] text-white font-bold text-[19px]`
  const inactiveStyle = `${base} border border-[#0076F5] text-[#0076F5] text-[19px] hover:bg-[#0076F5] hover:text-white`

  // Navigation button style — slightly thicker stroke icon for visual balance with bold numbers
  const navStyle = `${base} border border-[#0076F5] text-[#0076F5] hover:bg-[#0076F5] hover:text-white`

  return (
    <nav aria-label="Pagination" className="w-full flex justify-center">
      <div className="flex items-center gap-[10px]">
        {/* Previous page arrow — uses absolute centering SVG */}
        {currentPage > 1 ? (
          <button
            className={navStyle}
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="Go to previous page"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        ) : (
          <div className="w-10 h-10" aria-hidden="true" /> // Spacer to preserve centering
        )}

        {/* Dynamic page sequence */}
        <div className="flex items-center gap-[10px]">
          {pages.map((p, i) =>
            p === '...' ? (
              <span key={`ellipsis-${i}`} className={inactiveStyle} aria-hidden>...</span>
            ) : (
              <button
                key={p}
                className={p === currentPage ? activeStyle : inactiveStyle}
                onClick={() => p !== currentPage && onPageChange(p)}
                aria-current={p === currentPage ? 'page' : undefined}
              >
                {p}
              </button>
            )
          )}
        </div>

        {/* Next page arrow — uses absolute centering SVG */}
        {currentPage < totalPages ? (
          <button
            className={navStyle}
            onClick={() => onPageChange(currentPage + 1)}
            aria-label="Go to next page"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        ) : (
          <div className="w-10 h-10" aria-hidden="true" /> // Spacer to preserve centering
        )}
      </div>
    </nav>
  )
}
