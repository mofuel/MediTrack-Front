# MediTrack - Frontend

Frontend del sistema **MediTrack**, desarrollado con **React.js**, encargado de la interfaz de usuario para médicos, pacientes y administradores.

---

## ⚙️ Dependencias principales

- react
- react-router-dom
- react-bootstrap
- bootstrap
- sweetalert2
- @fortawesome/react-fontawesome
- bootstrap-icons

---

## 🔌 Conexión con el backend

En `src/config.js` se define la URL base del backend:

```javascript
const API_BASE_URL = "http://localhost:8080/api"; // Ajusta según tu backend
export default API_BASE_URL;
```

Todos los fetch y solicitudes al backend usan esta constante:

```javascript
fetch(`${API_BASE_URL}/auth/login`, { ... });
```

Para producción en Render, reemplaza la URL local por la URL pública del backend desplegado.

---

## 🚀 Despliegue en Render

### 1. Crear un nuevo servicio web

- **Tipo:** Static Site
- Conectar al repositorio GitHub del frontend
- **Branch:** main (o el que corresponda)

### 2. Configurar build y start commands

**Build Command:**
```bash
npm install
npm run build
```

**Publish Directory:**
```
build
```

### 3. Configurar variables de entorno en Render

`REACT_APP_API_BASE_URL` → URL del backend desplegado (por ejemplo `https://mediTrack-back.onrender.com/api`)

Esto permite que las solicitudes del frontend apunten al backend correcto en producción.

### 4. Deploy

Despliegue manual o automático al hacer push a GitHub.

Render te dará una URL pública, por ejemplo:
```
https://mediTrack-frontend.onrender.com
```

---

## 📝 Notas

- Asegúrate de que el backend esté desplegado antes de configurar el frontend
- Verifica que las URLs en `config.js` apunten correctamente al backend
- Configura CORS en el backend para permitir solicitudes desde el dominio del frontend
