'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function SearchInput() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (query.trim()) {
        router.push(`/blog/search?q=${encodeURIComponent(query.trim())}`)
      }
    }
  }

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles..."
        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue text-sm font-outfit"
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}
