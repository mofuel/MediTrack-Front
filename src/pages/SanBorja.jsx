import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import '../css/sede.css';
import { Link } from 'react-router-dom';
import sanborjaImg from '../assets/sanborja.png';

const especialidadesSanBorja = [
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

const SanBorja = () => {
  return (
    <>

      <div className="sede-container">
        <section className="sede-header">
          <div className="sede-header-text">
            <h1>Sede San Borja</h1>
            <p>Av. Guardia Civil 385 - 433</p>
            <p>Central telefónica: (01) 610-3333</p>
            <Link to="https://www.google.com/maps" target="_blank" className="sede-map-btn">¿Cómo llegar?</Link>
          </div>
          <img src={sanborjaImg} alt="Sede San Borja" className="sede-image" />
        </section>

        <section className="sede-horarios">
          <h2>Conoce nuestros horarios de atención</h2>
          <div className="horario-cards">
            <div className="horario-card">
              <h3>Emergencia</h3>
              <p>Disponible 24 horas / 365 días</p>
            </div>
            <div className="horario-card">
              <h3>Atención Ambulatoria</h3>
              <p>Lunes a Viernes: 8:00 a.m. - 8:00 p.m.</p>
              <p>Sábado: 8:00 a.m. - 5:00 p.m.</p>
              <p>Domingo y feriados: Cerrado</p>
            </div>
            <div className="horario-card">
              <h3>Laboratorio</h3>
              <p>Lunes a Viernes: 6:30 a.m. - 6:30 p.m.</p>
              <p>Sábado y feriados: 6:30 a.m. - 1:00 p.m.</p>
              <p>Domingo: Cerrado</p>
            </div>
          </div>
        </section>

        <section className="sede-especialidades">
          <h2>Especialidades disponibles en San Borja</h2>
          <ul className="especialidades-list">
            {especialidadesSanBorja.map((esp, index) => (
              <li key={index}>{esp}</li>
            ))}
          </ul>
        </section>
      </div>

    </>
  );
};

export default SanBorja;