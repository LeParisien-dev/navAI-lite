#!/bin/bash
# Script pour démarrer l'infra Docker de navai-lite
echo "Démarrage de l'infra..."
docker compose -f infra/docker-compose.yml up -d
