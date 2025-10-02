import React, { useState } from 'react';
import '../css/LibroReclamaciones.css';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';


const LibroReclamaciones = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    dni: '',
    email: '',
    telefono: '',
    tipo: '',
    descripcion: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    alert('Su reclamo ha sido registrado correctamente.');
    setFormData({
      nombre: '',
      dni: '',
      email: '',
      telefono: '',
      tipo: '',
      descripcion: ''
    });
  };

  return (
    <>
      <Navbar />
      <div className="libro-container">
        <h1 className="libro-title">Libro de Reclamaciones</h1>
        <p className="libro-subtitle">
          Complete el siguiente formulario para registrar su reclamo.
        </p>

        <form className="libro-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre completo *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>DNI / Documento *</label>
            <input
              type="text"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Correo electrónico *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Teléfono *</label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Tipo de reclamo *</label>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione...</option>
              <option value="queja">Queja</option>
              <option value="reclamo">Reclamo</option>
              <option value="sugerencia">Sugerencia</option>
            </select>
          </div>

          <div className="form-group">
            <label>Descripción *</label>
            <textarea
              name="descripcion"
              rows="4"
              value={formData.descripcion}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn-enviar">
            Enviar Reclamo
          </button>
        </form>

        <p className="libro-aviso">
          * La información proporcionada será tratada conforme a la Ley de Protección de Datos Personales.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default LibroReclamaciones;
