# --- STAGE 1 : Build backend (NestJS) ---
FROM node:20-alpine AS backend-builder

WORKDIR /app

# Copier uniquement les fichiers nécessaires
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./
COPY apps/edge-api ./apps/edge-api
COPY libs ./libs

# Installer PNPM
RUN npm install -g pnpm

# Installer dépendances + build backend
RUN pnpm install --frozen-lockfile
RUN pnpm --filter edge-api build

# --- STAGE 2 : Build frontend (React/Vite) ---
FROM node:20-alpine AS frontend-builder

WORKDIR /app

COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./
COPY apps/frontend ./apps/frontend
COPY libs ./libs

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
RUN pnpm --filter frontend build

# --- STAGE 3 : Runner (prod only) ---
FROM node:20-alpine AS runner

WORKDIR /app

# Copier manifest global + manifest edge-api
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./
COPY apps/edge-api/package.json ./apps/edge-api/

RUN npm install -g pnpm

# Installer uniquement les deps prod pour edge-api
RUN pnpm install --filter edge-api --prod --frozen-lockfile

# Copier les dist
COPY --from=backend-builder /app/apps/edge-api/dist ./apps/edge-api/dist
COPY --from=frontend-builder /app/apps/frontend/dist ./apps/frontend/dist

EXPOSE 3000
CMD ["node", "apps/edge-api/dist/main.js"]