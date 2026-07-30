import './ProfileComponents.css';

function SettingToggleRow({ label, checked, onChange, description }) {
  return (
    <div className="setting-toggle-row">
      <div className="setting-toggle-row__meta">
        <span className="setting-toggle-row__label">{label}</span>
        {description && <span className="setting-toggle-row__description">{description}</span>}
      </div>
      <label className="setting-toggle-row__switch">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="setting-toggle-row__track">
          <span className="setting-toggle-row__thumb" />
        </span>
      </label>
    </div>
  );
}

export default SettingToggleRow;
