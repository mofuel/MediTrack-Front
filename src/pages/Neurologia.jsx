import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import '../css/especializacion.css';

const Neurologia = () => {
  return (
    <>
      <Navbar />

      <div className="especialidad-container neurologia">
        {/* Encabezado */}
        <section className="especialidad-header">
          <h1>Neurología</h1>
          <p>
            Diagnóstico y tratamiento especializado para enfermedades del sistema nervioso central y periférico.
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
            El departamento de Neurología de la Clínica Internacional se especializa en la evaluación, diagnóstico y tratamiento de trastornos neurológicos que afectan el cerebro, la médula espinal y los nervios periféricos. Nuestro equipo de neurólogos altamente capacitados emplea tecnología avanzada y un enfoque multidisciplinario para ofrecer la mejor atención a nuestros pacientes.
          </p>
        </section>

        {/* Beneficios */}
        <section className="especialidad-beneficios">
          <h2>Beneficios para el Paciente</h2>
          <div className="beneficios-grid">
            <div className="beneficio-card">
              <h3>Diagnóstico de precisión con tecnología avanzada</h3>
              <p>
                Contamos con equipos de última generación para el estudio de enfermedades neurológicas. Disponemos de resonancia magnética, electroencefalografía y tomografía para una evaluación detallada y precisa de cada paciente.
              </p>
            </div>
            <div className="beneficio-card">
              <h3>Tratamientos innovadores para enfermedades neurológicas</h3>
              <p>
                Ofrecemos terapias personalizadas con medicamentos avanzados, rehabilitación especializada y técnicas de estimulación cerebral no invasiva. Contamos con un staff clínico-quirúrgico altamente capacitado para la cirugía de Parkinson.
              </p>
            </div>
            <div className="beneficio-card">
              <h3>Unidad certificada para el tratamiento de Stroke</h3>
              <p>
                Somos una clínica certificada en el manejo integral del accidente cerebrovascular (Stroke). Nuestro equipo especializado brinda atención rápida y eficaz para reducir secuelas y mejorar la recuperación del paciente.
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Neurologia;