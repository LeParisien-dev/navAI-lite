#!/bin/bash
# Script pour arrêter l'infra Docker de navai-lite
echo "Arrêt de l'infra..."
docker compose -f infra/docker-compose.yml down
