import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import BottomNavBar from '../shared/BottomNavBar';
import './DashboardLayout.css';

function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const { user } = useApp();

  const initials = user?.avatarIniciales || '??';
  const firstName = user?.nombreCompleto?.split(' ')[0] || 'Estudiante';
  const today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="dashboard-layout">
      <header className="dashboard-layout__header">
        <div>
          <p className="dashboard-layout__greeting">Hola, {firstName}</p>
          <p className="dashboard-layout__date">{today}</p>
        </div>
        <button
          type="button"
          className="dashboard-layout__avatar"
          onClick={() => navigate('/perfil')}
          aria-label="Ver perfil"
        >
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt="Avatar del usuario"
              className="dashboard-layout__avatar-image"
            />
          ) : (
            initials
          )}
        </button>
      </header>

      <div className="dashboard-layout__content">{children}</div>

      <BottomNavBar />
    </div>
  );
}

export default DashboardLayout;