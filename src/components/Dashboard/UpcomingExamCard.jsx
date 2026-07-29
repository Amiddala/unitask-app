import './UpcomingExamCard.css';

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
    </svg>
  );
}

function daysUntil(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  const diff = Math.round((target - today) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Hoy';
  if (diff === 1) return 'Mañana';
  return `En ${diff} días`;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
}

function UpcomingExamCard({ exam }) {
  const { titulo, materia, fechaLimite, urgencia } = exam;

  return (
    <article className={`exam-card exam-card--${urgencia}`}>
      <span className="exam-card__icon">
        <ClockIcon />
      </span>
      <div className="exam-card__main">
        <p className="exam-card__title">{titulo}</p>
        <p className="exam-card__subject">{materia}</p>
      </div>
      <div className="exam-card__when">
        <span className="exam-card__countdown">{daysUntil(fechaLimite)}</span>
        <span className="exam-card__date">{formatDate(fechaLimite)}</span>
      </div>
    </article>
  );
}

export default UpcomingExamCard;