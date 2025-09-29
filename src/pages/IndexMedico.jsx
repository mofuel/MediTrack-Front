import React from "react";
import { Card } from "react-bootstrap";
import NavMedico from "./NavMedico";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/IndexMedico.css";

function IndexMedico() {
  const navigate = useNavigate();

  const accesos = [
    { text: "Solicitudes de Cita", path: "/solicitudes-citas", icon: "bi-calendar-check" },
    { text: "Historial de citas", path: "/historial-citas", icon: "bi-journal-medical" },
    { text: "Notificaciones", path: "/notificaciones", icon: "bi-bell" },
    { text: "Perfil", path: "/perfil", icon: "bi-person-circle" },
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
    
    <main className="container my-4">
      <h1 className="text-center mb-4">Panel del Médico</h1>

      {/* Citas: dos columnas lado a lado */}
      <section className="row mb-5">
        {/* Citas de Hoy */}
        <div className="col-md-6 mb-4">
          <Card className="shadow-sm h-100">
            <Card.Header className="text-center fw-bold">Citas de hoy</Card.Header>
            <Card.Body>
              {citasHoy.length === 0 ? (
                <p className="text-center">No tienes citas para hoy</p>
              ) : (
                citasHoy.map(c => (
                  <div key={c.id} className="d-flex align-items-center mb-3 p-3 border rounded">
                    <i className="bi bi-check-circle-fill text-success fs-4 me-3"></i>
                    <div className="flex-grow-1">
                      <div className="fw-bold">{c.paciente}</div>
                      <small className="text-muted">Hora: {c.hora}</small>
                    </div>
                    <span className="badge bg-success">Confirmado</span>
                  </div>
                ))
              )}
            </Card.Body>
          </Card>
        </div>

        {/* Próximas Citas */}
        <div className="col-md-6 mb-4">
          <Card className="shadow-sm h-100">
            <Card.Header className="text-center fw-bold">Próximas citas</Card.Header>
            <Card.Body>
              {citasProximas.length === 0 ? (
                <p className="text-center">No tienes próximas citas</p>
              ) : (
                citasProximas.map(c => (
                  <div key={c.id} className="d-flex align-items-center mb-3 p-3 border rounded">
                    <i
                      className={`bi ${c.confirmado ? "bi-check-circle-fill text-success" : "bi-clock text-warning"} fs-4 me-3`}
                    ></i>
                    <div className="flex-grow-1">
                      <div className="fw-bold">{c.paciente}</div>
                      <small className="text-muted">
                        {c.fecha} — {c.hora}
                      </small>
                    </div>
                    <span
                      className={`badge ${c.confirmado ? "bg-success" : "bg-warning text-dark"}`}
                    >
                      {c.confirmado ? "Confirmado" : "Pendiente"}
                    </span>
                  </div>
                ))
              )}
            </Card.Body>
          </Card>
        </div>
      </section>

      {/* Accesos Rápidos */}
      <section className="accesos-rapidos my-5">
        <h2 className="mb-4 text-center">Accesos Rápidos</h2>

        <section className="row g-4 justify-content-center">
          {accesos.map((item) => (
            <article key={item.text} className="col-6 col-md-3">
              <Card
                className="shadow-sm text-center h-100 card-hover"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(item.path)}
              >
                <Card.Body>
                  <i className={`bi ${item.icon} fs-1 text-primary mb-2`}></i>
                  <Card.Title>{item.text}</Card.Title>
                  <Card.Text>Ir a {item.text.toLowerCase()}</Card.Text>
                </Card.Body>
              </Card>
            </article>
          ))}
        </section>
      </section>
    </main>
    </>
  );
}

export default IndexMedico;
