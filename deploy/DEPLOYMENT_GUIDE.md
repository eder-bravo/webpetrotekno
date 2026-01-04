# =====================================================
# GUÍA DE DEPLOYMENT - PETROTEKNO
# =====================================================

## Estructura Final en cPanel (public_html/)

```
public_html/
├── .htaccess              # Routing principal (frontend + API)
├── index.html             # Frontend React
├── assets/                # JS/CSS compilados del frontend
│   ├── index-xxxxx.js
│   └── index-xxxxx.css
├── api/                   # Laravel Backend
│   ├── app/
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   ├── public/
│   │   ├── .htaccess
│   │   ├── index.php
│   │   └── storage -> ../storage/app/public
│   ├── resources/
│   ├── routes/
│   ├── storage/
│   ├── vendor/
│   ├── .env
│   └── artisan
└── (otros archivos frontend)
```

## Pasos de Deployment

### 1. Compilar Frontend (local)
```bash
cd webpetrotekno
npm run build
```
Esto genera la carpeta `dist/` con los archivos optimizados.

### 2. Preparar Backend (local)
```bash
cd petrotekno-cms
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### 3. Subir Archivos a cPanel

**Frontend:**
- Sube TODO el contenido de `webpetrotekno/dist/` a `public_html/`
- Incluye: index.html, assets/, favicon, etc.

**Backend:**
- Crea la carpeta `public_html/api/`
- Sube estas carpetas de `petrotekno-cms/`:
  - app/
  - bootstrap/
  - config/
  - database/
  - resources/
  - routes/
  - storage/
  - vendor/
  - artisan
- Sube `petrotekno-cms/public/` como `public_html/api/public/`

### 4. Configurar .env en Producción

Crea `public_html/api/.env`:
```env
APP_NAME=Petrotekno
APP_ENV=production
APP_KEY=base64:... (genera con php artisan key:generate)
APP_DEBUG=false
APP_URL=https://www.petrotekno.com.mx/api

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=tu_base_de_datos
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña

FILESYSTEM_DISK=public
```

### 5. Configurar Permisos en cPanel
```bash
# Via SSH o File Manager
chmod -R 755 public_html/api
chmod -R 775 public_html/api/storage
chmod -R 775 public_html/api/bootstrap/cache
```

### 6. Crear Symlink para Storage
```bash
cd public_html/api/public
ln -s ../storage/app/public storage
```
O desde el CMS: acceder y subir una imagen para que se cree automáticamente.

### 7. Ejecutar Migraciones
Si tienes acceso SSH:
```bash
cd public_html/api
php artisan migrate --force
php artisan db:seed --force
```

Si no tienes SSH, usa phpMyAdmin para importar el SQL.

### 8. Subir .htaccess
- Copia `deploy/public_html/.htaccess` a `public_html/.htaccess`
- Copia `deploy/public_html/api/public/.htaccess` a `public_html/api/public/.htaccess`

## URLs Finales

- **Frontend:** https://www.petrotekno.com.mx/
- **API:** https://www.petrotekno.com.mx/api/
- **CMS Admin:** https://www.petrotekno.com.mx/api/admin

## Verificar Deployment

1. Abre https://www.petrotekno.com.mx - debe mostrar el frontend
2. Abre https://www.petrotekno.com.mx/api/obras - debe retornar JSON
3. Abre https://www.petrotekno.com.mx/api/admin - debe mostrar login del CMS

## Solución de Problemas

### Error 500 en API
- Revisa `public_html/api/storage/logs/laravel.log`
- Verifica permisos de storage/
- Verifica .env existe y APP_KEY está configurado

### Frontend no carga datos
- Abre DevTools > Network
- Verifica que las llamadas a /api/* retornen 200
- Revisa errores CORS en Console

### Imágenes no se muestran
- Verifica que el symlink storage existe
- Permisos de storage/app/public
