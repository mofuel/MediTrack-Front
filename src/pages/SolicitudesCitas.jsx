import React, { useState } from "react";
import { Table, Button, Badge, Card } from "react-bootstrap";
import NavMedico from "./NavMedico";
import "bootstrap-icons/font/bootstrap-icons.css";

function SolicitudesCitas() {
  // Datos de ejemplo, normalmente vendrían de una API
  const [solicitudes, setSolicitudes] = useState([
    {
      id: 1,
      paciente: "Juan Pérez",
      fecha: "2025-09-30",
      hora: "09:30",
      motivo: "Control general",
      estado: "pendiente",
    },
    {
      id: 2,
      paciente: "María Gómez",
      fecha: "2025-10-01",
      hora: "11:00",
      motivo: "Consulta dermatología",
      estado: "pendiente",
    },
  ]);

  const actualizarEstado = (id, nuevoEstado) => {
    setSolicitudes((prev) =>
      prev.map((s) => (s.id === id ? { ...s, estado: nuevoEstado } : s))
    );
  };

  return (
    <>
      <NavMedico nombre="Pérez" />

      <main className="container my-4">
        <h1 className="text-center mb-4">Solicitudes de Cita</h1>

        <Card className="shadow-sm">
          <Card.Body>
            {solicitudes.length === 0 ? (
              <p className="text-center">No hay solicitudes pendientes.</p>
            ) : (
              <Table responsive bordered hover className="align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Paciente</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Motivo</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {solicitudes.map((s) => (
                    <tr key={s.id}>
                      <td>{s.paciente}</td>
                      <td>{s.fecha}</td>
                      <td>{s.hora}</td>
                      <td>{s.motivo}</td>
                      <td>
                        <Badge
                          bg={
                            s.estado === "pendiente"
                              ? "warning"
                              : s.estado === "aceptada"
                              ? "success"
                              : "danger"
                          }
                        >
                          {s.estado.charAt(0).toUpperCase() + s.estado.slice(1)}
                        </Badge>
                      </td>
                      <td className="d-flex gap-2">
                        {s.estado === "pendiente" && (
                          <>
                            <Button
                              size="sm"
                              variant="success"
                              onClick={() => actualizarEstado(s.id, "aceptada")}
                            >
                              <i className="bi bi-check-lg"></i> Aceptar
                            </Button>
                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => actualizarEstado(s.id, "rechazada")}
                            >
                              <i className="bi bi-x-lg"></i> Rechazar
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </main>
    </>
  );
}

export default SolicitudesCitas;
