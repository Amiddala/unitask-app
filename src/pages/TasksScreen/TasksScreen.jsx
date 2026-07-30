import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Badge from '../../components/shared/Badge'; // Lo usamos si renderiza igual, si no, lo estilizamos directo
import BottomNavBar from '../../components/shared/BottomNavBar';
import FloatingActionButton from '../../components/shared/FloatingActionButton';
import './TasksScreen.css';

export default function TasksScreen() {
    const { tasks } = useApp();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('pendiente');

    const filteredTasks = useMemo(() => {
        return tasks.filter(task => task.estado === activeTab);
    }, [tasks, activeTab]);

    // Función helper para formatear las fechas exactamente como el prototipo
    const formatDeadline = (dateString) => {
        const deadline = new Date(dateString);
        const today = new Date();
        
        // Resetear horas para comparar días limpios
        today.setHours(0,0,0,0);
        deadline.setHours(0,0,0,0);
        
        const diffTime = deadline - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 0 && diffDays <= 6) {
        return `Vence en ${diffDays} días`;
        } else {
        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const dia = String(deadline.getDate()).padStart(2, '0');
        return `Vence el ${dia} de ${meses[deadline.getMonth()]}`;
        }
    };

    return (
        <div className="tasks-screen-container">
        <div className="tasks-header">
            <h1 className="tasks-title">Tareas</h1>
            <div className="user-avatar">CM</div>
        </div>
        
        {/* Selector de pestañas */}
        <div className="tab-switcher">
            {['pendiente', 'enProgreso', 'completadas'].map((tab) => (
            <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            >
                {tab === 'pendiente' ? 'Pendientes' : tab === 'enProgreso' ? 'En Progreso' : 'Completadas'}
            </button>
            ))}
        </div>

        {/* Listado de tareas */}
        <div className="tasks-list">
            {filteredTasks.map(task => {
                const deadlineText = formatDeadline(task.fechaLimite);
                const isUrgent = deadlineText.includes('días');

                return (
                    <div 
                    key={task.id} 
                    className={`task-card ${task.tipo}`} 
                    onClick={() => navigate(`/tareas/${task.id}`)}
                    >
                    {/* 1. FILA SUPERIOR: Título a la izquierda, Badge a la derecha */}
                    <div className="task-card-header">
                        <h3 className="task-card-title">{task.titulo}</h3>
                        <span className={`task-badge-custom ${task.tipo}`}>
                        {task.tipo === 'grupal' ? 'Grupal' : 'Personal'}
                        </span>
                    </div>
                    
                    {/* 2. FILA INTERMEDIA: Nombre de la materia abajo del título */}
                    <p className="task-card-subject">{task.materia}</p>
                    
                    {/* 3. FILA INFERIOR: Reloj/Vencimiento a la izquierda, Subtareas a la derecha */}
                    <div className="task-card-footer">
                        <div className={`task-deadline-alert ${isUrgent ? 'urgent' : 'normal'}`}>
                        <span className="clock-icon">🕒</span>
                        <span>{deadlineText}</span>
                        </div>
                        
                        {Array.isArray(task.subtareas) && task.subtareas.length > 0 ? (
                            <span className="subtasks-counter-text">
                            {task.subtareasCompletadas}/{task.subtareasTotal} Subtareas
                            </span>
                        ) : (
                            /* Espacio vacío de respaldo si la tarea verdaderamente no tiene subtareas creadas */
                            <span></span>
                        )}
                    </div>
                    </div>
                );
                })}
            </div>

        <FloatingActionButton onClick={() => navigate('/actividades/nueva')} />
        <BottomNavBar activeTab="tareas" />
        </div>
    );
}