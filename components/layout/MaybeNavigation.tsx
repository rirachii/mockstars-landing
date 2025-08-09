'use client'

import { usePathname } from 'next/navigation'
import Navigation from '@/components/layout/Navigation'

export default function MaybeNavigation() {
  const pathname = usePathname()
  if (pathname?.startsWith('/resume-builder')) {
    return null
  }
  return <Navigation />
} 