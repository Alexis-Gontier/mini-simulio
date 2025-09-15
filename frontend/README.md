# Frontend - Mini Simulio

## Description
Interface utilisateur moderne pour le système de simulation financière Mini Simulio, développée avec React et TypeScript.

## Technologies
- **Framework**: React 19
- **Langage**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query, up-fetch
- **Routing**: React Router DOM
- **Forms + validation**: React Hook Form + Zod
- **Icons**: Lucide React
- **Themes**: Next Themes

## Installation

### Prérequis
- Node.js (version 18+)
- pnpm

### Configuration
1. Copier le fichier d'environnement :
```bash
cp .env.example .env
```

2. Configurer les variables d'environnement dans `.env` :
```env
VITE_API_URL=http://localhost:3333
VITE_SIMULATOR_URL=http://localhost:5000
```

3. Installer les dépendances :
```bash
pnpm install
```

## Démarrage

### Mode développement
```bash
pnpm dev
```
L'application sera accessible sur `http://localhost:5173`

### Build de production
```bash
pnpm build
```

### Prévisualisation de production
```bash
pnpm preview
```

## Fonctionnalités

### Authentification
- Connexion et inscription utilisateur
- Gestion des sessions avec JWT
- Protection des routes

### Gestion des clients
- Liste des clients
- Création, modification et suppression de clients
- Interface intuitive pour la gestion des données client

### Simulations financières
- Création de simulations personnalisées
- Visualisation des résultats
- Historique des simulations par client
- Export des données

### Interface utilisateur
- Design moderne et responsive
- Mode sombre/clair
- Animations fluides
- Composants accessibles

## Composants principaux

### Pages
- `/login` - Page de connexion
- `/register` - Page d'inscription
- `/dashboard` - Tableau de bord principal
- `/clients` - Gestion des clients
- `/clients/:id/simulations` - Simulations d'un client
- `/simulations/:id` - Détail d'une simulation

## Scripts disponibles
- `pnpm dev` - Démarrage en mode développement
- `pnpm build` - Build de production
- `pnpm lint` - Vérification du code avec ESLint
- `pnpm preview` - Prévisualisation du build

## Docker
Le frontend peut être démarré avec Docker en utilisant le docker-compose.yml du projet racine :
```bash
docker-compose up -d frontend
```