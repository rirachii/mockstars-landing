import JsonLd from "@/components/JsonLd"

export const metadata = {
  title: "About Mockstars — AI Resume, ATS Match, Cover Letters, Behavioral Stories",
  description:
    "Mockstars helps you generate a resume you love, tailor it to a specific job to pass ATS, create a matching cover letter, and craft core behavioral stories—all fast and privacy-first.",
}

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "mainEntity": {
    "@type": "Organization",
    "name": "Mockstars",
    "url": "https://mockstars.app",
    "description": "AI career platform for job-matched resumes, ATS alignment, per-job cover letters, and behavioral story crafting.",
    "foundingDate": "2024",
    "logo": "https://mockstars.app/logo.png",
    "sameAs": [
      "https://twitter.com/mockstarsapp",
      "https://linkedin.com/company/mockstars"
    ],
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Resume Generator",
          "description": "Create a clean, professional resume in the template and style you prefer."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "ATS Job Match",
          "description": "Paste a job description or link; get a tailored resume aligned to that role to improve callback rates."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Per-Job Cover Letter",
          "description": "Generate a concise, role-specific cover letter that mirrors the resume’s focus."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Behavioral Stories Pack",
          "description": "Craft core STAR stories from your experience for the most common behavioral questions."
        }
      }
    ]
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem","position": 1,"name": "Home","item": "https://mockstars.app/"},
      {"@type": "ListItem","position": 2,"name": "About","item": "https://mockstars.app/about"}
    ]
  }
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Mockstars in one sentence?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mockstars is an AI career platform that generates a resume you love, tailors it to a specific job to pass ATS, creates a matching cover letter, and crafts core behavioral stories."
      }
    },
    {
      "@type": "Question",
      "name": "How does ATS matching work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paste a job description or link and Mockstars aligns your resume’s language, skills, and achievements to the role—keeping truth intact while improving relevance and screening scores."
      }
    },
    {
      "@type": "Question",
      "name": "Will you change my content or just format it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We help restructure, clarify, and job-match your real experience. You approve every change, and you can revert anytime."
      }
    },
    {
      "@type": "Question",
      "name": "Can you generate a per-job cover letter?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes—Mockstars produces a concise cover letter that mirrors your tailored resume and the job’s priorities."
      }
    },
    {
      "@type": "Question",
      "name": "How are behavioral stories created?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We extract impact from your past roles and frame them as STAR stories (Situation, Task, Action, Result) for common behavioral questions."
      }
    },
    {
      "@type": "Question",
      "name": "Is my data private?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Your content is encrypted, never sold, and fully under your control—export or delete anytime."
      }
    }
  ]
}

