import React from 'react';

/*
 * Componente: AnnouncementCard
 * Proposito: Muestra un anuncio individual.
 */
const AnnouncementCard = ({ data, children }) => {
  return (
    <article className="announcement-card">
      <header className="announcement-header">
        <div className="announcement-avatar">
          {data.avatar}
        </div>
        <div className="announcement-meta">
          <h3 className="announcement-author">{data.author}</h3>
          <p className="announcement-time">{data.time}</p>
        </div>
      </header>
      
      <div className="announcement-content">
        <p>{data.content}</p>
      </div>
      
      {children}
    </article>
  );
};

export default AnnouncementCard;
