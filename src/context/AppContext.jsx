import { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext(null);

const addDays = (n) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
};

function getNameInitials(nombreCompleto) {
  if (!nombreCompleto) return '??';
  return nombreCompleto
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

const initialTasks = [
  {
    id: 't1',
    titulo: 'Ensayo de Historia Contemporánea',
    materia: 'Historia',
    tipo: 'personal',
    estado: 'pendiente',
    fechaLimite: addDays(1).toISOString(),
    subtareasCompletadas: 0,
    subtareasTotal: 0,
  },
  {
    id: 't2',
    titulo: 'Maqueta puente colgante',
    materia: 'Física Aplicada',
    tipo: 'grupal',
    estado: 'enProgreso',
    fechaLimite: addDays(3).toISOString(),
    subtareasCompletadas: 2,
    subtareasTotal: 5,
  },
  {
    id: 't3',
    titulo: 'Informe de laboratorio',
    materia: 'Química',
    tipo: 'personal',
    estado: 'pendiente',
    fechaLimite: addDays(5).toISOString(),
    subtareasCompletadas: 0,
    subtareasTotal: 0,
  },
];

const initialExams = [
  {
    id: 'e1',
    titulo: 'Parcial de Cálculo II',
    materia: 'Matemáticas',
    fechaLimite: addDays(1).toISOString(),
    urgencia: 'alta',
  },
  {
    id: 'e2',
    titulo: 'Quiz de Bases de Datos',
    materia: 'Ingeniería de Software',
    fechaLimite: addDays(4).toISOString(),
    urgencia: 'media',
  },
];

const initialGroups = [
  {
    id: 'g1',
    nombre: 'Equipo Alfa - Prototipo',
    materia: 'Interacción Humano Computador',
    participantes: ['MM', 'CM', 'JP', 'AN', 'TL'],
    tieneReunionActiva: false
  },
  {
    id: 'g2',
    nombre: 'Grupo 4: Desarrollo Backend',
    materia: 'Taller de Ingeniería de Software',
    participantes: ['AR', 'CM'],
    tieneReunionActiva: true
  }
];

const initialInvitations = [
  {
    id: 'i1',
    nombre: 'Los Algorítmicos',
    materia: 'Estructura de Datos',
    remitente: 'Carlos Mendoza'
  }
];

function buildCalendarEvents(tasks, exams) {
  const map = {};
  const addEvent = (dateStr, type) => {
    const key = dateStr.slice(0, 10);
    if (!map[key]) map[key] = [];
    if (!map[key].includes(type)) map[key].push(type);
  };
  tasks.forEach((t) => addEvent(t.fechaLimite, t.tipo === 'grupal' ? 'grupal' : 'personal'));
  exams.forEach((e) => addEvent(e.fechaLimite, 'examen'));
  return map;
}

function readStoredUser() {
  try {
    const raw = JSON.parse(localStorage.getItem('unitask_user'));
    if (!raw) return null;

    const normalized = {
      ...raw,
      avatarIniciales: raw.avatarIniciales || getNameInitials(raw.nombreCompleto),
      avatarUrl: raw.avatarUrl || '',
      carrera: raw.carrera || 'Ingeniería de Software',
    };
    return normalized;
  } catch {
    return null;
  }
}

const initialState = {
  user: readStoredUser(),
  tasks: initialTasks,
  exams: initialExams,
  groups: initialGroups,
  invitation: initialInvitations,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'ADD_EXAM':
      return { ...state, exams: [...state.exams, action.payload] };
    case 'UPDATE_TASK_STATUS':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? { ...t, estado: action.payload.estado } : t,
        ),
      };
    // CASO PARA LA HU-6 Y PODER AGREGAR SUBTAREAS
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    // CASO PARA LA HU-8
    case 'ACCEPT_INVITATION':
      return {
        ...state,
        invitations: state.invitations.filter(inv => inv.id !== action.payload.id),
        groups: [...state.groups, action.payload.newGroup]
      };
    case 'DECLINE_INVITATION':
      return {
        ...state,
        invitations: state.invitations.filter(inv => inv.id !== action.payload)
      };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.user) {
      const storedUser = {
        ...state.user,
        avatarIniciales: state.user.avatarIniciales || getNameInitials(state.user.nombreCompleto),
      };
      localStorage.setItem('unitask_user', JSON.stringify(storedUser));
    } else {
      localStorage.removeItem('unitask_user');
    }
  }, [state.user]);

  const calendarEvents = buildCalendarEvents(state.tasks, state.exams);

  return (
    <AppContext.Provider value={{ ...state, calendarEvents, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp debe usarse dentro de <AppProvider>');
  return ctx;
}