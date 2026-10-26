/**
 * Interface strings (not portfolio content, which lives in `src/content`).
 * `{placeholders}` are filled with `format()`.
 */
export const fr = {
  meta: {
    skipLink: "Aller au contenu",
    keywords: [
      "Développeur FullStack",
      "Freelance",
      "React",
      "React Native",
      "Node.js",
      "TypeScript",
      "Madagascar",
    ],
  },
  nav: {
    about: "À propos",
    experience: "Expérience",
    education: "Formation",
    contact: "Contact",
    main: "Navigation principale",
    mobile: "Navigation mobile",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    backToTop: "Retour en haut",
    language: "Changer de langue",
  },
  theme: {
    toggle: "Changer de thème (clair / sombre)",
    title: "Changer de thème",
  },
  hero: {
    photoAlt: "Portrait de {name}",
    contactCta: "Discutons de votre projet",
    downloadCv: "Télécharger mon CV",
    socials: "Réseaux sociaux",
  },
  about: {
    languages: "Langues",
  },
  experience: {
    stack: "Technologies utilisées",
  },
  contact: {
    intro:
      "Envie d'échanger sur un projet ou une opportunité ? N'hésitez pas à me contacter.",
    email: "Me contacter",
    whatsapp: "WhatsApp",
  },
  chat: {
    open: "Poser une question sur {name}",
    close: "Fermer l'assistante",
    dialog: "Assistante IA de {name}",
    title: "Assistante IA",
    subtitle: "Questions sur le profil de {name}",
    clear: "Effacer",
    greeting:
      "Bonjour ! Posez-moi une question sur le parcours, les compétences ou les projets de {name}.",
    typing: "Rédaction…",
    inputLabel: "Votre question",
    placeholder: "Votre question…",
    send: "Envoyer",
    disclaimer: "Réponses générées par IA, à partir du portfolio uniquement.",
    genericError: "Une erreur est survenue. Réessayez.",
    networkError: "Connexion impossible. Vérifiez votre réseau et réessayez.",
  },
  chatApi: {
    disabled: "L'assistante est désactivée pour le moment.",
    forbidden: "Origine non autorisée.",
    invalid: "Requête invalide.",
    tooLong: "Message trop long ({max} caractères maximum).",
    rateLimited:
      "Vous avez atteint la limite de messages. Réessayez dans {minutes} min ou contactez {name} : {email}.",
    dailyQuota:
      "L'assistante a atteint son quota du jour. Contactez {name} directement : {email}.",
    unavailable:
      "L'assistante est momentanément indisponible. Vous pouvez contacter {name} directement : {email}.",
    declined:
      "Je ne peux pas répondre à cette demande. Pour toute question sur {name}, vous pouvez le contacter directement : {email}.",
  },
};

export type Dictionary = typeof fr;
