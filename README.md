# Portfolio — Andry Tiana Rajoelison

Portfolio personnel de développeur FullStack indépendant, construit avec **Next.js (App Router)**, **React 19**, **TypeScript** et **Tailwind CSS v4**.

## Fonctionnalités

- **Mise en page en deux colonnes** : identité fixe à gauche, contenu défilant à droite (une seule colonne sur mobile).
- **Navigation avec scroll-spy** : le lien de la section visible est mis en évidence (`IntersectionObserver`).
- **Thème clair / sombre** : préférence système par défaut, choix mémorisé, sans flash au chargement.
- **Animations** : nom révélé lettre par lettre (CSS pur) et titre en machine à écrire, désactivées si l'utilisateur préfère réduire les animations.
- **Accessibilité** : lien d'évitement, titres hiérarchisés, `aria-current`, focus visible, menu mobile fermable au clavier.
- **SEO** : métadonnées Open Graph / Twitter, image de partage générée, `sitemap.xml`, `robots.txt` et données structurées JSON-LD (`Person`).
- **100 % statique** : la page est pré-rendue au build.

## Stack

| Domaine   | Outils                                          |
| --------- | ----------------------------------------------- |
| Framework | Next.js 16, React 19                            |
| Langage   | TypeScript (strict)                             |
| Style     | Tailwind CSS v4, design tokens en variables CSS |
| Qualité   | ESLint, Prettier, Vitest, Testing Library       |
| CI        | GitHub Actions                                  |

## Architecture

```
src/
├── app/                 # Routes Next.js : page, layout, SEO (sitemap, robots, OG image)
├── components/
│   ├── layout/          # Header, Hero, ThemeToggle, Spotlight
│   ├── sections/        # Sections de la page (À propos, Expérience, Formation, Contact)
│   └── ui/              # Composants réutilisables et sans logique métier
├── config/              # Configuration du site et navigation (source unique des ancres)
├── content/             # Contenu éditorial, typé, séparé de la présentation
├── hooks/               # Hooks React (scroll-spy, machine à écrire, reduced motion)
├── lib/                 # Logique pure et testable (thème, machine à états, JSON-LD…)
└── types/               # Types du domaine
```

Principes suivis :

- **Contenu découplé de l'affichage** : modifier le texte du site se fait uniquement dans `src/content`.
- **Logique pure isolée** : l'effet machine à écrire est une machine à états (`src/lib/typewriter.ts`) testée indépendamment de React.
- **Server Components par défaut** : seuls les composants interactifs sont des Client Components (`"use client"`).
- **Design tokens** : les couleurs sémantiques (`text-heading`, `bg-accent-soft`…) sont définies une fois par thème dans `globals.css`.

## Démarrage

Prérequis : Node.js 22 ou plus.

```bash
npm install
cp .env.example .env.local   # puis renseigner NEXT_PUBLIC_SITE_URL
npm run dev
```

## Scripts

| Commande            | Rôle                                            |
| ------------------- | ----------------------------------------------- |
| `npm run dev`       | Serveur de développement                        |
| `npm run build`     | Build de production                             |
| `npm start`         | Sert le build de production                     |
| `npm run lint`      | Analyse statique (ESLint)                       |
| `npm run typecheck` | Vérification des types (TypeScript)             |
| `npm test`          | Tests unitaires (Vitest)                        |
| `npm run format`    | Formate le code (Prettier)                      |
| `npm run check`     | Formatage, lint, types et tests en une commande |

## Modifier le contenu

| Contenu                       | Fichier                      |
| ----------------------------- | ---------------------------- |
| Nom, accroche, rôles, contact | `src/content/profile.ts`     |
| Compétences et langues        | `src/content/skills.ts`      |
| Expériences                   | `src/content/experiences.ts` |
| Formation                     | `src/content/education.ts`   |
| Couleurs des thèmes           | `src/app/globals.css`        |

Pour ajouter une compétence, placer son logo SVG dans `public/icons/` puis l'ajouter dans `skills.ts` (un test vérifie que chaque logo référencé existe).

## Crédits

- Logos des technologies : [Devicon](https://devicon.dev) et [Simple Icons](https://simpleicons.org).
- Mise en page inspirée du portfolio de [Brittany Chiang](https://brittanychiang.com).
