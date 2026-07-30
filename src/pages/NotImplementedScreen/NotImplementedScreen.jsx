import { useNavigate } from 'react-router-dom';
import './NotImplementedScreen.css';

function NotImplementedScreen() {
  const navigate = useNavigate();

  return (
    <main className="not-implemented-page">
      <section className="not-implemented-card">
        <h1>Función en desarrollo</h1>
        <p>
          Esta sección aún no está disponible, pero estamos trabajando para que llegue muy pronto.
          Mientras tanto, sigue en el Dashboard para ver tus tareas y exámenes próximos.
        </p>

        <div className="not-implemented__actions">
          <button type="button" onClick={() => navigate('/dashboard')}>
            Volver al Dashboard
          </button>
          <button type="button" onClick={() => navigate('/perfil/configuracion')}>
            Ver Configuración
          </button>
        </div>
      </section>
    </main>
  );
}

export default NotImplementedScreen;
