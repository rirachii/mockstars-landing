import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, DollarSign, Users, TrendingUp, Star, ArrowRight, Play, Copy, ExternalLink } from 'lucide-react'

export default function CreatorProgramPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
              <Star className="w-4 h-4 mr-2" />
              Creator Program
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              MOCKSTARS
              <br />
              <span className="text-blue-600">CREATOR PROGRAM</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Earn $2 per 1k views by smoothly integrating our resume builder
              into your already successful TikTok & Reels content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <DollarSign className="w-5 h-5 mr-2" />
                Join our program
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/creator-program/guidelines">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Guidelines
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Get started in just 4 simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Sign the Agreement</h3>
              <p className="text-gray-600">Join the program by submitting your PayPal & a quick e-signature.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Read Our Guidelines</h3>
              <p className="text-gray-600">Discover how to feature the app smoothly in your videos.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Submit Your Content</h3>
              <p className="text-gray-600">Submit all videos via our Google Form so we can track all your views.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Earn Money</h3>
              <p className="text-gray-600">Get paid $2 for every 1k views.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copy These Videos */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Copy These Videos</h2>
            <p className="text-lg text-gray-600">
              Check out these high-performing videos from our top creators.
              <br />
              Copy their content style, farm views, and start earning today!
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <Play className="w-12 h-12 text-gray-400" />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Video {i}</span>
                    <Button size="sm" variant="outline">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Get quick answers to the most common questions about our creator program.
            </p>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">When are payments processed?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Mockstars creators are paid on the 1st of each month. We take a snapshot of all the views 
                  generated during the previous month and pay you the corresponding amount.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What payment methods do we support?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We currently only support PayPal or Bank payments for amounts above $500 
                  (this may change in the future).
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I post unlimited content?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, you can post as much content as you want. We will pay you for all the views generated.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is there a minimum payout?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, the minimum payout is $25.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is there a revenue cap per video?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, we have a revenue cap of $1,000 per video.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is there any bonus based on performance?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes! In addition to the base $2.00 RPM (Revenue per 1,000 views), we offer a performance-based bonus 
                  depending on how many eligible videos you post in a given calendar month:
                </p>
                <ul className="mt-2 space-y-1 text-gray-600">
                  <li>• <strong>10 to 19 eligible videos:</strong> your RPM increases to $2.20</li>
                  <li>• <strong>20 to 29 eligible videos:</strong> your RPM increases to $2.40</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Earning?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of creators who are already earning with Mockstars.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <ArrowRight className="w-5 h-5 mr-2" />
            Get Started Now
          </Button>
        </div>
      </div>
    </div>
  )
}
