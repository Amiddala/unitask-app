import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../shared/InputField";
import PasswordInput from "../shared/PasswordInput";
import SocialAuthButtons from "../shared/SocialAuthButtons";
import TermsCheckbox from "../shared/TermsCheckbox";
import "./RegisterForm.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#16A34A"
      strokeWidth="3"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function RegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombreCompleto: "",
    username: "",
    correo: "",
    password: "",
  });
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailBlur = () => {
    const valid = EMAIL_REGEX.test(formData.correo);
    setIsEmailValid(valid);
    setErrors((prev) => ({
      ...prev,
      correo: valid ? "" : "Ingresa un correo institucional válido",
    }));
  };

  const validateAll = () => {
    const newErrors = {};

    if (formData.nombreCompleto.trim().length < 3) {
      newErrors.nombreCompleto = "El nombre debe tener al menos 3 caracteres";
    }
    if (formData.username.trim().length < 3) {
      newErrors.username = "El usuario debe tener al menos 3 caracteres";
    }
    if (!EMAIL_REGEX.test(formData.correo)) {
      newErrors.correo = "Ingresa un correo institucional válido";
    }
    if (formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    }
    if (!termsAccepted) {
      newErrors.terms =
        "Debes aceptar los Términos y la Política de Privacidad";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateAll()) return;

    const newUser = {
      nombreCompleto: formData.nombreCompleto,
      username: formData.username,
      correo: formData.correo,
      password: formData.password, // mock: solo para validar login localmente
      avatarIniciales: formData.nombreCompleto
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    };

    localStorage.setItem("unitask_user", JSON.stringify(newUser));
    localStorage.setItem("unitask_session", "active");

    navigate("/dashboard");
  };

  return (
    <main className="register">
      <form className="register__card" onSubmit={handleSubmit} noValidate>
        <h1 className="register__title">Crea tu cuenta</h1>
        <p className="register__subtitle">
          Usa tus datos institucionales para empezar.
        </p>

        <InputField
          label="Nombre completo"
          name="nombreCompleto"
          value={formData.nombreCompleto}
          onChange={handleChange}
          error={errors.nombreCompleto}
          placeholder="Camila Martínez"
          autoComplete="name"
        />

        <InputField
          label="Usuario"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
          placeholder="camila.m"
          autoComplete="username"
        />

        <InputField
          label="Correo institucional"
          name="correo"
          type="email"
          value={formData.correo}
          onChange={handleChange}
          onBlur={handleEmailBlur}
          error={errors.correo}
          placeholder="camila.martinez@universidad.edu"
          autoComplete="email"
          rightSlot={isEmailValid ? <CheckIcon /> : null}
        />

        <PasswordInput
          label="Contraseña"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Mínimo 8 caracteres"
        />

        <TermsCheckbox
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          error={errors.terms}
        />

        <button
          type="submit"
          className="register__submit"
          disabled={!termsAccepted}
        >
          Registrarse
        </button>

        <div className="register__divider">
          <span>o</span>
        </div>

        <SocialAuthButtons />

        <p className="register__login-link">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </main>
  );
}

export default RegisterForm;
