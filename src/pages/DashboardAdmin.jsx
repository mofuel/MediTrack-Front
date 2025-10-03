import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Dash.css';
import '../css/colors.css';
import logo from '../assets/logg.png';

import VistaDashboard from "./viewsDashboardAdmin/VistaDashboard";
import VistaCitas from "./viewsDashboardAdmin/VistaCitas";
import VistaDoctores from "./viewsDashboardAdmin/VistaDoctores";
import VistaReportes from "./viewsDashboardAdmin/VistaReportes";
import VistaEspecialidad from "./viewsDashboardAdmin/VistaEspecialidad";
import VistaPacientes from './viewsDashboardAdmin/VistaPacientes';

function DashboardAdmin() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');

  // Inicializa especialidades solo si no existe
  useEffect(() => {
    if (!localStorage.getItem("especialidades")) {
      localStorage.setItem("especialidades", JSON.stringify([]));
    }
  }, []);


  const codigoUsuario = localStorage.getItem("codigoUsuario");
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
  const nombreUsuario = usuarios[codigoUsuario]?.nombre || "Usuario";

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'pacientes', label: 'Pacientes' },
    { id: 'doctores', label: 'Doctores' },
    { id: 'citas', label: 'Citas' },
    { id: 'especialidades', label: 'Especialidades' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <VistaDashboard />;
      case 'pacientes':
        return <VistaPacientes />;
      case 'citas':
        return <VistaCitas />;
      case 'doctores':
        return <VistaDoctores />;
      case 'reportes':
        return <VistaReportes />;
      case 'especialidades':
        return <VistaEspecialidad />;
      default:
        return <VistaDashboard />;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    localStorage.removeItem("codigoUsuario");

    navigate("/");
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <nav className="sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="Logo DashAdmin" className="logo-img" />
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
          <div className="user-info d-flex align-items-center gap-3">
            <span className="fw-semibold">Hola, {nombreUsuario}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </header>
        {renderContent()}
      </main>
    </div>
  );
}

export default DashboardAdmin;
