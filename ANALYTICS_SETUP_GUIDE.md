# Analytics Setup Guide

This guide will help you set up comprehensive analytics tracking for your SaaS application using PostHog, Google Analytics 4, Stripe, and Supabase.

## 🎯 What You'll Track

### 1. Acquisition (Who's signing up?)
- User signups by source/method
- Marketing attribution
- Referral tracking
- Campaign performance

### 2. Engagement & Retention (Are they using the app?)
- Feature usage patterns
- Session duration
- Page views and navigation
- User activity over time

### 3. Activation (Are they getting value?)
- Key feature adoption
- Onboarding completion
- Time to first value
- User progression through funnels

### 4. Conversion & Revenue (Will they pay/are they paying?)
- Subscription purchases
- Revenue tracking
- Conversion funnel analysis
- Churn and retention metrics

## 🛠️ Setup Instructions

### 1. Environment Variables

Update your `.env` file with the following variables:

```env
# PostHog (already configured)
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com

# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 2. Supabase Database Setup

Run this SQL in your Supabase SQL editor to create the analytics table:

```sql
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_name TEXT NOT NULL,
  properties JSONB DEFAULT '{}',
  user_id TEXT NOT NULL,
  session_id TEXT,
  timestamp TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_name ON analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_analytics_events_timestamp ON analytics_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session_id ON analytics_events(session_id);

-- Create a view for funnel analysis
CREATE OR REPLACE VIEW funnel_analysis AS
SELECT 
  user_id,
  event_name,
  properties->>'funnel_name' as funnel_name,
  properties->>'funnel_step' as funnel_step,
  timestamp,
  ROW_NUMBER() OVER (PARTITION BY user_id, properties->>'funnel_name' ORDER BY timestamp) as step_order
FROM analytics_events 
WHERE event_name LIKE 'funnel_%';

-- Create a view for revenue analysis
CREATE OR REPLACE VIEW revenue_analysis AS
SELECT 
  user_id,
  (properties->>'revenue')::NUMERIC as revenue,
  properties->>'currency' as currency,
  properties->>'plan' as plan,
  timestamp,
  DATE_TRUNC('day', timestamp) as date,
  DATE_TRUNC('month', timestamp) as month
FROM analytics_events 
WHERE event_name = 'purchase';
```

### 3. Stripe Webhook Setup

1. Go to your Stripe Dashboard → Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select these events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Copy the webhook secret to your `.env` file

### 4. Google Analytics 4 Setup

1. Create a GA4 property in Google Analytics
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Add it to your `.env` file
4. The analytics provider will automatically initialize GA4

## 📊 Usage Examples

### Basic Tracking

```tsx
import { useAnalytics } from '@/hooks/useAnalytics'

function MyComponent() {
  const analytics = useAnalytics()

  const handleSignup = (userId: string) => {
    analytics.trackSignup(userId, 'email', {
      source: 'landing_page',
      campaign: 'hero_cta'
    })
  }

  const handleFeatureUse = () => {
    analytics.trackFeatureUsage('resume_builder', 'create', {
      template_id: 'modern-professional'
    })
  }

  return (
    <div>
      <button onClick={() => handleSignup('user123')}>
        Sign Up
      </button>
      <button onClick={handleFeatureUse}>
        Create Resume
      </button>
    </div>
  )
}
```

### Revenue Tracking

```tsx
const handleSubscription = async () => {
  // This happens automatically via Stripe webhooks
  // But you can also track manually:
  analytics.trackSubscriptionStarted('pro', 29.99, {
    billing_cycle: 'monthly',
    discount_applied: false
  })
}
```

### Funnel Analysis

```tsx
// Track users through your conversion funnel
analytics.trackFunnelStep('onboarding', 'profile_completed', {
  completion_time: 240,
  fields_filled: 8
})

analytics.trackFunnelStep('activation', 'first_resume_created', {
  template_id: 'modern-professional'
})

