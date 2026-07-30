import React from 'react';

/*
 * Componente: InviteCodeChip
 * Proposito: Renderiza el codigo de invitacion del grupo. En futuras iteraciones se agregara la funcion de copiar al portapapeles.
 */
const InviteCodeChip = ({ code }) => {
  if (!code) return null;

  return (
    <div className="inline-flex items-center mt-3 px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-sm font-semibold rounded-md cursor-pointer hover:bg-blue-100 transition-colors">
      <span className="mr-2">Código:</span>
      <span className="tracking-widest">{code}</span>
    </div>
  );
};

export default InviteCodeChip;