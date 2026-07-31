import { useState } from 'react';
import './GroupDetailScreen.css';
import CreateAnnouncementModal from "../components/groups/CreateAnnouncementModal";

const GroupDetailScreen = () => {
  const [activeTab, setActiveTab] = useState('novedades');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Estado local para simular los anuncios cargados desde el backend
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      author: 'Docente',
      time: 'Hace 2 horas',
      content: 'Bienvenidos al grupo. Por favor revisen el material adjunto en la plataforma.'
    }
  ]);

  // Procesa el texto del modal y lo agrega a la lista de anuncios
  const handlePublishAnnouncement = (text) => {
    const newAnnouncement = {
      id: Date.now(),
      author: 'camiii',
      time: 'Justo ahora',
      content: text
    };
    
    setAnnouncements([newAnnouncement, ...announcements]);
    setIsModalOpen(false);
  };

  return (
    <div className="group-screen">
      <header className="group-header">
        <div>
          <h1 className="group-title">Desarrollo de Software</h1>
          <p className="group-subtitle">Grupo 1</p>
        </div>
        <button className="group-options-btn">⋮</button>
      </header>

      <div className="group-tabs-container">
        <button 
          className={`group-tab-btn ${activeTab === 'novedades' ? 'active' : ''}`}
          onClick={() => setActiveTab('novedades')}
        >
          Novedades
        </button>
        <button 
          className={`group-tab-btn ${activeTab === 'trabajos' ? 'active' : ''}`}
          onClick={() => setActiveTab('trabajos')}
        >
          Trabajos
        </button>
        <button 
          className={`group-tab-btn ${activeTab === 'personas' ? 'active' : ''}`}
          onClick={() => setActiveTab('personas')}
        >
          Personas
        </button>
      </div>

      <main className="group-main">
        <div className="group-content-padding">
          {activeTab === 'novedades' && (
            <>
              {/* Boton disparador del modal */}
              <button className="join-meeting-btn" onClick={() => setIsModalOpen(true)}>
                + Crear Nuevo Anuncio
              </button>

              {/* Renderizado dinamico de anuncios */}
              {announcements.map((announcement) => (
                <div key={announcement.id} className="announcement-card">
                  <div className="announcement-header">
                    <div className="announcement-avatar">
                      {announcement.author.charAt(0).toUpperCase()}
                    </div>
                    <div className="announcement-meta">
                      <h3 className="announcement-author">{announcement.author}</h3>
                      <p className="announcement-time">{announcement.time}</p>
                    </div>
                  </div>
                  <p className="announcement-content">{announcement.content}</p>
                </div>
              ))}
              
              <div className="invite-code-chip">
                <span className="invite-code-label">Código de invitación:</span>
                X7B9-K2M
              </div>
            </>
          )}
        </div>
      </main>

      {/* Componente Modal */}
      <CreateAnnouncementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPublish={handlePublishAnnouncement}
      />
    </div>
  );
};

export default GroupDetailScreen;