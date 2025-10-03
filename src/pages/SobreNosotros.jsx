import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import '../css/SobreNosotros.css';
import portada from '../assets/sobre_nosotros_portada.png';
import misionImg from '../assets/mision.png';
import visionImg from '../assets/vision.png';
import { FaBullseye, FaEye, FaHandshake } from 'react-icons/fa';

const SobreNosotros = () => {
  return (
    <>

      <div className="sobre-container">
        {/* Portada */}
        <section className="portada">
          <img src={portada} alt="Sobre Nosotros" className="portada-img" />
          <div className="portada-text">
            <h1>Sobre Nosotros</h1>
            <p>
              Conoce quiénes somos, nuestra misión, visión y el compromiso que tenemos con la salud y el bienestar de nuestros pacientes.
            </p>
          </div>
        </section>

        {/* Nuestra Misión */}
        <section className="mision">
          <div className="mision-text">
            <FaBullseye className="icon" />
            <h2>Nuestra Misión</h2>
            <p>
              Brindar atención médica integral, segura y de calidad, con un equipo humano altamente calificado y tecnología de vanguardia, orientados al bienestar de nuestros pacientes.
            </p>
          </div>
          <img src={misionImg} alt="Nuestra misión" className="mision-img" />
        </section>

        {/* Nuestra Visión */}
        <section className="vision">
          <img src={visionImg} alt="Nuestra visión" className="vision-img" />
          <div className="vision-text">
            <FaEye className="icon" />
            <h2>Nuestra Visión</h2>
            <p>
              Ser reconocidos como la institución líder en salud en el país, destacando por la excelencia en la atención, innovación y compromiso con la comunidad.
            </p>
          </div>
        </section>

        {/* Valores */}
        <section className="valores">
          <h2>Nuestros Valores</h2>
          <div className="valores-grid">
            <div className="valor-item">
              <FaHandshake className="icon" />
              <h3>Compromiso</h3>
              <p>Trabajamos con responsabilidad y dedicación para garantizar la mejor atención.</p>
            </div>
            <div className="valor-item">
              <FaBullseye className="icon" />
              <h3>Excelencia</h3>
              <p>Buscamos la mejora continua en todos nuestros procesos y servicios.</p>
            </div>
            <div className="valor-item">
              <FaEye className="icon" />
              <h3>Transparencia</h3>
              <p>Actuamos con honestidad y ética en cada una de nuestras acciones.</p>
            </div>
          </div>
        </section>
      </div>

    </>
  );
};

export default SobreNosotros;