# 🐳 Docker Compose - Desarrollo Local

## Inicio Rápido

```bash
# 1. Navegar al directorio raíz
cd /path/to/webpetrotekno

# 2. (Opcional) Copiar variables de entorno
cp .env.docker .env

# 3. Construir e iniciar
docker-compose up --build

# 4. ¡Listo!
# Frontend: http://localhost:3000
# Backend:  http://localhost:8080
# API:      http://localhost:8080/api/config
```

---

## Comandos Útiles

| Comando | Descripción |
|---------|-------------|
| `docker-compose up --build` | Construir e iniciar (primera vez) |
| `docker-compose up -d` | Iniciar en background |
| `docker-compose logs -f` | Ver logs en tiempo real |
| `docker-compose logs backend` | Ver solo logs del backend |
| `docker-compose logs frontend` | Ver solo logs del frontend |
| `docker-compose down` | Detener contenedores |
| `docker-compose down -v` | Detener y **eliminar datos** |
| `docker-compose exec backend sh` | Acceder al backend |
| `docker-compose exec frontend sh` | Acceder al frontend |

---

## Ejecutar Comandos Artisan

```bash
# Limpiar cachés
docker-compose exec backend php artisan cache:clear

# Re-ejecutar migraciones
docker-compose exec backend php artisan migrate:fresh --seed

# Ver rutas
docker-compose exec backend php artisan route:list
```

---

## Estructura de Servicios

```
┌──────────────────┐     ┌──────────────────┐
│     FRONTEND     │     │     BACKEND      │
│   React + Nginx  │────▶│  Laravel + Nginx │
│   Puerto: 3000   │ API │   Puerto: 8080   │
└──────────────────┘     └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │    VOLÚMENES     │
                    │  storage + db    │
                    └──────────────────┘
```

---

## Producción (Dokploy)

Para producción, continúa usando los Dockerfiles individuales:
- **Backend**: `petrotekno-cms/Dockerfile`
- **Frontend**: `webpetrotekno/Dockerfile`

Consulta [DOKPLOY_DEPLOYMENT_GUIDE.md](./DOKPLOY_DEPLOYMENT_GUIDE.md) para instrucciones detalladas.

---

## Solución de Problemas

### Puerto en uso
```bash
# Si el puerto 8080 o 3000 está ocupado
lsof -i :8080
kill -9 <PID>
```

### Reconstruir desde cero
```bash
docker-compose down -v --rmi local
docker-compose up --build
```

### El backend no responde
```bash
# Ver logs del backend
docker-compose logs backend

# Acceder al contenedor
docker-compose exec backend sh

# Verificar servicios internos
ps aux
curl http://localhost:8080/api/config
```
