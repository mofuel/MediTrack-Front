import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import '../css/especializacion.css';

const Pediatria = () => {
  return (
    <>

      <div className="especialidad-container pediatria">
        {/* Encabezado */}
        <section className="especialidad-header">
          <h1>Pediatría</h1>
          <p>
            Cuidamos la salud y el bienestar de los niños desde su nacimiento hasta la adolescencia con atención especializada y un enfoque integral.
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
            El departamento de Pediatría de la Clínica Internacional ofrece un servicio integral para el cuidado de la salud infantil. Contamos con un equipo de doctores en pediatría altamente capacitados, dedicados a la prevención, diagnóstico y tratamiento de enfermedades en bebés, niños y adolescentes. Nuestra infraestructura moderna y tecnología avanzada garantizan una atención segura y efectiva.
          </p>
        </section>

        {/* Beneficios */}
        <section className="especialidad-beneficios">
          <h2>Beneficios para el Paciente</h2>
          <div className="beneficios-grid">
            <div className="beneficio-card">
              <h3>Atención integral y certificación en lactancia materna exclusiva</h3>
              <p>
                Somos la única institución certificada en lactancia materna exclusiva, brindando asesoramiento especializado para garantizar una nutrición óptima y el bienestar de los recién nacidos.
              </p>
            </div>
            <div className="beneficio-card">
              <h3>Equipamiento y tecnología de punta para diagnóstico y tratamiento</h3>
              <p>
                Contamos con equipos avanzados que permiten realizar diagnósticos precisos y tratamientos efectivos en pediatría, asegurando una atención rápida y segura para cada niño.
              </p>
            </div>
            <div className="beneficio-card">
              <h3>Especialistas en cirugía neonatal laparoscópica</h3>
              <p>
                Realizamos procedimientos quirúrgicos mínimamente invasivos para recién nacidos, lo que reduce el tiempo de recuperación y minimiza los riesgos asociados a la cirugía neonatal.
              </p>
            </div>
            <div className="beneficio-card">
              <h3>Compromiso con el cuidado y desarrollo infantil</h3>
              <p>
                Acompañamos a los niños en cada etapa de su crecimiento con controles médicos, vacunación y orientación especializada, promoviendo su bienestar y desarrollo saludable.
              </p>
            </div>
          </div>
        </section>
      </div>

    </>
  );
};

export default Pediatria;