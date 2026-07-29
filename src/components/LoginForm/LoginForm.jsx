import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputField from '../shared/InputField';
import PasswordInput from '../shared/PasswordInput';
import SocialAuthButtons from '../shared/SocialAuthButtons';
import ForgotPasswordLink from '../shared/ForgotPasswordLink';
import './LoginForm.css';

function LoginForm() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ usuario: '', password: '' });
  const [loginError, setLoginError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    if (loginError) setLoginError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(null);

    // Simula latencia de red
    setTimeout(() => {
      const storedUserRaw = localStorage.getItem('unitask_user');
      const storedUser = storedUserRaw ? JSON.parse(storedUserRaw) : null;

      const matches =
        storedUser &&
        (credentials.usuario === storedUser.username ||
          credentials.usuario === storedUser.correo) &&
        credentials.password === storedUser.password;

      if (matches) {
        localStorage.setItem('unitask_session', 'active');
        setIsLoading(false);
        navigate('/dashboard');
      } else {
        setIsLoading(false);
        setLoginError('Usuario o contraseña incorrectos. Intenta de nuevo.');
      }
    }, 600);
  };

  return (
    <main className="login">
      <form className="login__card" onSubmit={handleSubmit} noValidate>
        <h1 className="login__title">Bienvenido de vuelta</h1>
        <p className="login__subtitle">Inicia sesión para continuar con tu plan académico.</p>

        <InputField
          label="Usuario o correo"
          name="usuario"
          value={credentials.usuario}
          onChange={handleChange}
          placeholder="camila.m o camila.martinez@universidad.edu"
          autoComplete="username"
        />

        <PasswordInput
          label="Contraseña"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Tu contraseña"
        />

        <ForgotPasswordLink />

        {loginError && <p className="login__error">{loginError}</p>}

        <button type="submit" className="login__submit" disabled={isLoading}>
          {isLoading ? 'Iniciando sesión…' : 'Iniciar sesión'}
        </button>

        <div className="login__divider">
          <span>o</span>
        </div>

        <SocialAuthButtons />

        <p className="login__register-link">
          ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
        </p>
      </form>
    </main>
  );
}

export default LoginForm;