analytics.trackFunnelStep('conversion', 'subscription_started', {
  plan: 'pro'
})
```

## 📈 Analytics Dashboard

Use the `AnalyticsDashboard` component to view your analytics:

```tsx
import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard'

function AdminPage() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <AnalyticsDashboard />
    </div>
  )
}
```

## 🔍 Key Metrics to Track

### Acquisition Metrics
- **Signups by source**: Track where users come from
- **Conversion rate by channel**: Which marketing channels work best
- **Cost per acquisition**: If you're running paid ads

### Engagement Metrics
- **Daily/Monthly Active Users**: How many users are active
- **Session duration**: How long users spend in your app
- **Feature adoption**: Which features are most used

### Activation Metrics
- **Time to first value**: How quickly users get value
- **Onboarding completion**: How many users complete setup
- **Key action completion**: Resume created, interview practiced, etc.

### Revenue Metrics
- **Monthly Recurring Revenue (MRR)**: Your subscription revenue
- **Customer Lifetime Value (CLV)**: How much each customer is worth
- **Churn rate**: How many customers cancel
- **Conversion rate**: Free to paid conversion

## 🚀 Advanced Features

### Custom Event Properties
Add rich context to your events:

```tsx
analytics.track('resume_created', {
  template_id: 'modern-professional',
  template_category: 'professional',
  creation_method: 'from_scratch',
  time_to_create: 300,
  sections_included: ['experience', 'education', 'skills'],
  ai_suggestions_used: 5,
  user_plan: 'free'
})
```

### User Identification
Link events across sessions:

```tsx
analytics.identify(userId, {
  email: 'user@example.com',
  name: 'John Doe',
  plan: 'pro',
  signupDate: '2024-01-15',
  industry: 'technology'
})
```

### Cohort Analysis
Track user behavior over time:

```sql
-- Example: Weekly cohort retention
SELECT 
  DATE_TRUNC('week', first_seen) as cohort_week,
  DATE_TRUNC('week', timestamp) as activity_week,
  COUNT(DISTINCT user_id) as active_users
FROM (
  SELECT 
    user_id,
    timestamp,
    MIN(timestamp) OVER (PARTITION BY user_id) as first_seen
  FROM analytics_events
) cohort_data
GROUP BY cohort_week, activity_week
ORDER BY cohort_week, activity_week;
```

## 🔧 Troubleshooting

### Common Issues

1. **Events not appearing in PostHog**
   - Check your PostHog key in `.env`
   - Verify the PostHog provider is wrapped around your app
   - Check browser console for errors

2. **Stripe webhooks not working**
   - Verify webhook URL is correct
   - Check webhook secret matches your `.env`
   - Test webhook in Stripe dashboard

3. **Supabase connection issues**
   - Verify Supabase URL and keys
   - Check if analytics_events table exists
   - Verify RLS policies if enabled

### Debug Mode

Enable debug logging in development:

```tsx
// In your analytics provider
posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  debug: process.env.NODE_ENV === 'development',
  // ... other options
})
```

## 📚 Next Steps

1. **Set up alerts**: Get notified when key metrics change
2. **Create dashboards**: Build custom views for different stakeholders
3. **A/B testing**: Use PostHog's feature flags for experiments
4. **Automated reports**: Send weekly/monthly analytics summaries
5. **Data export**: Set up automated data exports for deeper analysis

## 🎯 Success Metrics

Track these key questions:

1. **Who's signing up?** (Acquisition)
   - Signup rate by source
   - User demographics
   - Marketing attribution

2. **Are they using the app?** (Engagement)
   - Daily/monthly active users
   - Feature adoption rates
   - Session patterns

3. **Are they getting value?** (Activation)
   - Time to first resume
   - Onboarding completion
   - Key feature usage

4. **Will they pay?** (Conversion)
   - Free to paid conversion
   - Revenue per user
   - Churn and retention

This comprehensive analytics setup will give you deep insights into your SaaS performance and help you make data-driven decisions to grow your business.