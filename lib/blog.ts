import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author?: string
  image?: string
  tags?: string[]
  category?: string
  featured?: boolean
  published?: boolean
  content: string
  readingTime: number
  url: string
  faqs?: { q: string; a: string }[]
}

export function getAllBlogPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(contentDirectory)
  
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.(mdx|md)$/, '')
      const fullPath = path.join(contentDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      
      const { data, content } = matter(fileContents)
      
      // Calculate reading time (average 200 words per minute)
      const wordsPerMinute = 200
      const wordCount = content.split(/\s+/).length
      const readingTime = Math.ceil(wordCount / wordsPerMinute)
      
      return {
        slug,
        ...data,
        content,
        readingTime,
        url: `/blog/${slug}`,
        published: data.published ?? true,
      } as BlogPost
    })
    // Filter out unpublished posts in production
    .filter(post => process.env.NODE_ENV === 'development' || post.published)
    // Sort posts by date
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return allPostsData
}

export function getBlogPost(slug: string): BlogPost | undefined {
  const allPosts = getAllBlogPosts()
  return allPosts.find(post => post.slug === slug)
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return getAllBlogPosts().filter(post => post.featured)
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return getAllBlogPosts().filter(post => 
    post.category?.toLowerCase() === category.toLowerCase()
  )
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return getAllBlogPosts().filter(post => post.tags?.includes(tag))
}

export function getAllCategories(): string[] {
  const allPosts = getAllBlogPosts()
  const categories = allPosts
    .map(post => post.category)
    .filter((category): category is string => category !== undefined)
  
  return [...new Set(categories)]
}

export function getAllTags(): string[] {
  const allPosts = getAllBlogPosts()
  const tags = allPosts
    .flatMap(post => post.tags || [])
    .filter(tag => tag !== undefined)
  
  return [...new Set(tags)]
}
