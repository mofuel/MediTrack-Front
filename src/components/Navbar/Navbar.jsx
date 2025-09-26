import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo.png';
import medicos from '../../assets/medicos.png';
import profesionales from '../../assets/medicos-profesionales.png';
import especialidadesImg from '../../assets/especialidades.png';
import serviciosImg from '../../assets/servicios.png';
import investigacionImg from '../../assets/investigacion.png';
import sedesImg from '../../assets/sedes.png';
import promocionesImg from '../../assets/promociones.png';

const menuItems = {
  'Para Pacientes': {
    Especialidades: ['Dermatología', 'Gastroenterología', 'Odontología', 'Ginecología', 'Neurología', 'Pediatría', 'Psiquiatría', 'Cardiología'],
    Servicios: ['Médico Virtual', 'Atención a domicilio', 'Centro Estético', 'Chequeos Médicos', 'Sonrisa Total'],
    Promociones: [],
    Sedes: ['San Borja', 'Lima', 'Surco', 'San Isidro', 'La Molina'],
  },
  'Para Médicos': {
    Investigación: ['Docencia', 'Información para Profesionales', 'Revista Interciencia Médica'],
  },
};

const menuVisuals = {
  'Para Pacientes': {
    image: medicos,
    buttonText: 'Encuentra una especialidad →',
  },
  'Para Médicos': {
    image: profesionales,
    buttonText: 'Explora aquí →',
  },
};

const subItemVisuals = {
  Especialidades: {
    image: especialidadesImg,
    buttonText: 'Ver especialidades médicas →',
  },
  Servicios: {
    image: serviciosImg,
    buttonText: 'Explora nuestros servicios →',
  },
  Investigación: {
    image: investigacionImg,
    buttonText: 'Lee nuestras investigaciones →',
  },
  Sedes: {
    image: sedesImg,
    buttonText: 'Conoce nuestras Sedes →',
  },
  Promociones: {
    image: promocionesImg,
    buttonText: 'Promociones y Ofertas →',
  },
};

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubItem, setActiveSubItem] = useState(null);
  const timeoutRef = useRef(null);

  const handleEnter = (menu) => {
    clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
    setActiveSubItem(null);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      setActiveSubItem(null);
    }, 300);
  };

  const dropdownContent = (
    <div
      className="dropdown fixed-dropdown"
      onMouseEnter={() => clearTimeout(timeoutRef.current)}
      onMouseLeave={handleLeave}
    >
      <div className="dropdown-column">
        {menuItems[activeMenu] &&
          Object.keys(menuItems[activeMenu]).map((item) => (
            <div
              key={item}
              className={`dropdown-item ${activeSubItem === item ? 'active' : ''}`}
              onMouseEnter={() => setActiveSubItem(item)}
            >
              {item} {activeSubItem === item && '➤'}
            </div>
          ))}
      </div>
      <div className="dropdown-column">
        {activeSubItem &&
          menuItems[activeMenu] &&
          menuItems[activeMenu][activeSubItem]?.map((sub, index) => (
            <div key={index} className="dropdown-subitem">
              {sub}
            </div>
          ))}
      </div>
      <div className="dropdown-column image-column">
        <div className="image-wrapper">
          <img
            src={
              activeSubItem && subItemVisuals[activeSubItem]
                ? subItemVisuals[activeSubItem].image
                : menuVisuals[activeMenu]?.image
            }
            alt="Imagen menú"
          />
          <Link
            to={
              activeSubItem === 'Servicios'
                ? '/servicios'
                : activeSubItem === 'Especialidades'
                ? '/especialidades'
                : activeSubItem === 'Investigación'
                ? '/investigacion'
                : activeSubItem === 'Sedes'
                ? '/sedes'
                : activeSubItem === 'Promociones'
                ? '/promociones'
                : '/especialidades'
            }
            className="image-overlay-button"
          >
            {activeSubItem && subItemVisuals[activeSubItem]
              ? subItemVisuals[activeSubItem].buttonText
              : menuVisuals[activeMenu]?.buttonText}
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="navbar-wrapper">
        <header className="navbar-container">
          <nav className="navbar">
            <div className="navbar-left">
              
            <Link to="/">
                <img src={logo} alt="Logo Clínica" className="navbar-logo" />
              </Link>

            </div>

            <ul className="navbar-menu">
              {Object.keys(menuItems).map((menu) => (
                <li
                  key={menu}
                  className="navbar-item"
                  onMouseEnter={() => handleEnter(menu)}
                  onMouseLeave={handleLeave}
                >
                  <span className="menu-label">
                    {menu}
                    <span className={`arrow-icon ${activeMenu === menu ? 'rotated' : ''}`}>▼</span>
                  </span>
                </li>
              ))}
              <li className="navbar-item">Para Empresas</li>
              <li className="navbar-item">Blog Educativo</li>
              <li className="navbar-item">Cirugía Robótica</li>
            </ul>

            <div className="navbar-right">
              <span className="navbar-phone">📞 01 610 3930</span>
              <div className="navbar-login">
                <span className="login-icon">👤</span>
                <span className="login-text">Ingresar</span>
              </div>
              <button className="navbar-button">Agendar cita</button>
            </div>
          </nav>
        </header>
      </div>

      {/* Renderizar el dropdown en el portal */}
      {activeMenu &&
        ReactDOM.createPortal(dropdownContent, document.getElementById('dropdown-portal'))}
    </>
  );
};

export default Navbar;
