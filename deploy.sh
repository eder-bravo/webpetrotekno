#!/usr/bin/env bash
set -euo pipefail

cd /srv/projects/webpetrotekno

echo "==> Fetching latest changes from origin/main..."
git fetch origin main
git merge --ff-only origin/main

echo "==> Backing up production database before migrations..."
BACKUP_PATH="/data/database-before-$(date -u +%Y%m%dT%H%M%SZ).sqlite"
sudo docker compose -f /srv/projects/webpetrotekno/compose.yaml exec -T backend \
  sqlite3 /data/database.sqlite ".backup '$BACKUP_PATH'"
echo "==> Database backup: $BACKUP_PATH"

echo "==> Building and deploying stack..."
sudo docker compose -f /srv/projects/webpetrotekno/compose.yaml up -d --build

echo "==> Checking container status..."
sleep 5
sudo docker compose -f /srv/projects/webpetrotekno/compose.yaml ps

echo "==> Deployment completed successfully!"
