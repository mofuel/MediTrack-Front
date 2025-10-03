import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import '../css/InformacionProfesional.css';
import infoProfesionalHeader from '../assets/info_profesional_header.png';

const InformacionProfesional = () => {
  return (
    <>

      <div className="info-profesional-container">
        {/* Sección introductoria */}
        <section className="intro-info">
          <div className="intro-text">
            <h1>Herramientas digitales para la excelencia clínica</h1>
            <p>
              Nos dedicamos a apoyar tu conocimiento profesional y la mejora en la atención, a través de tecnología innovadora y capacitación constante.
            </p>
          </div>
          <img src={infoProfesionalHeader} alt="Información para Profesional" className="intro-image" />
        </section>

        {/* Tabs simulados */}
        <div className="tabs">
          <span className="tab active">ClinicalKey</span>
          
        </div>

        {/* Contenido principal */}
        <section className="contenido">
          <h2>ClinicalKey</h2>
          <p>
            Plataforma integral de referencia clínica que ofrece acceso a contenido médico basado en evidencia, incluyendo libros, revistas, guías clínicas y herramientas interactivas.
          </p>

          <h3>Beneficios para la práctica médica:</h3>
          <ul>
            <li>Acceso rápido a información actualizada en más de 30 especialidades médicas.</li>
            <li>Soporte en la toma de decisiones clínicas mediante fuentes confiables y actualizadas.</li>
            <li>Integración con flujos de trabajo clínicos y sistemas de historia clínica electrónica.</li>
          </ul>

          <h3>Impacto en la atención del paciente:</h3>
          <ul>
            <li>Mejora en la precisión diagnóstica y terapéutica.</li>
            <li>Reducción de errores médicos mediante guías basadas en evidencia.</li>
            <li>Optimización del tiempo de atención, centrando el servicio en el paciente.</li>
          </ul>
        </section>
      </div>

    </>
  );
};

export default InformacionProfesional;