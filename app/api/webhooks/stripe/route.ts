import { NextResponse } from 'next/server'

export async function POST() {
  // Webhook disabled in this environment
  return NextResponse.json({ received: true, disabled: true }, { status: 200 })
}

// If you need to re-enable Stripe webhooks, restore the original implementation above.