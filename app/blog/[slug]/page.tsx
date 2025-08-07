import { getAllBlogPosts, getBlogPost } from '@/lib/blog'
import { BlogPostContent } from '@/components/blog-post-content'
import { BlogPostHeader } from '@/components/blog-post-header'
import { BlogPostNavigation } from '@/components/blog-post-navigation'
import { RelatedPosts } from '@/components/related-posts'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CTA from '@/components/CTA'

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
      title: 'Post Not Found | MockStars Blog',
      description: 'The blog post you are looking for could not be found.',
    }
  }

  return {
    title: `${post.title} | MockStars Blog`,
    description: post.description,
    keywords: post.tags?.join(', '),
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.image ? [{ url: post.image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
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
  
  // Get related posts (same category or tags, excluding current post)
  const relatedPosts = allPosts
    .filter(p => 
      p.slug !== post.slug && 
      (p.category === post.category || 
       p.tags?.some(tag => post.tags?.includes(tag)))
    )
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <article className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <BlogPostHeader post={post} />
          <BlogPostContent post={post} />
          <BlogPostNavigation previousPost={previousPost} nextPost={nextPost} />
        </div>
      </article>
      
      {relatedPosts.length > 0 && (
        <RelatedPosts posts={relatedPosts} />
      )}
      <CTA />
    </div>
  )
}
