import { getAllBlogPosts, getFeaturedBlogPosts } from '@/lib/blog'
import CTA from '@/components/common/CTA'
import { HorizontalNavigation } from '@/components/layout/HorizontalNavigation'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, Clock, User } from 'lucide-react'
import { ArticleGrid } from '@/components/blog/article-grid'

export const metadata: Metadata = {
  title: 'Blog | Mockstars - Interview Preparation & Career Advice',
  description: 'Master your interviews with expert insights, proven strategies, and actionable tips. Discover the latest trends in interview preparation and career development.',
  keywords: 'interview tips, career advice, job interview, behavioral questions, interview preparation, career development, professional growth',
}


function FeaturedArticleSection({ post }: { post: any }) {
  return (
    <section className="py-16 bg-white/30 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-12">
            <div className="text-2xs uppercase tracking-widest text-blue mb-2 font-mattone">FEATURED GUIDE</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mattone">
              {post.category || 'Expert Interview Strategy'}
            </h2>
          </div>

          {/* Featured Article */}
          <Link href={post.url} className="block group">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden multi-color-border shadow-xl cursor-pointer">
              <div className="lg:flex">
                <div className="lg:w-1/2 relative h-64 lg:h-96">
                  <Image
                    src={post.image || '/images/blog/interview-featured.jpg'}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 font-mattone leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-200 mb-6 font-outfit leading-relaxed text-lg">
                    {post.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-300 font-outfit">
                      {post.author && (
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {post.author}
                        </div>
                      )}
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readingTime} min read
                      </div>
                    </div>
                    <span 
                      className="bg-blue group-hover:bg-blue/90 text-white font-semibold px-6 py-3 rounded-full transition-colors font-mattone"
                    >
                      Read Guide
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function BlogPage() {
  try {
    const allPosts = getAllBlogPosts()
    const featuredPosts = getFeaturedBlogPosts()

    const mainFeaturedPost = featuredPosts[0] || allPosts[0]

    return (
      <div className="flex flex-col min-h-screen text-gray-800 font-outfit relative z-10">
        <HorizontalNavigation />

        {mainFeaturedPost && (
          <FeaturedArticleSection post={mainFeaturedPost} />
        )}

        <ArticleGrid
          posts={allPosts}
          title="Latest Guides"
          eyebrow="Mockstars Blog"
          limit={9}
          showHeader
          allHref="/blog/category/all"
          allLabel="All Articles"
        />

        <section className="pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <CTA 
                title="Get ATS-Ready Resume"
                subtitle="Join thousands of professionals who've built confidence and landed their dream jobs with Mockstars."
                primaryButtonText="Start Building Your Resume"
                showSecondaryButton={false}
              />
            </div>
          </div>
        </section>
      </div>
    )
  } catch (error) {
    console.error('Error loading blog posts:', error)
    return (
      <div className="flex flex-col min-h-screen text-gray-800 font-outfit relative z-10">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="bg-white/80 backdrop-blur-sm p-12 rounded-2xl shadow-lg border border-gray-200 max-w-md mx-auto">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-800 mb-4 font-mattone">Oops! Something went wrong</h1>
              <p className="text-gray-600 font-outfit mb-6">We're having trouble loading the blog posts. Please try again later.</p>
              <Link
                href="/"
                className="bg-blue hover:bg-blue/90 text-white font-semibold px-6 py-3 rounded-full transition-colors font-mattone"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
