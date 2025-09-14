#!/bin/bash
# Script pour nettoyer les conteneurs Navai-lite qui traînent

echo "Nettoyage des conteneurs navai_* ..."

# Arrêter les conteneurs qui matchent "navai_"
docker ps -a --filter "name=navai_" --format "{{.ID}}" | xargs -r docker stop

# Supprimer ces conteneurs
docker ps -a --filter "name=navai_" --format "{{.ID}}" | xargs -r docker rm

echo "Nettoyage terminé."
