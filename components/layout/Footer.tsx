import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-16 border-t border-gray-200 bg-white text-gray-700 font-outfit">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="text-2xl font-mattone text-gray-900">Mockstars</div>
            <p className="mt-3 text-sm text-gray-500">
              Interview mastery, resume templates, and career tools to help you stand out.
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-900 mb-3">Product</div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/features" className="text-zinc-500 hover:text-teal transition-colors">Features</Link>
              </li>
              <li>
                <Link href="/pricing" className="text-zinc-500 hover:text-teal transition-colors">Pricing</Link>
              </li>
              <li>
                <Link href="/templates" className="text-zinc-500 hover:text-teal transition-colors">Templates</Link>
              </li>
              <li>
                <Link href="/resume-builder" className="text-zinc-500 hover:text-teal transition-colors">Resume Builder</Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-900 mb-3">Company</div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-zinc-500 hover:text-teal transition-colors">About</Link>
              </li>
              <li>
                <Link href="/privacy" className="text-zinc-500 hover:text-teal transition-colors">Privacy</Link>
              </li>
              <li>
                <Link href="/terms" className="text-zinc-500 hover:text-pink transition-colors">Terms</Link>
              </li>
              <li>
                <a href="mailto:hello@mockstars.app" className="text-zinc-500 hover:text-orange transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-900 mb-3">Resources</div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-zinc-500 hover:text-teal transition-colors">Blog</Link>
              </li>
              <li>
                <Link href="/blog/search" className="text-zinc-500 hover:text-teal transition-colors">Search Articles</Link>
              </li>
              <li>
                <Link href="/resume-builder/upload" className="text-zinc-500 hover:text-teal transition-colors">Upload Resume</Link>
              </li>
              <li>
                <Link href="/resume-builder/text" className="text-zinc-500 hover:text-teal transition-colors">Paste Resume Text</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm text-zinc-500">© {new Date().getFullYear()} Mockstars. All rights reserved.</span>
          <div className="flex gap-6 flex-wrap justify-center text-sm">
            <Link href="/privacy" className="text-zinc-500 hover:text-teal transition-colors">Privacy</Link>
            <Link href="/terms" className="text-zinc-500 hover:text-pink transition-colors">Terms</Link>
            <a href="mailto:hello@mockstars.app" className="text-zinc-500 hover:text-orange transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
} 