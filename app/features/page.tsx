import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import JsonLd from "@/components/JsonLd"
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Mockstars Features - AI Interview Practice Tools',
  description: 'Explore Mockstars features including voice-based practice, AI feedback, progress tracking, and industry-specific interview preparation tools.',
}

const featuresJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Mockstars Interview Practice Platform',
  description: 'AI-powered interview practice platform with voice feedback',
  category: 'Software',
  applicationCategory: 'Education',
  features: [
    'Voice-based interview practice',
    'Real-time AI feedback',
    'Progress tracking',
    'Industry-specific questions',
    'Performance analytics'
  ],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock'
  }
}

export default function FeaturesPage() {
  return (
    <div className="min-h-screen text-gray-800 font-outfit relative z-10">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="max-w-4xl mx-auto">
          <JsonLd data={featuresJsonLd} />
          <h1 className="text-3xl md:text-4xl font-bold mb-8 font-mattone">Platform Features</h1>
          
          <div className="space-y-8 text-gray-600">
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 font-mattone">Comprehensive AI-Powered Interview Practice Platform</h2>
              <p className="text-xl">
                Mockstars offers a complete suite of interview preparation tools designed to help you succeed in your job search. Our AI-powered platform provides personalized, realistic interview practice that adapts to your unique background and career goals.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl md:text-2xl font-bold text-blue font-mattone">🎯 Core Features</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 font-mattone mb-4">AI-Powered Question Generation</h3>
                  <p className="text-lg text-blue mb-4">Smart Interview Simulation</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Resume-Based Questions:</strong> Upload your PDF resume to receive personalized interview questions tailored to your specific experience, skills, and career history</li>
                    <li><strong>Industry-Specific Content:</strong> Access curated question banks for technology, finance, healthcare, marketing, consulting, and other major industries</li>
                    <li><strong>Role-Targeted Questions:</strong> Practice questions specific to your target job role, from entry-level to executive positions</li>
                    <li><strong>Behavioral Questions:</strong> STAR method practice with scenarios relevant to your background</li>
                    <li><strong>Technical Questions:</strong> Industry-specific technical challenges and problem-solving scenarios</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-blue font-mattone mb-4">Voice Recording & Audio Practice</h3>
                  <p className="text-lg text-blue mb-4">Professional Voice Training</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>High-Quality Audio Recording:</strong> Crystal-clear audio capture using advanced mobile recording technology</li>
                    <li><strong>Voice Analysis:</strong> AI-powered analysis of speaking pace, clarity, and confidence levels</li>
                    <li><strong>Playback & Review:</strong> Listen to your responses to identify areas for improvement</li>
                    <li><strong>Audio Storage:</strong> Secure cloud storage for all your practice sessions</li>
                    <li><strong>Progress Comparison:</strong> Compare recordings over time to track vocal improvement</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-blue font-mattone mb-4">Resume Integration & Analysis</h3>
                  <p className="text-lg text-blue mb-4">Intelligent Resume Processing</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>PDF Upload:</strong> Easy drag-and-drop resume upload with 1MB file size support</li>
                    <li><strong>Content Analysis:</strong> AI extraction of key skills, experiences, and qualifications</li>
                    <li><strong>Experience Mapping:</strong> Questions generated based on specific roles and achievements</li>
                    <li><strong>Skills Assessment:</strong> Practice questions targeting your listed technical and soft skills</li>
                    <li><strong>Career Timeline:</strong> Questions that explore your career progression and decisions</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl md:text-2xl font-bold text-blue font-mattone">📊 Advanced Analytics & Tracking</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-blue font-mattone mb-4">Performance Metrics</h3>
                  <p className="text-lg text-blue mb-4">Comprehensive Progress Monitoring</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Response Quality Scoring:</strong> AI evaluation of answer completeness and relevance</li>
                    <li><strong>Improvement Tracking:</strong> Visual progress charts showing skill development over time</li>
                    <li><strong>Session Analytics:</strong> Detailed breakdown of each practice session</li>
                    <li><strong>Weak Spot Identification:</strong> AI-powered identification of areas needing improvement</li>
                    <li><strong>Streak Tracking:</strong> Maintain practice consistency with daily/weekly streak counters</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-blue font-mattone mb-4">Personalized Feedback</h3>
                  <p className="text-lg text-blue mb-4">AI-Driven Insights</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Content Analysis:</strong> Evaluation of answer substance and relevance</li>
                    <li><strong>Speaking Pattern Analysis:</strong> Assessment of pace, pauses, and verbal clarity</li>
                    <li><strong>Confidence Scoring:</strong> AI measurement of response confidence and assertiveness</li>
                    <li><strong>Improvement Suggestions:</strong> Specific, actionable feedback for enhancement</li>
                    <li><strong>Best Practice Tips:</strong> Industry-standard interview advice tailored to your responses</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl md:text-2xl font-bold text-blue font-mattone">🏆 Practice Modes & Scenarios</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-blue font-mattone mb-4">Mock Interview Sessions</h3>
                  <p className="text-lg text-blue mb-4">Realistic Interview Simulations</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Full Interview Practice:</strong> Complete interview simulations with multiple questions</li>
                    <li><strong>Quick Practice:</strong> Single question practice for specific skill building</li>
                    <li><strong>Timed Sessions:</strong> Practice with realistic time constraints</li>
                    <li><strong>Industry Scenarios:</strong> Role-specific interview environments and contexts</li>
                    <li><strong>Difficulty Levels:</strong> Adjustable question complexity based on experience level</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-blue font-mattone mb-4">Question Categories</h3>
                  <p className="text-lg text-blue mb-4">Comprehensive Question Database</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Behavioral Questions:</strong> Leadership, teamwork, problem-solving scenarios</li>
                    <li><strong>Technical Questions:</strong> Programming, system design, analytical challenges</li>
                    <li><strong>Situational Questions:</strong> Hypothetical workplace scenarios and responses</li>
                    <li><strong>Cultural Fit:</strong> Company values alignment and personality assessment</li>
                    <li><strong>Career Questions:</strong> Goals, motivations, and career transition discussions</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl md:text-2xl font-bold text-blue font-mattone">🛡️ Security & Privacy Features</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-blue font-mattone mb-4">Data Protection</h3>
                  <p className="text-lg text-blue mb-4">Enterprise-Grade Security</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>End-to-End Encryption</li>
                    <li>Secure File Storage</li>
                    <li>Privacy Controls</li>
                    <li>GDPR Compliance</li>
                    <li>No Third-Party Sharing</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-blue font-mattone mb-4">User Authentication</h3>
                  <p className="text-lg text-blue mb-4">Secure Access Management</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Multi-Factor Authentication</li>
                    <li>Social Sign-In</li>
                    <li>Session Management</li>
                    <li>Account Recovery</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl md:text-2xl font-bold text-blue font-mattone">📱 Mobile Experience Features</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-blue font-mattone mb-4">Cross-Platform Compatibility</h3>
                  <p className="text-lg text-blue mb-4">Universal Access</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>iOS Native App</li>
                    <li>Android Support</li>
                    <li>Responsive Design</li>
                    <li>Offline Mode</li>
                    <li>Cloud Sync</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-blue font-mattone mb-4">User Interface & Experience</h3>
                  <p className="text-lg text-blue mb-4">Intuitive Design</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Clean Interface</li>
                    <li>Easy Navigation</li>
                    <li>Accessibility Features</li>
                    <li>Dark Mode</li>
                    <li>Customizable Settings</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl md:text-2xl font-bold text-blue font-mattone">🎓 Learning & Development Tools</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-blue font-mattone mb-4">Skill Building Resources</h3>
                  <p className="text-lg text-blue mb-4">Comprehensive Learning Library</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Interview Guides:</strong> Best practices for different interview types</li>
                    <li><strong>Answer Templates:</strong> Structured frameworks for common question types</li>
                    <li><strong>Industry Insights:</strong> Current trends and expectations by sector</li>
                    <li><strong>Success Stories:</strong> Real user experiences and improvement journeys</li>
                    <li><strong>Expert Tips:</strong> Professional coaching advice integrated into the platform</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-blue font-mattone mb-4">Career Development</h3>
                  <p className="text-lg text-blue mb-4">Long-term Success Planning</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Goal Setting:</strong> Define and track career objectives</li>
                    <li><strong>Skill Gap Analysis:</strong> Identify areas for professional development</li>
                    <li><strong>Interview Calendar:</strong> Schedule and track upcoming interviews</li>
                    <li><strong>Success Metrics:</strong> Monitor job application and interview success rates</li>
                    <li><strong>Career Insights:</strong> Industry trends and job market analysis</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl md:text-2xl font-bold text-blue font-mattone">🔧 Technical Specifications</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-blue font-mattone mb-4">System Requirements</h3>
                  <p className="text-lg text-blue mb-4">Platform Compatibility</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>iOS:</strong> Version 13.0 or later, iPhone 8 or newer</li>
                    <li><strong>Android:</strong> Android 8.0 (API level 26) or higher</li>
                    <li><strong>Storage:</strong> Minimum 100MB available space</li>
                    <li><strong>Network:</strong> Wi-Fi or cellular data connection for full functionality</li>
                    <li><strong>Microphone:</strong> Device microphone access required for voice recording</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-blue font-mattone mb-4">Performance Features</h3>
                  <p className="text-lg text-blue mb-4">Optimized Experience</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Fast Loading</li>
                    <li>Efficient Battery Usage</li>
                    <li>Minimal Data Usage</li>
                    <li>Background Processing</li>
                    <li>Auto-Save</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-blue font-mattone">🚀 Upcoming Features</h2>
              <div>
                <h3 className="text-lg font-bold text-blue font-mattone mb-4">Planned Enhancements</h3>
                <p className="text-lg text-blue mb-4">Continuous Innovation</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Live Interview Simulation:</strong> Real-time AI interviewer interaction</li>
                  <li><strong>Video Practice:</strong> Webcam integration for complete interview practice</li>
                  <li><strong>Team Collaboration:</strong> Peer practice and feedback sharing</li>
                  <li><strong>Interview Scheduling:</strong> Integration with calendar applications</li>
                  <li><strong>Advanced Analytics:</strong> Machine learning-powered improvement recommendations</li>
                </ul>
              </div>
              <p className="italic text-zinc-400 mt-8">
                Experience the future of interview preparation with Mockstars - where AI meets career success.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
} 