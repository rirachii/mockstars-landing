import type React from "react"
import { Outfit } from "next/font/google"
import "@/styles/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { PostHogProvider } from "@/components/common/posthog-provider"
import MaybeNavigation from "@/components/layout/MaybeNavigation"
import Footer from "@/components/layout/Footer"
import JsonLd from "@/components/JsonLd"
import type { Metadata } from 'next'

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
})

export const metadata: Metadata = {
  title: "Mockstars - AI Interview Practice",
  description: "Practice interviews with AI-powered feedback. Get personalized coaching and improve your interview skills.",
  openGraph: {
    title: 'Mockstars - AI Interview Practice',
    description: 'Practice interviews with AI-powered feedback. Get personalized coaching and improve your interview skills.',
    url: 'https://mockstars.app',
    siteName: 'Mockstars',
    images: [
      {
        url: '/mastery.gif',
        width: 1200,
        height: 630,
        type: 'image/gif',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mockstars - AI Interview Practice',
    description: 'Practice interviews with AI-powered feedback. Get personalized coaching and improve your interview skills.',
    images: ['/mockstars.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Mockstars',
  description: 'Practice answering real interview questions out loud, get voice-based feedback from AI, and walk in feeling ready.',
  url: 'https://mockstars.app',
  applicationCategory: 'EducationalApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  operatingSystem: 'Web browser'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd data={jsonLd} />
      </head>
      <body className={`${outfit.variable} min-h-screen flex flex-col`}>
        <PostHogProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <MaybeNavigation />
            <main role="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  )
}