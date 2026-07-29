import Badge from '../shared/Badge';
import './UpcomingTaskCard.css';

const TYPE_COLOR = {
  personal: 'var(--color-personal)',
  grupal: 'var(--color-group)',
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
}

function UpcomingTaskCard({ task }) {
  const { titulo, materia, tipo, estado, fechaLimite, subtareasCompletadas, subtareasTotal } = task;

  return (
    <article className="task-card" style={{ borderLeftColor: TYPE_COLOR[tipo] }}>
      <div className="task-card__main">
        <p className="task-card__title">{titulo}</p>
        <p className="task-card__subject">{materia}</p>
        <div className="task-card__meta">
          <Badge variant={estado} />
          <Badge variant={tipo} />
          {subtareasTotal > 0 && (
            <span className="task-card__subtasks">
              {subtareasCompletadas}/{subtareasTotal} Subtareas
            </span>
          )}
        </div>
      </div>
      <span className="task-card__date">{formatDate(fechaLimite)}</span>
    </article>
  );
}

export default UpcomingTaskCard;