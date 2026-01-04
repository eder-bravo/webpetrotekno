# ✅ Checklist de Deploy - Dokploy

Usa este checklist para asegurarte de no olvidar nada.

---

## 📋 Pre-Deploy

- [ ] Todos los archivos Docker están creados y commiteados
- [ ] Código funciona correctamente en local
- [ ] Base de datos SQLite tiene seeders configurados
- [ ] Frontend se puede buildar sin errores (`npm run build`)

---

## 🔐 Configuración de Seguridad

- [ ] Generar nuevo `APP_KEY` para producción:
  ```bash
  cd petrotekno-cms
  php artisan key:generate --show
  ```
- [ ] Copiar el APP_KEY generado (lo necesitarás en Dokploy)

---

## 🚀 Deploy Backend (Dokploy)

### Crear Aplicación
- [ ] Nuevo proyecto llamado "Petrotekno"
- [ ] Nueva aplicación: "petrotekno-backend"
- [ ] Conectar repositorio Git
- [ ] Build Path: `petrotekno-cms`
- [ ] Dockerfile Path: `./Dockerfile`
- [ ] Puerto: `8080`

### Variables de Entorno
- [ ] `APP_NAME=Petrotekno CMS`
- [ ] `APP_ENV=production`
- [ ] `APP_KEY=` (el que generaste)
- [ ] `APP_DEBUG=false`
- [ ] `APP_URL=` (tu URL de backend)
- [ ] `DB_CONNECTION=sqlite`
- [ ] `SESSION_DRIVER=file`
- [ ] `CACHE_STORE=file`
- [ ] `QUEUE_CONNECTION=sync`
- [ ] `LOG_LEVEL=error`

### Deploy
- [ ] Click en "Deploy"
- [ ] Esperar a que termine (3-5 min)
- [ ] Verificar en Logs que no hay errores
- [ ] Copiar la URL del backend (la necesitarás para el frontend)

### Verificación Backend
- [ ] Visitar: `https://tu-backend.dokploy.app/api/config`
- [ ] Debe retornar JSON con configuración
- [ ] Visitar: `https://tu-backend.dokploy.app/api/servicios`
- [ ] Debe retornar array de servicios

---

## 🎨 Deploy Frontend (Dokploy)

### Crear Aplicación
- [ ] En el mismo proyecto "Petrotekno"
- [ ] Nueva aplicación: "petrotekno-frontend"
- [ ] Mismo repositorio Git
- [ ] Build Path: `webpetrotekno`
- [ ] Dockerfile Path: `./Dockerfile`
- [ ] Puerto: `80`

### Variables de Entorno
- [ ] `VITE_API_URL=https://tu-backend.dokploy.app/api`
  - ⚠️ Reemplazar con la URL real del backend
  - ✅ Incluir `/api` al final

### Deploy
- [ ] Click en "Deploy"
- [ ] Esperar a que termine (2-4 min)
- [ ] Verificar en Logs que el build fue exitoso

### Verificación Frontend
- [ ] Abrir la URL del frontend en navegador
- [ ] La página debe cargar correctamente
- [ ] Verificar que muestra datos (servicios, obras)
- [ ] Navegar entre páginas (debe funcionar)
- [ ] Abrir consola del navegador (F12) → No debe haber errores rojos

---

## 🔧 Configuración Adicional (Opcional pero Recomendado)

### Dominios Personalizados
- [ ] Backend: Configurar dominio en Dokploy
- [ ] Frontend: Configurar dominio en Dokploy
- [ ] Actualizar `APP_URL` en variables del backend
- [ ] Actualizar `VITE_API_URL` y re-deployar frontend

### SSL/HTTPS
- [ ] Habilitar SSL en backend (Let's Encrypt)
- [ ] Habilitar SSL en frontend (Let's Encrypt)
- [ ] Verificar que ambos usen HTTPS

### Persistencia de Datos
- [ ] En backend → Settings → Volumes
- [ ] Agregar volume: `/var/www/html/database` → `/data/petrotekno-db`
- [ ] Re-deployar backend
- [ ] Esto preserva la BD entre deploys

---

## ✅ Verificación Final

### Tests Funcionales
- [ ] Página de inicio carga
- [ ] Sección "Servicios" muestra contenido
- [ ] Sección "Obras" muestra contenido
- [ ] Mapa de México funciona
- [ ] Formulario de contacto existe
- [ ] Footer muestra redes sociales
- [ ] Navegación funciona sin errores

### Tests Técnicos
- [ ] Backend responde a todas las rutas API
- [ ] Frontend consume API correctamente
- [ ] No hay errores 404 en assets
- [ ] Imágenes cargan correctamente
- [ ] Performance es aceptable (usa Lighthouse)

### Tests de Consola (Frontend F12)
- [ ] No hay errores en Console
- [ ] No hay errores en Network
- [ ] API calls son exitosos (200 OK)

---

## 📊 Monitoreo

- [ ] Revisar logs del backend regularmente
- [ ] Revisar logs del frontend regularmente
- [ ] Verificar uso de recursos (CPU, RAM)
- [ ] Configurar alertas si Dokploy lo permite

---

## 🐛 Si Algo Falla

### Backend no responde
1. [ ] Revisar logs en Dokploy
2. [ ] Verificar todas las variables de entorno
3. [ ] Verificar que el puerto es 8080
4. [ ] Re-deployar

### Frontend muestra errores
1. [ ] Verificar VITE_API_URL en variables
2. [ ] Abrir F12 → Network → Ver qué falla
3. [ ] Verificar que backend está corriendo
4. [ ] Re-deployar con URL correcta

### Base de datos vacía
1. [ ] Conectar a consola del backend en Dokploy
2. [ ] Ejecutar: `php artisan db:seed --force`
3. [ ] Verificar de nuevo

---

## 🎉 ¡Deploy Completado!

Si todos los checks están ✅, tu aplicación está funcionando correctamente en producción.

### Compartir
- [ ] Probar en diferentes dispositivos
- [ ] Probar en diferentes navegadores
- [ ] Compartir URL con stakeholders

### Siguiente
- [ ] Documentar el proceso
- [ ] Configurar backups automáticos
- [ ] Planear estrategia de actualizaciones

---

**Tiempo total estimado: 30-45 minutos**

¿Algún problema? Consulta: [DOKPLOY_DEPLOYMENT_GUIDE.md](./DOKPLOY_DEPLOYMENT_GUIDE.md)
