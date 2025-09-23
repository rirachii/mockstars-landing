'use client'

import { Button } from "@/components/ui/button"
import { Star, Check, Users, DollarSign, Target, Zap, TrendingUp, Award, Share2, Globe, Heart, ArrowRight, Gift, Crown, Sparkles } from "lucide-react"
import JsonLd from "@/components/JsonLd"
import { useRouter } from 'next/navigation'

export default function CrewPage() {
  const router = useRouter()

  const handleJoinCrew = () => {
    // Handle affiliate signup
    window.location.href = 'https://app.youform.com/forms/gaxw1wqe'
    console.log('Join crew clicked')
    // This would typically redirect to an affiliate signup form
  }

  const handleLearnMore = () => {
    // Handle learn more action
    console.log('Learn more clicked')
  }

  return (
    <div className="flex flex-col min-h-screen text-gray-800 font-outfit relative z-10">
      <JsonLd
        data={{
          "@type": "WebPage",
          name: "Constellation Crew - Mockstars Affiliate Program",
          description: "Join our affiliate program and earn money by helping others land their dream jobs with Mockstars",
          url: "https://mockstars.app/crew"
        }}
      />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-2xs uppercase tracking-widest text-blue-600 mb-4 font-mattone">Join Our Mission</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 lg:mb-8 font-mattone leading-tight">
              Constellation Crew
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-outfit mb-8 max-w-3xl mx-auto">
              Help others land their dream jobs while earning money. Be part of a community that's transforming how people prepare for interviews.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                className="bg-blue hover:bg-blue/90 text-white text-lg py-6 px-8 rounded-full font-mattone border border-blue/20 flex items-center justify-center"
                onClick={handleJoinCrew}
              >
                <Crown className="h-6 w-6 mr-3" />
                Join the Crew
              </Button>
              {/* <Button 
                className="bg-white hover:bg-gray-100 text-blue text-lg py-6 px-8 rounded-full font-mattone border border-blue/20 flex items-center justify-center"
                onClick={handleLearnMore}
              >
                <ArrowRight className="h-6 w-6 mr-3" />
                Learn More
              </Button> */}
            </div>

            {/* Trust Indicators */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                <div className="text-2xl font-bold text-blue font-mattone">$50+</div>
                <div className="text-sm text-gray-600 font-outfit">Average Commission</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                <div className="text-2xl font-bold text-green-600 font-mattone">30%</div>
                <div className="text-sm text-gray-600 font-outfit">Commission Rate</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                <div className="text-2xl font-bold text-purple-600 font-mattone">24/7</div>
                <div className="text-sm text-gray-600 font-outfit">Support</div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mattone">Why Join the Mockstars Crew?</h2>
              <p className="text-lg text-gray-600 font-outfit max-w-3xl mx-auto">
                Be part of something bigger. Help people transform their careers while building your own income stream.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-8 rounded-2xl shadow-lg">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
                    <DollarSign className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold font-mattone mb-2">Earn Real Money</h3>
                </div>
                <p className="text-gray-600 font-outfit mb-6 text-center">
                  Earn up to 30% commission on every referral. Our top affiliates make $500+ per month helping others succeed.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-outfit text-gray-600">Commission Rate</span>
                    <span className="text-sm font-bold text-green-600">30%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-outfit text-gray-600">Average Payout</span>
                    <span className="text-sm font-bold text-blue-600">$50+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-outfit text-gray-600">Payment Terms</span>
                    <span className="text-sm font-bold text-purple-600">Monthly</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-8 rounded-2xl shadow-lg">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                    <Heart className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold font-mattone mb-2">Make a Difference</h3>
                </div>
                <p className="text-gray-600 font-outfit mb-6 text-center">
                  Help people land their dream jobs and transform their lives. Every referral you make changes someone's career trajectory.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-outfit text-gray-600">Lives Changed</span>
                    <span className="text-sm font-bold text-green-600">10,000+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-outfit text-gray-600">Success Rate</span>
                    <span className="text-sm font-bold text-blue-600">85%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-outfit text-gray-600">Avg. Time Saved</span>
                    <span className="text-sm font-bold text-purple-600">100+ hrs</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-8 rounded-2xl shadow-lg">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mb-4">
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold font-mattone mb-2">Join a Community</h3>
                </div>
                <p className="text-gray-600 font-outfit mb-6 text-center">
                  Connect with like-minded individuals who are passionate about helping others succeed in their careers.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-outfit text-gray-600">Active Affiliates</span>
                    <span className="text-sm font-bold text-green-600">500+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-outfit text-gray-600">Support Team</span>
                    <span className="text-sm font-bold text-blue-600">24/7</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-outfit text-gray-600">Training</span>
                    <span className="text-sm font-bold text-purple-600">Free</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mattone">How It Works</h2>
              <p className="text-lg text-gray-600 font-outfit max-w-3xl mx-auto">
                Getting started is simple. Follow these three easy steps to begin earning with the Mockstars Crew.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="bg-blue text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  1
                </div>
                <h3 className="text-xl font-bold font-mattone mb-4">Sign Up</h3>
                <p className="text-gray-600 font-outfit mb-6">
                  Join our affiliate program in under 2 minutes. No upfront costs or commitments required.
                </p>
                {/* <div className="bg-white p-4 rounded-xl shadow-lg">
                  <div className="text-sm text-gray-600 font-outfit">What you get:</div>
                  <ul className="text-sm text-gray-700 font-outfit mt-2 space-y-1">
                    <li>• Unique tracking link</li>
                    <li>• Marketing materials</li>
                    <li>• Performance dashboard</li>
                    <li>• Support access</li>
                  </ul>
                </div> */}
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  2
                </div>
                <h3 className="text-xl font-bold font-mattone mb-4">Share & Promote</h3>
                <p className="text-gray-600 font-outfit mb-6">
                  Use your unique link to share Mockstars with your network. We provide all the tools you need.
                </p>
                {/* <div className="bg-white p-4 rounded-xl shadow-lg">
                  <div className="text-sm text-gray-600 font-outfit">Promotion channels:</div>
                  <ul className="text-sm text-gray-700 font-outfit mt-2 space-y-1">
                    <li>• Social media</li>
                    <li>• Email marketing</li>
                    <li>• Blog posts</li>
                    <li>• Word of mouth</li>
                  </ul>
                </div> */}
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="bg-purple text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold font-mattone mb-4">Earn & Grow</h3>
                <p className="text-gray-600 font-outfit mb-6">
                  Get paid monthly for every successful referral. Track your earnings in real-time.
                </p>
                {/* <div className="bg-white p-4 rounded-xl shadow-lg">
                  <div className="text-sm text-gray-600 font-outfit">Earnings include:</div>
                  <ul className="text-sm text-gray-700 font-outfit mt-2 space-y-1">
                    <li>• 30% commission</li>
                    <li>• Monthly payouts</li>
                    <li>• Performance bonuses</li>
                    <li>• Growth rewards</li>
                  </ul>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commission Structure Section */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mattone">Commission Structure</h2>
              <p className="text-lg text-gray-600 font-outfit max-w-3xl mx-auto">
                Transparent, generous, and designed to reward your success. The more you help, the more you earn.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold font-mattone mb-6">Earning Tiers</h3>
                
                <div className="space-y-6">
                  <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-6 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-bold font-mattone">Starter</h4>
                        <p className="text-sm text-gray-600 font-outfit">0-10 referrals/month</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue">30%</div>
                        <div className="text-sm text-gray-600 font-outfit">commission</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-outfit text-gray-700">Standard commission rate</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-outfit text-gray-700">Monthly payouts</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 p-6 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-bold font-mattone">Pro</h4>
                        <p className="text-sm text-gray-600 font-outfit">11-25 referrals/month</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue">35%</div>
                        <div className="text-sm text-gray-600 font-outfit">commission</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-outfit text-gray-700">Higher commission rate</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-outfit text-gray-700">Priority support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-outfit text-gray-700">Bonus materials</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 p-6 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-bold font-mattone">Elite</h4>
                        <p className="text-sm text-gray-600 font-outfit">25+ referrals/month</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-600">40%</div>
                        <div className="text-sm text-gray-600 font-outfit">commission</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-outfit text-gray-700">Maximum commission</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-outfit text-gray-700">Dedicated account manager</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-outfit text-gray-700">Exclusive bonuses</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold font-mattone mb-6 text-center">Earnings Calculator</h3>
                
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue mb-2">$1,200</div>
                    <div className="text-lg font-semibold text-gray-700">Average Monthly Earnings</div>
                    <div className="text-sm text-gray-600">For active Pro tier affiliates</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">$50</div>
                      <div className="text-sm text-gray-600">Per Referral</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue">24</div>
                      <div className="text-sm text-gray-600">Referrals/Month</div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg">
                    <h4 className="font-bold font-mattone mb-3">Top Performer Bonus</h4>
                    <p className="text-sm text-gray-600 font-outfit">
                      Earn an additional $500 bonus when you reach 50+ referrals in a single month.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Success Stories Section */}
      {/* <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mattone">Success Stories</h2>
              <p className="text-lg text-gray-600 font-outfit max-w-3xl mx-auto">
                Meet some of our top-performing affiliates who are making a real difference while earning great money.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 font-outfit mb-4 text-sm leading-relaxed">
                  "I started sharing Mockstars with my LinkedIn network and made $800 in my first month. The product sells itself because it actually works!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue to-teal-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">SM</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800 font-mattone">Sarah M.</div>
                    <div className="text-xs text-gray-600 font-outfit">Career Coach</div>
                    <div className="text-xs text-green-600 font-outfit font-semibold">$2,400/month</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 font-outfit mb-4 text-sm leading-relaxed">
                  "As a recruiter, I recommend Mockstars to all my candidates. It's a win-win - they get better at interviews and I earn commission."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink to-orange rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">MR</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800 font-mattone">Mike R.</div>
                    <div className="text-xs text-gray-600 font-outfit">Tech Recruiter</div>
                    <div className="text-xs text-green-600 font-outfit font-semibold">$1,800/month</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 font-outfit mb-4 text-sm leading-relaxed">
                  "I write about career topics on my blog. Adding Mockstars to my recommendations has been a game-changer for my income."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple to-pink rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">JL</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800 font-mattone">Jessica L.</div>
                    <div className="text-xs text-gray-600 font-outfit">Career Blogger</div>
                    <div className="text-xs text-green-600 font-outfit font-semibold">$3,200/month</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Tools & Resources Section */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mattone">Everything You Need to Succeed</h2>
              <p className="text-lg text-gray-600 font-outfit max-w-3xl mx-auto">
                We provide all the tools, resources, and support you need to be a successful Mockstars affiliate.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-6 rounded-xl shadow-lg text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mb-4">
                  <Share2 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold font-mattone mb-3">Marketing Materials</h3>
                <p className="text-gray-600 font-outfit text-sm">
                  Professional banners, email templates, and social media content ready to use.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-6 rounded-xl shadow-lg text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-full mb-4">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold font-mattone mb-3">Analytics Dashboard</h3>
                <p className="text-gray-600 font-outfit text-sm">
                  Track clicks, conversions, and earnings in real-time with detailed reporting.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-6 rounded-xl shadow-lg text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-full mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold font-mattone mb-3">Dedicated Support</h3>
                <p className="text-gray-600 font-outfit text-sm">
                  24/7 support from our affiliate team to help you maximize your success.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-6 rounded-xl shadow-lg text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-600 rounded-full mb-4">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold font-mattone mb-3">Training Program</h3>
                <p className="text-gray-600 font-outfit text-sm">
                  Comprehensive training on how to effectively promote and sell Mockstars.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Requirements Section */}
      {/* <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mattone">Requirements</h2>
              <p className="text-lg text-gray-600 font-outfit">
                We keep our requirements simple so anyone can join and start earning.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-8 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold font-mattone mb-6 text-green-600">What You Need</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="font-outfit text-gray-700">A passion for helping others succeed</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="font-outfit text-gray-700">A way to reach your audience (social media, email, blog, etc.)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="font-outfit text-gray-700">Basic understanding of affiliate marketing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="font-outfit text-gray-700">Commitment to ethical promotion</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-8 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold font-mattone mb-6 text-blue">What We Provide</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-blue mt-0.5" />
                    <span className="font-outfit text-gray-700">Unique tracking links and codes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-blue mt-0.5" />
                    <span className="font-outfit text-gray-700">Marketing materials and content</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-blue mt-0.5" />
                    <span className="font-outfit text-gray-700">Real-time analytics and reporting</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-blue mt-0.5" />
                    <span className="font-outfit text-gray-700">Ongoing support and training</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section className="py-16 bg-white">
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
                      How much can I realistically earn as an affiliate?
                    </h3>
                    <div className="text-blue transition-transform group-open:rotate-180">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 font-outfit leading-relaxed">
                      Earnings vary based on your audience and promotion efforts. Our top affiliates earn $1,000-5,000+ per month, 
                      while part-time affiliates typically earn $200-800 monthly. The key is consistent promotion to an engaged audience.
                    </p>
                  </div>
                </details>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-semibold text-gray-800 font-mattone pr-4">
                      When and how do I get paid?
                    </h3>
                    <div className="text-blue transition-transform group-open:rotate-180">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 font-outfit leading-relaxed">
                      We pay commissions monthly via PayPal or bank transfer. Payments are processed within 30 days of the end of each month, 
                      with a minimum payout threshold of $50. All payments include detailed reports of your earnings.
                    </p>
                  </div>
                </details>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-semibold text-gray-800 font-mattone pr-4">
                      Do I need a website or large following to join?
                    </h3>
                    <div className="text-blue transition-transform group-open:rotate-180">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 font-outfit leading-relaxed">
                      No! While having a website or large following helps, many successful affiliates start with just social media accounts or email lists. 
                      What matters most is having an engaged audience that trusts your recommendations.
                    </p>
                  </div>
                </details>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-semibold text-gray-800 font-mattone pr-4">
                      Is there any cost to join the affiliate program?
                    </h3>
                    <div className="text-blue transition-transform group-open:rotate-180">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 font-outfit leading-relaxed">
                      Absolutely not! Joining our affiliate program is completely free. There are no upfront costs, monthly fees, or hidden charges. 
                      We only make money when you make money through successful referrals.
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      {/* <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mattone">Ready to Join the Crew?</h2>
            <p className="text-xl mb-8 font-outfit">Start earning money while helping others land their dream jobs. Join thousands of successful affiliates today.</p>
            <p className="text-lg mb-8 font-outfit">No upfront costs • Start earning immediately • 24/7 support</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white text-blue px-8 py-4 rounded-2xl font-mattone hover:bg-gray-100 transition-colors text-lg flex items-center justify-center"
                onClick={handleJoinCrew}
              >
                <Crown className="h-6 w-6 mr-3" />
                Join the Crew Now
              </Button>
              <Button 
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-mattone hover:bg-white hover:text-blue transition-colors text-lg flex items-center justify-center"
                onClick={handleLearnMore}
              >
                <ArrowRight className="h-6 w-6 mr-3" />
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section> */}

      {/* Footer Trust Signals */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-sm font-outfit text-gray-700">Free to Join</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-sm font-outfit text-gray-700">500+ Active Affiliates</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-sm font-outfit text-gray-700">30% Commission</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-sm font-outfit text-gray-700">Monthly Payouts</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-sm font-outfit text-gray-700">24/7 Support</span>
              </div>
            </div> */}
            <div className="text-center">
              <p className="text-sm text-gray-600 font-outfit italic">
                Mockstars Crew - Where helping others succeed becomes your success story.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
