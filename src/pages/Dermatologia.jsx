import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import '../css/especializacion.css';

const Dermatologia = () => {
  return (
    <>
      <Navbar />

      <div className="especialidad-container dermatologia">
        {/* Encabezado */}
        <section className="especialidad-header">
          <h1>Dermatología</h1>
          <p>
            Cuidamos la salud de tu piel con tecnología avanzada y un equipo de dermatólogos altamente capacitados.
          </p>
          <div className="atencion-tipos">
            <span className="atencion presencial">Presencial</span>
            <span className="atencion virtual">Virtual</span>
          </div>
        </section>

        {/* Información general */}
        <section className="especialidad-info">
          <h2>Información General</h2>
          <p>
            Nuestro departamento de dermatología ofrece tratamientos personalizados para diversas afecciones de la piel,
            utilizando tecnología de punta y opciones de consulta online para tu comodidad.
          </p>
        </section>

        {/* Beneficios */}
        <section className="especialidad-beneficios">
          <h2>Beneficios para el Paciente</h2>
          <div className="beneficios-grid">
            <div className="beneficio-card">
              <h3>Diagnóstico avanzado con certificaciones de calidad</h3>
              <p>Garantizamos diagnósticos precisos y confiables gracias a nuestras certificaciones en dermatología.</p>
            </div>
            <div className="beneficio-card">
              <h3>Atención con especialistas altamente capacitados</h3>
              <p>Contamos con profesionales con amplia experiencia en el tratamiento de enfermedades dermatológicas.</p>
            </div>
            <div className="beneficio-card">
              <h3>Consulta dermatológica con profesionales certificados</h3>
              <p>Recibe atención de calidad con médicos certificados en dermatología.</p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Dermatologia;