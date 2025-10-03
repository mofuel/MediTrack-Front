import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import '../css/Servicio.css';

import medicoImg from '../assets/medico-virtual.png';
import reservaImg from '../assets/reserva-medico-virtual.png';

const MedicoVirtual = () => {
  return (
    <>

      <div className="servicio-container">
        <section className="servicio-header">
          <div className="servicio-text">
            <h1>Consulta con un médico virtual estés en donde estés</h1>
            <p>El servicio Médico Virtual ofrece atención médica a distancia por videollamada, con diagnóstico, recomendaciones y recetas sin ir a la clínica.</p>
            
          </div>
          <div className="servicio-image">
            <img src={medicoImg} alt="Médico Virtual" />
          </div>
        </section>

        <section className="servicio-beneficios">
          <h2>Beneficios de atenderte con nosotros</h2>
          <div className="beneficios-grid">
            <div className="beneficio-item">
              <h3>💻 Atención médica sin salir de casa</h3>
              <p>Consulta médica virtual, sin traslados ni esperas.</p>
            </div>
            <div className="beneficio-item">
              <h3>🩺 Diagnóstico y tratamiento online</h3>
              <p>Recibe evaluación médica y tratamiento desde donde estés, sin ir a la clínica.</p>
            </div>
            <div className="beneficio-item">
              <h3>📅 Accesibilidad y disponibilidad inmediata</h3>
              <p>Agenda tu cita rápidamente y en horarios flexibles.</p>
            </div>
            <div className="beneficio-item">
              <h3>🔒 Seguridad y confidencialidad garantizada</h3>
              <p>Tu información médica es segura y privada.</p>
            </div>
          </div>
        </section>

        <section className="servicio-proceso">
          <div className="proceso-text">
            <h2>Proceso de reserva o agendamiento del servicio</h2>
            <ol>
              <li>Ingresa a la plataforma de agendamiento de citas por la web o la app.</li>
              <li>Selecciona tu especialidad y horario según disponibilidad de los médicos.</li>
              <li>Confirma tu cita y recibe el enlace de acceso en tu correo electrónico.</li>
              <li>También puedes llamar a nuestro call center al (01) 619-6161 opción 1 para agendar tu cita.</li>
            </ol>
          </div>
          <div className="proceso-image">
            <img src={reservaImg} alt="Reserva Médico Virtual" />
          </div>
        </section>
      </div>

    </>
  );
};

export default MedicoVirtual;