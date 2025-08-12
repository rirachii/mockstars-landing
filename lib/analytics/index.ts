// Minimal analytics stubs (disabled in this environment)

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

class AnalyticsStub {
  identify(_userId: string, _properties: UserProperties = {}) {}
  async track(_eventName: string, _properties: EventProperties = {}) {}
  async trackRevenue(_amount: number, _currency: string = 'usd', _properties: EventProperties = {}) {}
  async trackFunnelStep(_funnelName: string, _step: string, _properties: EventProperties = {}) {}
  async trackFeatureUsage(_feature: string, _action: string, _properties: EventProperties = {}) {}
  trackPageView(_path: string, _properties: EventProperties = {}) {}
}

export const analytics = new AnalyticsStub()

export const trackSignup = (_userId: string, _method: string, _properties: EventProperties = {}) => {}
export const trackLogin = (_userId: string, _properties: EventProperties = {}) => {}
export const trackResumeCreated = (_templateId: string, _properties: EventProperties = {}) => {}
export const trackResumeDownloaded = (_format: string, _properties: EventProperties = {}) => {}
export const trackSubscriptionStarted = (_plan: string, _amount: number, _properties: EventProperties = {}) => {}
export const trackInterviewPractice = (_questionType: string, _duration: number, _properties: EventProperties = {}) => {}