import React from "react";
import { Card } from "react-bootstrap";
import NavMedico from "../components/NavMedico";
import EstadoBadge from "../components/EstadoBadge";
import CitaRow from "../components/CitaRow";
import FiltroEstado from "../components/FiltroEstado";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/IndexMedico.css";
import '../css/colors.css';
import {Button as RBButton} from "react-bootstrap";


function IndexMedico() {
  const navigate = useNavigate();

  const accesos = [
    { text: "Solicitudes de Cita", path: "/solicitudes-citas", icon: "bi-calendar-check" },
    { text: "Historial de citas", path: "/historial-citas", icon: "bi-journal-medical" },
    { text: "Notificaciones", path: "/notificaciones", icon: "bi-bell" },
    { text: "Perfil", path: "/perfil-medico", icon: "bi-person-circle" },
  ];

  const citasHoy = [
    { id: 1, hora: "09:00", paciente: "Juan Pérez", confirmado: true },
    { id: 2, hora: "11:30", paciente: "María Gómez", confirmado: true },
  ];

  const citasProximas = [
    { id: 3, fecha: "25/09/2025", hora: "10:00", paciente: "Luis Torres", confirmado: true },
    { id: 4, fecha: "26/09/2025", hora: "14:30", paciente: "Ana Ramos", confirmado: false },
  ];


  return (
    <>
    <NavMedico nombre="Pérez" />
    
    {/* Área Principal */}
      <main className="container my-4">
        <div className="row">
          {/* Columna izquierda */}
          <div className="col-lg-7 mb-4">
            <Card className="shadow-sm h-100">
              <Card.Header className="card-header-azul">Citas de hoy</Card.Header>
              <Card.Body>
  {citasHoy.length === 0 ? (
    <p className="text-center">No tienes citas para hoy</p>
  ) : (
    citasHoy.map(c => (
      <CitaRow key={c.id} cita={c} tipo="hoy" />
    ))
  )}
</Card.Body>

            </Card>
          </div>

          {/* Columna derecha */}
          <div className="col-lg-5">
            {/* Próximas citas */}
            <Card className="shadow-sm mb-4">
              <Card.Header className="card-header-azul">Próximas citas</Card.Header>
              <Card.Body style={{ maxHeight: "200px", overflowY: "auto" }}>
                {citasProximas.map(c => (
                  <div key={c.id} className="d-flex align-items-center mb-3 p-2 border rounded">
                    <i
                      className={`bi ${c.confirmado ? "bi-check-circle-fill text-success" : "bi-clock text-warning"} fs-4 me-3`}
                    ></i>
                    <div className="flex-grow-1">
                      <div className="fw-bold">{c.paciente}</div>
                      <small className="text-muted">
                        {c.fecha} — {c.hora}
                      </small>
                    </div>
                    <EstadoBadge estado={c.confirmado ? "aceptada" : "pendiente"} />

                  </div>
                ))}
              </Card.Body>
            </Card>

            {/* Accesos Rápidos */}
            <Card className="shadow-sm mb-4">
              <Card.Header className="card-header-azul">Accesos Rápidos</Card.Header>
              <Card.Body>
                <div className="row g-3 text-center">
                  {accesos.map(item => (
                    <div key={item.text} className="col-6">
                      <div
                        className="p-3 border rounded h-100 card-hover"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(item.path)}
                      >
                        <i className={`bi ${item.icon} fs-2 text-primary`}></i>
                        <div className="mt-2 small">{item.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>

          </div>
        </div>
      </main>
    </>
  );
}

export default IndexMedico;
