import { useState } from 'react';
import './GroupDetailScreen.css';
import CreateAnnouncementModal from '../components/groups/CreateAnnouncementModal';
import AddNoteModal from '../components/groups/AddNoteModal';

const GroupDetailScreen = () => {
  const [activeTab, setActiveTab] = useState('novedades');
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      author: 'Docente',
      time: 'Hace 2 horas',
      content: 'Bienvenidos al grupo. Por favor revisen el material adjunto en la plataforma.'
    }
  ]);

  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Guía de Arquitectura Limpia',
      description: 'Documento base para el proyecto final.',
      link: 'https://docs.google.com/ejemplo',
      author: 'camiii',
      time: 'Ayer'
    }
  ]);

  const handlePublishAnnouncement = (text) => {
    const newAnnouncement = {
      id: Date.now(),
      author: 'camiii',
      time: 'Justo ahora',
      content: text
    };
    setAnnouncements([newAnnouncement, ...announcements]);
    setIsAnnouncementModalOpen(false);
  };

  const handleAddNote = (noteData) => {
    const newNote = {
      id: Date.now(),
      title: noteData.title,
      description: noteData.description,
      link: noteData.link,
      author: 'camiii',
      time: 'Justo ahora'
    };
    setNotes([newNote, ...notes]);
    setIsNoteModalOpen(false);
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
              <button className="join-meeting-btn" onClick={() => setIsAnnouncementModalOpen(true)}>
                + Crear Nuevo Anuncio
              </button>

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

          {activeTab === 'trabajos' && (
            <>
              <button className="join-meeting-btn" onClick={() => setIsNoteModalOpen(true)}>
                + Agregar Nuevo Apunte
              </button>

              {notes.map((note) => (
                <div key={note.id} className="announcement-card">
                  <div className="announcement-header">
                    <div className="announcement-avatar">
                      {note.author.charAt(0).toUpperCase()}
                    </div>
                    <div className="announcement-meta">
                      <h3 className="announcement-author">{note.title}</h3>
                      <p className="announcement-time">Subido por {note.author} • {note.time}</p>
                    </div>
                  </div>
                  {note.description && <p className="announcement-content" style={{marginBottom: '10px'}}>{note.description}</p>}
                  {note.link && (
                    <a href={note.link} target="_blank" rel="noopener noreferrer" style={{color: '#0066ff', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500'}}>
                      🔗 Ver Documento
                    </a>
                  )}
                </div>
              ))}
            </>
          )}

        </div>
      </main>

      <CreateAnnouncementModal
        isOpen={isAnnouncementModalOpen}
        onClose={() => setIsAnnouncementModalOpen(false)}
        onPublish={handlePublishAnnouncement}
      />

      <AddNoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        onAddNote={handleAddNote}
      />
    </div>
  );
};

export default GroupDetailScreen;

