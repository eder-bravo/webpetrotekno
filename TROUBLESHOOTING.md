# 🔧 Comandos Útiles - Troubleshooting Docker

## 🐳 Testing Local (Antes de Deploy)

### Backend (Laravel)

```bash
# Construir imagen
cd petrotekno-cms
docker build -t petrotekno-backend-test .

# Ejecutar contenedor
docker run -p 8080:8080 --name backend-test petrotekno-backend-test

# Ver logs
docker logs backend-test

# Entrar al contenedor
docker exec -it backend-test sh

# Detener y eliminar
docker stop backend-test
docker rm backend-test
```

### Frontend (React)

```bash
# Construir imagen con API URL
cd webpetrotekno
docker build --build-arg VITE_API_URL=http://localhost:8080/api -t petrotekno-frontend-test .

# Ejecutar contenedor
docker run -p 3000:80 --name frontend-test petrotekno-frontend-test

# Ver logs
docker logs frontend-test

# Detener y eliminar
docker stop frontend-test
docker rm frontend-test
```

---

## 🐛 Debugging en Dokploy

### Acceder a Consola del Contenedor

En Dokploy → Tu Aplicación → Console

**Backend (Laravel):**
```bash
# Ver configuración actual
php artisan config:show

# Verificar base de datos
ls -la database/
cat database/database.sqlite

# Ver rutas API
php artisan route:list

# Verificar permisos
ls -la storage/
ls -la bootstrap/cache/

# Ver logs de Laravel
tail -f storage/logs/laravel.log

# Limpiar cachés
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Re-ejecutar migraciones (⚠️ esto borra datos)
php artisan migrate:fresh --seed --force

# Solo ejecutar seeders
php artisan db:seed --force

# Ver estado de migraciones
php artisan migrate:status

# Verificar conectividad a internet (para composer, etc)
ping -c 3 google.com

# Ver procesos corriendo
ps aux

# Ver uso de memoria
free -m

# Ver configuración PHP
php -i | grep -i sqlite
```

**Frontend (React/Nginx):**
```bash
# Ver configuración Nginx
cat /etc/nginx/conf.d/default.conf

# Verificar archivos buildeados
ls -la /usr/share/nginx/html/

# Ver logs de Nginx
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# Test configuración Nginx
nginx -t

# Recargar Nginx (si haces cambios)
nginx -s reload

# Ver procesos
ps aux | grep nginx
```

---

## 🔍 Diagnóstico de Problemas Comunes

### Problema: "502 Bad Gateway" en Backend

```bash
# En consola del backend
ps aux | grep php-fpm
ps aux | grep nginx

# Si PHP-FPM no está corriendo
php-fpm -D

# Si Nginx no está corriendo
nginx
```

### Problema: Base de datos vacía o no existe

```bash
# Verificar archivo SQLite
ls -la database/database.sqlite

# Si no existe, crearlo
touch database/database.sqlite
chown www-data:www-data database/database.sqlite
chmod 664 database/database.sqlite

# Ejecutar migraciones
php artisan migrate --force

# Ejecutar seeders
php artisan db:seed --force
```

### Problema: Errores de permisos

```bash
# Dar permisos correctos
chown -R www-data:www-data storage bootstrap/cache database
chmod -R 775 storage bootstrap/cache database
chmod 664 database/database.sqlite
```

### Problema: Frontend no conecta con Backend (CORS)

Verificar en backend si CORS está configurado:

```bash
# Ver configuración CORS
cat config/cors.php

# Ver middleware
php artisan route:list | grep api
```

Si necesitas ajustar CORS, puedes hacerlo temporalmente:

```bash
# Nota: Esto es solo para debugging, no para producción
# Edita config/cors.php en tu código y re-deploya
```

### Problema: Caché corrupto

```bash
# Limpiar TODOS los cachés
php artisan optimize:clear

# O individualmente
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Regenerar cachés
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

---

## 📊 Monitoreo y Métricas

### Verificar Salud del Backend

```bash
# Test desde dentro del contenedor
wget -O- http://localhost:8080/api/config

# O con curl
curl http://localhost:8080/api/config

# Ver todas las rutas API
php artisan route:list | grep api
```

### Verificar Espacio en Disco

```bash
df -h
du -sh /var/www/html/*
```

### Verificar Uso de Memoria

```bash
free -m
```

### Ver Información del Sistema

```bash
uname -a
php -v
nginx -v
```

---

## 🔄 Re-deploy desde Cero

Si todo falla y necesitas empezar de nuevo:

### En Dokploy:

1. **Backend:**
   - Settings → Danger Zone → Delete Application
   - Crear nueva aplicación con los mismos settings
   - Configurar variables de entorno
   - Deploy

2. **Frontend:**
   - Settings → Danger Zone → Delete Application
   - Crear nueva aplicación
   - Configurar `VITE_API_URL` con la nueva URL del backend
   - Deploy

---

## 🧪 Tests de API

### Desde tu computadora local

```bash
# Configuración
BACKEND_URL="https://tu-backend.dokploy.app"

# Test endpoints
curl $BACKEND_URL/api/config
curl $BACKEND_URL/api/servicios
curl $BACKEND_URL/api/obras
curl $BACKEND_URL/api/redes
curl $BACKEND_URL/api/obras/por-estado

# Test con pretty print
curl $BACKEND_URL/api/config | python -m json.tool

# Test con headers
curl -I $BACKEND_URL/api/config
```

### Desde el navegador

Abre la consola (F12) y ejecuta:

```javascript
// Test API
fetch('https://tu-backend.dokploy.app/api/config')
  .then(r => r.json())
  .then(d => console.log(d))
  .catch(e => console.error(e));

// Test todos los endpoints
const endpoints = ['config', 'servicios', 'obras', 'redes'];
Promise.all(endpoints.map(e => fetch(`/api/${e}`).then(r => r.json())))
  .then(results => console.log(results))
  .catch(e => console.error(e));
```

---

## 📝 Logs Importantes

### En Dokploy

**Logs del Build:**
- Muestra el proceso de construcción del Docker
- Útil para ver errores de npm install, composer install, etc.

**Logs de Runtime:**
- Muestra el output del contenedor corriendo
- Incluye logs de Nginx, PHP-FPM, Laravel

**Revisar logs específicos:**
- Backend: Busca "error", "failed", "exception"
- Frontend: Busca "error", "failed" en build logs

---

## 🆘 Contacto de Emergencia

Si nada funciona:

1. **Backup de datos:**
   ```bash
   # En consola del backend
   cp database/database.sqlite /tmp/backup.sqlite
   ```

2. **Exportar configuración:**
   ```bash
   php artisan config:show > /tmp/config.txt
   php artisan route:list > /tmp/routes.txt
   ```

3. **Re-deploy desde cero** siguiendo el checklist

---

## ✅ Verificación Post-Troubleshooting

Después de resolver problemas, verifica:

- [ ] Backend responde a `/api/config`
- [ ] Backend responde a `/api/servicios`
- [ ] Frontend carga correctamente
- [ ] Frontend muestra datos del backend
- [ ] No hay errores en consola del navegador
- [ ] Logs en Dokploy están limpios

---

**Tip:** Guarda los logs antes de hacer cambios grandes para poder comparar.
