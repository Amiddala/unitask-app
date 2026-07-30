import { useLocation, useNavigate } from 'react-router-dom';
import './ProfileComponents.css';

function NavigateToSettingsButton() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <button
      type="button"
      className="navigate-settings-button"
      onClick={() =>
        navigate('/perfil/configuracion', {
          state: { from: location.state?.from || '/dashboard' },
        })
      }
      aria-label="Ir a configuración"
    >
      <span>Configuración</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 18l6-6-6-6" />
      </svg>
    </button>
  );
}

export default NavigateToSettingsButton;
