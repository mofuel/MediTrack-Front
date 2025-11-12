import React, { useEffect, useState } from "react";
import { Table, Button, Card } from "react-bootstrap";
import NavMedico from "../components/NavMedico";
import EstadoBadge from "../components/EstadoBadge";
import FiltroEstado from "../components/FiltroEstado";
import API_BASE_URL from "../config";
import Swal from "sweetalert2";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/colors.css";
import "../css/TableHeader.css";

function SolicitudesCitas() {
  const [filtro, setFiltro] = useState("todas");
  const [solicitudes, setSolicitudes] = useState([]);
  const [nombreMedico, setNombreMedico] = useState("Médico");

  const codigoMedico = localStorage.getItem("codigoUsuario");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!codigoMedico || !token) {
      console.warn("⚠️ Faltan datos del médico o token");
      return;
    }

    const cargarSolicitudes = async () => {
      try {
        console.log("🚀 Cargando citas del médico:", codigoMedico);

        // Obtener perfil del médico
        const resPerfilMedico = await fetch(`${API_BASE_URL}/users/${codigoMedico}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (resPerfilMedico.ok) {
          const perfilMedico = await resPerfilMedico.json();
          const nombreCompleto = perfilMedico.nombreCompleto || [perfilMedico.nombre, perfilMedico.apellido].filter(Boolean).join(" ") || "Médico";
          setNombreMedico(nombreCompleto);
        }

        // Obtener citas del médico
        const resCitas = await fetch(`${API_BASE_URL}/appointments/medico/${codigoMedico}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!resCitas.ok) {
          throw new Error(`Error al cargar citas: ${resCitas.status}`);
        }

        const citas = await resCitas.json();
        console.log("✅ Citas del médico:", citas);

        setSolicitudes(citas);
      } catch (err) {
        console.error("❌ Error al cargar solicitudes:", err);
        Swal.fire("Error", "No se pudieron cargar las citas", "error");
      }
    };

    cargarSolicitudes();
  }, [codigoMedico, token]);

  const actualizarEstado = async (idCita, nuevoEstado) => {
    try {
      const res = await fetch(`${API_BASE_URL}/appointments/${idCita}/estado?estado=${nuevoEstado}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error al actualizar estado");

      const citaActualizada = await res.json();

      // Actualizar estado local
      setSolicitudes((prev) =>
        prev.map((s) => (s.id === idCita ? citaActualizada : s))
      );

      Swal.fire(
        "Estado actualizado",
        `La cita ha sido ${nuevoEstado.toLowerCase()}`,
        "success"
      );
    } catch (err) {
      console.error("❌ Error al actualizar estado:", err);
      Swal.fire("Error", "No se pudo actualizar el estado de la cita", "error");
    }
  };

  const solicitudesFiltradas =
    filtro === "todas"
      ? solicitudes
      : solicitudes.filter((s) => s.estado === filtro.toUpperCase());

  return (
    <>
      <NavMedico nombre={nombreMedico || "Médico"} />

      <main className="container my-4">
        <h1 className="text-center mb-4">Solicitudes de Cita</h1>

        <FiltroEstado
          opciones={["todas", "PENDIENTE", "ACEPTADA", "RECHAZADA"]}
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
                  <tr>
                    <th>Paciente</th>
                    <th>Especialidad</th>
                    <th>Fecha y Hora</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {solicitudesFiltradas.map((s) => (
                    <tr
                      key={s.id}
                      className={
                        s.estado === "PENDIENTE"
                          ? "bg-warning bg-opacity-10"
                          : s.estado === "ACEPTADA"
                          ? "bg-success bg-opacity-10"
                          : "bg-danger bg-opacity-10"
                      }
                    >
                      <td>
                        <i className="bi bi-person-circle text-primary me-2"></i>
                        {s.pacienteNombre || s.pacienteId}
                      </td>
                      <td>{s.especialidadNombre || s.especialidadId}</td>
                      <td>
                        <i className="bi bi-calendar-event me-2 text-secondary"></i>
                        {s.fechaCita}
                        <br />
                        <i className="bi bi-clock me-2 text-secondary"></i>
                        {s.horaCita}
                      </td>
                      <td className="estado-badge">
                        <EstadoBadge estado={s.estado} />
                      </td>
                      <td>
                        {s.estado === "PENDIENTE" ? (
                          <div className="d-flex gap-2 align-items-center">
                            <Button
                              size="sm"
                              variant="success"
                              onClick={() => actualizarEstado(s.id, "ACEPTADA")}
                            >
                              <i className="bi bi-check-lg"></i> Aceptar
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() => actualizarEstado(s.id, "RECHAZADA")}
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