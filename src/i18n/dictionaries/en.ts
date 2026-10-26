import type { Dictionary } from "./fr";

export const en: Dictionary = {
  meta: {
    skipLink: "Skip to content",
    keywords: [
      "Full-stack developer",
      "Freelance",
      "React",
      "React Native",
      "Node.js",
      "TypeScript",
      "Madagascar",
    ],
  },
  nav: {
    about: "About",
    experience: "Experience",
    education: "Education",
    contact: "Contact",
    main: "Main navigation",
    mobile: "Mobile navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    backToTop: "Back to top",
    language: "Change language",
  },
  theme: {
    toggle: "Toggle theme (light / dark)",
    title: "Toggle theme",
  },
  hero: {
    photoAlt: "Portrait of {name}",
    contactCta: "Let's talk about your project",
    downloadCv: "Download my résumé",
    socials: "Social links",
  },
  about: {
    languages: "Languages",
  },
  experience: {
    stack: "Technologies used",
  },
  contact: {
    intro:
      "Want to discuss a project or an opportunity? Feel free to reach out.",
    email: "Get in touch",
    whatsapp: "WhatsApp",
  },
  chat: {
    open: "Ask a question about {name}",
    close: "Close the assistant",
    dialog: "{name}'s AI assistant",
    title: "AI assistant",
    subtitle: "Questions about {name}'s profile",
    clear: "Clear",
    greeting:
      "Hi! Ask me anything about {name}'s background, skills or projects.",
    typing: "Typing…",
    inputLabel: "Your question",
    placeholder: "Your question…",
    send: "Send",
    disclaimer: "AI-generated answers, based on the portfolio only.",
    genericError: "Something went wrong. Please try again.",
    networkError: "Connection failed. Check your network and try again.",
  },
  chatApi: {
    disabled: "The assistant is currently disabled.",
    forbidden: "Origin not allowed.",
    invalid: "Invalid request.",
    tooLong: "Message too long ({max} characters max).",
    rateLimited:
      "You've reached the message limit. Try again in {minutes} min or contact {name}: {email}.",
    dailyQuota:
      "The assistant has reached its daily quota. Contact {name} directly: {email}.",
    unavailable:
      "The assistant is temporarily unavailable. You can contact {name} directly: {email}.",
    declined:
      "I can't help with that request. For any question about {name}, feel free to contact him directly: {email}.",
  },
};
