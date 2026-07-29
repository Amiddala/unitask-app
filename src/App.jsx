import { Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import RegisterForm from './components/RegisterForm/RegisterForm';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/registro" element={<RegisterForm />} />
      {/* US-03 agregará /login */}
    </Routes>
  );
}

export default App;