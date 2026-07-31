import { useState } from 'react';
import './CreateAnnouncementModal.css';

const CreateAnnouncementModal = ({ isOpen, onClose, onPublish }) => {
  const [announcementText, setAnnouncementText] = useState('');

  // Si el modal no está abierto, no renderizamos nada
  if (!isOpen) return null;

  const handlePublish = () => {
    if (announcementText.trim() !== '') {
      onPublish(announcementText);
      setAnnouncementText(''); // Limpiamos el texto
      onClose(); // Cerramos el modal
    }
  };

  const handleCancel = () => {
    setAnnouncementText('');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3 className="modal-title">Crear Nuevo Anuncio</h3>
        
        <textarea
          className="modal-textarea"
          placeholder="Escribe los detalles del anuncio aquí..."
          value={announcementText}
          onChange={(e) => setAnnouncementText(e.target.value)}
          rows="5"
        />
        
        <div className="modal-actions">
          <button className="btn-cancel" onClick={handleCancel}>
            Cancelar
          </button>
          <button 
            className="btn-publish" 
            onClick={handlePublish}
            disabled={announcementText.trim() === ''} // Se deshabilita si está vacío
          >
            Publicar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAnnouncementModal;