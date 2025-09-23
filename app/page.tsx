'use client'

import { Button } from "@/components/ui/button"
import { Star, Check, Camera, FileText, FileSearch, Bot, BookOpen, Sparkles, Brain, ScrollText, Mic, Download, Users, Target, Zap, Clock, DollarSign, X, AlertCircle } from "lucide-react"
import CTA from '../components/common/CTA'
import { CompanyBanner } from '@/components/layout/CompanyBanner';
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const handleDownloadClick = () => {
    // Handle app download
    window.open('https://apps.apple.com/my/app/job-interview-ai-mockstars/id6752570431', '_blank')
  }

  const handleGooglePlayClick = () => {
    // Google Play coming soon
    alert('Google Play version coming soon! Stay tuned for updates.')
  }

  const handleCreateResumeClick = () => {
    router.push('/resume-builder/upload')
  }

  return (
    <div className="flex flex-col min-h-screen text-gray-800 font-outfit relative z-10">
      {/* Hero Section */}
      <section id="download" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16 max-w-6xl mx-auto">
            {/* Left Column */}
            <div className="max-w-2xl mx-auto md:mx-0 text-center md:text-left">
              <div className="text-2xs uppercase tracking-widest text-red-600 mb-2 font-mattone">Stop Wasting Time</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 lg:mb-8 font-mattone leading-tight">
                Stop Wasting 100+ Hours on Interview Prep That Doesn't Work
              </h1>

              <div className="mb-6 lg:mb-8">
                <p className="text-lg sm:text-xl mb-4 font-outfit font-semibold">Land your dream job 3x faster with AI-powered practice that actually prepares you for YOUR specific interview.</p>
                <p className="text-gray-600 font-outfit text-base sm:text-lg">
                  Save $500+ on coaching and months of guesswork.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 px-2 sm:px-0 mb-8 lg:mb-0">
                <Button 
                  className="bg-blue hover:bg-blue/90 text-white text-sm sm:text-base py-4 sm:py-6 px-6 sm:px-8 rounded-full font-mattone border border-blue/20 flex items-center justify-center w-full sm:w-auto max-w-xs mx-auto sm:mx-0"
                  onClick={handleDownloadClick}
                >
                  <Download className="h-5 w-5 mr-2" />
                    App Store
                </Button>
                <Button 
                  className="bg-white hover:bg-gray-100 text-blue text-sm sm:text-base py-4 sm:py-6 px-6 sm:px-8 rounded-full font-mattone border border-blue/20 flex items-center justify-center w-full sm:w-auto max-w-xs mx-auto sm:mx-0"
                  onClick={handleGooglePlayClick}
                >
                  <Download className="h-5 w-5 mr-2" />
                   Google Play - Coming Soon
                </Button> 
              </div>
            </div>

            {/* App Interface Preview */}
            <div className="relative order-2 lg:order-2 sm:mt-0 lg:pl-8 xl:pl-12">
              <div className="relative z-10 mx-auto max-w-md lg:mx-0 animate-float sm:h-[200px] md:h-[350px] lg:h-[400px]">
                <div className="bg-white/95 backdrop-blur-sm p-6 lg:p-8 relative overflow-hidden multi-color-border w-full shadow-xl border border-gray-200 rounded-2xl">
                  <div className="absolute top-0 left-0 w-40 h-40 bg-purple-200 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg lg:text-xl font-semibold font-mattone text-white">Mockstars App</h3>
                      <span className="bg-green-100 text-green-600 text-xs font-medium px-2 lg:px-3 py-1 lg:py-1.5 rounded-full font-outfit">
                        Live
                      </span>
                    </div>
                    <div className="space-y-3 lg:space-y-4">
                      <div className="p-3 lg:p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <div className="flex items-center gap-3">
                          <Brain className="h-5 w-5 lg:h-6 lg:w-6 text-blue flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium font-outfit text-gray-800">
                              AI Story Generator
                            </p>
                            <p className="text-xs text-gray-500 font-outfit mt-1">Creating 15+ STAR stories...</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 lg:p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <div className="flex items-center gap-3">
                          <Mic className="h-5 w-5 lg:h-6 lg:w-6 text-orange flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium font-outfit text-gray-800">
                              AI Feedback Analysis
                            </p>
                            <p className="text-xs text-gray-500 font-outfit mt-1">Scoring your interview answers...</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 lg:p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <div className="flex items-center gap-3">
                          <BookOpen className="h-5 w-5 lg:h-6 lg:w-6 text-pink flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium font-outfit text-gray-800">
                              Curated Lessons Ready
                            </p>
                            <p className="text-xs text-gray-500 font-outfit mt-1">Curated lessons for your interview...</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 lg:mt-6 border-t border-gray-200 pt-4 lg:pt-6">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-white font-outfit">All 3 Core Features Active</div>
                          <div className="text-xs text-white font-outfit">Stories • Feedback • Lessons</div>
                        </div>
                        <Button size="sm" className="bg-green-500 text-white hover:bg-green-600 font-mattone px-4 lg:px-6 py-2 text-xs lg:text-sm flex-shrink-0">
                          Ready!
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

      {/* Problem Section */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-mattone text-red-800">The Interview Prep Struggle is Real</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-lg text-left">
                <div className="flex items-start gap-3 mb-4">
                  <X className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                  <span className="font-outfit text-gray-800">Spending months researching scattered interview tips online</span>
                </div>
                <div className="flex items-start gap-3 mb-4">
                  <X className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                  <span className="font-outfit text-gray-800">Practicing with generic questions that don't match your role</span>
                </div>
                <div className="flex items-start gap-3">
                  <X className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                  <span className="font-outfit text-gray-800">Drawing blanks when asked "Tell me about a time when..."</span>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg text-left">
                <div className="flex items-start gap-3 mb-4">
                  <X className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                  <span className="font-outfit text-gray-800">Paying $500+ for coaching books that don't work</span>
                </div>
                <div className="flex items-start gap-3 mb-4">
                  <X className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                  <span className="font-outfit text-gray-800">Feeling unprepared and anxious in every interview</span>
                </div>
                <div className="flex items-start gap-3">
                  <X className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                  <span className="font-outfit text-gray-800">Wasting 100+ hours on ineffective preparation</span>
                </div>
              </div>
            </div>
            
            <div className="bg-red-100 border-2 border-red-200 rounded-xl p-6">
              <p className="text-lg font-semibold text-red-800 font-outfit">
                Sound familiar? You're not alone. 73% of job seekers waste 100+ hours on ineffective prep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mattone">Mockstars: The Complete Interview Prep System That Actually Works</h2>
              <p className="text-lg text-gray-600 font-outfit max-w-3xl mx-auto">
                Our three core features work together to transform you from interview-anxious to interview-ready in just 2 weeks.
              </p>
            </div>

            {/* Core Features Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Feature 1: AI Story Generator */}
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-8 rounded-2xl shadow-lg">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                    <Brain className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold font-mattone mb-2">AI Story Generator</h3>
                  <h4 className="text-lg font-semibold text-blue">Never Blank on Behavioral Questions</h4>
                </div>
                <p className="text-gray-600 font-outfit mb-6 text-center">
                  Stop spending 20+ hours crafting stories. Our AI analyzes your resume and generates 15+ professional STAR stories in minutes.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-outfit text-gray-600">Time Saved</span>
                    <span className="text-sm font-bold text-green-600">20+ hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-outfit text-gray-600">Money Saved</span>
                    <span className="text-sm font-bold text-blue-600">$300+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-outfit text-gray-600">Result</span>
                    <span className="text-sm font-bold text-purple-600">90% fewer "um..."</span>
                  </div>
                </div>
              </div>

              {/* Feature 2: AI Feedback */}
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-8 rounded-2xl shadow-lg">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-full mb-4">
                    <Mic className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold font-mattone mb-2">AI Feedback</h3>
                  <h4 className="text-lg font-semibold text-orange">Real-Time Performance Analysis</h4>
                </div>
                <p className="text-gray-600 font-outfit mb-6 text-center">
                  Practice with voice recording and get instant AI feedback on clarity, pace, confidence, and structure. Track improvement over time.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-outfit text-gray-600">Time Saved</span>
                    <span className="text-sm font-bold text-green-600">15+ hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-outfit text-gray-600">Money Saved</span>
                    <span className="text-sm font-bold text-blue-600">$200+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-outfit text-gray-600">Result</span>
                    <span className="text-sm font-bold text-purple-600">85% more confident</span>
                  </div>
                </div>
              </div>

              {/* Feature 3: Curated Lessons & Quizzes */}
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-8 rounded-2xl shadow-lg">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 text-pink-600 rounded-full mb-4">
                    <BookOpen className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold font-mattone mb-2">Lessons & Quizzes</h3>
                  <h4 className="text-lg font-semibold text-pink">Master Interview Skills Systematically</h4>
                </div>
                <p className="text-gray-600 font-outfit mb-6 text-center">
                  Stop researching scattered sources. Our 6-module curriculum with interactive quizzes covers everything from basics to advanced techniques.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-outfit text-gray-600">Time Saved</span>
                    <span className="text-sm font-bold text-green-600">40+ hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-outfit text-gray-600">Money Saved</span>
                    <span className="text-sm font-bold text-blue-600">$500+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-outfit text-gray-600">Result</span>
                    <span className="text-sm font-bold text-purple-600">3x faster mastery</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Feature Sections */}
            <div className="space-y-8">
              {/* Detailed AI Story Generator */}
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-8 rounded-2xl shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Brain className="h-8 w-8 text-blue" />
                      <h3 className="text-2xl font-bold font-mattone">AI Story Generator</h3>
                    </div>
                    <h4 className="text-xl font-semibold mb-4 font-mattone text-blue">Never Blank on Behavioral Questions Again</h4>
                    <p className="text-gray-600 font-outfit mb-6">
                      Stop spending 20+ hours trying to craft stories from your work experience. Our AI analyzes your resume and generates professional STAR stories in minutes.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
                        <div className="text-sm font-semibold text-green-800">Time Saved</div>
                        <div className="text-lg font-bold text-green-600">20+ hours</div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <DollarSign className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-sm font-semibold text-blue-800">Money Saved</div>
                        <div className="text-lg font-bold text-blue-600">$300+</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <Target className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                        <div className="text-sm font-semibold text-purple-800">Result</div>
                        <div className="text-lg font-bold text-purple-600">90% fewer "um..."</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue mb-2">15+</div>
                      <div className="text-lg font-semibold text-gray-700">Ready-to-use STAR stories</div>
                      <div className="text-sm text-gray-600 mt-2">Generated from your resume in minutes</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed AI Feedback */}
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-8 rounded-2xl shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="bg-gradient-to-br from-orange-50 to-pink-50 p-6 rounded-xl order-2 lg:order-1">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-orange-600 mb-2">Real-time</div>
                      <div className="text-lg font-semibold text-gray-700">AI Performance Analysis</div>
                      <div className="text-sm text-gray-600 mt-2">Instant feedback on every practice session</div>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <div className="flex items-center gap-3 mb-4">
                      <Mic className="h-8 w-8 text-orange-600" />
                      <h3 className="text-2xl font-bold font-mattone">AI Feedback</h3>
                    </div>
                    <h4 className="text-xl font-semibold mb-4 font-mattone text-orange-600">Real-Time Performance Analysis</h4>
                    <p className="text-gray-600 font-outfit mb-6">
                      Practice with voice recording and get instant AI feedback on clarity, pace, confidence, and structure. Track improvement over time.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
                        <div className="text-sm font-semibold text-green-800">Time Saved</div>
                        <div className="text-lg font-bold text-green-600">15+ hours</div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <DollarSign className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-sm font-semibold text-blue-800">Money Saved</div>
                        <div className="text-lg font-bold text-blue-600">$200+</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <Target className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                        <div className="text-sm font-semibold text-purple-800">Result</div>
                        <div className="text-lg font-bold text-purple-600">85% more confident</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Curated Lessons & Quizzes */}
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-8 rounded-2xl shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <BookOpen className="h-8 w-8 text-pink-600" />
                      <h3 className="text-2xl font-bold font-mattone">Lessons & Quizzes</h3>
                    </div>
                    <h4 className="text-xl font-semibold mb-4 font-mattone text-pink-600">Master Interview Skills Systematically</h4>
                    <p className="text-gray-600 font-outfit mb-6">
                      Stop researching scattered sources. Our 6-module curriculum with interactive quizzes covers everything from basics to advanced techniques.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
                        <div className="text-sm font-semibold text-green-800">Time Saved</div>
                        <div className="text-lg font-bold text-green-600">40+ hours</div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <DollarSign className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-sm font-semibold text-blue-800">Money Saved</div>
                        <div className="text-lg font-bold text-blue-600">$500+</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <Target className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                        <div className="text-sm font-semibold text-purple-800">Result</div>
                        <div className="text-lg font-bold text-purple-600">3x faster mastery</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-pink-600 mb-2">6</div>
                      <div className="text-lg font-semibold text-gray-700">Comprehensive modules</div>
                      <div className="text-sm text-gray-600 mt-2">With interactive quizzes and progress tracking</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Predict Your Future Success */}
      <section className="py-16 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mattone">Predict your future success</h2>
                <p className="text-lg text-gray-600 font-outfit mb-8">
                  Our dynamic success prediction updates every month based on your application activity and interview performance. 
                  We rely on machine learning and market factors to estimate your potential and track changes over time.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-blue" />
                    <span className="font-outfit">Track application success rates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-blue" />
                    <span className="font-outfit">Monitor interview performance</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-blue" />
                    <span className="font-outfit">Optimize your strategy in real-time</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold mb-6 font-mattone text-center">Success Prediction Chart</h3>
                <div className="h-64 bg-gradient-to-t from-blue/20 to-transparent rounded-lg flex items-end justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue font-mattone">85%</div>
                    <div className="text-sm text-gray-600 font-outfit">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Maximize Your Potential */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mattone">Maximize your potential</h2>
              <p className="text-lg text-gray-600 font-outfit max-w-3xl mx-auto">
                From resume optimization to interview prep, every strategy is customized and adapts over time based on your progress. 
                Stay on track, build better habits, and give yourself the best chance to land your dream job.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold mb-6 font-mattone gradient-text flex items-center gap-2">
                  <FileText className="h-6 w-6 text-blue mt-0.5" />
                  Daily Application Tasks
                </h3>
                <ul className="space-y-3 text-gray-700 font-outfit">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-blue mt-0.5" />
                    <span>Optimize resume for new job postings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-blue mt-0.5" />
                    <span>Generate tailored cover letters</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-blue mt-0.5" />
                    <span>Practice interview questions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-blue mt-0.5" />
                    <span>Track application progress</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold mb-6 font-mattone gradient-text flex items-center gap-2">
                  <Users className="h-6 w-6 text-orange mt-0.5" />
                  Community Engagement
                </h3>
                <ul className="space-y-3 text-gray-700 font-outfit">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-orange mt-0.5" />
                    <span>Share success stories and tips</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-orange mt-0.5" />
                    <span>Learn from others' experiences</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-orange mt-0.5" />
                    <span>Get support during job search</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-orange mt-0.5" />
                    <span>Stay motivated with peer progress</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ask Mockstars AI */}
      <section className="py-16 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mattone">Ask Mockstars AI</h2>
            <p className="text-lg text-gray-600 font-outfit mb-8">
              Have questions about your career potential? Mockstars AI gives you real-time, data-driven answers based on your unique profile. 
              Whether you're wondering how to optimize your resume, what interview questions to expect, or how to maximize your chances, 
              our AI provides clear, personalized insights.
            </p>
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Bot className="h-6 w-6 text-blue" />
                <span className="font-semibold font-mattone">Mockstars AI</span>
              </div>
              <p className="text-gray-700 font-outfit text-left">
                "Based on your experience in software development, I recommend focusing on quantifiable achievements in your resume. 
                Your STAR method stories should emphasize problem-solving and technical leadership. Would you like me to help you 
                craft specific examples for your next interview?"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mattone">Join 10,000+ Successful Job Seekers</h2>
              <div className="flex items-center justify-center gap-2 mb-8">
                <span className="text-sm text-gray-600 font-outfit">Rated 4.8 on</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-green-500 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-outfit">App Store (Google Play Coming Soon)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg">
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 font-outfit mb-4 text-sm leading-relaxed">
                  "I was blanking on every behavioral question. Now I have 15+ stories ready and landed my dream job at Google in 2 weeks!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue to-teal-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">SM</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800 font-mattone">Sarah M.</div>
                    <div className="text-xs text-gray-600 font-outfit">Software Engineer</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg">
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 font-outfit mb-4 text-sm leading-relaxed">
                  "Spent months researching interview tips online. Mockstars gave me everything in 2 weeks and saved me $800 on coaching books."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink to-orange rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">MR</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800 font-mattone">Mike R.</div>
                    <div className="text-xs text-gray-600 font-outfit">Product Manager</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg">
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 font-outfit mb-4 text-sm leading-relaxed">
                  "I was so nervous I'd get questions I couldn't answer. The personalized questions feature made me feel 100% prepared and confident."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple to-pink rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">JL</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800 font-mattone">Jessica L.</div>
                    <div className="text-xs text-gray-600 font-outfit">Data Analyst</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mattone text-red-800">The Real Cost of NOT Using Mockstars</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <Clock className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <div className="text-2xl font-bold text-red-600 mb-2">100+ hours</div>
                <div className="text-sm text-gray-600 font-outfit">Time Wasted researching scattered sources</div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <DollarSign className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <div className="text-2xl font-bold text-red-600 mb-2">$500+</div>
                <div className="text-sm text-gray-600 font-outfit">Money Lost on ineffective books and courses</div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <div className="text-2xl font-bold text-red-600 mb-2">Dream Jobs</div>
                <div className="text-sm text-gray-600 font-outfit">Missing out due to poor preparation</div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <X className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <div className="text-2xl font-bold text-red-600 mb-2">Months</div>
                <div className="text-sm text-gray-600 font-outfit">Of anxiety and self-doubt</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-green-800 p-8 rounded-2xl text-center">
              <h3 className="text-2xl font-bold mb-4 font-mattone">Mockstars Pro users save 100+ hours and $500+ while landing jobs 3x faster</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div>
                  <div className="text-3xl font-bold mb-2">100+</div>
                  <div className="text-sm">Hours Saved</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">$500+</div>
                  <div className="text-sm">Money Saved</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">3x</div>
                  <div className="text-sm">Faster Job Landing</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mattone">Choose Your Success Plan</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Plan */}
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold mb-4 font-mattone">Free Plan</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="font-outfit">10 practice sessions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="font-outfit">Basic questions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="font-outfit">Limited story generation</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-gray-100 text-gray-800 hover:bg-gray-200 font-mattone py-3 rounded-xl flex items-center justify-center"
                    onClick={handleDownloadClick}
                  >
                    <Download className="h-5 w-5 mr-2" />
                    App Store
                  </Button>
                  <Button 
                    className="w-full bg-gray-100 text-gray-800 hover:bg-gray-200 font-mattone py-3 rounded-xl flex items-center justify-center"
                    onClick={handleGooglePlayClick}
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Google Play - Coming Soon
                  </Button>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="bg-gradient-to-br from-blue to-purple-600 text-white p-8 rounded-2xl shadow-lg relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-orange text-white px-4 py-2 rounded-full text-sm font-semibold">Most Popular</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 font-mattone">Pro Plan - $19.99/month</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-300" />
                    <span className="font-outfit">Unlimited practice sessions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-300" />
                    <span className="font-outfit">AI story generation from resume</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-300" />
                    <span className="font-outfit">Personalized questions for your role</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-300" />
                    <span className="font-outfit">Complete 6-module learning system</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-300" />
                    <span className="font-outfit">Resume analysis & feedback</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-300" />
                    <span className="font-outfit">Progress tracking & analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-300" />
                    <span className="font-outfit">Offline access</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-white text-blue hover:bg-gray-100 font-mattone py-3 rounded-xl flex items-center justify-center"
                    onClick={handleDownloadClick}
                  >
                    <Download className="h-5 w-5 mr-2" />
                    App Store
                  </Button>
                  <Button 
                    className="w-full bg-white text-blue hover:bg-gray-100 font-mattone py-3 rounded-xl flex items-center justify-center"
                    onClick={handleGooglePlayClick}
                  >
                    <Download className="h-5 w-5 mr-2" />
                     Google Play - Coming Soon
                  </Button>
                </div>
                <p className="text-center text-sm mt-4 text-blue-100">Download Free - Upgrade Anytime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mattone">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-semibold text-gray-800 font-mattone pr-4">
                      How is this different from other interview prep apps?
                    </h3>
                    <div className="text-blue transition-transform group-open:rotate-180">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 font-outfit leading-relaxed">
                      Mockstars uses AI to personalize everything for YOUR specific role and experience. Other apps give you generic questions that don't match your actual interview.
                    </p>
                  </div>
                </details>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-semibold text-gray-800 font-mattone pr-4">
                      How much time will this actually save me?
                    </h3>
                    <div className="text-blue transition-transform group-open:rotate-180">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 font-outfit leading-relaxed">
                      Most users save 100+ hours compared to traditional prep methods. Our structured system eliminates the guesswork and gives you exactly what you need.
                    </p>
                  </div>
                </details>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-semibold text-gray-800 font-mattone pr-4">
                      What if I'm not tech-savvy?
                    </h3>
                    <div className="text-blue transition-transform group-open:rotate-180">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 font-outfit leading-relaxed">
                      Mockstars is designed for everyone. Just upload your resume and start practicing. Our AI does the heavy lifting for you.
                    </p>
                  </div>
                </details>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-semibold text-gray-800 font-mattone pr-4">
                      Can I really land a job 3x faster?
                    </h3>
                    <div className="text-blue transition-transform group-open:rotate-180">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 font-outfit leading-relaxed">
                      Yes! Our users report getting interviews and job offers 3x faster than traditional preparation methods because they're actually prepared for their specific role.
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-blue">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mattone">Ready to Stop Wasting Time and Start Landing Jobs?</h2>
            <p className="text-xl mb-8 font-outfit">Join thousands of successful candidates who've transformed their interview skills with Mockstars.</p>
            <p className="text-lg mb-8 font-outfit">Download the app today - no credit card required</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white text-blue px-8 py-4 rounded-2xl font-mattone hover:bg-gray-100 transition-colors text-lg flex items-center justify-center"
                onClick={handleDownloadClick}
              >
                <Download className="h-5 w-5 mr-2" />
                 App Store
              </Button>
              <Button 
                className="bg-white text-blue px-8 py-4 rounded-2xl font-mattone hover:bg-gray-100 transition-colors text-lg flex items-center justify-center"
                onClick={handleGooglePlayClick}
              >
                <Download className="h-5 w-5 mr-2" />
                 Google Play - Coming Soon
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Trust Signals */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-sm font-outfit text-gray-700">Secure & Compliant</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-sm font-outfit text-gray-700">10,000+ Users</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-sm font-outfit text-gray-700">4.8/5 Rating</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-sm font-outfit text-gray-700">Easy Cancellation</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-sm font-outfit text-gray-700">Fast Results</span>
              </div>
            </div>
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600 font-outfit italic">
                Mockstars - Where preparation meets confidence, and interviews become opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
