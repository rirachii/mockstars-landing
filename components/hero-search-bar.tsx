'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function HeroSearchBar() {
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
    <div className="max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search interview guides..."
          className="w-full pl-12 pr-6 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue shadow-sm font-outfit"
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  )
}
