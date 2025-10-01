import { useState } from 'react';
import '../css/Dash.css';

// Importamos las vistas
import VistaDashboard from "./viewsDashboardAdmin/VistaDashboard";
import VistaCitas from "./viewsDashboardAdmin/VistaCitas";
import VistaDoctores from "./viewsDashboardAdmin/VistaDoctores";
import VistaReportes from "./viewsDashboardAdmin/VistaReportes";

function DashboardAdmin() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'citas', label: 'Citas' },
    { id: 'doctores', label: 'Doctores' },
    { id: 'reportes', label: 'Reportes' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <VistaDashboard />;
      case 'citas':
        return <VistaCitas />;
      case 'doctores':
        return <VistaDoctores />;
      case 'reportes':
        return <VistaReportes />;
      default:
        return <VistaDashboard />;
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <nav className="sidebar">
        <div className="sidebar-header">
          <h2>DashAdmin</h2>
        </div>
        <ul className="menu-list">
          {menuItems.map((item) => (
            <li key={item.id} className={activeSection === item.id ? 'active' : ''}>
              <button
                onClick={() => setActiveSection(item.id)}
                className="menu-btn"
              >
                <span className="icon">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <h1>Panel de Administración</h1>
          <div className="user-info">
            <button className="logout-btn">Cerrar Sesión</button>
          </div>
        </header>
        {renderContent()}
      </main>
    </div>
  );
}

export default DashboardAdmin;
