import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GroupDetailScreen.css';
import CreateAnnouncementModal from '../components/groups/CreateAnnouncementModal';
import AddNoteModal from '../components/groups/AddNoteModal';

const GroupDetailScreen = () => {
  const [activeTab, setActiveTab] = useState('Anuncios');
  const [isAddingNote, setIsAddingNote] = useState(false); // Estado para mostrar la vista de añadir apunte
  const navigate = useNavigate();
  
  // Estados para el formulario de nuevo apunte
  const [noteTitle, setNoteTitle] = useState('');
  const [noteType, setNoteType] = useState('Documento PDF');
  const [noteLink, setNoteLink] = useState('');
  const [noteDescription, setNoteDescription] = useState('');

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      author: 'Israel Orosco',
      avatar: 'IO',
      time: 'Hoy a las 14:30',
      content: 'Mañana será la clase virtual por el paro. Por favor revisen la lectura antes de entrar.'
    },
    {
      id: 2,
      author: 'Camila Magne',
      avatar: 'CM',
      time: 'Ayer a las 18:45',
      content: 'Chicos, este es el código de invitación para los que faltan unirse al grupo:',
      inviteCode: 'ALFA-2026'
    }
  ]);

  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Diapositivas_Tema1.pdf',
      description: 'Subido por Israel Orosco • Hoy, 10:00',
    },
    {
      id: 2,
      title: 'Carpeta de Drive - Recursos',
      description: 'Subido por Juan Pérez • Ayer',
    },
    {
      id: 3,
      title: 'Borrador_Ensayo.docx',
      description: 'Subido por Camila Magne • 24 Oct',
    }
  ]);

  const [participants] = useState([
    { name: 'Camila Magne (Tú)', role: 'Administrador', avatar: 'CM', type: 'admin' },
    { name: 'Israel Orosco', role: 'Miembro', avatar: 'IO', type: 'member' },
    { name: 'Juan Pérez', role: 'Miembro', avatar: 'JP', type: 'member' }
  ]);

  const handleSaveNote = (e) => {
    e.preventDefault();
    if (!noteTitle.trim()) return;

    const newNote = {
      id: Date.now(),
      title: noteTitle.trim(),
      description: `Subido por Camila Magne • Justo ahora`,
    };

    setNotes([newNote, ...notes]);
    setNoteTitle('');
    setNoteLink('');
    setNoteDescription('');
    setIsAddingNote(false); // Regresar a la lista de apuntes
  };

  // Si está activo el formulario de añadir apunte, renderizamos esa vista basada en Figma
  if (isAddingNote) {
    return (
      <div className="group-screen" style={{ backgroundColor: '#FFFFFF' }}>
        <header className="group-header" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #F3F4F6' }}>
          <button 
            onClick={() => setIsAddingNote(false)} 
            className="group-options-btn"
            style={{ fontSize: '1.5rem', color: '#111827' }}
          >
            &#8249;
          </button>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', margin: 0 }}>Añadir Apunte</h2>
          <button 
            onClick={handleSaveNote}
            style={{ background: 'none', border: 'none', color: '#2563EB', fontWeight: 600, fontSize: '15px', cursor: 'pointer' }}
          >
            Guardar
          </button>
        </header>

        <form onSubmit={handleSaveNote} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', flex: 1, overflowY: 'auto' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
              Título del apunte o recurso
            </label>
            <input 
              type="text" 
              placeholder="Ej. Resumen Capítulo 4" 
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
              Tipo de Recurso
            </label>
            <select 
              value={noteType}
              onChange={(e) => setNoteType(e.target.value)}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '14px', backgroundColor: '#FFFFFF', outline: 'none', boxSizing: 'border-box', color: '#374151' }}
            >
              <option>Documento PDF</option>
              <option>Documento Word (DOCX)</option>
              <option>Enlace externo</option>
              <option>Imagen (JPG/PNG)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
              Enlace externo (Opcional)
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <span style={{ position: 'absolute', left: '14px', color: '#9CA3AF' }}>🔗</span>
              <input 
                type="url" 
                placeholder="https://..." 
                value={noteLink}
                onChange={(e) => setNoteLink(e.target.value)}
                style={{ width: '100%', padding: '12px 14px 12px 40px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
              Descripción o notas adicionales
            </label>
            <textarea 
              placeholder="Escribe aquí los puntos clave..." 
              rows={4}
              value={noteDescription}
              onChange={(e) => setNoteDescription(e.target.value)}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '14px', outline: 'none', boxSizing: 'border-box', resize: 'none', fontFamily: 'inherit' }}
            />
          </div>

          <div style={{ border: '2px dashed #93C5FD', borderRadius: '12px', padding: '24px', textAlign: 'center', backgroundColor: '#F8FAFC', cursor: 'pointer' }} onClick={() => alert('Seleccionar archivo')}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            </div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#2563EB', margin: '0 0 4px 0' }}>Sube o arrastra un archivo</p>
            <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>PDF, DOCX o JPG (Máx. 10MB)</p>
          </div>
        </form>

        <nav className="bottom-nav">
          <button onClick={() => navigate('/inicio')} className="nav-item">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            <span>Inicio</span>
          </button>
          <button onClick={() => navigate('/tareas')} className="nav-item">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
            <span>Tareas</span>
          </button>
          <button onClick={() => navigate('/examenes')} className="nav-item">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span>Exámenes</span>
          </button>
          <button onClick={() => navigate('/grupos')} className="nav-item active">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            <span>Grupos</span>
          </button>
        </nav>
      </div>
    );
  }

  return (
    <div className="group-screen">
      <header className="group-header">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button 
            onClick={() => navigate(-1)} 
            className="group-options-btn"
            style={{ marginRight: '12px', fontSize: '1.5rem' }}
            aria-label="Volver atrás"
          >
            &#8249;
          </button>
          <div>
            <h1 className="group-title">Equipo Alfa - Prototipo</h1>
            <h2 className="group-subtitle">Interacción Humano Computador</h2>
          </div>
        </div>
        <button className="group-options-btn">...</button>
      </header>

      <div className="group-tabs-container">
        <button 
          className={`group-tab-btn ${activeTab === 'Anuncios' ? 'active' : ''}`}
          onClick={() => setActiveTab('Anuncios')}
        >
          Anuncios
        </button>
        <button 
          className={`group-tab-btn ${activeTab === 'Apuntes' ? 'active' : ''}`}
          onClick={() => setActiveTab('Apuntes')}
        >
          Apuntes
        </button>
        <button 
          className={`group-tab-btn ${activeTab === 'Participantes' ? 'active' : ''}`}
          onClick={() => setActiveTab('Participantes')}
        >
          Participantes
        </button>
      </div>

      <main className="group-main">
        <div className="group-content-padding">
          
          {activeTab === 'Anuncios' && (
            <>
              <a 
                href="https://meet.google.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ display: 'flex', alignItems: 'center', backgroundColor: '#EFF6FF', border: '1px solid #DBEAFE', padding: '14px 16px', borderRadius: '14px', gap: '12px', marginBottom: '16px', textDecoration: 'none', transition: 'background-color 0.2s' }}
              >
                <div style={{ width: '40px', height: '40px', backgroundColor: '#DBEAFE', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#1D4ED8', margin: '0 0 2px 0' }}>Unirse a Google Meet</h3>
                  <p style={{ fontSize: '12px', color: '#3B82F6', margin: 0 }}>Israel Orosco • Hoy a las 14:30</p>
                </div>
              </a>

              <button className="add-note-btn" onClick={() => alert('Crear nuevo anuncio')}>
                + Crear Nuevo Anuncio
              </button>

              <div className="notes-list">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="announcement-card">
                    <div className="announcement-header">
                      <div className="announcement-avatar" style={{ backgroundColor: announcement.avatar === 'CM' ? '#F3E8FF' : '#E2E8F0', color: announcement.avatar === 'CM' ? '#7E22CE' : '#475569' }}>
                        {announcement.avatar}
                      </div>
                      <div className="announcement-meta">
                        <h3 className="announcement-author">{announcement.author}</h3>
                        <p className="announcement-time">{announcement.time}</p>
                      </div>
                    </div>
                    <p className="announcement-content">
                      {announcement.content}
                    </p>
                    {announcement.inviteCode && (
                      <div className="invite-code-chip">
                        <span className="invite-code-label">Código:</span>
                        {announcement.inviteCode}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'Apuntes' && (
            <>
              {/* Al hacer clic cambia al formulario exacto de Figma */}
              <button className="add-note-btn" onClick={() => setIsAddingNote(true)}>
                + Añadir Apunte
              </button>

              <div className="notes-list">
                {notes.map((note) => (
                  <div key={note.id} className="note-card">
                    <div className="note-icon yellow-bg">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                    </div>
                    <div className="note-info">
                      <h3>{note.title}</h3>
                      <p>{note.description}</p>
                    </div>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'Participantes' && (
            <>
              <button className="add-note-btn" onClick={() => alert('Invitar participante')}>
                + Invitar Participante
              </button>

              <div className="notes-list">
                {participants.map((p, idx) => (
                  <div key={idx} className="note-card">
                    <div className="announcement-avatar" style={{ marginRight: '14px', backgroundColor: p.type === 'admin' ? '#F3E8FF' : '#E2E8F0', color: p.type === 'admin' ? '#7E22CE' : '#475569' }}>
                      {p.avatar}
                    </div>
                    <div className="note-info">
                      <h3>{p.name}</h3>
                      <p style={{ color: p.type === 'admin' ? '#2563EB' : 'var(--color-ink-muted)', fontWeight: p.type === 'admin' ? '500' : '400' }}>{p.role}</p>
                    </div>
                    {p.type === 'admin' ? (
                      <span className="admin-badge">Admin</span>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><circle cx="12" cy="12" r="1.5"></circle><circle cx="12" cy="5" r="1.5"></circle><circle cx="12" cy="19" r="1.5"></circle></svg>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </main>

      <nav className="bottom-nav">
        <button onClick={() => navigate('/inicio')} className="nav-item">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          <span>Inicio</span>
        </button>
        <button onClick={() => navigate('/tareas')} className="nav-item">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
          <span>Tareas</span>
        </button>
        <button onClick={() => navigate('/examenes')} className="nav-item">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          <span>Exámenes</span>
        </button>
        <button onClick={() => navigate('/grupos')} className="nav-item active">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          <span>Grupos</span>
        </button>
      </nav>
    </div>
  );
};

export default GroupDetailScreen;

