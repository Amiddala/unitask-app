import './ProfileComponents.css';

function UserAvatarLarge({ initials, size = 96, avatarUrl }) {
  const style = { width: size, height: size, fontSize: `${Math.floor(size / 2.6)}px` };

  if (avatarUrl) {
    return (
      <div className="user-avatar-large user-avatar-large--photo" style={style}>
        <img src={avatarUrl} alt="Foto de perfil" />
      </div>
    );
  }

  return (
    <div
      className="user-avatar-large"
      style={style}
      aria-label="Avatar del usuario"
    >
      {initials}
    </div>
  );
}

export default UserAvatarLarge;
