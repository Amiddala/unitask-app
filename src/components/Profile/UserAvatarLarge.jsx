import './ProfileComponents.css';

function UserAvatarLarge({ initials, size = 96 }) {
  return (
    <div
      className="user-avatar-large"
      style={{ width: size, height: size, fontSize: `${Math.floor(size / 2.6)}px` }}
      aria-label="Avatar del usuario"
    >
      {initials}
    </div>
  );
}

export default UserAvatarLarge;
