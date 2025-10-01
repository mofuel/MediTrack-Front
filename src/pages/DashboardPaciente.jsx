import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../css/Dash.css";

import VistaPacienteInicio from "./viewsDashboardPaciente/VistaPacienteInicio";
import VistaPacienteCitas from "./viewsDashboardPaciente/VistaPacienteCitas";
import VistaPacienteRecetas from "./viewsDashboardPaciente/VistaPacienteRecetas";
import VistaPacientePerfil from "./viewsDashboardPaciente/VistaPacientePerfil";

function DashboardPaciente() {
  const menuItems = [
    { id: "inicio", label: "Inicio", path: "/paciente/inicio" },
    { id: "citas", label: "Mis Citas", path: "/paciente/citas" },
    { id: "recetas", label: "Mis Recetas", path: "/paciente/recetas" },
    { id: "perfil", label: "Mi Perfil", path: "/paciente/perfil" },
  ];

  return (
    <Router>
      <div className="app-container">
        {/* Sidebar */}
        <nav className="sidebar">
          <div className="sidebar-header">
            <h2>Paciente</h2>
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
            <div className="user-info">
              <button className="logout-btn">Cerrar Sesión</button>
            </div>
          </header>

          <Routes>
            <Route path="/" element={<VistaPacienteInicio />} />
            <Route path="/paciente/inicio" element={<VistaPacienteInicio />} />
            <Route path="/paciente/citas" element={<VistaPacienteCitas />} />
            <Route path="/paciente/recetas" element={<VistaPacienteRecetas />} />
            <Route path="/paciente/perfil" element={<VistaPacientePerfil />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default DashboardPaciente;
