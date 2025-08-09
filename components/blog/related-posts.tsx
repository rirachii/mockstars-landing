import { BlogPost } from '@/lib/blog'
import { BlogCard } from './blog-card'
import Link from 'next/link'

interface RelatedPostsProps {
  posts: BlogPost[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null
  }

  return (
    <section className="pt-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center font-mattone">
          Related Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Link href="/blog" className="text-blue-500 hover:text-blue-600 font-outfit text-lg font-semibold hover:underline">
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  )
}
