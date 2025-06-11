import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import JsonLd from "@/components/JsonLd"
import Footer from '../../components/Footer'

export const metadata = {
  title: 'About Mockstars - AI-Powered Interview Practice Platform',
  description: 'Learn about Mockstars, the innovative platform using AI to help you practice and improve your interview skills through voice-based feedback and personalized coaching.',
}

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  mainEntity: {
    '@type': 'Organization',
    name: 'Mockstars',
    description: 'AI-powered interview practice platform',
    foundingDate: '2024',
    url: 'https://mockstars.app',
    sameAs: [
      'https://twitter.com/mockstarsapp',
      'https://linkedin.com/company/mockstars'
    ],
    offers: {
      '@type': 'Service',
      name: 'Interview Practice Platform',
      description: 'AI-powered interview practice with voice feedback'
    }
  }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white font-outfit">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="max-w-4xl mx-auto">
          <JsonLd data={aboutJsonLd} />
          <h1 className="text-3xl md:text-4xl font-bold mb-8 font-mattone">About Mockstars</h1>
          
          <div className="space-y-8 text-zinc-300">
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-white font-mattone">Empowering Career Success Through AI-Powered Interview Practice</h2>
              <p>
                Mockstars is a revolutionary mobile application designed to transform how professionals prepare for job interviews. Founded with the mission to democratize interview preparation, Mockstars combines cutting-edge artificial intelligence with intuitive mobile technology to provide personalized, accessible, and effective interview practice for job seekers worldwide.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-white font-mattone">Our Story</h2>
              <div className="space-y-4">
                <p>
                  In today's competitive job market, interview preparation often determines career success. Traditional interview coaching is expensive, time-consuming, and not accessible to everyone. Mockstars was created to bridge this gap, offering AI-powered interview practice that adapts to each user's industry, experience level, and career goals.
                </p>
                <p>
                  Our platform leverages advanced AI technology to provide realistic interview simulations, personalized feedback, and continuous improvement tracking, making professional interview coaching accessible to anyone with a smartphone.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl md:text-2xl font-bold text-white font-mattone">What Makes Mockstars Unique</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white font-mattone mb-4">AI-Powered Personalization</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Resume-Based Customization:</strong> Upload your resume to receive tailored interview questions based on your specific experience, skills, and career background</li>
                    <li><strong>Industry-Specific Questions:</strong> Access curated question banks for various industries and job roles</li>
                    <li><strong>Adaptive Learning:</strong> Our AI learns from your responses to provide increasingly relevant and challenging practice scenarios</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white font-mattone mb-4">Comprehensive Interview Preparation</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Voice Recording Technology:</strong> Practice speaking your answers aloud with high-quality audio recording capabilities</li>
                    <li><strong>Real-Time Feedback:</strong> Receive instant analysis of your responses, including content quality, speaking pace, and delivery confidence</li>
                    <li><strong>Progress Tracking:</strong> Monitor your improvement over time with detailed analytics and performance metrics</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white font-mattone mb-4">Mobile-First Experience</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Practice Anywhere:</strong> Prepare for interviews on-the-go with our fully-featured mobile application</li>
                    <li><strong>Offline Capability:</strong> Access core features even without internet connectivity</li>
                    <li><strong>Cross-Platform Compatibility:</strong> Available on both iOS and Android devices</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-white font-mattone">Our Technology</h2>
              <p>Mockstars is built on a robust technology stack that ensures reliability, security, and scalability:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Frontend:</strong> React Native with Expo for cross-platform mobile development</li>
                <li><strong>Backend:</strong> Supabase for real-time database, authentication, and storage</li>
                <li><strong>AI Integration:</strong> Advanced natural language processing for question generation and response analysis</li>
                <li><strong>Cloud Storage:</strong> Secure file storage for resumes and audio recordings</li>
                <li><strong>Analytics:</strong> Comprehensive user analytics and progress tracking</li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl md:text-2xl font-bold text-white font-mattone">Target Audience</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-white font-mattone mb-4">Job Seekers</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Recent graduates entering the job market</li>
                    <li>Career changers transitioning to new industries</li>
                    <li>Experienced professionals seeking advancement</li>
                    <li>International candidates preparing for English-language interviews</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white font-mattone mb-4">Career Stages</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Entry-Level:</strong> Fresh graduates and early-career professionals</li>
                    <li><strong>Mid-Level:</strong> Professionals with 2-8 years of experience</li>
                    <li><strong>Senior-Level:</strong> Experienced professionals seeking leadership roles</li>
                    <li><strong>Executive:</strong> C-suite and senior management candidates</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white font-mattone mb-4">Industries Served</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Technology and Software Development</li>
                    <li>Finance and Banking</li>
                    <li>Healthcare and Medical</li>
                    <li>Marketing and Sales</li>
                  </ul>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Consulting and Professional Services</li>
                    <li>Engineering and Manufacturing</li>
                    <li>Education and Academia</li>
                    <li>Startups and Entrepreneurship</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl md:text-2xl font-bold text-white font-mattone">Our Commitment</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white font-mattone mb-4">Privacy and Security</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Data Protection:</strong> All user data is encrypted and stored securely</li>
                    <li><strong>Privacy First:</strong> We never share personal information with third parties</li>
                    <li><strong>GDPR Compliant:</strong> Full compliance with international data protection regulations</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white font-mattone mb-4">Accessibility</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Inclusive Design:</strong> Built with accessibility features for users with disabilities</li>
                    <li><strong>Multiple Languages:</strong> Support for international users and non-native English speakers</li>
                    <li><strong>Affordable Pricing:</strong> Competitive pricing to make professional interview preparation accessible</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white font-mattone mb-4">Continuous Improvement</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Regular Updates:</strong> Frequent app updates with new features and improvements</li>
                    <li><strong>User Feedback:</strong> Active incorporation of user suggestions and feedback</li>
                    <li><strong>AI Enhancement:</strong> Continuous improvement of AI algorithms for better personalization</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-white font-mattone">Company Values</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-white font-mattone mb-4">Excellence</h3>
                  <p>We strive for excellence in every aspect of our product, from user experience design to AI accuracy and customer support.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-mattone mb-4">Innovation</h3>
                  <p>We continuously push the boundaries of what's possible in mobile interview preparation, incorporating the latest AI and mobile technologies.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-mattone mb-4">Integrity</h3>
                  <p>We maintain the highest standards of data privacy, security, and ethical AI practices in all our operations.</p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-white font-mattone">Contact Information</h2>
              <p>
                For more information about Mockstars, partnerships, or support inquiries, please visit our website or contact our team through the app.
              </p>
              <p className="italic text-zinc-400">
                Mockstars - Your AI-Powered Interview Coach
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
} 