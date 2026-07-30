import React from 'react';

/*
 * Componente: GroupTabs
 * Proposito: Renderiza y gestiona la navegacion interna mediante pestanas para la vista de detalles del grupo.
 */
const GroupTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'anuncios', label: 'Anuncios' },
    { id: 'apuntes', label: 'Apuntes' },
    { id: 'participantes', label: 'Participantes' }
  ];

  return (
    <div className="flex border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 py-3 text-sm font-medium text-center border-b-2 transition-colors ${
            activeTab === tab.id
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default GroupTabs;