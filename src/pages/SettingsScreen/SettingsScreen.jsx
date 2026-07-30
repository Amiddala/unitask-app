import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import SettingToggleRow from '../../components/Profile/SettingToggleRow';
import './SettingsScreen.css';

function SettingsScreen() {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [settings, setSettings] = useState({
    temaOscuro: false,
    notificaciones: true,
  });

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

  const handleLogout = () => {
    const confirmed = window.confirm('¿Deseas cerrar sesión?');
    if (!confirmed) return;

    localStorage.removeItem('unitask_session');
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  return (
    <main className="settings-screen-page">
      <header className="settings-screen__topbar">
        <button
          type="button"
          className="settings-screen__back-button"
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate('/perfil', { replace: true });
            }
          }}
          aria-label="Back to profile"
        >
          ‹
        </button>
        <div>
          <h1>Configuración</h1>
          <p>Administra tu cuenta y preferencias de la app.</p>
        </div>
      </header>

      <section className="settings-screen__card">
        <div className="settings-screen__section settings-screen__menu-section">
          <h2>Cuenta</h2>
          <button
            type="button"
            className="settings-screen__menu-row"
            onClick={() => navigate('/perfil/editar-cuenta')}
          >
            <span>Editar cuenta</span>
            <span className="settings-screen__menu-arrow">›</span>
          </button>
          <button type="button" className="settings-screen__menu-row">
            <span>Seguridad y contraseña</span>
            <span className="settings-screen__menu-arrow">›</span>
          </button>
        </div>

        <div className="settings-screen__section settings-screen__menu-section">
          <h2>Preferencias de la app</h2>
          <SettingToggleRow
            label="Notificaciones"
            description="Recibe alertas sobre tu actividad."
            checked={settings.notificaciones}
            onChange={(e) => updateSettings({ ...settings, notificaciones: e.target.checked })}
          />
          <SettingToggleRow
            label="Modo oscuro"
            description="Activa el modo oscuro en la interfaz."
            checked={settings.temaOscuro}
            onChange={(e) => updateSettings({ ...settings, temaOscuro: e.target.checked })}
          />
        </div>

        <div className="settings-screen__section settings-screen__menu-section">
          <h2>Soporte</h2>
          <button type="button" className="settings-screen__menu-row">
            <span>Centro de ayuda</span>
            <span className="settings-screen__menu-arrow">›</span>
          </button>
          <button type="button" className="settings-screen__menu-row">
            <span>Términos y privacidad</span>
            <span className="settings-screen__menu-arrow">›</span>
          </button>
        </div>

        <button type="button" className="logout-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </section>
    </main>
  );
}

export default SettingsScreen;
