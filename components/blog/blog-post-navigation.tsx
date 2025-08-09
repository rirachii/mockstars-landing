import { BlogPost } from '@/lib/blog'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface BlogPostNavigationProps {
  previousPost: BlogPost | null
  nextPost: BlogPost | null
}

export function BlogPostNavigation({ previousPost, nextPost }: BlogPostNavigationProps) {
  if (!previousPost && !nextPost) {
    return null
  }

  return (
    <nav className="flex flex-col sm:flex-row justify-between gap-4 py-8 border-t border-gray-200 dark:border-gray-700">
      <div className="flex-1">
        {previousPost && (
          <Link
            href={previousPost.url}
            className="group flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-outfit">Previous</p>
              <p className="font-medium text-gray-900 dark:text-white group-hover:text-blue dark:group-hover:text-blue transition-colors line-clamp-2 font-mattone">
                {previousPost.title}
              </p>
            </div>
          </Link>
        )}
      </div>

      <div className="flex-1">
        {nextPost && (
          <Link
            href={nextPost.url}
            className="group flex items-center justify-end text-right p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-outfit">Next</p>
              <p className="font-medium text-gray-900 dark:text-white group-hover:text-blue dark:group-hover:text-blue transition-colors line-clamp-2 font-mattone">
                {nextPost.title}
              </p>
            </div>
            <ArrowRight className="w-5 h-5 ml-3 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
          </Link>
        )}
      </div>
    </nav>
  )
}
