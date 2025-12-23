# 📋 Página de Contacto - Rama: feature/contact-page

## 📝 Descripción

Se ha creado una rama nueva llamada **`feature/contact-page`** basada en la rama `cms` (la más actual) que contiene una **página completa de contacto** para el sitio web frontend de Petrotekno.

## 🎯 Características Implementadas

### 1. **Página Principal de Contacto** (`Contacto.jsx`)
   - Componente page que integra todos los elementos
   - Incluye Navbar, Hero, Formulario, Info de contacto y Footer
   - Ruta accessible en `/contacto`

### 2. **Componente Hero** (`ContactHero.jsx` + `ContactHero.css`)
   - Sección de encabezado atractiva
   - Título "Contáctanos" y descripción
   - Diseño responsive con gradientes
   - Altura de 400px en desktop, 300px en mobile

### 3. **Formulario de Contacto** (`ContactForm.jsx` + `ContactForm.css`)
   - Campos: Nombre, Email, Asunto, Mensaje
   - Validación HTML5 integrada
   - Envío a endpoint `/api/contacto` (POST)
   - Mensajes de éxito y error dinámicos
   - Botón de envío con estado de loading
   - Diseño responsive (2 columnas en desktop, 1 en mobile)
   - Estilos con transiciones suaves y feedback visual

### 4. **Información de Contacto** (`ContactInfo.jsx` + `ContactInfo.css`)
   - Tarjetas con información de contacto (4 tarjetas)
   - **Teléfono**: Con enlace para llamar directamente
   - **Email**: Con enlace mailto
   - **Ubicación**: Con enlace a Google Maps
   - **Horario de atención**: Información de disponibilidad
   - Integración con datos del CMS (config y redes sociales)
   - Iconos de Lucide React para mejor diseño
   - Sección de mensaje de bienvenida al final

### 5. **Actualizaciones de Navegación**
   - **App.jsx**: Se agregó la ruta `/contacto`
   - **Navbar.jsx**: 
     - Convertido a usar botones en lugar de links
     - Implementada navegación con React Router
     - Soporte para scroll a secciones en home page
     - Navegación hacia la página de contacto
   - **Navbar.css**: Se añadieron estilos para los botones de navegación

## 📁 Estructura de Archivos Creados

```
webpetrotekno/
├── src/
│   ├── pages/
│   │   ├── Contacto.jsx           (Página principal)
│   │   └── Contacto.css           (Estilos de la página)
│   ├── components/
│   │   ├── ContactHero.jsx        (Sección hero)
│   │   ├── ContactHero.css
│   │   ├── ContactForm.jsx        (Formulario)
│   │   ├── ContactForm.css
│   │   ├── ContactInfo.jsx        (Info de contacto)
│   │   ├── ContactInfo.css
│   │   ├── Navbar.jsx             (Actualizado)
│   │   └── Navbar.css             (Actualizado)
│   └── App.jsx                    (Actualizado)
```

## 🎨 Diseño y Estilos

- **Colores**: Utiliza la paleta de colores existente del proyecto
  - Primario: `#FFFF00` (Amarillo)
  - Secundario: `#0A192F` (Navy)
  - Acentos: Gradientes personalizados

- **Tipografía**: 
  - Headings: Oswald (700 weight)
  - Body: Inter (300-600 weights)

- **Responsive**: 
  - Mobile first approach
  - Breakpoints en 768px
  - Adapta layout de grid 2 columnas a 1 columna

- **Componentes UI**:
  - Tarjetas con shadow y hover effects
  - Botones con transiciones suaves
  - Mensajes de éxito/error con estilos diferenciados
  - Iconos de Lucide React

## 🔄 Integración con Backend

El formulario está configurado para enviar datos a:
```
POST /api/contacto
```

**Payload esperado:**
```json
{
  "nombre": "Nombre del usuario",
  "email": "usuario@email.com",
  "asunto": "Asunto del mensaje",
  "mensaje": "Contenido del mensaje"
}
```

## 📱 Puntos de Acceso

- **URL**: `/contacto`
- **Navbar**: Botón "Contacto" en la navegación principal
- **Footer**: Sección de contacto (ya existía, ahora enlaza a la página)

## ✅ Requisitos Completados

- ✅ Rama creada basada en `cms` (rama más actual)
- ✅ Página completa y funcional
- ✅ Formulario con validación
- ✅ Información de contacto dinámica (desde CMS)
- ✅ Diseño responsive
- ✅ Estilos consistentes con el diseño actual
- ✅ Integración con React Router
- ✅ Iconografía consistente (Lucide React)
- ✅ Commit realizado con mensaje descriptivo

## 🚀 Próximos Pasos

1. **Backend**: Crear endpoint `/api/contacto` que:
   - Valide los datos
   - Guarde el mensaje en la base de datos o envíe email
   - Retorne respuesta de éxito/error

2. **Pruebas**: Probar el formulario en diferentes dispositivos

3. **Mejoras Opcionales**:
   - Agregar recaptcha para prevenir spam
   - Implementar validaciones más robustas en backend
   - Agregar estados (cargando, enviado, error)
   - Enviar emails de confirmación

4. **Deployment**: Cuando esté lista, hacer merge con `cms`

## 📊 Información del Commit

```
Rama: feature/contact-page
Commits: 1
Cambios: 11 archivos modificados/creados
Inserciones: 645 líneas
```

---

**Rama actual**: `feature/contact-page`
**Estado**: Listo para pruebas y revisión
