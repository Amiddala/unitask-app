import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import ProfileInfoRow from '../../components/Profile/ProfileInfoRow';
import SettingToggleRow from '../../components/Profile/SettingToggleRow';
import './SettingsScreen.css';

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

function SettingsScreen() {
  const navigate = useNavigate();
  const { user, dispatch } = useApp();
  const [settings, setSettings] = useState({
    temaOscuro: false,
  });
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempNameValue, setTempNameValue] = useState(user?.nombreCompleto || '');
  const [avatarPreview, setAvatarPreview] = useState(user?.avatarUrl || '');

  useEffect(() => {
    const stored = localStorage.getItem('unitask_settings');
    if (stored) {
      setSettings(JSON.parse(stored));
    }
  }, []);

  const updateSettings = (nextSettings) => {
    setSettings(nextSettings);
    localStorage.setItem('unitask_settings', JSON.stringify(nextSettings));
  };

  useEffect(() => {
    document.body.classList.toggle('dark-theme', settings.temaOscuro);
  }, [settings.temaOscuro]);

  const handleSaveName = () => {
    if (!tempNameValue.trim()) return;
    const updatedUser = {
      ...user,
      nombreCompleto: tempNameValue.trim(),
      avatarIniciales: tempNameValue
        .split(' ')
        .filter(Boolean)
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
      avatarUrl: user?.avatarUrl || '',
    };

    dispatch({ type: 'SET_USER', payload: updatedUser });
    setIsEditingName(false);
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imageBase64 = reader.result;
      setAvatarPreview(imageBase64);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfilePhoto = () => {
    if (!avatarPreview) return;
    const updatedUser = {
      ...user,
      avatarUrl: avatarPreview,
      avatarIniciales: user?.avatarIniciales || getNameInitials(user?.nombreCompleto),
    };
    dispatch({ type: 'SET_USER', payload: updatedUser });
  };

  const handleLogout = () => {
    const confirmed = window.confirm('¿Deseas cerrar sesión?');
    if (!confirmed) return;

    localStorage.removeItem('unitask_session');
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  return (
    <DashboardLayout>
      <section className="settings-screen__card">
        <div className="settings-screen__header">
          <h1>Configuración</h1>
          <p>Personaliza tu cuenta y tus preferencias.</p>
        </div>

        <div className="settings-screen__section">
          <h2>Cuenta</h2>
          <ProfileInfoRow label="Correo institucional" value={user?.correo || '---'} />
          <ProfileInfoRow label="Nombre de usuario" value={user?.username || '---'} />
          <div className="editable-info-row">
            <div className="editable-info-row__header">
              <span className="editable-info-row__label">Nombre completo</span>
              <button
                type="button"
                className="editable-info-row__edit-trigger"
                onClick={() => setIsEditingName((prev) => !prev)}
              >
                {isEditingName ? 'Cancelar' : 'Editar'}
              </button>
            </div>
            {isEditingName ? (
              <div className="editable-info-row__editor">
                <input
                  className="editable-info-row__input"
                  value={tempNameValue}
                  onChange={(e) => setTempNameValue(e.target.value)}
                />
                <div className="editable-info-row__actions">
                  <button
                    type="button"
                    className="editable-info-row__button editable-info-row__button--secondary"
                    onClick={() => {
                      setIsEditingName(false);
                      setTempNameValue(user?.nombreCompleto || '');
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="editable-info-row__button editable-info-row__button--primary"
                    onClick={handleSaveName}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            ) : (
              <ProfileInfoRow label="Nombre completo" value={user?.nombreCompleto || '---'} />
            )}
          </div>
        </div>

        <div className="settings-screen__section">
          <h2>Foto de perfil</h2>
          <div className="settings-screen__avatar-upload">
            <div className="settings-screen__avatar-preview">
              {avatarPreview || user?.avatarUrl ? (
                <img
                  src={avatarPreview || user?.avatarUrl}
                  alt="Vista previa de avatar"
                  className="settings-screen__avatar-image"
                />
              ) : (
                <span className="settings-screen__avatar-placeholder">Sin foto</span>
              )}
            </div>
            <div className="settings-screen__avatar-actions">
              <label className="settings-screen__avatar-input-label">
                Seleccionar foto
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </label>
              <button
                type="button"
                className="settings-screen__button settings-screen__button--primary"
                onClick={handleSaveProfilePhoto}
                disabled={!avatarPreview}
              >
                Guardar foto
              </button>
            </div>
          </div>
        </div>

        <div className="settings-screen__section">
          <h2>Preferencias</h2>
          <SettingToggleRow
            label="Modo oscuro"
            description="Activa el modo oscuro en la interfaz."
            checked={settings.temaOscuro}
            onChange={(e) => updateSettings({ ...settings, temaOscuro: e.target.checked })}
          />
        </div>

        <button type="button" className="logout-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </section>
    </DashboardLayout>
  );
}

export default SettingsScreen;
