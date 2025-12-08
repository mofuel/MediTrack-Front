import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Dash.css';
import '../css/Colors.css';
import logo from '../assets/logg.png';
import API_BASE_URL from '../config';

import VistaDashboard from "./viewsDashboardAdmin/VistaDashBoard";
import VistaCitas from "./viewsDashboardAdmin/VistaCitas";
import VistaDoctores from "./viewsDashboardAdmin/VistaDoctores";
import VistaReportes from "./viewsDashboardAdmin/VistaReportes";
import VistaEspecialidad from "./viewsDashboardAdmin/VistaEspecialidad";
import VistaPacientes from './viewsDashboardAdmin/VistaPacientes';
import VistaTurnosClinica from './viewsDashboardAdmin/VistaTurnosClinica';

function DashboardAdmin() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');

  const [cantidadDoctores, setCantidadDoctores] = useState(0);
  const [cantidadPacientes, setCantidadPacientes] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem("especialidades")) {
      localStorage.setItem("especialidades", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchCantidades = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Error al cargar usuarios");

        const data = await response.json();
        const doctores = data.filter(u => u.rol === "ROLE_MEDICO").length;
        const pacientes = data.filter(u => u.rol === "ROLE_PACIENTE").length;

        console.log("Usuarios recibidos:", data); 
        console.log("Cantidad Doctores:", doctores); 
        console.log("Cantidad Pacientes:", pacientes); 

        setCantidadDoctores(doctores);
        setCantidadPacientes(pacientes);
      } catch (error) {
        console.error("Error al cargar cantidades:", error);
      }
    };

    fetchCantidades();
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
    { id: 'turnos', label: 'Turnos Clínica' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div>
            <VistaDashboard
              cantidadDoctores={cantidadDoctores}
              cantidadPacientes={cantidadPacientes}
            />
          </div>
        );
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
      case 'turnos':
        return <VistaTurnosClinica />;
      default:
        return (
          <VistaDashboard
            cantidadDoctores={cantidadDoctores}
            cantidadPacientes={cantidadPacientes}
          />
        );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    localStorage.removeItem("codigoUsuario");
    navigate("/");
  };

  console.log("Props que se enviarán a VistaDashboard:", {
    cantidadDoctores,
    cantidadPacientes
  }); 

  return (
    <div className="app-container">
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
