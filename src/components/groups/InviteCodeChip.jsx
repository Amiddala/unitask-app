import React, { useState } from 'react';

/*
 * Componente: InviteCodeChip
 * Proposito: Renderiza el codigo de invitacion y permite copiarlo al portapapeles con feedback visual.
 */
const InviteCodeChip = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error al copiar al portapapeles", err);
    }
  };

  if (!code) return null;

  return (
    <div 
      className="invite-code-chip" 
      onClick={handleCopy}
      title="Copiar código"
      role="button"
      tabIndex={0}
    >
      <span className="invite-code-label">
        {copied ? "¡Copiado! " : "Código:"}
      </span>
      <span>{code}</span>
    </div>
  );
};

export default InviteCodeChip;