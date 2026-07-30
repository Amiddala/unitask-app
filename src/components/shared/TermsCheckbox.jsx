import './TermsCheckbox.css';

function TermsCheckbox({ checked, onChange, error }) {
  return (
    <div className="terms-checkbox">
      <label className="terms-checkbox__row">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="terms-checkbox__input"
        />
        <span className="terms-checkbox__text">
          Acepto los <a href="#terminos">Términos</a> y la{' '}
          <a href="#privacidad">Política de Privacidad</a>
        </span>
      </label>
      {error && <span className="terms-checkbox__error">{error}</span>}
    </div>
  );
}

export default TermsCheckbox;