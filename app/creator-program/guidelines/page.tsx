import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, AlertTriangle, ArrowLeft, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function CreatorGuidelinesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-8">
          <Link href="/creator-program" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Creator Program
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Creator Guidelines</h1>
          <p className="text-lg text-gray-600">
            Follow these guidelines to ensure your content meets our standards and maximizes your earning potential.
          </p>
        </div>

        {/* Content Guidelines */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Content Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">✅ What We Want to See:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Natural integration of Mockstars in your content</li>
                <li>• Authentic testimonials about using our resume builder</li>
                <li>• Before/after resume comparisons</li>
                <li>• Career advice content featuring our templates</li>
                <li>• Job search tips with resume building focus</li>
                <li>• Creative ways to showcase different resume templates</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">❌ What to Avoid:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Spammy or overly promotional content</li>
                <li>• False claims about guaranteed job offers</li>
                <li>• Misleading information about our features</li>
                <li>• Content that violates platform community guidelines</li>
                <li>• Reposting the same content multiple times</li>
                <li>• Using copyrighted music or content without permission</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Tagging Requirements */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-blue-600" />
              Tagging Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Required Tags:</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">#Mockstars</Badge>
                  <Badge variant="secondary">#ResumeBuilder</Badge>
                  <Badge variant="secondary">#JobSearch</Badge>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Bio Link:</h3>
                <p className="text-gray-600 mb-2">
                  Include a link to Mockstars in your bio or use our app link in your content.
                </p>
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                  https://mockstars.com
                </code>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Ideas */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Content Ideas That Perform Well</CardTitle>
            <CardDescription>
              These content formats have proven to generate high engagement and views
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">📱 TikTok/Reels Formats:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• "POV: You need a resume but don't know where to start"</li>
                  <li>• "Resume transformation in 30 seconds"</li>
                  <li>• "Why your resume isn't getting you interviews"</li>
                  <li>• "Resume templates for different industries"</li>
                  <li>• "Common resume mistakes to avoid"</li>
                  <li>• "How to make your resume ATS-friendly"</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">🎯 Engagement Tips:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Use trending sounds and hashtags</li>
                  <li>• Post during peak hours (6-9 PM)</li>
                  <li>• Respond to comments quickly</li>
                  <li>• Create series or follow-up content</li>
                  <li>• Use captions that encourage saves</li>
                  <li>• Cross-post to multiple platforms</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submission Process */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Submission Process</CardTitle>
            <CardDescription>
              How to submit your content for tracking and payment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-blue-600">1</span>
                </div>
                <div>
                  <h3 className="font-semibold">Post Your Content</h3>
                  <p className="text-gray-600">Upload your video to TikTok or Instagram Reels with proper tagging</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-blue-600">2</span>
                </div>
                <div>
                  <h3 className="font-semibold">Submit via Google Form</h3>
                  <p className="text-gray-600">Fill out our tracking form with your video URL and details</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-blue-600">3</span>
                </div>
                <div>
                  <h3 className="font-semibold">Track Your Views</h3>
                  <p className="text-gray-600">We'll monitor your video performance and calculate your earnings</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              Important Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-gray-600">
              <p>• Views are only counted during the same calendar month as posting</p>
              <p>• Content must follow platform community guidelines</p>
              <p>• We reserve the right to reject content that doesn't meet our standards</p>
              <p>• Performance bonuses are calculated retroactively for the entire month</p>
              <p>• Minimum payout is $25, paid monthly on the 1st</p>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            Ready to Start Creating?
          </Button>
          <p className="text-sm text-gray-500 mt-2">
            Questions? Contact us at creators@mockstars.com
          </p>
        </div>
      </div>
    </div>
  )
}
