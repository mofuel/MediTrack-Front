import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import '../css/Servicio.css';

import maternidadImg from '../assets/programa-maternidad.png';
import serviciosImg from '../assets/servicios-maternidad.png';

const ProgramaMaternidad = () => {
  return (
    <>
      <Navbar />

      <div className="servicio-container">
        <section className="servicio-header">
          <div className="servicio-text">
            <h1>Cuida tu embarazo con los mejores especialistas</h1>
            <p>Estamos contigo antes, durante y después del parto, asegurando una experiencia segura, saludable y llena de bienestar.</p>
            
          </div>
          <div className="servicio-image">
            <img src={maternidadImg} alt="Programa de Maternidad" />
          </div>
        </section>

        <section className="servicio-beneficios">
          <h2>Beneficios de atenderte con nosotros</h2>
          <div className="beneficios-grid">
            <div className="beneficio-item">
              <h3>🤰 Atención integral y especializada</h3>
              <p>Contamos con todos los recursos necesarios para asegurar un embarazo saludable y seguro, con la atención de especialistas en cada etapa de tu gestación.</p>
            </div>
            <div className="beneficio-item">
              <h3>🏥 Equipo obstétrico completamente equipado</h3>
              <p>Sala de dilatación, expulsivo y puerperio, garantizando un entorno seguro para el parto natural.</p>
            </div>
            <div className="beneficio-item">
              <h3>🚨 Atención de emergencias y cesáreas</h3>
              <p>Centro quirúrgico para cesáreas y UCI Materno-Neonatal para casos de alto riesgo.</p>
            </div>
            <div className="beneficio-item">
              <h3>👶 Atención neonatal especializada</h3>
              <p>Los recién nacidos reciben atención inmediata en nuestra sala de neonatología, con médicos neonatólogos disponibles las 24 horas.</p>
            </div>
          </div>
        </section>

        <section className="servicio-proceso">
          <div className="proceso-text">
            <h2>Servicios incluidos en el programa</h2>
            <ul>
              <li><strong>Control de embarazo:</strong> Bajo y alto riesgo.</li>
              <li><strong>Centro de asesoría de la gestación:</strong> Psicoprofilaxis desde semana 12 a 39.</li>
              <li><strong>Medicina Materno Fetal:</strong> Ecografías especializadas por ginecólogos subespecializados.</li>
              <li><strong>Psicoprofilaxis obstétrica:</strong> Técnicas de respiración, movimiento de pelvis y lactancia.</li>
              <li><strong>Talleres prenatales:</strong> Yoga, estimulación prenatal, meditación desde semana 12 a 38.</li>
              <li><strong>Talleres postnatales:</strong> Banco de leche, yoga postnatal, recuperación abdominal y piso pélvico.</li>
              <li><strong>Consulta de lactancia materna prenatal:</strong> Interconsulta con consultora certificada en el último trimestre.</li>
            </ul>
          </div>
          <div className="proceso-image">
            <img src={serviciosImg} alt="Servicios Programa Maternidad" />
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default ProgramaMaternidad;