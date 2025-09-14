# Navai-Lite  
**Proof-of-Concept Full-Stack Maritime AI-Ready**  

---

## Executive Summary
*Navai-Lite* est un **Proof-of-Concept full-stack AI-ready** appliqué à un cas d’usage maritime.  
Le projet démontre :  
- **Frontend** React (dashboard temps réel avec widgets météo, routes, ports, vision, AI).  
- **Backend** NestJS + PostgreSQL (users, auth, simulator, routes, ports, vision, AI).  
- **Infra** Docker Compose + PNPM Workspaces.  
- **Endpoints AI mockés** (`/ai/congestion`, `/ai/eta`, `/ai/fuel`), prêts à être remplacés par de vrais modèles ML.  
- **Architecture modulaire** et **scalable**, pensée pour accueillir de l’IA sans refactor.  
- **Storytelling concret** : un dashboard maritime simulé, inspiré d’environnements edge/offline.  

En résumé : une **preuve de compétences full-stack AI engineer** qui illustre la maîtrise du cycle complet **Frontend → Backend → DB → AI-ready**.  

---

## Objectif du projet
*Navai-Lite* est un **prototype full-stack** conçu pour démontrer des compétences **frontend, backend, base de données et intégration AI**.  

Il s’agit d’un **dashboard maritime simulé**, qui combine :  
- La visualisation en temps réel de données (météo, routes, ports, vision caméra, etc.).  
- La génération et la persistance de logs de simulation.  
- Des endpoints **AI-ready** pour des cas d’usage concrets (ETA, fuel, congestion).  

Ce projet est présenté comme une **preuve de compétences techniques** pour un poste de **Full-Stack AI Engineer**.  

---

## Architecture globale
Monorepo PNPM avec deux applications principales :  

```
navai-lite/
├── apps/
│   ├── frontend/     # React + Vite + TypeScript (widgets temps réel)
│   └── edge-api/     # Backend NestJS + TypeORM + PostgreSQL
├── infra/            # Docker Compose (DB, services)
├── services/         # Scripts utilitaires (seed, network, start/stop)
├── ai/               # Modules AI (checkpoints, orchestrateur)
└── README.md         # ce fichier
```

- **Frontend** : Dashboard maritime en React (widgets météo, routes, vision, ports, AI).  
- **Backend (NestJS)** : API modulaire (users, auth, route, simulator, vision, port, jit, weather, ai).  
- **Database** : PostgreSQL via Docker (persistante, utilisée pour logs, routes, utilisateurs).  
- **Infra** : Scripts Docker et utilitaires pour gérer facilement le projet.  
- **AI** : Endpoints `/ai/...` mockés mais prêts à intégrer des checkpoints ML.  

---

## Stack technique
- **Frontend** : React + Vite + TypeScript + Tailwind  
- **Backend** : NestJS + TypeORM + JWT Auth  
- **Database** : PostgreSQL (Docker)  
- **Infra** : Docker Compose + PNPM Workspaces  
- **AI-Ready** : Endpoints dédiés aux prédictions (mockées mais branchées DB)  

---

## Fonctionnalités principales
### Backend (NestJS)
- **Auth & Users** : Login, Register, JWT sécurisé.  
- **Healthcheck** : Endpoint `/health` pour monitoring.  
- **Weather API** : Données météo simulées et rafraîchies en temps réel.  
- **Simulator** : Génération de logs (position, vitesse, fuel).  
- **Routes & Port** : Gestion des routes maritimes et congestion portuaire.  
- **Vision** : Mock de détection d’objets caméra.  
- **AI** :  
  - `/ai/congestion` → score de congestion portuaire.  
  - `/ai/eta` → estimation d’arrivée.  
  - `/ai/fuel` → autonomie carburant restante.  
  *(actuellement mockés mais intégrables à de vrais modèles via checkpoints)*.  

### Frontend (React)
- **Widgets temps réel** : météo, routes, ports, vision, AI.  
- **Dashboard** responsive avec rafraîchissement périodique des données.  
- **Auth & Users** : écrans de login et gestion d’utilisateurs.  

---

## Partie AI
Nous avons conçu la stack pour être **AI-ready** :  
- Endpoints `/ai/...` exposés dans un module dédié (`AiModule`).  
- Mock dynamique (aléatoire + données DB) pour simuler des prédictions.  
- Dossier `ai/models/checkpoints/` prévu pour accueillir des modèles réels (TensorFlow, PyTorch, etc.).  
- Orchestrateur central (`orchestrator.ts`) pour combiner plusieurs prédictions.  

Le projet démontre que l’IA peut être **branchée sans refactor** : architecture pensée pour accueillir un vrai modèle.  

---

## Lancer le projet
### 1. Cloner & installer
```bash
git clone https://github.com/LeParisien-dev/navAI-lite.git
cd navai-lite
pnpm install
```

### 2. Démarrer l’infra
```bash
docker compose -f infra/docker-compose.yml up -d
```

### 3. Démarrer le backend
```bash
cd apps/edge-api
pnpm start:dev
```

### 4. Démarrer le frontend
```bash
cd apps/frontend
pnpm dev
```

Dashboard dispo sur [http://localhost:5173](http://localhost:5173).  
API dispo sur [http://localhost:3000](http://localhost:3000).  

---

## Exemple d’appels API
```bash
# Test Health
curl http://localhost:3000/health

# Test AI
curl http://localhost:3000/ai/congestion
curl http://localhost:3000/ai/eta
curl http://localhost:3000/ai/fuel
```

---

## Points forts :
- **Full-stack complet** : React + NestJS + Postgres + Docker.  
- **Modules modulaires** : users, auth, simulator, ports, routes, AI.  
- **AI-Ready** : endpoints mockés mais pensés pour accueillir des modèles ML.  
- **Infra pro** : workspace PNPM, Docker Compose, scripts utilitaires.  
- **Cas d’usage maritime concret** : ETA, fuel, congestion, vision.  

---

## Prochaines étapes
- Remplacer les mocks AI par un vrai modèle (TensorFlow/PyTorch).  
- Ajouter du monitoring (Grafana/Prometheus).  
- Déploiement cloud (Kubernetes ou équivalent).  

---

*Projet conçu comme preuve de compétences full-stack AI engineer (2025).*  
