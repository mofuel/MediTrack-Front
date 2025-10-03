import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import '../css/Servicio.css';

import esteticoImg from '../assets/centro-estetico.png';
import equipoImg from '../assets/equipo-estetico.png';

const CentroEstetico = () => {
  return (
    <>
      <Navbar />

      <div className="servicio-container">
        <section className="servicio-header">
          <div className="servicio-text">
            <h1>¡Descubre el nuevo Centro Estético de Clínica Internacional!</h1>
            <p>Encuentra tratamientos personalizados y una amplia gama de procedimientos estéticos y corporales que se adaptan a tus necesidades.</p>
            
          </div>
          <div className="servicio-image">
            <img src={esteticoImg} alt="Centro Estético" />
          </div>
        </section>

        <section className="servicio-beneficios">
          <h2>Conoce nuestros servicios</h2>
          <div className="beneficios-grid">
            <div className="beneficio-item">
              <h3>✨ Tratamientos Estéticos</h3>
              <p>Especialistas en estética facial y corporal para lograr tu mejor versión.</p>
            </div>
            <div className="beneficio-item">
              <h3>🌸 Tratamientos Faciales</h3>
              <p>Soluciones para rejuvenecimiento, limpieza profunda y cuidado de la piel.</p>
            </div>
            <div className="beneficio-item">
              <h3>💆 Tratamientos Corporales</h3>
              <p>Procedimientos para moldear, tonificar y revitalizar tu cuerpo.</p>
            </div>
            <div className="beneficio-item">
              <h3>🕰️ Tratamientos Antienvejecimiento</h3>
              <p>Tecnología avanzada para prevenir y reducir signos de la edad.</p>
            </div>
          </div>
        </section>

        <section className="servicio-proceso">
          <div className="proceso-text">
            <h2>La experiencia de nuestro equipo</h2>
            <p>
              Nuestro staff médico, especializado en estética y antienvejecimiento, utiliza tecnología y productos de vanguardia para brindar tratamientos innovadores y personalizados. Su experiencia y formación garantizan la calidad en cada procedimiento.
            </p>
          </div>
          <div className="proceso-image">
            <img src={equipoImg} alt="Equipo Estético" />
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default CentroEstetico;
