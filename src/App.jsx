import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registro from "./pages/Register";
import NewPassword from "./pages/NewPassword";
import CrearPerfilMedico from "./pages/CrearPerfilMedico";
import IndexMedico from "./pages/IndexMedico";
import SolicitudesCitas from "./pages/SolicitudesCitas";
import HistorialCitas from "./pages/HistorialCitas";
import Notificaciones from "./pages/Notificaciones";
import PerfilMedico from "./pages/PerfilMedico";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardPaciente from "./pages/DashboardPaciente";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/crear-perfil-medico" element={<CrearPerfilMedico />} />
        <Route path="/index-medico" element={<IndexMedico />} />
        <Route path="/solicitudes-citas" element={<SolicitudesCitas />} />
        <Route path="/historial-citas" element={<HistorialCitas />} />
        <Route path="/notificaciones" element={<Notificaciones />} />
        <Route path="/perfil-medico" element={<PerfilMedico />} />
        <Route path="/dashboard-admin/*" element={<DashboardAdmin />} />
        <Route path="/dashboard-paciente/*" element={<DashboardPaciente />} />
      </Routes>
    </Router>
  );
}

export default App;
