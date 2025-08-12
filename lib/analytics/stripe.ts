// import Stripe from 'stripe'
// import { analytics } from './index'

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2025-07-30.basil',
// })

// export { stripe }

// // Stripe webhook event handlers
// export const handleStripeWebhook = async (event: Stripe.Event) => {
//   switch (event.type) {
//     case 'checkout.session.completed':
//       await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
//       break
    
//     case 'customer.subscription.created':
//       await handleSubscriptionCreated(event.data.object as Stripe.Subscription)
//       break
    
//     case 'customer.subscription.updated':
//       await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
//       break
    
//     case 'customer.subscription.deleted':
//       await handleSubscriptionCanceled(event.data.object as Stripe.Subscription)
//       break
    
//     case 'invoice.payment_succeeded':
//       await handlePaymentSucceeded(event.data.object as Stripe.Invoice)
//       break
    
//     case 'invoice.payment_failed':
//       await handlePaymentFailed(event.data.object as Stripe.Invoice)
//       break
    
//     default:
//       console.log(`Unhandled Stripe event type: ${event.type}`)
//   }
// }

// const handleCheckoutCompleted = async (session: Stripe.Checkout.Session) => {
//   const customerId = session.customer as string
//   const amount = session.amount_total || 0
  
//   // Get customer details
//   const customer = await stripe.customers.retrieve(customerId)
//   const customerEmail = 'email' in customer ? (customer as Stripe.Customer).email : null
  
//   await analytics.trackRevenue(amount / 100, session.currency || 'usd', {
//     transactionId: session.id,
//     customerId,
//     customerEmail,
//     paymentStatus: session.payment_status,
//     mode: session.mode,
//   })
  
//   await analytics.trackFunnelStep('conversion', 'checkout_completed', {
//     amount: amount / 100,
//     currency: session.currency,
//     customerId,
//   })
// }

// const handleSubscriptionCreated = async (subscription: Stripe.Subscription) => {
//   const customerId = subscription.customer as string
//   const customer = await stripe.customers.retrieve(customerId)
//   const customerEmail = 'email' in customer ? (customer as Stripe.Customer).email : null
  
//   // Get price information
//   const priceId = subscription.items.data[0]?.price.id
//   const price = priceId ? await stripe.prices.retrieve(priceId) : null
//   const amount = price ? price.unit_amount || 0 : 0
  
//   await analytics.track('subscription_created', {
//     subscriptionId: subscription.id,
//     customerId,
//     customerEmail,
//     priceId,
//     amount: amount / 100,
//     currency: price?.currency || 'usd',
//     interval: price?.recurring?.interval,
//     status: subscription.status,
//   })
  
//   await analytics.trackFunnelStep('conversion', 'subscription_started', {
//     plan: priceId,
//     amount: amount / 100,
//     customerId,
//   })
// }

// const handleSubscriptionUpdated = async (subscription: Stripe.Subscription) => {
//   const customerId = subscription.customer as string
  
//   await analytics.track('subscription_updated', {
//     subscriptionId: subscription.id,
//     customerId,
//     status: subscription.status,
//     cancelAtPeriodEnd: subscription.cancel_at_period_end,
//   })
// }

// const handleSubscriptionCanceled = async (subscription: Stripe.Subscription) => {
//   const customerId = subscription.customer as string
  
//   await analytics.track('subscription_canceled', {
//     subscriptionId: subscription.id,
//     customerId,
//     canceledAt: new Date(subscription.canceled_at! * 1000).toISOString(),
//     cancelReason: subscription.cancellation_details?.reason,
//   })
  
//   await analytics.trackFunnelStep('churn', 'subscription_canceled', {
//     subscriptionId: subscription.id,
//     customerId,
//   })
// }

// const handlePaymentSucceeded = async (invoice: Stripe.Invoice) => {
//   const customerId = invoice.customer as string
//   const amount = invoice.amount_paid || 0
  
//   await analytics.trackRevenue(amount / 100, invoice.currency, {
//     invoiceId: invoice.id,
//     customerId,
//     subscriptionId: invoice.subscription,
//     billingReason: invoice.billing_reason,
//   })
  
//   await analytics.track('payment_succeeded', {
//     invoiceId: invoice.id,
//     customerId,
//     amount: amount / 100,
//     currency: invoice.currency,
//   })
// }

// const handlePaymentFailed = async (invoice: Stripe.Invoice) => {
//   const customerId = invoice.customer as string
  
//   await analytics.track('payment_failed', {
//     invoiceId: invoice.id,
//     customerId,
//     amount: (invoice.amount_due || 0) / 100,
//     currency: invoice.currency,
//     attemptCount: invoice.attempt_count,
//   })
  
//   await analytics.trackFunnelStep('churn', 'payment_failed', {
//     invoiceId: invoice.id,
//     customerId,
//   })
// }

// // Helper functions for creating Stripe sessions with analytics tracking
// export const createCheckoutSession = async (
//   priceId: string,
//   customerId?: string,
//   metadata: Record<string, string> = {}
// ) => {
//   const session = await stripe.checkout.sessions.create({
//     mode: 'subscription',
//     payment_method_types: ['card'],
//     line_items: [
//       {
//         price: priceId,
//         quantity: 1,
//       },
//     ],
//     customer: customerId,
//     success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
//     cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
//     metadata: {
//       ...metadata,
//       source: 'web_app',
//     },
//   })
  
//   // Track checkout session creation
//   await analytics.track('checkout_session_created', {
//     sessionId: session.id,
//     priceId,
//     customerId,
//     metadata,
//   })
  
//   await analytics.trackFunnelStep('conversion', 'checkout_initiated', {
//     priceId,
//     customerId,
//   })
  
//   return session
// }

// export const createCustomerPortalSession = async (customerId: string) => {
//   const session = await stripe.billingPortal.sessions.create({
//     customer: customerId,
//     return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/account`,
//   })
  
//   await analytics.track('customer_portal_accessed', {
//     customerId,
//     sessionId: session.id,
//   })
  
//   return session
// }