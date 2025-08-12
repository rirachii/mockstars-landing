'use client'

import { usePathname } from 'next/navigation'
import Footer from '@/components/layout/Footer'

export default function MaybeFooter() {
  const pathname = usePathname()
  if (pathname?.startsWith('/resume-builder')) {
    return null
  }
  return <Footer />
} 