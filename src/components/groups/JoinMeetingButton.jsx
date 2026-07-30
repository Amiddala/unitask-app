import React from 'react';

/*
 * Componente: JoinMeetingButton
 * Proposito: Redireccion a la sala de videollamada con icono representativo.
 */
const JoinMeetingButton = ({ url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="join-meeting-btn"
    >
      <svg 
        width="18" 
        height="18" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        style={{ marginRight: '8px' }}
      >
        <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z" />
        <rect x="3" y="6" width="12" height="12" rx="2" ry="2" />
      </svg>
      <span>Unirse a Google Meet</span>
    </a>
  );
};

export default JoinMeetingButton;
