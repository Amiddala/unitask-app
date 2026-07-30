import { useNavigate } from 'react-router-dom';
import './FloatingActionButton.css';

function FloatingActionButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="fab"
      onClick={() => navigate('/actividades/nueva')}
      aria-label="Nueva actividad"
    >
      +
    </button>
  );
}

export default FloatingActionButton;