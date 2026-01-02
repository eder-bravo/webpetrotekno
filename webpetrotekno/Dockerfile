# Dockerfile para Webpetrotekno (React + Vite)
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias primero (mejor caching)
COPY package*.json ./

# Instalar dependencias
RUN npm ci --legacy-peer-deps

# Copiar el resto de archivos del proyecto
COPY . .

# Build de producción
RUN npm run build

# Production stage
FROM nginx:alpine

# Copiar archivos construidos desde la etapa builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Nginx se ejecutará automáticamente
CMD ["nginx", "-g", "daemon off;"]
