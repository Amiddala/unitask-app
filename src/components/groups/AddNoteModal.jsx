import { useState } from 'react';
import './AddNoteModal.css';

const AddNoteModal = ({ isOpen, onClose, onAddNote }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');

  if (!isOpen) return null;

  const handleAdd = () => {
    if (title.trim() !== '') {
      onAddNote({ title, description, link });
      setTitle('');
      setDescription('');
      setLink('');
      onClose();
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setLink('');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3 className="modal-title">Agregar Apunte</h3>
        
        <div className="form-group">
          <label>Título del apunte *</label>
          <input
            type="text"
            className="modal-input"
            placeholder="Ej. Resumen de Patrones de Diseño"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea
            className="modal-textarea"
            placeholder="Detalles adicionales del documento..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Enlace (URL del documento)</label>
          <input
            type="url"
            className="modal-input"
            placeholder="https://ejemplo.com/documento"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        
        <div className="modal-actions">
          <button className="btn-cancel" onClick={handleCancel}>
            Cancelar
          </button>
          <button 
            className="btn-publish" 
            onClick={handleAdd}
            disabled={title.trim() === ''}
          >
            Guardar Apunte
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNoteModal;
