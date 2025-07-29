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
    if (store === 'apple') {
      window.open('https://apps.apple.com/app/mockstars/id6746141593', '_blank')
    } else {
      setShowComingSoon(true)
    }
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
    <div className="flex flex-col min-h-screen text-gray-800 font-outfit relative z-10">
      {/* Coming Soon Dialog */}
      <Dialog open={showComingSoon} onOpenChange={setShowComingSoon}>
        <DialogContent className="bg-white border border-gray-200 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold font-mattone text-gray-800">Coming Soon!</DialogTitle>
            <DialogDescription className="text-gray-600 font-outfit">
              We're working hard to bring Mockstars to mobile devices. Sign up for our waitlist to be notified when we launch!
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Button 
              className="bg-blue hover:bg-blue/90 text-white rounded-lg font-mattone"
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
            <Link href="/about" className="text-gray-600 hover:text-gray-800 transition-colors font-outfit">
              About
            </Link>
            <Link href="/features" className="text-gray-600 hover:text-gray-800 transition-colors font-outfit">
              Features
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-800 transition-colors font-outfit">
              Pricing
            </Link>
            <Link href="mailto:michelle@veloraai.com" className="text-gray-600 hover:text-gray-800 transition-colors font-outfit">
              Contact
            </Link>
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            
            <Button className="bg-blue hover:bg-blue/90 text-white rounded-full px-6 font-mattone">
              Start Free
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu - Shown on small screens */}
        <div className="md:hidden mt-4 flex flex-wrap gap-4 justify-center">
          <Link href="/about" className="text-sm text-gray-600 hover:text-gray-800 transition-colors font-outfit">
            About
          </Link>
          <Link href="/features" className="text-sm text-gray-600 hover:text-gray-800 transition-colors font-outfit">
            Features
          </Link>
          <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-800 transition-colors font-outfit">
            Pricing
          </Link>
          <Link href="mailto:michelle@veloraai.com" className="text-sm text-gray-600 hover:text-gray-800 transition-colors font-outfit">
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
                <div className="text-2xs uppercase tracking-widest text-teal-600 mb-2 font-mattone">INTERVIEW PRACTICE</div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 font-mattone">
                  Practice
                  <br />
                  Makes
                  <br />
                  <span className="gradient-text">Confidence</span>
                </h1>

                <div className="mb-8">
                  <p className="text-lg mb-4 font-outfit">First interview coming up? Don't sweat it.</p>
                  <p className="text-gray-600 font-outfit">
                    Practice answering real questions out loud, get voice-based feedback from AI, and walk in feeling
                    ready.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="bg-blue hover:bg-blue/90 text-white text-base py-6 px-8 rounded-full w-full font-mattone border border-blue/20 flex items-center justify-center"
                    onClick={() => handleStoreClick('apple')}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" className="mr-3" fill="currentColor">
                      <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 22C14.32 22.05 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                    </svg>
                    App Store
                  </Button>
                  <Button 
                    className="bg-blue hover:bg-blue/90 text-white text-base py-6 px-8 rounded-full w-full font-mattone border border-blue/20 flex items-center justify-center"
                    onClick={() => handleStoreClick('google')}
                  >
                    <Image
                      src="/play.png"
                      alt="Google Play"
                      width={24}
                      height={24}
                      className="mr-3"
                    />
                    Google Play
                  </Button>
                </div>
              </div>

              <div className="relative lg:pl-12">
                <div className="relative z-10 mx-auto max-w-md lg:mx-0 animate-float flex items-center justify-center h-full">
                  <div className="bg-white/90 backdrop-blur-sm p-8 relative overflow-hidden multi-color-border w-full shadow-xl border border-gray-200">
                    <div className="absolute top-0 left-0 w-40 h-40 bg-purple-200 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold font-mattone text-gray-800">Interview Practice</h3>
                        <span className="bg-pink-100 text-pink-600 text-xs font-medium px-3 py-1.5 rounded-full font-outfit">
                          Recording
                        </span>
                      </div>
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm font-medium font-outfit text-gray-800">
                            Tell me about a challenge you faced at work?
                          </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg flex items-center gap-4">
                          <Mic className="h-6 w-6 text-teal-600 animate-pulse" />
                          <div className="flex-1">
                            <div className="h-2.5 bg-gray-300 rounded-full"></div>
                            <div className="h-2.5 bg-gray-400 rounded-full mt-3 w-4/5"></div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 border-t border-gray-200 pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-white font-outfit">Confidence Score</div>
                            <div className="text-2xl font-bold text-white font-mattone">87%</div>
                          </div>
                          <Button size="sm" className="bg-orange-500 text-white hover:bg-orange-600 font-mattone px-6 py-2">
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
        <section className="py-16 bg-white/30 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-2xs uppercase tracking-widest text-blue mb-6 font-mattone">MASTERY METHODOLOGY</div>
              
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mattone">Master Interviewing Through Deliberate Practice</h2>
                <p className="text-lg text-gray-600 font-outfit max-w-3xl">
                  True interview confidence comes from systematic learning with repeated attempts, timely feedback, and consistent practice in your weak areas. Our 3-stage methodology ensures deep mastery, not just surface preparation.
                </p>
              </div>

              {/* Learning Stages */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-6 rounded-2xl shadow-lg">
                  <div className="text-2xs uppercase tracking-widest text-pink-600 mb-3 font-mattone">STAGE 01</div>
                  <h3 className="text-xl font-bold mb-4 font-mattone">Foundation Building</h3>
                  <p className="text-sm text-gray-600 mb-4 font-outfit">
                    <strong>Recollection & Memorization:</strong> Watch step-by-step tutorials and take quizzes to quickly recall what you've learned. Build your foundational knowledge before moving to application.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-pink-600 font-outfit">
                    <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
                    Tutorials + Quizzes
                  </div>
                </div>

                <div className="bg-blue text-white border border-blue p-6 rounded-2xl shadow-lg">
                  <div className="text-2xs uppercase tracking-widest text-blue-100 mb-3 font-mattone">STAGE 02</div>
                  <h3 className="text-xl font-bold mb-4 font-mattone">Personal Application</h3>
                  <p className="text-sm text-blue-100 mb-4 font-outfit">
                    <strong>Connect & Contextualize:</strong> Apply interview concepts using your own stories from workplace or college projects. Transform theory into personal, compelling narratives.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-blue-100 font-outfit">
                    <div className="w-2 h-2 bg-blue-100 rounded-full"></div>
                    Your Stories + Framework
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-6 rounded-2xl shadow-lg">
                  <div className="text-2xs uppercase tracking-widest text-orange-600 mb-3 font-mattone">STAGE 03</div>
                  <h3 className="text-xl font-bold mb-4 font-mattone">Real-World Practice</h3>
                  <p className="text-sm text-gray-600 mb-4 font-outfit">
                    <strong>Record & Simulate:</strong> Practice out loud with voice recording and mock interview sessions. Overcome nervousness through realistic simulation and immediate feedback.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-orange-600 font-outfit">
                    <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                    Recording + Mock Interviews
                  </div>
                </div>
              </div>

              {/* Key Principles */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-8 font-mattone">Built on Proven Learning Principles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-4 rounded-xl shadow-lg">
                    <div className="text-2xs uppercase tracking-widest text-teal-600 mb-2 font-mattone">01</div>
                    <h4 className="text-sm font-bold mb-2 font-mattone">Repeated Attempts</h4>
                    <p className="text-xs text-gray-600 font-outfit">Continuous practice with feedback to correct mistakes and guide improvements</p>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-4 rounded-xl shadow-lg">
                    <div className="text-2xs uppercase tracking-widest text-pink-600 mb-2 font-mattone">02</div>
                    <h4 className="text-sm font-bold mb-2 font-mattone">Consistent Environment</h4>
                    <p className="text-xs text-gray-600 font-outfit">Predictable learning space that builds confidence through familiarity</p>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-4 rounded-xl shadow-lg">
                    <div className="text-2xs uppercase tracking-widest text-orange-600 mb-2 font-mattone">03</div>
                    <h4 className="text-sm font-bold mb-2 font-mattone">Timely Feedback</h4>
                    <p className="text-xs text-gray-600 font-outfit">Immediate insights to quickly adjust and accelerate learning</p>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-4 rounded-xl shadow-lg">
                    <div className="text-2xs uppercase tracking-widest text-teal-600 mb-2 font-mattone">04</div>
                    <h4 className="text-sm font-bold mb-2 font-mattone">Deliberate Practice</h4>
                    <p className="text-xs text-gray-600 font-outfit">Focused practice on your specific weak areas for targeted improvement</p>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Plan */}
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-8 rounded-2xl shadow-lg">
                <div className="text-2xs uppercase tracking-widest text-teal-600 mb-4 font-mattone">YOUR JOURNEY</div>
                <h3 className="text-2xl font-bold mb-6 font-mattone">Step-by-Step Tutorial System</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-bold mb-4 font-mattone text-pink-600">Learn</h4>
                    <ul className="space-y-2 text-sm text-gray-600 font-outfit">
                      <li>• Watch interactive tutorials for each interview type</li>
                      <li>• Complete knowledge-check quizzes</li>
                      <li>• Master frameworks like STAR method</li>
                      <li>• Build your response templates</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-4 font-mattone text-orange-600">Practice</h4>
                    <ul className="space-y-2 text-sm text-gray-600 font-outfit">
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
              <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl multi-color-border shadow-xl">
                {/* Free Trial Highlight */}
                                  <div className="bg-blue/10 border border-blue/20 rounded-2xl p-8 mb-12">
                    <div className="flex items-center gap-3 mb-4">
                      <Star className="h-6 w-6 text-white" />
                      <h2 className="text-2xl font-bold font-mattone text-white">3-Day Free Trial</h2>
                    </div>
                    <p className="text-white font-outfit mb-6">
                      All plans come with a 3-day free trial. Try Mockstars Pro Risk-Free with no credit card required. Get full feature access and cancel anytime before your trial ends.
                    </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-white" />
                      <span className="font-outfit text-white">No Credit Card Required</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-white" />
                      <span className="font-outfit text-white">Full Feature Access</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-white" />
                      <span className="font-outfit text-white">Cancel Anytime</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-white" />
                      <span className="font-outfit text-white">Instant Access</span>
                    </div>
                  </div>
                </div>
                
                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  {/* Weekly Plan */}
                  <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 shadow-lg">
                    <div>
                      <h3 className="text-2xl font-bold font-mattone mb-2">Weekly Pro</h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-blue font-mattone">$6.99</span>
                        <span className="text-gray-600 font-outfit">/ week</span>
                      </div>
                      <p className="text-sm text-gray-600 font-outfit mt-2">
                        Perfect for short-term prep
                      </p>
                    </div>
                    
                    <div className="space-y-3 mt-6">
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-blue" />
                        <span className="font-outfit text-gray-700">Full access to all Pro features</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-blue" />
                        <span className="font-outfit text-gray-700">Unlimited practice sessions</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-blue" />
                        <span className="font-outfit text-gray-700">AI-powered feedback</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-blue" />
                        <span className="font-outfit text-gray-700">Cancel anytime</span>
                      </div>
                    </div>
                  </div>

                  {/* Monthly Plan */}
                  <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 shadow-lg">
                    <div>
                      <h3 className="text-2xl font-bold font-mattone mb-2">Monthly Pro</h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-blue font-mattone">$13.99</span>
                        <span className="text-gray-600 font-outfit">/ month</span>
                      </div>
                      <p className="text-sm text-gray-600 font-outfit mt-2">
                        App Store Purchase: $19.99/month
                      </p>
                    </div>
                    
                    <div className="space-y-3 mt-6">
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-blue" />
                        <span className="font-outfit text-gray-700">Full access to all Pro features</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-blue" />
                        <span className="font-outfit text-gray-700">Unlimited practice sessions</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-blue" />
                        <span className="font-outfit text-gray-700">AI-powered feedback</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-blue" />
                        <span className="font-outfit text-gray-700">Cancel anytime</span>
                      </div>
                    </div>
                  </div>

                  {/* Annual Plan */}
                  <div className="bg-white/60 backdrop-blur-sm border-2 border-blue rounded-2xl p-8 relative shadow-lg">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue text-white px-4 py-1 rounded-full text-sm font-mattone">
                        Best Value
                      </span>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold font-mattone mb-2">Annual Pro</h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-blue font-mattone">$6.71</span>
                        <span className="text-gray-600 font-outfit">/ month</span>
                      </div>
                      <p className="text-sm text-gray-600 font-outfit mt-1">
                        App Store Purchase: $114.99/year
                        
                      </p>
                      <p className="text-sm text-blue font-outfit mt-1">
                        Best Value • Billed annually at $80.49/year 
                      </p>
                    </div>
                    
                    <div className="space-y-3 mt-6">
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-blue" />
                        <span className="font-outfit text-gray-700">All Pro features included</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-blue" />
                        <span className="font-outfit text-gray-700">12 months unlimited access</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-blue" />
                        <span className="font-outfit text-gray-700">Best value for serious prep</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-blue" />
                        <span className="font-outfit text-gray-700">Priority support</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Why It Pays For Itself */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 shadow-lg">
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold font-mattone text-blue">Return on Investment</h3>
                    <ul className="space-y-3 text-gray-700 font-outfit">
                      <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-blue rounded-full"></div>
                        Users report significant salary improvements
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-blue rounded-full"></div>
                        Higher interview-to-offer conversion rates
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-blue rounded-full"></div>
                        Reduce preparation time significantly
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-blue rounded-full"></div>
                        Faster progression to target roles
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold font-mattone text-orange-600">Cost Comparison</h3>
                    <div className="space-y-3 text-gray-700 font-outfit">
                      <div className="flex justify-between">
                        <span>Professional Coach</span>
                        <span className="text-gray-600">$100-200/hour</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Career Coaching</span>
                        <span className="text-gray-600">$1,000-5,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Prep Bootcamps</span>
                        <span className="text-gray-600">$500-2,000</span>
                      </div>
                      <div className="flex justify-between border-t border-gray-300 pt-3">
                        <span className="font-bold">Mockstars Pro Annual</span>
                        <span className="text-blue font-bold">Less than $10/month</span>
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
        isHighlighted ? "bg-blue text-white border-blue" : "bg-white/80 backdrop-blur-sm border-gray-200"
      }`}
    >
      <div className={`text-2xs uppercase tracking-widest mb-2 font-mattone ${isHighlighted ? "text-blue-100" : "text-blue"}`}>
        {number}
      </div>
      <h3 className={`text-lg font-bold font-mattone ${isHighlighted ? "text-white" : "text-gray-800"}`}>{title}</h3>
    </div>
  )
}
