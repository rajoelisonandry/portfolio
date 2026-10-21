import type { Language, SkillGroup } from "@/types/content";

export const skillGroups: readonly SkillGroup[] = [
  {
    label: "Technologies",
    skills: [
      { name: "ReactJS", icon: "/icons/react-original.svg" },
      {
        name: "Next.js",
        icon: "/icons/nextjs-original.svg",
        invertInDark: true,
      },
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
  },
  {
    label: "Bases de données",
    skills: [
      { name: "PostgreSQL", icon: "/icons/postgresql-original.svg" },
      { name: "MySQL", icon: "/icons/mysql-original.svg" },
      { name: "SQLite", icon: "/icons/sqlite-original.svg" },
    ],
  },
  {
    label: "Cloud & outils",
    skills: [
      { name: "AWS", icon: "/icons/amazonwebservices-plain-wordmark.svg" },
      { name: "Docker", icon: "/icons/docker-original.svg" },
      { name: "Vite", icon: "/icons/vitejs-original.svg" },
      { name: "Git", icon: "/icons/git-original.svg" },
      { name: "GraphQL", icon: "/icons/graphql-plain.svg" },
      { name: "Strapi", icon: "/icons/strapi.svg" },
      { name: "Mapbox", icon: "/icons/mapbox.svg", invertInDark: true },
    ],
  },
];

export const languages: readonly Language[] = [
  { name: "Malgache", level: "Langue maternelle" },
  { name: "Français", level: "Lu, écrit, parlé" },
  { name: "Anglais", level: "Lu, écrit, parlé" },
];
