// Demo file to test the text parser functionality
import { parseResumeText } from './text-parser'

const sampleResumeText = `John Smith
Software Engineer
john.smith@email.com
(555) 123-4567
San Francisco, CA
https://linkedin.com/in/johnsmith
https://github.com/johnsmith

SUMMARY
Experienced software engineer with 5+ years developing scalable web applications. Passionate about clean code and mentoring junior developers. Led teams that delivered projects improving user engagement by 40%.

EXPERIENCE
Senior Software Engineer at TechCorp
Jan 2022 - Present
San Francisco, CA
• Led development of microservices architecture serving 2M+ daily users
• Mentored 5 junior engineers and implemented code review processes
• Designed real-time analytics dashboard using React and WebSocket
• Collaborated with product team to deliver 15+ features ahead of schedule

Software Engineer at StartupXYZ
June 2020 - Dec 2021
Remote
• Developed RESTful APIs handling 100K+ requests per day using Python
• Implemented automated testing suite with 90% code coverage
• Built responsive web application with React and TypeScript
• Optimized database queries improving performance by 40%

EDUCATION
Bachelor of Science in Computer Science
University of California, Berkeley
2018
GPA: 3.7

SKILLS
JavaScript, TypeScript, Python, React, Node.js, Express.js, PostgreSQL, MongoDB, AWS, Docker, Kubernetes, Git, Jest, Agile/Scrum

PROJECTS
EcoTracker - Sustainability Dashboard
Full-stack web application helping users track carbon footprint with data visualization. Implemented real-time data sync and gamification elements.
Technologies: React, Node.js, PostgreSQL, Chart.js, WebSocket

DevCollab - Code Review Platform
Open-source platform for distributed code reviews with integrated chat and video calls. Built with emphasis on security and scalability.
Technologies: TypeScript, Express.js, MongoDB, Socket.io, Docker`

export function testTextParser() {
  console.log('Testing text parser with sample resume...')
  
  const result = parseResumeText(sampleResumeText)
  
  if (result.success && result.data) {
    console.log('✅ Parse successful!')
    console.log('Personal Info:', result.data.personalInfo)
    console.log('Experience entries:', result.data.experience.length)
    console.log('Education entries:', result.data.education.length)
    console.log('Skills:', result.data.skills.length)
    console.log('Projects:', result.data.projects.length)
    
    if (result.warnings && result.warnings.length > 0) {
      console.log('⚠️ Warnings:', result.warnings)
    }
  } else {
    console.log('❌ Parse failed:', result.errors)
  }
  
  return result
}

// Uncomment to run the test
// testTextParser()


