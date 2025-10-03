import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import '../css/especializacion.css';

const Odontologia = () => {
  return (
    <>

      <div className="especialidad-container odontologia">
        {/* Encabezado */}
        <section className="especialidad-header">
          <h1>Odontología</h1>
          <p>
            Sonríe con confianza con nuestros tratamientos de odontología general y especializada, adaptados a cada paciente.
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
            El departamento de Odontología de la Clínica Internacional ofrece un enfoque integral para el cuidado de la salud bucal, abarcando desde prevención hasta tratamientos especializados. Nuestro equipo de dentistas generales y especialistas utiliza tecnología avanzada para garantizar diagnósticos precisos y soluciones efectivas, mejorando la estética y funcionalidad dental de nuestros pacientes.
          </p>
        </section>

        {/* Beneficios */}
        <section className="especialidad-beneficios">
          <h2>Beneficios para el Paciente</h2>
          <div className="beneficios-grid">
            <div className="beneficio-card">
              <h3>Atención integral en odontología general</h3>
              <p>
                Desde limpiezas y chequeos hasta tratamientos restaurativos, brindamos un cuidado dental completo.
              </p>
            </div>
            <div className="beneficio-card">
              <h3>Diagnóstico avanzado con exámenes auxiliares de precisión</h3>
              <p>
                Contamos con tecnología de última generación para la evaluación de la salud bucal, incluyendo radiografía periapical, panorámica y cefalométrica, garantizando diagnósticos precisos y tratamientos efectivos.
              </p>
            </div>
            <div className="beneficio-card">
              <h3>Personal altamente capacitado e interconectado con otras especialidades médicas</h3>
              <p>
                Nuestro equipo de odontólogos trabaja de manera conjunta con otras especialidades médicas, asegurando una atención integral y multidisciplinaria para el bienestar del paciente.
              </p>
            </div>
            <div className="beneficio-card">
              <h3>Historia clínica digital e interconectada</h3>
              <p>
                Facilitamos la continuidad del tratamiento mediante la interconexión de la historia clínica digital, lo que permite un seguimiento eficiente y acceso rápido a la información del paciente en cualquiera de nuestras sedes.
              </p>
            </div>
            <div className="beneficio-card">
              <h3>Ubicación estratégica para mayor accesibilidad</h3>
              <p>
                Nuestras sedes están ubicadas en puntos clave para facilitar el acceso a la atención odontológica, ofreciendo comodidad y cercanía a nuestros pacientes.
              </p>
            </div>
          </div>
        </section>
      </div>

    </>
  );
};

export default Odontologia;