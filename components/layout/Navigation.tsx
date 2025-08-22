'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import type React from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close mobile menu when clicking outside or pressing escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    
    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden' // Prevent background scroll
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <>
      <header className="bg-white/5 backdrop-blur-sm sticky top-0 z-50 font-mattone">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 sm:p-6 lg:px-8" aria-label="Global">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="text-xl sm:text-2xl font-bold text-black flex items-center gap-2">
                  <Image src="/logo.png" alt="Mockstars" width={40} height={40} className="sm:w-[50px] sm:h-[50px]" />
                  <h1>Mockstars</h1>  
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Desktop navigation using shadcn NavigationMenu */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-8">
          <NavigationMenu className="relative z-[60]">
            <NavigationMenuList className="!justify-start">
              
              {/* Resumes */}
              <NavigationMenuItem className="relative">
                <NavigationMenuTrigger>Resumes</NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute left-1/2 top-full -translate-x-1/2 mt-2 w-[400px] md:w-[500px] rounded-md border bg-white shadow-xl">
                  <ul className="grid gap-2 lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                          href="/templates"
                        >
                          <div className="mt-4 mb-2 text-lg font-medium">Templates</div>
                          <p className="text-muted-foreground text-sm leading-tight text-outfit">
                            Browse ATS-friendly resume templates built for results.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/resume-builder/upload" title="Build a Resume">
                      Start from scratch or upload your existing resume.
                    </ListItem>
                    <ListItem href="/resume-builder/templates" title="Choose Template">
                      Preview your data in any template instantly.
                    </ListItem>
                    <ListItem href="/blog/category/resume" title="Resume Guides">
                      Learn best practices to stand out to recruiters.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Cover Letters */}
              <NavigationMenuItem className="relative">
                <NavigationMenuTrigger>Cover Letters</NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute left-1/2 top-full -translate-x-1/2 mt-2 w-[400px] md:w-[500px] rounded-md border bg-white shadow-xl">
                  <ul className="grid gap-2 lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                          href="/resources/cover-letters"
                        >
                          <div className="mt-4 mb-2 text-lg font-medium">Examples</div>
                          <p className="text-muted-foreground text-sm leading-tight">
                            See what great cover letters look like.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/resources/cover-letters/how-to" title="How to Write">
                      Step-by-step instructions with tips and checklists.
                    </ListItem>
                    <ListItem href="/resources/cover-letters/templates" title="Templates">
                      Professional formats you can adapt quickly.
                    </ListItem>
                    <ListItem
                      href="/blog/search?query=cover%20letter"
                      title="More Resources"
                    >
                      Browse additional guides and examples.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Interview Questions */}
              <NavigationMenuItem className="relative">
                <NavigationMenuTrigger>Interview Questions</NavigationMenuTrigger>
                <NavigationMenuContent className="absolute left-1/2 top-full -translate-x-1/2 mt-2 w-[400px] md:w-[500px] rounded-md border bg-white shadow-xl">
                  <ul className="grid gap-2 lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                          href="/blog/category/interview"
                        >
                          <div className="mt-4 mb-2 text-lg font-medium">Guides</div>
                          <p className="text-muted-foreground text-sm leading-tight">
                            Prepare with curated questions and expert answers.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/blog/search?query=behavioral" title="Behavioral">
                      Master STAR stories with real examples.
                    </ListItem>
                    <ListItem
                      href="/blog/search?query=system%20design"
                      title="System Design"
                    >
                      Practice architecture and trade-off questions.
                    </ListItem>
                    <ListItem
                      href="/blog/search?query=salary%20negotiation"
                      title="Negotiation"
                    >
                      Get confident discussing compensation.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Resources */}
              <NavigationMenuItem className="relative">
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute left-1/2 top-full -translate-x-1/2 mt-2 w-[400px] md:w-[500px] rounded-md border bg-white shadow-xl">
                  <ul className="grid gap-2 lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                          href="/blog"
                        >
                          <div className="mt-4 mb-2 text-lg font-medium">All Articles</div>
                          <p className="text-muted-foreground text-sm leading-tight">
                            Career, resume, and interview resources.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/blog/category/career" title="Career Advice">
                      Curated guidance to navigate your next step.
                    </ListItem>
                    <ListItem href="/blog/search" title="Search">
                      Find resources by topic or keyword.
                    </ListItem>
                    <ListItem href="/templates" title="Popular Templates">
                      Explore trending resume formats.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

            </NavigationMenuList>

          </NavigationMenu>

          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Button 
              asChild
              className="bg-white hover:bg-blue/90 text-blue"
            >
            <Link href="/resume-builder">Start Here</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay rendered outside header to avoid clipping */}
      {mobileMenuOpen && (
        <div id="mobile-menu-overlay">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-[9998] bg-black/50 lg:hidden" 
            onClick={closeMobileMenu}
          />
          
          {/* Menu Panel */}
          <div 
            className="fixed top-0 right-0 bottom-0 z-[9999] w-full max-w-sm bg-white shadow-xl lg:hidden overflow-y-auto"
            role="dialog" 
            aria-modal="true" 
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <Link href="/" onClick={closeMobileMenu}>
                  <span className="text-xl font-bold text-black flex items-center gap-2">
                    <Image src="/logo.png" alt="Mockstars" width={32} height={32} />
                  Mockstars
                </span>
                </Link>
                <button
                  type="button"
                    className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    onClick={closeMobileMenu}
                >
                  <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6" />
                </button>
              </div>

              {/* Navigation Content */}
              <div className="space-y-6">
                {/* Resumes Section */}
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Resumes</div>
                  <div className="space-y-2">
                    <Link href="/templates" onClick={closeMobileMenu} className="block text-base font-medium text-gray-900 hover:text-blue">
                      Browse Templates
                    </Link>
                    <Link href="/resume-builder/upload" onClick={closeMobileMenu} className="block text-sm text-gray-600 hover:text-gray-900">
                      Build a Resume
                    </Link>
                    <Link href="/resume-builder/templates" onClick={closeMobileMenu} className="block text-sm text-gray-600 hover:text-gray-900">
                      Choose Template
                    </Link>
                  </div>
                </div>

                {/* Cover Letters Section */}
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Cover Letters</div>
                  <div className="space-y-2">
                    <Link href="/resources/cover-letters" onClick={closeMobileMenu} className="block text-base font-medium text-gray-900 hover:text-blue">
                      Examples
                    </Link>
                    <Link href="/resources/cover-letters/how-to" onClick={closeMobileMenu} className="block text-sm text-gray-600 hover:text-gray-900">
                      How to Write
                    </Link>
                  </div>
                </div>

                {/* Interview Questions Section */}
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Interview Questions</div>
                  <div className="space-y-2">
                    <Link href="/blog/category/interview" onClick={closeMobileMenu} className="block text-base font-medium text-gray-900 hover:text-blue">
                      Guides
                    </Link>
                    <Link href="/blog/search?query=behavioral" onClick={closeMobileMenu} className="block text-sm text-gray-600 hover:text-gray-900">
                      Behavioral Questions
                    </Link>
                  </div>
                </div>

                {/* Resources Section */}
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Resources</div>
                  <div className="space-y-2">
                    <Link href="/blog" onClick={closeMobileMenu} className="block text-base font-medium text-gray-900 hover:text-blue">
                      All Articles
                    </Link>
                    <Link href="/blog/category/career" onClick={closeMobileMenu} className="block text-sm text-gray-600 hover:text-gray-900">
                      Career Advice
                    </Link>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-6 border-t border-gray-200">
                  <Button asChild className="w-full bg-blue hover:bg-blue/90 text-white">
                    <Link href="/resume-builder" onClick={closeMobileMenu}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function ListItem(
  { title, children, href, ...props }: 
  React.ComponentPropsWithoutRef<'li'> & { href: string; title: string }
) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
