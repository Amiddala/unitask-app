import { useApp } from '../../context/AppContext';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import UserAvatarLarge from '../../components/Profile/UserAvatarLarge';
import ProfileInfoRow from '../../components/Profile/ProfileInfoRow';
import NavigateToSettingsButton from '../../components/Profile/NavigateToSettingsButton';
import './ProfileScreen.css';

function ProfileScreen() {
  const { user } = useApp();
  const initials = user?.avatarIniciales || '??';

  return (
    <DashboardLayout>
      <section className="profile-screen__card">
        <div className="profile-screen__header">
          <UserAvatarLarge initials={initials} />
          <div className="profile-screen__user-meta">
            <p className="profile-screen__name">{user?.nombreCompleto || 'Estudiante'}</p>
            <p className="profile-screen__username">@{user?.username || 'usuario'}</p>
          </div>
        </div>

        <div className="profile-screen__details">
          <ProfileInfoRow label="Correo institucional" value={user?.correo || '---'} />
          <ProfileInfoRow label="Nombre de usuario" value={user?.username || '---'} />
          <ProfileInfoRow label="Perfil" value="Estudiante" />
        </div>

        <NavigateToSettingsButton />
      </section>
    </DashboardLayout>
  );
}

export default ProfileScreen;
