import React, { useEffect, useState } from "react";
import { Table, Button, Card } from "react-bootstrap";
import NavMedico from "../components/NavMedico";
import EstadoBadge from "../components/EstadoBadge";
import FiltroEstado from "../components/FiltroEstado";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/colors.css";
import "../css/TableHeader.css";

function SolicitudesCitas() {
  const [filtro, setFiltro] = useState("todas");
  const [solicitudes, setSolicitudes] = useState([]);
  const [nombreMedico, setNombreMedico] = useState("Médico");

  const codigoMedico = localStorage.getItem("codigoUsuario");

  useEffect(() => {
    const cargarSolicitudes = () => {
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
      const medico = usuarios[codigoMedico];
      if (!medico) return;

      const nombreCompleto = [medico.nombre, medico.apellido].filter(Boolean).join(" ");
      setNombreMedico(nombreCompleto);

      const nuevasSolicitudes = Object.values(usuarios).flatMap((u) =>
        u.citas
          ?.filter((c) => c.doctor === nombreCompleto)
          .map((c) => ({
            ...c,
            paciente: [u.nombre, u.apellido].filter(Boolean).join(" "),
            codigoPaciente: u.codigo,
          })) || []
      );

      setSolicitudes(nuevasSolicitudes);
    };

    cargarSolicitudes();

    const handleStorageChange = (e) => {
      if (e.key === "usuarios") cargarSolicitudes();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [codigoMedico]);

  const actualizarEstado = (codigoPaciente, idCita, nuevoEstado) => {
    setSolicitudes((prev) =>
      prev.map((s) =>
        s.codigoPaciente === codigoPaciente && s.id === idCita
          ? { ...s, estado: nuevoEstado }
          : s
      )
    );

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
    const paciente = usuarios[codigoPaciente];
    if (!paciente || !paciente.citas) return;

    paciente.citas = paciente.citas.map((c) =>
      c.id === idCita ? { ...c, estado: nuevoEstado } : c
    );

    usuarios[codigoPaciente] = paciente;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    
    window.dispatchEvent(new Event("usuariosActualizados"));
  };


  const solicitudesFiltradas =
    filtro === "todas"
      ? solicitudes
      : solicitudes.filter((s) => s.estado === filtro);

  return (
    <>
      <NavMedico nombre={nombreMedico || "Médico"} />

      <main className="container my-4">
        <h1 className="text-center mb-4">Solicitudes de Cita</h1>

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
                  <tr>
                    <th>Paciente</th>
                    <th>Fecha y Hora</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {solicitudesFiltradas.map((s) => (
                    <tr
                      key={`${s.codigoPaciente}-${s.id}`}
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
                      <td className="estado-badge">
                        <EstadoBadge estado={s.estado} />
                      </td>
                      <td>
                        {s.estado === "pendiente" ? (
                          <div className="d-flex gap-2 align-items-center">
                            <Button
                              size="sm"
                              variant="success"
                              onClick={() =>
                                actualizarEstado(s.codigoPaciente, s.id, "aceptada")
                              }
                            >
                              <i className="bi bi-check-lg"></i> Aceptar
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() =>
                                actualizarEstado(s.codigoPaciente, s.id, "rechazada")
                              }
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
