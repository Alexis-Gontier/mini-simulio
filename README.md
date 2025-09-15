# 🚀 Mini-Simulio - Guide de démarrage

## 📋 Prérequis
- Docker et Docker Compose installés
- Node.js (optionnel pour développement local)

## 🐳 Démarrage avec Docker (Recommandé)

### 1. Démarrer tous les services
```bash
docker-compose up -d
```
!Attendre quelques secondes

### 2. Exécuter les migrations de base de données
```bash
docker-compose exec backend-adonis node ace migration:run
```

### 3. Accéder aux services
- **Frontend (Vite + React)** : http://localhost:5173
- **Backend AdonisJS** : http://localhost:3333
- **Backend Flask** : http://localhost:5000
- **Base de données MySQL** : localhost:3306

## 🛠️ Développement local

### Base de données MySQL
```bash
# Démarrer uniquement la base de données
docker-compose up -d db
```

### Backend AdonisJS
```bash
cd backend
pnpm install
pnpm dev
# Serveur sur http://localhost:3333
```

### Backend Flask (Simulateur)
```bash
cd simulator
pip install -r requirements.txt
python app.py
# Serveur sur http://localhost:5000
```

### Frontend Vite + React
```bash
cd frontend
npm install
npm run dev
# Serveur sur http://localhost:5173
```

## 🔑 API d'authentification

### S'inscrire
```bash
curl -X POST http://localhost:3333/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"John Doe","email":"john@example.com","password":"password123"}'
```

### Se connecter
```bash
curl -X POST http://localhost:3333/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

## 📊 Structure de l'API

### Clients
- `GET /api/clients` - Liste des clients
- `POST /api/clients` - Créer un client
- `GET /api/clients/:id` - Détails d'un client
- `PUT /api/clients/:id` - Modifier un client
- `DELETE /api/clients/:id` - Supprimer un client

### Simulations
- `GET /api/clients/:clientId/simulations` - Liste des simulations d'un client
- `POST /api/clients/:clientId/simulations` - Créer une simulation
- `GET /api/clients/:clientId/simulations/:id` - Détails d'une simulation
- `PUT /api/clients/:clientId/simulations/:id` - Modifier une simulation
- `DELETE /api/clients/:clientId/simulations/:id` - Supprimer une simulation

### Simulateur (Flask)
- `POST /api/calculate` - Calculer une mensualité de prêt immobilier

#### Paramètres de calcul
```json
{
  "N": 20,                      // Durée du prêt en années
  "C2": 200000,                 // Prix du bien immobilier
  "T": 1.5,                     // Taux d'intérêt annuel (%)
  "ASSU": 0.36,                 // Taux d'assurance annuel (%)
  "apport": 20000,              // Apport personnel
  "mois": 1,                    // Mois de début du prêt
  "annee": 2024,                // Année de début du prêt
  "fraisAgence": 5000,          // Frais d'agence
  "fraisNotaire": 0,            // Frais de notaire (0 = calcul automatique)
  "TRAVAUX": 10000,             // Montant des travaux
  "revalorisationBien": 2       // Taux de revalorisation du bien (%)
}
```

#### Réponse
```json
{
  "mensualite": 1234.56,                         // Mensualité calculée
  "prix_du_bien": 200000,                        // Prix du bien
  "frais_de_notaire": 15000.00,                  // Frais de notaire calculés
  "garantie_bancaire": 2700.00,                  // Garantie bancaire
  "travaux": 10000,                              // Montant des travaux
  "frais_agence": 10000.00,                      // Frais d'agence finaux
  "total_a_financer": 225000.00,                 // Montant total à financer
  "revenu_acquereur_minimum_mensuel": 3526       // Revenu minimum requis
}
```

## 🗄️ Base de données

### Structure
- **users** : Utilisateurs avec authentification
- **clients** : Clients liés aux utilisateurs (1 user → N clients)
- **simulations** : Simulations liées aux clients (1 client → N simulations)

### Accès direct MySQL
```bash
docker-compose exec db mysql -u root -p app
# Mot de passe : root
```

## 🛑 Arrêter les services
```bash
docker-compose down
```

## 📝 Notes importantes
- Les tokens d'authentification sont requis pour toutes les routes protégées
- La base de données est persistée dans un volume Docker
- Le fichier `dump.sql` est chargé automatiquement au premier démarrage
