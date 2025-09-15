# Backend - Mini Simulio

## Description
Backend API pour le système de simulation financière Mini Simulio, développé avec AdonisJS 6.

## Technologies
- **Framework**: AdonisJS 6
- **Base de données**: MySQL
- **ORM**: Lucid ORM
- **Authentification**: AdonisJS Auth
- **Validation**: VineJS
- **Langage**: TypeScript

## Installation

### Prérequis
- Node.js (version 18+)
- MySQL
- pnpm

### Configuration
1. Copier le fichier d'environnement :
```bash
cp .env.example .env
```

2. Configurer les variables d'environnement dans `.env` :
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_username
DB_PASSWORD=your_password
DB_DATABASE=mini_simulio
```

3. Installer les dépendances :
```bash
pnpm install
```

4. Exécuter les migrations :
```bash
node ace migration:run
```

## Démarrage

### Mode développement
```bash
pnpm dev
```
Le serveur sera accessible sur `http://localhost:3333`

### Mode production
```bash
pnpm build
pnpm start
```

## API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription utilisateur
- `POST /api/auth/login` - Connexion utilisateur
- `POST /api/auth/logout` - Déconnexion (protégé)
- `GET /api/auth/me` - Profil utilisateur (protégé)

### Clients
- `GET /api/clients` - Liste tous les clients de l'utilisateur
- `POST /api/clients` - Crée un nouveau client
- `GET /api/clients/:id` - Récupère un client spécifique
- `PUT /api/clients/:id` - Met à jour un client
- `DELETE /api/clients/:id` - Supprime un client

### Simulations
- `GET /api/clients/:clientId/simulations` - Liste toutes les simulations d'un client
- `POST /api/clients/:clientId/simulations` - Crée une nouvelle simulation
- `GET /api/clients/:clientId/simulations/:id` - Récupère une simulation spécifique
- `PUT /api/clients/:clientId/simulations/:id` - Met à jour une simulation
- `DELETE /api/clients/:clientId/simulations/:id` - Supprime une simulation

## Exemples d'utilisation

### Inscription
```bash
curl -X POST http://localhost:3333/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"John Doe","email":"john@example.com","password":"password123"}'
```

### Connexion
```bash
curl -X POST http://localhost:3333/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Créer un client
```bash
curl -X POST http://localhost:3333/api/clients \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"fullName":"Client Name","email":"client@example.com"}'
```

### Créer une simulation
```bash
curl -X POST http://localhost:3333/api/clients/1/simulations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"name":"Test Simulation","result":{"score":85,"details":"Good performance"}}'
```

## Modèles de données

### User
- `id`: Identifiant unique
- `fullName`: Nom complet
- `email`: Adresse email (unique)
- `password`: Mot de passe haché
- Relation: `hasMany` avec Client

### Client
- `id`: Identifiant unique
- `fullName`: Nom complet du client
- `email`: Adresse email du client
- `userId`: Référence vers l'utilisateur propriétaire
- Relation: `belongsTo` User, `hasMany` Simulation

### Simulation
- `id`: Identifiant unique
- `name`: Nom de la simulation
- `result`: Résultats JSON de la simulation
- `clientId`: Référence vers le client
- Relation: `belongsTo` Client

## Sécurité
- Toutes les routes API sont protégées par authentification JWT
- Validation des données avec VineJS
- Isolation des données par utilisateur
- Hachage sécurisé des mots de passe

## Scripts disponibles
- `pnpm dev` - Démarrage en mode développement avec hot reload
- `pnpm build` - Construction pour la production
- `pnpm start` - Démarrage en mode production
- `pnpm test` - Exécution des tests
- `pnpm lint` - Vérification du code avec ESLint
- `pnpm format` - Formatage du code avec Prettier
- `pnpm typecheck` - Vérification des types TypeScript