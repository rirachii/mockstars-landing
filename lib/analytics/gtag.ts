// Google Analytics 4 integration
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return

  // Load gtag script
  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  script.async = true
  document.head.appendChild(script)

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }

  gtag('js', new Date())
  gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
    send_page_view: true,
  })
}

// Export gtag function for use in other files
export const gtag = (...args: any[]) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args)
  }
}

// Enhanced ecommerce tracking
export const trackPurchase = (transactionId: string, value: number, currency: string, items: any[]) => {
  gtag('event', 'purchase', {
    transaction_id: transactionId,
    value,
    currency,
    items,
  })
}

// Custom event tracking with enhanced properties
export const trackCustomEvent = (eventName: string, properties: Record<string, any> = {}) => {
  gtag('event', eventName, {
    event_category: properties.category || 'engagement',
    event_label: properties.label,
    value: properties.value,
    custom_parameters: properties,
  })
}

// Conversion tracking
export const trackConversion = (conversionId: string, value?: number, currency?: string) => {
  gtag('event', 'conversion', {
    send_to: conversionId,
    value,
    currency,
  })
}

// User engagement tracking
export const trackEngagement = (engagementTime: number) => {
  gtag('event', 'user_engagement', {
    engagement_time_msec: engagementTime,
  })
}

// Page view tracking with custom properties
export const trackPageView = (path: string, title?: string, properties: Record<string, any> = {}) => {
  gtag('config', GA_MEASUREMENT_ID!, {
    page_path: path,
    page_title: title,
    custom_map: properties,
  })
}