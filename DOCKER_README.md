# 🐳 Docker Configuration - Petrotekno

Configuración Docker lista para deployment en Dokploy.

## 📁 Estructura

```
webpetrotekno/
├── petrotekno-cms/          # Backend (Laravel)
│   ├── Dockerfile           # Configuración Docker para Laravel
│   ├── nginx.conf           # Configuración Nginx
│   ├── docker-entrypoint.sh # Script de inicio
│   └── .dockerignore
│
└── webpetrotekno/           # Frontend (React)
    ├── Dockerfile           # Configuración Docker para React
    ├── nginx.conf           # Configuración Nginx para SPA
    └── .dockerignore
```

## 🚀 Quick Start

### Para Dokploy (Recomendado)

Sigue la guía completa: [DOKPLOY_DEPLOYMENT_GUIDE.md](./DOKPLOY_DEPLOYMENT_GUIDE.md)

**Resumen rápido:**
1. Crea dos aplicaciones en Dokploy
2. Backend: Build Path `petrotekno-cms`, Puerto `8080`
3. Frontend: Build Path `webpetrotekno`, Puerto `80`
4. Configura variables de entorno
5. Deploy

### Para desarrollo local con Docker

**Backend:**
```bash
cd petrotekno-cms
docker build -t petrotekno-backend .
docker run -p 8080:8080 petrotekno-backend
```

**Frontend:**
```bash
cd webpetrotekno
docker build -t petrotekno-frontend .
docker run -p 3000:80 petrotekno-frontend
```

## 🔧 Variables de Entorno

### Backend (Laravel)
Ver archivo [.env.production.example](./petrotekno-cms/.env.production.example)

### Frontend (React)
```env
VITE_API_URL=https://tu-backend-url.com/api
```

## 📦 Características

### Backend
- ✅ PHP 8.2 + FPM
- ✅ Nginx optimizado
- ✅ SQLite con permisos correctos
- ✅ Migraciones automáticas
- ✅ Seeders en primer deploy
- ✅ Optimizaciones Laravel (cache)
- ✅ Health checks

### Frontend
- ✅ Multi-stage build
- ✅ Node 20 Alpine
- ✅ Nginx Alpine (producción)
- ✅ SPA routing configurado
- ✅ Compresión Gzip
- ✅ Cache de assets
- ✅ Health checks

## 🐛 Troubleshooting

### Backend no inicia
```bash
# Revisa logs del contenedor
docker logs <container-id>

# Verifica permisos de SQLite
ls -la database/database.sqlite
```

### Frontend no conecta con Backend
- Verifica `VITE_API_URL` en build time
- Asegúrate de que incluye `/api`
- Verifica CORS si es necesario

## 📝 Notas Importantes

- **SQLite**: Los datos se almacenan dentro del contenedor. Para persistencia en Dokploy, usa volumes.
- **SSL**: Dokploy maneja SSL automáticamente con Let's Encrypt.
- **Logs**: Accesibles desde la interfaz de Dokploy.

## 🔄 Actualizar Deployment

```bash
# 1. Haz cambios en tu código
git add .
git commit -m "Update"
git push

# 2. En Dokploy, click en "Redeploy"
```

## 📚 Documentación

- [Guía de Deployment en Dokploy](./DOKPLOY_DEPLOYMENT_GUIDE.md)
- [Laravel Docs](https://laravel.com/docs)
- [Vite Docs](https://vitejs.dev)
- [Dokploy Docs](https://dokploy.com/docs)

---

**¿Listo para deployment?** → [Ver Guía Completa](./DOKPLOY_DEPLOYMENT_GUIDE.md)
