'use client'

import { useCallback } from 'react'
import { 
  analytics, 
  trackSignup, 
  trackLogin, 
  trackResumeCreated, 
  trackResumeDownloaded,
  trackSubscriptionStarted,
  trackInterviewPractice,
  type EventProperties,
  type UserProperties
} from '@/lib/analytics'

export function useAnalytics() {
  const identify = useCallback((userId: string, properties?: UserProperties) => {
    analytics.identify(userId, properties)
  }, [])

  const track = useCallback((eventName: string, properties?: EventProperties) => {
    analytics.track(eventName, properties)
  }, [])

  const trackRevenue = useCallback((amount: number, currency = 'usd', properties?: EventProperties) => {
    analytics.trackRevenue(amount, currency, properties)
  }, [])

  const trackFunnelStep = useCallback((funnelName: string, step: string, properties?: EventProperties) => {
    analytics.trackFunnelStep(funnelName, step, properties)
  }, [])

  const trackFeatureUsage = useCallback((feature: string, action: string, properties?: EventProperties) => {
    analytics.trackFeatureUsage(feature, action, properties)
  }, [])

  const trackPageView = useCallback((path: string, properties?: EventProperties) => {
    analytics.trackPageView(path, properties)
  }, [])

  return {
    identify,
    track,
    trackRevenue,
    trackFunnelStep,
    trackFeatureUsage,
    trackPageView,
    // Convenience methods
    trackSignup: useCallback((userId: string, method: string, properties?: EventProperties) => {
      trackSignup(userId, method, properties)
    }, []),
    trackLogin: useCallback((userId: string, properties?: EventProperties) => {
      trackLogin(userId, properties)
    }, []),
    trackResumeCreated: useCallback((templateId: string, properties?: EventProperties) => {
      trackResumeCreated(templateId, properties)
    }, []),
    trackResumeDownloaded: useCallback((format: string, properties?: EventProperties) => {
      trackResumeDownloaded(format, properties)
    }, []),
    trackSubscriptionStarted: useCallback((plan: string, amount: number, properties?: EventProperties) => {
      trackSubscriptionStarted(plan, amount, properties)
    }, []),
    trackInterviewPractice: useCallback((questionType: string, duration: number, properties?: EventProperties) => {
      trackInterviewPractice(questionType, duration, properties)
    }, []),
  }
}