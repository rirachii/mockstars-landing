'use client'

import Link from 'next/link'
import { useSearchParams, usePathname } from 'next/navigation'
import { Clock } from 'lucide-react'
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
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="text-2xs uppercase tracking-widest text-teal-600 mb-2 font-mattone">CATEGORY</div>
            <h1 className="text-2xl md:5xl font-bold tracking-tight font-mattone mb-8">
              <span className="gradient-text">{categoryName}</span>
            </h1>

            <div className="mb-8">
              {pagePosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pagePosts.map((post) => (
                    <div key={post.slug} className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 group">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.image || '/images/blog/interview-default.jpg'}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {post.category && (
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold rounded-full font-outfit">
                              {post.category}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-3 font-mattone line-clamp-2 group-hover:text-blue transition-colors">
                          {post.title}
                        </h3>

                        <p className="text-gray-600 text-sm mb-4 font-outfit line-clamp-3">
                          {post.description}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div className="flex items-center text-xs text-gray-500 font-outfit">
                            <Clock className="w-3 h-3 mr-1" />
                            {post.readingTime} min read
                          </div>

                          <Link
                            href={post.url}
                            className="text-blue font-semibold text-sm hover:text-blue/80 transition-colors font-outfit"
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="bg-white/80 backdrop-blur-sm p-12 rounded-2xl shadow-lg border border-gray-200 max-w-md mx-auto">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 font-mattone">
                      No Articles Found
                    </h3>
                    <p className="text-gray-600 font-outfit mb-6">
                      We don't have any articles in the {categoryName.toLowerCase()} category yet.
                    </p>
                    <Link
                      href="/blog"
                      className="bg-blue hover:bg-blue/90 text-white font-semibold px-6 py-3 rounded-full transition-colors font-mattone"
                    >
                      Browse All Articles
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </section>

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
          

            <div className="container flex justify-center pt-8" >   
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
