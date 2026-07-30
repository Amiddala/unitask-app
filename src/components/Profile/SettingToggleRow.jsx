import './ProfileComponents.css';

function SettingToggleRow({ label, checked, onChange, description }) {
  return (
    <div className="setting-toggle-row">
      <div className="setting-toggle-row__meta">
        <span className="setting-toggle-row__label">{label}</span>
        {description && <span className="setting-toggle-row__description">{description}</span>}
      </div>
      <div className="setting-toggle-row__controls">
        <label className="setting-toggle-row__switch">
          <input type="checkbox" checked={checked} onChange={onChange} />
          <span className="setting-toggle-row__track">
            <span className="setting-toggle-row__thumb" />
          </span>
        </label>
        <span className="setting-toggle-row__status">{checked ? 'Encendido' : 'Apagado'}</span>
      </div>
    </div>
  );
}

export default SettingToggleRow;
