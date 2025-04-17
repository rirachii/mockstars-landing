import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function Privacy() {
  return (
    <div className="min-h-screen bg-black text-white font-outfit">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 font-sora">Privacy Policy</h1>
          
          <div className="space-y-6 text-zinc-300">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white font-sora">1. Information We Collect</h2>
              <p>We collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Voice recordings when you practice interviews</li>
                <li>Account information (if you create an account)</li>
                <li>Usage data and analytics</li>
                <li>Device information</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white font-sora">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and improve our interview practice services</li>
                <li>Generate AI feedback on your responses</li>
                <li>Analyze and improve our services</li>
                <li>Communicate with you about our services</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white font-sora">3. Data Storage and Security</h2>
              <p>We implement appropriate security measures to protect your information. Your voice recordings and personal data are encrypted and stored securely.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white font-sora">4. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Update your personal information</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white font-sora">5. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <p><a href="mailto:michelle@veloraai.com" className="text-teal hover:underline">michelle@veloraai.com</a></p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
} 