import { BlogPost } from '@/lib/blog'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, Calendar, Tag, User } from 'lucide-react'

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <Link href={post.url} className="group block">
      <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
        {post.image && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        
        <div className="p-6">
          {/* Category */}
          {post.category && (
            <div className="mb-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                <Tag className="w-3 h-3 mr-1" />
                {post.category}
              </span>
            </div>
          )}
          
          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue dark:group-hover:text-blue transition-colors line-clamp-2 font-mattone">
            {post.title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 font-outfit">
            {post.description}
          </p>
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md font-outfit"
                >
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs px-2 py-1 text-gray-500 dark:text-gray-400 font-outfit">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          )}
          
          {/* Meta information */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 font-outfit">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formattedDate}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {post.readingTime} min read
              </div>
            </div>
            
            {post.author && (
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {post.author}
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
