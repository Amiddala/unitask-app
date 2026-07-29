import { Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      {/* US-02 agregará /registro, US-03 agregará /login */}
    </Routes>
  );
}

export default App;