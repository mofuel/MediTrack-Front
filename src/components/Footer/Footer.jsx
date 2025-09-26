import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaBookOpen
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <>
      <hr className="footer-top-divider" />
      <footer className="footer">
        <div className="footer-grid">
          {/* Síguenos */}
          <div className="footer-column">
            <h3 className="footer-title">Síguenos</h3>
            <ul className="social-links">
              <li><FaFacebookF /><span>Facebook</span></li>
              <li><FaInstagram /><span>Instagram</span></li>
              <li><FaLinkedinIn /><span>LinkedIn</span></li>
              <li><FaYoutube /><span>YouTube</span></li>
            </ul>
          </div>

          {/* Institucional */}
          <div className="footer-column">
            <h3 className="footer-title">Institucional</h3>
            <ul>
              <li>Derechos de los pacientes</li>
              <li>Quiénes Somos</li>
              <li>Acreditaciones</li>
              <li>Convenios de Salud</li>
              <li>Trabaja con Nosotros</li>
            </ul>
          </div>

          {/* Pacientes */}
          <div className="footer-column">
            <h3 className="footer-title">Pacientes</h3>
            <ul>
              <li>Especialidades</li>
              <li>Unidades especializadas</li>
              <li>Servicios</li>
              <li>Staff Médico</li>
              <li>Sedes</li>
              <li>Centro Estético</li>
              <li>Promociones y Ofertas</li>
            </ul>
          </div>

          {/* Médicos */}
          <div className="footer-column">
            <h3 className="footer-title">Médicos</h3>
            <ul>
              <li>Investigación</li>
              <li>Revista Interclínica Médica</li>
              <li>Información para Profesionales</li>
              <li>Convenios Académicos</li>
            </ul>
          </div>

          {/* Libro de Reclamaciones */}
          
            <div className="footer-column libro">
            <FaBookOpen className="book-icon" />
            <Link to="/libro-reclamaciones" className="libro-link">
                Libro de Reclamaciones
            </Link>
            </div>

        </div>

        <div className="footer-bottom">
          <p>© 2025 Clínica Amparo. Todos los derechos pertenecen a los Choquitos.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
