import type { Experience } from "@/types/content";

/** Ordered from most recent to oldest. */
export const experiences: readonly Experience[] = [
  {
    title: "Plateforme de Digital Workplace — Liferay 7.4",
    role: "Développeur FullStack",
    description:
      "Plateforme intranet d'entreprise modulaire bâtie sur Liferay 7.4, composée d'une trentaine de modules couvrant des domaines métiers variés : agenda, actualités, gestion documentaire, réservation de ressources, gestion de tâches et projets, planificateur d'événements, FAQ, annuaire, offres d'emploi…",
    highlights: [
      "Développement de nouveaux modules métier",
      "Migration des modules en micro-frontends (Client Extensions)",
      "Optimisation du code (lisibilité, performance, maintenabilité)",
      "Revues de code, planification des sprints et maintenance de la plateforme",
    ],
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
    title: "Plateforme de gestion pour établissements scolaires",
    role: "Développeur FullStack",
    description:
      "Service dédié aux établissements scolaires : une application web et mobile qui centralise la gestion des élèves, des enseignants, des classes, des notes, des emplois du temps et des paiements, avec un back-office d'administration et la génération des documents officiels.",
    highlights: [
      "Génération automatique des emplois du temps selon les disponibilités des enseignants, sans conflit d'horaire",
      "Calcul des moyennes pondérées par coefficients, classements et bulletins de notes en PDF",
      "Suivi des frais de scolarité : types de paiement, tarifs par classe et état des règlements",
      "Édition de documents PDF : certificats de scolarité, cartes d'élève, carnets de correspondance",
      "Import / export des données élèves au format Excel et gestion des rôles utilisateurs",
      "Application mobile Android (Kotlin) donnant accès à la plateforme depuis un smartphone",
      "API REST sécurisée (JWT), stockage des fichiers sur Cloudflare R2 et déploiement conteneurisé sur Google Cloud Run",
    ],
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
    title: "Gestion de chantiers de travaux publics",
    company: "Hairun Technology",
    role: "Développeur FullStack",
    description:
      "Webapp de gestion de projets de construction (bâtiments, routes et autres chantiers) permettant de suivre les graphes, l'avancement et les alertes des projets en cours.",
    highlights: [
      "Génération automatique des graphes et statistiques d'avancement, à date fixe ou selon un cycle défini",
      "Intégration et développement de nouvelles fonctionnalités",
      "Participation aux dailies, revues de code et démos",
      "Maintenance de l'application",
    ],
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
    title: "Application mobile de géolocalisation immobilière",
    company: "Hairun Technology",
    role: "Développeur FullStack",
    description:
      "Application mobile pour géolocaliser les terrains et maisons vendus ou à vendre à Singapour, acheter ou vendre des biens et planifier des rencontres entre utilisateurs pour réserver.",
    highlights: [
      "Intégration de la carte et délimitation des terrains à vendre avec leur prix",
      "Intégration des écrans de l'application et développement des fonctionnalités",
      "Maintenance de l'application",
    ],
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
    title: "Réseau social commerces & consommateurs",
    company: "Hairun Technology",
    role: "Développeur FullStack",
    description:
      "Webapp reliant grands magasins et consommateurs : publication de produits et d'actualités, commentaires, likes, avis, géolocalisation des magasins les plus proches et back-office d'administration sous React Admin.",
    highlights: [
      "Intégration des pages et développement des fonctionnalités",
      "Revues de code, planification des sprints",
      "Maintenance et optimisation du code",
    ],
    stack: ["ReactJS", "TypeScript", "React Admin", "Docker", "Mapbox"],
  },
];
