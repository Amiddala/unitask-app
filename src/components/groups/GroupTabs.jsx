import React from 'react';

/*
 * Componente: GroupTabs
 * Proposito: Gestiona la navegacion interna mediante pestanas.
 */
const GroupTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'anuncios', label: 'Anuncios' },
    { id: 'apuntes', label: 'Apuntes' },
    { id: 'participantes', label: 'Participantes' }
  ];

  return (
    <div className="group-tabs-container">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`group-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default GroupTabs;