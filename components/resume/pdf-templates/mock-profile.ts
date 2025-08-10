// Mock Profile Data for Resume Template Testing
// This profile represents a realistic tech professional for testing MockStars resume templates

export const mockProfile = {
  personalInfo: {
    name: "Alex Rivera",
    title: "Senior Software Engineer",
    email: "alex.rivera@email.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexrivera",
    website: "alexrivera.dev"
  },
  summary: "Experienced full-stack software engineer with 6+ years developing scalable web applications and leading cross-functional teams. Passionate about creating user-centric solutions and mentoring junior developers. Proven track record of delivering high-impact projects that improved user engagement by 40% and reduced system latency by 60%.",
  experience: [
    {
      title: "Senior Software Engineer",
      company: "TechFlow Inc.",
      startDate: "Jan 2022",
      endDate: "Present",
      location: "San Francisco, CA",
      description: [
        "Led development of microservices architecture serving 2M+ daily active users using Node.js and Kubernetes",
        "Mentored 5 junior engineers and implemented code review processes that reduced bugs by 45%",
        "Designed and built real-time analytics dashboard using React and WebSocket, improving data visibility for stakeholders",
        "Collaborated with product team to deliver 15+ features ahead of schedule, resulting in 25% increase in user retention"
      ]
    },
    {
      title: "Software Engineer",
      company: "DataSync Solutions",
      startDate: "June 2020",
      endDate: "Dec 2021",
      location: "Remote",
      description: [
        "Developed RESTful APIs handling 100K+ requests per day using Python Flask and PostgreSQL",
        "Implemented automated testing suite with 90% code coverage, reducing production bugs by 60%",
        "Built responsive web application with React and TypeScript, serving 50K+ monthly users",
        "Optimized database queries and caching strategies, improving application performance by 40%"
      ]
    },
    {
      title: "Junior Software Developer",
      company: "StartupLab",
      startDate: "Aug 2018",
      endDate: "May 2020",
      location: "Austin, TX",
      description: [
        "Built full-stack web applications using JavaScript, React, and Node.js for early-stage startups",
        "Participated in agile development process and daily standups with cross-functional teams",
        "Created mobile-responsive UI components and integrated third-party APIs for payment processing",
        "Contributed to open-source projects and maintained 95%+ uptime for production applications"
      ]
    }
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of California, Berkeley",
      year: "2018",
      gpa: "3.7"
    },
    {
      degree: "AWS Certified Solutions Architect",
      school: "Amazon Web Services",
      year: "2022"
    }
  ],
  skills: [
    "JavaScript", "TypeScript", "Python", "React", "Node.js", "Express.js",
    "PostgreSQL", "MongoDB", "Redis", "AWS", "Docker", "Kubernetes",
    "Git", "Jest", "Cypress", "GraphQL", "REST APIs", "Microservices",
    "Agile/Scrum", "Team Leadership", "Code Review", "System Design"
  ],
  projects: [
    {
      name: "EcoTracker - Sustainability Dashboard",
      description: "Full-stack web application helping users track their carbon footprint with data visualization and goal setting features. Implemented real-time data sync and gamification elements.",
      technologies: ["React", "Node.js", "PostgreSQL", "Chart.js", "WebSocket"]
    },
    {
      name: "DevCollab - Code Review Platform",
      description: "Open-source platform for distributed code reviews with integrated chat and video calls. Built with emphasis on security and scalability for teams of all sizes.",
      technologies: ["TypeScript", "Express.js", "MongoDB", "Socket.io", "Docker"]
    },
    {
      name: "SmartBudget - Personal Finance API",
      description: "RESTful API for personal finance management with bank integration, budget tracking, and spending analytics. Processed over 1M transactions with 99.9% uptime.",
      technologies: ["Python", "Flask", "PostgreSQL", "Redis", "AWS Lambda"]
    }
  ]
};

