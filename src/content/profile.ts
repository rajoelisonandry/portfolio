import photo from "@/assets/profile.webp";
import type { Profile } from "@/types/content";

export const profile = {
  name: "Andry Tiana Rajoelison",
  firstName: "Andry",
  photo,
  title: "Développeur FullStack indépendant",
  roles: [
    "Développeur FullStack indépendant",
    "Développeur React, Next.js & React Native",
    "Développeur Node.js & Java",
    "Passionné par le code propre",
  ],
  tagline:
    "Je transforme vos idées en applications web et mobiles rapides et fiables.",
  stats: [
    { value: "5+", label: "ans d'expérience" },
    { value: "20+", label: "projets réalisés" },
  ],
  location: "Antananarivo, Madagascar",
  email: "andrytianarajoelison@gmail.com",
  phones: ["+261 34 39 244 86", "+261 38 80 020 86"],
  whatsapp: "+261 34 39 244 86",
  socials: {
    github: "https://github.com/rajoelisonandry",
    linkedin: "https://www.linkedin.com/in/andry-rajoelison",
  },
  cvUrl: "https://cvdesignr.com/p/6058d18e0497e",
} as const satisfies Profile;

export const about: readonly string[] = [
  "Je m'appelle Andry, développeur FullStack indépendant basé à Antananarivo, à Madagascar. Diplômé d'un Master en informatique, je crée des applications web et mobiles depuis 2020.",
  "Ce qui me motive, c'est de voir un besoin réel devenir un outil que les gens utilisent au quotidien. J'aime comprendre le métier de mes clients, proposer des solutions simples et livrer un travail dont je suis fier.",
  "Mon objectif : accompagner des entreprises et des porteurs de projets sur la durée, en devenant pour eux un partenaire technique de confiance, tout en continuant à apprendre et à progresser à chaque projet.",
  "En dehors du code : musique, lecture et sport.",
];
