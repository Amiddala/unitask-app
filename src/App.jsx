import { Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import RegisterForm from './components/RegisterForm/RegisterForm';
import LoginForm from './components/LoginForm/LoginForm';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/registro" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
      {/* US-04 agregará /dashboard */}
    </Routes>
  );
}

export default App;