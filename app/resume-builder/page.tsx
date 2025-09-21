'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Upload, Sparkles } from 'lucide-react'

export default function ResumeBuilderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Build Your Professional Resume
          </h1>
          <p className="text-xl text-gray-600">
            Choose how you'd like to create your resume
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Text-based Builder */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Text-Based Builder</CardTitle>
              </div>
              <CardDescription>
                Paste your existing resume text and we'll automatically format it into a professional resume
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Perfect for:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Converting existing text resumes</li>
                  <li>• Quick resume formatting</li>
                  <li>• Bulk resume processing</li>
                  <li>• Simple text-to-PDF conversion</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Features:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Automatic section detection</li>
                  <li>• Smart text parsing</li>
                  <li>• Multiple template options</li>
                  <li>• Instant PDF generation</li>
                </ul>
              </div>

              <Link href="/resume-builder/text">
                <Button className="w-full" size="lg">
                  <FileText className="w-4 h-4 mr-2" />
                  Start with Text
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Upload-based Builder */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Upload className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">Upload & Edit</CardTitle>
              </div>
              <CardDescription>
                Upload an existing resume or start from scratch with our guided form builder
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Perfect for:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Starting from scratch</li>
                  <li>• Detailed customization</li>
                  <li>• Step-by-step guidance</li>
                  <li>• Advanced formatting</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Features:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Interactive form builder</li>
                  <li>• Live preview</li>
                  <li>• Template selection</li>
                  <li>• Advanced customization</li>
                </ul>
              </div>

              <Link href="/resume-builder/upload">
                <Button className="w-full" size="lg" variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload & Build
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-3">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-gray-700">
              Both options support all our professional templates and PDF export
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
