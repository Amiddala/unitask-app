import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import ConfirmDialog from '../../components/shared/ConfirmDialog';
import './EditAccountScreen.css';

const CAREER_OPTIONS = [
  'Ing. Informática',
  'Ing. Civil',
  'Ing. Industrial',
  'Lic. Administración',
  'Lic. Economía',
];

function EditAccountScreen() {
  const navigate = useNavigate();
  const { user, dispatch } = useApp();
  const [name, setName] = useState(user?.nombreCompleto || '');
  const [email] = useState(user?.correo || '');
  const [career, setCareer] = useState(user?.carrera || 'Ing. Informática');
  const [avatarPreview, setAvatarPreview] = useState(user?.avatarUrl || '');
  const [errors, setErrors] = useState({});
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const [confirmSaveOpen, setConfirmSaveOpen] = useState(false);

  const originalProfile = useMemo(
    () => ({
      name: user?.nombreCompleto || '',
      career: user?.carrera || 'Ing. Informática',
      avatarPreview: user?.avatarUrl || '',
    }),
    [user]
  );

  const nameValid = /^[A-Za-zÀ-ÿ\s]{3,50}$/.test(name.trim());
  const careerValid = CAREER_OPTIONS.includes(career);
  const nameError = !nameValid ? 'El nombre debe tener entre 3 y 50 letras.' : '';
  const hasChanges =
    name.trim() !== originalProfile.name.trim() ||
    career !== originalProfile.career ||
    avatarPreview !== originalProfile.avatarPreview;
  const canSave = hasChanges && nameValid && careerValid;

  const validateForm = () => {
    const nextErrors = {};

    if (!nameValid) {
      nextErrors.name = nameError;
    }

    if (!careerValid) {
      nextErrors.career = 'Selecciona una carrera válida.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    setConfirmSaveOpen(true);
  };

  const handleCancel = () => {
    if (!hasChanges) {
      navigate(-1);
      return;
    }
    setConfirmCancelOpen(true);
  };

  const confirmCancel = () => {
    setName(originalProfile.name);
    setCareer(originalProfile.career);
    setAvatarPreview(originalProfile.avatarPreview);
    setErrors({});
    setConfirmCancelOpen(false);
  };

  const closeCancelDialog = () => {
    setConfirmCancelOpen(false);
  };

  const confirmSave = () => {
    dispatch({
      type: 'SET_USER',
      payload: {
        ...user,
        nombreCompleto: name.trim(),
        correo: email.trim(),
        carrera: career.trim(),
        avatarUrl: avatarPreview,
      },
    });
    setErrors({});
    setConfirmSaveOpen(false);
  };

  const closeSaveDialog = () => {
    setConfirmSaveOpen(false);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <main className="edit-account-page">
      <header className="edit-account__topbar">
        <button
          type="button"
          className="edit-account__back-button"
          onClick={() => navigate(-1)}
          aria-label="Volver"
        >
          ‹
        </button>
        <div>
          <h1>Editar cuenta</h1>
          <p>Actualiza tu información personal.</p>
        </div>
      </header>

      <section className="edit-account__card">
        <label className="edit-account__field">
          <span>Nombre completo</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={nameError ? 'edit-account__input--error' : ''}
          />
          {nameError && <span className="edit-account__error">{nameError}</span>}
        </label>

        <label className="edit-account__field">
          <span>Correo institucional</span>
          <div className="edit-account__readonly-value">{email}</div>
        </label>

        <label className="edit-account__field">
          <span>Nombre de usuario</span>
          <div className="edit-account__readonly-value">{user?.username || ''}</div>
        </label>

        <label className="edit-account__field">
          <span>Carrera</span>
          <select
            value={career}
            onChange={(e) => setCareer(e.target.value)}
            className={errors.career ? 'edit-account__input--error' : ''}
          >
            {CAREER_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.career && <span className="edit-account__error">{errors.career}</span>}
        </label>

        <label className="edit-account__field edit-account__file-field">
          <span>Foto de perfil</span>
          <div className="edit-account__file-input-wrapper">
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
            />
            <label htmlFor="avatar-upload" className="edit-account__file-chooser">
              Elegir archivo
            </label>
            <span className="edit-account__file-name">
              {avatarPreview ? 'Archivo seleccionado' : 'Ningún archivo seleccionado'}
            </span>
          </div>
          {avatarPreview && (
            <div className="edit-account__avatar-preview">
              <img src={avatarPreview} alt="Avatar preview" />
            </div>
          )}
        </label>

        <div className="edit-account__actions">
          <button
            type="button"
            className="edit-account__cancel-button"
            onClick={handleCancel}
            disabled={!hasChanges}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="edit-account__save-button"
            onClick={handleSave}
            disabled={!canSave}
          >
            Guardar cambios
          </button>
        </div>
      </section>

      <ConfirmDialog
        open={confirmCancelOpen}
        title="Descartar cambios"
        message="Tienes cambios sin guardar. ¿Seguro que quieres descartarlos y seguir en esta pantalla?"
        confirmText="Descartar"
        confirmVariant="danger"
        cancelText="Seguir editando"
        onConfirm={confirmCancel}
        onCancel={closeCancelDialog}
      />

      <ConfirmDialog
        open={confirmSaveOpen}
        title="Guardar cambios"
        message="¿Deseas guardar los cambios realizados en tu cuenta?"
        confirmText="Guardar"
        cancelText="Revisar"
        onConfirm={confirmSave}
        onCancel={closeSaveDialog}
      />
    </main>
  );
}

export default EditAccountScreen;
