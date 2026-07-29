import { Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import RegisterForm from './components/RegisterForm/RegisterForm';
import LoginForm from './components/LoginForm/LoginForm';
import DashboardScreen from './pages/DashboardScreen/DashboardScreen';
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
      {/* US-05, US-07, US-09 agregarán /tareas, /examenes, /grupos */}
    </Routes>
  );
}

export default App;