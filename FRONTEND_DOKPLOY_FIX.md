# Solución para Error 502 en Frontend (Dokploy)

## Problema Identificado

El error 502 Bad Gateway se debe a que **Vite necesita las variables de entorno en tiempo de BUILD**, no en runtime. Dokploy estaba configurando `VITE_API_URL` como variable de entorno del contenedor, pero el build ya se había completado sin esa variable.

## Cambios Realizados en el Código

### 1. Dockerfile actualizado
- Se agregó un valor por defecto para `VITE_API_URL` en el ARG
- Esto asegura que el build siempre tenga la URL correcta del API

### 2. nginx.conf mejorado
- Se agregó logging detallado para debug
- Se mejoró el manejo de errores 404

## Configuración en Dokploy

### ⚠️ IMPORTANTE: Eliminar Variable de Entorno

**En Dokploy, ve a la pestaña "Environment" y ELIMINA la variable:**
```
VITE_API_URL=https://cmspetro.110694.xyz
```

Esta variable NO funciona en runtime porque Vite empaqueta todo durante el build.

### Configuración Correcta:

1. **Build Settings:**
   - Build Type: `Dockerfile`
   - Docker File: `Dockerfile`
   - Docker Context Path: `webpetrotekno`
   - Docker Build Stage: *(vacío)*

2. **Domain Settings:**
   - Host: `petrofront.110694.xyz`
   - Path: `/`
   - Internal Path: `/`
   - Container Port: `80`
   - HTTPS: ✅ Enabled (Let's Encrypt)

3. **Deployment:**
   - Trigger Type: `On Push`
   - Branch: `feature/dockerfileconfig` (o tu branch actual)
   - Autodeploy: ✅ Enabled

## Pasos para Resolver el Error 502

### Opción 1: Push los cambios y redeploy automático

```bash
cd /Users/ebravo/proyects/webpetrotekno
git add webpetrotekno/Dockerfile webpetrotekno/nginx.conf
git commit -m "fix: Corregir configuración Docker para Vite build con API URL"
git push origin feature/dockerfileconfig
```

El autodeploy se activará automáticamente.

### Opción 2: Rebuild manual en Dokploy

1. Ve a Dokploy → Tu aplicación frontend
2. Click en "Environment" → **Elimina la variable VITE_API_URL**
3. Click en "General" → Click en botón "Rebuild"
4. Espera a que el build termine
5. Verifica que el contenedor esté corriendo en logs

## Verificación

Después del redeploy, verifica:

1. **Logs del contenedor** deben mostrar:
   ```
   nginx/1.29.4
   start worker processes
   ```

2. **El sitio web debe cargar** en: https://petrofront.110694.xyz

3. **Las llamadas al API** deben ir a: https://cmspetro.110694.xyz

## Si el problema persiste

Si después de estos cambios aún ves el error 502, revisa:

1. **Logs detallados en Dokploy:**
   - Ve a la pestaña "Logs"
   - Busca errores específicos de nginx

2. **Verifica que el build generó archivos:**
   ```bash
   # En local, prueba el build:
   cd webpetrotekno
   npm ci --legacy-peer-deps
   VITE_API_URL=https://cmspetro.110694.xyz npm run build
   ls -la dist/  # Debe contener index.html y assets/
   ```

3. **Prueba el contenedor localmente:**
   ```bash
   docker build -t test-frontend ./webpetrotekno
   docker run -p 8080:80 test-frontend
   # Abre http://localhost:8080
   ```

## Notas Técnicas

- **Vite embeds environment variables during build**: Todas las variables que comienzan con `VITE_` se empaquetan en el JavaScript final durante `npm run build`
- **Nginx sirve archivos estáticos**: El contenedor final solo sirve HTML/CSS/JS pre-construidos, no ejecuta código Node.js
- **Build Args vs Runtime Env**: `ARG` en Dockerfile es para build-time, `ENV` en el contenedor corriendo es para runtime

## Estructura Final

```
Frontend Container:
├── nginx (puerto 80)
└── /usr/share/nginx/html/
    ├── index.html (con API URL embebida)
    └── assets/
        ├── index-[hash].js (JavaScript con API URL)
        └── index-[hash].css
```
