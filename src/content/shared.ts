import photo from "@/assets/profile.webp";
import type { Skill } from "@/types/content";

/**
 * Language-independent facts: identity, contact details, technologies.
 * Translated text lives in `./locales/*`, keyed by the ids defined here.
 */

export const identity = {
  name: "Andry Tiana Rajoelison",
  firstName: "Andry",
  photo,
  email: "andrytianarajoelison@gmail.com",
  phones: ["+261 34 39 244 86", "+261 38 80 020 86"],
  whatsapp: "+261 34 39 244 86",
  socials: {
    github: "https://github.com/rajoelisonandry",
    linkedin: "https://www.linkedin.com/in/andry-rajoelison",
  },
  cvUrl: "https://cvdesignr.com/p/6058d18e0497e",
} as const;

export const skillCatalog = {
  technologies: [
    { name: "ReactJS", icon: "/icons/react-original.svg" },
    { name: "Next.js", icon: "/icons/nextjs-original.svg", invertInDark: true },
    { name: "React Native", icon: "/icons/react-original.svg" },
    { name: "TypeScript", icon: "/icons/typescript-original.svg" },
    { name: "JavaScript", icon: "/icons/javascript-original.svg" },
    { name: "HTML", icon: "/icons/html5-original.svg" },
    { name: "CSS", icon: "/icons/css3-original.svg" },
    { name: "Tailwind CSS", icon: "/icons/tailwindcss-original.svg" },
    { name: "Java", icon: "/icons/java-original.svg" },
    { name: "Node.js", icon: "/icons/nodejs-original.svg" },
    { name: "NestJS", icon: "/icons/nestjs-original.svg" },
    { name: "Elasticsearch", icon: "/icons/elasticsearch-original.svg" },
    { name: "Liferay", icon: "/icons/liferay.svg" },
  ],
  databases: [
    { name: "PostgreSQL", icon: "/icons/postgresql-original.svg" },
    { name: "MySQL", icon: "/icons/mysql-original.svg" },
    { name: "SQLite", icon: "/icons/sqlite-original.svg" },
  ],
  tools: [
    { name: "AWS", icon: "/icons/amazonwebservices-plain-wordmark.svg" },
    { name: "Docker", icon: "/icons/docker-original.svg" },
    { name: "Vite", icon: "/icons/vitejs-original.svg" },
    { name: "Git", icon: "/icons/git-original.svg" },
    { name: "GraphQL", icon: "/icons/graphql-plain.svg" },
    { name: "Strapi", icon: "/icons/strapi.svg" },
    { name: "Mapbox", icon: "/icons/mapbox.svg", invertInDark: true },
  ],
} as const satisfies Record<string, readonly Skill[]>;

export type SkillGroupId = keyof typeof skillCatalog;

/** Ordered from most recent to oldest. */
export const experienceCatalog = [
  {
    id: "digital-workplace",
    stack: [
      "Liferay",
      "React",
      "Vite",
      "TypeScript",
      "Java",
      "Elasticsearch",
      "Tailwind CSS",
    ],
  },
  {
    id: "school-platform",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "NestJS",
      "TypeORM",
      "PostgreSQL",
      "Kotlin",
      "Android",
      "Docker",
      "Google Cloud Run",
    ],
  },
  {
    id: "public-works",
    company: "Hairun Technology",
    stack: [
      "ReactJS",
      "Node.js",
      "AWS Lambda",
      "S3",
      "ECR",
      "Docker",
      "PostgreSQL",
    ],
  },
  {
    id: "real-estate-app",
    company: "Hairun Technology",
    stack: [
      "React Native",
      "TypeScript",
      "Strapi",
      "Node.js",
      "GraphQL",
      "PostgreSQL",
      "AWS S3",
      "Docker",
      "Mapbox",
    ],
  },
  {
    id: "social-network",
    company: "Hairun Technology",
    stack: ["ReactJS", "TypeScript", "React Admin", "Docker", "Mapbox"],
  },
] as const;

export type ExperienceId = (typeof experienceCatalog)[number]["id"];

export const educationCatalog = [
  {
    id: "master",
    year: "2020",
    school: "ISPM — Institut Supérieur Polytechnique de Madagascar",
  },
  { id: "internship", year: "2020", school: "Hairun Technology" },
  { id: "business-class", year: "2021", school: "English Teaching Program" },
  {
    id: "advanced-certificates",
    year: "2020",
    school: "English Teaching Program",
  },
] as const;

export type EducationId = (typeof educationCatalog)[number]["id"];
