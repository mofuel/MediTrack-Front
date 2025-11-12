import React, { useState, useEffect } from "react";
import { Table, Card, Form } from "react-bootstrap";
import NavMedico from "../components/NavMedico";
import EstadoBadge from "../components/EstadoBadge";
import FiltroEstado from "../components/FiltroEstado";
import API_BASE_URL from "../config";
import Swal from "sweetalert2";
import "../css/Colors.css";
import "../css/TableHeader.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function HistorialCitas() {
  const [citas, setCitas] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [nombreMedico, setNombreMedico] = useState("Médico");

  const codigoMedico = localStorage.getItem("codigoUsuario");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!codigoMedico || !token) {
      console.warn("⚠️ Falta token o código de médico");
      return;
    }

    const cargarCitas = async () => {
      try {
        console.log("📡 Cargando historial de citas del médico:", codigoMedico);

        // 🔹 Obtener datos del médico
        const resPerfil = await fetch(`${API_BASE_URL}/users/${codigoMedico}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (resPerfil.ok) {
          const medico = await resPerfil.json();
          const nombreCompleto =
            medico.nombreCompleto ||
            [medico.nombre, medico.apellido].filter(Boolean).join(" ") ||
            "Médico";
          setNombreMedico(nombreCompleto);
        }

        // 🔹 Obtener citas del médico
        const resCitas = await fetch(`${API_BASE_URL}/appointments/medico/${codigoMedico}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!resCitas.ok) {
          throw new Error(`Error al cargar citas: ${resCitas.status}`);
        }

        const data = await resCitas.json();
        console.log("✅ Citas obtenidas:", data);

        // 🔹 Adaptar formato a lo que usa tu tabla
        const citasAdaptadas = data.map((c) => ({
          id: c.id,
          paciente: c.pacienteNombre || c.pacienteId,
          fecha: c.fechaCita,
          hora: c.horaCita,
          estado: c.estado,
        }));

        setCitas(citasAdaptadas);
      } catch (err) {
        console.error("❌ Error al cargar citas:", err);
        Swal.fire("Error", "No se pudo cargar el historial de citas", "error");
      }
    };

    cargarCitas();
  }, [codigoMedico, token]);

  // 🔹 Filtrado
  const citasFiltradas = citas
    .filter((c) =>
      c.paciente.toLowerCase().includes(filtroNombre.toLowerCase())
    )
    .filter((c) =>
      filtroEstado === "todos" ? true : c.estado === filtroEstado
    );

  return (
    <>
      <NavMedico nombre={nombreMedico || "Médico"} />

      <main className="container my-4">
        <h1 className="text-center mb-4">Historial de Citas</h1>

        <Form className="mb-3">
          <Form.Control
            type="text"
            placeholder="Buscar por nombre de paciente..."
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}
          />
        </Form>

        <FiltroEstado
          opciones={["todos", "ACEPTADA", "PENDIENTE", "RECHAZADA"]}
          activo={filtroEstado}
          onChange={setFiltroEstado}
        />

        <Card className="shadow-sm">
          <Card.Body>
            {citasFiltradas.length === 0 ? (
              <p className="text-center">No hay citas en el historial.</p>
            ) : (
              <Table responsive hover className="align-middle">
                <thead className="table-header-primary">
                  <tr>
                    <th>Paciente</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {citasFiltradas.map((c) => (
                    <tr key={c.id}>
                      <td>
                        <i className="bi bi-person-circle text-primary me-2"></i>
                        {c.paciente}
                      </td>
                      <td>
                        <i className="bi bi-calendar-event me-2 text-secondary"></i>
                        {c.fecha}
                      </td>
                      <td>
                        <i className="bi bi-clock me-2 text-secondary"></i>
                        {c.hora}
                      </td>
                      <td>
                        <EstadoBadge estado={c.estado} />
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
