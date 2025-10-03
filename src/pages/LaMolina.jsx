import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import '../css/sede.css';
import { Link } from 'react-router-dom';
import laMolinaImg from '../assets/lamolina.png'; // Guarda la imagen como lamolina.png en src/assets/

const especialidadesLaMolina = [
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

const LaMolina = () => {
  return (
    <>

      <div className="sede-container">
        <section className="sede-header">
          <div className="sede-header-text">
            <h1>Sede La Molina</h1>
            <p>Los Bambúes 250</p>
            <p>Central telefónica: (01) 619 6161</p>
            <Link to="https://www.google.com/maps" target="_blank" className="sede-map-btn">¿Cómo llegar?</Link>
          </div>
          <img src={laMolinaImg} alt="Sede La Molina" className="sede-image" />
        </section>

        <section className="sede-horarios">
          <h2>Conoce nuestros horarios de atención</h2>
          <div className="horario-cards">
            <div className="horario-card">
              <h3>Atención Ambulatoria</h3>
              <p>Lunes a Viernes: 7:00 a.m. - 8:00 p.m.</p>
              <p>Sábado: 7:00 a.m. - 5:00 p.m.</p>
            </div>
            <div className="horario-card">
              <h3>Laboratorio</h3>
              <p>Lunes a Viernes: 7:00 a.m. - 7:00 p.m.</p>
              <p>Sábado: 7:00 a.m. - 5:00 p.m.</p>
            </div>
          </div>
        </section>

        <section className="sede-especialidades">
          <h2>Especialidades disponibles en La Molina</h2>
          <ul className="especialidades-list">
            {especialidadesLaMolina.map((esp, index) => (
              <li key={index}>{esp}</li>
            ))}
          </ul>
        </section>
      </div>

    </>
  );
};

export default LaMolina;