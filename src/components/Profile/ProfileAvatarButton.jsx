import './ProfileComponents.css';

function ProfileAvatarButton({ initials, avatarUrl, onClick, ariaLabel = 'Ver perfil' }) {
  return (
    <button
      type="button"
      className="profile-avatar-button"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {avatarUrl ? (
        <img src={avatarUrl} alt="Avatar del usuario" />
      ) : (
        initials
      )}
    </button>
  );
}

export default ProfileAvatarButton;
