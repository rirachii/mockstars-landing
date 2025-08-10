'use client'

import { Button } from "@/components/ui/button"
import { Star, Check, Camera, FileText, FileSearch, Bot, BookOpen, Sparkles, Brain, ScrollText, Mic } from "lucide-react"
import CTA from '../components/common/CTA'
import { CompanyBanner } from '@/components/layout/CompanyBanner';
import { TemplateShowcase } from '@/components/resume/TemplateShowcase';
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()


  const handleCreateResumeClick = () => {
    router.push('/resume-builder')
  }

  const handleUploadResumeClick = () => {
    router.push('/resume-builder')
  }

  return (
    <div className="flex flex-col min-h-screen text-gray-800 font-outfit relative z-10">
      {/* Hero Section */}
      <section id="download" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16 max-w-6xl mx-auto">
            {/* Left Column */}
            <div className="max-w-2xl mx-auto md:mx-0 text-center md:text-left">
              <div className="text-2xs uppercase tracking-widest text-teal-600 mb-2 font-mattone">ATS Perfected</div>
              <h1 className="text-5xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 lg:mb-8 font-mattone leading-tight">
                <span className="gradient-text">ELITE</span>
                <br />
                RESUME
                <br />
                BUILDER
              </h1>

              <div className="mb-6 lg:mb-8">
                <p className="text-base sm:text-lg mb-4 font-outfit"> No more rejection, no more unemployment. </p>
                <p className="text-gray-600 font-outfit text-sm sm:text-base">
                  Use our battle-tested template, generate cover letters that don't sound like chatbots, and craft interview stories that land you the offer. 
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 px-2 sm:px-0 mb-8 lg:mb-0">
                <Button 
                  className="bg-white hover:bg-gray-100 text-blue text-sm sm:text-base py-4 sm:py-6 px-6 sm:px-8 rounded-full font-mattone border border-blue/20 flex items-center justify-center w-full sm:w-auto max-w-xs mx-auto sm:mx-0"
                  onClick={handleCreateResumeClick}
                >
                  Create Resume
                </Button>
                <Button 
                  className="bg-blue hover:bg-blue/90 text-white text-sm sm:text-base py-4 sm:py-6 px-6 sm:px-8 rounded-full font-mattone border border-blue/20 flex items-center justify-center w-full sm:w-auto max-w-xs mx-auto sm:mx-0"
                  onClick={handleUploadResumeClick}
                >
                  Upload Resume
                </Button> 
              </div>
            </div>

            {/* Get Interview Ready */}
            <div className="relative order-2 lg:order-2 sm:mt-0 lg:mt-8 lg:pl-8 xl:pl-12">
              <div className="relative z-10 mx-auto max-w-md lg:mx-0 animate-float sm:h-[200px] md:h-[350px] lg:h-[400px]">
                <div className="bg-white/95 backdrop-blur-sm p-6 lg:p-8 relative overflow-hidden multi-color-border w-full shadow-xl border border-gray-200 rounded-2xl">
                  <div className="absolute top-0 left-0 w-40 h-40 bg-purple-200 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg lg:text-xl font-semibold font-mattone text-white">Get Interview Ready</h3>
                      <span className="bg-green-100 text-green-600 text-xs font-medium px-2 lg:px-3 py-1 lg:py-1.5 rounded-full font-outfit">
                        Processing
                      </span>
                    </div>
                    <div className="space-y-3 lg:space-y-4">
                      <div className="p-3 lg:p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 lg:h-6 lg:w-6 text-blue flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium font-outfit text-gray-800">
                              Old Resume Uploaded
                            </p>
                            <p className="text-xs text-gray-500 font-outfit mt-1">AI is reading your experience...</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 lg:p-4 rounded-lg">
                        {/* <div className="flex items-center gap-3 lg:gap-4 py-3 lg:py-4">
                          <FileSearch className="h-5 w-5 lg:h-6 lg:w-6 text-blue flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium font-outfit text-gray-800">
                              Parsing your resume
                            </p>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                              <div className="bg-blue h-1.5 rounded-full w-1/5"></div>
                            </div>
                          </div>
                        </div> */}
                        <div className="flex items-center gap-3 lg:gap-4 py-3 lg:py-4">
                          <Bot className="h-5 w-5 lg:h-6 lg:w-6 text-blue flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium font-outfit text-white">
                              Running ATS Optimization
                            </p>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                              <div className="bg-blue h-1.5 rounded-full w-2/5"></div>
                            </div>
                          </div>
                        </div>
                        {/* <div className="flex items-center gap-3 lg:gap-4 py-3 lg:py-4">
                          <BookOpen className="h-5 w-5 lg:h-6 lg:w-6 text-blue flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium font-outfit text-gray-800">
                              Drafting your interview stories
                            </p>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                              <div className="bg-blue h-1.5 rounded-full w-1/5"></div>
                            </div>
                          </div>
                        </div> */}
                        {/* <div className="flex items-center gap-3 lg:gap-4 py-3 lg:py-4">
                          <Sparkles className="h-5 w-5 lg:h-6 lg:w-6 text-blue animate-pulse flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium font-outfit text-blue">
                              Polishing everything up
                            </p>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                              <div className="bg-blue h-1.5 rounded-full w-4/5"></div>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                    <div className="mt-4 lg:mt-6 border-t border-gray-200 pt-4 lg:pt-6">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-white font-outfit">Next: Tailored Cover Letters</div>
                          <div className="text-xs text-white font-outfit">Based on the job description</div>
                        </div>
                        <Button size="sm" className="bg-orange-500 text-white hover:bg-orange-600 font-mattone px-4 lg:px-6 py-2 text-xs lg:text-sm flex-shrink-0">
                          Almost Ready!
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Company Banner - moved outside grid for better mobile layout */}
          <div className="mt-0 md:mt-8 lg:mt-12">
            <CompanyBanner />
          </div>
        </div>
      </section>

      {/* Resume Templates Showcase */}
      <TemplateShowcase />

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold mb-6 font-mattone gradient-text flex items-center gap-2">
                  <Brain className="h-6 w-6 text-blue mt-0.5" />
                  Smart Resume Builder
                </h3>
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
                <h3 className="text-xl font-bold mb-6 font-mattone gradient-text flex items-center gap-2">
                  <Bot className="h-6 w-6 text-orange mt-0.5" />
                  Interview Story Generator
                </h3>
                <ul className="space-y-3 text-gray-700 font-outfit">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-orange mt-0.5" />
                    <span>5-6 personalized STAR method stories</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-orange mt-0.5" />
                    <span>Based on YOUR actual experiences</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-orange mt-0.5" />
                    <span>Covers all major behavioral question types</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-orange mt-0.5" />
                    <span>Never get caught off-guard again</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold mb-6 font-mattone gradient-text flex items-center gap-2">
                  <ScrollText className="h-6 w-6 text-pink mt-0.5" />
                  Cover Letter Magic
                </h3>
                <ul className="space-y-3 text-gray-700 font-outfit">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-pink mt-0.5" />
                    <span>Generate custom cover letters for any job</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-pink mt-0.5" />
                    <span>Automatically tailored to job descriptions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-pink mt-0.5" />
                    <span>Professional tone that sounds like you</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-pink mt-0.5" />
                    <span>Stop staring at blank documents</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold mb-6 font-mattone gradient-text flex items-center gap-2">
                  <Mic className="h-6 w-6 text-teal mt-0.5" />
                  Practice Platform
                </h3>
                <ul className="space-y-3 text-gray-700 font-outfit">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-teal mt-0.5" />
                    <span>Voice recording with real-time feedback</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-teal mt-0.5" />
                    <span>AI analyzes clarity, pace, and confidence</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-teal mt-0.5" />
                    <span>Track your improvement over time</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-teal mt-0.5" />
                    <span>Build confidence through repetition</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue/10 to-pink/10 border border-blue/20 rounded-2xl p-8 mt-12 text-center">
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

      {/* How It Works */}
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
                  <span className="bg-pink-50 text-pink-600 px-3 py-1 rounded-full font-outfit">Text</span>
                </div>
              </div>

              <div className="bg-blue text-white border border-blue p-8 rounded-2xl shadow-lg text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-6">
                  <FileText className="h-8 w-8" />
                </div>
                <div className="text-2xs uppercase tracking-widest text-blue-100 mb-3 font-mattone">STEP 2</div>
                <h3 className="text-xl font-bold mb-4 font-mattone">✨ AI Magic Happens</h3>
                <p className="text-white font-outfit mb-4">
                  Get a professionally formatted, ATS-optimized resume + 5-6 personalized STAR method interview stories based on your actual experience. No generic templates here.
                </p>
                <div className="flex justify-center gap-3 text-xs">
                  <span className="text-white px-3 py-1 rounded-full font-outfit">Resume</span>
                  <span className="text-white px-3 py-1 rounded-full font-outfit">Stories</span>
                  <span className="text-white px-3 py-1 rounded-full font-outfit">Cover Letters</span>
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
                "I went from dreading interviews to actually looking forward to them. Mockstars turned my scattered experiences into compelling stories." 
                <span className="text-blue font-medium">
                  <br />- Sarah, Recent Grad</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="text-2xs uppercase tracking-widest text-teal-600 mb-4 font-mattone">PROVEN RESULTS</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mattone">The most effective strategy for your job search</h2>
              <p className="text-lg mb-4 font-outfit">
                <span className="font-semibold">Loved by over 10,000+ job seekers</span>
              </p>
              <div className="flex items-center justify-center gap-2 mb-8">
                <span className="text-sm text-gray-600 font-outfit">Rated 4.8 on</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-green-500 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-outfit">App Store & Google Play</span>
              </div>
            </div>

            {/* Featured Review */}
            <div className="bg-gradient-to-r from-teal-600 to-blue rounded-2xl p-8 text-white mb-12">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-lg md:text-xl font-outfit leading-relaxed text-gray-800">
                    "Mockstars transformed my job search completely. The ATS-optimized resumes got me past the filters, 
                    the tailored cover letters saved me hours of writing, and practicing my interview stories with the 
                    voice feedback gave me the confidence I needed. I went from zero interviews to three job offers!"
                  </p>
                </div>
                <div className="flex-shrink-0 text-center">
                  <div className="w-16 h-16 bg-blue rounded-full flex items-center justify-center mb-3 mx-auto">
                    <span className="text-2xl font-bold">KC</span>
                  </div>
                  <div className="text-sm text-gray-800">
                    <div className="font-semibold">Kevin C</div>
                    <div className="text-gray-800">Business Student</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* Review 1 */}
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg">
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 font-outfit mb-4 text-sm leading-relaxed">
                  "The resume builder tool is incredible! I can customize my resume and cover letter for any job posting in minutes. The ATS optimization means I actually get interviews now instead of my applications disappearing into the void."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue to-teal-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">AF</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800 font-mattone">Alex Foster</div>
                    <div className="text-xs text-gray-600 font-outfit">Software Engineer Intern</div>
                  </div>
                </div>
              </div>

              {/* Review 2 */}
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg">
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 font-outfit mb-4 text-sm leading-relaxed">
                  "The interview stories feature is a game-changer! I got 5 personalized STAR method stories based on my experience, and the voice practice with feedback helped me nail every behavioral question in my interviews."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink to-orange rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">BA</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800 font-mattone">Brittany Archard</div>
                    <div className="text-xs text-gray-600 font-outfit">Product Manager</div>
                  </div>
                </div>
              </div>

              {/* Review 3 */}
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg">
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 font-outfit mb-4 text-sm leading-relaxed">
                  "Having my entire resume and cover letter library organized by job is so helpful. I can track which applications I've submitted and where I am in each process. Plus the speak mode practice made me way more confident!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple to-pink rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">MT</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800 font-mattone">Meg Thomas</div>
                    <div className="text-xs text-gray-600 font-outfit">Business Analyst</div>
                  </div>
                </div>
              </div>

              {/* Review 4 */}
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg">
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 font-outfit mb-4 text-sm leading-relaxed">
                  "I got my first job at Starbucks because of Mockstars. I was so nervous about the interview but I was able to simulate the interview and practice with the voice practice feature. I was able to get the job, thanks Mockstars!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">TS</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800 font-mattone">Therese Sollars</div>
                    <div className="text-xs text-gray-600 font-outfit">High School Student</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <button 
                onClick={handleCreateResumeClick}
                className="bg-blue text-white px-8 py-3 rounded-2xl font-mattone hover:bg-blue/90 transition-colors">
                Craft Your Resume Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="text-2xs uppercase tracking-widest text-blue mb-4 font-mattone">QUESTIONS & ANSWERS</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mattone">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 font-outfit">
                Everything you need to know about Mockstars and how it can transform your job search.
              </p>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {/* FAQ 1 */}
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-semibold text-gray-800 font-mattone pr-4">
                      How does Mockstars help me get more interviews?
                    </h3>
                    <div className="text-blue transition-transform group-open:rotate-180">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 font-outfit leading-relaxed">
                      Mockstars creates ATS-optimized resumes and cover letters that are tailored to each job description using our AI writing tool. 
                      You get 5-6 personalized STAR method interview stories based on your experience, plus voice practice with grading to help you 
                      rehearse and perfect your delivery. You can also track which jobs you've applied to and their status (submitted, interviewing, 
                      rejected, or hired) to stay organized throughout your job search.
                    </p>
                  </div>
                </details>
              </div>

              {/* FAQ 2 */}
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-semibold text-gray-800 font-mattone pr-4">
                      Can I upload my existing resume or do I start from scratch?
                    </h3>
                    <div className="text-blue transition-transform group-open:rotate-180">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 font-outfit leading-relaxed">
                      You can absolutely upload your existing resume! Mockstars accepts photos of resumes, PDF files, or you can 
                      paste your LinkedIn URL. Our AI reads and understands your experience, then transforms it into a professionally 
                      formatted, ATS-optimized resume. You can also start fresh if you prefer. Either way, you'll have a polished 
                      resume ready in minutes.
                    </p>
                  </div>
                </details>
              </div>

              {/* FAQ 3 */}
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-semibold text-gray-800 font-mattone pr-4">
                      What makes Mockstars different from other resume builders?
                    </h3>
                    <div className="text-blue transition-transform group-open:rotate-180">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 font-outfit leading-relaxed">
                      Mockstars is a complete interview preparation platform. We create ATS-optimized resumes and cover letters using our AI writing tool 
                      that customizes content to any job description. You get a personal library to organize multiple resumes and cover letters, 
                      5-6 personalized interview stories for each resume, and voice practice with grading to perfect your delivery. Plus simple 
                      job application tracking to monitor your progress through each opportunity.
                    </p>
                  </div>
                </details>
              </div>

              {/* FAQ 4 */}
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-semibold text-gray-800 font-mattone pr-4">
                      How does the AI interview preparation work?
                    </h3>
                    <div className="text-blue transition-transform group-open:rotate-180">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 font-outfit leading-relaxed">
                      Our AI analyzes your resume and creates 5-6 personalized STAR method stories based on your actual experiences. 
                      You can then practice these stories using our speak mode, where you record yourself answering common behavioral questions. 
                      Our AI provides detailed grading on your delivery, including clarity, pace, confidence, and structure. You can track your 
                      improvement over time and perfect your stories before the real interview.
                    </p>
                  </div>
                </details>
              </div>

              {/* FAQ 5 */}
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-semibold text-gray-800 font-mattone pr-4">
                      Is there a free trial? What's included?
                    </h3>
                    <div className="text-blue transition-transform group-open:rotate-180">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 font-outfit leading-relaxed">
                      Yes! We offer a 3-day free trial with full access to all features - no credit card required. You can create 
                      your resume, generate interview stories, practice with voice feedback, create cover letters, and explore all 
                      our templates. It's enough time to transform your job search materials and see real results. After the trial, 
                      plans start at just $6.99/week.
                    </p>
                  </div>
                </details>
              </div>

              {/* FAQ 6 */}
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-semibold text-gray-800 font-mattone pr-4">
                      Will my resume pass ATS (Applicant Tracking Systems)?
                    </h3>
                    <div className="text-blue transition-transform group-open:rotate-180">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 font-outfit leading-relaxed">
                      Absolutely! All our templates are specifically designed to be ATS-friendly. We use proper formatting, standard 
                      section headers, and clean layouts that applicant tracking systems can easily read and parse. Our AI also helps 
                      optimize your content with relevant keywords from job descriptions, ensuring your resume gets past the initial 
                      automated screening and into human hands.
                    </p>
                  </div>
                </details>
              </div>

              {/* FAQ 7 */}
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-semibold text-gray-800 font-mattone pr-4">
                      Can I cancel anytime? Are there any long-term commitments?
                    </h3>
                    <div className="text-blue transition-transform group-open:rotate-180">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 font-outfit leading-relaxed">
                      Yes, you can cancel anytime with no questions asked and no cancellation fees. There are no long-term commitments 
                      or contracts. Whether you choose our weekly, monthly, or annual plan, you have complete flexibility. Many users 
                      find they land their dream job quickly and only need Mockstars for a short period during their active job search.
                    </p>
                  </div>
                </details>
              </div>

              {/* FAQ 8 */}
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-semibold text-gray-800 font-mattone pr-4">
                      What if I'm a recent graduate with limited experience?
                    </h3>
                    <div className="text-blue transition-transform group-open:rotate-180">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 font-outfit leading-relaxed">
                      Mockstars is perfect for recent graduates! Our AI helps you identify transferable skills from internships, 
                      part-time jobs, volunteer work, and academic projects. We'll help you craft compelling stories about leadership 
                      in group projects, problem-solving in coursework, or initiative in extracurricular activities. Many of our most 
                      successful users are new graduates who landed their first professional roles using our platform.
                    </p>
                  </div>
                </details>
              </div>
            </div>

            {/* Still have questions CTA */}
            <div className="mt-12 text-center bg-white/80 border border-gray-200 rounded-2xl p-8">
              <h3 className="text-xl font-bold font-mattone mb-4">Still have questions?</h3>
              <p className="text-gray-600 font-outfit mb-6">
                Our support team is here to help you succeed. Get personalized assistance with your job search strategy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <button className="bg-blue text-white px-6 py-3 rounded-lg font-mattone hover:bg-blue/90 transition-colors w-full sm:w-auto">
                  Contact Support
                </button>
                <button 
                  onClick={() => router.push('/blog')}
                  className="bg-white border-2 border-blue text-blue px-6 py-3 rounded-lg font-mattone hover:bg-blue/5 transition-colors w-full sm:w-auto"
                >
                  Check out our Blog
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Pricing */}
      

      {/* Final CTA */}
      <CTA 
        title="Get ATS-Ready Resume"
        subtitle="Join thousands who've gone from resume anxiety to interview confidence. Your dream job is waiting."
        primaryButtonText="Start Building Your Resume"
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