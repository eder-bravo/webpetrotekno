# 🚀 Guía de Deployment en Dokploy

Esta guía te ayudará a deployar tu aplicación Petrotekno en Dokploy usando Docker.

## 📋 Prerrequisitos

- Cuenta en Dokploy
- Repositorio Git con tu código
- Dominios configurados (opcional, pero recomendado)

---

## 🏗️ Arquitectura del Deployment

Tu proyecto tiene dos aplicaciones independientes:

1. **Backend (Laravel)** - API REST con SQLite
2. **Frontend (React)** - SPA que consume la API

Cada una se desplegará como una aplicación separada en Dokploy.

---

## 🔧 PARTE 1: Deployment del Backend (Laravel)

### Paso 1: Crear Aplicación en Dokploy

1. En Dokploy, ve a **Projects** → **New Project**
2. Nombre del proyecto: `Petrotekno`
3. Dentro del proyecto, crea una nueva aplicación:
   - Click en **New Application**
   - Tipo: **Application from Git**
   - Nombre: `petrotekno-backend`

### Paso 2: Configurar Repository

1. Conecta tu repositorio Git
2. Selecciona la rama: `main` (o la que uses)
3. **Build Path**: `petrotekno-cms`
4. **Dockerfile Path**: `./Dockerfile`

### Paso 3: Configurar Build

- **Build Type**: Dockerfile
- **Port**: `8080`

### Paso 4: Variables de Entorno

En la sección de **Environment Variables**, agrega las siguientes:

```env
APP_NAME=Petrotekno CMS
APP_ENV=production
APP_KEY=base64:iFY1y0lhKpRBrDoo85ATTsyNzGervYO5+Xu/mBnPyH4=
APP_DEBUG=false
APP_URL=https://tu-backend-url.dokploy.app

APP_LOCALE=es
APP_FALLBACK_LOCALE=es
APP_FAKER_LOCALE=es_MX

LOG_CHANNEL=stack
LOG_LEVEL=error

DB_CONNECTION=sqlite

SESSION_DRIVER=file
SESSION_LIFETIME=120
CACHE_STORE=file
QUEUE_CONNECTION=sync
FILESYSTEM_DISK=local

MAIL_MAILER=log
MAIL_FROM_ADDRESS=noreply@petrotekno.com
MAIL_FROM_NAME="${APP_NAME}"
```

> ⚠️ **IMPORTANTE**: Cambia `APP_KEY` por una nueva generada. Puedes generarla localmente con:
> ```bash
> php artisan key:generate --show
> ```

### Paso 5: Configurar Dominio (Opcional)

1. En **Settings** → **Domains**
2. Agrega tu dominio personalizado o usa el subdominio de Dokploy
3. Habilita SSL (Let's Encrypt)

### Paso 6: Deploy

1. Click en **Deploy**
2. Espera a que termine el build (puede tardar 3-5 minutos)
3. Verifica que esté corriendo en la sección de **Logs**

### Paso 7: Verificar Backend

Prueba tu API visitando:
```
https://tu-backend-url.dokploy.app/api/config
```

Deberías ver la configuración en formato JSON.

---

## 🎨 PARTE 2: Deployment del Frontend (React)

### Paso 1: Crear Segunda Aplicación

1. En el mismo proyecto `Petrotekno`, crea otra aplicación:
   - Click en **New Application**
   - Tipo: **Application from Git**
   - Nombre: `petrotekno-frontend`

### Paso 2: Configurar Repository

1. Mismo repositorio que el backend
2. Selecciona la rama: `main`
3. **Build Path**: `webpetrotekno`
4. **Dockerfile Path**: `./Dockerfile`

### Paso 3: Configurar Build

- **Build Type**: Dockerfile
- **Port**: `80`

### Paso 4: Variables de Entorno

Solo necesitas una variable:

```env
VITE_API_URL=https://tu-backend-url.dokploy.app/api
```

> ⚠️ **MUY IMPORTANTE**: Reemplaza `tu-backend-url.dokploy.app` con la URL real de tu backend del Paso 1.

### Paso 5: Configurar Dominio

1. En **Settings** → **Domains**
2. Agrega tu dominio principal o usa el subdominio de Dokploy
3. Habilita SSL

### Paso 6: Deploy

1. Click en **Deploy**
2. Espera a que termine el build (2-4 minutos)

### Paso 7: Verificar Frontend

Abre tu dominio en el navegador. Deberías ver tu sitio web funcionando.

---

## ✅ Verificación Final

### Checklist de Funcionalidad

- [ ] Backend responde en `/api/config`
- [ ] Backend responde en `/api/servicios`
- [ ] Backend responde en `/api/obras`
- [ ] Frontend carga correctamente
- [ ] Frontend muestra datos del backend
- [ ] Imágenes cargan correctamente
- [ ] Navegación funciona en el frontend

### Comandos de Troubleshooting

Si algo no funciona, revisa los logs en Dokploy:

**Para el Backend:**
```
Ver logs → Buscar errores de PHP o Nginx
```

**Para el Frontend:**
```
Ver logs → Buscar errores de build o Nginx
```

---

## 🔄 Actualizaciones Futuras

Cuando hagas cambios en tu código:

1. Haz push a tu repositorio Git
2. En Dokploy, ve a tu aplicación
3. Click en **Redeploy**
4. Espera a que termine el build

---

## 🐛 Problemas Comunes

### Backend no responde

**Problema**: Error 502 Bad Gateway

**Solución**: 
- Revisa los logs del backend en Dokploy
- Verifica que todas las variables de entorno estén configuradas
- Asegúrate de que el puerto es 8080

### Frontend muestra errores de API

**Problema**: "Failed to fetch" o errores CORS

**Solución**:
- Verifica que `VITE_API_URL` apunte al backend correcto
- Asegúrate de incluir `/api` al final de la URL
- Verifica que el backend esté corriendo

### Base de datos vacía

**Problema**: API responde pero sin datos

**Solución**:
- El primer deploy ejecuta migraciones y seeders automáticamente
- Si necesitas re-ejecutar seeders, usa la consola de Dokploy:
  ```bash
  php artisan db:seed --force
  ```

### Error de permisos en SQLite

**Problema**: "SQLITE_CANTOPEN" o "database is locked"

**Solución**:
- Ya está configurado en el Dockerfile
- Si persiste, reinicia el contenedor en Dokploy

---

## 📊 Monitoreo

Dokploy te permite monitorear:

- **Logs en tiempo real**: Para ver qué está pasando
- **Métricas**: CPU, RAM, Network
- **Status**: Verifica que ambas apps estén "Running"

---

## 🔒 Seguridad

### Checklist de Seguridad

- [ ] `APP_DEBUG=false` en producción
- [ ] `APP_KEY` único y seguro
- [ ] SSL habilitado en ambos dominios
- [ ] Variables de entorno no expuestas en el código

---

## 🎯 Próximos Pasos

1. **Monitoreo**: Configura alertas en Dokploy
2. **Backups**: Configura backups automáticos de la base de datos SQLite
3. **CDN**: Considera usar un CDN para assets estáticos
4. **Analytics**: Agrega Google Analytics o similar

---

## 📞 Ayuda

Si tienes problemas:

1. Revisa los logs en Dokploy
2. Verifica que todas las variables de entorno estén configuradas
3. Asegúrate de que ambas aplicaciones estén corriendo
4. Verifica que la URL del backend esté correcta en el frontend

---

**¡Tu aplicación debería estar funcionando ahora! 🎉**
