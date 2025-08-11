// Central analytics hub that coordinates all tracking services
import { posthog } from 'posthog-js'
import { supabase } from './supabase'
import { gtag } from './gtag'

export interface UserProperties {
  userId?: string
  email?: string
  name?: string
  plan?: 'free' | 'pro' | 'enterprise'
  signupDate?: string
  lastActiveDate?: string
}

export interface EventProperties {
  [key: string]: any
}

class Analytics {
  // User identification and properties
  identify(userId: string, properties: UserProperties = {}) {
    // PostHog identification
    posthog.identify(userId, properties)
    
    // Google Analytics user properties
    gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
      user_id: userId,
      custom_map: {
        user_plan: properties.plan,
        signup_date: properties.signupDate,
      }
    })
    
    // Store in Supabase for deep analysis
    this.logEvent('user_identified', { userId, ...properties })
  }

  // Event tracking across all platforms
  async track(eventName: string, properties: EventProperties = {}) {
    const timestamp = new Date().toISOString()
    const enhancedProperties = {
      ...properties,
      timestamp,
      url: typeof window !== 'undefined' ? window.location.href : '',
      referrer: typeof window !== 'undefined' ? document.referrer : '',
      user_agent: typeof window !== 'undefined' ? navigator.userAgent : '',
    }

    // PostHog tracking
    posthog.capture(eventName, enhancedProperties)
    
    // Google Analytics tracking
    gtag('event', eventName, enhancedProperties)
    
    // Supabase logging for deep analysis
    await this.logEvent(eventName, enhancedProperties)
  }

  // Revenue tracking (Stripe events)
  async trackRevenue(amount: number, currency: string = 'usd', properties: EventProperties = {}) {
    const revenueProperties = {
      ...properties,
      revenue: amount,
      currency,
      timestamp: new Date().toISOString(),
    }

    // PostHog revenue tracking
    posthog.capture('purchase', revenueProperties)
    
    // Google Analytics enhanced ecommerce
    gtag('event', 'purchase', {
      transaction_id: properties.transactionId,
      value: amount,
      currency,
      items: properties.items || [],
    })
    
    // Log to Supabase
    await this.logEvent('purchase', revenueProperties)
  }

  // Funnel tracking for conversion analysis
  async trackFunnelStep(funnelName: string, step: string, properties: EventProperties = {}) {
    const funnelProperties = {
      ...properties,
      funnel_name: funnelName,
      funnel_step: step,
      timestamp: new Date().toISOString(),
    }

    await this.track(`funnel_${funnelName}_${step}`, funnelProperties)
  }

  // Feature usage tracking
  async trackFeatureUsage(feature: string, action: string, properties: EventProperties = {}) {
    const featureProperties = {
      ...properties,
      feature,
      action,
      timestamp: new Date().toISOString(),
    }

    await this.track(`feature_${feature}_${action}`, featureProperties)
  }

  // Private method to log events to Supabase
  private async logEvent(eventName: string, properties: EventProperties) {
    try {
      await supabase.from('analytics_events').insert({
        event_name: eventName,
        properties,
        user_id: properties.userId || posthog.get_distinct_id(),
        timestamp: new Date().toISOString(),
        session_id: posthog.get_session_id(),
      })
    } catch (error) {
      console.error('Failed to log event to Supabase:', error)
    }
  }

  // Page view tracking with enhanced properties
  trackPageView(path: string, properties: EventProperties = {}) {
    const pageProperties = {
      ...properties,
      path,
      title: typeof document !== 'undefined' ? document.title : '',
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      timestamp: new Date().toISOString(),
    }

    // This is handled by PostHog provider, but we can add custom properties
    posthog.capture('$pageview', pageProperties)
    
    // Google Analytics pageview
    gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
      page_path: path,
      page_title: pageProperties.title,
    })
  }
}

export const analytics = new Analytics()

// Convenience functions for common tracking scenarios
export const trackSignup = (userId: string, method: string, properties: EventProperties = {}) => {
  analytics.identify(userId, properties as UserProperties)
  analytics.track('user_signed_up', { method, ...properties })
  analytics.trackFunnelStep('acquisition', 'signup_completed', { method, ...properties })
}

export const trackLogin = (userId: string, properties: EventProperties = {}) => {
  analytics.identify(userId, properties as UserProperties)
  analytics.track('user_logged_in', properties)
}

export const trackResumeCreated = (templateId: string, properties: EventProperties = {}) => {
  analytics.track('resume_created', { template_id: templateId, ...properties })
  analytics.trackFunnelStep('activation', 'resume_created', { template_id: templateId, ...properties })
  analytics.trackFeatureUsage('resume_builder', 'create', { template_id: templateId, ...properties })
}

export const trackResumeDownloaded = (format: string, properties: EventProperties = {}) => {
  analytics.track('resume_downloaded', { format, ...properties })
  analytics.trackFunnelStep('activation', 'resume_downloaded', { format, ...properties })
  analytics.trackFeatureUsage('resume_builder', 'download', { format, ...properties })
}

export const trackSubscriptionStarted = (plan: string, amount: number, properties: EventProperties = {}) => {
  analytics.trackRevenue(amount, 'usd', { plan, ...properties })
  analytics.trackFunnelStep('conversion', 'subscription_started', { plan, amount, ...properties })
}

export const trackInterviewPractice = (questionType: string, duration: number, properties: EventProperties = {}) => {
  analytics.track('interview_practice_completed', { question_type: questionType, duration, ...properties })
  analytics.trackFeatureUsage('interview_practice', 'complete', { question_type: questionType, duration, ...properties })
}