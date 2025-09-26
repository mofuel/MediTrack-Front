import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import '../css/Home.css';
import { Link } from 'react-router-dom';
import {
  FaCalendarCheck,
  FaStethoscope,
  FaGift,
  FaClipboardList
} from 'react-icons/fa';

// Importar imágenes
import roboticaImg from '../assets/robotica.png';
import pediatriaImg from '../assets/pediatria.png';
import cardiologiaImg from '../assets/cardiologia.png';
import odontologiaImg from '../assets/odontologia.png';
import masImg from '../assets/mas.png';
import jointCommissionLogo from '../assets/joint-commission.png';
import sedeClinicaImg from '../assets/sede-clinica.png';
import { useState } from 'react';





const Home = () => {
     const [activeSede, setActiveSede] = useState(null);
  return (
    <>
      <Navbar />

      <main className="home-container">
        {/* Encabezado */}
        <section className="welcome-section">
          <h1 className="welcome-title">Te cuidamos, te curamos.</h1>
          <p className="welcome-subtext">Hola, ¿qué necesitas hacer hoy?</p>
        </section>

        
      {/* Menú de acciones rápidas */}
      <section className="quick-actions">
        <Link to="/cita" className="action-button">
          <div className="action-icon"><FaCalendarCheck /></div>
          <div className="action-text">Agendar una cita</div>
        </Link>
        <Link to="/servicios" className="action-button"> {/* ← corregido */}
          <div className="action-icon"><FaStethoscope /></div>
          <div className="action-text">Solicitar un servicio</div>
        </Link>
        <Link to="/promociones" className="action-button">
          <div className="action-icon"><FaGift /></div>
          <div className="action-text">Conocer las promociones</div>
        </Link>
        <Link to="/especialidades" className="action-button">
          <div className="action-icon"><FaClipboardList /></div>
          <div className="action-text">Conocer las especialidades</div>
        </Link>
      </section>


        {/* Sección Cirugía Robótica */}
        <section className="robotic-surgery-section">
          <div className="robotic-surgery-content">
            <div className="robotic-text">
              <h2 className="robotic-title">Cirugía Robótica: innovación al servicio de tu salud</h2>
              <p className="robotic-description">
                Menos invasiva, mayor exactitud y una recuperación más ágil gracias a la tecnología robótica Da Vinci Xi.
              </p>
              <p className="robotic-highlight">¡Más de 200 cirugías robóticas realizadas con éxito!</p>
              <Link to="/cirugia-robotica" className="robotic-button">Conoce más</Link>
            </div>
            <div className="robotic-image">
              <img src={roboticaImg} alt="Cirugía Robótica" />
            </div>
          </div>
        </section>

        {/* Sección Nuestras Especialidades */}
        <section className="specialties-section">
          <h2 className="specialties-title">
            Nuestras<br />Especialidades
            </h2>

          <div className="specialties-grid">
            <div className="specialty-card">
              <img src={pediatriaImg} alt="Pediatría" />
              <h3>Pediatría</h3>
              <p>Atención integral para niños y adolescentes, enfocada en su desarrollo y bienestar.</p>
              <Link to="/especialidades/pediatria" className="specialty-button">Conoce más</Link>
            </div>
            <div className="specialty-card">
              <img src={cardiologiaImg} alt="Cardiología" />
              <h3>Cardiología</h3>
              <p>Prevención, diagnóstico y tratamiento de enfermedades del corazón y sistema cardiovascular.</p>
              <Link to="/especialidades/cardiologia" className="specialty-button">Conoce más</Link>
            </div>
            <div className="specialty-card">
              <img src={odontologiaImg} alt="Odontología" />
              <h3>Odontología</h3>
              <p>Servicios dentales especializados para mantener tu salud bucal en óptimas condiciones.</p>
              <Link to="/especialidades/odontologia" className="specialty-button">Conoce más</Link>
            </div>
            <div className="specialty-card">
              <img src={masImg} alt="Más especialidades" />
              <h3>Más especialidades</h3>
              <p>Explora todas las especialidades médicas que ofrecemos para tu bienestar integral.</p>
              <Link to="/especialidades" className="specialty-button">Conoce más</Link> {/* ← ya está correcto */}
            </div>

          </div>
        </section>
        {/* Sección ¿Por qué elegirnos? */}
        <section className="why-choose-us-section">
        <h2 className="why-title">¿Por qué elegirnos?</h2>
        <p className="why-description">
            Nuestras sedes de <strong>Lima</strong> y <strong>San Borja</strong> están acreditadas con la máxima distinción internacional otorgada a una entidad de salud.
        </p>
        <div className="why-logo">
            <img src={jointCommissionLogo} alt="Joint Commission International" />
            {/*<p className="why-accreditation">Joint Commission International</p>*/}
        </div>
        <div className="testimonial-box">
            <p className="testimonial-text">
            “Gracias a todo el personal de la Clínica Internacional por apoyarme y acompañarme en todo momento. Sin este diagnóstico temprano y a tiempo, yo no estaría aquí seguramente.”
            </p>
            <p className="testimonial-author">— Roxana Valdivieso<br />DNI: 08257065</p>
        </div>
        </section>

        {/* Sección Ubicación de Sedes */}
        <section className="location-section">
        <div className="location-content">
            <div className="location-text">
            <h2 className="location-title">Encuentra una sede <br />cerca de ti.</h2>
            <ul className="location-list">
                {[
                {
                    nombre: 'San Borja',
                    direccion: 'Av. Guardia Civil 385 - 433',
                    enlace: '/sedes/san-borja'
                },
                {
                    nombre: 'Lima',
                    direccion: 'Av. Inca Garcilaso de la Vega 1420',
                    enlace: '/sedes/lima'
                },
                {
                    nombre: 'Surco',
                    direccion: 'Av. Caminos del Inca 1234',
                    enlace: '/sedes/surco'
                },
                {
                    nombre: 'San Isidro',
                    direccion: 'Av. Javier Prado Este 567',
                    enlace: '/sedes/san-isidro'
                },
                {
                    nombre: 'La Molina',
                    direccion: 'Av. La Molina 789',
                    enlace: '/sedes/la-molina'
                }
                ].map((sede, index) => (
                <li key={index} className="location-item">
                    <div
                    className="location-header"
                    onClick={() =>
                        setActiveSede(activeSede === sede.nombre ? null : sede.nombre)
                    }
                    >
                    {sede.nombre}{' '}
                    <span className="arrow">
                        {activeSede === sede.nombre ? '▲' : '▼'}
                    </span>
                    </div>
                    {activeSede === sede.nombre && (
                    <div className="location-details">
                        <p>{sede.direccion}</p>
                        <a href={sede.enlace} className="location-button">
                        Conoce más
                        </a>
                    </div>
                    )}
                </li>
                ))}
            </ul>
            </div>
            <div className="location-image">
            <img
                src={sedeClinicaImg}
                alt="Sede Clínica Internacional"
            />
            </div>
        </div>
        </section>
                
      </main>
      <Footer />
    </>
  );
};

export default Home;
