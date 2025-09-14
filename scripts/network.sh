#!/bin/bash
# Script pour créer un réseau docker dédié à navai-lite

NETWORK_NAME="navai-net"

if [ "$(docker network ls --filter name=^${NETWORK_NAME}$ --format='{{.Name}}')" = "${NETWORK_NAME}" ]; then
  echo "Le réseau ${NETWORK_NAME} existe déjà."
else
  echo "Création du réseau ${NETWORK_NAME}..."
  docker network create ${NETWORK_NAME}
  echo "Réseau ${NETWORK_NAME} créé."
fi
