import React, { useState } from "react";
import { Table, Badge, Card, Form } from "react-bootstrap";
import NavMedico from "./NavMedico";

function HistorialCitas() {
  // Datos de ejemplo; normalmente vendrían de la API
  const [citas] = useState([
    {
      id: 1,
      paciente: "Juan Pérez",
      fecha: "2025-09-20",
      hora: "09:30",
      motivo: "Control general",
      estado: "completada",
      observaciones: "Todo dentro de lo normal",
    },
    {
      id: 2,
      paciente: "María Gómez",
      fecha: "2025-09-18",
      hora: "11:00",
      motivo: "Consulta dermatología",
      estado: "cancelada",
      observaciones: "Paciente no asistió",
    },
  ]);

  const [filtro, setFiltro] = useState("");

  const citasFiltradas = citas.filter((c) =>
    c.paciente.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <>
      <NavMedico nombre="Pérez" />

      <main className="container my-4">
        <h1 className="text-center mb-4">Historial de Citas</h1>

        <Card className="shadow-sm">
          <Card.Body>
            <Form className="mb-3">
              <Form.Control
                type="text"
                placeholder="Buscar por nombre de paciente..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
            </Form>

            {citasFiltradas.length === 0 ? (
              <p className="text-center">No hay citas en el historial.</p>
            ) : (
              <Table responsive bordered hover className="align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Paciente</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Motivo</th>
                    <th>Estado</th>
                    <th>Observaciones</th>
                  </tr>
                </thead>
                <tbody>
                  {citasFiltradas.map((c) => (
                    <tr key={c.id}>
                      <td>{c.paciente}</td>
                      <td>{c.fecha}</td>
                      <td>{c.hora}</td>
                      <td>{c.motivo}</td>
                      <td>
                        <Badge
                          bg={c.estado === "completada" ? "success" : "secondary"}
                        >
                          {c.estado.charAt(0).toUpperCase() + c.estado.slice(1)}
                        </Badge>
                      </td>
                      <td>{c.observaciones}</td>
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

export default HistorialCitas;
