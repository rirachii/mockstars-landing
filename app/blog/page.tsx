import { getAllBlogPosts, getFeaturedBlogPosts } from '@/lib/blog'
import CTA from '@/components/common/CTA'
import { HorizontalNavigation } from '@/components/layout/HorizontalNavigation'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, Clock, User } from 'lucide-react'
import React from 'react'

export const metadata: Metadata = {
  title: 'Blog | Mockstars - Interview Preparation & Career Advice',
  description: 'Master your interviews with expert insights, proven strategies, and actionable tips. Discover the latest trends in interview preparation and career development.',
  keywords: 'interview tips, career advice, job interview, behavioral questions, interview preparation, career development, professional growth',
}


function HeroSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 font-mattone">
            Interview
            <br />
            <span className="gradient-text">Mastery</span>
            <br />
            Guides
          </h1>
          
          <div className="mb-8">
            <p className="text-lg mb-4 font-outfit">Ready to ace your next interview?</p>
            <p className="text-gray-600 font-outfit max-w-2xl mx-auto">
              Get inspired with our collection of expert interview advice, proven strategies, and actionable career guidance.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
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
          {/* Make entire card clickable */}
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
                    {/* Replace inner link with a styled span to avoid nested links */}
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

function ArticleGrid({ posts, title, limit = 6 }: { posts: any[], title: string, limit?: number }) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-2xs uppercase tracking-widest text-teal-600 mb-2 font-mattone">Mockstars Blog</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mattone">{title}</h2>
            <p className="text-gray-600 font-outfit max-w-2xl mx-auto">
              Discover expert insights and practical tips for interview success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, limit).map((post) => (
              <div key={post.slug} className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image || '/images/blog/interview-default.jpg'}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
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

          {/* All Articles Button */}
          <div className="container flex justify-center pt-8" >   
            <Link
              href="/blog/category/all"
              className="bg-white/80 backdrop-blur-sm text-blue border-2 border-blue font-semibold px-8 py-4 rounded-full hover:bg-blue hover:text-white transition-colors font-mattone shadow-lg"
            >
              All Articles
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function BlogPage() {
  try {
    const allPosts = getAllBlogPosts()
    const featuredPosts = getFeaturedBlogPosts()

    // Get the main featured post
    const mainFeaturedPost = featuredPosts[0] || allPosts[0]

    return (
      <div className="flex flex-col min-h-screen text-gray-800 font-outfit relative z-10">
        {/* Horizontal Navigation */}
        <HorizontalNavigation />
        
        {/* Hero Section with Search */}
        {/* <HeroSection /> */}
        
        {/* Featured Article */}
        {mainFeaturedPost && (
          <FeaturedArticleSection post={mainFeaturedPost} />
        )}
        
        {/* Articles Grid - 9 latest interview guides */}
        <ArticleGrid posts={allPosts} title="Latest Guides" limit={9} />
        
        {/* CTA Section */}
        <section className="py-16">
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
