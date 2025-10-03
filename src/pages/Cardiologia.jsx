import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import '../css/especializacion.css';

const Cardiologia = () => {
  return (
    <>
      <Navbar />

      <div className="especialidad-container cardiologia">
        {/* Encabezado */}
        <section className="especialidad-header">
          <h1>Cardiología</h1>
          <p>
            Cuidamos de tu corazón con tecnología de vanguardia y un equipo experto en enfermedades cardiovasculares.
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
            El departamento de Cardiología de la Clínica Internacional está especializado en la prevención, diagnóstico y tratamiento de enfermedades del corazón y del sistema cardiovascular. Nuestro equipo de médicos cardiólogos altamente capacitados brinda una atención integral con tecnología de vanguardia, asegurando un cuidado de calidad para nuestros pacientes.
          </p>
        </section>

        {/* Beneficios */}
        <section className="especialidad-beneficios">
          <h2>Beneficios para el Paciente</h2>
          <div className="beneficios-grid">
            <div className="beneficio-card">
              <h3>Cardiología de alta complejidad en todas las subespecialidades</h3>
              <p>
                Ofrecemos un servicio especializado con todas las subespecialidades cardiológicas, asegurando un enfoque integral y personalizado para cada paciente.
              </p>
            </div>
            <div className="beneficio-card">
              <h3>Equipos de última generación para diagnóstico y tratamiento</h3>
              <p>
                Contamos con tecnología de vanguardia, incluyendo angiógrafos de última generación, ecógrafos avanzados y equipamiento no invasivo, para el diagnóstico preciso y tratamiento oportuno de enfermedades cardiovasculares.
              </p>
            </div>
            <div className="beneficio-card">
              <h3>Unidad de dolor torácico para atención inmediata</h3>
              <p>
                Disponemos de una unidad especializada en la evaluación rápida y precisa del dolor torácico, garantizando un diagnóstico inmediato y la intervención necesaria para prevenir complicaciones mayores.
              </p>
            </div>
            <div className="beneficio-card">
              <h3>Atención integral con acreditación JCI</h3>
              <p>
                Nuestra atención está respaldada por la acreditación de la Joint Commission International (JCI), asegurando altos estándares de calidad en diagnóstico, tratamiento y rehabilitación cardiológica.
              </p>
            </div>
            <div className="beneficio-card">
              <h3>Personal altamente especializado</h3>
              <p>
                Nuestro equipo de especialistas en cardiología está altamente capacitado y en constante actualización, brindando un tratamiento de vanguardia con un enfoque multidisciplinario para la recuperación total del paciente.
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Cardiologia;