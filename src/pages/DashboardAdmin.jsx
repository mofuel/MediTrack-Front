import { useState } from 'react';
import '../css/Dash.css';

function DashboardAdmin() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'patients', label: 'Pacientes'},
    { id: 'appointments', label: 'Citas'},
    { id: 'doctors', label: 'Doctores'},
    { id: 'reports', label: 'Reportes'},
  ];

  const renderDashboard = () => (
    <div className="dashboard-content">
      <div className="stats-grid">
        <div className="stat-card">
          <h2>Total de Pacientes</h2>
          <p className="stat-number">1000</p>
        </div>
        <div className="stat-card">
          <h2>Citas Hoy</h2>
          <p className="stat-number">20</p>
        </div>
        <div className="stat-card">
          <h2>Doctores Activos</h2>
          <p className="stat-number">5</p>
        </div>
        <div className="stat-card">
          <h2>Ingresos del Mes</h2>
          <p className="stat-number">$10000</p>
        </div>
      </div>
      <div className="recent-section">
        <h2>Últimas Citas</h2>
        <ul className="recent-list">
          <li>Paciente: Juan Pérez - 10:00 AM - Dr. López</li>
          <li>Paciente: María García - 11:30 AM - Dr. Ruiz</li>
          <li>Paciente: Carlos Mendoza - 14:00 PM - Dr. Soto</li>
        </ul>
      </div>
    </div>
  );

  const renderPatients = () => (
    <div className="section-content">
      <h1>Gestión de Pacientes</h1>
      <p>Sin funcionalidad aún T-T</p>
      <button className="action-btn">Agregar Paciente</button>
    </div>
  );

  const renderAppointments = () => (
    <div className="section-content">
      <h1>Gestión de Citas</h1>
      <p>Calendario y lista de citas. (Sin funcionalidad aún)</p>
      <button className="action-btn">Nueva Cita</button>
    </div>
  );

  const renderDoctors = () => (
    <div className="section-content">
      <h1>Gestión de Doctores</h1>
      <p>Lista de doctores y sus horarios. (Sin funcionalidad aún)</p>
      <button className="action-btn">Agregar Doctor</button>
    </div>
  );

  const renderReports = () => (
    <div className="section-content">
      <h1>Reportes</h1>
      <p>Acá van los graficos pero no sé como colocarlos</p>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'patients':
        return renderPatients();
      case 'appointments':
        return renderAppointments();
      case 'doctors':
        return renderDoctors();
      case 'reports':
        return renderReports();
      default:
        return renderDashboard();
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