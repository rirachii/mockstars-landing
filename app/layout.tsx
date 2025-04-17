import type React from "react"
import { Sora, Outfit } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { PostHogProvider } from "@/components/providers/posthog-provider"

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
})

export const metadata = {
  title: "Mockstars.app - Practice Makes Confidence",
  description:
    "Practice answering real interview questions out loud, get voice-based feedback from AI, and walk in feeling ready.",
  generator: 'v0.dev',
  icons: {
    icon: '/mockstars.png',
    shortcut: '/mockstars.png',
    apple: '/mockstars.png',
  },
  openGraph: {
    title: "Mockstars.app - Ace your next interview",
    description: "Practice answering real interview questions out loud and track your progress with expert feedback.",
    url: 'https://mockstars.app',
    siteName: 'Mockstars.app',
    images: [
      {
        url: '/giphy.gif',
        width: 800,
        height: 600,
        alt: 'Mockstars Preview'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mockstars.app - Practice Makes Confidence",
    description: "Practice answering real interview questions out loud, get voice-based feedback from AI, and walk in feeling ready.",
    images: ['/giphy.gif'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sora.variable} ${outfit.variable}`}>
        <PostHogProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  )
}


import './globals.css'