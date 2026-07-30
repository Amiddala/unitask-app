import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import UserAvatarLarge from '../../components/Profile/UserAvatarLarge';
import ProfileAvatarButton from '../../components/Profile/ProfileAvatarButton';
import './ProfileScreen.css';

function getNameInitials(nombreCompleto) {
  if (!nombreCompleto) return '??';
  return nombreCompleto
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function ProfileScreen() {
  const navigate = useNavigate();
  const { user, tasks } = useApp();
  const initials = user?.avatarIniciales || getNameInitials(user?.nombreCompleto);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/dashboard', { replace: true });
    }
  };

  const taskCompletedCount = tasks.filter((task) => task.estado === 'completadas').length;
  const taskPendingCount = tasks.filter((task) => task.estado === 'pendiente').length;
  const groups = [
    { id: 'g1', name: 'agroIA', description: 'Diagnóstico con YOLOv5', badge: '+3', active: true },
    { id: 'g2', name: 'Snapfilm', description: 'Desarrollo Frontend', badge: '+1', active: true },
    { id: 'g3', name: 'SediLab', description: 'Proyecto de IA aplicada', badge: '+2', active: false },
  ];

  return (
    <main className="profile-screen-page">
      <header className="profile-screen__topbar">
        <button
          type="button"
          className="profile-screen__back-button"
          onClick={handleGoBack}
          aria-label="Back"
        >
          ‹
        </button>
        <div className="profile-screen__topbar-text">
          <h1>Perfil</h1>
          <p>Tu perfil académico y grupos activos</p>
        </div>
        <button
          type="button"
          className="profile-screen__settings-button"
          onClick={() => navigate('/perfil/configuracion')}
          aria-label="Configuración"
        >
          ⚙️
        </button>
      </header>

      <section className="profile-screen__card">
        <div className="profile-screen__header profile-screen__header--centered">
          <UserAvatarLarge initials={initials} avatarUrl={user?.avatarUrl} />
          <div className="profile-screen__user-meta">
            <p className="profile-screen__name">{user?.nombreCompleto || 'Estudiante'}</p>
            <p className="profile-screen__username">@{user?.username || 'usuario'}</p>
            <p className="profile-screen__subtitle">{user?.correo || 'usuario@ejemplo.com'}</p>
            <span className="profile-screen__career-pill">
              {user?.carrera || 'Ing. Informática'}
            </span>
          </div>
        </div>

        <div className="profile-screen__stats">
          <div className="profile-screen__stat-card">
            <strong>{taskCompletedCount}</strong>
            <span>Tareas realizadas</span>
          </div>
          <div className="profile-screen__stat-card profile-screen__stat-card--pending">
            <strong>{taskPendingCount}</strong>
            <span>Pendientes</span>
          </div>
        </div>

        <div className="profile-screen__groups">
          <h2>Grupos activos</h2>
          {groups.map((group) => (
            <div key={group.id} className="profile-screen__group-card">
              <div>
                <p className="profile-screen__group-name">{group.name}</p>
                <p className="profile-screen__group-description">{group.description}</p>
              </div>
              <span className={`profile-screen__group-badge ${group.active ? 'active' : ''}`}>
                {group.badge}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default ProfileScreen;
