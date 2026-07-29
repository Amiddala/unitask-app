import { useState } from 'react';
import './PasswordInput.css';

function EyeIcon({ open }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a20.3 20.3 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 5c7 0 11 7 11 7a20.3 20.3 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      <path d="M1 1l22 22" />
    </svg>
  );
}

function PasswordInput({ label, name, value, onChange, onBlur, error, placeholder }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-input">
      <label className="password-input__label" htmlFor={name}>
        {label}
      </label>
      <div className={`password-input__wrapper ${error ? 'password-input__wrapper--error' : ''}`}>
        <input
          id={name}
          name={name}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete="new-password"
          className="password-input__input"
        />
        <button
          type="button"
          className="password-input__toggle"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        >
          <EyeIcon open={showPassword} />
        </button>
      </div>
      {error && <span className="password-input__error">{error}</span>}
    </div>
  );
}

export default PasswordInput;