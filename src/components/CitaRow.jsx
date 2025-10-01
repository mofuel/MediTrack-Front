import React from "react";
import EstadoBadge from "./EstadoBadge";
import "bootstrap-icons/font/bootstrap-icons.css";


function CitaRow({ cita, tipo = "hoy", onClick }) {
  const { paciente, hora, fecha, confirmado } = cita;

  const icono = tipo === "hoy"
    ? "bi-person-circle text-primary"
    : confirmado
      ? "bi-check-circle-fill text-success"
      : "bi-clock text-warning";

  return (
    <div
      className="d-flex align-items-center mb-3 p-3 border rounded cita-row"
      style={{ cursor: onClick ? "pointer" : "default" }}
      onClick={onClick}
    >
      <i className={`bi ${icono} fs-4 me-3`}></i>
      <div className="flex-grow-1">
        <div className="fw-bold">{paciente}</div>
        <small className="text-muted">
          {tipo === "hoy" ? `Hora: ${hora}` : `${fecha} — ${hora}`}
        </small>
      </div>
      <EstadoBadge estado={confirmado ? "aceptada" : "pendiente"} />
    </div>
  );
}

export default CitaRow;
