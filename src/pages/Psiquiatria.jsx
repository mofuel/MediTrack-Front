import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import '../css/especializacion.css';

const Psiquiatria = () => {
  return (
    <>

      <div className="especialidad-container psiquiatria">
        {/* Encabezado */}
        <section className="especialidad-header">
          <h1>Psiquiatría</h1>
          <p>
            Diagnóstico y tratamiento especializado para trastornos mentales y emocionales con un enfoque integral y personalizado.
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
            El departamento de Psiquiatría de la Clínica Internacional ofrece atención especializada en la prevención, diagnóstico y tratamiento de enfermedades mentales y trastornos emocionales. Nuestro equipo de psiquiatras altamente capacitados trabaja con un enfoque multidisciplinario para mejorar la calidad de vida de nuestros pacientes, combinando terapia farmacológica, psicoterapia y estrategias de rehabilitación.
          </p>
        </section>

        {/* Beneficios */}
        <section className="especialidad-beneficios">
          <h2>Beneficios para el Paciente</h2>
          <div className="beneficios-grid">
            <div className="beneficio-card">
              <h3>Evaluación psiquiátrica integral</h3>
              <p>
                Brindamos diagnósticos precisos con entrevistas clínicas especializadas y teleconsulta, ampliando el acceso a la atención sin importar la ubicación del paciente.
              </p>
            </div>
            <div className="beneficio-card">
              <h3>Tratamientos personalizados y basados en evidencia</h3>
              <p>
                Nuestros psiquiatras cuentan con certificaciones en Terapia Cognitivo-Conductual, Terapia Contextual de Tercera Generación, Terapia Familiar Sistémica y Análisis Transaccional, diseñando planes de tratamiento adaptados a cada paciente.
              </p>
            </div>
            <div className="beneficio-card">
              <h3>Enfoque multidisciplinario y actualizado</h3>
              <p>
                Un equipo altamente capacitado, en constante formación continua, trabaja en conjunto con psicólogos, neurólogos y terapeutas ocupacionales para garantizar un tratamiento integral basado en la última evidencia científica.
              </p>
            </div>
          </div>
        </section>
      </div>

    </>
  );
};

export default Psiquiatria;