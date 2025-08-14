'use client'

import { useEffect, useState } from 'react'

interface BlogPost {
  slug: string
  title: string
  readingTime: number
  category?: string
  url: string
}

interface FloatingSidebarProps {
  popularPosts: BlogPost[]
  relatedPosts: BlogPost[]
}

interface TocItem {
  id: string
  text: string
  level: number
}

export function FloatingSidebar({ popularPosts, relatedPosts }: FloatingSidebarProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    // Collect h2/h3 headings from the markdown content
    const headingNodes = Array.from(document.querySelectorAll('.prose h2, .prose h3')) as HTMLElement[]
    if (headingNodes.length === 0) {
      setTocItems([])
      return
    }

    const slugCounts: Record<string, number> = {}

    const slugify = (value: string) =>
      value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')

    const items: TocItem[] = headingNodes.map((el) => {
      const text = el.innerText || el.textContent || ''
      let slug = el.id || slugify(text)
      if (slugCounts[slug] != null) {
        slugCounts[slug] += 1
        slug = `${slug}-${slugCounts[slug]}`
      } else {
        slugCounts[slug] = 0
      }
      if (!el.id) el.id = slug
      // Ensure headings account for sticky header on anchor jump
      el.classList.add('scroll-mt-24')
      const level = el.tagName.toLowerCase() === 'h3' ? 3 : 2
      return { id: slug, text, level }
    })

    setTocItems(items)

    // Scrollspy via IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        // Choose the top-most visible heading
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length === 0) return
        const topMost = visible.reduce((prev, curr) =>
          curr.boundingClientRect.top < prev.boundingClientRect.top ? curr : prev
        )
        setActiveId((topMost.target as HTMLElement).id)
      },
      {
        // Offset top for sticky header; treat middle of viewport as active region
        root: null,
        rootMargin: '-120px 0px -60% 0px',
        threshold: 0.1,
      }
    )

    headingNodes.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <aside className="hidden xl:block fixed right-8 pt-4 w-80 z-20 ">
      <div className="backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6 max-h-[80vh] overflow-y-auto scrollbar-hide">
        {/* Table of Contents */}
        {tocItems.length > 0 && (
          <nav aria-label="Table of contents" className="mb-8">
            <div className="text-2xs uppercase tracking-widest text-teal-600 mb-4 font-mattone">On this page</div>
            <ul className="space-y-2">
              {tocItems.map((item) => (
                <li key={item.id} className={item.level === 3 ? 'ml-4' : ''}>
                  <a
                    href={`#${item.id}`}
                    aria-current={activeId === item.id ? 'true' : undefined}
                    className={`block text-sm transition-colors font-outfit line-clamp-2 ${
                      activeId === item.id
                        ? 'text-blue font-semibold'
                        : 'text-gray-700 hover:text-blue'
                    }`}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Popular Articles Section */}
        <div className="mb-8">
          <div className="text-2xs uppercase tracking-widest text-blue mb-4 font-mattone">POPULAR ARTICLES</div>
          <h3 className="text-lg font-bold mb-4 font-mattone text-gray-800">Trending Now</h3>
          <div className="space-y-4">
            {popularPosts.map((popularPost, index) => (
              <a
                key={popularPost.slug}
                href={popularPost.url}
                className="block group hover:bg-gray-50 rounded-lg p-3 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="text-blue font-bold text-sm bg-blue/10 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-mattone">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold group-hover:text-blue transition-colors line-clamp-2 font-mattone">
                      {popularPost.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 font-outfit">
                      {popularPost.readingTime} min read
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-4 font-mattone text-gray-800">More Like This</h3>
            <div className="space-y-4">
              {relatedPosts.map((relatedPost) => (
                <a
                  key={relatedPost.slug}
                  href={relatedPost.url}
                  className="block group hover:bg-gray-50 rounded-lg p-3 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-teal-600 font-bold text-xs font-mattone">
                        {relatedPost.category?.charAt(0) || 'A'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-800 group-hover:text-blue transition-colors line-clamp-2 font-mattone">
                        {relatedPost.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500 font-outfit">
                          {relatedPost.readingTime} min read
                        </span>
                        {relatedPost.category && (
                          <>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-teal-600 font-outfit">
                              {relatedPost.category}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
