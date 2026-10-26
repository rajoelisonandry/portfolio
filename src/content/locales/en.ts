import type { LocalizedContent } from "../schema";

export const en: LocalizedContent = {
  profile: {
    title: "Freelance Full-Stack Developer",
    roles: [
      "Freelance Full-Stack Developer",
      "React, Next.js & React Native Developer",
      "Node.js & Java Developer",
      "Passionate about clean code",
    ],
    tagline: "I turn your ideas into fast, reliable web and mobile apps.",
    stats: [
      { value: "5+", label: "years of experience" },
      { value: "20+", label: "projects delivered" },
    ],
    location: "Antananarivo, Madagascar",
  },
  about: [
    "I'm Andry, a freelance full-stack developer based in Antananarivo, Madagascar. I hold a Master's degree in computer science and have been building web and mobile applications since 2020.",
    "What drives me is seeing a real need turn into a tool people use every day. I like to understand my clients' business, offer simple solutions and deliver work I'm proud of.",
    "My goal: to support companies and project owners over the long term as a trusted technical partner, while continuing to learn and grow with every project.",
    "Outside of code: music, reading and sports.",
  ],
  skillGroupLabels: {
    technologies: "Technologies",
    databases: "Databases",
    tools: "Cloud & tools",
  },
  languages: [
    { name: "Malagasy", level: "Native language" },
    { name: "French", level: "Fluent (reading, writing, speaking)" },
    { name: "English", level: "Fluent (reading, writing, speaking)" },
  ],
  experiences: {
    "digital-workplace": {
      title: "Digital Workplace Platform — Liferay 7.4",
      role: "Full-Stack Developer",
      description:
        "Modular corporate intranet built on Liferay 7.4, made of some thirty modules covering a wide range of business areas: calendar, news, document management, resource booking, task and project management, event planner, FAQ, directory, job offers…",
      highlights: [
        "Development of new business modules",
        "Migration of modules to micro-frontends (Client Extensions)",
        "Code optimization (readability, performance, maintainability)",
        "Code reviews, sprint planning and platform maintenance",
      ],
    },
    "school-platform": {
      title: "Management platform for schools",
      role: "Full-Stack Developer",
      description:
        "A service dedicated to schools: a web and mobile application that centralizes the management of students, teachers, classes, grades, timetables and payments, with an administration back office and generation of official documents.",
      highlights: [
        "Automatic timetable generation based on teacher availability, with no scheduling conflicts",
        "Coefficient-weighted averages, rankings and PDF report cards",
        "Tuition fee tracking: payment types, per-class rates and payment status",
        "PDF documents: enrollment certificates, student ID cards, correspondence notebooks",
        "Excel import / export of student data and user role management",
        "Android mobile app (Kotlin) giving access to the platform from a smartphone",
        "Secure REST API (JWT), file storage on Cloudflare R2 and containerized deployment on Google Cloud Run",
      ],
    },
    "public-works": {
      title: "Public works construction management",
      role: "Full-Stack Developer",
      description:
        "Web app for managing construction projects (buildings, roads and other sites) to track charts, progress and alerts for ongoing projects.",
      highlights: [
        "Automatic generation of progress charts and statistics, on a set date or on a defined cycle",
        "Integration and development of new features",
        "Daily stand-ups, code reviews and demos",
        "Application maintenance",
      ],
    },
    "real-estate-app": {
      title: "Real estate geolocation mobile app",
      role: "Full-Stack Developer",
      description:
        "Mobile app to geolocate land and houses sold or for sale in Singapore, buy or sell properties and schedule meetings between users to make a booking.",
      highlights: [
        "Map integration and outlining of plots for sale with their prices",
        "Implementation of app screens and feature development",
        "Application maintenance",
      ],
    },
    "social-network": {
      title: "Social network for retailers & consumers",
      role: "Full-Stack Developer",
      description:
        "Web app connecting department stores and consumers: product and news posts, comments, likes, reviews, geolocation of the nearest stores and an administration back office built with React Admin.",
      highlights: [
        "Page integration and feature development",
        "Code reviews and sprint planning",
        "Maintenance and code optimization",
      ],
    },
  },
  education: {
    master: {
      title: "Master's degree in Computer Science",
      detail:
        "Business information systems, software engineering and artificial intelligence",
    },
    internship: {
      title: "End-of-studies internship",
      detail: "April 2020 — October 2020",
    },
    "business-class": { title: "Business Class" },
    "advanced-certificates": { title: "Advanced 1 & Advanced 2 Certificates" },
  },
  chatSuggestions: [
    "What are his main skills?",
    "Tell me about his platform for schools",
    "Does he have experience with Liferay?",
    "How can I contact him?",
  ],
};
