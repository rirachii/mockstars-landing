import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Star } from "lucide-react"
import JsonLd from "@/components/JsonLd"

export const metadata = {
  title: "Mockstars Pricing - AI Interview Practice Plans",
  description: "Choose the perfect plan for your interview preparation. Mockstars Pro offers AI-powered feedback, unlimited practice sessions, and comprehensive interview training at affordable prices.",
  alternates: {
    canonical: "https://mockstars.app/pricing"
  }
}

export default function PricingPage() {
  return (
    <div className="min-h-screen text-gray-800 font-outfit relative z-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Mockstars Pro",
          description: "AI-powered interview preparation platform with personalized feedback and comprehensive training modules",
          category: "Software",
          brand: {
            "@type": "Brand",
            name: "Mockstars"
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            reviewCount: "127",
            bestRating: "5",
            worstRating: "1"
          },
          review: [
            {
              "@type": "Review",
              reviewRating: {
                "@type": "Rating",
                ratingValue: "5",
                bestRating: "5"
              },
              author: {
                "@type": "Person",
                name: "Sarah Johnson"
              },
              reviewBody: "Mockstars helped me land my dream job! The AI feedback was incredibly helpful and the practice sessions were realistic."
            },
            {
              "@type": "Review",
              reviewRating: {
                "@type": "Rating",
                ratingValue: "5",
                bestRating: "5"
              },
              author: {
                "@type": "Person",
                name: "Michael Chen"
              },
              reviewBody: "The personalized feedback and comprehensive training modules made all the difference in my interview preparation."
            }
          ],
          offers: [
            {
              "@type": "Offer",
              name: "Weekly Pro",
              price: "9.99",
              priceCurrency: "USD",
              priceValidUntil: "2025-12-31",
              availability: "https://schema.org/InStock",
              hasMerchantReturnPolicy: {
                "@type": "MerchantReturnPolicy",
                applicableCountry: "US",
                returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
                merchantReturnDays: 7,
                returnMethod: "https://schema.org/ReturnByMail",
                returnFees: "https://schema.org/FreeReturn"
              },
              shippingDetails: {
                "@type": "OfferShippingDetails",
                shippingRate: {
                  "@type": "MonetaryAmount",
                  value: "0",
                  currency: "USD"
                },
                deliveryTime: {
                  "@type": "ShippingDeliveryTime",
                  handlingTime: {
                    "@type": "QuantitativeValue",
                    minValue: 0,
                    maxValue: 0,
                    unitCode: "DAY"
                  },
                  transitTime: {
                    "@type": "QuantitativeValue",
                    minValue: 0,
                    maxValue: 0,
                    unitCode: "DAY"
                  }
                }
              }
            },
            {
              "@type": "Offer",
              name: "Monthly Pro",
              price: "19.99",
              priceCurrency: "USD",
              priceValidUntil: "2025-12-31",
              availability: "https://schema.org/InStock",
              hasMerchantReturnPolicy: {
                "@type": "MerchantReturnPolicy",
                applicableCountry: "US",
                returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
                merchantReturnDays: 30,
                returnMethod: "https://schema.org/ReturnByMail",
                returnFees: "https://schema.org/FreeReturn"
              },
              shippingDetails: {
                "@type": "OfferShippingDetails",
                shippingRate: {
                  "@type": "MonetaryAmount",
                  value: "0",
                  currency: "USD"
                },
                deliveryTime: {
                  "@type": "ShippingDeliveryTime",
                  handlingTime: {
                    "@type": "QuantitativeValue",
                    minValue: 0,
                    maxValue: 0,
                    unitCode: "DAY"
                  },
                  transitTime: {
                    "@type": "QuantitativeValue",
                    minValue: 0,
                    maxValue: 0,
                    unitCode: "DAY"
                  }
                }
              }
            },
            {
              "@type": "Offer", 
              name: "6-Month Pro",
              price: "29.99",
              priceCurrency: "USD",
              priceValidUntil: "2025-12-31",
              availability: "https://schema.org/InStock",
              hasMerchantReturnPolicy: {
                "@type": "MerchantReturnPolicy",
                applicableCountry: "US",
                returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
                merchantReturnDays: 30,
                returnMethod: "https://schema.org/ReturnByMail",
                returnFees: "https://schema.org/FreeReturn"
              },
              shippingDetails: {
                "@type": "OfferShippingDetails",
                shippingRate: {
                  "@type": "MonetaryAmount",
                  value: "0",
                  currency: "USD"
                },
                deliveryTime: {
                  "@type": "ShippingDeliveryTime",
                  handlingTime: {
                    "@type": "QuantitativeValue",
                    minValue: 0,
                    maxValue: 0,
                    unitCode: "DAY"
                  },
                  transitTime: {
                    "@type": "QuantitativeValue",
                    minValue: 0,
                    maxValue: 0,
                    unitCode: "DAY"
                  }
                }
              }
            }
          ]
        }}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold font-mattone">Mockstars Pricing</h1>
            <p className="text-xl text-gray-600 font-outfit max-w-3xl">
              AI-Powered Interview Preparation That Fits Your Budget. Choose between weekly, monthly, or 6-month billing options to match your needs.
            </p>
          </div>


          {/* Pricing Plans */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold font-mattone">Choose Your Plan</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Weekly Plan */}
              <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 shadow-lg">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold font-mattone mb-2">Weekly Pro</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-blue font-mattone">$9.99</span>
                      <span className="text-gray-600 font-outfit">/ week</span>
                    </div>
                    <p className="text-sm text-gray-600 font-outfit mt-2">
                      Perfect for short-term prep
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-blue" />
                      <span className="font-outfit text-gray-700">Full access to all Pro features</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-blue" />
                      <span className="font-outfit text-gray-700">Unlimited practice sessions</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-blue" />
                      <span className="font-outfit text-gray-700">AI-powered feedback</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-blue" />
                      <span className="font-outfit text-gray-700">Cancel anytime</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Monthly Plan */}
              <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 shadow-lg">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold font-mattone mb-2">Monthly Pro</h3>
                                          <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-blue font-mattone">$19.99</span>
                        <span className="text-gray-600 font-outfit">/ month</span>
                      </div>
                    <p className="text-sm text-gray-600 font-outfit mt-2">
                      Web Special: $13.99/month
                    </p>
                  </div>
                  
                                      <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-blue" />
                        <span className="font-outfit text-gray-700">Full access to all Pro features</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-blue" />
                        <span className="font-outfit text-gray-700">Unlimited practice sessions</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-blue" />
                        <span className="font-outfit text-gray-700">AI-powered feedback</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-blue" />
                        <span className="font-outfit text-gray-700">Cancel anytime</span>
                      </div>
                    </div>
             
                </div>
              </div>

              {/* 6-Month Plan - Best Value */}
              <div className="bg-white/60 backdrop-blur-sm border-2 border-blue rounded-2xl p-8 relative shadow-lg">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue text-white px-4 py-1 rounded-full text-sm font-mattone">
                    Best Value
                  </span>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold font-mattone mb-2">6-Month Pro</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-blue font-mattone">$29.99</span>
                      <span className="text-gray-600 font-outfit">/ 6 months</span>
                    </div>
                    <p className="text-sm text-gray-600 font-outfit mt-1">
                      Billed every 6 months
                    </p>
                    <p className="text-sm text-blue font-outfit mt-1">
                      Best value for long-term prep
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-blue" />
                      <span className="font-outfit text-gray-700">All Pro features included</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-blue" />
                      <span className="font-outfit text-gray-700">12 months unlimited access</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-blue" />
                      <span className="font-outfit text-gray-700">Best value for serious prep</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-blue" />
                      <span className="font-outfit text-gray-700">Priority support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What's Included */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold font-mattone">Everything You Need to Succeed</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold font-mattone text-blue">Interview Modules</h3>
                <ul className="space-y-2 text-gray-600 font-outfit">
                  <li>• Comprehensive question database</li>
                  <li>• Industry-specific content</li>
                  <li>• Behavioral & technical questions</li>
                  <li>• Mock interview sessions</li>
                  <li>• STAR method practice</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold font-mattone text-blue">AI Feedback & Insights</h3>
                <ul className="space-y-2 text-gray-600 font-outfit">
                  <li>• AI-powered analysis</li>
                  <li>• Voice analysis & scoring</li>
                  <li>• Performance metrics</li>
                  <li>• Improvement suggestions</li>
                  <li>• Resume-based questions</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold font-mattone text-blue">Progress Tracking</h3>
                <ul className="space-y-2 text-gray-600 font-outfit">
                  <li>• Visual progress charts</li>
                  <li>• Performance analytics</li>
                  <li>• Goal setting & tracking</li>
                  <li>• Practice reminders</li>
                  <li>• Success metrics</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Value Proposition */}
          <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold font-mattone mb-6">Why Mockstars Pro Pays for Itself</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-bold font-mattone text-blue">Return on Investment</h3>
                <ul className="space-y-3 text-gray-700 font-outfit">
                  <li>• Users report significant salary improvements</li>
                  <li>• Higher interview-to-offer conversion rates</li>
                  <li>• Reduce preparation time significantly</li>
                  <li>• Faster progression to target roles</li>
                </ul>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-xl font-bold font-mattone text-blue">Cost Comparison</h3>
                <div className="space-y-3 text-gray-700 font-outfit">
                  <div className="flex justify-between">
                    <span>Professional Coach</span>
                    <span className="text-gray-600">$100-200/hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Career Coaching</span>
                    <span className="text-gray-600">$1,000-5,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Prep Bootcamps</span>
                    <span className="text-gray-600">$500-2,000</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-3">
                    <span className="font-bold">Mockstars Pro 6-Month</span>
                    <span className="text-blue font-bold">$5/month</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold font-mattone">Frequently Asked Questions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold font-mattone mb-2">Can I cancel my subscription anytime?</h3>
                  <p className="text-zinc-400 font-outfit">
                    Yes, you can cancel your subscription at any time through your account settings with no penalties.
                  </p>
                </div>
                
                
                <div>
                  <h3 className="text-lg font-bold font-mattone mb-2">Do you offer refunds?</h3>
                  <p className="text-zinc-400 font-outfit">
                    Yes, we offer refunds in accordance with app store policies. Contact our support team for assistance.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold font-mattone mb-2">How accurate is the AI feedback?</h3>
                  <p className="text-zinc-400 font-outfit">
                    Our AI has been trained on thousands of successful interviews and provides feedback comparable to professional coaches.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold font-mattone mb-2">Is my data secure?</h3>
                  <p className="text-zinc-400 font-outfit">
                    Yes, we use enterprise-grade encryption and never share your personal information with third parties.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold font-mattone mb-2">Which devices are supported?</h3>
                  <p className="text-zinc-400 font-outfit">
                    Mockstars works on iOS 15+, with progress syncing across all your devices.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue/10 to-blue/20 border border-blue/20 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold font-mattone mb-4">Ready to Ace Your Next Interview?</h2>
            <p className="text-xl text-gray-700 font-outfit mb-8">
              Choose your plan today and experience the power of AI-driven interview preparation.
            </p>
            
            <p className="text-sm text-gray-600 font-outfit mt-4">
              No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 