import './Badge.css';

const LABELS = {
  personal: 'Personal',
  grupal: 'Grupal',
  examen: 'Examen',
  pendiente: 'Pendiente',
  enProgreso: 'En progreso',
  completada: 'Completada',
};

function Badge({ variant, children }) {
  return (
    <span className={`badge badge--${variant}`}>
      {children || LABELS[variant] || variant}
    </span>
  );
}

export default Badge;