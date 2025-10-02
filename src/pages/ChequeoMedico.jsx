import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import '../css/Servicio.css';

import chequeoImg from '../assets/chequeo-medico.png';
import serviciosImg from '../assets/servicios-chequeo.png';

const ChequeoMedico = () => {
  return (
    <>
      <Navbar />

      <div className="servicio-container">
        <section className="servicio-header">
          <div className="servicio-text">
            <h1>Cuida tu salud a tiempo con chequeos preventivos personalizados</h1>
            <p>Nuestros chequeos preventivos detectan de forma oportuna enfermedades frecuentes según tu edad, antecedentes y género.</p>
            
          </div>
          <div className="servicio-image">
            <img src={chequeoImg} alt="Chequeo Médico" />
          </div>
        </section>

        <section className="servicio-beneficios">
          <h2>Beneficios de atenderte con nosotros</h2>
          <div className="beneficios-grid">
            <div className="beneficio-item">
              <h3>🧬 Prevención personalizada para tu bienestar</h3>
              <p>Evaluamos tu salud según tu edad, género y antecedentes para detectar oportunamente enfermedades frecuentes y tomar decisiones a tiempo.</p>
            </div>
            <div className="beneficio-item">
              <h3>🩻 Tecnología de vanguardia en tus chequeos</h3>
              <p>Accede a diagnósticos confiables con equipos médicos de última generación, en ambientes modernos y seguros.</p>
            </div>
            <div className="beneficio-item">
              <h3>📍 Atención ágil en sedes estratégicas</h3>
              <p>Realiza tus chequeos en San Borja, Surco o Lima, eligiendo la sede que mejor se ajuste a tu ubicación y disponibilidad.</p>
            </div>
            <div className="beneficio-item">
              <h3>🩺 Evaluación integral para cuidar tu salud</h3>
              <p>Contamos con profesionales capacitados y un enfoque integral para ayudarte a mantenerte saludable y anticiparte a cualquier problema.</p>
            </div>
          </div>
        </section>

        <section className="servicio-proceso">
          <div className="proceso-text">
            <h2>Servicios disponibles</h2>
            <ul>
              <li><strong>Chequeo Médico General:</strong> Evaluación integral para adultos y niños mayores de 14 años.</li>
              <li><strong>Chequeo Pediátrico:</strong> Examen preventivo para menores de 14 años.</li>
              <li><strong>Laboratorio:</strong> Análisis clínicos para diagnóstico preciso.</li>
              <li><strong>Chequeo Oftalmológico:</strong> Evaluación visual por optómetra.</li>
              <li><strong>Chequeo Odontológico:</strong> Revisión bucal completa con odontograma.</li>
              <li><strong>Evaluación Ginecológica:</strong> Incluye Papanicolaou para detección precoz.</li>
              <li><strong>Mamografía Screening:</strong> Detección temprana de cáncer de mama.</li>
              <li><strong>Densitometría ósea:</strong> Para mujeres mayores de 60 años cada 2 años.</li>
            </ul>
          </div>
          <div className="proceso-image">
            <img src={serviciosImg} alt="Servicios Chequeo Médico" />
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default ChequeoMedico;