'use client'

import { Button } from "@/components/ui/button"
import { Star, Check, Camera, FileText } from "lucide-react"
import { useState } from "react"
import posthog from 'posthog-js'
import CTA from '../components/layout/CTA'
import { CompanyBanner } from '@/components/layout/CompanyBanner';
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [showComingSoon, setShowComingSoon] = useState(false)
  const [email, setEmail] = useState('')


  const handleCreateResumeClick = () => {
    router.push('/resume-builder')
  }

  const handleUploadResumeClick = () => {
    router.push('/resume-builder')
  }

  return (
    <div className="flex flex-col min-h-screen text-gray-800 font-outfit relative z-10">
      {/* Coming Soon Dialog */}
      {/* <Dialog open={showComingSoon} onOpenChange={setShowComingSoon}>
        <DialogContent className="bg-white border border-gray-200 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold font-mattone text-gray-800">Coming Soon to Android!</DialogTitle>
            <DialogDescription className="text-gray-600 font-outfit">
              We're putting the finishing touches on the Android version. Join our waitlist and you'll be first to know when it's ready!
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
              Count Me In!
            </Button>
          </div>
        </DialogContent>
      </Dialog> */}

      {/* Hero Section */}
      <section id="download" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-6xl mx-auto">
            <div className="max-w-2xl">
              <div className="text-2xs uppercase tracking-widest text-teal-600 mb-2 font-mattone">ATS Perfected</div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 font-mattone">
                {/* Your ATS */}
                {/* <br /> */}
                <span className="gradient-text">TECH</span>
                <br />
                RESUME BUILDER
              </h1>

              <div className="mb-8">
                <p className="text-lg mb-4 font-outfit">Build resumes that don't get auto-rejected by robots </p>
                <p className="text-gray-600 font-outfit">
                  Deploy with confidence using our battle-tested template engine, generate cover letters that don't sound like chatbots, and craft interview stories that land you the offer.
                </p>
              </div>

              <div className="flex justify-start gap-4">
                <Button 
                  className="bg-white hover:bg-gray-100 text-blue text-base py-6 px-8 rounded-full font-mattone border border-blue/20 flex items-center justify-center max-w-sm"
                  onClick={handleCreateResumeClick}
                >
                  {/* <svg width="24" height="24" viewBox="0 0 24 24" className="mr-3" fill="currentColor">
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 22C14.32 22.05 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                  </svg> */}
                  Create Resume
                </Button>
                <Button 
                  className="bg-blue hover:bg-blue/90 text-white text-base py-6 px-8 rounded-full font-mattone border border-blue/20 flex items-center justify-center max-w-sm"
                  onClick={handleUploadResumeClick}
                >
                  {/* <svg width="24" height="24" viewBox="0 0 24 24" className="mr-3" fill="currentColor">
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 22C14.32 22.05 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                  </svg> */}
                  Upload Resume
                </Button> 
              </div>
            <CompanyBanner />
            </div>

            <div className="relative lg:pl-12">
              <div className="relative z-10 mx-auto max-w-md lg:mx-0 animate-float flex items-center justify-center h-full">
                <div className="bg-white/90 backdrop-blur-sm p-8 relative overflow-hidden multi-color-border w-full shadow-xl border border-gray-200">
                  <div className="absolute top-0 left-0 w-40 h-40 bg-purple-200 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold font-mattone text-white ">Get Started</h3>
                      <span className="bg-green-100 text-green-600 text-xs font-medium px-3 py-1.5 rounded-full font-outfit">
                        Processing
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <div className="flex items-center gap-3">
                          <Camera className="h-6 w-6 text-blue" />
                          <div className="flex-1">
                            <p className="text-sm font-medium font-outfit text-gray-800">
                              Resume photo uploaded
                            </p>
                            <p className="text-xs text-gray-500 font-outfit mt-1">AI is reading your experience...</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-blue/5 rounded-lg">
                        <div className="flex items-center gap-3 ">
                          <FileText className="h-6 w-6 text-white animate-pulse" />
                          <div className="flex-1">
                            <p className="text-sm font-medium font-outfit text-white">
                              ✨ Creating your polished resume
                            </p>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                              <div className="bg-blue h-1.5 rounded-full w-3/4"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 border-t border-gray-200 pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-white font-outfit">Next: Interview Stories</div>
                          <div className="text-xs text-white font-outfit">Based on your experience</div>
                        </div>
                        <Button size="sm" className="bg-orange-500 text-white hover:bg-orange-600 font-mattone px-6 py-2">
                          Almost Ready!
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

      {/* Simple 3-Step Process */}
      <section className="py-16 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-2xs uppercase tracking-widest text-blue mb-4 font-mattone">HOW IT WORKS</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mattone">From Photo to Interview-Ready in 3 Minutes</h2>
              <p className="text-lg text-gray-600 font-outfit max-w-3xl mx-auto">
                No more wrestling with resume templates or panicking about interview questions. We've made career prep ridiculously simple.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-8 rounded-2xl shadow-lg text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 text-pink-600 rounded-full mb-6">
                  <Camera className="h-8 w-8" />
                </div>
                <div className="text-2xs uppercase tracking-widest text-pink-600 mb-3 font-mattone">STEP 1</div>
                <h3 className="text-xl font-bold mb-4 font-mattone">📸 Snap & Upload</h3>
                <p className="text-gray-600 font-outfit mb-4">
                  Take a photo of your resume, upload a PDF, paste your LinkedIn URL, or start fresh. Our AI reads everything - even your messiest handwriting.
                </p>
                <div className="flex justify-center gap-3 text-xs">
                  <span className="bg-pink-50 text-pink-600 px-3 py-1 rounded-full font-outfit">Photos</span>
                  <span className="bg-pink-50 text-pink-600 px-3 py-1 rounded-full font-outfit">PDFs</span>
                  <span className="bg-pink-50 text-pink-600 px-3 py-1 rounded-full font-outfit">LinkedIn</span>
                </div>
              </div>

              <div className="bg-blue text-white border border-blue p-8 rounded-2xl shadow-lg text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-6">
                  <FileText className="h-8 w-8" />
                </div>
                <div className="text-2xs uppercase tracking-widest text-blue-100 mb-3 font-mattone">STEP 2</div>
                <h3 className="text-xl font-bold mb-4 font-mattone">✨ AI Magic Happens</h3>
                <p className="text-blue-100 font-outfit mb-4">
                  Get a professionally formatted, ATS-optimized resume + 5-6 personalized STAR method interview stories based on your actual experience. No generic templates here.
                </p>
                <div className="flex justify-center gap-3 text-xs">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-outfit">Resume</span>
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-outfit">Stories</span>
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-outfit">Cover Letters</span>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-8 rounded-2xl shadow-lg text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-full mb-6">
                  <Star className="h-8 w-8" />
                </div>
                <div className="text-2xs uppercase tracking-widest text-orange-600 mb-3 font-mattone">STEP 3</div>
                <h3 className="text-xl font-bold mb-4 font-mattone">🎯 Master Your Interview</h3>
                <p className="text-gray-600 font-outfit mb-4">
                  Practice your stories with voice recording and get real-time AI feedback. Build confidence through repetition, not just preparation.
                </p>
                <div className="flex justify-center gap-3 text-xs">
                  <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full font-outfit">Voice Practice</span>
                  <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full font-outfit">AI Feedback</span>
                  <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full font-outfit">Confidence</span>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-lg font-outfit text-gray-600 mb-6">
                "I went from dreading interviews to actually looking forward to them. MockStars turned my scattered experiences into compelling stories." 
                <span className="text-blue font-medium">- Sarah, Recent Grad</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Actually Get */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-2xs uppercase tracking-widest text-teal-600 mb-4 font-mattone">WHAT YOU GET</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mattone">Your Complete Career Toolkit</h2>
              <p className="text-lg text-gray-600 font-outfit max-w-3xl mx-auto">
                Everything you need to go from "just another applicant" to "the obvious choice" - all personalized to your unique background.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold mb-6 font-mattone text-blue">🎯 Smart Resume Builder</h3>
                <ul className="space-y-3 text-gray-700 font-outfit">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-blue mt-0.5" />
                    <span>Photo upload to professional resume in minutes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-blue mt-0.5" />
                    <span>ATS-optimized formatting (passes those pesky filters)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-blue mt-0.5" />
                    <span>Multiple professional templates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-blue mt-0.5" />
                    <span>Instant download - ready to apply anywhere</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold mb-6 font-mattone text-orange-600">🗣️ Interview Story Generator</h3>
                <ul className="space-y-3 text-gray-700 font-outfit">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-orange-600 mt-0.5" />
                    <span>5-6 personalized STAR method stories</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-orange-600 mt-0.5" />
                    <span>Based on YOUR actual experiences</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-orange-600 mt-0.5" />
                    <span>Covers all major behavioral question types</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-orange-600 mt-0.5" />
                    <span>Never get caught off-guard again</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold mb-6 font-mattone text-pink-600">📝 Cover Letter Magic</h3>
                <ul className="space-y-3 text-gray-700 font-outfit">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-pink-600 mt-0.5" />
                    <span>Generate custom cover letters for any job</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-pink-600 mt-0.5" />
                    <span>Automatically tailored to job descriptions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-pink-600 mt-0.5" />
                    <span>Professional tone that sounds like you</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-pink-600 mt-0.5" />
                    <span>Stop staring at blank documents</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold mb-6 font-mattone text-teal-600">🎙️ Practice Platform</h3>
                <ul className="space-y-3 text-gray-700 font-outfit">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-teal-600 mt-0.5" />
                    <span>Voice recording with real-time feedback</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-teal-600 mt-0.5" />
                    <span>AI analyzes clarity, pace, and confidence</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-teal-600 mt-0.5" />
                    <span>Track your improvement over time</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-teal-600 mt-0.5" />
                    <span>Build confidence through repetition</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue/10 to-purple-500/10 border border-blue/20 rounded-2xl p-8 mt-12 text-center">
              <h3 className="text-2xl font-bold font-mattone mb-4">Perfect For...</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-700 font-outfit">
                <div>
                  <span className="text-2xl mb-2 block">🎓</span>
                  <p className="font-medium">College students preparing for career fairs</p>
                </div>
                <div>
                  <span className="text-2xl mb-2 block">🌟</span>
                  <p className="font-medium">Recent grads updating outdated resumes</p>
                </div>
                <div>
                  <span className="text-2xl mb-2 block">😰</span>
                  <p className="font-medium">Anyone who dreads writing from scratch</p>
                </div>
                <div>
                  <span className="text-2xl mb-2 block">🚀</span>
                  <p className="font-medium">Job seekers ready to stand out</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Pricing */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl multi-color-border shadow-xl">
              {/* Free Trial Highlight */}
              <div className="bg-blue/10 border border-blue/20 rounded-2xl p-8 mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="h-6 w-6 text-blue" />
                  <h2 className="text-2xl font-bold font-mattone text-blue">3-Day Free Trial</h2>
                </div>
                <p className="text-gray-700 font-outfit mb-6">
                  Try MockStars risk-free! No credit card required. Get full access to everything and see why thousands of job seekers trust us with their career transformation.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-blue" />
                    <span className="font-outfit text-gray-700">No Credit Card Required</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-blue" />
                    <span className="font-outfit text-gray-700">Full Feature Access</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-blue" />
                    <span className="font-outfit text-gray-700">Cancel Anytime</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-blue" />
                    <span className="font-outfit text-gray-700">Instant Access</span>
                  </div>
                </div>
              </div>
              
              {/* Pricing Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {/* Weekly Plan */}
                <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 shadow-lg">
                  <div>
                    <h3 className="text-2xl font-bold font-mattone mb-2">Quick Sprint</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-blue font-mattone">$6.99</span>
                      <span className="text-gray-600 font-outfit">/ week</span>
                    </div>
                    <p className="text-sm text-gray-600 font-outfit mt-2">
                      Perfect for urgent interview prep
                    </p>
                  </div>
                  
                  <div className="space-y-3 mt-6">
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-blue" />
                      <span className="font-outfit text-gray-700">Complete career toolkit</span>
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
                    <h3 className="text-2xl font-bold font-mattone mb-2">Job Hunt Pro</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-blue font-mattone">$13.99</span>
                      <span className="text-gray-600 font-outfit">/ month</span>
                    </div>
                    <p className="text-sm text-gray-600 font-outfit mt-2">
                      Most popular choice for job seekers
                    </p>
                  </div>
                  
                  <div className="space-y-3 mt-6">
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-blue" />
                      <span className="font-outfit text-gray-700">Everything in Quick Sprint</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-blue" />
                      <span className="font-outfit text-gray-700">Priority support</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-blue" />
                      <span className="font-outfit text-gray-700">Advanced analytics</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-blue" />
                      <span className="font-outfit text-gray-700">Multiple resume versions</span>
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
                    <h3 className="text-2xl font-bold font-mattone mb-2">Career Champion</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-blue font-mattone">$6.71</span>
                      <span className="text-gray-600 font-outfit">/ month</span>
                    </div>
                    <p className="text-sm text-blue font-outfit mt-1">
                      Save 52% • Billed annually at $80.49
                    </p>
                  </div>
                  
                  <div className="space-y-3 mt-6">
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-blue" />
                      <span className="font-outfit text-gray-700">Everything included</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-blue" />
                      <span className="font-outfit text-gray-700">12 months of career support</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-blue" />
                      <span className="font-outfit text-gray-700">Lifetime resume updates</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-blue" />
                      <span className="font-outfit text-gray-700">VIP support channel</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why It Pays For Itself */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 shadow-lg">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold font-mattone text-blue">This Pays for Itself</h3>
                  <ul className="space-y-3 text-gray-700 font-outfit">
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-blue rounded-full"></div>
                      Average salary increase: $8,000+ per year
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-blue rounded-full"></div>
                      3x higher interview-to-offer conversion rate
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-blue rounded-full"></div>
                      Save 20+ hours of resume writing time
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-blue rounded-full"></div>
                      Land interviews 2x faster
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-xl font-bold font-mattone text-orange-600">Compare the Alternatives</h3>
                  <div className="space-y-3 text-gray-700 font-outfit">
                    <div className="flex justify-between">
                      <span>Professional Resume Writer</span>
                      <span className="text-gray-600">$300-800</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Career Coach Session</span>
                      <span className="text-gray-600">$150-300/hour</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Interview Prep Course</span>
                      <span className="text-gray-600">$500-2,000</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-300 pt-3">
                      <span className="font-bold">MockStars Complete Package</span>
                      <span className="text-blue font-bold">Less than $7/month</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTA 
        title="Ready to Transform Your Career?"
        subtitle="Join thousands who've gone from resume anxiety to interview confidence. Your dream job is waiting."
        primaryButtonText="Start Free Trial"
        secondaryButtonText="Download App"
        showSecondaryButton={false}
      />

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