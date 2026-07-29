import './SocialAuthButtons.css';

function SocialAuthButtons() {
  const handleMockAuth = (provider) => {
    // Mock: sin backend real todavía
    console.log(`Auth simulada con ${provider}`);
  };

  return (
    <div className="social-auth">
      <button
        type="button"
        className="social-auth__btn"
        onClick={() => handleMockAuth('Google')}
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <rect width="24" height="24" rx="6" fill="#EA4335" />
          <text x="12" y="16" textAnchor="middle" fontSize="13" fill="#fff" fontFamily="Inter, sans-serif">G</text>
        </svg>
        Continuar con Google
      </button>
      <button
        type="button"
        className="social-auth__btn"
        onClick={() => handleMockAuth('GitHub')}
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <rect width="24" height="24" rx="6" fill="#171B26" />
          <path
            d="M12 6a6 6 0 0 0-1.9 11.7c.3.05.4-.13.4-.3v-1.1c-1.67.37-2-.72-2-.72-.27-.7-.67-.9-.67-.9-.55-.37.04-.36.04-.36.6.04.92.62.92.62.54.92 1.4.66 1.75.5.05-.4.2-.66.37-.8-1.33-.15-2.73-.67-2.73-2.98 0-.66.23-1.2.62-1.62-.06-.15-.27-.77.06-1.6 0 0 .5-.16 1.65.62a5.6 5.6 0 0 1 3 0c1.14-.78 1.64-.62 1.64-.62.33.83.12 1.45.06 1.6.4.42.62.96.62 1.62 0 2.32-1.4 2.83-2.74 2.98.21.19.4.55.4 1.1v1.63c0 .17.1.35.4.3A6 6 0 0 0 12 6Z"
            fill="#fff"
          />
        </svg>
        Continuar con GitHub
      </button>
    </div>
  );
}

export default SocialAuthButtons;