import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import NavMedico from "./NavMedico";

function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState([
    {
      id: 1,
      titulo: "Nueva solicitud de cita",
      detalle: "Paciente: Juan Pérez",
      fecha: "29/09/2025 09:30",
      leida: false,
    },
    {
      id: 2,
      titulo: "Cita confirmada",
      detalle: "Paciente: María Gómez",
      fecha: "28/09/2025 14:00",
      leida: true,
    },
  ]);

  const marcarLeida = (id) =>
    setNotificaciones((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, leida: true } : n
      )
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
              className={`mb-3 shadow-sm ${n.leida ? "" : "border-primary"}`}
            >
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title className="mb-1">
                    {n.titulo}
                  </Card.Title>
                  <Card.Text className="text-muted mb-0">
                    {n.detalle} — {n.fecha}
                  </Card.Text>
                </div>
                {!n.leida && (
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => marcarLeida(n.id)}
                  >
                    Marcar como leída
                  </Button>
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
