'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mic } from "lucide-react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { useState } from "react"
import posthog from 'posthog-js'

export default function Home() {
  const [showComingSoon, setShowComingSoon] = useState(false)
  const [email, setEmail] = useState('')

  const handleStoreClick = (store: 'apple' | 'google') => {
    posthog.capture('app_store_click', { store })
    setShowComingSoon(true)
  }

  const handleWaitlistSignup = () => {
    if (email) {
      posthog.capture('waitlist_signup', { email })
      // You can also identify the user with their email
      posthog.identify(email)
      setShowComingSoon(false)
      setEmail('')
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-outfit">
      {/* Coming Soon Dialog */}
      <Dialog open={showComingSoon} onOpenChange={setShowComingSoon}>
        <DialogContent className="bg-black border border-white/10">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold font-sora">Coming Soon!</DialogTitle>
            <DialogDescription className="text-zinc-400 font-outfit">
              We're working hard to bring Mockstars to mobile devices. Sign up for our waitlist to be notified when we launch!
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple"
            />
            <Button 
              className="bg-purple hover:bg-purple/90 text-white rounded-lg font-sora"
              onClick={handleWaitlistSignup}
            >
              Join Waitlist
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Minimal Header */}
      <header className="container mx-auto py-6 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/u6185661394_create_logo_for_mockstars.app_--ar_11_--profile_w_2ee08930-ac9c-4bcd-98bb-4b7e40072786_3-CNGsXgNBZQO2Ahpv4wcqLHKYOOFlUu.png"
              alt="Mockstars Logo"
              width={32}
              height={32}
              className="w-full h-full"
            />
          </div>
          <span className="text-lg font-bold font-sora">Mockstars.app</span>
        </div>
        <Button className="bg-purple hover:bg-purple/90 text-white rounded-full px-6 font-sora">Start</Button>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-6xl mx-auto">
              <div className="max-w-2xl">
                <div className="text-xs uppercase tracking-widest text-teal mb-2 font-sora">INTERVIEW PRACTICE</div>
                <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 font-sora">
                  Practice
                  <br />
                  Makes
                  <br />
                  <span className="gradient-text">Confidence</span>
                </h1>

                <div className="mb-8">
                  <p className="text-xl mb-4 font-outfit">First interview coming up? Don't sweat it.</p>
                  <p className="text-zinc-400 font-outfit">
                    Practice answering real questions out loud, get voice-based feedback from AI, and walk in feeling
                    ready.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="bg-black hover:bg-black/90 text-white text-lg py-6 px-8 rounded-full w-full font-sora border border-white/10 flex items-center justify-center"
                    onClick={() => handleStoreClick('apple')}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" className="mr-3" fill="currentColor">
                      <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 22C14.32 22.05 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                    </svg>
                    App Store
                  </Button>
                  <Button 
                    className="bg-black hover:bg-black/90 text-white text-lg py-6 px-8 rounded-full w-full font-sora border border-white/10 flex items-center justify-center"
                    onClick={() => handleStoreClick('google')}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" className="mr-3" fill="currentColor">
                      <path d="M4.75196 22.7463C4.35869 22.5317 4.09662 22.1198 4.09662 21.6633V2.33743C4.09662 1.88028 4.35936 1.46841 4.75263 1.25446L14.4093 12.0004L4.75196 22.7463Z" />
                      <path d="M17.5775 15.3923L5.90198 21.8189L15.5587 11.0731L17.5775 15.3923Z" />
                      <path d="M17.5777 8.60901L15.5589 12.9282L5.90216 2.18239L17.5777 8.60901Z" />
                      <path d="M19.7246 13.8787C19.7246 14.3358 19.4625 14.7477 19.0693 14.9623L16.7778 16.2847L14.5898 11.6952L16.7778 7.10569L19.0693 8.42805C19.4625 8.64267 19.7246 9.05454 19.7246 9.51169V13.8787Z" />
                    </svg>
                    Google Play
                  </Button>
                </div>
              </div>

              <div className="relative lg:pl-12">
                <div className="relative z-10 mx-auto max-w-md lg:mx-0 animate-float flex items-center justify-center h-full">
                  <div className="neon-box p-8 relative overflow-hidden multi-color-border w-full">
                    <div className="absolute top-0 left-0 w-40 h-40 bg-purple/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold font-sora">Interview Practice</h3>
                        <span className="bg-pink/20 text-pink text-xs font-medium px-3 py-1.5 rounded-full font-outfit">
                          Recording
                        </span>
                      </div>
                      <div className="space-y-4">
                        <div className="p-4 bg-white/5 rounded-lg">
                          <p className="text-sm font-medium font-outfit">
                            Tell me about a challenge you faced at work?
                          </p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-lg flex items-center gap-4">
                          <Mic className="h-6 w-6 text-teal animate-pulse-accent" />
                          <div className="flex-1">
                            <div className="h-2.5 bg-white/20 rounded-full"></div>
                            <div className="h-2.5 bg-white/30 rounded-full mt-3 w-4/5"></div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 border-t border-white/10 pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-white/60 font-outfit">Confidence Score</div>
                            <div className="text-2xl font-bold text-cream font-sora">87%</div>
                          </div>
                          <Button size="sm" className="bg-orange text-black hover:bg-orange/90 font-sora px-6 py-2">
                            Get Feedback
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-xs uppercase tracking-widest text-teal mb-6 font-sora">HIGHLIGHTS</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FeatureCard number="01" title="Record your answers" isHighlighted={false} />
                <FeatureCard number="02" title="Get AI tips on tone, content, and delivery" isHighlighted={true} />
                <FeatureCard number="03" title="Build confidence over time" isHighlighted={false} />
                <FeatureCard number="04" title="Track progress and stay consistent" isHighlighted={false} />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/5 p-8 rounded-3xl multi-color-border">
                <div className="text-xs uppercase tracking-widest text-teal mb-4 font-sora">OUR BEST OFFER</div>
                <h2 className="text-4xl font-bold mb-6 font-sora">Ready in</h2>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-black p-4 rounded-2xl text-center">
                    <div className="text-3xl font-bold font-sora text-pink">02</div>
                    <div className="text-xs text-zinc-500 font-outfit">Hours</div>
                  </div>
                  <div className="bg-black p-4 rounded-2xl text-center">
                    <div className="text-3xl font-bold font-sora text-orange">35</div>
                    <div className="text-xs text-zinc-500 font-outfit">Minutes</div>
                  </div>
                  <div className="bg-black p-4 rounded-2xl text-center">
                    <div className="text-3xl font-bold font-sora text-teal">56</div>
                    <div className="text-xs text-zinc-500 font-outfit">Seconds</div>
                  </div>
                </div>

                <Button className="bg-purple hover:bg-purple/90 text-white rounded-full px-8 py-6 w-full font-sora">
                  More details
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-sm text-zinc-500 font-outfit">© {new Date().getFullYear()} Mockstars.app</span>
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-zinc-500 hover:text-teal font-outfit">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-zinc-500 hover:text-pink font-outfit">
                Terms
              </Link>
              <a href="mailto:michelle@veloraai.com" className="text-sm text-zinc-500 hover:text-orange font-outfit">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ number, title, isHighlighted }: { number: string; title: string; isHighlighted: boolean }) {
  return (
    <div
      className={`p-6 rounded-2xl border ${
        isHighlighted ? "bg-purple text-white border-purple" : "bg-black border-zinc-800"
      }`}
    >
      <div className={`text-xs uppercase tracking-widest mb-2 font-sora ${isHighlighted ? "text-cream" : "text-teal"}`}>
        {number}
      </div>
      <h3 className="text-xl font-bold font-sora">{title}</h3>
    </div>
  )
}
