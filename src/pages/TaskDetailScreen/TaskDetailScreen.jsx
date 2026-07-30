import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import './TaskDetailScreen.css';

export default function TaskDetailScreen() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { tasks, dispatch } = useApp();

    // Estados locales para controlar la adición de nuevas subtareas
    const [isAddingSubtask, setIsAddingSubtask] = useState(false);
    const [newSubtaskText, setNewSubtaskText] = useState('');

    // 1. Obtener los datos de la tarea por ID
    const task = useMemo(() => {
        return tasks.find(t => t.id === parseInt(id) || t.id === id);
    }, [tasks, id]);

    // Si la tarea no existe por alguna razón, se maneja de forma segura
    if (!task) {
        return (
        <div className="task-detail-container">
            <p>Tarea no encontrada.</p>
            <button onClick={() => navigate('/tareas')}>Regresar</button>
        </div>
        );
    }

    // 2. Estado derivado: Cálculo del porcentaje de progreso
    const progressPercentage = useMemo(() => {
        if (!task.subtareas || task.subtareas.length === 0) return 0;
        const completedCount = task.subtareas.filter(s => s.isCompleted).length;
        return Math.round((completedCount / task.subtareas.length) * 100);
    }, [task]);

    // 3. Acción: Alternar el estado completado de una subtarea
    const handleToggleSubtask = (subtaskId) => {
        const updatedSubtasks = task.subtareas.map(sub => {
        if (sub.id === subtaskId) {
            return { ...sub, isCompleted: !sub.isCompleted };
        }
        return sub;
        });

        const subtareasCompletadas = updatedSubtasks.filter(s => s.isCompleted).length;

        // Enviamos el objeto de la tarea mutada completa a través del nuevo caso del reducer
        dispatch({
        type: 'UPDATE_TASK',
        payload: {
            ...task,
            subtareas: updatedSubtasks,
            subtareasCompletadas: subtareasCompletadas
        }
        });
    };

    // 4. Acción: Guardar una nueva subtarea
    const handleAddSubtaskSubmit = (e) => {
        e.preventDefault();
        if (!newSubtaskText.trim()) return;

        const newSubtask = {
        id: Date.now(),
        title: newSubtaskText.trim(),
        assignedTo: 'Tú',
        isCompleted: false
        };

        const currentSubtasks = Array.isArray(task.subtareas) ? task.subtareas : [];
        const updatedSubtasks = [...currentSubtasks, newSubtask];

        // Enviamos el objeto modificado completo al reducer
        dispatch({
        type: 'UPDATE_TASK',
        payload: {
            ...task,
            subtareas: updatedSubtasks,
            subtareasTotal: updatedSubtasks.length,
            subtareasCompletadas: updatedSubtasks.filter(s => s.isCompleted).length
        }
        });

        // Resetea y cierra la cajita
        setNewSubtaskText('');
        setIsAddingSubtask(false);
    };

    return (
        <div className="task-detail-container">
        {/* Barra de navegación del Header */}
        <div className="detail-navbar">
            <button className="back-button" onClick={() => navigate('/tareas')}>
            ←
            </button>
            <h2 className="detail-nav-title">Detalle de Tarea</h2>
            <button className="edit-button" onClick={() => navigate('/en-desarrollo')}>
            📝
            </button>
        </div>

        {/* Tarjeta superior informativa (<TaskHeaderCard />) */}
        <div className="task-header-card">
            <div className="task-header-meta">
            <span className={`detail-badge ${task.tipo}`}>
                {task.tipo === 'grupal' ? 'Grupal' : 'Personal'}
            </span>
            <span className="detail-subject-name">{task.materia}</span>
            </div>
            <h1 className="detail-task-title">{task.titulo}</h1>
            <div className="detail-deadline-row">
            <span>⏰</span>
            <span>Vence mañana a las 23:59</span>
            </div>
            <p className="detail-description">
            {task.descripcion || 'Diseñar las interfaces principales aplicando las Leyes de Gestalt y el estándar WCAG AAA.'}
            </p>
        </div>

        {/* Encabezado y Barra de progreso dinámico (<ProgressBar />) */}
        <h3 className="subtasks-section-title">
            Subtareas (Progreso {progressPercentage}%)
        </h3>
        <div className="progress-bar-container">
            <div 
            className="progress-bar-fill" 
            style={{ width: `${progressPercentage}%` }}
            />
        </div>

        {/* Contenedor de la lista de subtareas */}
        <div className="subtasks-list">
            {task.subtareas && task.subtareas.map(subtask => (
            <div 
                key={subtask.id} 
                className={`subtask-card-item ${subtask.isCompleted ? 'completed' : ''}`}
            >
                {/* Checkbox circular interactivo */}
                <div 
                className="subtask-checkbox-wrapper"
                onClick={() => handleToggleSubtask(subtask.id)}
                >
                <div className={`circular-checkbox ${subtask.isCompleted ? 'checked' : ''}`}>
                    {subtask.isCompleted && '✓'}
                </div>
                </div>

                {/* Metadatos de la subtarea */}
                <div className="subtask-info">
                <p className={`subtask-text ${subtask.isCompleted ? 'completed' : ''}`}>
                    {subtask.title}
                </p>
                <span className={`subtask-assignee ${subtask.isCompleted ? 'completed' : ''}`}>
                    Asignado a: {subtask.assignedTo}
                </span>
                </div>
            </div>
            ))}
        </div>

        {/* Botón dinámico / Formulario para añadir subtarea */}
        {isAddingSubtask ? (
            <form onSubmit={handleAddSubtaskSubmit} className="add-subtask-form">
            <input
                type="text"
                className="add-subtask-input"
                placeholder="Escribe la nueva subtarea..."
                value={newSubtaskText}
                onChange={(e) => setNewSubtaskText(e.target.value)}
                autoFocus
            />
            <div className="add-subtask-form-actions">
                <button 
                type="button" 
                className="btn-cancel-subtask" 
                onClick={() => setIsAddingSubtask(false)}
                >
                Cancelar
                </button>
                <button type="submit" className="btn-confirm-subtask">
                Agregar
                </button>
            </div>
            </form>
        ) : (
            <button 
            className="btn-add-subtask-trigger" 
            onClick={() => setIsAddingSubtask(true)}
            >
            <span>+</span> Añadir Subtarea
            </button>
        )}
        </div>
    );
}