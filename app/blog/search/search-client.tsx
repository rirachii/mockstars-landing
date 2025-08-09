'use client'

import { useSearchParams } from 'next/navigation'
import { BlogPost } from '@/lib/blog'
import { BlogCard } from '@/components/blog/blog-card'
// import { BlogSidebar } from '@/components/blog-sidebar'
import { BookOpen, Search as SearchIcon, Users } from 'lucide-react'

interface SearchClientProps {
  allPosts: BlogPost[]
  categories: string[]
  tags: string[]
}

export default function SearchClient({ allPosts, categories, tags }: SearchClientProps) {
  const searchParams = useSearchParams()
  const query = searchParams?.get('q') || ''
  
  const filteredPosts = allPosts.filter(post => 
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.description.toLowerCase().includes(query.toLowerCase()) ||
    post.content.toLowerCase().includes(query.toLowerCase()) ||
    post.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
    post.category?.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-blue/5">
      {/* Search Header */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-teal/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple/20 rounded-full blur-lg"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue/10 border border-blue/20 rounded-full mb-8">
              <SearchIcon className="w-4 h-4 text-blue mr-2" />
              <span className="text-sm font-semibold text-blue font-outfit">SEARCH RESULTS</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-mattone">
              Search Results
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 font-outfit max-w-2xl mx-auto">
              {query 
                ? `Found ${filteredPosts.length} result${filteredPosts.length !== 1 ? 's' : ''} for "${query}"`
                : 'Please enter a search term'}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="py-16 bg-white relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
            {/* Sidebar */}
            {/* <BlogSidebar categories={categories} tags={tags} /> */}
            
            {/* Main Content */}
            <div className="flex-1">
              {/* All Posts Section */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-12">
                  <div>
                    <div className="flex items-center mb-4">
                      <Users className="w-6 h-6 text-teal mr-3" />
                      <span className="text-sm uppercase tracking-wider text-teal font-semibold font-outfit">
                        SEARCH RESULTS
                      </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-mattone">
                      {query ? `Results for "${query}"` : 'Search Articles'}
                    </h2>
                  </div>
                </div>
                
                {query && filteredPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredPosts.map((post) => (
                      <BlogCard key={post.slug} post={post} />
                    ))}
                  </div>
                ) : query && filteredPosts.length === 0 ? (
                  /* No Results State */
                  <div className="text-center py-20">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
                      <SearchIcon className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-mattone">
                      No Results Found
                    </h3>
                    <p className="text-gray-600 font-outfit max-w-md mx-auto">
                      We couldn't find any articles matching "{query}". Try a different search term.
                    </p>
                  </div>
                ) : (
                  /* Empty State */
                  <div className="text-center py-20">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
                      <SearchIcon className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-mattone">
                      Enter a Search Term
                    </h3>
                    <p className="text-gray-600 font-outfit max-w-md mx-auto">
                      Use the search bar in the sidebar to find articles on specific topics.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
