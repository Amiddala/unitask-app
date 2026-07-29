import './ForgotPasswordLink.css';

function ForgotPasswordLink() {
  const handleClick = (e) => {
    e.preventDefault();
    // Mock: sin flujo de recuperación real todavía
    console.log('Recuperación de contraseña: flujo no implementado (mock)');
    alert('La recuperación de contraseña estará disponible próximamente.');
  };

  return (
    <a href="#recuperar" className="forgot-password" onClick={handleClick}>
      ¿Olvidaste tu contraseña?
    </a>
  );
}

export default ForgotPasswordLink;