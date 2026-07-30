import { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext(null);

const addDays = (n) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
};

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
    return JSON.parse(localStorage.getItem('unitask_user'));
  } catch {
    return null;
  }
}

const initialState = {
  user: readStoredUser(),
  tasks: initialTasks,
  exams: initialExams,
  groups: [],
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
      localStorage.setItem('unitask_user', JSON.stringify(state.user));
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