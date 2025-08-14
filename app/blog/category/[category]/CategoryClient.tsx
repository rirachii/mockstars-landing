'use client'

import Link from 'next/link'
import { useSearchParams, usePathname } from 'next/navigation'
import { ArticleGrid } from '@/components/blog/article-grid'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'

interface CategoryClientProps {
  posts: any[]
  categoryName: string
}

export default function CategoryClient({ posts, categoryName }: CategoryClientProps) {
  const perPage = 9
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const raw = searchParams.get('page')
  const page = Math.max(1, Number(raw) || 1)
  const startIndex = (page - 1) * perPage
  const pagePosts = posts.slice(startIndex, startIndex + perPage)
  const totalPages = Math.max(1, Math.ceil(posts.length / perPage))

  const createHref = (p: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (p === 1) {
      params.delete('page')
    } else {
      params.set('page', String(p))
    }
    const qs = params.toString()
    return qs ? `${pathname}?${qs}` : pathname
  }

  return (
    <>
      <ArticleGrid
        posts={pagePosts}
        title={categoryName}
        eyebrow="CATEGORY"
        description=""
        limit={perPage}
        showHeader
      />

      {totalPages > 1 && (
        <div className="container mx-auto px-4 -mt-4 pb-12">
          <div className="max-w-6xl mx-auto">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href={page > 1 ? createHref(page - 1) : undefined} aria-disabled={page === 1} />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <PaginationItem key={p}>
                    <PaginationLink href={createHref(p)} isActive={p === page}>
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext href={page < totalPages ? createHref(page + 1) : undefined} aria-disabled={page === totalPages} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>

          <div className="container flex justify-center pt-8">
            <Link
              href="/blog"
              className="bg-white/80 backdrop-blur-sm text-blue border-2 border-blue font-semibold px-8 py-4 rounded-full hover:bg-blue hover:text-white transition-colors font-mattone shadow-lg"
            >
              ← Back to All Articles
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
