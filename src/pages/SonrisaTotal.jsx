import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import '../css/Servicio.css';

import sonrisaImg from '../assets/sonrisa-total.png';
import agendamientoImg from '../assets/agendamiento-sonrisa.png';

const SonrisaTotal = () => {
  return (
    <>

      <div className="servicio-container">
        <section className="servicio-header">
          <div className="servicio-text">
            <h1>Cuida tu salud bucal con los mejores especialistas</h1>
            <p>El servicio de Sonrisa Total está diseñado para ofrecer atención integral y especializada en salud bucal. Desde diagnóstico y tratamientos hasta la prevención y recuperación, brindamos un servicio completo para que disfrutes de una sonrisa saludable.</p>

          </div>
          <div className="servicio-image">
            <img src={sonrisaImg} alt="Sonrisa Total" />
          </div>
        </section>

        <section className="servicio-beneficios">
          <h2>Beneficios de atenderte con nosotros</h2>
          <div className="beneficios-grid">
            <div className="beneficio-item">
              <h3>🦷 Atención especializada y personalizada</h3>
              <p>Contamos con odontólogos expertos en cada área, brindando tratamientos adaptados a tus necesidades.</p>
            </div>
            <div className="beneficio-item">
              <h3>🧪 Tecnología moderna</h3>
              <p>Disponemos de la última tecnología en diagnóstico y tratamiento, como equipos auxiliares de diagnóstico y procesos basados en evidencia científica.</p>
            </div>
            <div className="beneficio-item">
              <h3>🪥 Enfoque preventivo</h3>
              <p>Te guiamos en el cuidado diario de tu salud bucal para prevenir enfermedades y mantener resultados a largo plazo.</p>
            </div>
            <div className="beneficio-item">
              <h3>📁 Historia clínica digital</h3>
              <p>Nuestro sistema digital permite un seguimiento eficiente y continuo de tu tratamiento dental.</p>
            </div>
          </div>
        </section>

        <section className="servicio-proceso">
          <div className="proceso-text">
            <h2>Agendamiento del servicio</h2>
            <ol>
              <li>Reserva tu cita llamando al (01) 619-6161, opción 3.</li>
              <li>Indica que deseas el servicio de Sonrisa Total y elige el horario que más te convenga.</li>
              <li>Confirma tu cita y comienza tu seguimiento con nuestros especialistas en salud bucal.</li>
              <li>También puedes agendar tu atención de manera presencial a través del counter de Sonrisa Total en cualquiera de nuestras sedes.</li>
            </ol>
          </div>
          <div className="proceso-image">
            <img src={agendamientoImg} alt="Agendamiento Sonrisa Total" />
          </div>
        </section>
      </div>

    </>
  );
};

export default SonrisaTotal;