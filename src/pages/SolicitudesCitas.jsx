import React, { useState } from "react";
import { Table, Button, Badge, Card } from "react-bootstrap";;
import NavMedico from "../components/NavMedico";
import EstadoBadge from "../components/EstadoBadge"
import FiltroEstado from "../components/FiltroEstado";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/colors.css";
import "../css/TableHeader.css"

function SolicitudesCitas() {
  const [filtro, setFiltro] = useState("todas");

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
      estado: "aceptada",
    },
    {
      id: 3,
      paciente: "Carlos López",
      fecha: "2025-10-02",
      hora: "15:00",
      motivo: "Chequeo cardiología",
      estado: "rechazada",
    },
  ]);

  const actualizarEstado = (id, nuevoEstado) => {
    setSolicitudes((prev) =>
      prev.map((s) => (s.id === id ? { ...s, estado: nuevoEstado } : s))
    );
  };

  // Filtro dinámico
  const solicitudesFiltradas =
    filtro === "todas"
      ? solicitudes
      : solicitudes.filter((s) => s.estado === filtro);

  return (
    <>
      <NavMedico nombre="Pérez" />

      <main className="container my-4">
        <h1 className="text-center mb-4">Solicitudes de Cita</h1>

        {/* Filtros */}
        <FiltroEstado
          opciones={["todas", "pendiente", "aceptada", "rechazada"]}
          activo={filtro}
          onChange={setFiltro}
        />


        <Card className="shadow-sm">
          <Card.Body>
            {solicitudesFiltradas.length === 0 ? (
              <p className="text-center">No hay solicitudes.</p>
            ) : (
              <Table responsive hover className="align-middle">
                <thead className="table-header-primary">
                  <tr >
                    <th>Paciente</th>
                    <th>Fecha y Hora</th>
                    <th>Motivo</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {solicitudesFiltradas.map((s) => (
                    <tr
                      key={s.id}
                      className={
                        s.estado === "pendiente"
                          ? "bg-warning bg-opacity-10"
                          : s.estado === "aceptada"
                            ? "bg-success bg-opacity-10"
                            : "bg-danger bg-opacity-10"
                      }
                    >
                      <td>
                        <i className="bi bi-person-circle text-primary me-2"></i>
                        {s.paciente}
                      </td>
                      <td>
                        <i className="bi bi-calendar-event me-2 text-secondary"></i>
                        {s.fecha}
                        <br />
                        <i className="bi bi-clock me-2 text-secondary"></i>
                        {s.hora}
                      </td>
                      <td>{s.motivo}</td>
                      <td className="estado-badge">
                        <EstadoBadge estado={s.estado} />
                      </td>
                      <td>
                        {s.estado === "pendiente" ? (
                          <div className="d-flex gap-2 align-items-center">
                            <Button
                              size="sm"
                              variant="success"
                              onClick={() => actualizarEstado(s.id, "aceptada")}
                            >
                              <i className="bi bi-check-lg"></i> Aceptar
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() => actualizarEstado(s.id, "rechazada")}
                            >
                              <i className="bi bi-x-lg"></i> Rechazar
                            </Button>
                          </div>
                        ) : (
                          <div className="text-muted text-center py-2">
                            <i className="bi bi-dash-circle me-1"></i> Sin acciones
                          </div>
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
