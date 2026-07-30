import React from 'react';

/*
 * Componente: AnnouncementCard
 * Proposito: Muestra un anuncio individual dentro del grupo, incluyendo el autor, fecha y contenido.
 */
const AnnouncementCard = ({ data, children }) => {
  return (
    <article className="p-4 mb-4 bg-white border border-gray-200 rounded-xl shadow-sm">
      <header className="flex items-center mb-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 text-purple-700 font-bold text-sm">
          {data.avatar}
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-semibold text-gray-900">{data.author}</h3>
          <p className="text-xs text-gray-500">{data.time}</p>
        </div>
      </header>
      
      <div className="text-sm text-gray-700 leading-relaxed">
        <p>{data.content}</p>
      </div>
      
      {/* Espacio para renderizar elementos adicionales como el InviteCodeChip */}
      {children}
    </article>
  );
};

export default AnnouncementCard;