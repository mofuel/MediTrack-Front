import React, { useState, useEffect } from "react";
import { Navbar, Container } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/NavMedico.css";
import logoMedico from "../assets/logg.png";
import { Link, useNavigate } from "react-router-dom";

function NavMedico() {
  const navigate = useNavigate();
  const [nombreCompleto, setNombreCompleto] = useState("Apellido");

  const fecha = new Date().toLocaleDateString("es-PE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Obtener datos del medico desde localStorage
  useEffect(() => {
    const codigoUsuario = localStorage.getItem("codigoUsuario");
    if (!codigoUsuario) return;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
    const usuario = usuarios[codigoUsuario];

    if (usuario) {
      setNombreCompleto(`${usuario.nombre} ${usuario.apellido}`);
    }
  }, []);

  const handleLogout = () => {
    // Borrar datos de sesión
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    localStorage.removeItem("codigoUsuario");

    // Redirigir al login
    navigate("/");
  };

  return (
    <Navbar className="shadow-sm navbar-medico">
      <Container>
        <div className="navbar-content-row">

          <div className="navbar-greeting">
            <Link to="/index-medico">
              <img
                src={logoMedico}
                alt="Logo Médico"
                className="me-2 logo-navbar"
                style={{ width: "100px", height: "50px", objectFit: "contain", cursor: "pointer" }}
              />
            </Link>

            <div>
              <h5 className="mb-0">Hola, Dr. {nombreCompleto}</h5>
              <span className="small-date">{fecha}</span>
            </div>
          </div>

          {/* Columna derecha: Acciones */}
          <div className="navbar-actions">

            {/* Notificaciones */}
            <div
              className="icon-action-container icon-action-notification"
              title="Notificaciones"
            >
              <i className="bi bi-bell"></i>
            </div>

            {/* Separador */}
            <div className="action-separator"></div>

            {/* Cerrar sesión */}
            <div
              className="icon-action-container icon-action-logout"
              title="Cerrar sesión"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right"></i>
            </div>

          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavMedico;
