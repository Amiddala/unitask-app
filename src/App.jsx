import { Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import RegisterForm from './components/RegisterForm/RegisterForm';
import LoginForm from './components/LoginForm/LoginForm';
import DashboardScreen from './pages/DashboardScreen/DashboardScreen';
import TasksScreen from './pages/TasksScreen/TasksScreen';
import GroupDetailScreen from './screens/GroupDetailScreen'; // Importacion US-09
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/registro" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardScreen />
          </ProtectedRoute>
        }
      />
      {/* US-05, US-07, US-09 agregaran /tareas, /examenes, /grupos */}
      <Route
        path="/tareas"
        element={
          <ProtectedRoute>
            <TasksScreen />
          </ProtectedRoute>
        }
      />
      {/* Implementacion US-09: Vista Detallada de Grupo */}
      <Route
        path="/grupos/:id"
        element={
          <ProtectedRoute>
            <GroupDetailScreen />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;