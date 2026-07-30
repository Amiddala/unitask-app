import './ActivityAlertBanner.css';

function ActivityAlertBanner({ criticalActivities, onDismissItem }) {
  if (!criticalActivities || criticalActivities.length === 0) return null;

  return (
    <div className="activity-alert-banner" role="status" aria-live="polite">
      <div className="activity-alert-banner__icon" aria-hidden="true">⏰</div>
      <div className="activity-alert-banner__content">
        <p className="activity-alert-banner__title">
          Tienes {criticalActivities.length} actividad{criticalActivities.length > 1 ? 'es' : ''} urgente{criticalActivities.length > 1 ? 's' : ''}
        </p>
        <div className="activity-alert-banner__list">
          {criticalActivities.map((activity) => {
            const dueDate = new Date(activity.fechaLimite);
            const formattedDue = dueDate.toLocaleDateString('es-ES', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
            });
            const activityLabel = activity.type === 'examen'
              ? 'Examen'
              : activity.type === 'grupal'
              ? 'Tarea grupal'
              : 'Tarea personal';

            return (
              <div key={activity.id} className="activity-alert-banner__item">
                <div className="activity-alert-banner__item-meta">
                  <span className="activity-alert-banner__item-label">{activityLabel}</span>
                  <strong className="activity-alert-banner__item-title">{activity.title}</strong>
                  <span className="activity-alert-banner__item-date">{formattedDue}</span>
                </div>
                <button
                  type="button"
                  className="activity-alert-banner__item-close"
                  onClick={() => onDismissItem(activity.id)}
                  aria-label={`Cerrar alerta de ${activity.title}`}
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ActivityAlertBanner;
