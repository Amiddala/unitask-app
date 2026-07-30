import { useNavigate } from 'react-router-dom';
import './ForgotPasswordLink.css';

function ForgotPasswordLink() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/ayuda');
  };

  return (
    <a href="#recuperar" className="forgot-password" onClick={handleClick}>
      ¿Olvidaste tu contraseña?
    </a>
  );
}

export default ForgotPasswordLink;