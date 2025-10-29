# CashTrackr Frontend

Domina tus finanzas con nuestro **Administrador de Gastos**.  
Simplifica la gestión de tus **ingresos y egresos** en un solo lugar, de manera **intuitiva y eficiente**.  
Toma el control total de tus **finanzas personales o empresariales** con una interfaz moderna, rápida y fácil de usar.

---

## 🚀 Tecnologías utilizadas

- **Next.js 15.5.5**  
- **React**  
- **TypeScript**  
- **TailwindCSS** 

---

## 📂 Estructura del proyecto

- `app/` → Contiene las rutas principales y layouts del proyecto
- `components/` → Componentes reutilizables divididos por módulos (`auth`, `budgets`, `expenses`, `profile`, `ui`)
- `public/` → Archivos estáticos como imágenes y recursos públicos
- `src/auth/` → Lógica relacionada con autenticación
- `src/schemas/` → Esquemas de validación y tipos
- `src/services/` → Módulos para la comunicación con el backend
- `src/utils/` → Funciones auxiliares y utilidades generales
- `.env` → Variables de entorno
---


## ⚙️ Configuración del entorno

Crea un archivo `.env.local` en la raíz del proyecto con la siguiente variable:

```env
API_URL=url_api
NEXT_PUBLIC_URL=url_next
```

## 🔗 Repositorios relacionados

- [Frontend - Next.js + TS](https://github.com/crisomarjs/cashtrackr-frontend)
- [Backend - Node + Express + TS + PostgreSQL](https://github.com/crisomarjs/cashtrackr-backend)

