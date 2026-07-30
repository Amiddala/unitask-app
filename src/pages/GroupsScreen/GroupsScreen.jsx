import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import ProfileAvatarButton from '../../components/Profile/ProfileAvatarButton';
import FloatingActionButton from '../../components/shared/FloatingActionButton';
import BottomNavBar from '../../components/shared/BottomNavBar';
import './GroupsScreen.css';

export default function GroupsScreen() {
    const navigate = useNavigate();
    const { user, groups=[], invitations=[], dispatch } = useApp();
    const [activeTab, setActiveTab] = useState('misGrupos');

    const handleGroupClick = (groupId) => {
        navigate(`/grupos/${groupId}`);
    };

    const handleAcceptInvitation = (inv) => {
        // Al aceptar, simulamos la creación del nuevo grupo a partir de la invitación
        const newGroup = {
        id: `g_${Date.now()}`,
        nombre: inv.nombre,
        materia: inv.materia,
        participantes: ['CM', 'TU'], // Tú y la persona que te invitó
        tieneReunionActiva: false
        };

        dispatch({
        type: 'ACCEPT_INVITATION',
        payload: { id: inv.id, newGroup }
        });
        alert(`¡Te has unido con éxito a ${inv.nombre}!`);
    };

    const handleDeclineInvitation = (id) => {
        dispatch({
        type: 'DECLINE_INVITATION',
        payload: id
        });
    };

    return (
        <div className="groups-screen-container">
        <div className="groups-header">
            <h1>Grupos</h1>
            <ProfileAvatarButton
              initials={user?.avatarIniciales || '??'}
              avatarUrl={user?.avatarUrl}
              ariaLabel="Perfil"
              onClick={() => navigate('/perfil')}
            />
        </div>

        <div className="groups-tabs-container">
            <button 
            className={`group-tab-button ${activeTab === 'misGrupos' ? 'active' : ''}`}
            onClick={() => setActiveTab('misGrupos')}
            >
            Mis Grupos
            </button>
            <button 
            className={`group-tab-button ${activeTab === 'invitaciones' ? 'active' : ''}`}
            onClick={() => setActiveTab('invitaciones')}
            >
            Invitaciones ({invitations.length})
            {invitations.length > 0 && <span className="tab-notification-dot"></span>}
            </button>
        </div>

        <h2 className="groups-section-title">
            {activeTab === 'misGrupos' ? 'Equipos de Trabajo' : 'Invitaciones Pendientes'}
        </h2>

        {activeTab === 'misGrupos' && (
            <div className="groups-list-wrapper">
            {groups.map(group => {
                const visibleMembers = group.participantes.slice(0, 3);
                const surplusCount = group.participantes.length - 3;

                return (
                <div 
                    key={group.id} 
                    className="group-card" 
                    onClick={() => handleGroupClick(group.id)}
                >
                    <h3 className="group-card-title">{group.nombre}</h3>
                    <span className="group-card-subject">{group.materia}</span>
                    
                    <div className="group-card-footer-row">
                    <div className="avatar-stack-container">
                        {visibleMembers.map((member, index) => (
                        <div 
                            key={index} 
                            className={`avatar-stack-member color-${(index % 4) + 1}`}
                        >
                            {member}
                        </div>
                        ))}
                        {surplusCount > 0 && (
                        <div className="avatar-stack-surplus">
                            +{surplusCount}
                        </div>
                        )}
                    </div>

                    {group.tieneReunionActiva && (
                        <div className="active-meeting-badge">
                        <span className="live-dot">●</span> Reunión Activa
                        </div>
                    )}

                    <span className="group-arrow-action">❯</span>
                    </div>
                </div>
                );
            })}
            </div>
        )}

        {activeTab === 'invitaciones' && (
            <div className="groups-list-wrapper">
            {invitations.length > 0 ? (
                invitations.map(inv => (
                <div key={inv.id} className="group-card" style={{ borderLeftColor: 'var(--color-ink-muted)' }}>
                    <h3 className="group-card-title">{inv.nombre}</h3>
                    <span className="group-card-subject">{inv.materia}</span>
                    <p style={{ fontSize: '12px', margin: '4px 0 12px 0', color: 'var(--color-ink-muted)' }}>
                    Invitación enviada por: <strong>{inv.remitente}</strong>
                    </p>
                    <div className="invitation-actions">
                    <button className="invitation-btn accept" onClick={() => handleAcceptInvitation(inv)}>
                        Aceptar
                    </button>
                    <button className="invitation-btn decline" onClick={() => handleDeclineInvitation(inv.id)}>
                        Rechazar
                    </button>
                    </div>
                </div>
                ))
            ) : (
                <p style={{ textAlign: 'center', color: 'var(--color-ink-muted)', marginTop: '40px' }}>
                No tienes invitaciones pendientes.
                </p>
            )}
            </div>
        )}

        <FloatingActionButton onClick={() => navigate('/en-desarrollo')} />
        <BottomNavBar activeTab="grupos" />
        </div>
    );
}