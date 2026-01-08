# 🚀 Despliegue en Dokploy con Docker Compose

## Método Directo (Recomendado)

Dokploy soporta Docker Compose nativamente. Solo necesitas:

---

## Paso 1: Preparar el Repositorio

Asegúrate de tener estos archivos en tu repo:
- ✅ `docker-compose.prod.yml`
- ✅ `petrotekno-cms/Dockerfile`
- ✅ `webpetrotekno/Dockerfile`

---

## Paso 2: Crear Proyecto en Dokploy

1. Ir a **Projects** → **New Project**
2. Nombre: `Petrotekno`

---

## Paso 3: Crear Compose Application

1. Dentro del proyecto, click **New Service** → **Compose**
2. Configurar:

| Campo | Valor |
|-------|-------|
| **Name** | `petrotekno-stack` |
| **Provider** | GitHub (o Git) |
| **Repository** | Tu repositorio |
| **Branch** | `main` |
| **Compose Path** | `docker-compose.prod.yml` |

---

## Paso 4: Configurar Variables de Entorno

En la sección **Environment**, agregar:

```env
# Obligatorias
APP_KEY=base64:TU_KEY_AQUI
BACKEND_URL=https://api.tu-dominio.com
BACKEND_DOMAIN=api.tu-dominio.com
FRONTEND_DOMAIN=tu-dominio.com
FRONTEND_DOMAIN_WWW=www.tu-dominio.com

# Opcionales
APP_NAME=Petrotekno CMS
```

> 💡 **Generar APP_KEY**: Ejecuta localmente `php artisan key:generate --show`

---

## Paso 5: Configurar Dominios

En Dokploy:
1. Ve a **Domains**
2. Agrega tus dominios:
   - `api.tu-dominio.com` → Backend
   - `tu-dominio.com` → Frontend
3. Habilita **SSL/Let's Encrypt**

---

## Paso 6: Deploy

1. Click **Deploy**
2. Espera ~5-10 minutos (primer build)
3. Verifica en **Logs** que todo inicie correctamente

---

## Verificación

```bash
# Backend
curl https://api.tu-dominio.com/api/config

# Frontend
curl https://tu-dominio.com
```

---

## Estructura de Archivos

```
webpetrotekno/
├── docker-compose.yml          # Desarrollo local
├── docker-compose.prod.yml     # Producción (Dokploy)
├── .env.dokploy.example        # Variables de ejemplo
├── petrotekno-cms/
│   ├── Dockerfile
│   ├── nginx.conf              # Config producción (HTTPS)
│   └── nginx.dev.conf          # Config desarrollo (HTTP)
└── webpetrotekno/
    └── Dockerfile
```

---

## Solución de Problemas

### Base de datos vacía
Los seeders se ejecutan automáticamente en el primer deploy.

### Error de permisos SQLite
El Dockerfile ya configura permisos. Si persiste, reinicia el contenedor.

### Imágenes no cargan
Verifica que `BACKEND_URL` tenga HTTPS y coincida con tu dominio.

---

## Comandos Útiles en Dokploy

```bash
# Ver rutas API
php artisan route:list

# Limpiar cachés
php artisan cache:clear

# Re-ejecutar migraciones
php artisan migrate:fresh --seed --force
```
