'use client'

import { BlogPost } from '@/lib/blog'
import Image from 'next/image'
import { Calendar, Clock, User, Tag, Share2 } from 'lucide-react'

interface BlogPostHeaderProps {
  post: BlogPost
}

export function BlogPostHeader({ post }: BlogPostHeaderProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <header className="mb-12">
      {/* Featured badge */}
      {post.featured && (
        <div className="mb-6">
          <span className="inline-flex items-center bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-semibold">
            <span className="w-2 h-2 bg-yellow-600 rounded-full mr-2"></span>
            Featured Article
          </span>
        </div>
      )}
      
      {/* Category */}
      {post.category && (
        <div className="mb-6">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            <Tag className="w-4 h-4 mr-2" />
            {post.category}
          </span>
        </div>
      )}

      {/* Title */}
      <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight font-mattone">
        {post.title}
      </h1>

      {/* Description */}
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed font-outfit">
        {post.description}
      </p>

      {/* Cover Image */}
      {post.image && (
        <div className="relative mb-8 rounded-xl overflow-hidden shadow-2xl max-w-lg mx-auto h-96 md:h-128">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Meta information */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400 font-outfit">
          {post.author && (
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              <span className="font-medium">{post.author}</span>
            </div>
          )}
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {formattedDate}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            {post.readingTime} min read
          </div>
        </div>

        {/* Share button */}
        <button
          onClick={handleShare}
          className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors font-outfit"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </button>
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-6">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-outfit"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </header>
  )
}
