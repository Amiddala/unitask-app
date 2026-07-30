import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GroupTabs from '../components/Groups/GroupTabs';
import JoinMeetingButton from '../components/Groups/JoinMeetingButton';
import AnnouncementCard from '../components/Groups/AnnouncementCard';
import InviteCodeChip from '../components/Groups/InviteCodeChip';
import './GroupDetailScreen.css';

/*
 * Componente: GroupDetailScreen
 * Proposito: Vista detallada principal del grupo. Gestiona la navegacion interna
 * y el renderizado condicional de las pestanas de anuncios, apuntes y participantes.
 */
const GroupDetailScreen = () => {
  const [activeTab, setActiveTab] = useState('anuncios');
  const navigate = useNavigate();

  // Datos simulados basados en el prototipo UI
  const mockGroupData = {
    name: "Equipo Alfa - Prototipo",
    subject: "Interacción Humano Computador",
    announcements: [
      {
        id: 1,
        author: "Israel Orosco",
        avatar: "IO",
        time: "Hoy a las 14:30",
        content: "Mañana será la clase virtual por el paro. Por favor revisen la lectura antes de entrar."
      },
      {
        id: 2,
        author: "Camila Magne",
        avatar: "CM",
        time: "Ayer a las 18:45",
        content: "Chicos, este es el código de invitación para los que faltan unirse al grupo:",
        inviteCode: "ALFA-2026"
      }
    ]
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'anuncios':
        return (
          <div className="group-content-padding">
            <JoinMeetingButton url="https://meet.google.com/mock" />
            {mockGroupData.announcements.map((announcement) => (
              <AnnouncementCard key={announcement.id} data={announcement}>
                {announcement.inviteCode && (
                  <InviteCodeChip code={announcement.inviteCode} />
                )}
              </AnnouncementCard>
            ))}
          </div>
        );
      case 'apuntes':
        return <div className="group-content-padding">Apuntes en construcción (US-11)</div>;
      case 'participantes':
        return <div className="group-content-padding">Participantes en construcción</div>;
      default:
        return null;
    }
  };

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
            <h1 className="group-title">{mockGroupData.name}</h1>
            <h2 className="group-subtitle">{mockGroupData.subject}</h2>
          </div>
        </div>
        <button aria-label="Opciones del grupo" className="group-options-btn">
          ...
        </button>
      </header>

      <GroupTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="group-main">
        {renderActiveTabContent()}
      </main>
    </div>
  );
};

export default GroupDetailScreen;