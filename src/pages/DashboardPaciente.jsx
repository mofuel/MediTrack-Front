import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "../css/Dash.css";
import '../css/Colors.css';
import logo from '../assets/logg.png';

import VistaPacienteInicio from "./viewsDashboardPaciente/VistaPacienteInicio";
import VistaPacienteCitas from "./viewsDashboardPaciente/VistaPacienteCitas";
import VistaPacientePerfil from "./viewsDashboardPaciente/VistaPacientePerfil";

function DashboardPaciente() {
  const navigate = useNavigate();

  const menuItems = [
    { id: "inicio", label: "Inicio", path: "/dashboard-paciente/inicio" },
    { id: "citas", label: "Mis Citas", path: "/dashboard-paciente/citas" },
    { id: "perfil", label: "Mi Perfil", path: "/dashboard-paciente/perfil" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user_paciente");
    localStorage.removeItem("token");
    localStorage.removeItem("rol");

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
            <li key={item.id}>
              <Link to={item.path} className="menu-btn">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <h1>Panel del Paciente</h1>
          <div className="user-info d-flex align-items-center gap-3">
            <button className="logout-btn" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </header>

        <Routes>
          <Route path="inicio" element={<VistaPacienteInicio />} />
          <Route path="citas" element={<VistaPacienteCitas />} />
          <Route path="perfil" element={<VistaPacientePerfil />} />
        </Routes>
      </main>
    </div>
  );
}

export default DashboardPaciente;
