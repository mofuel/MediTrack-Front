import React, { useState, useEffect } from "react";
import { Navbar, Container } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/NavMedico.css";
import logoMedico from "../assets/logg.png";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";


function NavMedico() {
  const navigate = useNavigate();
  const [nombreCompleto, setNombreCompleto] = useState("...");
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    // Fecha actual formateada
    const fechaFormateada = new Date().toLocaleDateString("es-PE", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setFecha(fechaFormateada);

    // Obtener datos del médico desde el backend
    const token = localStorage.getItem("token");
    const codigoUsuario = localStorage.getItem("codigoUsuario");

    if (!token || !codigoUsuario) return;

    const fetchPerfil = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/users/${codigoUsuario}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error("Error al obtener perfil:", response.status);
          setNombreCompleto("Desconocido");
          return;
        }

        const data = await response.json();
        const nombre = data.nombre || "";
        const apellido = data.apellido || "";
        setNombreCompleto(`${nombre} ${apellido}`);
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchPerfil();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    localStorage.removeItem("codigoUsuario");
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
                style={{
                  width: "100px",
                  height: "50px",
                  objectFit: "contain",
                  cursor: "pointer",
                }}
              />
            </Link>

            <div>
              <h5 className="mb-0">
                Hola, Dr. {nombreCompleto}
              </h5>
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
