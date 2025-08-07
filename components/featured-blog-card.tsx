import { BlogPost } from '@/lib/blog'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, Calendar, Tag, User, Star } from 'lucide-react'

interface FeaturedBlogCardProps {
  post: BlogPost
}

export function FeaturedBlogCard({ post }: FeaturedBlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <Link href={post.url} className="group block">
      <article className="bg-blue-50 dark:bg-blue-900/30 rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-blue-200 dark:border-blue-800 relative">
        {/* Featured badge */}
        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold">
            <Star className="w-3 h-3 mr-1 fill-current" />
            Featured
          </div>
        </div>
        
        {post.image && (
          <div className="relative w-full h-64 overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}
        
        <div className="p-8">
          {/* Category */}
          {post.category && (
            <div className="mb-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-600 text-white dark:bg-blue-500">
                <Tag className="w-4 h-4 mr-2" />
                {post.category}
              </span>
            </div>
          )}
          
          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue dark:group-hover:text-blue transition-colors font-mattone">
            {post.title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed font-outfit">
            {post.description}
          </p>
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="text-sm px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-600 font-outfit"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* Meta information */}
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 font-outfit">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {formattedDate}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {post.readingTime} min read
              </div>
            </div>
            
            {post.author && (
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {post.author}
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
