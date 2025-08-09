import { getAllBlogPosts, getBlogPostsByCategory, getAllCategories, getAllTags } from '@/lib/blog'
import { BlogCard } from '@/components/blog/blog-card'
import { HeroSearchBar } from '@/components/layout/hero-search-bar'
import { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Users, Clock } from 'lucide-react'
import { HorizontalNavigation } from '@/components/layout/HorizontalNavigation'

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const categoryName = decodeURIComponent(category).replace(/-/g, ' ')
  
  return {
    title: `${categoryName} | MockStars Blog`,
    description: `Explore our collection of articles about ${categoryName} for interview preparation and career advice.`,
  }
}

function CategoryHeroSection({ categoryName, posts }: { categoryName: string, posts: any[] }) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xs uppercase tracking-widest text-teal-600 mb-2 font-mattone">CATEGORY</div>
          <h1 className="text-2xl md:text-5xl font-bold tracking-tight mb-8 font-mattone">
            <span className="gradient-text">{categoryName}</span>
          </h1>
          
          <div className="mb-8">
            <p className="text-lg mb-4 font-outfit">Expert insights for your career journey</p>
            {/* <p className="text-gray-600 font-outfit max-w-2xl mx-auto">
              Explore our collection of {postCount} article{postCount !== 1 ? 's' : ''} about {categoryName.toLowerCase()} 
              for interview preparation and career advice.
            </p> */}
                      {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <div key={post.slug} className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image || '/images/blog/interview-default.jpg'}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                      
                      <Link
                        href={post.url}
                        className="text-blue font-semibold text-sm hover:text-blue/80 transition-colors font-outfit"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20">
              <div className="bg-white/80 backdrop-blur-sm p-12 rounded-2xl shadow-lg border border-gray-200 max-w-md mx-auto">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4 font-mattone">
                  No Articles Found
                </h3>
                <p className="text-gray-600 font-outfit mb-6">
                  We don't have any articles in the {categoryName.toLowerCase()} category yet. 
                  Check back soon for new content!
                </p>
                <Link
                  href="/blog"
                  className="bg-blue hover:bg-blue/90 text-white font-semibold px-6 py-3 rounded-full transition-colors font-mattone"
                >
                  Browse All Articles
                </Link>
              </div>
            </div>
          )}
          </div>
          <Link
              href="/blog"
              className="bg-white/80 backdrop-blur-sm text-blue border-2 border-blue font-semibold px-8 py-4 rounded-full hover:bg-blue hover:text-white transition-colors font-mattone shadow-lg"
            >
              ← Back to All Articles
            </Link>
        </div>
      </div>
    </section>
  )
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const categoryName = decodeURIComponent(category).replace(/-/g, ' ')
  const allPosts = getAllBlogPosts()
  const categoryPosts = getBlogPostsByCategory(categoryName)
  const categories = getAllCategories()
  const tags = getAllTags()

  // Convert category name to slug for navigation matching
  const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col min-h-screen text-gray-800 font-outfit relative z-10">
      {/* Horizontal Navigation */}
      <HorizontalNavigation currentCategory={categorySlug} />
      
      {/* Hero Section */}
      <CategoryHeroSection categoryName={categoryName} posts={categoryPosts} />
      
    </div>
  )
}
