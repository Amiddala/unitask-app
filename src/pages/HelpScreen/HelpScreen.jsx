import { useNavigate } from 'react-router-dom';
import './HelpScreen.css';

function HelpScreen() {
  const navigate = useNavigate();

  const faqs = [
    {
      question: '¿Cómo activo las notificaciones de actividades urgentes?',
      answer:
        'Ve a Configuración y activa el interruptor de Notificaciones. El Dashboard te mostrará alertas cuando tengas tareas o exámenes en las próximas 24 horas.',
    },
    {
      question: '¿Qué significa que una actividad es urgente?',
      answer:
        'Una actividad urgente es una tarea o examen cuya fecha límite se encuentre dentro de las próximas 24 horas. En el Dashboard aparecerá un banner rojo para ayudarte a priorizarla.',
    },
    {
      question: '¿Cómo puedo cambiar mi contraseña?',
      answer:
        'La opción de seguridad y contraseña está en desarrollo y pronto estará disponible desde el menú de configuración.',
    },
    {
      question: '¿Qué hago si no encuentro una función?',
      answer:
        'Puedes volver al Dashboard o a la pantalla de Configuración. Si la opción está marcada como "En desarrollo", significa que llegará en próximas actualizaciones.',
    },
  ];

  return (
    <main className="help-screen-page">
      <header className="help-screen-header">
        <button type="button" className="help-screen__back-button" onClick={() => navigate(-1)}>
          ← Volver
        </button>
        <div>
          <h1>Centro de ayuda</h1>
          <p>Respuestas rápidas para que sigas organizado y aproveches mejor UniTask.</p>
        </div>
      </header>

      <section className="help-screen__content">
        <h2>Preguntas frecuentes</h2>
        <div className="help-screen__faq-list">
          {faqs.map((item) => (
            <article key={item.question} className="help-screen__faq-item">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>

        <div className="help-screen__footer">
          <p>¿Necesitas más ayuda?</p>
          <button type="button" className="help-screen__cta" onClick={() => navigate('/dashboard')}>
            Volver al Dashboard
          </button>
        </div>
      </section>
    </main>
  );
}

export default HelpScreen;
