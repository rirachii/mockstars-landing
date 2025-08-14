import { getAllBlogPosts, getBlogPostsByCategory, getAllCategories, getAllTags } from '@/lib/blog'
import { Metadata } from 'next'
import { HorizontalNavigation } from '@/components/layout/HorizontalNavigation'
import CategoryClient from './CategoryClient'

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const rawName = decodeURIComponent(category).replace(/-/g, ' ')
  const normalized = rawName.trim().toLowerCase()
  const categoryName = normalized === 'all' ? 'All Articles' : rawName
  
  return {
    title: `${categoryName} | Mockstars Blog`,
    description: `Explore our collection of articles about ${categoryName} for interview preparation and career advice.`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const rawName = decodeURIComponent(category).replace(/-/g, ' ')
  const normalized = rawName.trim().toLowerCase()
  const categoryName = normalized === 'all' ? 'All Articles' : rawName
  const allPosts = getAllBlogPosts()
  const categoryPosts = normalized === 'all' ? allPosts : getBlogPostsByCategory(normalized)
  const categories = getAllCategories()
  const tags = getAllTags()

  // Convert category name to slug for navigation matching
  const categorySlug = normalized.replace(/\s+/g, '-')

  return (
    <div className="flex flex-col min-h-screen text-gray-800 font-outfit relative z-10">
      {/* Horizontal Navigation */}
      <HorizontalNavigation currentCategory={categorySlug} />
      
      {/* Hero + Grid + Pagination */}
      <CategoryClient categoryName={categoryName} posts={categoryPosts} />
      
    </div>
  )
}
