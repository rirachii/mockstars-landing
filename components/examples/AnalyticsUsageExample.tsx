'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAnalytics } from '@/hooks/useAnalytics'
import { Badge } from '@/components/ui/badge'

export function AnalyticsUsageExample() {
  const analytics = useAnalytics()
  const [userId, setUserId] = useState('')
  const [templateId, setTemplateId] = useState('modern-professional')

  // Example: User signup flow
  const handleSignup = () => {
    const newUserId = `user_${Date.now()}`
    setUserId(newUserId)
    
    // Track signup with method and additional properties
    analytics.trackSignup(newUserId, 'email', {
      source: 'landing_page',
      campaign: 'hero_cta',
      referrer: document.referrer,
    })
  }

  // Example: User login
  const handleLogin = () => {
    if (!userId) return
    
    analytics.trackLogin(userId, {
      login_method: 'email',
      device_type: 'desktop',
    })
  }

  // Example: Resume creation
  const handleCreateResume = () => {
    if (!userId) return
    
    analytics.trackResumeCreated(templateId, {
      template_category: 'professional',
      creation_method: 'from_scratch',
      time_to_create: 300, // seconds
    })
  }

  // Example: Resume download
  const handleDownloadResume = () => {
    if (!userId) return
    
    analytics.trackResumeDownloaded('pdf', {
      template_id: templateId,
      file_size: '2.3MB',
      download_source: 'preview_page',
    })
  }

  // Example: Subscription purchase
  const handleSubscribe = () => {
    if (!userId) return
    
    analytics.trackSubscriptionStarted('pro', 29.99, {
      billing_cycle: 'monthly',
      discount_applied: false,
      payment_method: 'card',
    })
  }

  // Example: Interview practice
  const handleInterviewPractice = () => {
    if (!userId) return
    
    analytics.trackInterviewPractice('behavioral', 180, {
      questions_answered: 5,
      average_response_time: 45,
      confidence_score: 8.5,
    })
  }

  // Example: Custom event tracking
  const handleCustomEvent = () => {
    analytics.track('feature_explored', {
      feature_name: 'template_preview',
      time_spent: 120,
      templates_viewed: 3,
      user_engagement: 'high',
    })
  }

  // Example: Funnel step tracking
  const handleFunnelStep = () => {
    analytics.trackFunnelStep('onboarding', 'profile_completed', {
      completion_time: 240,
      fields_filled: 8,
      skip_count: 2,
    })
  }

  // Example: Feature usage tracking
  const handleFeatureUsage = () => {
    analytics.trackFeatureUsage('ai_suggestions', 'accepted', {
      suggestion_type: 'skill_recommendation',
      suggestions_shown: 5,
      acceptance_rate: 0.8,
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Analytics Implementation Examples</CardTitle>
          <CardDescription>
            See how to implement tracking for different user actions in your SaaS
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* User ID Input */}
          <div className="space-y-2">
            <Label htmlFor="userId">Current User ID</Label>
            <Input
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Will be set automatically on signup"
              disabled
            />
          </div>

          {/* Template Selection */}
          <div className="space-y-2">
            <Label htmlFor="templateId">Template ID</Label>
            <Input
              id="templateId"
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value)}
              placeholder="modern-professional"
            />
          </div>
        </CardContent>
      </Card>

      {/* Acquisition Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>1. Acquisition Tracking</CardTitle>
          <CardDescription>
            Track user signups and identify users across platforms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Button onClick={handleSignup} variant="default">
              Sign Up User
            </Button>
            <Button onClick={handleLogin} variant="outline" disabled={!userId}>
              Login User
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            <Badge variant="secondary">PostHog</Badge> User identification
            <Badge variant="secondary" className="ml-2">GA4</Badge> User properties
            <Badge variant="secondary" className="ml-2">Supabase</Badge> Event logging
          </div>
        </CardContent>
      </Card>

      {/* Engagement Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>2. Engagement & Activation</CardTitle>
          <CardDescription>
            Track feature usage and user activation events
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2 flex-wrap">
            <Button onClick={handleCreateResume} variant="default" disabled={!userId}>
              Create Resume
            </Button>
            <Button onClick={handleDownloadResume} variant="outline" disabled={!userId}>
              Download Resume
            </Button>
            <Button onClick={handleInterviewPractice} variant="outline" disabled={!userId}>
              Practice Interview
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            <Badge variant="secondary">Funnel</Badge> Activation steps
            <Badge variant="secondary" className="ml-2">Features</Badge> Usage tracking
          </div>
        </CardContent>
      </Card>

      {/* Revenue Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>3. Revenue & Conversion</CardTitle>
          <CardDescription>
            Track subscription purchases and revenue events
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Button onClick={handleSubscribe} variant="default" disabled={!userId}>
              Subscribe to Pro ($29.99)
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            <Badge variant="secondary">Stripe</Badge> Payment processing
            <Badge variant="secondary" className="ml-2">Revenue</Badge> Tracking
            <Badge variant="secondary" className="ml-2">GA4</Badge> Enhanced ecommerce
          </div>
        </CardContent>
      </Card>

      {/* Advanced Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>4. Advanced Analytics</CardTitle>
          <CardDescription>
            Custom events, funnel steps, and feature usage tracking
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2 flex-wrap">
            <Button onClick={handleCustomEvent} variant="outline">
              Custom Event
            </Button>
            <Button onClick={handleFunnelStep} variant="outline">
              Funnel Step
            </Button>
            <Button onClick={handleFeatureUsage} variant="outline">
              Feature Usage
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            <Badge variant="secondary">Custom</Badge> Event tracking
            <Badge variant="secondary" className="ml-2">Funnel</Badge> Conversion analysis
            <Badge variant="secondary" className="ml-2">Features</Badge> Usage patterns
          </div>
        </CardContent>
      </Card>

      {/* Implementation Code Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Code</CardTitle>
          <CardDescription>
            Copy these patterns into your components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`// In your components
import { useAnalytics } from '@/hooks/useAnalytics'

const analytics = useAnalytics()

// Track user signup
analytics.trackSignup(userId, 'email', {
  source: 'landing_page',
  campaign: 'hero_cta'
})

// Track feature usage
analytics.trackResumeCreated(templateId, {
  template_category: 'professional',
  creation_method: 'from_scratch'
})

// Track revenue
analytics.trackSubscriptionStarted('pro', 29.99, {
  billing_cycle: 'monthly'
})`}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}