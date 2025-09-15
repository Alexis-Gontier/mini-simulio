# Simulator - Mini Simulio

## Description
Service de calcul de mensualités de prêt immobilier pour le système Mini Simulio, développé avec Flask et Python.

## Technologies
- **Framework**: Flask
- **Langage**: Python 3
- **CORS**: Flask-CORS
- **Calculs financiers**: numpy-financial
- **Manipulation de données**: pandas, numpy

## Structure du projet
```
simulator/
├── app.py                 # Application Flask principale
├── simulator/
│   └── calcule.py        # Module de calculs financiers
├── requirements.txt      # Dépendances Python
├── Dockerfile           # Configuration Docker
└── .gitignore          # Fichiers ignorés par Git
```

## Installation

### Prérequis
- Python 3.8+
- pip ou pipenv

### Configuration
1. Créer un environnement virtuel :
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows
```

2. Installer les dépendances :
```bash
pip install -r requirements.txt
```

## Démarrage

### Mode développement
```bash
python app.py
```
Le service sera accessible sur `http://localhost:5000`

## API Endpoints

### Endpoint principal
- `GET /` - Test de connexion (retourne {"hello": "world"})
- `POST /api/calculate` - Calcul de mensualité de prêt immobilier

## Calcul de mensualité

### Endpoint: `POST /api/calculate`

Calcule la mensualité d'un prêt immobilier en fonction des paramètres fournis.

### Paramètres d'entrée
```json
{
  "N": 240,                    // Durée du prêt en mois
  "C2": 300000,               // Prix du bien immobilier
  "T": 3.5,                  // Taux d'intérêt annuel (en %)
  "ASSU": 0.36,              // Taux d'assurance (en %)
  "apport": 60000,           // Apport personnel
  "mois": 3,                 // Mois de l'acquisition
  "annee": 2024,             // Année de l'acquisition
  "fraisAgence": 15000,      // Frais d'agence
  "fraisNotaire": 0,         // Frais de notaire (calculés automatiquement si 0)
  "TRAVAUX": 25000,          // Montant des travaux
  "revalorisationBien": 2.5  // Taux de revalorisation annuel (en %)
}
```

### Réponse
```json
{
  "mensualite": 1284.56,                           // Mensualité calculée
  "prix_du_bien": 300000,                         // Prix du bien
  "frais_de_notaire": 22500.00,                   // Frais de notaire calculés
  "garantie_bancaire": 3000.00,                   // Garantie bancaire
  "travaux": 25000,                               // Montant des travaux
  "frais_agence": 15000.00,                       // Frais d'agence
  "total_a_financer": 265500.00,                  // Total à financer
  "revenu_acquereur_minimum_mensuel": 4281        // Revenu minimum requis
}
```

## Exemple d'utilisation

### Calcul de mensualité
```bash
curl -X POST http://localhost:5000/api/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "N": 240,
    "C2": 300000,
    "T": 3.5,
    "ASSU": 0.36,
    "apport": 60000,
    "mois": 3,
    "annee": 2024,
    "fraisAgence": 15000,
    "fraisNotaire": 0,
    "TRAVAUX": 25000,
    "revalorisationBien": 2.5
  }'
```

### Test de connexion
```bash
curl http://localhost:5000/
```

## Docker

### Build de l'image
```bash
docker build -t mini-simulio-simulator .
```

### Démarrage avec Docker
```bash
docker run -p 5000:5000 mini-simulio-simulator
```

### Utilisation avec docker-compose
```bash
docker-compose up -d simulator
```