export default function AboutPage() {
  return (
    <div className="min-h-screen text-gray-800 font-outfit relative z-10">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <JsonLd data={aboutJsonLd} />
          <JsonLd data={faqJsonLd} />

          <h1 className="text-3xl md:text-4xl font-bold mb-6 font-mattone">
            About Mockstars
          </h1>

          {/* KEY POINTS — answer-first and liftable */}
          {/* <section className="mb-10 border rounded-xl p-5 bg-white/70">
            <h2 className="text-xl md:text-2xl font-bold font-mattone mb-3">Key Points</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Direct answer:</strong> Build a resume you love, tailor it to a specific job to pass ATS, add a matching cover letter, and package core behavioral stories.</li>
              <li><strong>Job-matched outputs:</strong> Paste a job description or link; get a resume + cover letter aligned to that role.</li>
              <li><strong>Behavioral stories:</strong> Your experience → clear STAR answers for common questions.</li>
              <li><strong>Template control:</strong> Choose designs you like; keep reusable versions for future roles.</li>
              <li><strong>Privacy-first:</strong> Encrypted, no data sales, export/delete anytime.</li>
            </ul>
          </section> */}

          {/* WHAT IS MOCKSTARS */}
          <section className="space-y-3 mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 font-mattone">What is Mockstars?</h2>
            <p className="text-gray-700">
              Mockstars is an AI platform that helps you generate a resume in the style you want, tailor it to a specific job so it passes ATS, produce a matching cover letter, and craft core behavioral stories you can use in interviews.
            </p>
            <p className="italic text-zinc-500">“From blank page to job-matched resume, cover letter, and interview stories—fast.”</p>
          </section>

          {/* CORE CAPABILITIES — the 4 pillars */}
          <section className="space-y-6 mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 font-mattone">Core Capabilities</h2>
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-bold text-gray-800 font-mattone mb-2">1) Resume Generator</h3>
                <p className="text-gray-700">Pick a template you like and generate a clean, professional resume. Keep style control and export anytime.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 font-mattone mb-2">2) ATS Job Match</h3>
                <p className="text-gray-700">Paste a job description or link. We align your resume’s language, skills, and achievements to the role—truthful, targeted, and screening-friendly.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 font-mattone mb-2">3) Per-Job Cover Letter</h3>
                <p className="text-gray-700">Generate a concise cover letter that mirrors the tailored resume and highlights the employer’s top priorities.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 font-mattone mb-2">4) Behavioral Stories Pack</h3>
                <p className="text-gray-700">Turn your experience into STAR stories for common behavioral questions (teamwork, conflict, leadership, results).</p>
              </div>
            </div>
          </section>

          {/* HOW IT WORKS — simple, decision-grade */}
          <section className="space-y-4 mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 font-mattone">How it works</h2>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li><strong>Start:</strong> Import a resume or start from scratch; pick your preferred template.</li>
              <li><strong>Target:</strong> Paste a job description or link. We job-match your resume and generate a matching cover letter.</li>
              <li><strong>Prepare:</strong> Get a behavioral stories pack (STAR) built from your experience for the most asked questions.</li>
            </ol>
          </section>

          {/* WHO IT’S FOR */}
          <section className="space-y-6 mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 font-mattone">Who is this for?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-gray-800 font-mattone mb-3">🎓 Students & New Grads</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Need a solid resume fast—in a template recruiters recognize.</li>
                  <li>Want per-job tailoring to get past ATS and into interviews.</li>
                  <li>Need basic behavioral stories that actually sound like you.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 font-mattone mb-3">💼 Working Professionals</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Switching roles or industries and need a targeted resume.</li>
                  <li>Prefer concise cover letters that match the job’s priorities.</li>
                  <li>Want STAR stories ready for common behavioral questions.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* WHY CHOOSE — decision-grade differentiators */}
          <section className="space-y-5 mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 font-mattone">Why choose Mockstars?</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Job-matched outputs:</strong> Resume + cover letter aligned to the exact role.</li>
              <li><strong>Template you control:</strong> Keep your preferred look; reuse and iterate quickly.</li>
              <li><strong>Behavioral story engine:</strong> Clear STAR narratives pulled from your real experience.</li>
              <li><strong>Privacy-first:</strong> Encrypted, no data sales, export/delete anytime.</li>
            </ul>
          </section>

          {/* PRIVACY/TRUST */}
          <section className="space-y-5 mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 font-mattone">What we value</h2>
            <div className="grid md:grid-cols-3 gap-6 text-gray-700">
              <div>
                <h3 className="text-lg font-bold text-gray-800 font-mattone mb-2">Clarity</h3>
                <p>Direct outcomes: resume you love, ATS match, cover letter, behavioral stories.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 font-mattone mb-2">Control</h3>
                <p>Your content, your template, your approvals—always reversible.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 font-mattone mb-2">Privacy</h3>
                <p>Encrypted, never sold, easy export/delete.</p>
              </div>
            </div>
          </section>

          {/* FAQs (mirrors JSON-LD) */}
          <section className="space-y-4 mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 font-mattone">FAQs</h2>
            <div className="space-y-3 text-gray-700">
              <details><summary className="font-semibold">What is Mockstars in one sentence?</summary><p>AI that generates a resume you love, tailors it to a job to pass ATS, adds a matching cover letter, and crafts core behavioral stories.</p></details>
              <details><summary className="font-semibold">How does ATS matching work?</summary><p>Paste a job description or link; your resume is aligned to the role’s language, skills, and priorities—truthful, targeted, and screening-friendly.</p></details>
              <details><summary className="font-semibold">Do you rewrite my experience?</summary><p>We clarify and organize your true impact; you approve changes and can revert anytime.</p></details>
              <details><summary className="font-semibold">Can you create a per-job cover letter?</summary><p>Yes—generated to mirror the tailored resume and employer priorities.</p></details>
              <details><summary className="font-semibold">How are behavioral stories built?</summary><p>We extract impact from your background and frame STAR stories for the most common behavioral questions.</p></details>
              <details><summary className="font-semibold">Is my data private?</summary><p>Yes. Encrypted, never sold, and you can export or delete anytime.</p></details>
            </div>
          </section>

          {/* CTA */}
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 font-mattone">Get in touch</h2>
            <p className="text-gray-700">Questions or feedback? We read every message.</p>
            <p className="italic text-zinc-400">Mockstars — where your experience becomes your advantage.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
