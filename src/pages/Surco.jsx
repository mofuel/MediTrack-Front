import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import '../css/sede.css';
import { Link } from 'react-router-dom';
import surcoImg from '../assets/surco.png'; // Guarda la imagen como surco.png en src/assets/

const especialidadesSurco = [
  'Cardiología',
  'Dermatología',
  'Pediatría',
  'Medicina Familiar',
  'Nutrición',
  'Geriatría',
  'Gastroenterología',
  'Odontología',
  'Ginecología',
  'Neurología',
  'Psiquiatría'
];

const Surco = () => {
  return (
    <>
      <Navbar />

      <div className="sede-container">
        <section className="sede-header">
          <div className="sede-header-text">
            <h1>Sede Surco</h1>
            <p>Av. El Polo 461</p>
            <p>Central telefónica: (01) 619 6161</p>
            <Link to="https://www.google.com/maps" target="_blank" className="sede-map-btn">¿Cómo llegar?</Link>
          </div>
          <img src={surcoImg} alt="Sede Surco" className="sede-image" />
        </section>

        <section className="sede-horarios">
          <h2>Conoce nuestros horarios de atención</h2>
          <div className="horario-cards">
            <div className="horario-card">
              <h3>Atención Ambulatoria</h3>
              <p>Lunes a Viernes: 8:00 a.m. - 8:00 p.m.</p>
              <p>Sábado: 8:00 a.m. - 5:00 p.m.</p>
              <p>Domingo: 8:00 a.m. - 1:00 p.m.</p>
            </div>
            <div className="horario-card">
              <h3>Laboratorio</h3>
              <p>Lunes a Viernes: 6:30 a.m. - 7:30 p.m.</p>
              <p>Sábado: 6:30 a.m. - 4:30 p.m.</p>
              <p>Domingo: 8:00 a.m. - 1:00 p.m.</p>
            </div>
          </div>
        </section>

        <section className="sede-especialidades">
          <h2>Especialidades disponibles en Surco</h2>
          <ul className="especialidades-list">
            {especialidadesSurco.map((esp, index) => (
              <li key={index}>{esp}</li>
            ))}
          </ul>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Surco;