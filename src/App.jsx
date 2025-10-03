import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Rutas del sistema de usuarios
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

// Rutas institucionales
import Home from "./pages/Home";
import Servicios from "./pages/Servicios";
import Especialidades from "./pages/Especialidades";
import Dermatologia from "./pages/Dermatologia";
import Gastroenterologia from "./pages/Gastroenterologia";
import Odontologia from "./pages/Odontologia";
import Ginecologia from "./pages/Ginecologia";
import Neurologia from "./pages/Neurologia";
import Pediatria from "./pages/Pediatria";
import Psiquiatria from "./pages/Psiquiatria";
import Cardiologia from "./pages/Cardiologia";
import AtencionADomicilio from "./pages/AtencionADomicilio";
import MedicoVirtual from "./pages/MedicoVirtual";
import CentroEstetico from "./pages/CentroEstetico";
import ChequeoMedico from "./pages/ChequeoMedico";
import SonrisaTotal from "./pages/SonrisaTotal";
import ProgramaMaternidad from "./pages/ProgramaMaternidad";
import CirugiaRobotica from "./pages/CirugiaRobotica";
import Promociones from "./pages/Promociones";
import Sedes from "./pages/Sedes";
import SanBorja from "./pages/SanBorja";
import Lima from "./pages/Lima";
import Surco from "./pages/Surco";
import SanIsidro from "./pages/SanIsidro";
import LaMolina from "./pages/LaMolina";
import Investigacion from "./pages/Investigacion";
import Docencia from "./pages/Docencia";
import InformacionProfesional from "./pages/InformacionProfesional";
import SobreNosotros from "./pages/SobreNosotros";
import LibroReclamaciones from "./pages/LibroReclamaciones";

// Componentes globales
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />

      <Routes>
        {/* Rutas institucionales */}
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/especialidades" element={<Especialidades />} />
        <Route path="/dermatologia" element={<Dermatologia />} />
        <Route path="/gastroenterologia" element={<Gastroenterologia />} />
        <Route path="/odontologia" element={<Odontologia />} />
        <Route path="/ginecologia" element={<Ginecologia />} />
        <Route path="/neurologia" element={<Neurologia />} />
        <Route path="/pediatria" element={<Pediatria />} />
        <Route path="/psiquiatria" element={<Psiquiatria />} />
        <Route path="/cardiologia" element={<Cardiologia />} />
        <Route path="/atencion-domicilio" element={<AtencionADomicilio />} />
        <Route path="/medico-virtual" element={<MedicoVirtual />} />
        <Route path="/centro-estetico" element={<CentroEstetico />} />
        <Route path="/chequeos-medicos" element={<ChequeoMedico />} />
        <Route path="/sonrisa-total" element={<SonrisaTotal />} />
        <Route path="/programa-maternidad" element={<ProgramaMaternidad />} />
        <Route path="/cirugia-robotica" element={<CirugiaRobotica />} />
        <Route path="/promociones" element={<Promociones />} />
        <Route path="/sedes" element={<Sedes />} />
        <Route path="/sede-san-borja" element={<SanBorja />} />
        <Route path="/sede-lima" element={<Lima />} />
        <Route path="/sede-surco" element={<Surco />} />
        <Route path="/sede-san-isidro" element={<SanIsidro />} />
        <Route path="/sede-la-molina" element={<LaMolina />} />
        <Route path="/investigacion" element={<Investigacion />} />
        <Route path="/docencia" element={<Docencia />} />
        <Route path="/informacion-profesional" element={<InformacionProfesional />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/libro-reclamaciones" element={<LibroReclamaciones />} />

        {/* Rutas del sistema */}
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
        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
