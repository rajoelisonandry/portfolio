import type { LocalizedContent } from "../schema";

export const fr: LocalizedContent = {
  profile: {
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
  },
  about: [
    "Je m'appelle Andry, développeur FullStack indépendant basé à Antananarivo, à Madagascar. Diplômé d'un Master en informatique, je crée des applications web et mobiles depuis 2020.",
    "Ce qui me motive, c'est de voir un besoin réel devenir un outil que les gens utilisent au quotidien. J'aime comprendre le métier de mes clients, proposer des solutions simples et livrer un travail dont je suis fier.",
    "Mon objectif : accompagner des entreprises et des porteurs de projets sur la durée, en devenant pour eux un partenaire technique de confiance, tout en continuant à apprendre et à progresser à chaque projet.",
    "En dehors du code : musique, lecture et sport.",
  ],
  skillGroupLabels: {
    technologies: "Technologies",
    databases: "Bases de données",
    tools: "Cloud & outils",
  },
  languages: [
    { name: "Malgache", level: "Langue maternelle" },
    { name: "Français", level: "Lu, écrit, parlé" },
    { name: "Anglais", level: "Lu, écrit, parlé" },
  ],
  experiences: {
    "digital-workplace": {
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
    },
    "school-platform": {
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
    },
    "public-works": {
      title: "Gestion de chantiers de travaux publics",
      role: "Développeur FullStack",
      description:
        "Webapp de gestion de projets de construction (bâtiments, routes et autres chantiers) permettant de suivre les graphes, l'avancement et les alertes des projets en cours.",
      highlights: [
        "Génération automatique des graphes et statistiques d'avancement, à date fixe ou selon un cycle défini",
        "Intégration et développement de nouvelles fonctionnalités",
        "Participation aux dailies, revues de code et démos",
        "Maintenance de l'application",
      ],
    },
    "real-estate-app": {
      title: "Application mobile de géolocalisation immobilière",
      role: "Développeur FullStack",
      description:
        "Application mobile pour géolocaliser les terrains et maisons vendus ou à vendre à Singapour, acheter ou vendre des biens et planifier des rencontres entre utilisateurs pour réserver.",
      highlights: [
        "Intégration de la carte et délimitation des terrains à vendre avec leur prix",
        "Intégration des écrans de l'application et développement des fonctionnalités",
        "Maintenance de l'application",
      ],
    },
    "social-network": {
      title: "Réseau social commerces & consommateurs",
      role: "Développeur FullStack",
      description:
        "Webapp reliant grands magasins et consommateurs : publication de produits et d'actualités, commentaires, likes, avis, géolocalisation des magasins les plus proches et back-office d'administration sous React Admin.",
      highlights: [
        "Intégration des pages et développement des fonctionnalités",
        "Revues de code, planification des sprints",
        "Maintenance et optimisation du code",
      ],
    },
  },
  education: {
    master: {
      title: "Master en informatique",
      detail:
        "Informatique de gestion, génie logiciel et intelligence artificielle",
    },
    internship: {
      title: "Stage de fin d'études",
      detail: "Avril 2020 — Octobre 2020",
    },
    "business-class": { title: "Business Class" },
    "advanced-certificates": { title: "Advanced 1 & Advanced 2 Certificates" },
  },
  chatSuggestions: [
    "Quelles sont ses compétences principales ?",
    "Parle-moi de son projet pour les établissements scolaires",
    "A-t-il de l'expérience avec Liferay ?",
    "Comment le contacter ?",
  ],
};
