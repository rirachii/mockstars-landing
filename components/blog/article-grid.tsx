import Link from 'next/link'
import { BlogPost } from '@/lib/blog'
import { BlogCard } from '@/components/blog/blog-card'

interface ArticleGridProps {
  posts: BlogPost[]
  title?: string
  description?: string
  eyebrow?: string
  limit?: number
  showHeader?: boolean
  allHref?: string
  allLabel?: string
}

export function ArticleGrid({
  posts,
  title = 'Latest Guides',
  description = 'Discover expert insights and practical tips for interview success',
  eyebrow = 'Mockstars Blog',
  limit = 6,
  showHeader = true,
  allHref,
  allLabel = 'All Articles',
}: ArticleGridProps) {
  const items = Array.isArray(posts) ? posts.slice(0, limit) : []

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {showHeader && (
            <div className="text-center mb-12">
              <div className="text-2xs uppercase tracking-widest text-teal-600 mb-2 font-mattone">{eyebrow}</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mattone">{title}</h2>
              <p className="text-gray-600 font-outfit max-w-2xl mx-auto">
                {description}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {allHref && (
            <div className="container flex justify-center pt-8">
              <Link
                href={allHref}
                className="bg-white/80 backdrop-blur-sm text-blue border-2 border-blue font-semibold px-8 py-4 rounded-full hover:bg-blue hover:text-white transition-colors font-mattone shadow-lg"
              >
                {allLabel}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
