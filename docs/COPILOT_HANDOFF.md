# Copilot Handoff

Ce document sert de passation rapide pour reprendre le projet dans un nouveau chat Copilot,
sans perdre le contexte technique et organisationnel.

## 1) Contexte du projet

- Projet: e-commerce SaaS
- Inspiration structurelle: JD Sports (structure et patterns UX), sans copier contenus/assets proprietaires
- Objectif: architecture solide avant implementation metier
- Langue des commentaires de code: francais clair et comprehensible (obligatoire)

## 2) Fichiers de reference a lire en premier

1. docs/JD_STRUCTURE_MAP.md
2. docs/IMPLEMENTATION_SPRINT_PLAN.md
3. src/app/routeBlueprint.ts
4. src/app/componentBlueprint.ts
5. src/app/router.tsx

## 3) Etat actuel

- Le scaffold pages/composants est en place
- Le routeur est branche et mappe les pages principales
- Les blueprints routes/composants existent et servent de source de verite
- Le build doit rester vert a chaque etape

## 4) Regles de travail a respecter

1. Ne pas casser l architecture existante
2. Prioriser la reutilisation des composants partages
3. Garder les composants specifiques dans src/pages/\*\*/components
4. Ajouter des commentaires utiles en francais
5. Mettre a jour la documentation si la structure change
6. Valider avec pnpm run build apres les changements

## 5) Prompt de reprise recommande (copier-coller)

Tu reprends un projet e-commerce inspire de la structure JD Sports.
Lis d abord:

- docs/JD_STRUCTURE_MAP.md
- docs/IMPLEMENTATION_SPRINT_PLAN.md
- src/app/routeBlueprint.ts
- src/app/componentBlueprint.ts
- src/app/router.tsx

Ensuite:

1. Resumer l etat actuel en 10 lignes maximum
2. Continuer le sprint en cours sans changer l architecture globale
3. N apporter que des changements necessaires et coherents avec les blueprints
4. Ecrire tous les commentaires de code en francais clair
5. Lancer pnpm run build et rapporter le resultat

## 6) Checklist de fin de tache

- Build OK
- Routes impactees verifiees
- Pas de duplication inutile de composants
- Documentation mise a jour si necessaire
- Commentaires en francais et comprensibles
