import { getAllBlogPosts, getBlogPostsByTag, getAllCategories, getAllTags } from '@/lib/blog'
import { BlogCard } from '@/components/blog-card'
import { BlogSidebar } from '@/components/blog-sidebar'
import { Metadata } from 'next'
import { BookOpen, Users } from 'lucide-react'

interface TagPageProps {
  params: Promise<{
    tag: string
  }>
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params
  const tagName = decodeURIComponent(tag).replace(/-/g, ' ')
  
  return {
    title: `${tagName} | MockStars Blog`,
    description: `Explore our collection of articles tagged with ${tagName} for interview preparation and career advice.`,
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  const tagName = decodeURIComponent(tag).replace(/-/g, ' ')
  const allPosts = getAllBlogPosts()
  const tagPosts = getBlogPostsByTag(tagName)
  const categories = getAllCategories()
  const tags = getAllTags()

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-blue/5">
      {/* Tag Header */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-teal/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple/20 rounded-full blur-lg"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue/10 border border-blue/20 rounded-full mb-8">
              <BookOpen className="w-4 h-4 text-blue mr-2" />
              <span className="text-sm font-semibold text-blue font-outfit">TAG</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-mattone">
              #{tagName}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 font-outfit max-w-2xl mx-auto">
              Explore our collection of articles tagged with {tagName.toLowerCase()} for interview preparation 
              and career advice.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="py-16 bg-white relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
            {/* Sidebar */}
            <BlogSidebar 
              currentTag={tagName}
              categories={categories}
              tags={tags}
            />
            
            {/* Main Content */}
            <div className="flex-1">
              {/* All Posts Section */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-12">
                  <div>
                    <div className="flex items-center mb-4">
                      <Users className="w-6 h-6 text-teal mr-3" />
                      <span className="text-sm uppercase tracking-wider text-teal font-semibold font-outfit">
                        ARTICLES TAGGED WITH #{tagName.toUpperCase()}
                      </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-mattone">
                      All {tagName} Posts
                    </h2>
                    <p className="text-lg text-gray-600 mt-4 font-outfit">
                      {tagPosts.length} article{tagPosts.length !== 1 ? 's' : ''} found
                    </p>
                  </div>
                </div>
                
                {tagPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {tagPosts.map((post) => (
                      <BlogCard key={post.slug} post={post} />
                    ))}
                  </div>
                ) : (
                  /* Empty State */
                  <div className="text-center py-20">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
                      <BookOpen className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-mattone">
                      No Articles Found
                    </h3>
                    <p className="text-gray-600 font-outfit max-w-md mx-auto">
                      We don't have any articles tagged with {tagName.toLowerCase()} yet. 
                      Check back soon for new content!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}