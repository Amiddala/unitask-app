import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import BottomNavBar from '../shared/BottomNavBar';
import ProfileAvatarButton from '../../components/Profile/ProfileAvatarButton';
import './DashboardLayout.css';

function DashboardLayout({ children, hideBottomNav = false, showBack = false, backAction, title }) {
  const navigate = useNavigate();
  const { user } = useApp();

  const initials = user?.avatarIniciales || '??';
  const firstName = user?.nombreCompleto?.split(' ')[0] || 'Estudiante';
  const today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const handleBack = () => {
    if (typeof backAction === 'function') {
      backAction();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="dashboard-layout">
      <header
        className={`dashboard-layout__header ${showBack ? 'dashboard-layout__header--back' : ''}`}
      >
        {showBack ? (
          <div className="dashboard-layout__header-back">
            <button
              type="button"
              className="dashboard-layout__back-button"
              onClick={handleBack}
              aria-label="Volver"
            >
              ←
            </button>
            <div>
              <p className="dashboard-layout__title">{title || 'Perfil'}</p>
            </div>
          </div>
        ) : (
          <>
            <div>
              <p className="dashboard-layout__greeting">Hola, {firstName}</p>
              <p className="dashboard-layout__date">{today}</p>
            </div>
              <ProfileAvatarButton
              initials={initials}
              avatarUrl={user?.avatarUrl}
              onClick={() => navigate('/perfil')}
              ariaLabel="Ver perfil"
            />
          </>
        )}
      </header>

      <div className="dashboard-layout__content">{children}</div>

      {!hideBottomNav && <BottomNavBar />}
    </div>
  );
}

export default DashboardLayout;