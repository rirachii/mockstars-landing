import { BlogPost } from '@/lib/blog'
import Link from 'next/link'
import Image from 'next/image'
import { Clock} from 'lucide-react'

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={post.url} className="group">
      <div key={post.slug} className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 group">
        <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={post.image || '/images/blog/interview-default.jpg'}
          alt={post.title}
          fill
          className="object-cover [object-position:0%_0%] transition-transform duration-300 group-hover:scale-105"
        />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {post.category && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold rounded-full font-outfit">
                {post.category}
              </span>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3 font-mattone line-clamp-2 group-hover:text-blue transition-colors">
            {post.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 font-outfit line-clamp-3">
            {post.description}
          </p>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center text-xs text-gray-500 font-outfit">
              <Clock className="w-3 h-3 mr-1" />
              {post.readingTime} min read
            </div>
            <span 
              className="bg-blue group-hover:bg-blue/90 text-white font-semibold px-6 py-3 rounded-full transition-colors font-mattone"
            >
              Read More
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
