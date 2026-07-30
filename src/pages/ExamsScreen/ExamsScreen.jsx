import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import BottomNavBar from '../../components/shared/BottomNavBar';
import FloatingActionButton from '../../components/shared/FloatingActionButton';
import './ExamsScreen.css';

export default function ExamsScreen() {
    const { exams } = useApp();
    const [activeTab, setActiveTab] = useState('proximos');

    // Helper para convertir la fecha ISO al nombre del mes en Español
    const getMonthName = (dateString) => {
        try {
        const date = new Date(dateString);
        const month = date.toLocaleString('es-ES', { month: 'long' });
        return month.charAt(0).toUpperCase() + month.slice(1);
        } catch (e) {
        return 'Varios';
        }
    };

    // Helper para dar formato amigable a la fecha del examen (ej. "Viernes 15 de Agosto")
    const formatExamDate = (dateString) => {
        try {
        const date = new Date(dateString);
        return date.toLocaleString('es-ES', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long' 
        }).replace(/^\w/, (c) => c.toUpperCase());
        } catch (e) {
        return 'Fecha no disponible';
        }
    };

    // Lógica de filtrado y agrupación adaptada a las propiedades reales del Context
    const processedExamsData = useMemo(() => {
        const now = new Date();
        const examList = Array.isArray(exams) ? exams : [];

        // 1. Filtrar usando 'fechaLimite' en lugar de 'fecha'
        const upcomingList = examList.filter(exam => new Date(exam.fechaLimite) >= now);
        const historyList = examList.filter(exam => new Date(exam.fechaLimite) < now);

        // 2. Agrupar Próximos por mes
        const groupedUpcoming = upcomingList.reduce((acc, exam) => {
        const monthName = getMonthName(exam.fechaLimite);
        if (!acc[monthName]) acc[monthName] = [];
        acc[monthName].push(exam);
        return acc;
        }, {});

        // 3. Agrupar Historial por mes
        const groupedHistory = historyList.reduce((acc, exam) => {
        const monthName = getMonthName(exam.fechaLimite);
        if (!acc[monthName]) acc[monthName] = [];
        acc[monthName].push(exam);
        return acc;
        }, {});

        return {
        proximos: groupedUpcoming,
        historial: groupedHistory
        };
    }, [exams]);

    const activeGroup = activeTab === 'proximos' 
        ? processedExamsData.proximos 
        : processedExamsData.historial;

    return (
        <div className="exams-screen-container">
        {/* Header Superior */}
        <div className="exams-header">
            <h1>Exámenes</h1>
            <div className="user-avatar-badge">CM</div>
        </div>

        {/* Selector de Pestañas Interactivo */}
        <div className="exams-tabs-container">
            <button 
            className={`exam-tab-button ${activeTab === 'proximos' ? 'active' : ''}`}
            onClick={() => setActiveTab('proximos')}
            >
            Próximos
            </button>
            <button 
            className={`exam-tab-button ${activeTab === 'historial' ? 'active' : ''}`}
            onClick={() => setActiveTab('historial')}
            >
            Historial
            </button>
        </div>

        {/* Renderizado de Grupos Mensuales */}
        {Object.keys(activeGroup).length > 0 ? (
            Object.entries(activeGroup).map(([month, monthExams]) => (
            <div key={month} className="month-group-container">
                <h2 className="month-group-title">{month}</h2>
                
                {monthExams.map(exam => (
                <div 
                    key={exam.id} 
                    className={`exam-card ${activeTab === 'proximos' ? 'upcoming' : 'history'}`}
                >
                    {/* 🌟 Mapeo corregido: titulo es el principal, materia es el tipo */}
                    <h3 className="exam-card-title">{exam.titulo}</h3>
                    <span className="exam-card-type">{exam.materia}</span>
                    
                    <div className="exam-card-details-row">
                    <div className="exam-detail-item">
                        <span>⏰</span>
                        <span>{formatExamDate(exam.fechaLimite)} • {exam.hora || '09:00'}</span>
                    </div>
                    
                    <div className="exam-detail-location">
                        <span>📍</span>
                        <span>{exam.aula || 'Por asignar'}</span>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            ))
        ) : (
            <p style={{ textAlign: 'center', color: 'var(--color-ink-muted)', marginTop: '40px' }}>
            No tienes exámenes en esta sección.
            </p>
        )}

        {/* Botón Acción Flotante */}
        <FloatingActionButton onClick={() => alert('Crear Examen próximamente')} />

        <BottomNavBar activeTab='examenes'/>
        </div>
    );
}