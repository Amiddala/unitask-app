import { Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import RegisterForm from './components/RegisterForm/RegisterForm';
import LoginForm from './components/LoginForm/LoginForm';
import DashboardScreen from './pages/DashboardScreen/DashboardScreen';
import TasksScreen from './pages/TasksScreen/TasksScreen';
import ProfileScreen from './pages/ProfileScreen/ProfileScreen';
import SettingsScreen from './pages/SettingsScreen/SettingsScreen';
import EditAccountScreen from './pages/EditAccountScreen/EditAccountScreen';
import TaskDetailScreen from './pages/TaskDetailScreen/TaskDetailScreen';
import ExamsScreen from './pages/ExamsScreen/ExamsScreen';
import GroupsScreen from './pages/GroupsScreen/GroupsScreen';
import HelpScreen from './pages/HelpScreen/HelpScreen';
import NotImplementedScreen from './pages/NotImplementedScreen/NotImplementedScreen';
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
      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <ProfileScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/perfil/configuracion"
        element={
          <ProtectedRoute>
            <SettingsScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/perfil/editar-cuenta"
        element={
          <ProtectedRoute>
            <EditAccountScreen />
          </ProtectedRoute>
        }
      />
      {/* US-05, US-07, US-09 agregarán /tareas, /examenes, /grupos */}
      <Route
        path="/tareas"
        element={
          <ProtectedRoute>
            <TasksScreen />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tareas/:id"
        element={
          <ProtectedRoute>
            <TaskDetailScreen />
          </ProtectedRoute>
        }
      />

      <Route
        path="/examenes"
        element={
          <ProtectedRoute>
            <ExamsScreen />
          </ProtectedRoute>
        }
      />

      <Route
        path="/grupos"
        element={
          <ProtectedRoute>
            <GroupsScreen />
          </ProtectedRoute>
        }
      />
      <Route path="/ayuda" element={<HelpScreen />} />
      <Route
        path="/en-desarrollo"
        element={
          <ProtectedRoute>
            <NotImplementedScreen />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;