# twocoderz - Agence de Développement Web & Mobile

twocoderz est une agence spécialisée dans le développement d'applications web et mobile innovantes. Ce projet est un site portfolio moderne construit avec Next.js 15.

## Technologies

- **Framework:** Next.js 15.3.2 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** CSS animations & transitions
- **Icons:** React Icons (Fa, etc.)

## Structure du Projet

```
src/
├── app/
│   ├── about/          - Page À propos
│   ├── contact/        - Page Contact
│   ├── developers/     - Page Développeurs
│   ├── mobile/         - Page Services Mobile
│   ├── portfolio/      - Page Portfolio
│   ├── projects/       - Pages projets dynamiques
│   ├── services/       - Page Services
│   ├── web/            - Page Services Web
│   ├── layout.js       - Layout principal
│   └── page.js         - Page d'accueil
├── components/
│   ├── main/           - Composants principaux
│   ├── header/         - Header/Navigation
│   ├── footer/         - Footer
│   ├── sidebar_left/   - Sidebar gauche
│   └── sidebar_right/  - Sidebar droite
├── data/              - Données JSON (projets, services, équipe)
└── styles/            - Styles personnalisés
```

## Pour Commencer

1. Installer les dépendances :

```bash
npm install
```

2. Lancer le serveur de développement :

```bash
npm run dev
```

3. Ouvrir [http://localhost:3000](http://localhost:3000)

## Build Production

```bash
npm run build
```

## Déploiement

Déployé automatiquement sur Vercel via CI/CD.

## Fonctionnalités

- Design moderne avec effets glassmorphism
- Animations fluides et transitions
- Portfolio avec recherche et filtrage
- Pages dynamiques pour les projets
- Responsive design (mobile, tablet, desktop)
