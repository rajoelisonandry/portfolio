# Portfolio — Andry Tiana Rajoelison

Portfolio personnel de développeur FullStack indépendant, construit avec **Next.js (App Router)**, **React 19**, **TypeScript** et **Tailwind CSS v4**.

## Fonctionnalités

- **Mise en page en deux colonnes** : identité fixe à gauche, contenu défilant à droite (une seule colonne sur mobile).
- **Navigation avec scroll-spy** : le lien de la section visible est mis en évidence (`IntersectionObserver`).
- **Thème clair / sombre** : préférence système par défaut, choix mémorisé, sans flash au chargement.
- **Animations** : nom révélé lettre par lettre (CSS pur) et titre en machine à écrire, désactivées si l'utilisateur préfère réduire les animations.
- **Accessibilité** : lien d'évitement, titres hiérarchisés, `aria-current`, focus visible, menu mobile fermable au clavier.
- **SEO** : métadonnées Open Graph / Twitter, image de partage générée, `sitemap.xml`, `robots.txt` et données structurées JSON-LD (`Person`).
- **Assistante IA** : un chat (Google Gemini, offre gratuite, réponses en streaming) qui répond uniquement aux questions sur le profil, protégé contre les abus (voir ci-dessous).
- **Bilingue français / anglais** : une URL par langue (`/fr`, `/en`), redirection automatique depuis `/` selon le choix mémorisé ou la langue du navigateur, sélecteur dans l'en-tête, balises `hreflang` et sitemap multilingue.
- **Pages statiques** : les deux langues sont pré-rendues au build ; seule l'API de l'assistante s'exécute côté serveur.

## Stack

| Domaine   | Outils                                            |
| --------- | ------------------------------------------------- |
| Framework | Next.js 16, React 19                              |
| Langage   | TypeScript (strict)                               |
| Style     | Tailwind CSS v4, design tokens en variables CSS   |
| IA        | Google Gemini via le SDK officiel `@google/genai` |
| Qualité   | ESLint, Prettier, Vitest, Testing Library         |
| CI        | GitHub Actions                                    |

## Architecture

```
src/
├── app/
│   ├── [lang]/          # Page, layout et image de partage, par langue
│   └── api/chat/        # API de l'assistante
├── components/
│   ├── chat/            # Widget de l'assistante IA
│   ├── layout/          # Header, Hero, LanguageSwitcher, ThemeToggle, Spotlight
│   ├── sections/        # Sections de la page (À propos, Expérience, Formation, Contact)
│   └── ui/              # Composants réutilisables et sans logique métier
├── config/              # Configuration du site et navigation (source unique des ancres)
├── content/             # Contenu éditorial : faits communs (shared.ts) + textes par langue (locales/)
├── i18n/                # Langues, dictionnaires de l'interface, choix de la langue
├── hooks/               # Hooks React (scroll-spy, machine à écrire, reduced motion)
├── lib/                 # Logique pure et testable (thème, machine à états, JSON-LD…)
└── types/               # Types du domaine
```

Principes suivis :

- **Contenu découplé de l'affichage** : modifier le texte du site se fait uniquement dans `src/content`.
- **Logique pure isolée** : l'effet machine à écrire est une machine à états (`src/lib/typewriter.ts`) testée indépendamment de React.
- **Server Components par défaut** : seuls les composants interactifs sont des Client Components (`"use client"`).
- **Design tokens** : les couleurs sémantiques (`text-heading`, `bg-accent-soft`…) sont définies une fois par thème dans `globals.css`.

## Assistante IA

Le modèle est **Google Gemini** (offre gratuite), activé dès que `GEMINI_API_KEY` est défini. L'accès au modèle est isolé derrière l'interface `ChatProvider` (`src/lib/chat/providers`) : les barrières ci-dessous ne dépendent pas du fournisseur.

L'API `src/app/api/chat/route.ts` applique plusieurs barrières, des moins coûteuses aux plus coûteuses :

| Barrière             | Rôle                                                                               |
| -------------------- | ---------------------------------------------------------------------------------- |
| Interrupteur         | `CHAT_ENABLED=false` (ou clé absente) désactive l'assistante sans changer le code  |
| Même origine         | refuse les appels venant d'un autre site                                           |
| Limite par visiteur  | 15 messages par heure et par IP                                                    |
| Budget quotidien     | nombre maximal de messages par jour pour tout le site (`CHAT_DAILY_LIMIT`)         |
| Validation           | messages de 500 caractères maximum, historique limité aux 6 derniers messages      |
| Instructions système | l'assistante ne répond qu'au sujet du profil, à partir du contenu de `src/content` |
| Sortie plafonnée     | 800 tokens maximum par réponse, abandon après 25 s sans réponse du modèle          |

Les limites sont centralisées dans `src/lib/chat/limits.ts` et testées (`route.test.ts`, `chat.test.ts`).
Les instructions système ne sont jamais une garantie absolue : ce sont les limites côté serveur qui plafonnent le coût.
En complément, l'offre gratuite de Gemini impose ses propres quotas : une fois atteints, l'assistante affiche un message d'indisponibilité avec l'e-mail de contact.

Les compteurs sont gardés en mémoire : sur une plateforme serverless, ils sont propres à chaque instance.
Pour des limites strictement globales, remplacer `createFixedWindowLimiter` par un stockage partagé (Redis…) derrière la même interface `RateLimiter`.

## Démarrage

Prérequis : Node.js 22 ou plus.

```bash
npm install
cp .env.example .env.local   # puis renseigner NEXT_PUBLIC_SITE_URL et GEMINI_API_KEY
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

| Contenu                                               | Fichier                     |
| ----------------------------------------------------- | --------------------------- |
| Nom, contacts, réseaux, technologies, années          | `src/content/shared.ts`     |
| Textes en français (accroche, à propos, expériences…) | `src/content/locales/fr.ts` |
| Textes en anglais                                     | `src/content/locales/en.ts` |
| Textes de l'interface (menu, boutons, assistante…)    | `src/i18n/dictionaries/`    |
| Couleurs des thèmes                                   | `src/app/globals.css`       |

Pour ajouter une compétence, placer son logo SVG dans `public/icons/` puis l'ajouter dans `skillCatalog` (`shared.ts`) (un test vérifie que chaque logo référencé existe).

Pour ajouter une expérience, déclarer son identifiant et ses technologies dans `experienceCatalog` (`shared.ts`), puis ses textes dans `fr.ts` et `en.ts` : TypeScript signale toute traduction manquante.
