# WebPetrotekno - Frontend (React + Vite)

Frontend de la página web de Petrotekno construido con React y Vite.

## 🚀 Tecnologías

- **React 19** - Librería de UI
- **Vite** - Build tool y dev server
- **React Router** - Navegación
- **Framer Motion** - Animaciones
- **Phosphor Icons** - Iconografía
- **Tailwind CSS** - Estilos (configurado)

## 📦 Instalación Local

```bash
# Instalar dependencias
npm install --legacy-peer-deps

# Crear archivo .env (copiar de .env.example)
cp .env.example .env

# Editar .env y configurar:
# VITE_API_URL=http://localhost:8000  # URL del backend local

# Iniciar servidor de desarrollo
npm run dev
```

El servidor estará disponible en `http://localhost:5173`

## 🏗️ Build de Producción

```bash
# Build con URL de API personalizada
VITE_API_URL=https://cmspetro.110694.xyz npm run build

# Preview del build
npm run preview
```

## 🐳 Docker

### Build local
```bash
# Build de la imagen
docker build -t webpetrotekno:latest .

# Correr contenedor
docker run -p 8080:80 webpetrotekno:latest

# Acceder en http://localhost:8080
```

### Docker Compose (con backend)
Ver archivo `docker-compose.yml` en la raíz del proyecto.

## 🚢 Deployment en Dokploy

### Configuración Automática

El proyecto está configurado para deployment automático en Dokploy:

1. **Build Type:** Dockerfile
2. **Docker Context Path:** `webpetrotekno`
3. **Branch:** `feature/dockerfileconfig` (o main)
4. **Container Port:** 80

### Variables de Entorno

⚠️ **IMPORTANTE**: NO configures `VITE_API_URL` como variable de entorno en Dokploy.

La URL del API está definida directamente en el Dockerfile:
```dockerfile
ARG VITE_API_URL=https://cmspetro.110694.xyz
```

Si necesitas cambiarla, modifica el Dockerfile y haz push.

### Dominio

- **Frontend:** https://petrofront.110694.xyz
- **Backend API:** https://cmspetro.110694.xyz

### Logs y Troubleshooting

Ver el archivo `FRONTEND_DOKPLOY_FIX.md` para solución de problemas comunes.

## 📁 Estructura del Proyecto

```
webpetrotekno/
├── public/              # Archivos estáticos
├── src/
│   ├── assets/         # Imágenes, fuentes, etc.
│   ├── components/     # Componentes reutilizables
│   ├── hooks/          # Custom hooks
│   ├── pages/          # Páginas/vistas
│   ├── services/       # API calls (api.js)
│   ├── App.jsx         # Componente principal
│   ├── main.jsx        # Entry point
│   └── index.css       # Estilos globales
├── Dockerfile          # Configuración Docker
├── nginx.conf          # Configuración Nginx
├── vite.config.js      # Configuración Vite
└── package.json
```

## 🔌 API Integration

El frontend consume el API del CMS Laravel. Ver `src/services/api.js` para los endpoints disponibles:

- `GET /config` - Configuración del sitio
- `GET /servicios` - Lista de servicios
- `GET /servicios/{slug}` - Detalle de servicio
- `GET /obras` - Lista de obras
- `GET /obras/{slug}` - Detalle de obra
- `GET /obras/por-estado` - Estadísticas por estado
- `GET /redes` - Redes sociales

## 🎨 Scripts Disponibles

```bash
npm run dev       # Servidor de desarrollo
npm run build     # Build de producción
npm run preview   # Preview del build
npm run lint      # Linter ESLint
```

## 🔧 Configuración

### Vite Config (`vite.config.js`)
Configuración básica de Vite con plugin de React.

### Nginx Config (`nginx.conf`)
- Compresión Gzip
- Cache de archivos estáticos
- SPA fallback (todas las rutas → index.html)
- Headers de seguridad

## 🐛 Problemas Comunes

### Error 502 en Dokploy
Ver `FRONTEND_DOKPLOY_FIX.md` para la solución completa.

### API no responde
Verifica que el backend esté corriendo y accesible en la URL configurada.

### Build falla
```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

## 📝 Notas de Desarrollo

- Usar `--legacy-peer-deps` para instalar dependencias (conflictos de versión de React)
- Las variables de entorno VITE_* son embebidas en el build
- El frontend es una SPA (Single Page Application)
- Todas las rutas son manejadas por React Router
- Nginx solo sirve archivos estáticos

## 📄 Licencia

Propiedad de Petrotekno.
