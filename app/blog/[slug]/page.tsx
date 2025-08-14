import { getAllBlogPosts, getBlogPost } from '@/lib/blog'
import { BlogPostContent } from '@/components/blog/blog-post-content'
import { BlogPostHeader } from '@/components/blog/blog-post-header'
import { BlogPostNavigation } from '@/components/blog/blog-post-navigation'
import { RelatedPosts } from '@/components/blog/related-posts'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CTA from '@/components/common/CTA'
import JsonLd from '@/components/JsonLd'
import { FloatingSidebar } from '@/components/blog/floating-sidebar'


interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found | Mockstars Blog',
      description: 'The blog post you are looking for could not be found.',
    }
  }

  const description = post.description || post.directAnswer || post.llm?.oneLiner
  const keywords = [
    ...(post.tags || []),
    ...(post.llm?.entities || []),
    ...(post.audience || []),
  ].join(', ')

  return {
    title: `${post.title} | Mockstars Blog`,
    description,
    keywords,
    openGraph: {
      title: post.title,
      description,
      images: post.image ? [{ url: post.image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: post.image ? [post.image] : [],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)
  
  if (!post) {
    notFound()
  }

  const allPosts = getAllBlogPosts()
  const currentIndex = allPosts.findIndex(p => p.slug === slug)
  const previousPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  
  // Get popular posts (featured posts first, then by date, excluding current)
  const popularPosts = allPosts
    .filter(p => p.slug !== post.slug)
    .sort((a, b) => {
      // Featured posts first
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      // Then by date
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    .slice(0, 5)
  
  // Get related posts (same category or tags, excluding current post)
  const relatedPosts = allPosts
    .filter(p => 
      p.slug !== post.slug && 
      (p.category === post.category || 
       p.tags?.some(tag => post.tags?.includes(tag)))
    )
    .slice(0, 3)

    const hasFaqs = Array.isArray(post.faqs) && post.faqs.length > 0

    const faqJsonLd = hasFaqs
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": post.faqs?.map((item: { q: string; a: string }) => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": { "@type": "Answer", "text": item.a }
          })),
        }
      : null

    const articleJsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": post.description || post.directAnswer || post.llm?.oneLiner,
      "datePublished": post.date,
      "dateModified": post.lastUpdated || post.date,
      "image": post.image ? [post.image] : undefined,
      "keywords": [
        ...(post.tags || []),
        ...(post.llm?.entities || []),
        ...(post.audience || []),
      ].join(', '),
      "about": (post.llm?.entities || []).map((e: string) => ({ "@type": "Thing", name: e })),
      "audience": (post.audience || []).map((a: string) => ({ "@type": "Audience", audienceType: a })),
    }

  return (
    <div className="flex flex-col min-h-screen font-outfit relative z-10">
      {/* Main Content with Sidebar */}
      <div className="flex relative">
        {/* Main Article Content */}
        <article className="flex-1 py-16 xl:pr-16 xl:pl-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto xl:mx-8 xl:ml-12">
              {/* Article Header */}
              <div className="bg-white/80 text-gray-800 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
                <BlogPostHeader post={post} />
              </div>
              {post.jsonLd && <JsonLd data={post.jsonLd} />}
              <JsonLd data={articleJsonLd} />
              {faqJsonLd && <JsonLd data={faqJsonLd} />}
              
              {/* Article Content */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12 mb-8">
                <BlogPostContent post={post} />
              </div>

              {/* FAQ Section (visible content) */}
              {hasFaqs && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-8 md:p-10 mb-8">
                  <h2 className="text-2xl font-bold mb-4 font-mattone text-gray-900">FAQs</h2>
                  <div className="space-y-3 text-gray-700">
                    {post.faqs?.map((item: { q: string; a: string }, i: number) => (
                      <details
                        key={i}
                        className="rounded-md border border-gray-200 p-4"
                      >
                        <summary className="cursor-pointer font-semibold text-gray-800">
                          {item.q}
                        </summary>
                        <p className="mt-2 text-gray-700">{item.a}</p>
                      </details>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Navigation */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6">
                <BlogPostNavigation previousPost={previousPost} nextPost={nextPost} />
              </div>
            </div>
          </div>
        </article>
        
        {/* Floating Sidebar */}
        <FloatingSidebar popularPosts={popularPosts} relatedPosts={relatedPosts} />
      </div>
       
      {/* Related Posts Section for Mobile */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-white/30 backdrop-blur-sm xl:hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <RelatedPosts posts={relatedPosts} />
            </div>
          </div>
        </section>
      )}
      
      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <CTA 
              title="Get ATS-Ready Resume"
              subtitle="We'll help you build a resume that ATS systems will love, cover letters that get you noticed, and a interview ready stories."
              primaryButtonText="I want to be interview ready"
              showSecondaryButton={false}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
