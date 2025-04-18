import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function Terms() {
  return (
    <div className="min-h-screen bg-black text-white font-outfit">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 font-sora">Terms of Service</h1>
          
          <div className="space-y-6 text-zinc-300">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white font-sora">1. Acceptance of Terms</h2>
              <p>By accessing or using Mockstars.app, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white font-sora">2. Service Description</h2>
              <p>Mockstars.app provides an AI-powered interview practice platform that includes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Voice-based interview practice sessions</li>
                <li>AI-generated feedback on responses</li>
                <li>Progress tracking and analytics</li>
                <li>Practice question database</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white font-sora">3. User Responsibilities</h2>
              <p>You agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate information when using our service</li>
                <li>Maintain the confidentiality of your account</li>
                <li>Use the service in compliance with all applicable laws</li>
                <li>Not misuse or attempt to manipulate our AI systems</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white font-sora">4. Intellectual Property</h2>
              <p>All content, features, and functionality of Mockstars.app are owned by VeloraAI and are protected by international copyright, trademark, and other intellectual property laws.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white font-sora">5. Limitation of Liability</h2>
              <p>Mockstars.app and VeloraAI shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white font-sora">6. Changes to Terms</h2>
              <p>We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the application.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white font-sora">7. Contact</h2>
              <p>For any questions regarding these Terms of Service, please contact us at:</p>
              <p><a href="mailto:michelle@veloraai.com" className="text-teal hover:underline">michelle@veloraai.com</a></p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
} 