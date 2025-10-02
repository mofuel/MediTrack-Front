import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import '../css/Servicios.css';
import { Link } from 'react-router-dom';

import medicoVirtual from '../assets/medico-virtual.png';
import atencionDomicilio from '../assets/atencion-domicilio.png';
import chequeoMedico from '../assets/chequeo-medico.png';
import programaMaternidad from '../assets/programa-maternidad.png';
import sonrisaTotal from '../assets/sonrisa-total.png';
import centroEstetico from '../assets/centro-estetico.png';
import cirugiaRobotica from '../assets/cirugia-robotica.png';

const categorias = [
  { id: 'atencion-medica', nombre: 'Atención médica' },
  { id: 'prevencion', nombre: 'Prevención y bienestar' },
  { id: 'maternidad', nombre: 'Programa de maternidad' },
  { id: 'sonrisa', nombre: 'Sonrisa Total' },
  { id: 'estetico', nombre: 'Centro Estético' },
  { id: 'robotica', nombre: 'Cirugía Robótica' },
];

const servicios = [
  {
    id: 'medico-virtual',
    titulo: 'Médico Virtual',
    descripcion: 'Consulta médica desde casa con nuestros especialistas.',
    imagen: medicoVirtual,
    link: '/medico-virtual', // ✅ Ruta directa
    categoria: 'atencion-medica',
  },
  {
    id: 'atencion-domicilio',
    titulo: 'Atención a Domicilio',
    descripcion: 'Recibe atención médica en la comodidad de tu hogar.',
    imagen: atencionDomicilio,
    link: '/atencion-domicilio',
    categoria: 'atencion-medica',
  },
  {
    id: 'chequeo-medico',
    titulo: 'Chequeo Médico',
    descripcion: 'Evaluación integral para tu bienestar.',
    imagen: chequeoMedico,
    link: '/chequeos-medicos',
    categoria: 'prevencion',
  },
  {
    id: 'programa-maternidad',
    titulo: 'Programa de Maternidad',
    descripcion: 'Acompañamiento completo durante tu embarazo.',
    imagen: programaMaternidad,
    link: '/programa-maternidad',
    categoria: 'maternidad',
  },
  {
    id: 'sonrisa-total',
    titulo: 'Sonrisa Total',
    descripcion: 'Tratamientos dentales para una sonrisa saludable.',
    imagen: sonrisaTotal,
    link: '/sonrisa-total',
    categoria: 'sonrisa',
  },
  {
    id: 'centro-estetico',
    titulo: 'Centro Estético',
    descripcion: 'Servicios estéticos para tu bienestar y belleza.',
    imagen: centroEstetico,
    link: '/centro-estetico',
    categoria: 'estetico',
  },
  {
    id: 'cirugia-robotica',
    titulo: 'Cirugía Robótica',
    descripcion: 'Tecnología avanzada para procedimientos precisos.',
    imagen: cirugiaRobotica,
    link: '/cirugia-robotica',
    categoria: 'robotica',
  },
];

const Servicios = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('atencion-medica');

  const serviciosFiltrados = servicios.filter(s => s.categoria === categoriaSeleccionada);

  return (
    <>
      <Navbar />
      <div className="servicios-container">
        <h2 className="servicios-title">Nuestros servicios clínicos</h2>

        <div className="categorias-barra">
          {categorias.map(cat => (
            <button
              key={cat.id}
              className={`categoria-boton ${categoriaSeleccionada === cat.id ? 'activa' : ''}`}
              onClick={() => setCategoriaSeleccionada(cat.id)}
            >
              {cat.nombre}
            </button>
          ))}
        </div>

        <div className="servicios-grid">
          {serviciosFiltrados.map(s => (
            <div key={s.id} className="servicio-card">
              <img src={s.imagen} alt={s.titulo} className="servicio-imagen" />
              <h3 className="servicio-titulo">{s.titulo}</h3>
              <p className="servicio-descripcion">{s.descripcion}</p>
              <Link to={s.link} className="btn-conoce-mas">Conoce más</Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Servicios;
