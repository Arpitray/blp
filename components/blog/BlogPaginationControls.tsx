'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Pagination from './Pagination'

interface Props {
  currentPage: number
  totalPages: number
}

export default function BlogPaginationControls({ currentPage, totalPages }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  )
}
