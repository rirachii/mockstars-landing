'use client'

import Link from 'next/link'
import { useState } from 'react'
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

  return (
    <header className="bg-white/5 backdrop-blur-sm sticky top-0 z-50 font-mattone">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 sm:p-6 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-xl sm:text-2xl font-bold text-blue flex items-center gap-2">
                <Image src="/logo.png" alt="Mockstars" width={40} height={40} className="sm:w-[50px] sm:h-[50px]" />
                <h1 className="text-xl sm:text-2xl font-bold text-blue">Mockstars</h1>  
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop navigation using shadcn NavigationMenu */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-8">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              {/* Resumes */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resumes</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                          href="/templates"
                        >
                          <div className="mt-4 mb-2 text-sm font-sm">Templates</div>
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
              <NavigationMenuItem>
                <NavigationMenuTrigger>Cover Letters</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                          href="/resources/cover-letters"
                        >
                          <div className="mt-4 mb-2 text-lg font-medium ">Examples</div>
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
                    <ListItem href="/blog/search?query=cover%20letter" title="More Resources">
                      Browse additional guides and examples.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Interview Questions */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Interview Questions</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
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
                    <ListItem href="/blog/search?query=system%20design" title="System Design">
                      Practice architecture and trade-off questions.
                    </ListItem>
                    <ListItem href="/blog/search?query=salary%20negotiation" title="Negotiation">
                      Get confident discussing compensation.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Resources (was Blog) */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
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

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div className="fixed inset-0 z-40 bg-black bg-opacity-25" onClick={() => setMobileMenuOpen(false)}></div>
          {/* Menu Panel */}
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 shadow-xl">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                <span className="text-xl sm:text-2xl font-bold text-blue flex items-center gap-2">
                  <Image src="/logo.png" alt="Mockstars" width={40} height={40} />
                  Mockstars
                </span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 space-y-4">
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Resumes</div>
                <div className="flex flex-col gap-1">
                  <Link href="/templates" onClick={() => setMobileMenuOpen(false)} className="text-gray-900 hover:underline">Browse Templates</Link>
                  <Link href="/resume-builder/upload" onClick={() => setMobileMenuOpen(false)} className="text-gray-900 hover:underline">Build a Resume</Link>
                  <Link href="/resume-builder/templates" onClick={() => setMobileMenuOpen(false)} className="text-gray-900 hover:underline">Choose Template</Link>
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Cover Letters</div>
                <div className="flex flex-col gap-1">
                  <Link href="/resources/cover-letters" onClick={() => setMobileMenuOpen(false)} className="text-gray-900 hover:underline">Examples</Link>
                  <Link href="/resources/cover-letters/how-to" onClick={() => setMobileMenuOpen(false)} className="text-gray-900 hover:underline">How to Write</Link>
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Interview Questions</div>
                <div className="flex flex-col gap-1">
                  <Link href="/blog/category/interview" onClick={() => setMobileMenuOpen(false)} className="text-gray-900 hover:underline">Guides</Link>
                  <Link href="/blog/search?query=behavioral" onClick={() => setMobileMenuOpen(false)} className="text-gray-900 hover:underline">Behavioral</Link>
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Resources</div>
                <div className="flex flex-col gap-1">
                  <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="text-gray-900 hover:underline">All Articles</Link>
                  <Link href="/blog/category/career" onClick={() => setMobileMenuOpen(false)} className="text-gray-900 hover:underline">Career Advice</Link>
                  <Link href="/blog/search" onClick={() => setMobileMenuOpen(false)} className="text-gray-900 hover:underline">Search</Link>
                </div>
              </div>
              <Button asChild className="w-full bg-blue hover:bg-gray-10 text-blue">
                <Link href="/resume-builder" onClick={() => setMobileMenuOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function ListItem({ title, children, href, ...props }: React.ComponentPropsWithoutRef<'li'> & { href: string; title: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href} className="no-underline">
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
