'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { BookOpen, Tag, FolderOpen, Search } from 'lucide-react'

interface BlogSidebarProps {
  currentCategory?: string
  currentTag?: string
  categories?: string[]
  tags?: string[]
}

export function BlogSidebar({ 
  currentCategory, 
  currentTag, 
  categories = [], 
  tags = [] 
}: BlogSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState('')
  const [isMounted, setIsMounted] = useState(false)
  
  // Limit to 20 tags for better UX
  const displayTags = tags.slice(0, 20)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/blog/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const isActiveCategory = (category: string) => {
    return currentCategory === category
  }

  const isActiveTag = (tag: string) => {
    return currentTag === tag
  }

  if (!isMounted) {
    return <div className="w-80 bg-white p-6 rounded-xl border border-gray-200 h-fit sticky top-8 hidden lg:block">Loading...</div>
  }

  return (
    <div className="w-80 bg-white p-6 rounded-xl border border-gray-200 h-fit sticky top-8 hidden lg:block">
      {/* Search Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Search className="w-5 h-5 mr-2 text-blue" />
          Search Blog
        </h3>
        <form onSubmit={handleSearch}>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-blue"
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Categories Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FolderOpen className="w-5 h-5 mr-2 text-purple" />
          Categories
        </h3>
        <div className="space-y-2">
          <button
            onClick={() => router.push('/blog')}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              !currentCategory ? 'bg-blue/10 text-blue font-medium' : 'hover:bg-gray-100'
            }`}
          >
            All Articles
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => router.push(`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                isActiveCategory(category) 
                  ? 'bg-purple/10 text-purple font-medium' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Tags Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Tag className="w-5 h-5 mr-2 text-teal" />
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => router.push('/blog')}
            className={`px-3 py-1 rounded-full text-sm ${
              !currentTag ? 'bg-blue/10 text-blue font-medium' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {displayTags.map((tag) => (
            <button
              key={tag}
              onClick={() => router.push(`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`)}
              className={`px-3 py-1 rounded-full text-sm ${
                isActiveTag(tag) 
                  ? 'bg-teal/10 text-teal font-medium' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Archive Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BookOpen className="w-5 h-5 mr-2 text-orange" />
          Archive
        </h3>
        <p className="text-gray-600 text-sm">
          Browse our complete collection of interview preparation guides and career advice articles.
        </p>
      </div>
    </div>
  )
}