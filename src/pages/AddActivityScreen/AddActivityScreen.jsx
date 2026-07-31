import React, { useState } from 'react';
import

{ useNavigate } from 'react-router-dom';
import './AddActivityScreen.css';

export default function AddActivityScreen() {
  const navigate = useNavigate();
  const [activityType, setActivityType] = useState('Tarea');

  return (
    <div className="page-container">
      <header className="page-header">
        <button onClick={() => navigate(-1)} className="btn-back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <h1 className="header-title">Nueva Actividad</h1>
        <button className="btn-save">Guardar</button>
      </header>

      <main className="form-content">
        <div className="form-group">
          <label>Título</label>
          <input type="text" placeholder="Ej. Ensayo de Arquitectura" />
        </div>

        <div className="form-group">
          <label>Tipo de Actividad</label>
          <div className="toggle-group">
            <button 
              type="button"
              className={activityType === 'Tarea' ? 'toggle-btn active' : 'toggle-btn'}
              onClick={() => setActivityType('Tarea')}
            >
              Tarea
            </button>
            <button 
              type="button"
              className={activityType === 'Examen' ? 'toggle-btn active' : 'toggle-btn'}
              onClick={() => setActivityType('Examen')}
            >
              Examen
            </button>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group flex-1">
            <label>Fecha límite</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <input type="text" placeholder="24 Oct" defaultValue="24 Oct" />
            </div>
          </div>
          <div className="form-group flex-1">
            <label>Hora</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <input type="text" placeholder="23:59" defaultValue="23:59" />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Materia / Categoría</label>
          <div className="input-wrapper">
            <input type="text" placeholder="Interacción Humano Computador" defaultValue="Interacción Humano Computador" />
            <svg className="icon-right" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>

        <div className="form-group">
          <label>Descripción o Apuntes (Opcional)</label>
          <textarea placeholder="Añade enlaces, requerimientos o notas rápidas..."></textarea>
        </div>
      </main>
    </div>
  );
}