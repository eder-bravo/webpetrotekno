# ⚡ Quick Start - Petrotekno en Dokploy

## 🚀 En 5 Pasos

### 1️⃣ Commit Archivos Docker
```bash
git add .
git commit -m "Add Docker configuration for Dokploy deployment"
git push
```

### 2️⃣ Backend en Dokploy
- Nueva app: **petrotekno-backend**
- Build Path: `petrotekno-cms`
- Puerto: `8080`
- Variables: Ver [.env.production.example](petrotekno-cms/.env.production.example)
- Deploy → Copiar URL

### 3️⃣ Frontend en Dokploy
- Nueva app: **petrotekno-frontend**
- Build Path: `webpetrotekno`
- Puerto: `80`
- Variable: `VITE_API_URL=https://tu-backend-url/api`
- Deploy

### 4️⃣ Verificar
- Backend: `https://tu-backend/api/config`
- Frontend: Abrir en navegador

### 5️⃣ ¡Listo! 🎉

---

## 📚 Documentación Completa

**Primera vez?** → [DOKPLOY_DEPLOYMENT_GUIDE.md](./DOKPLOY_DEPLOYMENT_GUIDE.md)

**Checklist?** → [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

**Problemas?** → [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

**Índice completo?** → [DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)

---

**Tiempo estimado: 30-45 minutos** ⏱️
