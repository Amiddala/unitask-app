import './ProfileComponents.css';

function ProfileInfoRow({ label, value }) {
  return (
    <div className="profile-info-row">
      <span className="profile-info-row__label">{label}</span>
      <span className="profile-info-row__value">{value}</span>
    </div>
  );
}

export default ProfileInfoRow;
