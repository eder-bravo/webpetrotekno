#!/usr/bin/env bash
set -euo pipefail

cd /srv/projects/webpetrotekno

echo "==> Fetching latest changes from origin/main..."
git fetch origin main
git reset --hard origin/main

echo "==> Building and deploying stack..."
sudo docker compose -f /srv/projects/webpetrotekno/compose.yaml up -d --build

echo "==> Checking container status..."
sleep 5
sudo docker compose -f /srv/projects/webpetrotekno/compose.yaml ps

echo "==> Deployment completed successfully!"
