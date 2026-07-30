import React, { useState } from 'react';
import GroupTabs from '../components/Groups/GroupTabs';
import JoinMeetingButton from '../components/Groups/JoinMeetingButton';
import AnnouncementCard from '../components/Groups/AnnouncementCard';
import InviteCodeChip from '../components/Groups/InviteCodeChip';

/*
 * Componente: GroupDetailScreen
 * Proposito: Renderiza la vista detallada de un grupo seleccionado.
 * Maneja el estado de la navegacion interna (Anuncios, Apuntes, Participantes).
 */
const GroupDetailScreen = () => {
  const [activeTab, setActiveTab] = useState('anuncios');

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
          <div className="p-4">
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
        return <div className="p-4 text-gray-500 text-sm border-2 border-dashed border-gray-300 rounded-lg text-center mt-4">Contenido de Apuntes en construcción (US-11)</div>;
      case 'participantes':
        return <div className="p-4 text-gray-500 text-sm border-2 border-dashed border-gray-300 rounded-lg text-center mt-4">Lista de Participantes en construcción</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex justify-between items-center p-4 bg-white shadow-sm border-b border-gray-200">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{mockGroupData.name}</h1>
          <h2 className="text-sm text-gray-500">{mockGroupData.subject}</h2>
        </div>
        <button aria-label="Opciones del grupo" className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <span className="text-xl font-bold leading-none">...</span>
        </button>
      </header>

      <GroupTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 overflow-y-auto">
        {renderActiveTabContent()}
      </main>
    </div>
  );
};

export default GroupDetailScreen;