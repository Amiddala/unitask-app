import React from 'react';

/*
 * Componente: JoinMeetingButton
 * Proposito: Boton de accion principal para redireccionar a la sala de videollamada externa.
 */
const JoinMeetingButton = ({ url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-full py-3 mb-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
    >
      <span className="mr-2">Unirse a Google Meet</span>
    </a>
  );
};

export default JoinMeetingButton;