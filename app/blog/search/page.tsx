import { Suspense } from 'react'
import { getAllBlogPosts, getAllCategories, getAllTags } from '@/lib/blog'
import SearchClient from './search-client'
import { SearchIcon } from 'lucide-react'
import { HorizontalNavigation } from '@/components/layout/HorizontalNavigation'

export default function SearchPage() {
  const allPosts = getAllBlogPosts()
  const categories = getAllCategories()
  const tags = getAllTags()

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-cream via-white to-blue/5 flex items-center justify-center">
        <div className="text-center">
          <SearchIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Loading search results...</p>
        </div>
      </div>
    }>
      <HorizontalNavigation />
      <SearchClient 
        allPosts={allPosts}
        categories={categories}
        tags={tags}
      />
    </Suspense>
  )
}
