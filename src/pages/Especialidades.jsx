import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import '../css/Especialidades.css';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaTooth, FaBrain, FaBaby, FaUserMd, FaStethoscope, FaSmile, FaNotesMedical } from 'react-icons/fa';

const categorias = [
  { id: 'todas', nombre: 'Todas' },
  { id: 'diagnostico', nombre: 'Diagnóstico' },
  { id: 'especializada', nombre: 'Especializada' },
  { id: 'infantil', nombre: 'Infantil' },
  { id: 'mental', nombre: 'Salud mental' },
];

const especialidadesData = [
  {
    nombre: 'Dermatología',
    descripcion: 'Diagnóstico y tratamiento de enfermedades de la piel.',
    icono: <FaSmile />,
    ruta: '/dermatologia',
    categoria: 'diagnostico'
  },
  {
    nombre: 'Gastroenterología',
    descripcion: 'Trastornos del sistema digestivo.',
    icono: <FaNotesMedical />,
    ruta: '/gastroenterologia',
    categoria: 'diagnostico'
  },
  {
    nombre: 'Odontología',
    descripcion: 'Salud bucal y tratamientos dentales.',
    icono: <FaTooth />,
    ruta: '/odontologia',
    categoria: 'especializada'
  },
  {
    nombre: 'Ginecología',
    descripcion: 'Salud femenina y sistema reproductor.',
    icono: <FaUserMd />,
    ruta: '/ginecologia',
    categoria: 'especializada'
  },
  {
    nombre: 'Neurología',
    descripcion: 'Trastornos del sistema nervioso.',
    icono: <FaBrain />,
    ruta: '/neurologia',
    categoria: 'especializada'
  },
  {
    nombre: 'Pediatría',
    descripcion: 'Atención médica para niños y adolescentes.',
    icono: <FaBaby />,
    ruta: '/pediatria',
    categoria: 'infantil'
  },
  {
    nombre: 'Psiquiatría',
    descripcion: 'Salud mental y emocional.',
    icono: <FaStethoscope />,
    ruta: '/psiquiatria',
    categoria: 'mental'
  },
  {
    nombre: 'Cardiología',
    descripcion: 'Enfermedades del corazón y sistema cardiovascular.',
    icono: <FaHeartbeat />,
    ruta: '/cardiologia',
    categoria: 'especializada'
  }
];

const Especialidades = () => {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas');

  const especialidadesFiltradas = especialidadesData.filter((esp) => {
    const coincideBusqueda = esp.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoriaSeleccionada === 'todas' || esp.categoria === categoriaSeleccionada;
    return coincideBusqueda && coincideCategoria;
  });

  return (
    <>
      <Navbar />
      <main className="especialidades-container">
        <h1 className="especialidades-title">Encuentra la especialidad que necesitas</h1>

        <input
          type="text"
          placeholder="Busca entre nuestras especialidades"
          className="especialidades-buscador"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <div className="categorias-barra">
          {categorias.map((cat) => (
            <button
              key={cat.id}
              className={`categoria-boton ${categoriaSeleccionada === cat.id ? 'activa' : ''}`}
              onClick={() => setCategoriaSeleccionada(cat.id)}
            >
              {cat.nombre}
            </button>
          ))}
        </div>

        <div className="especialidades-lista">
          {especialidadesFiltradas.map((esp, index) => (
            <div key={index} className="especialidad-card">
              <div className="especialidad-icono">{esp.icono}</div>
              <div className="especialidad-info">
                <h3>{esp.nombre}</h3>
                <p>{esp.descripcion}</p>
              </div>
              <Link to={esp.ruta} className="especialidad-boton">{'>'}</Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Especialidades;
