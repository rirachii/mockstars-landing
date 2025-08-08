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

export function FloatingSidebar({ popularPosts, relatedPosts }: FloatingSidebarProps) {
  const [sidebarStyle, setSidebarStyle] = useState({
    position: 'fixed' as const,
    top: '50%',
    transform: 'translateY(-50%)',
    bottom: 'auto'
  })

  useEffect(() => {
    function updateSidebarPosition() {
      const sidebar = document.querySelector('#floating-sidebar')
      const ctaSection = document.querySelector('#cta-section')
      
      if (!sidebar || !ctaSection) return

      const ctaRect = ctaSection.getBoundingClientRect()
      const sidebarHeight = sidebar.getBoundingClientRect().height
      const viewportHeight = window.innerHeight
      
      // Calculate if sidebar would overlap with CTA
      const sidebarBottom = viewportHeight / 2 + sidebarHeight / 2
      const ctaTop = ctaRect.top
      
      if (ctaTop < sidebarBottom && ctaRect.top < viewportHeight) {
        // Stop floating and position above CTA
        setSidebarStyle({
          position: 'absolute',
          top: 'auto',
          transform: 'none',
          bottom: `${ctaRect.height + 32}px` // 32px margin from CTA
        })
      } else {
        // Resume floating
        setSidebarStyle({
          position: 'fixed',
          top: '50%',
          transform: 'translateY(-50%)',
          bottom: 'auto'
        })
      }
    }
    
    // Update on scroll and resize
    window.addEventListener('scroll', updateSidebarPosition)
    window.addEventListener('resize', updateSidebarPosition)
    
    // Initial check after a small delay to ensure elements are rendered
    const timer = setTimeout(updateSidebarPosition, 100)
    
    return () => {
      window.removeEventListener('scroll', updateSidebarPosition)
      window.removeEventListener('resize', updateSidebarPosition)
      clearTimeout(timer)
    }
  }, [])

  return (
    <aside 
      id="floating-sidebar"
      className="hidden xl:block fixed right-8 w-80 z-20"
      style={sidebarStyle}
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6 max-h-[80vh] overflow-y-auto">
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
                    <h4 className="text-sm font-semibold text-gray-800 group-hover:text-blue transition-colors line-clamp-2 font-mattone">
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
            <div className="text-2xs uppercase tracking-widest text-teal-600 mb-4 font-mattone">RELATED ARTICLES</div>
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
