# Edge API – NavAI-Lite

Backend NestJS + PostgreSQL du projet NavAI-Lite.  
Cette API expose les modules d’authentification, de gestion utilisateurs et les services métiers (weather, vision, route, ports, etc.).

Déployée sur Render :  
👉 https://edge-api-fhqf.onrender.com/health

---

## Variables d’environnement requises

- DATABASE_URL → URL complète de connexion PostgreSQL (Render, format postgres://user:pass@host:5432/dbname)  
- JWT_SECRET → clé secrète pour la génération de tokens  
- PORT → fourni automatiquement par Render  

---

## Endpoints principaux

### Auth
- POST `/api/auth/register`  
  Corps : `{ "username": "john", "email": "john@mail.com", "password": "secret123" }`  
  Réponse : Création utilisateur  

- POST `/api/auth/login`  
  Corps : `{ "email": "john@mail.com", "password": "secret123" }`  
  Réponse : `{ "access_token": "xxx.yyy.zzz" }`  

Exemple curl :  
`curl -X POST https://edge-api-fhqf.onrender.com/api/auth/register -H "Content-Type: application/json" -d '{"username":"john","email":"john@mail.com","password":"secret123"}'`

---

### Users
- GET `/api/users` → Liste tous les utilisateurs  
- GET `/api/users/:id` → Récupère un utilisateur  
- DELETE `/api/users/:id` → Supprime un utilisateur  

Exemple curl :  
`curl https://edge-api-fhqf.onrender.com/api/users`

---

### Health
- GET `/health` → Health check (Render)  
- GET `/health/ping` → Ping test local  

Exemple curl :  
`curl https://edge-api-fhqf.onrender.com/health`

---

## Lancer en local

- Installer les dépendances : `pnpm install`  
- Lancer en mode dev : `pnpm run start:dev`  
- Lancer en prod (après build) :  
  - `pnpm run build`  
  - `pnpm run start:prod`  

---

## Notes

- Toutes les routes backend sont préfixées par `/api` (ex : `/api/auth/login`, `/api/users`).  
- La connexion à la DB Render impose SSL (rejectUnauthorized: false).  
- En free tier Render, la première requête peut prendre 1-2 minutes (cold start).  

---
