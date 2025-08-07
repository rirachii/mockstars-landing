import { getAllBlogPosts, getFeaturedBlogPosts, getAllCategories, getAllTags } from '@/lib/blog'
import { BlogCard } from '@/components/blog-card'
import { FeaturedBlogCard } from '@/components/featured-blog-card'
import { BlogSidebar } from '@/components/blog-sidebar'
import CTA from '@/components/CTA'
import { Metadata } from 'next'
import { BookOpen, TrendingUp, Users, Lightbulb } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog | MockStars - Interview Preparation & Career Advice',
  description: 'Master your interviews with expert insights, proven strategies, and actionable tips. Discover the latest trends in interview preparation and career development.',
  keywords: 'interview tips, career advice, job interview, behavioral questions, interview preparation, career development, professional growth',
}

export default function BlogPage() {
  try {
    const allPosts = getAllBlogPosts()
    const featuredPosts = getFeaturedBlogPosts()
    const categories = getAllCategories()
    const tags = getAllTags()
    const regularPosts = allPosts.filter(post => !post.featured)

    return (
      <div className="min-h-screen bg-gradient-to-br from-cream via-white to-blue/5">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          {/* Background Elements - Lower z-index */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-20 left-10 w-32 h-32 bg-teal/20 rounded-full blur-xl"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-purple/20 rounded-full blur-lg"></div>
            <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-pink/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 right-10 w-20 h-20 bg-orange/20 rounded-full blur-lg"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-20">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-blue/10 border border-blue/20 rounded-full mb-8">
                <BookOpen className="w-4 h-4 text-blue mr-2" />
                <span className="text-sm font-semibold text-blue font-outfit">INTERVIEW MASTERY BLOG</span>
              </div>
              
              {/* Main Heading */}
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 font-mattone leading-tight">
                Master Your
                <br />
                <span className="bg-gradient-to-r from-blue via-purple to-teal bg-clip-text text-transparent">
                  Interview Game
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-gray-600 mb-8 font-outfit leading-relaxed max-w-3xl mx-auto">
                Expert insights, proven strategies, and actionable advice to help you land your dream job 
                and accelerate your career growth.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue mb-2 font-mattone">{allPosts.length}+</div>
                  <div className="text-sm text-gray-600 font-outfit">Expert Articles</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple mb-2 font-mattone">50K+</div>
                  <div className="text-sm text-gray-600 font-outfit">Readers Helped</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal mb-2 font-mattone">95%</div>
                  <div className="text-sm text-gray-600 font-outfit">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange mb-2 font-mattone">24/7</div>
                  <div className="text-sm text-gray-600 font-outfit">Access</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content with Sidebar */}
        <section className="py-16 bg-white relative z-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
              {/* Sidebar */}
              <BlogSidebar categories={categories} tags={tags} />
              
              {/* Main Content */}
              <div className="flex-1">
                {/* Featured Posts Section */}
                {featuredPosts.length > 0 && (
                  <div className="mb-16">
                    <div className="flex items-center justify-between mb-12">
                      <div>
                        <div className="flex items-center mb-4">
                          <TrendingUp className="w-6 h-6 text-pink mr-3" />
                          <span className="text-sm uppercase tracking-wider text-pink font-semibold font-outfit">FEATURED CONTENT</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-mattone">
                          Must-Read Articles
                        </h2>
                      </div>
                      <div className="hidden md:block">
                        <div className="w-16 h-16 bg-pink/10 rounded-2xl flex items-center justify-center">
                          <Lightbulb className="w-8 h-8 text-pink" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {featuredPosts.map((post) => (
                        <FeaturedBlogCard key={post.slug} post={post} />
                      ))}
                    </div>
                  </div>
                )}

                {/* All Posts Section */}
                <div className="bg-gray-50 rounded-2xl p-8">
                  <div className="flex items-center justify-between mb-12">
                    <div>
                      <div className="flex items-center mb-4">
                        <Users className="w-6 h-6 text-teal mr-3" />
                        <span className="text-sm uppercase tracking-wider text-teal font-semibold font-outfit">ALL ARTICLES</span>
                      </div>
                      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-mattone">
                        Latest Insights
                      </h2>
                      <p className="text-lg text-gray-600 mt-4 font-outfit max-w-2xl">
                        Stay ahead of the curve with our comprehensive collection of interview preparation 
                        guides and career development strategies.
                      </p>
                    </div>
                  </div>
                  
                  {(featuredPosts.length > 0 ? regularPosts : allPosts).length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {(featuredPosts.length > 0 ? regularPosts : allPosts).map((post) => (
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
                        More Content Coming Soon
                      </h3>
                      <p className="text-gray-600 font-outfit max-w-md mx-auto">
                        We're working hard to bring you amazing interview insights and career advice. 
                        Check back soon for fresh content!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTA 
          showSecondaryButton={false}
          />
      </div>
    )
  } catch (error) {
    // Fallback error UI
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 font-mattone">
            Blog Loading Error
          </h1>
          <p className="text-gray-600 mb-4 font-outfit">
            We're having trouble loading the blog content. Please refresh the page.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue text-white px-6 py-2 rounded-lg hover:bg-blue/90 transition-colors font-outfit"
          >
            Refresh Page
          </button>
        </div>
      </div>
    )
  }
}
