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
              
              <li><Link to="/sobre-nosotros">Quiénes Somos</Link></li>
            </ul>
          </div>

          {/* Pacientes */}
          <div className="footer-column">
            <h3 className="footer-title">Pacientes</h3>
            <ul>
              <li><Link to="/especialidades">Especialidades</Link></li>
              <li><Link to="/servicios">Servicios</Link></li>
              <li><Link to="/sedes">Sedes</Link></li>
              <li><Link to="/centro-estetico">Centro Estético</Link></li>
              <li><Link to="/promociones">Promociones y Ofertas</Link></li>
            </ul>
          </div>

          {/* Médicos */}
          <div className="footer-column">
            <h3 className="footer-title">Médicos</h3>
            <ul>
              <li><Link to="/investigacion">Investigación</Link></li>
              <li><Link to="/informacion-profesional">Información para Profesionales</Link></li>
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
