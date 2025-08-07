'use client'

interface CTAProps {
  title?: string
  subtitle?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
  showSecondaryButton?: boolean
}

export default function CTA({
  title = "Ready to Ace Your Next Interview?",
  subtitle = "Join thousands of professionals who've transformed their interview skills with MockStars.",
  primaryButtonText = "Start Practicing Today",
  secondaryButtonText = "Download App",
  onPrimaryClick,
  onSecondaryClick,
  showSecondaryButton = true
}: CTAProps) {
  const handlePrimaryClick = () => {
    if (onPrimaryClick) {
      onPrimaryClick()
    } else {
      // Default behavior - scroll to download section or navigate to app
      const downloadSection = document.getElementById('download')
      if (downloadSection) {
        downloadSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const handleSecondaryClick = () => {
    if (onSecondaryClick) {
      onSecondaryClick()
    } else {
      // Default behavior - open app store
      window.open('https://apps.apple.com/app/mockstars/id6746141593', '_blank')
    }
  }

  return (
    <section className="py-16 bg-gradient-to-r from-blue to-purple relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-mattone">
            {title}
          </h2>
          <p className="text-xl text-white/90 mb-8 font-outfit">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handlePrimaryClick}
              className="bg-white text-blue px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors font-outfit"
            >
              {primaryButtonText}
            </button>
            {showSecondaryButton && (
              <button 
                onClick={handleSecondaryClick}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors font-outfit"
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
