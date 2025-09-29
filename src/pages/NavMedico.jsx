import React from "react";
import { Navbar, Container } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

function NavMedico({ nombre = "Apellido", onLogout }) {
  const fecha = new Date().toLocaleDateString("es-PE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Navbar  className="shadow-sm" style={{ backgroundColor: "#e6f7ff", minHeight: "60px" }}>
      <Container>
        <div className="row w-100 align-items-center">
          {/* Columna izquierda: saludo */}
          <div className="col-md-6">
            <span className="fw-semibold">Hola, Dr. {nombre}</span>
          </div>

          {/* Columna derecha: fecha, notificaciones y logout */}
          <div className="col-md-6 d-flex justify-content-end align-items-center gap-3">
            <i
              className="bi bi-bell fs-4 text-primary"
              style={{ cursor: "pointer" }}
              title="Notificaciones"
            ></i>
            <span className="text-muted small">{fecha}</span>
            <i
              className="bi bi-box-arrow-right fs-4 text-danger"
              style={{ cursor: "pointer" }}
              title="Cerrar sesión"
              onClick={onLogout}
            ></i>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavMedico;
