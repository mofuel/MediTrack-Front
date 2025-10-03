import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import '../css/Investigacion.css';
import grupoMedico from '../assets/grupo_medico.png';
import procedimientoMedico from '../assets/procedimiento_medico.png';
import investigacionLaboratorio from '../assets/investigacion_laboratorio.png';

const Investigacion = () => {
  return (
    <>

      <div className="investigacion-container">
        <section className="intro">
          <div className="intro-text">
            <h1>Estamos en proceso de descubrimiento e innovación constante</h1>
            <p>
              Valoramos la investigación médica y su impacto, alentando el desarrollo de nuevas soluciones para mejorar la salud global.
            </p>
            <div className="intro-links">
              <a>#Deseas obtener más información o visita nuestras instalaciones</a><br />
              <a>#Contacto</a><br />
              <a>#Email</a>
            </div>
          </div>
          <img src={grupoMedico} alt="Grupo médico" className="intro-image" />
        </section>

        <section className="filosofia">
          <img src={procedimientoMedico} alt="Procedimiento médico" className="filosofia-image" />
          <div className="filosofia-text">
            <h2>Nuestra filosofía en investigación</h2>
            <p>Nos dedicamos a realizar investigaciones médicas rigurosas y éticas para avanzar en el conocimiento científico.</p>
            <ul>
              <li>Probar nuevos tratamientos.</li>
              <li>Mejorar los tratamientos existentes.</li>
              <li>Comprender mejor las enfermedades.</li>
            </ul>
          </div>
        </section>

        <section className="iconos">
          <div className="icono-item">🔬 La fiabilidad del método</div>
          <div className="icono-item">📋 Tus responsabilidades</div>
          <div className="icono-item">⚖️ Importancia ética</div>
        </section>

        <section className="consideraciones">
          <div className="texto">
            <h3>Consideraciones importantes</h3>
            <p>
              La investigación médica requiere responsabilidad, ética y compromiso con el bienestar de los pacientes y la comunidad.
            </p>
          </div>
          <img src={investigacionLaboratorio} alt="Investigación en laboratorio" className="consideraciones-image" />
        </section>
      </div>

    </>
  );
};

export default Investigacion;