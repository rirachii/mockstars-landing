"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"

export default function Privacy() {
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "information-collection", "data-usage", "legal-bases", "data-sharing", 
        "third-party-websites", "international-transfers", "data-retention", 
        "data-security", "children-privacy", "user-rights", "do-not-track", 
        "us-residents", "other-regions", "changes", "contact", "review-update-delete"
      ]
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const tocItems = [
    { id: "information-collection", title: "What Information Do We Collect?" },
    { id: "data-usage", title: "How Do We Process Your Information?" },
    { id: "legal-bases", title: "What Legal Bases Do We Rely On?" },
    { id: "data-sharing", title: "When and With Whom Do We Share Information?" },
    { id: "third-party-websites", title: "What Is Our Stance on Third-Party Websites?" },
    { id: "international-transfers", title: "Is Your Information Transferred Internationally?" },
    { id: "data-retention", title: "How Long Do We Keep Your Information?" },
    { id: "data-security", title: "How Do We Keep Your Information Safe?" },
    { id: "children-privacy", title: "Do We Collect Information From Minors?" },
    { id: "user-rights", title: "What Are Your Privacy Rights?" },
    { id: "do-not-track", title: "Controls for Do-Not-Track Features" },
    { id: "us-residents", title: "Do United States Residents Have Specific Privacy Rights?" },
    { id: "other-regions", title: "Do Other Regions Have Specific Privacy Rights?" },
    { id: "changes", title: "Do We Make Updates to This Notice?" },
    { id: "contact", title: "How Can You Contact Us About This Notice?" },
    { id: "review-update-delete", title: "How Can You Review, Update, or Delete Data?" }
  ]

  return (
    <div className="min-h-screen text-gray-800 font-outfit relative z-10">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 font-sora">Privacy Policy – Mockstars</h1>
          
          <div className="space-y-6 text-gray-600">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><strong>Effective Date:</strong> September 15, 2025</p>
              <p><strong>Last Updated:</strong> September 15, 2025</p>
              <p className="mt-2">Evergoods Holdings ("we," "our," or "us") operates the Mockstars mobile application ("App") to provide AI-powered behavioral interview preparation services. This Privacy Policy explains how we collect, use, and protect your information when you use the App.</p>
            </div>

            {/* <div className="bg-blue-100 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-gray-800 font-sora mb-4">SUMMARY OF KEY POINTS</h2>
              <p className="text-sm text-gray-700 mb-4"><em>In Short: This summary provides key points from our privacy policy, but you can find out more details about any of these topics by using our table of contents below to find the section you are looking for.</em></p>
              
              <div className="space-y-3 text-sm">
                <p><strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use.</p>
                
                <p><strong>Do we process any sensitive personal information?</strong> We may process sensitive personal information when necessary with your consent or as otherwise permitted by applicable law.</p>
                
                <p><strong>Do we receive any information from third parties?</strong> We do not receive any information from third parties.</p>
                
                <p><strong>How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</p>
                
                <p><strong>In what situations and with which types of parties do we share personal information?</strong> We may share information in specific situations and with specific categories of third parties.</p>
                
                <p><strong>How do we keep your information safe?</strong> We have organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.</p>
              </div>
            </div> */}
            
            <div className="bg-blue-50 p-6 rounded-lg top-4 z-20">
              <h2 className="text-lg font-bold text-gray-800 font-sora mb-4">Table of Contents</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {tocItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left p-2 rounded transition-colors ${
                      activeSection === item.id
                        ? 'bg-blue-200 text-blue-800 font-semibold'
                        : 'hover:bg-blue-100 text-gray-700'
                    }`}
                  >
                    {index + 1}. {item.title}
                  </button>
                ))}
              </div>
            </div>

            <section id="information-collection" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">1. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 font-sora">Personal Information:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email address, display name, password (encrypted)</li>
                <li>Resume data (work experience, skills, education)</li>
                <li>Interview practice recordings (audio)</li>
                <li>User-generated stories and notes</li>
                <li>Profile information (role, experience level, career goals)</li>
                <li>Subscription and payment status (via Apple, Google, and Stripe)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 font-sora">Non-Personal Information:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Device type, OS version, app version</li>
                <li>Usage analytics (lesson progress, quiz scores, practice sessions)</li>
                <li>Crash logs and performance data</li>
                <li>IP address and general location data</li>
                <li>App usage patterns and session duration</li>
              </ul>
            </section>

            <section id="data-usage" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">2. How Do We Process Your Information?</h2>
              <p><em>In Short: We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with the law.</em></p>
              <p>We may process your personal information for a variety of reasons, depending on how you interact with our Services, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To personalize interview questions and content based on your profile and experience</li>
                <li>To generate AI-powered stories from your resume and practice responses</li>
                <li>To track progress and deliver app functionality</li>
                <li>To provide customer support and respond to your inquiries</li>
                <li>To analyze app performance and improve our services</li>
                <li>To process payments and manage subscriptions</li>
                <li>To send important updates about the service</li>
                <li>To prevent fraud and ensure security</li>
                <li>To comply with legal obligations</li>
                <li>To enhance our application's features and functionality based on user data</li>
                <li>To improve the overall user experience by personalizing your engagement</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 font-sora">AI-Powered Features</h3>
              <p><em>In Short: Our AI features use third-party technology to facilitate personalized interactions. Conversations are processed in real-time and are not stored by our servers.</em></p>
              <p>We use the best AI services available (OpenAI, Claude, Google Gemini, etc.) to provide personalized interview practice and feedback. Any information you choose to share during AI interactions is processed solely to deliver accurate and relevant responses during the session. These AI providers do not retain personal data from API requests; however, we recommend users avoid sharing sensitive or personally identifiable information during AI interactions for your security and privacy.</p>
            </section>

            <section id="legal-bases" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">3. What Legal Bases Do We Rely On to Process Your Personal Information?</h2>
              <p><em>In Short: We only process your personal information when we believe it is necessary and we have a valid legal reason to do so under applicable laws, like with your consent, to comply with laws, to provide you with services to enter into or fulfill our contractual obligations, to protect your rights, or to fulfill our legitimate business interests.</em></p>

              <h3 className="text-xl font-semibold text-gray-800 font-sora">If you are located in the EU or UK, this section applies to you.</h3>
              <p>The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we rely on in order to process your personal information. As such, we may rely on the following legal bases to process your personal information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Consent.</strong> We may process your information if you have given us permission (i.e., consent) to use your personal information for a specific purpose. You can withdraw your consent at any time.</li>
                <li><strong>Legal Obligations.</strong> We may process your information where we believe it is necessary for compliance with our legal obligations, such as to cooperate with a law enforcement body or regulatory agency, exercise or defend our legal rights, or disclose your information as evidence in litigation in which we are involved.</li>
                <li><strong>Vital Interests.</strong> We may process your information where we believe it is necessary to protect your vital interests or the vital interests of a third party, such as situations involving potential threats to the safety of any person.</li>
                <li><strong>Legitimate Interests.</strong> We may process your information when we believe it is reasonably necessary to achieve our legitimate business interests and those interests do not outweigh your interests and fundamental rights and freedoms.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 font-sora">If you are located in Canada, this section applies to you.</h3>
              <p>We may process your information if you have given us specific permission (i.e., express consent) to use your personal information for a specific purpose, or in situations where your permission can be inferred (i.e., implied consent). You can withdraw your consent at any time.</p>
            </section>

            <section id="data-sharing" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">4. When and With Whom Do We Share Your Personal Information?</h2>
              <p><em>In Short: We may share information in specific situations and with specific categories of third parties.</em></p>
              <p><strong>We do not sell your data.</strong> We share information only as necessary with:</p>
              
              <h3 className="text-xl font-semibold text-gray-800 font-sora">Service Providers:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Analytics Providers:</strong> Crash reporting and usage tracking</li>
                <li><strong>Apple & Google:</strong> App store distribution and payment processing</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 font-sora">Legal Requirements:</h3>
              <p>We may disclose your information if required by law or to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Comply with legal processes or government requests</li>
                <li>Protect our rights, property, or safety</li>
                <li>Prevent fraud or security issues</li>
                <li>Protect the rights and safety of our users</li>
                <li>Cooperate with law enforcement or regulatory agencies</li>
                <li>Exercise or defend our legal rights</li>
              </ul>
            </section>

            <section id="third-party-websites" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">5. What Is Our Stance on Third-Party Websites?</h2>
              <p><em>In Short: We are not responsible for the safety of any information that you share with third-party providers who advertise, but are not affiliated with, our Services.</em></p>
              <p>Our app may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies before providing any personal information.</p>
              <p>Third-party services we use include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Apple App Store and Google Play Store</li>
                <li>Payment processors (Apple Pay, Google Pay, Stripe)</li>
                <li>Analytics services</li>
                <li>Cloud storage providers</li>
                <li>AI service providers (OpenAI, Google Gemini, Calude, etc.)</li>
              </ul>
            </section>

            <section id="international-transfers" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">6. Is Your Information Transferred Internationally?</h2>
              <p><em>In Short: We may transfer, store, and process your information in countries other than your own.</em></p>
              <p>Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.</p>
              <p>By using our app, you consent to the transfer of your information to countries that may have different data protection laws than your country of residence.</p>
              <p>We have implemented measures to protect your personal information, including by using the European Commission's Standard Contractual Clauses for transfers of personal information between our group companies and between us and our third-party providers.</p>
            </section>

            <section id="data-retention" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">7. How Long Do We Keep Your Information?</h2>
              <p><em>In Short: We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice, unless otherwise required by law.</em></p>
              <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law (such as for tax, legal, accounting, or other regulatory purposes). The specific retention period depends on the type of data and the purpose for which it was collected.</p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>User Account Data:</strong> We retain this data as long as you maintain an account with us. If you choose to delete your account, all associated data will be permanently deleted within 30 days, except where required for legal or regulatory purposes.</li>
                <li><strong>Payment Data:</strong> We retain this data only for the duration required to complete the transaction or as required for financial records and audit purposes.</li>
                <li><strong>Analytics and Log Data:</strong> We keep this information for up to 12 months to ensure we can monitor app performance, improve our services, and address any issues with user engagement or fraud detection.</li>
                <li><strong>Resume and Practice Data:</strong> Retained while your account is active. Can be deleted at your request.</li>
                <li><strong>Subscription Data:</strong> Retained as required by Apple/Google for billing and compliance purposes.</li>
              </ul>
              <p>Once your personal information is no longer necessary for our legitimate business interests or required by law, we will securely delete, anonymize, or isolate it to prevent further processing.</p>
            </section>

            <section id="data-security" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">8. How Do We Keep Your Information Safe?</h2>
              <p><em>In Short: We aim to protect your personal information through a system of organizational and technical security measures.</em></p>
              <p>We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. These measures are aimed at preventing unauthorized access, disclosure, loss, theft, destruction, or alteration of your data.</p>
              <p>Some of the security measures we use include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure authentication and access controls</li>
                <li>Regular security assessments and updates</li>
                <li>Limited access to personal data on a need-to-know basis</li>
                <li>Secure data centers and infrastructure</li>
                <li>Employee training on data protection</li>
                <li>Firewalls and regular monitoring of our systems</li>
              </ul>
              <p>However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, sblue, or modify your information.</p>
            </section>

            <section id="children-privacy" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">9. Do We Collect Information From Minors?</h2>
              <p>Our app is designed for general audiences, and we prioritize the privacy and safety of all users, including minors.</p>
              <p>We do not knowingly collect personal information from children under the age of 13 where this is restricted by law, such as under the Children's Online Privacy Protection Act (COPPA) in the United States. If we become aware that personal information has been inadvertently collected from a child under the applicable age of consent in their jurisdiction, we will take immediate steps to delete such data.</p>
              <p>Our application does not have an age restriction and can be used by individuals of all ages. We encourage parents or guardians to actively supervise and be involved in the online activities and app usage of their children. If you believe that your child has provided us with personal data without your consent, please contact us at <a href="mailto:hello@mockstars.app" className="text-blue hover:underline">hello@mockstars.app</a>, and we will address your concerns promptly.</p>
            </section>

            <section id="user-rights" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">10. What Are Your Privacy Rights?</h2>
              <p><em>In Short: In some regions, such as the European Economic Area (EEA), United Kingdom (UK), Switzerland, and Canada, you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.</em></p>
              <p>In certain regions (like the EEA, UK, Switzerland, and Canada), you have certain rights under applicable data protection laws. These may include the right:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To request access and obtain a copy of your personal information</li>
                <li>To request rectification or erasure</li>
                <li>To restrict the processing of your personal information</li>
                <li>If applicable, to data portability</li>
                <li>Not to be subject to automated decision-making</li>
                <li>To object to the processing of your personal information</li>
              </ul>
              <p>You can make such a request by contacting us using the contact details provided in the "How Can You Contact Us About This Notice?" section below.</p>
            </section>

            <section id="do-not-track" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">11. Controls for Do-Not-Track Features</h2>
              <p>Most web browsers and some mobile operating systems and applications include a Do-Not-Track ("DNT") feature or setting that you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this time, no uniform standard for recognizing and implementing DNT signals has been adopted, and we do not currently respond to DNT browser signals or other mechanisms that automatically communicate your choice not to be tracked.</p>
              <p>However, if such a standard is adopted, we will update this privacy policy and provide you with details on how we comply with those changes. We encourage users to review this policy regularly to stay informed about our practices regarding online tracking.</p>
            </section>

            <section id="us-residents" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">12. Do United States Residents Have Specific Privacy Rights?</h2>
              <p><em>In short: If you are a resident of California, Colorado, Connecticut, Utah, or Virginia, you are granted specific rights regarding access to your personal information.</em></p>
              <p>We comply with the California Consumer Privacy Act (CCPA) and other applicable laws that grant specific privacy rights to residents of the United States. You can learn more about your rights, such as the right to request access or deletion of your personal information, and how to exercise those rights by contacting us at <a href="mailto:hello@mockstars.app" className="text-blue hover:underline">hello@mockstars.app</a>.</p>
            </section>

            <section id="other-regions" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">13. Do Other Regions Have Specific Privacy Rights?</h2>
              <p><em>In short: You may have additional rights based on the country you reside in.</em></p>
              <p>If you are a resident of other regions, including Australia, New Zealand, or the Republic of South Africa, we will collect and process your personal information in line with the specific legal requirements of your country. You may have the right to request access to, correction of, or deletion of your personal data. If you believe your data has been processed unlawfully, you can file a complaint with the appropriate data protection authority in your country.</p>
            </section>

            <section id="changes" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">14. Do We Make Updates to This Notice?</h2>
              <p><em>In short: Yes, we will update this notice as necessary to stay compliant with relevant laws.</em></p>
              <p>We may update this privacy policy from time to time. The updated version will be indicated by an updated "Last Updated" date, and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy policy, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification.</p>
              <p>We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.</p>
            </section>

            <section id="contact" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">15. How Can You Contact Us About This Notice?</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>If you have questions or comments about this notice, you may email us at <a href="mailto:hello@mockstars.app" className="text-blue hover:underline">hello@mockstars.app</a> or contact us by post at:</p>
                <p><strong>Evergoods Holdings</strong></p>
                <p>971 US HIGHWAY 202N, STE N</p>
                <p>BRANCHBURG, NJ 08876</p>
              </div>
            </section>

            <section id="review-update-delete" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">16. How Can You Review, Update, or Delete the Data We Collect From You?</h2>
              <p>Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, change that information, or delete it. To review or update your personal information, you can access your account settings within the Mockstars app. To delete your personal information completely, you can delete your account through the app's settings.</p>
              <p>Once you delete your account, all associated data will be permanently removed from our systems. If you have any questions or need assistance with managing your data, please contact us at <a href="mailto:hello@mockstars.app" className="text-blue hover:underline">hello@mockstars.app</a>.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
} 