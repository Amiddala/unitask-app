import './InputField.css';

function InputField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  rightSlot,
  autoComplete,
}) {
  return (
    <div className="input-field">
      <label className="input-field__label" htmlFor={name}>
        {label}
      </label>
      <div className={`input-field__wrapper ${error ? 'input-field__wrapper--error' : ''}`}>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="input-field__input"
        />
        {rightSlot && <span className="input-field__right-slot">{rightSlot}</span>}
      </div>
      {error && <span className="input-field__error">{error}</span>}
    </div>
  );
}

export default InputField;