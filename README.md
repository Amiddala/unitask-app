# UniTask

Plataforma frontend para centralizar la vida académica universitaria: tareas, exámenes y grupos de trabajo en un solo lugar.

Desarrollado como proyecto de **Interacción Humano Computador**.

 **Demo en producción:** [agregar URL de Vercel aquí]
 **Repositorio:** [github.com/Amiddala/unitask-app](https://github.com/Amiddala/unitask-app)

---

## Descripción

UniTask permite a los estudiantes:

- Gestionar **tareas** personales y grupales, con subtareas y seguimiento de progreso.
- Llevar un **calendario de exámenes**, agrupados por mes, con historial.
- Coordinar **grupos de trabajo**: anuncios, apuntes compartidos, videollamadas y códigos de invitación.
- Recibir **alertas** de actividades próximas a vencer.
- Gestionar su **perfil** y configuración de cuenta.

> Este proyecto cubre exclusivamente el **frontend**. Los datos se manejan con mock data / `localStorage` en el cliente, sin backend real.

---

## Stack Tecnológico

- **React** (componentes funcionales + Hooks)
- **Vite** — bundler y dev server
- **React Router DOM** — enrutamiento SPA
- **Context API** — manejo de estado global (usuario, tareas, exámenes, grupos)
- **JavaScript (ES6+)**

---

## Instalación y uso local

```bash
# Clonar el repositorio
git clone https://github.com/Amiddala/unitask-app.git
cd unitask-app

# Instalar dependencias
npm install

# Levantar servidor de desarrollo
npm run dev
```

La app queda disponible en `http://localhost:5173/`.

### Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Levanta el servidor de desarrollo con hot-reload |
| `npm run build` | Genera el build de producción en `/dist` |
| `npm run preview` | Sirve localmente el build de producción para verificarlo |

---

## Estructura del proyecto

```
src/
  context/
    AppContext.jsx        # Estado global: user, tasks, exams, groups
  routes/
    ProtectedRoute.jsx    # Wrapper de rutas privadas
  screens/
    auth/                 # Bienvenida, Registro, Login
    dashboard/             # Inicio
    tasks/                 # Listado y detalle de tareas
    exams/                 # Listado de exámenes
    groups/                 # Listado y detalle de grupos
    profile/                # Perfil y configuración
  components/
    shared/                # Componentes reutilizables (NavBar, FAB, Tabs, Badge)
    Groups/                 # Componentes propios de la vista de grupo
  App.jsx
  main.jsx
```

---

## Historias de Usuario implementadas

### Acceso
- **US-01** Pantalla de bienvenida
- **US-02** Registro de usuario
- **US-03** Inicio de sesión

### Principal
- **US-04** Dashboard con calendario, tareas y exámenes próximos
- **US-05** Listado de tareas por estado (Pendientes / En Progreso / Completadas)
- **US-06** Detalle de tarea con subtareas y progreso
- **US-07** Listado de exámenes agrupados por mes + historial
- **US-08** Listado de grupos con invitaciones
- **US-09** Vista de grupo (anuncios, apuntes, participantes, videollamada)
- **US-10** Crear anuncio en grupo
- **US-11** Agregar apuntes en grupo
- **US-12** Añadir nueva actividad (tarea / examen / grupo)

### Alertas
- **US-13** Alerta de actividades próximas a vencer

### Perfil
- **US-14** Vista de perfil de usuario
- **US-15** Configuración de cuenta

---

## Flujo de ramas (Git)

- `main` → rama estable, refleja producción.
- `develop` → integración de features antes de pasar a producción.
- `feature/*` → una rama por historia de usuario o funcionalidad.

Antes de mergear a `develop`/`main`, correr `npm run build` localmente para confirmar que no existan imports rotos o errores de compilación.

---

## Despliegue

El proyecto se despliega automáticamente en **Vercel** a partir de la rama `develop`:

- Cada push a `develop` dispara un deploy de producción.
- Cada Pull Request genera un **Preview Deployment** con URL propia para revisión antes de mergear.

---

## Equipo de Desarrollo

| Integrante | Historias de Usuario |
|---|---|
| [Nombre] | US-01 a US-04 (Acceso + Dashboard) |
| [Nombre] | US-05 a US-08 (Tareas + Exámenes + Grupos - listado) |
| [Nombre] | US-09 a US-12 (Vista de grupo + Nueva actividad) |
| [Nombre] | US-13 a US-15 (Alertas + Perfil + Configuración) |

*(completar con los nombres reales del equipo)*

---

## Licencia

Proyecto académico — Interacción Humano Computador.
