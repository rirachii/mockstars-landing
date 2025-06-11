'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mic, Star, Check } from "lucide-react"
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
import './fonts.css'
import Footer from '../components/Footer'

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
            <DialogTitle className="text-2xl font-bold font-mattone text-white">Coming Soon!</DialogTitle>
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
              className="bg-purple hover:bg-purple/90 text-white rounded-lg font-mattone"
              onClick={handleWaitlistSignup}
            >
              Join Waitlist
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Enhanced Header with Navigation */}
      <header className="container mx-auto py-6 px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8">
              <Image
                src="/mockstars.png"
                alt="Mockstars Logo"
                width={32}
                height={32}
                className="w-full h-full"
              />
            </div>
            <span className="text-base font-bold font-mattone">Mockstars</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-zinc-400 hover:text-white transition-colors font-outfit">
              About
            </Link>
            <Link href="/features" className="text-zinc-400 hover:text-white transition-colors font-outfit">
              Features
            </Link>
            <Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors font-outfit">
              Pricing
            </Link>
            <Link href="mailto:michelle@veloraai.com" className="text-zinc-400 hover:text-white transition-colors font-outfit">
              Contact
            </Link>
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            
            <Button className="bg-purple hover:bg-purple/90 text-white rounded-full px-6 font-mattone">
              Start Free
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu - Shown on small screens */}
        <div className="md:hidden mt-4 flex flex-wrap gap-4 justify-center">
          <Link href="/about" className="text-sm text-zinc-400 hover:text-white transition-colors font-outfit">
            About
          </Link>
          <Link href="/features" className="text-sm text-zinc-400 hover:text-white transition-colors font-outfit">
            Features
          </Link>
          <Link href="/pricing" className="text-sm text-zinc-400 hover:text-white transition-colors font-outfit">
            Pricing
          </Link>
          <Link href="mailto:michelle@veloraai.com" className="text-sm text-zinc-400 hover:text-white transition-colors font-outfit">
            Contact
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-6xl mx-auto">
              <div className="max-w-2xl">
                <div className="text-2xs uppercase tracking-widest text-teal mb-2 font-mattone">INTERVIEW PRACTICE</div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 font-mattone">
                  Practice
                  <br />
                  Makes
                  <br />
                  <span className="gradient-text">Confidence</span>
                </h1>

                <div className="mb-8">
                  <p className="text-lg mb-4 font-outfit">First interview coming up? Don't sweat it.</p>
                  <p className="text-zinc-400 font-outfit">
                    Practice answering real questions out loud, get voice-based feedback from AI, and walk in feeling
                    ready.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="bg-black hover:bg-black/90 text-white text-base py-6 px-8 rounded-full w-full font-mattone border border-white/10 flex items-center justify-center"
                    onClick={() => handleStoreClick('apple')}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" className="mr-3" fill="currentColor">
                      <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 22C14.32 22.05 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                    </svg>
                    App Store
                  </Button>
                  <Button 
                    className="bg-black hover:bg-black/90 text-white text-base py-6 px-8 rounded-full w-full font-mattone border border-white/10 flex items-center justify-center"
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
                        <h3 className="text-xl font-semibold font-mattone">Interview Practice</h3>
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
                            <div className="text-2xl font-bold text-cream font-mattone">87%</div>
                          </div>
                          <Button size="sm" className="bg-orange text-black hover:bg-orange/90 font-mattone px-6 py-2">
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
            <div className="max-w-6xl mx-auto">
              <div className="text-2xs uppercase tracking-widest text-teal mb-6 font-mattone">MASTERY METHODOLOGY</div>
              
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mattone">Master Interviewing Through Deliberate Practice</h2>
                <p className="text-lg text-zinc-400 font-outfit max-w-3xl">
                  True interview confidence comes from systematic learning with repeated attempts, timely feedback, and consistent practice in your weak areas. Our 3-stage methodology ensures deep mastery, not just surface preparation.
                </p>
              </div>

              {/* Learning Stages */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-black border border-zinc-800 p-6 rounded-2xl">
                  <div className="text-2xs uppercase tracking-widest text-pink mb-3 font-mattone">STAGE 01</div>
                  <h3 className="text-xl font-bold mb-4 font-mattone">Foundation Building</h3>
                  <p className="text-sm text-zinc-400 mb-4 font-outfit">
                    <strong>Recollection & Memorization:</strong> Watch step-by-step tutorials and take quizzes to quickly recall what you've learned. Build your foundational knowledge before moving to application.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-pink font-outfit">
                    <div className="w-2 h-2 bg-pink rounded-full"></div>
                    Tutorials + Quizzes
                  </div>
                </div>

                <div className="bg-purple text-white border border-purple p-6 rounded-2xl">
                  <div className="text-2xs uppercase tracking-widest text-cream mb-3 font-mattone">STAGE 02</div>
                  <h3 className="text-xl font-bold mb-4 font-mattone">Personal Application</h3>
                  <p className="text-sm text-white/80 mb-4 font-outfit">
                    <strong>Connect & Contextualize:</strong> Apply interview concepts using your own stories from workplace or college projects. Transform theory into personal, compelling narratives.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-cream font-outfit">
                    <div className="w-2 h-2 bg-cream rounded-full"></div>
                    Your Stories + Framework
                  </div>
                </div>

                <div className="bg-black border border-zinc-800 p-6 rounded-2xl">
                  <div className="text-2xs uppercase tracking-widest text-orange mb-3 font-mattone">STAGE 03</div>
                  <h3 className="text-xl font-bold mb-4 font-mattone">Real-World Practice</h3>
                  <p className="text-sm text-zinc-400 mb-4 font-outfit">
                    <strong>Record & Simulate:</strong> Practice out loud with voice recording and mock interview sessions. Overcome nervousness through realistic simulation and immediate feedback.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-orange font-outfit">
                    <div className="w-2 h-2 bg-orange rounded-full"></div>
                    Recording + Mock Interviews
                  </div>
                </div>
              </div>

              {/* Key Principles */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-8 font-mattone">Built on Proven Learning Principles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-black border border-zinc-800 p-4 rounded-xl">
                    <div className="text-2xs uppercase tracking-widest text-teal mb-2 font-mattone">01</div>
                    <h4 className="text-sm font-bold mb-2 font-mattone">Repeated Attempts</h4>
                    <p className="text-xs text-zinc-400 font-outfit">Continuous practice with feedback to correct mistakes and guide improvements</p>
                  </div>
                  
                  <div className="bg-black border border-zinc-800 p-4 rounded-xl">
                    <div className="text-2xs uppercase tracking-widest text-pink mb-2 font-mattone">02</div>
                    <h4 className="text-sm font-bold mb-2 font-mattone">Consistent Environment</h4>
                    <p className="text-xs text-zinc-400 font-outfit">Predictable learning space that builds confidence through familiarity</p>
                  </div>
                  
                  <div className="bg-black border border-zinc-800 p-4 rounded-xl">
                    <div className="text-2xs uppercase tracking-widest text-orange mb-2 font-mattone">03</div>
                    <h4 className="text-sm font-bold mb-2 font-mattone">Timely Feedback</h4>
                    <p className="text-xs text-zinc-400 font-outfit">Immediate insights to quickly adjust and accelerate learning</p>
                  </div>
                  
                  <div className="bg-black border border-zinc-800 p-4 rounded-xl">
                    <div className="text-2xs uppercase tracking-widest text-teal mb-2 font-mattone">04</div>
                    <h4 className="text-sm font-bold mb-2 font-mattone">Deliberate Practice</h4>
                    <p className="text-xs text-zinc-400 font-outfit">Focused practice on your specific weak areas for targeted improvement</p>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Plan */}
              <div className="bg-black border border-zinc-800 p-8 rounded-2xl">
                <div className="text-2xs uppercase tracking-widest text-teal mb-4 font-mattone">YOUR JOURNEY</div>
                <h3 className="text-2xl font-bold mb-6 font-mattone">Step-by-Step Tutorial System</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-bold mb-4 font-mattone text-pink">Learn</h4>
                    <ul className="space-y-2 text-sm text-zinc-400 font-outfit">
                      <li>• Watch interactive tutorials for each interview type</li>
                      <li>• Complete knowledge-check quizzes</li>
                      <li>• Master frameworks like STAR method</li>
                      <li>• Build your response templates</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-4 font-mattone text-orange">Practice</h4>
                    <ul className="space-y-2 text-sm text-zinc-400 font-outfit">
                      <li>• Apply concepts with your personal stories</li>
                      <li>• Record practice answers with voice feedback</li>
                      <li>• Join mock interview sessions (coming soon)</li>
                      <li>• Track progress and focus on weak spots</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="bg-white/5 p-8 md:p-12 rounded-3xl multi-color-border">
                {/* Free Trial Highlight */}
                <div className="bg-purple/10 border border-purple/20 rounded-2xl p-8 mb-12">
                  <div className="flex items-center gap-3 mb-4">
                    <Star className="h-6 w-6 text-purple" />
                    <h2 className="text-2xl font-bold font-mattone text-purple">3-Day Free Trial</h2>
                  </div>
                  <p className="text-zinc-300 font-outfit mb-6">
                    Try Mockstars Pro Risk-Free with no credit card required. Get full feature access and cancel anytime before your trial ends.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-purple" />
                      <span className="font-outfit">No Credit Card Required</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-purple" />
                      <span className="font-outfit">Full Feature Access</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-purple" />
                      <span className="font-outfit">Cancel Anytime</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-purple" />
                      <span className="font-outfit">Instant Access</span>
                    </div>
                  </div>
                </div>
                
                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  {/* Monthly Plan */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                    <div>
                      <h3 className="text-2xl font-bold font-mattone mb-2">Monthly Pro</h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-purple font-mattone">$13.99</span>
                        <span className="text-zinc-400 font-outfit">/ month</span>
                      </div>
                      <p className="text-sm text-zinc-400 font-outfit mt-2">
                        In App Purchase: $19.99/month
                      </p>
                    </div>
                    
                    <div className="space-y-3 mt-6">
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-purple" />
                        <span className="font-outfit">Full access to all Pro features</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-purple" />
                        <span className="font-outfit">Unlimited practice sessions</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-purple" />
                        <span className="font-outfit">AI-powered feedback</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-purple" />
                        <span className="font-outfit">Cancel anytime</span>
                      </div>
                    </div>
                  </div>

                  {/* Annual Plan */}
                  <div className="bg-white/5 border-2 border-purple rounded-2xl p-8 relative">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-purple text-white px-4 py-1 rounded-full text-sm font-mattone">
                        Best Value
                      </span>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold font-mattone mb-2">Annual Pro</h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-purple font-mattone">$6.71</span>
                        <span className="text-zinc-400 font-outfit">/ month</span>
                      </div>
                      <p className="text-sm text-zinc-400 font-outfit mt-1">
                        Billed annually at $80.49/year
                      </p>
                      <p className="text-sm text-purple font-outfit mt-1">
                        Save 52% • In App Purchase: $114.99/year
                      </p>
                    </div>
                    
                    <div className="space-y-3 mt-6">
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-purple" />
                        <span className="font-outfit">All Pro features included</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-purple" />
                        <span className="font-outfit">12 months unlimited access</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-purple" />
                        <span className="font-outfit">Best value for serious prep</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-purple" />
                        <span className="font-outfit">Priority support</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Why It Pays For Itself */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/5 border border-white/10 rounded-2xl p-8">
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold font-mattone text-purple">Return on Investment</h3>
                    <ul className="space-y-3 text-zinc-300 font-outfit">
                      <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-purple rounded-full"></div>
                        Users report significant salary improvements
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-purple rounded-full"></div>
                        Higher interview-to-offer conversion rates
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-purple rounded-full"></div>
                        Reduce preparation time significantly
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-purple rounded-full"></div>
                        Faster progression to target roles
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold font-mattone text-orange">Cost Comparison</h3>
                    <div className="space-y-3 text-zinc-300 font-outfit">
                      <div className="flex justify-between">
                        <span>Professional Coach</span>
                        <span className="text-zinc-400">$100-200/hour</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Career Coaching</span>
                        <span className="text-zinc-400">$1,000-5,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Prep Bootcamps</span>
                        <span className="text-zinc-400">$500-2,000</span>
                      </div>
                      <div className="flex justify-between border-t border-white/10 pt-3">
                        <span className="font-bold">Mockstars Pro Annual</span>
                        <span className="text-purple font-bold">Less than $10/month</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
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
      <div className={`text-2xs uppercase tracking-widest mb-2 font-mattone ${isHighlighted ? "text-cream" : "text-teal"}`}>
        {number}
      </div>
      <h3 className="text-lg font-bold font-mattone">{title}</h3>
    </div>
  )
}