// Alternative mock profiles for testing variety
export const mockProfiles = {
  // Entry-level designer
  juniorDesigner: {
    personalInfo: {
      name: "Maya Chen",
      title: "UX/UI Designer",
      email: "maya.chen@email.com",
      phone: "(555) 987-6543",
      location: "Los Angeles, CA",
      linkedin: "linkedin.com/in/mayachen",
      website: "mayachen.design"
    },
    summary: "Creative and detail-oriented UX/UI designer with a passion for creating intuitive digital experiences. Recent graduate with internship experience at tech startups and a strong portfolio of mobile and web design projects.",
    experience: [
      {
        title: "UX/UI Design Intern",
        company: "InnovateTech",
        startDate: "June 2023",
        endDate: "Dec 2023",
        location: "Los Angeles, CA",
        description: [
          "Designed user interfaces for mobile app serving 10K+ users using Figma and Adobe Creative Suite",
          "Conducted user research and usability testing with 50+ participants to inform design decisions",
          "Collaborated with development team to implement responsive designs and improve user experience",
          "Created design system and component library that reduced design time by 30%"
        ]
      },
      {
        title: "Freelance Graphic Designer",
        company: "Self-Employed",
        startDate: "Jan 2022",
        endDate: "Present",
        location: "Remote",
        description: [
          "Designed branding materials and websites for 15+ small businesses and startups",
          "Managed client relationships and project timelines with 98% client satisfaction rate",
          "Created social media graphics and marketing materials that increased engagement by 45%"
        ]
      }
    ],
    education: [
      {
        degree: "Bachelor of Fine Arts in Graphic Design",
        school: "Art Center College of Design",
        year: "2023",
        gpa: "3.8"
      }
    ],
    skills: [
      "Figma", "Adobe Creative Suite", "Sketch", "Principle", "InVision",
      "User Research", "Wireframing", "Prototyping", "Visual Design",
      "HTML/CSS", "Design Systems", "Usability Testing", "Responsive Design"
    ],
    projects: [
      {
        name: "FoodieApp - Restaurant Discovery",
        description: "Mobile app redesign focused on improving discovery flow and reducing cognitive load. Increased user engagement by 60% through improved navigation and visual hierarchy.",
        technologies: ["Figma", "Principle", "Adobe Illustrator"]
      }
    ]
  },

  // Marketing professional
  marketingManager: {
    personalInfo: {
      name: "Jordan Taylor",
      title: "Digital Marketing Manager",
      email: "jordan.taylor@email.com",
      phone: "(555) 456-7890",
      location: "New York, NY",
      linkedin: "linkedin.com/in/jordantaylor"
    },
    summary: "Results-driven digital marketing professional with 5+ years of experience driving growth through data-driven campaigns. Expert in content strategy, SEO, and performance marketing with a track record of increasing ROI by 150% and growing brand awareness across multiple channels.",
    experience: [
      {
        title: "Digital Marketing Manager",
        company: "GrowthCorp",
        startDate: "March 2021",
        endDate: "Present",
        location: "New York, NY",
        description: [
          "Manage $500K+ annual ad spend across Google, Facebook, and LinkedIn with average ROAS of 4.2x",
          "Led content marketing strategy that increased organic traffic by 200% and generated 1,000+ qualified leads",
          "Built and optimized email marketing campaigns with 35% open rate and 8% CTR",
          "Collaborated with sales team to create nurture sequences that improved conversion rate by 45%"
        ]
      },
      {
        title: "Marketing Specialist",
        company: "BrandBoost Agency",
        startDate: "June 2019",
        endDate: "Feb 2021",
        location: "New York, NY",
        description: [
          "Executed integrated marketing campaigns for 20+ B2B and B2C clients across various industries",
          "Managed social media accounts with combined following of 100K+ and 15% average engagement rate",
          "Conducted market research and competitive analysis to inform campaign strategy and positioning"
        ]
      }
    ],
    education: [
      {
        degree: "Bachelor of Arts in Marketing",
        school: "New York University",
        year: "2019",
        gpa: "3.6"
      },
      {
        degree: "Google Ads Certification",
        school: "Google",
        year: "2021"
      }
    ],
    skills: [
      "Google Ads", "Facebook Ads", "SEO/SEM", "Google Analytics", "HubSpot",
      "Content Marketing", "Email Marketing", "Social Media Marketing",
      "A/B Testing", "Marketing Automation", "Data Analysis", "Copywriting"
    ],
    projects: [
      {
        name: "E-commerce Growth Campaign",
        description: "Multi-channel marketing campaign for fashion e-commerce brand that increased revenue by 300% in 6 months through strategic content and paid advertising.",
        technologies: ["Google Ads", "Facebook Ads", "Shopify", "Klaviyo"]
      }
    ]
  }
};
