import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Servicios from './pages/Servicios';
import Especialidades from './pages/Especialidades';
import Dermatologia from './pages/Dermatologia';
import Gastroenterologia from './pages/Gastroenterologia';
import Odontologia from './pages/Odontologia';
import Ginecologia from './pages/Ginecologia';
import Neurologia from './pages/Neurologia';
import Pediatria from './pages/Pediatria';
import Psiquiatria from './pages/Psiquiatria';
import Cardiologia from './pages/Cardiologia';
import AtencionADomicilio from './pages/AtencionADomicilio';
import MedicoVirtual from './pages/MedicoVirtual';
import CentroEstetico from './pages/CentroEstetico';
import ChequeoMedico from './pages/ChequeoMedico';
import SonrisaTotal from './pages/SonrisaTotal';
import ProgramaMaternidad from './pages/ProgramaMaternidad';
import CirugiaRobotica from './pages/CirugiaRobotica';
import Promociones from './pages/Promociones';
import Sedes from './pages/Sedes';
import SanBorja from './pages/SanBorja';
import Lima from './pages/Lima';
import Surco from './pages/Surco';
import SanIsidro from './pages/SanIsidro';
import LaMolina from './pages/LaMolina';
import Investigacion from './pages/Investigacion';
import Docencia from './pages/Docencia';
import InformacionProfesional from './pages/InformacionProfesional';
import SobreNosotros from './pages/SobreNosotros';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LibroReclamaciones from './pages/LibroReclamaciones';

function App() {
  return (
    <>
      <ScrollToTop />
      
      <Routes>
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
      </Routes>
      
    </>
  );
}

export default App;