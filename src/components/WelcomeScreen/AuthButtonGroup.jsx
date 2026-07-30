import { useNavigate } from 'react-router-dom';
import './AuthButtonGroup.css';

function AuthButtonGroup() {
  const navigate = useNavigate();

  return (
    <div className="auth-buttons">
      <button
        type="button"
        className="auth-buttons__btn auth-buttons__btn--primary"
        onClick={() => navigate('/registro')}
      >
        Registrarse
      </button>
      <button
        type="button"
        className="auth-buttons__btn auth-buttons__btn--secondary"
        onClick={() => navigate('/login')}
      >
        Iniciar sesión
      </button>
    </div>
  );
}

export default AuthButtonGroup;