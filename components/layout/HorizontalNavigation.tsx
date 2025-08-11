import Link from "next/link";
import { HeroSearchBar } from "./hero-search-bar";

const navigationCategories = [
    { name: 'Home', href: '/blog', slug: 'home' },
    { name: 'Interview Guides', href: '/blog/category/interview-guides', slug: 'interview-guides' },
    { name: 'Industry Focus', href: '/blog/category/industry-focus', slug: 'industry-focus' },
    { name: 'Soft Skills', href: '/blog/category/soft-skills', slug: 'soft-skills' },
    { name: 'Behavioral Interview', href: '/blog/category/behavioral-interview', slug: 'behavioral-interview' },
    { name: 'Salary & Negotiation', href: '/blog/category/salary-negotiation', slug: 'salary-negotiation' },
    { name: 'Career Advice', href: '/blog/category/career-advice', slug: 'career-advice' },
]

export function HorizontalNavigation({ currentCategory }: { currentCategory?: string }) {
    return (
      <div className="bg-white/30 backdrop-blur-sm border-gray-200">
        <div className="container mx-auto px-4">
          {/* Mobile Layout: Stack vertically */}
          <div className="lg:hidden">
            <div className="py-4">
              <div className="mb-4">
                <HeroSearchBar />
              </div>
              <nav className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                {navigationCategories.map((category: any) => (
                  <Link
                    key={category.slug}
                    href={category.href}
                    className={`flex-shrink-0 px-3 py-2 text-xs font-semibold rounded-full transition-colors whitespace-nowrap font-outfit ${
                      currentCategory === category.slug || (category.slug === 'home' && !currentCategory)
                        ? 'bg-blue text-white'
                        : 'text-gray-600 hover:text-blue hover:bg-blue/10'
                    }`}
                  >
                    {category.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Desktop Layout: Side by side */}
          <div className="hidden lg:flex items-center justify-between py-4 gap-8">
            <nav className="flex space-x-8 overflow-x-auto">
              {navigationCategories.map((category: any) => (
                <Link
                  key={category.slug}
                  href={category.href}
                  className={`flex-shrink-0 px-4 py-2 text-sm font-semibold rounded-full transition-colors whitespace-nowrap font-outfit ${
                    currentCategory === category.slug || (category.slug === 'home' && !currentCategory)
                      ? 'bg-blue text-white'
                      : 'text-gray-600 hover:text-blue hover:bg-blue/10'
                  }`}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
            
            {/* Search Bar */}
            <div className="flex-shrink-0">
              <HeroSearchBar />
            </div>
          </div>
        </div>
      </div>
    )
  }