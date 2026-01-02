#!/bin/sh
set -e

echo "🚀 Iniciando Petrotekno CMS..."

# Verificar que las variables de entorno críticas están configuradas
if [ -z "$APP_KEY" ]; then
    echo "❌ Error: APP_KEY no está configurada"
    echo "   Por favor configura las variables de entorno en Dokploy"
    exit 1
fi

echo "✅ Variables de entorno cargadas correctamente"

# Asegurar que la base de datos SQLite existe
echo "📦 Verificando base de datos SQLite..."
if [ ! -f /var/www/html/database/database.sqlite ]; then
    echo "   Creando database.sqlite..."
    touch /var/www/html/database/database.sqlite
    chown www-data:www-data /var/www/html/database/database.sqlite
    chmod 664 /var/www/html/database/database.sqlite
fi

# Dar permisos correctos
echo "🔒 Configurando permisos..."
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/database
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/database

# Limpiar cachés previos
echo "🧹 Limpiando cachés..."
php artisan config:clear || true
php artisan route:clear || true
php artisan view:clear || true
php artisan cache:clear || true

# Ejecutar migraciones
echo "🗄️  Ejecutando migraciones..."
php artisan migrate --force --no-interaction

# Ejecutar seeders si es primera vez (verificar si hay datos)
echo "🌱 Verificando seeders..."
php artisan db:seed --force --no-interaction || echo "   Seeders ya ejecutados o no necesarios"

# Optimizaciones de Laravel para producción
echo "⚡ Optimizando aplicación..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Crear enlace simbólico de storage si no existe
echo "🔗 Configurando storage link..."
php artisan storage:link || echo "   Storage link ya existe"

# Iniciar PHP-FPM en background
echo "🐘 Iniciando PHP-FPM..."
php-fpm -D

# Verificar que PHP-FPM está corriendo
sleep 2
if ! pgrep -x "php-fpm" > /dev/null; then
    echo "❌ Error: PHP-FPM no se inició correctamente"
    exit 1
fi

echo "✅ PHP-FPM iniciado correctamente"

# Iniciar Nginx en foreground
echo "🌐 Iniciando Nginx en puerto 8080..."
echo "✨ Petrotekno CMS está listo!"
nginx -g "daemon off;"
