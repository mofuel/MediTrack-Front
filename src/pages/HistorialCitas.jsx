import React, { useState } from "react";
import { Table, Badge, Card, Form, Button } from "react-bootstrap";
import NavMedico from "../components/NavMedico";
import EstadoBadge from "../components/EstadoBadge";
import FiltroEstado from "../components/FiltroEstado";
import "../css/Colors.css";
import "../css/TableHeader.css"
import "bootstrap-icons/font/bootstrap-icons.css";

function HistorialCitas() {
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

  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");

  const citasFiltradas = citas.filter((c) =>
    c.paciente.toLowerCase().includes(filtroNombre.toLowerCase()) &&
    (filtroEstado === "todos" || c.estado === filtroEstado)
  );

  return (
    <>
      <NavMedico nombre="Pérez" />

      <main className="container my-4">
        <h1 className="text-center mb-4">Historial de Citas</h1>

        <Card className="shadow-sm">
          <Card.Body>
            {/* Filtros */}
            <Form className="mb-3">
              <Form.Control
                type="text"
                placeholder="Buscar por nombre de paciente..."
                value={filtroNombre}
                onChange={(e) => setFiltroNombre(e.target.value)}
              />
            </Form>

            <FiltroEstado
              opciones={["todos", "completada", "cancelada"]}
              activo={filtroEstado}
              onChange={setFiltroEstado}
            />


            {citasFiltradas.length === 0 ? (
              <p className="text-center">No hay citas en el historial.</p>
            ) : (
              <Table responsive hover className="align-middle">
                <thead className="table-header-primary">
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
                    <tr
                      key={c.id}
                      className={
                        c.estado === "completada"
                          ? "bg-success bg-opacity-10"
                          : "bg-secondary bg-opacity-10"
                      }
                    >
                      <td className="py-2">
                        <i className="bi bi-person-circle text-primary me-2"></i>
                        {c.paciente}
                      </td>
                      <td className="py-2">
                        <i className="bi bi-calendar-event me-2 text-secondary"></i>
                        {c.fecha}
                      </td>
                      <td className="py-2">
                        <i className="bi bi-clock me-2 text-secondary"></i>
                        {c.hora}
                      </td>
                      <td className="py-2">{c.motivo}</td>
                      <td className="py-2">
                        <EstadoBadge estado={c.estado} />
                      </td>
                      <td className="py-2">
                        <i className="bi bi-journal-text me-2 text-muted"></i>
                        {c.observaciones}
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

export default HistorialCitas;
