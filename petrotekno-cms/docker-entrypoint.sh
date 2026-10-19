#!/bin/sh
set -e

echo "🚀 Iniciando Petrotekno CMS..."

# Verificar que las variables de entorno criticas estan configuradas
if [ -z "$APP_KEY" ]; then
    echo "❌ Error: APP_KEY no esta configurada"
    exit 1
fi

echo "✅ Variables de entorno cargadas correctamente"

# Asegurar que la base de datos SQLite existe
echo "📦 Verificando base de datos SQLite..."
DB_FILE="${DB_DATABASE:-/var/www/html/database/database.sqlite}"
DB_DIR=$(dirname "$DB_FILE")
mkdir -p "$DB_DIR"
if [ ! -f "$DB_FILE" ]; then
    echo "   Creando $DB_FILE..."
    touch "$DB_FILE"
fi

# Dar permisos correctos
echo "🔒 Configurando permisos..."

# Crear toda la estructura de storage necesaria (importante cuando hay volumen montado)
mkdir -p /var/www/html/storage/app/public/obras
mkdir -p /var/www/html/storage/app/public/config
mkdir -p /var/www/html/storage/framework/cache/data
mkdir -p /var/www/html/storage/framework/sessions
mkdir -p /var/www/html/storage/framework/views
mkdir -p /var/www/html/storage/framework/testing
mkdir -p /var/www/html/storage/logs

# Crear archivo de log si no existe
touch /var/www/html/storage/logs/laravel.log

# Crear .gitignore en storage si no existe (Laravel lo necesita)
if [ ! -f /var/www/html/storage/.gitignore ]; then
    echo "*" > /var/www/html/storage/.gitignore
    echo "!.gitignore" >> /var/www/html/storage/.gitignore
fi

# Eliminar symlink anterior si existe (para recrearlo correctamente)
rm -f /var/www/html/public/storage

# Aplicar permisos correctos
chmod -R 777 /var/www/html/storage
chmod -R 777 /var/www/html/bootstrap/cache
chmod -R 777 /var/www/html/database
chmod -R 777 "$DB_DIR"
chown -R www-data:www-data /var/www/html/storage
chown -R www-data:www-data /var/www/html/bootstrap/cache
chown -R www-data:www-data /var/www/html/database
chown -R www-data:www-data "$DB_DIR"

echo "✅ Permisos configurados"

# Limpiar caches previos
echo "🧹 Limpiando caches..."
php artisan config:clear || true
php artisan route:clear || true
php artisan view:clear || true
php artisan cache:clear || true

# Ejecutar migraciones
echo "🗄️  Ejecutando migraciones..."
php artisan migrate --force --no-interaction

# Crear solamente valores de configuración que aún no existan.
echo "🌱 Verificando configuración inicial..."
php artisan db:seed --force --no-interaction

# Optimizaciones de Laravel para produccion
echo "⚡ Optimizando aplicacion..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Crear enlace simbolico de storage (forzar recreacion)
echo "🔗 Configurando storage link..."
php artisan storage:link --force || echo "   Error creando storage link"

# Verificar que el symlink existe
if [ -L /var/www/html/public/storage ]; then
    echo "✅ Storage link creado correctamente"
else
    echo "⚠️  Creando symlink manualmente..."
    ln -sf /var/www/html/storage/app/public /var/www/html/public/storage
fi

# Iniciar PHP-FPM en background
echo "🐘 Iniciando PHP-FPM..."
php-fpm -D

# Verificar que PHP-FPM esta corriendo
sleep 2
if ! pgrep "php-fpm" > /dev/null; then
    echo "❌ Error: PHP-FPM no se inicio correctamente"
    exit 1
fi

echo "✅ PHP-FPM iniciado correctamente"

# Iniciar Nginx en foreground
echo "🌐 Iniciando Nginx en puerto 8080..."
echo "✨ Petrotekno CMS esta listo!"
nginx -g "daemon off;"
