import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-8 border-t border-zinc-800 font-outfit">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-sm text-zinc-500 font-outfit">© {new Date().getFullYear()} Mockstars</span>
          </div>
          <div className="flex gap-6 flex-wrap justify-center">
            <Link href="/features" className="text-sm text-zinc-500 hover:text-teal font-outfit">
              Features
            </Link>
            <Link href="/pricing" className="text-sm text-zinc-500 hover:text-teal font-outfit">
              Pricing
            </Link>
            <Link href="/about" className="text-sm text-zinc-500 hover:text-teal font-outfit">
              About
            </Link>
            <Link href="/privacy" className="text-sm text-zinc-500 hover:text-teal font-outfit">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-zinc-500 hover:text-pink font-outfit">
              Terms
            </Link>
            <a href="mailto:michelle@veloraai.com" className="text-sm text-zinc-500 hover:text-orange font-outfit">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 