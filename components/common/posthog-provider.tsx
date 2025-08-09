'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      capture_pageview: true, // Enable automatic pageview capture
      capture_pageleave: true,
      persistence: 'localStorage',
      bootstrap: {
        distinctID: posthog.get_distinct_id(),
        isIdentifiedID: posthog.has_opted_in_capturing(),
        featureFlags: {},
      },
      loaded: (posthog) => {
        // Add default properties for all events
        posthog.register({
          app_version: '1.0.0',
          platform: 'web',
          screen_size: `${window.innerWidth}x${window.innerHeight}`,
        })
      },
      debug: process.env.NODE_ENV === 'development',
    })
  }, [])

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  )
}

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthogClient = usePostHog()

  useEffect(() => {
    if (pathname && posthogClient) {
      let url = window.origin + pathname
      const search = searchParams?.toString()
      if (search) {
        url += '?' + search
      }

      // Capture enhanced pageview with more properties
      posthogClient.capture('$pageview', {
        '$current_url': url,
        path: pathname,
        referrer: document.referrer,
        search_params: search || null,
        viewport_width: window.innerWidth,
        viewport_height: window.innerHeight,
        user_agent: navigator.userAgent,
        language: navigator.language,
      })
    }
  }, [pathname, searchParams, posthogClient])

  return null
}

function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  )
}
