import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import '../css/especializacion.css';

const Gastroenterologia = () => {
  return (
    <>
      <Navbar />

      <div className="especialidad-container gastroenterologia">
        {/* Encabezado */}
        <section className="especialidad-header">
          <h1>Gastroenterología</h1>
          <p>
            Cuidamos tu salud digestiva con diagnóstico preciso y tratamientos especializados.
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
            La especialidad de Gastroenterología se encarga del estudio, diagnóstico y tratamiento de enfermedades que afectan el aparato digestivo, incluyendo el estómago, intestinos, hígado, páncreas y vesícula biliar. En Clínica Internacional, contamos con un equipo altamente especializado y equipos modernos para ofrecer un cuidado integral, desde la prevención hasta el tratamiento avanzado.
          </p>
        </section>

        {/* Beneficios */}
        <section className="especialidad-beneficios">
          <h2>Beneficios para el Paciente</h2>
          <div className="beneficios-grid">
            <div className="beneficio-card">
              <h3>Centro endoscópico especializado</h3>
              <p>
                Contamos con un centro endoscópico de última generación, lo que nos permite realizar procedimientos diagnósticos y terapéuticos con mayor precisión y comodidad para el paciente, reduciendo tiempos de espera y mejorando la calidad de la atención.
              </p>
            </div>
            <div className="beneficio-card">
              <h3>Diagnóstico preciso con tecnología avanzada</h3>
              <p>
                Realizamos estudios de alta precisión como endoscopia, colonoscopia y manometría, lo que nos permite identificar problemas digestivos en etapas tempranas.
              </p>
            </div>
            <div className="beneficio-card">
              <h3>Especialización en enfermedades digestivas complejas</h3>
              <p>
                Nuestros especialistas en hepatología, enfermedades inflamatorias y motilidad gastrointestinal están capacitados para tratar las afecciones digestivas más complejas y brindar un seguimiento integral.
              </p>
            </div>
            <div className="beneficio-card">
              <h3>Gastroenterología pediátrica especializada</h3>
              <p>
                Atención especializada para niños con trastornos digestivos, garantizando el diagnóstico y tratamiento más adecuado para su edad y necesidades.
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Gastroenterologia;