import AuthButtonGroup from './AuthButtonGroup';
import './WelcomeScreen.css';

function WelcomeScreen() {
  return (
    <main className="welcome">
      <div className="welcome__card">
        <div className="welcome__mark">
          <svg
            className="welcome__illustration"
            viewBox="0 0 120 60"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect x="4" y="4" width="112" height="52" rx="14" fill="var(--color-surface)" stroke="#E6E8E3" />
            {[16, 34, 52, 70, 88, 106].map((x, i) => (
              <g key={x}>
                <rect x={x - 6} y="16" width="12" height="12" rx="4" fill="#EFF1EC" />
                {i === 1 && <circle cx={x} cy="38" r="3" fill="var(--color-exam)" />}
                {i === 3 && <circle cx={x} cy="38" r="3" fill="var(--color-personal)" />}
                {i === 4 && <circle cx={x} cy="38" r="3" fill="var(--color-group)" />}
              </g>
            ))}
          </svg>
          <span className="welcome__brand">UniTask</span>
        </div>

        <h1 className="welcome__title">Tu semestre, en orden.</h1>
        <p className="welcome__subtitle">
          Centraliza tareas, exámenes y apuntes de grupo en un solo lugar, sin perder ni una fecha.
        </p>

        <AuthButtonGroup />
      </div>
    </main>
  );
}

export default WelcomeScreen;