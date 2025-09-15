"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"

export default function Terms() {
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "agreement", "intellectual-property", "user-representations", "eligibility", 
        "accounts", "subscriptions", "user-content", "user-generated-contributions", 
        "contribution-license", "privacy-policy", "acceptable-use", "prohibited-activities", 
        "mobile-app-license", "third-party-content", "advertisers", "app-management", 
        "termination", "modifications", "disclaimers", "limitation-liability", 
        "dispute-resolution", "governing-law", "contact"
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
    { id: "agreement", title: "Agreement to Terms" },
    { id: "intellectual-property", title: "Intellectual Property Rights" },
    { id: "user-representations", title: "User Representations" },
    { id: "eligibility", title: "Eligibility" },
    { id: "accounts", title: "Accounts" },
    { id: "subscriptions", title: "Subscriptions & Payments" },
    { id: "user-content", title: "User Content" },
    { id: "user-generated-contributions", title: "User Generated Contributions" },
    { id: "contribution-license", title: "Contribution License" },
    { id: "privacy-policy", title: "Privacy Policy" },
    { id: "acceptable-use", title: "Acceptable Use" },
    { id: "prohibited-activities", title: "Prohibited Activities" },
    { id: "mobile-app-license", title: "Mobile Application License" },
    { id: "third-party-content", title: "Third-Party Content" },
    { id: "advertisers", title: "Advertisers" },
    { id: "app-management", title: "App Management" },
    { id: "termination", title: "Termination" },
    { id: "modifications", title: "Modifications and Interruptions" },
    { id: "disclaimers", title: "Disclaimers" },
    { id: "limitation-liability", title: "Limitation of Liability" },
    { id: "dispute-resolution", title: "Dispute Resolution" },
    { id: "governing-law", title: "Governing Law" },
    { id: "contact", title: "Contact Us" }
  ]

  return (
    <div className="min-h-screen text-gray-800 font-outfit relative z-10">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 font-sora">Terms of Service – Mockstars</h1>
          
          <div className="space-y-6 text-gray-600">
          <div className="bg-gray-50 p-4 rounded-lg">
              <p><strong>Effective Date:</strong> September 15, 2025</p>
              <p><strong>Last Updated:</strong> September 15, 2025</p>
              <p className="mt-2">These Terms of Service ("Terms") govern your use of the Mockstars mobile application ("App"). <br />Mockstars is provided by Evergoods Holdings ("we," "our," or "us"). By using the App, you agree to these Terms.</p>
            </div>
            
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

            <section id="agreement" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">1. Agreement to Terms</h2>
              <p>These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Evergoods Holdings, doing business as Mockstars ("Company," "we," "us," or "our"), concerning your access to and use of the Mockstars mobile application as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "App").</p>
              <p>You agree that by accessing the App, you have read, understood, and agreed to be bound by all of these Terms of Service. <strong>IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF SERVICE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE APP AND YOU MUST DISCONTINUE USE IMMEDIATELY.</strong></p>
            </section>

            <section id="intellectual-property" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">2. Intellectual Property Rights</h2>
              <p>Unless otherwise indicated, the App is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the App (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the United States, international copyright laws, and international conventions.</p>
              <p>The Content and Marks are provided in or through the App "AS IS" for your personal, non-commercial use or internal business purpose only.</p>
            </section>

            <section id="user-representations" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">3. User Representations</h2>
              <p>By using the App, you represent and warrant that:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>you have the legal capacity and you agree to comply with these Terms of Service;</li>
                <li>you are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use the App;</li>
                <li>you will not access the App through automated or non-human means, whether through a bot, script, or otherwise;</li>
                <li>you will not use the App for any illegal or unauthorized purpose; and</li>
                <li>your use of the App will not violate any applicable law or regulation.</li>
              </ul>
            </section>

            <section id="eligibility" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">4. Eligibility</h2>
              <p>The App is intended primarily for users 18 and older preparing for interviews.</p>
              <p>If you are under 14, you represent that you have your parent's or guardian's permission to use the App. If you are a parent or guardian and you allow your child to use the App, you agree to be bound by these Terms of Service with respect to your child's use of the App.</p>
            </section>

            <section id="accounts" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">5. Accounts</h2>
              <p>You must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your login credentials. You may log in using Apple Sign-In, or Google Sign-In.</p>
              <p>You agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate, current, and complete information during the registration process</li>
                <li>Maintain and promptly update your account information to keep it accurate, current, and complete</li>
                <li>Maintain the security of your password and identification</li>
                <li>Accept responsibility for all activities that occur under your account or password</li>
                <li>Notify us immediately of any unauthorized use of your account or any other breach of security</li>
                <li>Ensure that you exit from your account at the end of each session</li>
              </ul>
            </section>

            <section id="subscriptions" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">6. Subscriptions & Payments</h2>
              <p>Access to Mockstars requires a paid subscription. We offer weekly, monthly, and annual plans. Payments are processed via Apple In-App Purchases or Google Play Billing. Refunds are handled in accordance with Apple/Google policies. Promotional offers may be made at our discretion.</p>
              <p>Additional terms:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All fees are non-refundable except as required by law</li>
                <li>Subscription fees are charged in advance on a recurring basis</li>
                <li>You may cancel your subscription at any time through your device's subscription settings</li>
                <li>We reserve the right to change our pricing with 30 days' notice</li>
                <li>Free trials may be offered and are subject to these Terms</li>
                <li>You are responsible for any applicable taxes</li>
              </ul>
            </section>

            <section id="user-content" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">7. User Content</h2>
              <p>You retain ownership of your resume, stories, and practice recordings. By using the App, you grant us a limited license to process and analyze your content solely for providing services. AI-generated stories based on your input are owned by you. We do not publicly share your content.</p>
              <p>You represent and warrant that:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You own or have the necessary rights to all content you submit</li>
                <li>Your content does not infringe any third-party rights</li>
                <li>Your content is not defamatory, obscene, or otherwise objectionable</li>
                <li>Your content does not contain viruses or other harmful components</li>
              </ul>
            </section>

            {/* <section id="user-generated-contributions" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">8. User Generated Contributions</h2>
              <p>The App may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the App, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions").</p>
              <p>Contributions may be viewable by other users of the App and through third-party websites. As such, any Contributions you transmit may be treated as non-confidential and non-proprietary.</p>
            </section> */}

            {/* <section id="contribution-license" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">9. Contribution License</h2>
              <p>By posting your Contributions to any part of the App, you automatically grant, and you represent and warrant that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and license to host, use, copy, reproduce, disclose, sell, resell, publish, broadcast, retitle, archive, store, cache, publicly perform, publicly display, reformat, translate, transmit, excerpt (in whole or in part), and distribute such Contributions (including, without limitation, your image and voice) for any purpose, commercial, advertising, or otherwise, and to prepare derivative works of, or incorporate into other works, such Contributions, and grant and authorize sublicenses of the foregoing.</p>
            </section> */}

            <section id="privacy-policy" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">8. Privacy Policy</h2>
              <p>We care about data privacy and security. Please review our Privacy Policy: <Link href="/privacy" className="text-blue hover:underline">/privacy</Link>. By using the App, you agree to be bound by our Privacy Policy, which is incorporated into these Terms of Service.</p>
              <p>We may collect, use, and share your information as described in our Privacy Policy, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal information you provide directly</li>
                <li>Usage data and analytics</li>
                <li>Device information and identifiers</li>
                <li>Content you create or upload</li>
              </ul>
            </section>

            <section id="acceptable-use" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">9. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the App for unlawful or fraudulent purposes</li>
                <li>Upload harmful, offensive, or infringing content</li>
                <li>Attempt to reverse-engineer or disrupt the App's functionality</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Interfere with or disrupt the App or servers connected to the App</li>
                <li>Use the App to harass, abuse, or harm others</li>
              </ul>
            </section>

            <section id="prohibited-activities" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">10. Prohibited Activities</h2>
              <p>You may not access or use the App for any purpose other than that for which we make the App available. The App may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>
              <p>As a user of the App, you agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Systematically retrieve data or other content from the App to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us</li>
                <li>Make any unauthorized use of the App, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses</li>
                <li>Use a buying agent or purchasing agent to make purchases on the App</li>
                <li>Use the App to advertise or offer to sell goods and services</li>
                <li>Circumvent, disable, or otherwise interfere with security-related features of the App</li>
                <li>Engage in unauthorized framing of or linking to the App</li>
                <li>Make improper use of our support services or submit false reports of abuse or misconduct</li>
                <li>Interfere with, disrupt, or create an undue burden on the App or the networks or services connected to the App</li>
                <li>Sell or otherwise transfer your profile</li>
                <li>Use any information obtained from the App in order to harass, abuse, or harm another person</li>
                <li>Use the App as part of any effort to compete with us or otherwise use the App and/or the Content for any revenue-generating endeavor or commercial enterprise</li>
                <li>Decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the App</li>
                <li>Attempt to bypass any measures of the App designed to prevent or restrict access to the App, or any portion of the App</li>
                <li>Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the App to you</li>
                <li>Delete the copyright or other proprietary rights notice from any Content</li>
                <li>Copy or adapt the App's software, including but not limited to Flash, PHP, HTML, JavaScript, or other code</li>
                <li>Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party's uninterrupted use and enjoyment of the App or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the App</li>
                <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the App</li>
                <li>Use the App in a manner inconsistent with any applicable laws or regulations</li>
              </ul>
            </section>

            <section id="mobile-app-license" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">11. Mobile Application License</h2>
              <h3 className="text-xl font-semibold text-gray-800 font-sora">Use License</h3>
              <p>If you access the Services via the App, then we grant you a revocable, non-exclusive, non-transferable, limited right to install and use the App on wireless electronic devices owned or controlled by you, and to access and use the App on such devices strictly in accordance with the terms and conditions of this mobile application license contained in these Legal Terms.</p>
              <p>You shall not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Except as permitted by applicable law, decompile, reverse engineer, disassemble, attempt to derive the source code of, or decrypt the App</li>
                <li>Make any modification, adaptation, improvement, enhancement, translation, or derivative work from the App</li>
                <li>Violate any applicable laws, rules, or regulations in connection with your access or use of the App</li>
                <li>Remove, alter, or obscure any proprietary notice (including any notice of copyright or trademark) posted by us or the licensors of the App</li>
                <li>Use the App for any revenue-generating endeavor, commercial enterprise, or other purpose for which it is not designed or intended</li>
                <li>Make the App available over a network or other environment permitting access or use by multiple devices or users at the same time</li>
                <li>Use the App for creating a product, service, or software that is, directly or indirectly, competitive with or in any way a substitute for the App</li>
                <li>Use the App to send automated queries to any website or to send any unsolicited commercial email</li>
                <li>Use any proprietary information or any of our interfaces or our other intellectual property in the design, development, manufacture, licensing, or distribution of any applications, accessories, or devices for use with the App</li>
              </ul>
            </section>

            <section id="third-party-content" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">12. Third-Party Content</h2>
              <p>The Services may contain (or you may be sent via the App) links to other websites ("Third-Party Websites") as well as articles, photographs, text, graphics, pictures, designs, music, sound, video, information, applications, software, and other content or items belonging to or originating from third parties ("Third-Party Content"). Such Third-Party Websites and Third-Party Content are not investigated, monitored, or checked for accuracy, appropriateness, or completeness by us, and we are not responsible for any Third-Party Websites accessed through the Services or any Third-Party Content posted on, available through, or installed from the Services.</p>
              <p>Inclusion of, linking to, or permitting the use or installation of any Third-Party Websites or any Third-Party Content does not imply approval or endorsement thereof by us. If you decide to leave the Services and access the Third-Party Websites or to use or install any Third-Party Content, you do so at your own risk, and you should be aware these Legal Terms no longer govern.</p>
            </section>

            <section id="advertisers" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">13. Advertisers</h2>
              <p>Currently, we do not allow advertisers to display advertisements on our Services. However, this policy may change in the future. If we decide to introduce advertising, it would be in certain areas of the Services, such as sidebar advertisements or banner advertisements. In such a case, we would simply provide the space to place advertisements, without having any other relationship with advertisers. We will update these terms accordingly if our advertising policy changes.</p>
            </section>

            <section id="app-management" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">14. App Management</h2>
              <p>We reserve the right, but not the obligation, to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Monitor the App for violations of these Terms of Service</li>
                <li>Take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms of Service, including without limitation, reporting such user to law enforcement authorities</li>
                <li>In our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof</li>
                <li>In our sole discretion and without limitation, notice, or liability, to remove from the App or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems</li>
                <li>Otherwise manage the App in a manner designed to protect our rights and property and to facilitate the proper functioning of the App</li>
              </ul>
            </section>

            <section id="termination" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">15. Termination</h2>
              <p>These Terms of Service shall remain in full force and effect while you use the App. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF SERVICE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE APP (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE TERMS OF SERVICE OR OF ANY APPLICABLE LAW OR REGULATION.</p>
              <p>We may terminate your use or participation in the App or delete your account and any content or information that you posted at any time, without warning, in our sole discretion.</p>
              <p>You may delete your account at any time via Settings or by contacting us at <a href="mailto:hello@mockstars.app" className="text-blue hover:underline">hello@mockstars.app</a>.</p>
            </section>

            <section id="modifications" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">16. Modifications and Interruptions</h2>
              <p>We reserve the right to change, modify, or remove the contents of the App at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our App. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the App.</p>
              <p>We cannot guarantee the App will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the App, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the App at any time or for any reason without notice to you.</p>
            </section>

            <section id="disclaimers" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">17. Disclaimers</h2>
              <p>THE APP IS PROVIDED ON AN "AS-IS" AND "AS AVAILABLE" BASIS. YOU AGREE THAT YOUR USE OF THE APP AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE APP AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
              <p>We make no warranties or representations about the accuracy or completeness of the App's content or the content of any websites linked to the App and we will assume no liability or responsibility for any:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Errors, mistakes, or inaccuracies of content and materials</li>
                <li>Personal injury or property damage, of any nature whatsoever, resulting from your access to and use of the App</li>
                <li>Any unauthorized access to or use of our secure servers and/or any and all personal information and/or financial information stored therein</li>
                <li>Any interruption or cessation of transmission to or from the App</li>
                <li>Any bugs, viruses, trojan horses, or the like, which may be transmitted to or through the App by any third party</li>
                <li>Any errors or omissions in any content and materials or for any loss or damage of any kind incurred as a result of the use of any content posted, transmitted, or otherwise made available via the App</li>
              </ul>
              <p><strong>No Guarantee of Results:</strong> Mockstars provides tools and techniques to potentially aid in interview preparation and career development, but we make no guarantees or warranties regarding the effectiveness of these methods. We do not guarantee any specific interview outcomes or job offers. Results may vary significantly between individuals.</p>
            </section>

            <section id="limitation-liability" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">18. Limitation of Liability</h2>
              <p>IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE APP, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
              <p>NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY, BY YOU TO US FOR THE APP DURING THE SIX (6) MONTH PERIOD PRIOR TO ANY CAUSE OF ACTION ARISING.</p>
              <p>To the maximum extent permitted by law, Evergoods Holdings is not liable for indirect, incidental, or consequential damages arising from use of the App.</p>
            </section>

            <section id="dispute-resolution" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">19. Dispute Resolution</h2>
              <p>You agree to irrevocably submit all disputes related to these Terms of Service or the relationship established by this agreement to the jurisdiction of the courts. We also maintain the right to bring proceedings as to the substance of the matter in the courts of the country where you reside or, if these Terms of Service are entered into in the course of your trade or profession, the state of your principal place of business.</p>
              <p>Any legal action of whatever nature brought by either you or us against the other will be commenced or prosecuted in the state and federal courts located in New Jersey, and you hereby consent to, and waive all defenses of lack of personal jurisdiction and forum non conveniens with respect to venue and jurisdiction in such state and federal courts.</p>
            </section>

            <section id="governing-law" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">20. Governing Law</h2>
              <p>These Terms of Service and your use of the App are governed by and construed in accordance with the laws of the State of New Jersey, United States, without regard to its conflict of law principles.</p>
            </section>

            <section id="contact" className="space-y-4 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-800 font-sora">21. Contact Us</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Evergoods Holdings</strong></p>
                <p>971 US HIGHWAY 202N, STE N</p>
                <p>BRANCHBURG, NJ 08876</p>
                <p>Email: <a href="mailto:hello@mockstars.app" className="text-blue hover:underline">hello@mockstars.app</a></p>
              </div>
              <p>For any questions regarding these Terms of Service, please contact us using the information above.</p>
            </section>

          </div>
        </div>
      </div>
    </div>
  )
} 