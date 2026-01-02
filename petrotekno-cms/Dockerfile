# Dockerfile for Petrotekno CMS (Laravel 12)

# Etapa 1: Build de assets con Node.js
FROM node:20-alpine AS node-builder

WORKDIR /app

# Copiar archivos de dependencias de Node
COPY package.json package-lock.json* ./

# Instalar dependencias de Node
RUN npm ci

# Copiar código fuente necesario para el build
COPY resources ./resources
COPY vite.config.js ./
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY jsconfig.json ./

# Construir assets de producción
RUN npm run build

# Etapa 2: Imagen PHP final
FROM php:8.4-fpm-alpine

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

# Instalar dependencias de PHP (sin scripts, los ejecutaremos después)
RUN composer install \
    --no-dev \
    --no-scripts \
    --optimize-autoloader \
    --no-interaction \
    --prefer-dist

# Copiar el resto de los archivos de la aplicación
COPY . .

# Copiar assets construidos desde la etapa de Node.js
COPY --from=node-builder /app/public/build ./public/build

# Ejecutar scripts post-install de Laravel ahora que tenemos todos los archivos
RUN composer run-script post-autoload-dump

# Crear estructura de directorios y permisos
RUN mkdir -p \
    /var/www/html/storage/framework/cache/data \
    /var/www/html/storage/framework/sessions \
    /var/www/html/storage/framework/views \
    /var/www/html/storage/logs \
    /var/www/html/bootstrap/cache \
    /var/www/html/database \
    && touch /var/www/html/database/database.sqlite \
    && touch /var/www/html/storage/logs/laravel.log \
    && chown -R www-data:www-data \
    /var/www/html/storage \
    /var/www/html/bootstrap/cache \
    /var/www/html/database \
    && chmod -R 775 \
    /var/www/html/storage \
    /var/www/html/bootstrap/cache \
    /var/www/html/database \
    && chmod 664 /var/www/html/database/database.sqlite \
    && chmod 664 /var/www/html/storage/logs/laravel.log

# Copiar configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar script de inicio
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Exponer puerto 8080
EXPOSE 8080

# Usar script de inicio
ENTRYPOINT ["docker-entrypoint.sh"]
