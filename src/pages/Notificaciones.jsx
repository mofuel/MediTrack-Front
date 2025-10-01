import React, { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import NavMedico from "../components/NavMedico";
import EstadoBadge from "../components/EstadoBadge";
import "bootstrap-icons/font/bootstrap-icons.css";

function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState([
    {
      id: 1,
      titulo: "Nueva solicitud de cita",
      detalle: "Paciente: Juan Pérez",
      fecha: "29/09/2025 09:30",
      tipo: "solicitud",
      leida: false,
    },
    {
      id: 2,
      titulo: "Cita confirmada",
      detalle: "Paciente: María Gómez",
      fecha: "28/09/2025 14:00",
      tipo: "confirmada",
      leida: true,
    },
  ]);

  const marcarLeida = (id) =>
    setNotificaciones((prev) =>
      prev.map((n) => (n.id === id ? { ...n, leida: true } : n))
    );

  return (
    <>
      <NavMedico nombre="Pérez" />
      <main className="container my-4">
        <h1 className="mb-4 text-center">Notificaciones</h1>

        {notificaciones.length === 0 ? (
          <p className="text-center text-muted">No tienes notificaciones</p>
        ) : (
          notificaciones.map((n) => (
            <Card
              key={n.id}
              className={`mb-3 shadow-sm ${n.leida ? "bg-light" : "bg-primary bg-opacity-10 border-primary"
                }`}
            >
              <Card.Body className="d-flex justify-content-between align-items-center py-3">
                <div>
                  <Card.Title className="mb-1 d-flex align-items-center gap-2">
                    <i
                      className={`bi ${n.tipo === "solicitud"
                          ? "bi-calendar-plus"
                          : "bi-check-circle"
                        } text-primary`}
                    ></i>
                    {n.titulo}
                  </Card.Title>
                  <Card.Text className="text-muted mb-0">
                    <i className="bi bi-person-circle me-1"></i> {n.detalle}
                    <br />
                    <i className="bi bi-clock me-1"></i> {n.fecha}
                  </Card.Text>
                </div>

                {!n.leida ? (
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => marcarLeida(n.id)}
                  >
                    <i className="bi bi-eye"></i> Marcar como leída
                  </Button>
                ) : (
                  <EstadoBadge estado="leida" />
                )}
              </Card.Body>
            </Card>
          ))
        )}
      </main>
    </>
  );
}

export default Notificaciones;
