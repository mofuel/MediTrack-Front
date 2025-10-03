import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import '../css/Servicio.css';

// Importar imágenes desde src/assets
import atencionImg from '../assets/atencion-domicilio.png';
import reservaImg from '../assets/reserva-cita.png';

const AtencionADomicilio = () => {
  return (
    <>
      

      <div className="servicio-container">
        <section className="servicio-header">
          <div className="servicio-text">
            <h1>Nosotros vamos a ti: Atención médica en la comodidad de tu hogar.</h1>
            <p>Recibe atención médica especializada sin salir de tu hogar. Nuestro equipo está disponible todos los días para atenderte con calidad y seguridad.</p>
          
          </div>
          <div className="servicio-image">
            <img src={atencionImg} alt="Atención médica a domicilio" />
          </div>
        </section>

        <section className="servicio-beneficios">
          <h2>Beneficios de atenderte con nosotros</h2>
          <div className="beneficios-grid">
            <div className="beneficio-item">
              <h3>🏠 Atención médica en casa</h3>
              <p>Recibe atención médica especializada sin salir de tu hogar.</p>
            </div>
            <div className="beneficio-item">
              <h3>🛡️ Calidad y seguridad</h3>
              <p>Profesionales altamente capacitados garantizan un servicio seguro.</p>
            </div>
            <div className="beneficio-item">
              <h3>📅 Disponibilidad todos los días</h3>
              <p>Atención 24/7 para cualquier emergencia o consulta.</p>
            </div>
            <div className="beneficio-item">
              <h3>🧪 Laboratorio a domicilio</h3>
              <p>Servicios de laboratorio directamente en tu hogar.</p>
            </div>
          </div>
        </section>

        <section className="servicio-proceso">
          <div className="proceso-text">
            <h2>Proceso de reserva o agendamiento del servicio</h2>
            <ol>
              <li>Selecciona el tipo de agendamiento que deseas realizar (cita presencial o virtual).</li>
              <li>Ingresa tus datos personales y selecciona el profesional médico disponible.</li>
              <li>Confirma tu cita y recibe las instrucciones para el día del servicio.</li>
              <li>Realiza el pago correspondiente según las indicaciones recibidas.</li>
            </ol>
          </div>
          <div className="proceso-image">
            <img src={reservaImg} alt="Reserva de cita médica" />
          </div>
        </section>
      </div>

      
    </>
  );
};

export default AtencionADomicilio;