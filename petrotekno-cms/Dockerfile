# Dockerfile for Petrotekno CMS (Laravel 12)
FROM php:8.2-fpm-alpine

# Instalar dependencias del sistema y extensiones PHP necesarias
RUN apk add --no-cache \
    nginx \
    sqlite \
    sqlite-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    curl \
    oniguruma-dev \
    && docker-php-ext-install \
    pdo \
    pdo_sqlite \
    zip \
    mbstring

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Establecer directorio de trabajo
WORKDIR /var/www/html

# Copiar solo archivos de dependencias primero (mejor caching)
COPY composer.json composer.lock ./

# Instalar dependencias de PHP
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction \
    --prefer-dist

# Copiar el resto de los archivos de la aplicación
COPY . .

# Crear estructura de directorios y permisos
RUN mkdir -p \
    /var/www/html/storage/framework/cache/data \
    /var/www/html/storage/framework/sessions \
    /var/www/html/storage/framework/views \
    /var/www/html/storage/logs \
    /var/www/html/bootstrap/cache \
    /var/www/html/database \
    && touch /var/www/html/database/database.sqlite \
    && chown -R www-data:www-data \
    /var/www/html/storage \
    /var/www/html/bootstrap/cache \
    /var/www/html/database \
    && chmod -R 775 \
    /var/www/html/storage \
    /var/www/html/bootstrap/cache \
    /var/www/html/database \
    && chmod 664 /var/www/html/database/database.sqlite

# Copiar configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar script de inicio
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Exponer puerto 8080
EXPOSE 8080

# Usar script de inicio
ENTRYPOINT ["docker-entrypoint.sh"]
