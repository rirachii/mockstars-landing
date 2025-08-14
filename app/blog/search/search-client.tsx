'use client'

import { useSearchParams } from 'next/navigation'
import { BlogPost } from '@/lib/blog'
import { ArticleGrid } from '@/components/blog/article-grid'
import { Search as SearchIcon, BookOpen } from 'lucide-react'
import Link from 'next/link'

interface SearchClientProps {
  allPosts: BlogPost[]
  categories: string[]
  tags: string[]
}

export default function SearchClient({ allPosts }: SearchClientProps) {
  const searchParams = useSearchParams()
  const query = searchParams?.get('q') || ''
  
  const filteredPosts = allPosts.filter(post => 
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.description.toLowerCase().includes(query.toLowerCase()) ||
    post.content.toLowerCase().includes(query.toLowerCase()) ||
    post.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
    post.category?.toLowerCase().includes(query.toLowerCase())
  )

  if (!query) {
    return (
      <div className="flex flex-col min-h-screen text-gray-800 font-outfit relative z-10">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <div className="bg-white/80 backdrop-blur-sm p-12 rounded-2xl shadow-lg border border-gray-200">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
                  <SearchIcon className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 font-mattone">Enter a Search Term</h3>
                <p className="text-gray-600 font-outfit">Use the search bar in the navbar to find articles on specific topics.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (filteredPosts.length === 0) {
    return (
      <div className="flex flex-col min-h-screen text-gray-800 font-outfit relative z-10">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <div className="bg-white/80 backdrop-blur-sm p-12 rounded-2xl shadow-lg border border-gray-200">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4 font-mattone">No Results Found</h3>
                <p className="text-gray-600 font-outfit mb-6">We couldn't find any articles matching "{query}". Try a different search term.</p>
                <Link
                  href="/blog"
                  className="bg-blue hover:bg-blue/90 text-white font-semibold px-6 py-3 rounded-full transition-colors font-mattone"
                >
                  Browse All Articles
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen text-gray-800 font-outfit relative z-10">
      <ArticleGrid
        posts={filteredPosts}
        title={`Results for "${query}"`}
        eyebrow="SEARCH RESULTS"
        description=""
        limit={30}
        showHeader
      />
    </div>
  )
}
