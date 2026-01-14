import { buttonVariants } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  id?: string
}

export default function PaginationWithPrimaryButton({
  currentPage,
  totalPages,
  onPageChange,
  id,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    
  return (
    <Pagination className='w-full'>
      <PaginationContent className='flex justify-between items-center w-full'>
        <PaginationItem>
          <PaginationPrevious
            href='#sectionbar'
            onClick={(e) => {
              e.preventDefault()
              if (currentPage > 1) onPageChange(currentPage - 1)
              document.getElementById(`${id}`)?.scrollIntoView({ behavior: 'smooth' })
            }}
            className={cn(
              currentPage === 1 && 'pointer-events-none opacity-50',
            )}
          />
        </PaginationItem>

        <div className='flex items-center gap-2'>
          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href='#'
                onClick={(e) => {
                  e.preventDefault()
                  onPageChange(page)
                  document.getElementById(`${id}`)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={cn(page === currentPage &&
                    buttonVariants({
                      variant: 'outline',
                      size: 'icon',
                    }),
                  'hover:bg-gray-100',
                )}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
        </div>

        <PaginationItem>
          <PaginationNext
            href='#'
            onClick={(e) => {
              e.preventDefault()
              if (currentPage < totalPages) onPageChange(currentPage + 1)
              document
                .getElementById(`${id}`)
                ?.scrollIntoView({ behavior: 'smooth' })
            }}
            className={cn(
              currentPage === totalPages && 'pointer-events-none opacity-50',
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
