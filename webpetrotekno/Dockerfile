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

# Declarar variable de entorno para el build
# Esta debe ser pasada con --build-arg durante docker build
ARG VITE_API_URL=https://cmspetro.110694.xyz
ENV VITE_API_URL=$VITE_API_URL

# Build de producción (Vite leerá VITE_API_URL del environment)
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
