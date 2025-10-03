import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import '../css/Sedes.css';
import { Link } from 'react-router-dom';

const sedes = [
  {
    nombre: 'San Borja',
    direcciones: [
      'Av. Guardia Civil 385 - 433, Lima',
      'Av. Inca Garcilaso de la Vega 1420'
    ],
    ruta: '/sede-san-borja'
  },
  {
    nombre: 'Lima',
    direcciones: ['Av. Inca Garcilaso de la Vega 1420'],
    ruta: '/sede-lima'
  },
  {
    nombre: 'Surco',
    direcciones: ['Av. El Polo 461'],
    ruta: '/sede-surco'
  },
  {
    nombre: 'San Isidro',
    direcciones: ['Av. Paseo de la República Nº 3058'],
    ruta: '/sede-san-isidro'
  },
  {
    nombre: 'La Molina',
    direcciones: ['Los Bambúes 250'],
    ruta: '/sede-la-molina'
  }
];

const Sedes = () => {
  return (
    <>

      <div className="sedes-container">
        <h1 className="sedes-title">Sedes</h1>

        <section className="sedes-list">
          {sedes.map((sede, index) => (
            <div key={index} className="sede-card">
              <div className="sede-bar"></div>
              <div className="sede-content">
                <h3 className="sede-nombre">{sede.nombre}</h3>
                <p className="sede-direcciones">
                  {sede.direcciones.join(' / ')}
                </p>
              </div>
              <Link to={sede.ruta} className="sede-boton">
                →
              </Link>
            </div>
          ))}
        </section>
      </div>

    </>
  );
};

export default Sedes;
