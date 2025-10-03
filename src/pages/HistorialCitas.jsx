import React, { useState, useEffect } from "react";
import { Table, Card, Form } from "react-bootstrap";
import NavMedico from "../components/NavMedico";
import EstadoBadge from "../components/EstadoBadge";
import FiltroEstado from "../components/FiltroEstado";
import "../css/Colors.css";
import "../css/TableHeader.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function HistorialCitas() {
  const [citas, setCitas] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [nombreMedico, setNombreMedico] = useState("Médico");

  const codigoMedico = localStorage.getItem("codigoUsuario"); // médico logueado

  useEffect(() => {
    const cargarCitas = () => {
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
      const medico = usuarios[codigoMedico];
      if (!medico) return;

      const nombreCompleto = [medico.nombre, medico.apellido].filter(Boolean).join(" ");
      setNombreMedico(nombreCompleto);

      // Toma todas las citas asignadas a este médico
      const citasMedico = Object.values(usuarios).flatMap((u) =>
        u.citas
          ?.filter((c) => c.doctor === nombreCompleto)
          .map((c) => ({
            ...c,
            paciente: [u.nombre, u.apellido].filter(Boolean).join(" "),
            codigoPaciente: u.codigo,
          })) || []
      );

      setCitas(citasMedico);
    };

    cargarCitas();

    const handleStorageChange = (e) => {
      if (e.key === "usuarios") cargarCitas();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [codigoMedico]);

  // Filtrado por nombre y estado
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
          opciones={["todos", "aceptada", "pendiente", "rechazada"]}
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
                    <tr key={`${c.codigoPaciente}-${c.id}`}>
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
